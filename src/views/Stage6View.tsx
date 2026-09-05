/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface Stage6ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

export const Stage6View: React.FC<Stage6ViewProps> = ({ isPlaying, speed }) => {
  const [isBound, setIsBound] = useState<boolean>(true);

  // Auto toggle bound state when playing
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 3000 / speed;
    const timer = setInterval(() => {
      setIsBound(prev => !prev);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-8 min-h-[460px] justify-between">
        
        {/* Tombol Status Pengikatan */}
        <div className="flex items-center gap-2 bg-[#F5F2EA] p-1.5 rounded-2xl border border-[#E5E2D9]">
          <button
            onClick={() => setIsBound(false)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !isBound ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            Insulin di Luar Sel
          </button>
          <button
            onClick={() => setIsBound(true)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isBound ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            Insulin Menempel pada Reseptor
          </button>
        </div>

        {/* Ilustrasi Vektor 2D Sederhana Reseptor Membran */}
        <div className="w-full max-w-lg py-2">
          <svg viewBox="0 0 520 230" className="w-full h-auto select-none mx-auto">
            {/* Ruang Ekstraseluler & Intraseluler Label */}
            <text x="40" y="30" fontSize="11" fontWeight="bold" fill="#6B705C">
              Luar Sel (Ekstraseluler)
            </text>
            <text x="40" y="215" fontSize="11" fontWeight="bold" fill="#A5A58D">
              Dalam Sel (Intraseluler)
            </text>

            {/* Dwi-lapis Lipid Membran Sel */}
            <rect x="20" y="110" width="480" height="24" rx="4" fill="#E5E2D9" />
            <text x="440" y="126" fontSize="10" fill="#706B5C" textAnchor="end">
              Membran Sel
            </text>

            {/* Reseptor Insulin Skematis Sederhana */}
            <g transform="translate(260, 122)">
              {/* Bagian Luar Reseptor (Ekstraseluler) */}
              <path
                d="M -40 -12 C -40 -60, -10 -75, 0 -50 C 10 -75, 40 -60, 40 -12"
                fill="none"
                stroke="#6B705C"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <text x="0" y="-75" fontSize="10" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                Bagian Luar Reseptor
              </text>

              {/* Bagian Menembus Membran & Sisi Dalam */}
              <line x1="-20" y1="-12" x2="-20" y2="45" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />
              <line x1="20" y1="-12" x2="20" y2="45" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />
              
              <rect x="-35" y="45" width="28" height="20" rx="4" fill="#CB997E" />
              <rect x="7" y="45" width="28" height="20" rx="4" fill="#CB997E" />
            </g>

            {/* Molekul Insulin */}
            <g
              transform={`translate(${isBound ? 245 : 120}, ${isBound ? 55 : 45})`}
              className="transition-all duration-300"
            >
              <rect x="0" y="0" width="14" height="18" rx="3" fill="#1D3557" />
              <rect x="16" y="0" width="14" height="16" rx="3" fill="#E29578" />
              <line x1="14" y1="5" x2="16" y2="5" stroke="#E9C46A" strokeWidth="2" />
              <line x1="14" y1="12" x2="16" y2="12" stroke="#E9C46A" strokeWidth="2" />
              <text x="15" y="-6" fontSize="10" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">
                Insulin
              </text>
            </g>
          </svg>
        </div>

        {/* Persamaan Reaksi Sederhana Sesuai Arahan */}
        <div className="w-full max-w-md p-3.5 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] font-mono text-xs sm:text-sm font-bold text-[#3E3E3E]">
          Insulin + reseptor ⇌ kompleks insulin–reseptor
        </div>

        {/* Teks Layar Maksimal Dua Kalimat Pendek */}
        <div className="max-w-xl">
          <p className="font-serif text-base sm:text-lg text-[#3E3E3E] font-medium leading-relaxed">
            “Insulin berada di luar sel dan menempel pada bagian luar reseptor di membran tanpa masuk ke dalam sel.”
          </p>
        </div>

      </div>
    </div>
  );
};
