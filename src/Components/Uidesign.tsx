import { useEffect, useState, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUiItems } from '../Admin/api/uiItems';
import type { UiItem } from '../Admin/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function UiDesign() {
  const { data, isLoading } = useQuery({
    queryKey: ['ui-items'],
    queryFn: fetchUiItems,
  });

  const [visibleItems, setVisibleItems] = useState<UiItem[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const horizLinesRef = useRef<(HTMLHRElement | null)[]>([]);
  const vertLinesRef = useRef<(HTMLHRElement | null)[]>([]);

  const itemsPerPage = 6;

  const loadMoreItems = useCallback(async () => {
    if (!data || loadingMore || currentIndex >= data.length) return;
    setLoadingMore(true);

    const nextItems = data.slice(currentIndex, currentIndex + itemsPerPage);
    const updatedItems = await Promise.all(
      nextItems.map(async (item) => {
        try {
          const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(item.url)}`);
          const json = await res.json();
          return { ...item, image: json?.data?.image?.url || '' };
        } catch { return item; }
      })
    );

    setVisibleItems((prev) => [...prev, ...updatedItems]);
    setCurrentIndex((prev) => prev + itemsPerPage);
    setLoadingMore(false);

    // Refresh ScrollTrigger so it accounts for the new height of the section
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [data, currentIndex, loadingMore]);

  // --- Animation Logic (Synchronized with WhyTrainSection) ---
  useEffect(() => {
    if (visibleItems.length === 0 || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Clear and re-filter refs to ensure we only target current DOM elements
      const hLines = horizLinesRef.current.filter(Boolean);
      const vLines = vertLinesRef.current.filter(Boolean);

      // 1. Initial State (Hidden/Offset)
      gsap.set(titleRef.current, { opacity: 0, y: 30 });

      gsap.set('.ui-card', {
        opacity: 0,
        x: (i) => (i % 3 === 0 ? 0 : i % 3 === 2 ? 0 : 0), // Directional entrance
        y: (i) => (i < 3 ? -30 : 30) // Vertical offset
      });

      // Reset Lines
      gsap.set(hLines, { scaleX: 0, transformOrigin: 'left' });
      gsap.set(vLines, { scaleY: 0, transformOrigin: 'top' });

      // 2. Main Timeline (Using Scrub: 1 as per your request)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 70%',
          scrub: 1,
        },
        defaults: { duration: 1, ease: 'power2.out' }
      });

      // Title Animation
      tl.to(titleRef.current, { opacity: 1, y: 0 }, 0);

      // Cards Grid Animation
      tl.to('.ui-card', {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: { each: 0.15, from: 'start' }
      }, 0.3);

      // Horizontal Lines
      tl.to(hLines, {
        scaleX: 1,
        stagger: 0.2,
        duration: 0.5
      }, 0.7);

      // Vertical Lines
      tl.to(vLines, {
        scaleY: 1,

        stagger: 0.2,
        duration: 0.5,
      }, 0.8);

    }, sectionRef);

    return () => ctx.revert();
  }, [visibleItems]); // Re-runs every time more items are loaded to include new lines

  // Infinite Scroll Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMoreItems();
    }, { rootMargin: '200px' });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMoreItems]);

  useEffect(() => {
    if (data && visibleItems.length === 0) loadMoreItems();
  }, [data, visibleItems.length, loadMoreItems]);

  if (isLoading) return <div className="text-center p-10 bg-white">Loading Gallery...</div>;

  return (
    <section ref={sectionRef} className="bg-white text-gray-900 py-20 px-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {visibleItems.map((item, index) => (
          <div key={`${item.name}-${index}`} className="ui-card relative group p-10">

            {/* 1. THE POPUP - Positioned absolutely at the bottom, moves FURTHER down on hover */}
            <div className="absolute bottom-10 left-10 right-10
    flex flex-col items-center justify-center p-3 bg-gray-400 text-black z-0 opacity-0 transition-all duration-500 ease-in-out
    translate-y-0 group-hover:translate-y-3 group-hover:opacity-100 rounded-b-md">
              <h3 className="font-['Cormorant_Garamond'] font-bold italic text-xl  mb-2 text-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"

                >{item.name}</a>

              </h3>

            </div>

            {/* 2. LIFTING CONTENT - Moves UP to create a gap for the popup below */}
            <div className="relative z-10 bg-white transition-transform duration-500 ease-out group-hover:-translate-y-10">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video rounded-t-md bg-gray-100 border border-gray-200 overflow-hidden">
                  <img
                    src={item.image || '/api/placeholder/400/300'}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700"
                  />
                </div>
              </a>

            </div>

            {/* 3. GSAP LINES - Kept in place */}
            {(index % 3 !== 2) && (
              <hr
                ref={el => { if (el) vertLinesRef.current[index] = el; }}
                className="hidden lg:block absolute top-0 right-0 w-[2px] h-full bg-black border-0 z-30"
                style={{ height: '100%' }}
              />
            )}

            {index < visibleItems.length - (visibleItems.length % 3 === 0 ? 3 : visibleItems.length % 3) && (
              <hr
                ref={el => { if (el) horizLinesRef.current[index] = el; }}
                className="hidden lg:block absolute bottom-0 left-[7.5%] w-[85%] h-[2px] bg-black border-0 z-30"
              />
            )}
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="text-center py-20">
        {currentIndex < (data?.length || 0) && (
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></div>
        )}
      </div>
    </section>
  );
}