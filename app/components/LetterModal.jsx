'use client';

export default function LetterModal({ letter, onClose }) {
  if (!letter) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition duration-300"
    >
      <div className="parchment-letter max-w-lg w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl border border-warmGold/40 animate-[fadeIn_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-200 hover:bg-blush-200 text-romanticDark flex items-center justify-center transition cursor-pointer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-widest text-warmGold font-semibold">
            {letter.tag}
          </span>
          <h3 className="font-serif text-2xl font-bold text-romanticDark mt-1">
            {letter.title}
          </h3>
        </div>

        <div className="my-6">
          <p className="font-serif italic text-romanticDark text-base sm:text-lg leading-relaxed text-center">
            &ldquo;{letter.body}&rdquo;
          </p>
        </div>

        <div className="text-center border-t border-blush-200 pt-4">
          <p className="font-handwriting text-2xl text-blush-500">Love always, Theo</p>
        </div>
      </div>
    </div>
  );
}

