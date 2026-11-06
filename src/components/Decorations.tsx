import React from 'react';

export const Decorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
      {/* TOP RIGHT: Rotating Circular Focus Stamp */}
      <div className="hidden sm:flex absolute right-[4%] md:right-[5.5%] lg:right-[7%] xl:right-[9%] top-20 sm:top-24 md:top-28 items-center justify-center pointer-events-auto">
        <div className="relative w-22 h-22 sm:w-24 sm:h-24 md:w-25 md:h-25 flex items-center justify-center">
          {/* Circular Rotating Text */}
          <svg
            className="w-full h-full animate-spin-slow origin-center"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="stampCirclePath"
                d="M 50, 15 a 35,35 0 1,1 0,70 a 35,35 0 1,1 0,-70"
              />
            </defs>
            <text className="text-[6.2px] uppercase tracking-[0.22em] font-semibold fill-[#111111]">
              <textPath href="#stampCirclePath" startOffset="0%">
                ✦ A MORE FOCUSED YOU ✦ EVERYDAY
              </textPath>
            </text>
          </svg>

          {/* Center 4-pointed Star */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="w-3.5 h-3.5 text-[#111111]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* BOTTOM LEFT: Social Proof Trust Indicator */}
      <div className="hidden sm:flex absolute left-[3.5%] lg:left-[5%] xl:left-[7%] 2xl:left-[9%] bottom-6 md:bottom-8 flex-col items-start pointer-events-auto">
        {/* Subtle Horizontal Dash */}
        <div className="w-5 h-[1.5px] bg-[#111111]/30 mb-2.5"></div>

        <p className="text-[12px] sm:text-[12.5px] text-[#787570] font-normal leading-snug tracking-[-0.01em]">
          Trusted by 50,000+
          <br />
          creators worldwide.
        </p>

        {/* 4 Overlapping Avatars */}
        <div className="mt-2.5 flex items-center">
          <div className="flex -space-x-1.5">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=64&h=64&q=80"
              alt="Creator"
              className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&h=64&q=80"
              alt="Creator"
              className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80"
              alt="Creator"
              className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=64&h=64&q=80"
              alt="Creator"
              className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover shadow-xs"
            />
          </div>
          <span className="ml-1.5 text-[11px] font-semibold text-neutral-500">
            +
          </span>
        </div>
      </div>

      {/* BOTTOM RIGHT: Less chaos, More clarity */}
      <div className="hidden sm:flex absolute right-[3.5%] lg:right-[5%] xl:right-[7%] 2xl:right-[9%] bottom-6 md:bottom-8 flex-col items-start pointer-events-auto">
        {/* 4-pointed Star */}
        <div className="mb-1.5">
          <svg
            className="w-3.5 h-3.5 text-[#111111]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" />
          </svg>
        </div>

        {/* Small Dash */}
        <div className="w-5 h-[1.5px] bg-[#111111]/30 mb-2"></div>

        <p className="text-[12px] sm:text-[12.5px] text-[#787570] font-normal leading-snug tracking-[-0.01em]">
          Less chaos.
          <br />
          More clarity.
        </p>
      </div>
    </div>
  );
};
