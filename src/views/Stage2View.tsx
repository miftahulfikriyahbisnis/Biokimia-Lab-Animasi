/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Stage2ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

const CARDS = [
  {
    category: 'Struktur kimia',
    title: 'Hormon peptida'
  },
  {
    category: 'Kelarutan',
    title: 'Larut dalam air'
  },
  {
    category: 'Lokasi reseptor',
    title: 'Membran sel'
  },
  {
    category: 'Fungsi',
    title: 'Mengatur metabolisme dan membantu menurunkan glukosa darah'
  }
];

export const Stage2View: React.FC<Stage2ViewProps> = ({ isPlaying, speed }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  // Auto-advance cards when playing
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 2800 / speed;
    const timer = setInterval(() => {
      setCurrentCardIndex(prev => (prev < CARDS.length - 1 ? prev + 1 : 0));
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const currentCard = CARDS[currentCardIndex];

  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-8 min-h-[440px] justify-center">
        
        {/* Indikator Kartu 1 dalam Satu Waktu */}
        <div className="flex items-center gap-2">
          {CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentCardIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                currentCardIndex === idx
                  ? 'bg-[#6B705C] w-6'
                  : 'bg-[#E5E2D9] hover:bg-[#A5A58D]'
              }`}
              title={`Buka Kartu ${idx + 1}`}
            />
          ))}
        </div>

        {/* Tampilan Satu Kartu Sederhana */}
        <div className="w-full max-w-md bg-[#FDFCF9] rounded-3xl p-8 sm:p-10 border border-[#E5E2D9] shadow-xs space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#A5A58D] block">
            {currentCard.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E] leading-snug">
            “{currentCard.title}”
          </h3>
        </div>

        {/* Kontrol Navigasi Kartu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentCardIndex(prev => Math.max(0, prev - 1))}
            disabled={currentCardIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-[#E5E2D9] text-[#706B5C] hover:bg-[#F5F2EA] disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kartu Sebelumnya</span>
          </button>
          
          <span className="text-xs font-semibold text-[#A5A58D]">
            {currentCardIndex + 1} dari {CARDS.length}
          </span>

          <button
            onClick={() => setCurrentCardIndex(prev => Math.min(CARDS.length - 1, prev + 1))}
            disabled={currentCardIndex === CARDS.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#6B705C] text-white hover:bg-[#585D4B] disabled:opacity-30 cursor-pointer"
          >
            <span>Kartu Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
