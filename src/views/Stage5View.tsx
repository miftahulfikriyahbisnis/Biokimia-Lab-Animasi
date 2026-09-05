/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface Stage5ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

export const Stage5View: React.FC<Stage5ViewProps> = ({ isPlaying, speed }) => {
  const [phase, setPhase] = useState<'STORED' | 'RELEASED'>('STORED');

  // Auto transition between stored and released
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 3000 / speed;
    const timer = setInterval(() => {
      setPhase(prev => (prev === 'STORED' ? 'RELEASED' : 'STORED'));
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-8 min-h-[460px] justify-between">
        
        {/* Tombol Fase Bersih */}
        <div className="flex items-center gap-2 bg-[#F5F2EA] p-1.5 rounded-2xl border border-[#E5E2D9]">
          <button
            onClick={() => setPhase('STORED')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              phase === 'STORED' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            1. Penyimpanan dalam Granula
          </button>
          <button
            onClick={() => setPhase('RELEASED')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              phase === 'RELEASED' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            2. Pelepasan via Eksositosis
          </button>
        </div>

        {/* Ilustrasi Vektor 2D Sederhana */}
        <div className="w-full max-w-lg py-4">
          <svg viewBox="0 0 520 220" className="w-full h-auto select-none mx-auto">
            {/* Membran Plasma Sel Beta */}
            <line x1="40" y1="160" x2="480" y2="160" stroke="#CB997E" strokeWidth="8" strokeLinecap="round" />
            <text x="50" y="145" fontSize="11" fontWeight="bold" fill="#A5A58D">
              Sitosol Sel Beta
            </text>
            <text x="50" y="190" fontSize="11" fontWeight="bold" fill="#6B705C">
              Luar Sel / Darah
            </text>

            {/* FASE 1: Tersimpan dalam Granula Sitosol */}
            {phase === 'STORED' && (
              <g transform="translate(260, 85)" className="animate-in fade-in duration-300">
                {/* Vesikel Granula */}
                <circle cx="0" cy="0" r="45" fill="#FAF8F2" stroke="#6B705C" strokeWidth="3" />
                <text x="0" y="-22" fontSize="10" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                  Granula Sel Beta
                </text>

                {/* Molekul Insulin di Dalam Granula */}
                <g transform="translate(-18, -2)">
                  <rect x="0" y="0" width="16" height="22" rx="4" fill="#1D3557" />
                  <rect x="20" y="0" width="16" height="20" rx="4" fill="#E29578" />
                  <line x1="16" y1="6" x2="20" y2="6" stroke="#E9C46A" strokeWidth="2.5" />
                  <line x1="16" y1="14" x2="20" y2="14" stroke="#E9C46A" strokeWidth="2.5" />
                </g>

                <text x="0" y="32" fontSize="9" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">
                  Insulin Tersimpan
                </text>
              </g>
            )}

            {/* FASE 2: Granula Menyatu dengan Membran & Eksositosis */}
            {phase === 'RELEASED' && (
              <g className="animate-in fade-in duration-300">
                {/* Lekukan Fusi Membran */}
                <path
                  d="M 215 160 C 215 110, 305 110, 305 160"
                  fill="none"
                  stroke="#CB997E"
                  strokeWidth="8"
                />

                {/* Insulin Terlepas ke Ruang Ekstraseluler */}
                <g transform="translate(260, 185)">
                  <g transform="translate(-18, -5)">
                    <rect x="0" y="0" width="16" height="20" rx="4" fill="#1D3557" />
                    <rect x="20" y="0" width="16" height="18" rx="4" fill="#E29578" />
                    <line x1="16" y1="6" x2="20" y2="6" stroke="#E9C46A" strokeWidth="2.5" />
                    <line x1="16" y1="14" x2="20" y2="14" stroke="#E9C46A" strokeWidth="2.5" />
                  </g>
                  <text x="1" y="28" fontSize="10" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                    Insulin Dilepaskan
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Teks Layar Maksimal Dua Kalimat Pendek */}
        <div className="max-w-xl">
          <p className="font-serif text-base sm:text-lg text-[#3E3E3E] font-medium leading-relaxed">
            “Insulin disimpan dalam granula dan dilepaskan melalui eksositosis.”
          </p>
        </div>

      </div>
    </div>
  );
};
