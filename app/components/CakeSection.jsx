'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function CakeSection() {
  const [candleBlown, setCandleBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const fireRomanticConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F7D6D0', '#E58A7A', '#D4AF37', '#FFFDF9', '#B84F3E'],
    };

    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    fireRomanticConfetti();
    setTimeout(() => {
      setShowWish(true);
    }, 600);
  };

  return (
    <section className="max-w-2xl mx-auto text-center">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-blush-200/90 shadow-cozy relative">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-romanticDark mb-2">
          Make a Birthday Wish, Anna 🎂
        </h2>
        <p className="font-handwriting text-xl text-romanticMuted mb-8">
          Close your eyes, think of the sweetest dream, and click to blow out the candle!
        </p>

        {/* CSS Cake Illustration */}
        <div className="relative w-48 h-44 mx-auto mb-8 flex flex-col items-center justify-end">
          {/* Candle */}
          <div
            className="relative flex flex-col items-center z-20 cursor-pointer group"
            onClick={handleBlowCandle}
          >
            {/* Flame & Glow */}
            <div
              className={`w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-candle transition-all duration-500 ${
                candleBlown
                  ? 'opacity-0 scale-0'
                  : 'flame-active scale-100 opacity-100'
              }`}
            />
            {/* Smoke */}
            <div
              className={`smoke absolute -top-8 text-slate-400 font-sans text-xs ${
                candleBlown ? 'active' : ''
              }`}
            >
              <i className="fa-solid fa-cloud"></i>
            </div>
            {/* Wick */}
            <div className="w-0.5 h-2 bg-stone-700"></div>
            {/* Candle Stick */}
            <div className="w-3.5 h-10 bg-gradient-to-r from-blush-200 via-white to-blush-300 rounded-t-sm shadow-sm border border-blush-300"></div>
          </div>

          {/* Top Cake Tier */}
          <div className="w-28 h-10 bg-cream-200 rounded-t-xl border-t-4 border-blush-300 relative shadow-inner z-10 flex items-center justify-around px-2">
            <span className="w-2 h-2 rounded-full bg-blush-400"></span>
            <span className="w-2 h-2 rounded-full bg-warmGold"></span>
            <span className="w-2 h-2 rounded-full bg-blush-400"></span>
          </div>

          {/* Bottom Cake Tier */}
          <div className="w-44 h-16 bg-cream-100 rounded-t-2xl border-t-4 border-blush-400 relative shadow-md z-0 flex items-center justify-between px-4">
            <div className="w-full h-2 bg-blush-200/60 rounded-full"></div>
          </div>

          {/* Plate */}
          <div className="w-52 h-4 bg-gradient-to-r from-stone-200 via-white to-stone-200 rounded-full shadow-md -mt-1 border border-stone-200"></div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBlowCandle}
          disabled={candleBlown}
          className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-blush-400 hover:bg-blush-500 text-white font-medium shadow-md transition duration-200 transform active:scale-95 ${
            candleBlown
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:scale-105 cursor-pointer'
          }`}
        >
          {candleBlown ? (
            <>
              <i className="fa-solid fa-heart text-blush-200"></i>
              <span>Wish Sent to God ✨</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-wind"></i>
              <span>Blow Out Your Birthday Candle</span>
            </>
          )}
        </button>

        {/* Wish Confirmation Banner */}
        {showWish && (
          <div className="mt-6 p-5 rounded-2xl bg-blush-100/90 border border-blush-300 animate-[fadeIn_0.6s_ease-out]">
            <p className="font-serif italic text-lg sm:text-xl text-blush-600 font-semibold mb-1">
              &ldquo;May all your quiet wishes and wildest dreams come true.&rdquo;
            </p>
            <p className="font-handwriting text-xl text-romanticDark">
              Every candle blown is a promise from Theo to make you smile every day.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

