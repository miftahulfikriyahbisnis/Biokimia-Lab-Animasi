/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface Stage4ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

export const Stage4View: React.FC<Stage4ViewProps> = () => {
  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-8 min-h-[460px] justify-between">
        
        {/* Ringkasan 4 Poin Kunci */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold">
          <span className="px-3 py-1 rounded-xl bg-[#E29578]/20 text-[#3E3E3E] border border-[#E29578]/40">
            Rantai A: 21 asam amino
          </span>
          <span className="px-3 py-1 rounded-xl bg-[#1D3557]/15 text-[#1D3557] border border-[#1D3557]/30">
            Rantai B: 30 asam amino
          </span>
          <span className="px-3 py-1 rounded-xl bg-[#E9C46A]/30 text-[#3E3E3E] border border-[#E9C46A]">
            2 ikatan disulfida antara rantai A & B
          </span>
          <span className="px-3 py-1 rounded-xl bg-[#E9C46A]/30 text-[#3E3E3E] border border-[#E9C46A]">
            1 ikatan disulfida di dalam rantai A
          </span>
        </div>

        {/* Ilustrasi Vektor 2D Struktur Insulin Matang */}
        <div className="w-full max-w-lg py-4">
          <svg viewBox="0 0 520 200" className="w-full h-auto select-none mx-auto">
            {/* Rantai A (Merah Muda, Atas) */}
            <g transform="translate(100, 30)">
              <rect x="0" y="0" width="320" height="36" rx="8" fill="#E29578" />
              <text x="160" y="23" fontSize="13" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                Rantai A (21 Asam Amino)
              </text>

              {/* 1 Ikatan Disulfida Intrarantai A (A6 - A11) */}
              <path
                d="M 60 0 C 60 -25, 110 -25, 110 0"
                fill="none"
                stroke="#E9C46A"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <text x="85" y="-14" fontSize="10" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                Intrarantai A
              </text>
            </g>

            {/* 2 Ikatan Disulfida Antarrantai A dan B (Kuning) */}
            <g transform="translate(100, 0)">
              {/* Ikatan 1: A7 - B7 */}
              <line x1="85" y1="66" x2="85" y2="124" stroke="#E9C46A" strokeWidth="6" strokeLinecap="round" />
              <text x="65" y="98" fontSize="10" fontWeight="bold" fill="#6B705C">
                –S–S–
              </text>

              {/* Ikatan 2: A20 - B19 */}
              <line x1="260" y1="66" x2="260" y2="124" stroke="#E9C46A" strokeWidth="6" strokeLinecap="round" />
              <text x="270" y="98" fontSize="10" fontWeight="bold" fill="#6B705C">
                –S–S–
              </text>
            </g>

            {/* Rantai B (Biru, Bawah) */}
            <g transform="translate(70, 124)">
              <rect x="0" y="0" width="380" height="38" rx="8" fill="#1D3557" />
              <text x="190" y="24" fontSize="13" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                Rantai B (30 Asam Amino)
              </text>
            </g>
          </svg>
        </div>

        {/* Persamaan Reaksi Pembentukan Ikatan Disulfida */}
        <div className="w-full max-w-md p-3.5 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] font-mono text-xs sm:text-sm font-bold text-[#3E3E3E]">
          2 Cys–SH → Cys–S–S–Cys + 2H⁺ + 2e⁻
        </div>

        {/* Teks Layar Maksimal Dua Kalimat Pendek */}
        <div className="max-w-xl">
          <p className="font-serif text-base sm:text-lg text-[#3E3E3E] font-medium leading-relaxed">
            “Insulin matang terdiri atas 51 asam amino dan mempunyai tiga ikatan disulfida.”
          </p>
        </div>

      </div>
    </div>
  );
};
