'use client';

import { useState } from 'react';
import { loveReasons } from '../data/loveReasons';

export default function LoveJarSection({ currentNoteIndex, onSelectNote, onOpenAllNotes }) {
  const [animating, setAnimating] = useState(false);

  const handlePickNext = () => {
    setAnimating(true);
    setTimeout(() => {
      const nextIndex = (currentNoteIndex + 1) % loveReasons.length;
      onSelectNote(nextIndex);
      setAnimating(false);
    }, 200);
  };

  const currentReason = loveReasons[currentNoteIndex] || loveReasons[0];

  return (
    <section id="love-note-jar-section" className="max-w-xl mx-auto text-center">
      <div className="bg-gradient-to-b from-white/95 to-cream-50/90 rounded-3xl p-8 sm:p-10 border border-blush-200 shadow-cozy relative overflow-hidden">
        <span className="text-xs uppercase tracking-widest text-warmGold font-semibold">
          Interactive Little Jar
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-romanticDark mt-1 mb-2">
          Reasons Why I Love You 🍯
        </h2>
        <p className="font-handwriting text-xl text-romanticMuted mb-6">
          A bottomless jar of thoughts reminding Anna why she is cherished.
        </p>

        {/* Jar Graphic Container */}
        <div className="relative w-36 h-44 mx-auto mb-6 flex flex-col items-center justify-center">
          <div className="w-20 h-5 bg-warmGold/40 rounded-t-lg border-2 border-warmGold/70"></div>
          <div className="w-32 h-36 bg-blush-100/50 rounded-b-3xl border-2 border-blush-300 relative backdrop-blur-sm shadow-inner flex flex-col items-center justify-center p-3 overflow-hidden">
            {/* Floating Little Hearts Inside Jar */}
            <i className="fa-solid fa-heart text-blush-400 absolute text-xs animate-[pulse_2s_infinite] top-6 left-6"></i>
            <i className="fa-solid fa-heart text-blush-500 absolute text-sm animate-[pulse_1.5s_infinite] bottom-8 right-6"></i>
            <i className="fa-solid fa-heart text-roseGold absolute text-lg animate-[pulse_2.5s_infinite]"></i>
          </div>
        </div>

        {/* Dynamic Note Display */}
        <div
          id="love-note-box"
          className={`min-h-[110px] flex flex-col justify-center items-center bg-cream-50 p-5 rounded-2xl border border-blush-200/80 mb-6 transition-all duration-300 ${
            animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <p className="font-serif italic text-lg sm:text-xl text-romanticDark leading-snug">
            &ldquo;{currentReason}&rdquo;
          </p>
          <span className="text-xs font-handwriting text-lg text-blush-500 font-bold mt-2">
            Reason #{currentNoteIndex + 1} of {loveReasons.length}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handlePickNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-romanticDark hover:bg-black text-white font-medium shadow-md transition duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <i className="fa-solid fa-sparkles text-warmGold"></i>
            <span>Pick another note from the jar</span>
          </button>
          <button
            onClick={onOpenAllNotes}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blush-100 hover:bg-blush-200 text-blush-600 font-medium transition duration-200 border border-blush-300 shadow-sm text-sm cursor-pointer"
          >
            <i className="fa-solid fa-envelope-open-text"></i>
            <span>Read all 150 notes</span>
          </button>
        </div>
      </div>
    </section>
  );
}

