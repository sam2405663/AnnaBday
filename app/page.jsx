'use client';

import { useState } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import AudioPlayer from './components/AudioPlayer';
import HeroSection from './components/HeroSection';
import CakeSection from './components/CakeSection';
import EnvelopesSection from './components/EnvelopesSection';
import ScrapbookSection from './components/ScrapbookSection';
import LoveJarSection from './components/LoveJarSection';
import LetterSection from './components/LetterSection';
import LetterModal from './components/LetterModal';
import AllNotesModal from './components/AllNotesModal';
import { letters } from './data/letters';

export default function Home() {
  const [activeLetter, setActiveLetter] = useState(null);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isAllNotesOpen, setIsAllNotesOpen] = useState(false);

  return (
    <>
      {/* Background Particle Canvas */}
      <ParticleCanvas />

      {/* Floating Audio Player */}
      <AudioPlayer />

      {/* Navigation / Top Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto pt-6 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-blush-500 font-handwriting text-2xl font-bold tracking-wide">
            A &amp; T
          </span>
          <span className="text-warmGold text-xs uppercase tracking-widest font-sans font-medium">
            Forever
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-handwriting text-xl text-romanticDark">
          <span className="bg-blush-100/90 text-blush-600 px-3 py-1 rounded-full border border-blush-200">
            <i className="fa-solid fa-heart mr-1.5 text-xs"></i>Anna&apos;s Day
          </span>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-24">
        {/* Hero & Countdown */}
        <HeroSection />

        {/* Cake & Wish */}
        <CakeSection />

        {/* Open When Letters */}
        <EnvelopesSection onOpenLetter={(idx) => setActiveLetter(letters[idx])} />

        {/* Scrapbook / Polaroids */}
        <ScrapbookSection />

        {/* 150 Love Notes Jar */}
        <LoveJarSection
          currentNoteIndex={currentNoteIndex}
          onSelectNote={(idx) => setCurrentNoteIndex(idx)}
          onOpenAllNotes={() => setIsAllNotesOpen(true)}
        />

        {/* Theo's Birthday Letter */}
        <LetterSection />
      </main>

      {/* Modals */}
      <LetterModal
        letter={activeLetter}
        onClose={() => setActiveLetter(null)}
      />

      <AllNotesModal
        isOpen={isAllNotesOpen}
        onClose={() => setIsAllNotesOpen(false)}
        onSelectNote={(idx) => setCurrentNoteIndex(idx)}
      />
    </>
  );
}

