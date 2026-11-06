import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeadlineSectionProps {
  onGetStarted?: () => void;
  onWatchVideo?: () => void;
}

export const HeadlineSection: React.FC<HeadlineSectionProps> = ({
  onGetStarted,
  onWatchVideo,
}) => {
  return (
    <div className="relative z-20 flex flex-col items-center text-center px-4 pt-4 sm:pt-6 md:pt-8 max-w-[840px] mx-auto select-none pointer-events-auto">
      {/* Editorial Headline */}
      <h1 className="font-editorial text-[46px] sm:text-[60px] md:text-[72px] lg:text-[82px] leading-[0.96] tracking-[-0.025em] text-[#111111] font-normal">
        <span className="block font-normal">A clearer mind</span>
        <span className="block italic font-normal tracking-[-0.02em] mt-0.5 sm:mt-1">
          for a brighter you.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 md:mt-5 text-[14px] sm:text-[15px] md:text-[15.5px] leading-[1.48] text-[#6E6A63] max-w-[480px] font-normal tracking-[-0.01em]">
        Mindly helps you capture ideas, organize your thoughts,
        <br className="hidden sm:inline" /> and stay focused — all in one
        beautiful space.
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 md:mt-7 flex items-center justify-center gap-3 sm:gap-3.5 flex-wrap">
        <button
          onClick={onGetStarted}
          className="group inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-[13.5px] font-medium px-5.5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.14)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>Get started free</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        <button
          onClick={onWatchVideo}
          className="group inline-flex items-center gap-2.5 bg-[#F4F3EE]/85 hover:bg-[#EAE8E2] text-[#111111] text-[13.5px] font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-black/[0.06] shadow-[0_2px_6px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#111111] text-white">
            <Play className="w-2.5 h-2.5 fill-white translate-x-[0.5px]" />
          </span>
          <span>Watch video</span>
        </button>
      </div>
    </div>
  );
};
