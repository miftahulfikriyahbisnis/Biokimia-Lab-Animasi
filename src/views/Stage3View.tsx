/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface Stage3ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

type FormStep = 'A' | 'B' | 'C';

export const Stage3View: React.FC<Stage3ViewProps> = ({ isPlaying, speed }) => {
  const [activeForm, setActiveForm] = useState<FormStep>('A');

  // Auto transition when playing
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 3200 / speed;
    const timer = setInterval(() => {
      setActiveForm(prev => (prev === 'A' ? 'B' : prev === 'B' ? 'C' : 'A'));
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-6 min-h-[460px] justify-between">
        
        {/* Navigasi 3 Bentuk Sederhana */}
        <div className="flex items-center gap-2 bg-[#F5F2EA] p-1.5 rounded-2xl border border-[#E5E2D9]">
          <button
            onClick={() => setActiveForm('A')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeForm === 'A' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            A. Preproinsulin
          </button>
          <button
            onClick={() => setActiveForm('B')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeForm === 'B' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            B. Proinsulin
          </button>
          <button
            onClick={() => setActiveForm('C')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeForm === 'C' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            C. Insulin Matang
          </button>
        </div>

        {/* Legend 4 Warna Sederhana */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[#3E3E3E]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#F77F00]" /> Signal peptide (oranye)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#3E3E3E]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1D3557]" /> Rantai B (biru)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#3E3E3E]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#52B788]" /> C-peptide (hijau)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#3E3E3E]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#E29578]" /> Rantai A (merah muda)
          </span>
        </div>

        {/* Ilustrasi Vektor Sederhana Berdasarkan Bentuk Aktif */}
        <div className="w-full max-w-lg py-3">
          <svg viewBox="0 0 500 170" className="w-full h-auto select-none mx-auto">
            {/* BENTUK A: Preproinsulin (Satu Rangkaian Utuh) */}
            {activeForm === 'A' && (
              <g transform="translate(100, 45)">
                {/* Signal peptide (oranye) */}
                <rect x="0" y="20" width="30" height="45" rx="6" fill="#F77F00" />
                <text x="15" y="47" fontSize="10" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">SP</text>

                {/* Rantai B (biru) */}
                <rect x="34" y="20" width="45" height="45" rx="6" fill="#1D3557" />
                <text x="56" y="47" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">B</text>

                {/* C-peptide (hijau) - Lengkung Penghubung */}
                <path
                  d="M 80 42 C 140 120, 200 120, 230 42"
                  fill="none"
                  stroke="#52B788"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <text x="155" y="85" fontSize="11" fontWeight="bold" fill="#52B788" textAnchor="middle">
                  C-peptide
                </text>

                {/* Rantai A (merah muda) */}
                <rect x="235" y="20" width="40" height="45" rx="6" fill="#E29578" />
                <text x="255" y="47" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">A</text>
              </g>
            )}

            {/* BENTUK B: Proinsulin (Signal Peptide Lepas) */}
            {activeForm === 'B' && (
              <g transform="translate(100, 45)">
                {/* Signal peptide terlepas (pudar ke kiri) */}
                <g opacity="0.35" transform="translate(-55, 20)">
                  <rect x="0" y="0" width="26" height="40" rx="5" fill="#F77F00" />
                  <text x="13" y="25" fontSize="9" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">SP</text>
                </g>

                {/* Rantai B (biru) */}
                <rect x="34" y="20" width="45" height="45" rx="6" fill="#1D3557" />
                <text x="56" y="47" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">B</text>

                {/* Ikatan Disulfida Terbentuk */}
                <line x1="80" y1="30" x2="235" y2="30" stroke="#E9C46A" strokeWidth="4" />
                <line x1="80" y1="55" x2="235" y2="55" stroke="#E9C46A" strokeWidth="4" />

                {/* C-peptide (hijau) */}
                <path
                  d="M 80 42 C 140 120, 200 120, 230 42"
                  fill="none"
                  stroke="#52B788"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <text x="155" y="85" fontSize="11" fontWeight="bold" fill="#52B788" textAnchor="middle">
                  C-peptide
                </text>

                {/* Rantai A (merah muda) */}
                <rect x="235" y="20" width="40" height="45" rx="6" fill="#E29578" />
                <text x="255" y="47" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">A</text>
              </g>
            )}

            {/* BENTUK C: Insulin Matang + C-Peptide Terpisah */}
            {activeForm === 'C' && (
              <g transform="translate(50, 45)">
                {/* Insulin Matang: Rantai B + Rantai A terhubung ikatan disulfida */}
                <g transform="translate(20, 0)">
                  <rect x="0" y="20" width="45" height="45" rx="6" fill="#1D3557" />
                  <text x="22" y="47" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">B</text>

                  {/* 2 Ikatan Disulfida Antarrantai */}
                  <line x1="45" y1="30" x2="110" y2="30" stroke="#E9C46A" strokeWidth="5" />
                  <line x1="45" y1="55" x2="110" y2="55" stroke="#E9C46A" strokeWidth="5" />

                  <rect x="110" y="20" width="40" height="45" rx="6" fill="#E29578" />
                  <text x="130" y="47" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">A</text>

                  <text x="77" y="85" fontSize="11" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                    Insulin Matang
                  </text>
                </g>

                {/* C-peptide Terpisah di Kanan */}
                <g transform="translate(260, 0)">
                  <path
                    d="M 20 20 C 50 80, 100 80, 130 20"
                    fill="none"
                    stroke="#52B788"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  <text x="75" y="85" fontSize="11" fontWeight="bold" fill="#52B788" textAnchor="middle">
                    C-peptide Terpisah
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Persamaan Reaksi Sederhana Sesuai Bentuk Aktif */}
        <div className="w-full max-w-lg">
          {activeForm === 'B' && (
            <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] font-mono text-xs sm:text-sm font-bold text-[#3E3E3E]">
              Preproinsulin + H₂O —enzim→ Proinsulin + signal peptide
            </div>
          )}

          {activeForm === 'C' && (
            <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] font-mono text-xs sm:text-sm font-bold text-[#3E3E3E]">
              Proinsulin + nH₂O —enzim→ Insulin + C-peptide
            </div>
          )}
        </div>

        {/* Teks Layar Maksimal Dua Kalimat Pendek */}
        <div className="max-w-xl">
          <p className="font-serif text-base sm:text-lg text-[#3E3E3E] font-medium leading-relaxed">
            {activeForm === 'A' && '“Bentuk awal: preproinsulin.”'}
            {activeForm === 'B' && '“Signal peptide dilepaskan melalui hidrolisis ikatan peptida.”'}
            {activeForm === 'C' && '“C-peptide dipisahkan sehingga terbentuk insulin matang.”'}
          </p>
        </div>

      </div>
    </div>
  );
};
