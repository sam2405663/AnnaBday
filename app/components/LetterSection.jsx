export default function LetterSection() {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="parchment-letter rounded-3xl p-8 sm:p-12 relative shadow-cozy border border-warmGold/40">
        {/* Wax Seal Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-blush-600 to-blush-400 border-2 border-warmGold shadow-md flex items-center justify-center text-white font-serif font-bold text-xl">
          A
        </div>

        <div className="text-center pt-4 mb-6">
          <span className="font-handwriting text-2xl text-warmGold font-semibold">
            Written with all my heart
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-romanticDark mt-1">
            To My Dearest Anna,
          </h2>
        </div>

        <div className="space-y-4 font-serif text-romanticDark text-base sm:text-lg leading-relaxed text-justify">
          <p>
            Happy Birthday, my love. Today is one of the most important days in the entire year—not just
            because it is your birthday, but because on this day, God brought you into this world.
          </p>
          <p>
            Ever since February 20, 2024, my world has had a different rhythm. You have this quiet, gentle
            way of turning ordinary days into something filled with warmth, safety, and light. Your kindness
            heals things you aren&apos;t even trying to touch, and your laugh remains my absolute favorite sound
            on earth.
          </p>
          <p>
            I feel endlessly lucky. Lucky that of all the stories unfolding in the world, yours and mine
            decided to intertwine. Thank you for being my peace, my confidante, and my favorite adventure.
          </p>
          <p>
            I hope this new year of your life brings you as much happiness, serenity, and love as you give
            so freely to everyone around you. I promise to stand by you, celebrate you, and love you more
            with every tick of the clock.
          </p>
        </div>

        <div className="mt-8 text-right font-handwriting text-3xl sm:text-4xl text-romanticDark font-bold">
          Forever &amp; always yours,<br />
          <span className="text-blush-500 font-serif italic text-2xl font-normal">Theo</span>
        </div>
      </div>
    </section>
  );
}

