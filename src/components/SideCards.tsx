import React, { useEffect, useRef, useState } from 'react';

export const SideCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  const [cords, setCords] = useState({
    leftD: 'M 280 430 C 360 520, 460 550, 570 540',
    rightD: 'M 1160 480 C 1070 570, 960 580, 870 555',
  });

  // Calculate dynamic responsive connection paths so lines never detach
  useEffect(() => {
    const updatePaths = () => {
      const container = containerRef.current;
      const leftCard = leftCardRef.current;
      const rightCard = rightCardRef.current;
      if (!container || !leftCard || !rightCard) return;

      const cRect = container.getBoundingClientRect();
      const lRect = leftCard.getBoundingClientRect();
      const rRect = rightCard.getBoundingClientRect();

      // Left card exit: bottom-right area of the card
      const lx1 = lRect.right - cRect.left - 20;
      const ly1 = lRect.bottom - cRect.top - 15;
      // Target at the orbital ring left perimeter
      const lx2 = cRect.width * 0.43;
      const ly2 = cRect.height * 0.62;
      const lcx1 = lx1 + (lx2 - lx1) * 0.4;
      const lcy1 = ly1 + 65;
      const lcx2 = lx1 + (lx2 - lx1) * 0.75;
      const lcy2 = ly2 + 20;

      // Right card exit: left-middle area of the card
      const rx1 = rRect.left - cRect.left + 5;
      const ry1 = rRect.top - cRect.top + rRect.height * 0.58;
      // Target at the orbital ring right perimeter
      const rx2 = cRect.width * 0.58;
      const ry2 = cRect.height * 0.64;
      const rcx1 = rx1 - (rx1 - rx2) * 0.45;
      const rcy1 = ry1 + 60;
      const rcx2 = rx1 - (rx1 - rx2) * 0.8;
      const rcy2 = ry2 + 15;

      setCords({
        leftD: `M ${lx1.toFixed(1)} ${ly1.toFixed(1)} C ${lcx1.toFixed(1)} ${lcy1.toFixed(1)}, ${lcx2.toFixed(1)} ${lcy2.toFixed(1)}, ${lx2.toFixed(1)} ${ly2.toFixed(1)}`,
        rightD: `M ${rx1.toFixed(1)} ${ry1.toFixed(1)} C ${rcx1.toFixed(1)} ${rcy1.toFixed(1)}, ${rcx2.toFixed(1)} ${rcy2.toFixed(1)}, ${rx2.toFixed(1)} ${ry2.toFixed(1)}`,
      });
    };

    updatePaths();
    window.addEventListener('resize', updatePaths);
    const timer = setTimeout(updatePaths, 300);
    return () => {
      window.removeEventListener('resize', updatePaths);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* SVG Responsive Connecting Hairline Curves */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111111" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#111111" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111111" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#111111" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Left Curve */}
        <path
          d={cords.leftD}
          fill="none"
          stroke="url(#lineGradLeft)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        {/* Right Curve */}
        <path
          d={cords.rightD}
          fill="none"
          stroke="url(#lineGradRight)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>

      {/* LEFT CARD — Turn thoughts into progress */}
      <div
        ref={leftCardRef}
        className="hidden lg:block absolute left-[3.5%] lg:left-[5%] xl:left-[7%] 2xl:left-[9%] top-[34%] xl:top-[36%] pointer-events-auto"
      >
        <div className="mindly-card-glass w-[210px] xl:w-[225px] p-5 rounded-[24px] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_22px_44px_-10px_rgba(25,30,50,0.12)]">
          {/* Soundwave Icon */}
          <div className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center mb-3.5 text-[#111111]">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="6" y1="10" x2="6" y2="14" />
              <line x1="10" y1="6" x2="10" y2="18" />
              <line x1="14" y1="8" x2="14" y2="16" />
              <line x1="18" y1="11" x2="18" y2="13" />
            </svg>
          </div>

          <h3 className="text-[15px] xl:text-[16px] font-semibold text-[#111111] leading-snug tracking-tight">
            Turn thoughts
            <br />
            into progress.
          </h3>

          <p className="mt-1.5 text-[12px] xl:text-[12.5px] text-[#7A7670] leading-snug">
            Capture, organise and
            <br />
            do more.
          </p>
        </div>
      </div>

      {/* RIGHT CARD — Ideas, anytime, anywhere */}
      <div
        ref={rightCardRef}
        className="hidden lg:block absolute right-[3.5%] lg:right-[5%] xl:right-[7%] 2xl:right-[9%] top-[38%] xl:top-[40%] pointer-events-auto"
      >
        <div className="mindly-card-glass w-[210px] xl:w-[225px] p-5 rounded-[24px] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_22px_44px_-10px_rgba(25,30,50,0.12)]">
          {/* Avatar stack */}
          <div className="flex items-center mb-3.5">
            <div className="flex -space-x-1.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                alt="User"
                className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover shadow-xs"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80"
                alt="User"
                className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover shadow-xs"
              />
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=64&h=64&q=80"
                alt="User"
                className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover shadow-xs"
              />
            </div>
            <span className="ml-1.5 text-[11px] font-semibold text-neutral-500">
              +
            </span>
          </div>

          <h3 className="text-[15px] xl:text-[16px] font-semibold text-[#111111] leading-snug tracking-tight">
            Ideas, anytime,
            <br />
            anywhere.
          </h3>

          <p className="mt-1.5 text-[12px] xl:text-[12.5px] text-[#7A7670] leading-snug">
            Sync across all
            <br />
            your devices.
          </p>
        </div>
      </div>
    </div>
  );
};
