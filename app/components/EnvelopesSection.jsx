'use client';

export default function EnvelopesSection({ onOpenLetter }) {
  const envelopes = [
    {
      num: 1,
      icon: 'fa-sun',
      title: 'Open on your Birthday Morning',
      desc: 'A celebration of the first breath you took and how it changed my life forever.',
    },
    {
      num: 2,
      icon: 'fa-heart-pulse',
      title: 'Open when you miss me',
      desc: 'A warm reminder that no matter the distance, my heart never leaves your side.',
    },
    {
      num: 3,
      icon: 'fa-face-smile-beam',
      title: 'Open when you need a smile',
      desc: 'Little inside jokes, silly memories, and why your laughter is my favorite song.',
    },
    {
      num: 4,
      icon: 'fa-moon',
      title: 'Open for a midnight secret',
      desc: 'A whisper under the moonlight about our future dreams and eternal adventures.',
    },
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-warmGold font-semibold">
          Special Letters For You
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-romanticDark mt-1 mb-2">
          &ldquo;Open When...&rdquo; Letters 💌
        </h2>
        <p className="font-handwriting text-2xl text-romanticMuted">
          Click any envelope whenever your heart desires a reminder
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {envelopes.map((env, idx) => (
          <div
            key={env.num}
            onClick={() => onOpenLetter(idx)}
            className="envelope-card cursor-pointer bg-white/90 rounded-2xl p-6 border border-blush-200 shadow-cozy flex flex-col items-center text-center relative group"
          >
            <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center text-blush-500 mb-4 group-hover:bg-blush-400 group-hover:text-white transition">
              <i className={`fa-solid ${env.icon} text-2xl`}></i>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-warmGold font-semibold mb-1">
              Envelope #{env.num}
            </span>
            <h3 className="font-serif font-bold text-lg text-romanticDark mb-2">
              {env.title}
            </h3>
            <p className="text-xs text-romanticMuted leading-relaxed">
              {env.desc}
            </p>
            <span className="mt-4 font-handwriting text-lg text-blush-500 flex items-center gap-1 group-hover:translate-x-1 transition">
              Read note <i className="fa-solid fa-arrow-right text-xs"></i>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

