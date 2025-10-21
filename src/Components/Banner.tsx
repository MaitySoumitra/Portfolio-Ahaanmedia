import { useEffect } from "react";
import { animateBanner } from "./Animations/BannerAnimation";

export default function Banner() {
  useEffect(() => {
    animateBanner();
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 py-10 font-sans md:h-[500px] h-[300px]"
    >
      {/* Background gold glowing shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Large soft glowing gold circles */}
        <div className="absolute -top-24 -left-24 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-500 opacity-30 filter blur-3xl"></div>
        <div className="absolute bottom-12 right-12 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-300 opacity-25 filter blur-2xl"></div>

        {/* Thin golden grid lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="gold-grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(255, 215, 0, 0.15)"  // gold color with low opacity
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gold-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto h-full relative z-10">
        <div className="banner-background-animation relative md:h-full h-full md:px-6 text-center">
          {/* PORTFOLIO Text */}
          <div className="absolute left-6 md:left-20 top-1/2 transform -translate-y-1/2 text-left leading-none">
            <h1 className="heading-port text-[45px] sm:text-[70px] md:text-[100px] xl:text-[160px] lg:text-[140px] font-black leading-none text-[#C78E2D] drop-shadow-lg">
              PORTFOLIO
            </h1>

            {/* UI/UX Design bottom right text */}
            <h2 className="absolute right-0 -bottom-7 text-[16px] sm:text-[24px] md:text-[30px] font-semibold tracking-wide select-none text-[#C78E2D] drop-shadow-md">
              UI/UX Design
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
