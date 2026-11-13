'use client';

import { useState, useRef } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://cdn.pixabay.com/download/audio/2022/05/16/audio_c8913b5275.mp3?filename=romantic-acoustic-guitar-112191.mp3"
      />

      <div className="fixed bottom-5 right-5 z-40">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-blush-200 shadow-cozy">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-blush-400 hover:bg-blush-500 text-white flex items-center justify-center transition shadow-md active:scale-95"
            title={isPlaying ? 'Pause melody' : 'Play romantic song'}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-sm ${!isPlaying ? 'ml-0.5' : ''}`}></i>
          </button>
          <div className="pr-2 hidden sm:block">
            <p className="text-xs font-semibold text-romanticDark leading-tight">Theo&apos;s Melody for Anna</p>
            <p className="text-[10px] text-romanticMuted">
              {isPlaying ? 'Playing for Anna ✨' : 'Click to play ambient melody'}
            </p>
          </div>
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-4 w-6">
              <span className="w-1 bg-blush-400 rounded animate-[pulse_1s_ease-in-out_infinite] h-3"></span>
              <span className="w-1 bg-blush-500 rounded animate-[pulse_0.7s_ease-in-out_infinite] h-4"></span>
              <span className="w-1 bg-blush-300 rounded animate-[pulse_1.2s_ease-in-out_infinite] h-2"></span>
              <span className="w-1 bg-blush-400 rounded animate-[pulse_0.9s_ease-in-out_infinite] h-3.5"></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

