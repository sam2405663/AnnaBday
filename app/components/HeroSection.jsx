'use client';

import { useState, useEffect } from 'react';

const RELATIONSHIP_START = new Date('2024-02-20T00:00:00');

export default function HeroSection() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - RELATIONSHIP_START.getTime();

      if (diffMs > 0) {
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        setTime({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-center pt-6 sm:pt-12">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50 border border-blush-200 shadow-sm mb-6 animate-float">
        <span className="w-2 h-2 rounded-full bg-blush-400 animate-ping"></span>
        <span className="font-handwriting text-lg text-romanticMuted">
          A dedicated space for the prettiest soul
        </span>
        <i className="fa-solid fa-sparkles text-warmGold text-xs"></i>
      </div>

      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-romanticDark tracking-tight leading-[1.15] mb-5">
        Happy Birthday, <br className="sm:hidden" />
        <span className="italic font-normal text-blush-500 relative inline-block">
          My Beautiful Anna
          <svg
            className="absolute -bottom-2 left-0 w-full text-blush-300"
            viewBox="0 0 250 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 9C50 3 180 3 247 9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
        ✨
      </h1>

      <p className="font-serif italic text-lg sm:text-xl text-romanticMuted max-w-2xl mx-auto leading-relaxed mb-10">
        &ldquo;Out of 8 billion people, God gave me you. I&apos;m endlessly lucky because the world became a
        gentler, more magical place on the day you were born.&rdquo;
      </p>

      {/* Theo's Signature Tag */}
      <div className="mb-12">
        <p className="font-handwriting text-2xl text-romanticDark/80">
          With all my love &amp; heart — Theo
        </p>
      </div>

      {/* Live Counter Card */}
      <div className="max-w-3xl mx-auto bg-cream-50/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-blush-200/80 shadow-cozy relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blush-100 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cream-300/40 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-center gap-2 mb-2 text-blush-500">
          <i className="fa-solid fa-heart text-xs"></i>
          <span className="font-handwriting text-xl sm:text-2xl text-romanticDark font-semibold">
            Our Journey Together
          </span>
          <i className="fa-solid fa-heart text-xs"></i>
        </div>

        <p className="text-xs uppercase tracking-widest text-romanticMuted mb-6 font-medium">
          Falling deeper in love with you since February 20, 2024
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
          <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-blush-100 text-center shadow-sm">
            <span className="block font-serif text-2xl sm:text-4xl font-bold text-romanticDark">
              {time.days}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-romanticMuted uppercase tracking-wider">
              Days
            </span>
          </div>
          <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-blush-100 text-center shadow-sm">
            <span className="block font-serif text-2xl sm:text-4xl font-bold text-romanticDark">
              {time.hours}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-romanticMuted uppercase tracking-wider">
              Hours
            </span>
          </div>
          <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-blush-100 text-center shadow-sm">
            <span className="block font-serif text-2xl sm:text-4xl font-bold text-romanticDark">
              {time.minutes}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-romanticMuted uppercase tracking-wider">
              Minutes
            </span>
          </div>
          <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-blush-100 text-center shadow-sm">
            <span className="block font-serif text-2xl sm:text-4xl font-bold text-blush-500">
              {time.seconds}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-romanticMuted uppercase tracking-wider">
              Seconds
            </span>
          </div>
        </div>

        <p className="font-handwriting text-lg sm:text-xl text-romanticDark/70 mt-6">
          ...and counting every single precious moment with you.
        </p>
      </div>
    </section>
  );
}

