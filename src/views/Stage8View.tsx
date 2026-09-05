/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Stage8ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

type Stage8Step = 'DEPHOSPHORYLATION' | 'GRADUAL_RETURN';

export const Stage8View: React.FC<Stage8ViewProps> = ({ isPlaying, speed }) => {
  const [currentStep, setCurrentStep] = useState<Stage8Step>('DEPHOSPHORYLATION');

  // Auto transition when playing
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 4000 / speed;
    const timer = setInterval(() => {
      setCurrentStep(prev => prev === 'DEPHOSPHORYLATION' ? 'GRADUAL_RETURN' : 'DEPHOSPHORYLATION');
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-6 min-h-[520px] justify-between">
        
        {/* Kontrol Langkah Bersih */}
        <div className="flex items-center gap-2 bg-[#F5F2EA] p-1.5 rounded-2xl border border-[#E5E2D9]">
          <button
            onClick={() => setCurrentStep('DEPHOSPHORYLATION')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStep === 'DEPHOSPHORYLATION' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            1. Reaksi Defosforilasi Reseptor
          </button>
          <button
            onClick={() => setCurrentStep('GRADUAL_RETURN')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStep === 'GRADUAL_RETURN' ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            2. Akibat Bertahap Pasca-Defosforilasi
          </button>
        </div>

        {/* ILUSTRASI VEKTOR 2D BERSIH */}
        <div className="w-full max-w-lg py-2">
          {currentStep === 'DEPHOSPHORYLATION' ? (
            <svg viewBox="0 0 520 230" className="w-full h-auto select-none mx-auto animate-in fade-in duration-300">
              {/* Membran Sel */}
              <rect x="20" y="70" width="480" height="20" rx="4" fill="#E5E2D9" />
              <text x="40" y="55" fontSize="10" fontWeight="bold" fill="#6B705C">Luar Sel</text>
              <text x="40" y="110" fontSize="10" fontWeight="bold" fill="#A5A58D">Dalam Sel (Sitosol)</text>

              {/* Reseptor Intraseluler */}
              <g transform="translate(260, 80)">
                {/* Batang Transmembran */}
                <line x1="-15" y1="-10" x2="-15" y2="40" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />
                <line x1="15" y1="-10" x2="15" y2="40" stroke="#6B705C" strokeWidth="6" strokeLinecap="round" />

                {/* Domain Tirosin Bebas Kembali (IR–Tyr–OH) */}
                <rect x="-35" y="40" width="70" height="28" rx="6" fill="#CB997E" />
                <text x="0" y="58" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                  IR–Tyr–OH
                </text>

                {/* Gugus Fosfat Melepaskan Diri (Pi) */}
                <g transform="translate(95, 54)">
                  <circle cx="0" cy="0" r="14" fill="#E9C46A" stroke="#CB997E" strokeWidth="2" />
                  <text x="0" y="4" fontSize="11" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">Pi</text>
                  <text x="0" y="24" fontSize="9" fontWeight="bold" fill="#6B705C" textAnchor="middle">Fosfat Bebas</text>
                </g>
              </g>

              {/* Molekul H2O Masuk untuk Hidrolisis */}
              <g transform="translate(150, 134)">
                <circle cx="0" cy="0" r="16" fill="#F5F2EA" stroke="#6B705C" strokeWidth="1.5" />
                <text x="0" y="4" fontSize="10" fontWeight="bold" fill="#6B705C" textAnchor="middle">H₂O</text>
                <text x="0" y="26" fontSize="8" fontWeight="bold" fill="#A5A58D" textAnchor="middle">Pereaksi</text>
              </g>

              {/* Garis Pemutusan Ikatan Fosfoester */}
              <line x1="295" y1="134" x2="335" y2="134" stroke="#CB997E" strokeWidth="2" strokeDasharray="3 3" />
              <text x="315" y="125" fontSize="8" fontWeight="bold" fill="#CB997E" textAnchor="middle">Ikatan diputus</text>

              {/* Keterangan Enzim */}
              <rect x="185" y="180" width="150" height="26" rx="6" fill="#F5F2EA" stroke="#E5E2D9" />
              <text x="260" y="197" fontSize="10" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                Protein Tirosin Fosfatase
              </text>
            </svg>
          ) : (
            <svg viewBox="0 0 520 230" className="w-full h-auto select-none mx-auto animate-in fade-in duration-300">
              {/* Membran Sel dengan Pengurangan GLUT4 Secara Bertahap */}
              <rect x="20" y="70" width="480" height="20" rx="4" fill="#E5E2D9" />
              <text x="40" y="55" fontSize="10" fontWeight="bold" fill="#6B705C">Membran Sel (GLUT4 Berkurang)</text>
              <text x="40" y="215" fontSize="10" fontWeight="bold" fill="#A5A58D">Sitosol</text>

              {/* Satu GLUT4 tersisa di membran (tingkat basal) */}
              <g transform="translate(180, 68)">
                <rect x="-14" y="0" width="28" height="24" rx="4" fill="#A5A58D" opacity="0.6" />
                <text x="0" y="-8" fontSize="8" fontWeight="bold" fill="#A5A58D" textAnchor="middle">GLUT4 basal</text>
              </g>

              {/* GLUT4 ditarik kembali ke dalam vesikel (endositosis bertahap) */}
              <g transform="translate(340, 140)">
                <circle cx="0" cy="0" r="30" fill="#F5F2EA" stroke="#A5A58D" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="-8" y="-10" width="16" height="20" rx="3" fill="#A5A58D" opacity="0.7" />
                <text x="0" y="20" fontSize="8" fontWeight="bold" fill="#706B5C" textAnchor="middle">Vesikel ditarik</text>
              </g>
              <line x1="340" y1="92" x2="340" y2="108" stroke="#A5A58D" strokeWidth="2" strokeDasharray="3 3" />

              {/* Reseptor tidak aktif */}
              <g transform="translate(100, 80)">
                <line x1="-10" y1="-10" x2="-10" y2="35" stroke="#A5A58D" strokeWidth="5" strokeLinecap="round" />
                <line x1="10" y1="-10" x2="10" y2="35" stroke="#A5A58D" strokeWidth="5" strokeLinecap="round" />
                <rect x="-25" y="35" width="50" height="22" rx="4" fill="#E5E2D9" />
                <text x="0" y="50" fontSize="9" fontWeight="bold" fill="#706B5C" textAnchor="middle">IR–Tyr–OH</text>
                <text x="0" y="72" fontSize="8" fontWeight="bold" fill="#A5A58D" textAnchor="middle">Tidak Aktif</text>
              </g>

              {/* Keterangan Proses Bertahap */}
              <g transform="translate(260, 185)">
                <rect x="-140" y="0" width="280" height="30" rx="8" fill="#F5F2EA" stroke="#E5E2D9" />
                <text x="0" y="19" fontSize="10" fontWeight="bold" fill="#6B705C" textAnchor="middle">
                  Respons Sel Kembali ke Tingkat Basal
                </text>
              </g>
            </svg>
          )}
        </div>

        {/* RINCIAN REAKSI / TAHAPAN BERTAHAP */}
        <div className="w-full max-w-xl space-y-2">
          {currentStep === 'DEPHOSPHORYLATION' ? (
            <div className="space-y-3">
              <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] font-mono text-xs sm:text-sm font-bold text-[#3E3E3E]">
                IR–Tyr–OPO₃²⁻ + H₂O —protein tirosin fosfatase→ IR–Tyr–OH + Pi
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-left">
                <div className="p-2 bg-[#F5F2EA] rounded-xl">
                  <span className="font-bold text-[#6B705C] block">Pereaksi:</span>
                  <span className="text-[#3E3E3E]">IR–Tyr–OPO₃²⁻ & H₂O</span>
                </div>
                <div className="p-2 bg-[#F5F2EA] rounded-xl">
                  <span className="font-bold text-[#6B705C] block">Ikatan diputus:</span>
                  <span className="text-[#3E3E3E]">Fosfoester pada tirosin</span>
                </div>
                <div className="p-2 bg-[#F5F2EA] rounded-xl">
                  <span className="font-bold text-[#6B705C] block">Dilepaskan:</span>
                  <span className="text-[#3E3E3E]">Fosfat anorganik (Pi)</span>
                </div>
                <div className="p-2 bg-[#F5F2EA] rounded-xl">
                  <span className="font-bold text-[#6B705C] block">Produk:</span>
                  <span className="text-[#3E3E3E]">Reseptor Tyr–OH</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Dua Prinsip Kunci Sesuai Arahan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                <div className="p-2 bg-[#F5F2EA] rounded-xl text-[#6B705C] border border-[#E5E2D9]">
                  Fosforilasi = reseptor aktif dan respons insulin berlangsung
                </div>
                <div className="p-2 bg-[#F5F2EA] rounded-xl text-[#706B5C] border border-[#E5E2D9]">
                  Defosforilasi = reseptor dinonaktifkan dan respons kembali ke kondisi basal
                </div>
              </div>

              {/* 7 Akibat Bertahap */}
              <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] text-left text-[11px] text-[#706B5C] space-y-1">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#6B705C] shrink-0" /> 1. Reseptor tidak lagi meneruskan sinyal baru</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#6B705C] shrink-0" /> 2. Sinyal di dalam sel melemah</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#6B705C] shrink-0" /> 3. Vesikel GLUT4 secara bertahap ditarik kembali dari membran</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#6B705C] shrink-0" /> 4. Jumlah GLUT4 pada membran berkurang</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#6B705C] shrink-0" /> 5. Pengambilan glukosa kembali menuju tingkat basal</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#6B705C] shrink-0" /> 6. Rangsangan penyimpanan glukosa berkurang</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#6B705C] shrink-0" /> 7. Insulin dapat terlepas dari reseptor</div>
              </div>
            </div>
          )}
        </div>

        {/* TEKS NARASI SINGKAT MAKSIMAL DUA KALIMAT PENDEK */}
        <div className="max-w-xl">
          <p className="font-serif text-base sm:text-lg text-[#3E3E3E] font-medium leading-relaxed">
            {currentStep === 'DEPHOSPHORYLATION' ? (
              '“Ketika sinyal insulin tidak lagi diperlukan, enzim fosfatase melepaskan gugus fosfat dari reseptor melalui hidrolisis.”'
            ) : (
              '“Setelah fosfat dilepaskan, reseptor kembali ke aktivitas rendah. Sinyal insulin melemah dan respons sel secara bertahap kembali ke kondisi basal.”'
            )}
          </p>
        </div>

      </div>
    </div>
  );
};
