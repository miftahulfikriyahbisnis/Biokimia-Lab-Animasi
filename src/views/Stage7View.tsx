/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Info, X } from 'lucide-react';

interface Stage7ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

type Stage7Step = 'PHOSPHORYLATION' | 'ACTIVE_RECEPTOR' | 'GLUT4_TRANSLOCATION' | 'GLUCOSE_ENTRY';

export const Stage7View: React.FC<Stage7ViewProps> = ({ isPlaying, speed }) => {
  const [currentStep, setCurrentStep] = useState<Stage7Step>('PHOSPHORYLATION');
  const [isGlut4InfoOpen, setIsGlut4InfoOpen] = useState<boolean>(false);

  // Munculkan kotak informasi ketika GLUT4 pertama kali terlihat
  useEffect(() => {
    if (currentStep === 'GLUT4_TRANSLOCATION') {
      setIsGlut4InfoOpen(true);
    }
  }, [currentStep]);

  // Auto progression through the 4 scenes when playing
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 4000 / speed;
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev === 'PHOSPHORYLATION') return 'ACTIVE_RECEPTOR';
        if (prev === 'ACTIVE_RECEPTOR') return 'GLUT4_TRANSLOCATION';
        if (prev === 'GLUT4_TRANSLOCATION') return 'GLUCOSE_ENTRY';
        return 'PHOSPHORYLATION';
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-6 min-h-[520px] justify-between">
        
        {/* Navigasi 4 Adegan Bersih */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-[#F5F2EA] p-1.5 rounded-2xl border border-[#E5E2D9]">
          <button
            onClick={() => setCurrentStep('PHOSPHORYLATION')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStep === 'PHOSPHORYLATION' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            1. Reaksi Fosforilasi
          </button>
          <button
            onClick={() => setCurrentStep('ACTIVE_RECEPTOR')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStep === 'ACTIVE_RECEPTOR' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            2. Reseptor Aktif
          </button>
          <button
            onClick={() => setCurrentStep('GLUT4_TRANSLOCATION')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStep === 'GLUT4_TRANSLOCATION' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            3. GLUT4 ke Membran
          </button>
          <button
            onClick={() => setCurrentStep('GLUCOSE_ENTRY')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStep === 'GLUCOSE_ENTRY' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            4. Glukosa Masuk
          </button>
        </div>

        {/* ALUR BAGIAN ATAS SESUAI ADEGAN */}
        {currentStep === 'ACTIVE_RECEPTOR' && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#706B5C]">
            <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Insulin berikatan</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A5A58D]" />
            <span className="px-3 py-1 rounded-xl bg-[#6B705C] text-white font-bold">Reseptor aktif</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A5A58D]" />
            <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Sinyal diteruskan ke dalam sel</span>
          </div>
        )}

        {currentStep === 'GLUT4_TRANSLOCATION' && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#706B5C]">
            <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Vesikel GLUT4</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A5A58D]" />
            <span className="px-3 py-1 rounded-xl bg-[#6B705C] text-white font-bold">Menyatu dengan membran sel</span>
            <button
              onClick={() => setIsGlut4InfoOpen(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF8F2] hover:bg-[#F5F2EA] text-[#6B705C] border border-[#E5E2D9] text-xs font-semibold cursor-pointer transition-colors ml-2"
              title="Buka / Tutup Penjelasan GLUT4"
            >
              <Info className="w-3.5 h-3.5 text-[#CB997E]" />
              <span>{isGlut4InfoOpen ? 'Tutup Info GLUT4' : 'Apa Itu GLUT4?'}</span>
            </button>
          </div>
        )}

        {currentStep === 'GLUCOSE_ENTRY' && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#706B5C]">
            <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Glukosa di luar sel</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A5A58D]" />
            <span className="px-3 py-1 rounded-xl bg-[#6B705C] text-white font-bold">—GLUT4→</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A5A58D]" />
            <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Glukosa di dalam sel</span>
            <button
              onClick={() => setIsGlut4InfoOpen(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF8F2] hover:bg-[#F5F2EA] text-[#6B705C] border border-[#E5E2D9] text-xs font-semibold cursor-pointer transition-colors ml-2"
              title="Buka / Tutup Penjelasan GLUT4"
            >
              <Info className="w-3.5 h-3.5 text-[#CB997E]" />
              <span>{isGlut4InfoOpen ? 'Tutup Info' : 'Info GLUT4'}</span>
            </button>
          </div>
        )}

        {/* KOTAK INFORMASI WAJIB GLUT4 (Dapat Dibuka dan Ditutup) */}
        {isGlut4InfoOpen && (currentStep === 'GLUT4_TRANSLOCATION' || currentStep === 'GLUCOSE_ENTRY') && (
          <div className="w-full max-w-xl p-5 sm:p-6 rounded-3xl bg-[#FAF8F2] border-2 border-[#6B705C]/30 shadow-xs text-left relative animate-in fade-in duration-200">
            <button
              onClick={() => setIsGlut4InfoOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#E5E2D9] transition-colors cursor-pointer"
              title="Tutup Penjelasan GLUT4"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="p-1.5 rounded-xl bg-[#6B705C] text-white">
                <Info className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#3E3E3E]">
                Apa Itu GLUT4?
              </h4>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#3E3E3E] leading-relaxed">
              <p className="font-medium bg-white p-3.5 rounded-2xl border border-[#E5E2D9]">
                “Glucose Transporter tipe 4, yaitu sebuah protein khusus di dalam tubuh yang berfungsi sebagai ‘pintu gerbang’ untuk memasukkan gula (glukosa) dari aliran darah ke dalam sel-sel tubuh, terutama sel otot rangka dan sel lemak.”
              </p>
              <p className="text-xs text-[#706B5C]">
                “Ketika sinyal insulin aktif, lebih banyak GLUT4 dipindahkan dari vesikel di dalam sel menuju membran sel. Glukosa kemudian masuk melalui GLUT4 dengan difusi terfasilitasi.”
              </p>
              <div className="p-2.5 bg-[#F5F2EA] rounded-xl text-xs font-mono font-bold text-center text-[#6B705C]">
                Glukosa di luar sel —GLUT4→ Glukosa di dalam sel
              </div>
              <p className="text-xs text-[#706B5C] italic">
                “Glukosa tidak berubah menjadi senyawa lain ketika melewati GLUT4. Pada tahap ini, glukosa hanya berpindah dari luar ke dalam sel.”
              </p>
            </div>
          </div>
        )}

        {/* ILUSTRASI VEKTOR 2D BERSIH */}
        <div className="w-full max-w-lg py-2">
          <svg viewBox="0 0 520 230" className="w-full h-auto select-none mx-auto">
            {/* ADEGAN 1: REAKSI FOSFORILASI */}
            {currentStep === 'PHOSPHORYLATION' && (
              <g className="animate-in fade-in duration-300">
                {/* Membran Sel */}
                <rect x="20" y="70" width="480" height="20" rx="4" fill="#E5E2D9" />
                <text x="40" y="55" fontSize="10" fontWeight="bold" fill="#6B705C">Luar Sel (Insulin Menempel)</text>
                <text x="40" y="110" fontSize="10" fontWeight="bold" fill="#A5A58D">Dalam Sel (Sitosol)</text>

                <g transform="translate(260, 80)">
                  <circle cx="0" cy="-28" r="14" fill="#6B705C" />
                  <text x="0" y="-24" fontSize="8" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Insulin</text>
                  <line x1="-15" y1="-10" x2="-15" y2="40" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />
                  <line x1="15" y1="-10" x2="15" y2="40" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />
                  <rect x="-35" y="40" width="70" height="28" rx="6" fill="#CB997E" />
                  <text x="0" y="58" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">IR–Tyr</text>
                </g>

                {/* Donor ATP mendekat */}
                <g transform="translate(325, 145)">
                  <rect x="0" y="0" width="75" height="32" rx="8" fill="#F5F2EA" stroke="#6B705C" strokeWidth="1.5" />
                  <text x="37" y="20" fontSize="11" fontWeight="bold" fill="#6B705C" textAnchor="middle">ATP</text>
                </g>

                <path d="M 330 145 C 300 130, 275 140, 260 148" fill="none" stroke="#E9C46A" strokeWidth="3" strokeDasharray="4 4" />
                <circle cx="260" cy="148" r="10" fill="#E9C46A" stroke="#CB997E" strokeWidth="1.5" />
                <text x="260" y="152" fontSize="9" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">–P</text>
              </g>
            )}

            {/* ADEGAN 2: RESEPTOR AKTIF (IR-Tyr-OPO3^2- aktif meneruskan sinyal) */}
            {currentStep === 'ACTIVE_RECEPTOR' && (
              <g className="animate-in fade-in duration-300">
                <rect x="20" y="70" width="480" height="20" rx="4" fill="#E5E2D9" />
                <text x="40" y="55" fontSize="10" fontWeight="bold" fill="#6B705C">Luar Sel (Insulin Menempel)</text>
                <text x="40" y="110" fontSize="10" fontWeight="bold" fill="#A5A58D">Dalam Sel (Sitosol)</text>

                <g transform="translate(260, 80)">
                  {/* Insulin terikat */}
                  <circle cx="0" cy="-28" r="14" fill="#6B705C" />
                  <text x="0" y="-24" fontSize="8" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Insulin</text>

                  {/* Reseptor batang */}
                  <line x1="-15" y1="-10" x2="-15" y2="40" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />
                  <line x1="15" y1="-10" x2="15" y2="40" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />
                  <rect x="-42" y="40" width="84" height="30" rx="6" fill="#CB997E" stroke="#E9C46A" strokeWidth="2.5" />
                  <text x="0" y="59" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">IR Terfosforilasi</text>

                  {/* Gugus Fosforil */}
                  <g transform="translate(0, 84)">
                    <circle cx="0" cy="0" r="13" fill="#E9C46A" stroke="#CB997E" strokeWidth="2" />
                    <text x="0" y="4" fontSize="10" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">–P</text>
                    <text x="0" y="22" fontSize="9" fontWeight="bold" fill="#6B705C" textAnchor="middle">IR–Tyr–OPO₃²⁻</text>
                  </g>
                </g>

                {/* Sinyal Diteruskan ke Dalam Sel */}
                <g transform="translate(260, 195)">
                  <path d="M -60 -10 Q 0 10, 60 -10" fill="none" stroke="#6B705C" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="0" y="18" fontSize="11" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                    Sinyal Aktif Diteruskan ke Dalam Sel
                  </text>
                </g>
              </g>
            )}

            {/* ADEGAN 3: GLUT4 MENUJU MEMBRAN */}
            {currentStep === 'GLUT4_TRANSLOCATION' && (
              <g className="animate-in fade-in duration-300">
                <rect x="20" y="70" width="480" height="20" rx="4" fill="#E5E2D9" />
                <text x="40" y="55" fontSize="10" fontWeight="bold" fill="#6B705C">Membran Sel Otot / Lemak</text>
                <text x="40" y="215" fontSize="10" fontWeight="bold" fill="#A5A58D">Sitosol</text>

                {/* GLUT4 yang sudah menyatu pada membran */}
                <g transform="translate(160, 68)">
                  <rect x="-14" y="0" width="28" height="24" rx="4" fill="#1D3557" />
                  <line x1="0" y1="2" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="0" y="-8" fontSize="9" fontWeight="bold" fill="#1D3557" textAnchor="middle">GLUT4</text>
                </g>

                <g transform="translate(360, 68)">
                  <rect x="-14" y="0" width="28" height="24" rx="4" fill="#1D3557" />
                  <line x1="0" y1="2" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="0" y="-8" fontSize="9" fontWeight="bold" fill="#1D3557" textAnchor="middle">GLUT4</text>
                </g>

                {/* Vesikel GLUT4 yang bergerak menuju membran */}
                <g transform="translate(260, 150)">
                  <circle cx="0" cy="0" r="32" fill="#F5F2EA" stroke="#6B705C" strokeWidth="2.5" />
                  {/* Transporter GLUT4 di dalam vesikel */}
                  <rect x="-8" y="-12" width="16" height="24" rx="3" fill="#1D3557" />
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="0" y="22" fontSize="9" fontWeight="bold" fill="#6B705C" textAnchor="middle">Vesikel GLUT4</text>
                </g>

                {/* Panah pergerakan ke atas menyatu dengan membran */}
                <line x1="260" y1="110" x2="260" y2="92" stroke="#6B705C" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="290" y="105" fontSize="9" fontWeight="bold" fill="#6B705C">Transportasi</text>
              </g>
            )}

            {/* ADEGAN 4: GLUKOSA MASUK MELALUI GLUT4 */}
            {currentStep === 'GLUCOSE_ENTRY' && (
              <g className="animate-in fade-in duration-300">
                <rect x="20" y="90" width="480" height="20" rx="4" fill="#E5E2D9" />
                <text x="40" y="45" fontSize="10" fontWeight="bold" fill="#6B705C">Luar Sel (Glukosa Darah)</text>
                <text x="40" y="195" fontSize="10" fontWeight="bold" fill="#A5A58D">Dalam Sel (Sitosol)</text>

                {/* Saluran Transporter GLUT4 pada membran */}
                <g transform="translate(260, 88)">
                  <rect x="-24" y="0" width="48" height="24" rx="4" fill="#1D3557" />
                  {/* Lubang Difusi */}
                  <rect x="-6" y="0" width="12" height="24" fill="#FDFCF9" />
                  <text x="0" y="-10" fontSize="10" fontWeight="bold" fill="#1D3557" textAnchor="middle">
                    Transporter GLUT4
                  </text>
                </g>

                {/* Molekul Glukosa Bergerak Masuk Melalui Difusi Terfasilitasi */}
                {/* Glukosa di luar */}
                <g transform="translate(260, 35)">
                  <circle cx="0" cy="0" r="10" fill="#E9C46A" stroke="#CB997E" strokeWidth="2" />
                  <text x="0" y="4" fontSize="8" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">Glukosa</text>
                </g>
                <line x1="260" y1="48" x2="260" y2="78" stroke="#CB997E" strokeWidth="2.5" strokeDasharray="3 3" />

                {/* Glukosa di dalam */}
                <g transform="translate(260, 145)">
                  <circle cx="0" cy="0" r="10" fill="#E9C46A" stroke="#CB997E" strokeWidth="2" />
                  <text x="0" y="4" fontSize="8" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">Glukosa</text>
                </g>

                <text x="260" y="172" fontSize="9" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                  Difusi Terfasilitasi (Struktur Glukosa Tetap)
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* KOTAK INFORMASI / PERSAMAAN SESUAI ADEGAN */}
        <div className="w-full max-w-xl space-y-2">
          {currentStep === 'PHOSPHORYLATION' && (
            <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] font-mono text-xs sm:text-sm font-bold text-[#3E3E3E]">
              IR–Tyr–OH + ATP → IR–Tyr–OPO₃²⁻ + ADP + H⁺
            </div>
          )}

          {currentStep === 'ACTIVE_RECEPTOR' && (
            <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] text-xs font-semibold text-[#6B705C]">
              “Bukan insulin yang terfosforilasi. Reseptor insulinlah yang terfosforilasi.”
            </div>
          )}

          {currentStep === 'GLUT4_TRANSLOCATION' && (
            <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] text-xs font-semibold text-[#6B705C]">
              “Perpindahan GLUT4 merupakan proses transportasi, bukan reaksi pembentukan senyawa baru.”
            </div>
          )}

          {currentStep === 'GLUCOSE_ENTRY' && (
            <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] space-y-1.5 text-xs">
              <div className="font-mono text-xs sm:text-sm font-bold text-[#3E3E3E]">
                n Glukosa → Glikogen
              </div>
              <p className="text-[11px] text-[#A5A58D]">
                Persamaan ini merupakan representasi sederhana penyimpanan glukosa. Pembentukan glikogen berlangsung melalui beberapa tahap enzimatis.
              </p>
            </div>
          )}
        </div>

        {/* TEKS NARASI SINGKAT MAKSIMAL DUA KALIMAT PENDEK */}
        <div className="max-w-xl">
          <p className="font-serif text-base sm:text-lg text-[#3E3E3E] font-medium leading-relaxed">
            {currentStep === 'PHOSPHORYLATION' && (
              '“ATP memberikan gugus fosforil kepada reseptor.”'
            )}
            {currentStep === 'ACTIVE_RECEPTOR' && (
              '“Insulin mulai menimbulkan efek biologis ketika berikatan dengan reseptornya. Ikatan insulin mengaktifkan tirosin kinase dan menyebabkan reseptor terfosforilasi.”'
            )}
            {currentStep === 'GLUT4_TRANSLOCATION' && (
              '“Sinyal insulin menyebabkan lebih banyak transporter GLUT4 berada pada membran sel.”'
            )}
            {currentStep === 'GLUCOSE_ENTRY' && (
              '“Bertambahnya GLUT4 meningkatkan pengambilan glukosa oleh sel otot dan jaringan lemak. Struktur kimia glukosa tidak berubah ketika melewati GLUT4.”'
            )}
          </p>

          {/* Akibat akhir pada adegan 4 */}
          {currentStep === 'GLUCOSE_ENTRY' && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-semibold text-[#706B5C]">
              <div className="flex items-center gap-1.5 justify-center bg-[#F5F2EA] px-2.5 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B705C]" /> Pengambilan glukosa meningkat
              </div>
              <div className="flex items-center gap-1.5 justify-center bg-[#F5F2EA] px-2.5 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B705C]" /> Penyimpanan glukosa meningkat
              </div>
              <div className="flex items-center gap-1.5 justify-center bg-[#F5F2EA] px-2.5 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B705C]" /> Glukosa darah menuju normal
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
