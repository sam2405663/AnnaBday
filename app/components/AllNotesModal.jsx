'use client';

import { useState } from 'react';
import { loveReasons } from '../data/loveReasons';

export default function AllNotesModal({ isOpen, onClose, onSelectNote }) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const term = search.trim().toLowerCase();
  const filteredNotes = loveReasons
    .map((note, index) => ({ note, index }))
    .filter(({ note, index }) => {
      if (!term) return true;
      return (
        note.toLowerCase().includes(term) ||
        `reason #${index + 1}`.includes(term) ||
        `${index + 1}` === term
      );
    });

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition duration-300"
    >
      <div className="parchment-letter max-w-2xl w-full max-h-[85vh] rounded-3xl p-6 sm:p-8 relative shadow-2xl border border-warmGold/40 flex flex-col animate-[fadeIn_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-200 hover:bg-blush-200 text-romanticDark flex items-center justify-center transition cursor-pointer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-widest text-warmGold font-semibold">
            Every Single Memory &amp; Reason
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-romanticDark mt-1">
            150 Reasons Why I Love You, Anna
          </h3>
          <p className="font-handwriting text-lg text-romanticMuted">
            All 150 little thoughts written from Theo&apos;s heart
          </p>
        </div>

        {/* Search box */}
        <div className="mb-4">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-romanticMuted/50 text-xs"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes (e.g. smile, coffee, hug, future)..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-blush-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blush-300 text-romanticDark placeholder-romanticMuted/60 transition"
              autoFocus
            />
          </div>
        </div>

        {/* Notes List Container */}
        <div className="overflow-y-auto space-y-2.5 pr-2 flex-1 scroll-smooth">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(({ note, index }) => (
              <div
                key={index}
                onClick={() => {
                  onSelectNote(index);
                  onClose();
                  const jarSection = document.getElementById('love-note-jar-section');
                  if (jarSection) {
                    jarSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="group p-3.5 rounded-2xl bg-white/90 border border-blush-100 hover:border-blush-300 shadow-sm transition flex items-start gap-3 cursor-pointer hover:bg-cream-50"
              >
                <div className="w-8 h-8 rounded-full bg-blush-100 text-blush-500 flex items-center justify-center text-xs font-bold font-serif shrink-0 group-hover:bg-blush-400 group-hover:text-white transition">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-serif italic text-sm sm:text-base text-romanticDark leading-snug">
                    &ldquo;{note}&rdquo;
                  </p>
                  <span className="text-[11px] font-handwriting text-blush-500 flex items-center gap-1 mt-1 opacity-70 group-hover:opacity-100 transition">
                    <i className="fa-solid fa-sparkles text-[10px]"></i> View in jar
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-romanticMuted font-handwriting text-xl">
              No notes match &ldquo;{search}&rdquo;. Try searching another sweet word!
            </div>
          )}
        </div>

        <div className="text-center border-t border-blush-200 pt-3 mt-3">
          <p className="font-handwriting text-xl text-blush-500">
            Endlessly loved, now and forever — Theo
          </p>
        </div>
      </div>
    </div>
  );
}

