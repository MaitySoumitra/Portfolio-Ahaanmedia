// /Animations/BannerAnimation.ts
import gsap from "gsap";

export const animateBanner = () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Animate PORT
  tl.fromTo(
    ".heading-port",
    { opacity: 0, y: -100 },
    { opacity: 1, y: 0, duration: 1 }
  )

  // Animate FOLIO
  .fromTo(
    ".heading-folio",
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1 },
    "-=0.5"
  )

  // Animate UI UX DESIGN
  .fromTo(
    ".heading-ui",
    { opacity: 0, x: 100, scale: 0.8 },
    { opacity: 1, x: 0, scale: 1, duration: 1 },
    "-=0.3"
  )

  // Animate WORKS
  .fromTo(
    ".heading-works",
    { opacity: 0, x: -100, scale: 0.8 },
    { opacity: 1, x: 0, scale: 1, duration: 1 },
    "-=0.4"
  );
  
};
