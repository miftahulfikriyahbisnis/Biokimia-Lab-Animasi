/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Stage1ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

export const Stage1View: React.FC<Stage1ViewProps> = () => {
  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-8 min-h-[440px] justify-center">
        
        {/* Alur Skematis 1 Baris */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-[#706B5C]">
          <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Pankreas</span>
          <ArrowRight className="w-4 h-4 text-[#A5A58D]" />
          <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Pulau Langerhans</span>
          <ArrowRight className="w-4 h-4 text-[#A5A58D]" />
          <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Sel Beta</span>
          <ArrowRight className="w-4 h-4 text-[#A5A58D]" />
          <span className="px-3 py-1 rounded-xl bg-[#6B705C] text-white font-bold">Insulin</span>
        </div>

        {/* Ilustrasi Pankreas Sederhana 2D */}
        <div className="w-full max-w-md py-4">
          <svg viewBox="0 0 400 180" className="w-full h-auto select-none mx-auto">
            {/* Outline Duodenum (Lengkung Usus Halus Sederhana) */}
            <path
              d="M 60 40 C 30 40, 30 140, 70 140"
              fill="none"
              stroke="#E5E2D9"
              strokeWidth="14"
              strokeLinecap="round"
            />
            
            {/* Organ Pankreas Sederhana (Warna Lembut) */}
            <path
              d="M 65 90 C 120 60, 260 65, 340 85 C 320 115, 200 120, 65 105 Z"
              fill="#E9C46A"
              stroke="#CB997E"
              strokeWidth="3"
            />

            {/* Saluran Pankreas Skematis */}
            <path
              d="M 80 96 Q 200 88, 310 88"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Sorot Pulau Langerhans & Sel Beta */}
            <g transform="translate(180, 75)">
              <circle cx="20" cy="15" r="16" fill="#FFFFFF" stroke="#6B705C" strokeWidth="2.5" />
              <circle cx="20" cy="15" r="9" fill="#6B705C" />
            </g>

            <text x="200" y="145" fontSize="13" fontWeight="bold" fill="#6B705C" textAnchor="middle">
              Kelenjar Pankreas
            </text>
          </svg>
        </div>

        {/* Teks Layar Maksimal Dua Kalimat Pendek */}
        <div className="max-w-xl">
          <p className="font-serif text-lg sm:text-xl text-[#3E3E3E] font-medium leading-relaxed">
            “Insulin diproduksi oleh sel beta pada pulau Langerhans di pankreas.”
          </p>
        </div>

      </div>
    </div>
  );
};
