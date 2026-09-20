/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Utensils, Activity, Zap, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

interface CarboLoadingIllustrationProps {
  intakeLevel?: number; // 1: Basal (80mg/dL), 2: Normal (120mg/dL), 3: Carbo-loading (180mg/dL)
  onIntakeChange?: (level: number) => void;
  interactive?: boolean;
}

export const CarboLoadingIllustration: React.FC<CarboLoadingIllustrationProps> = ({
  intakeLevel = 3,
  onIntakeChange,
  interactive = true,
}) => {
  const [internalLevel, setInternalLevel] = useState<number>(intakeLevel);
  const currentLevel = onIntakeChange ? intakeLevel : internalLevel;

  const handleLevelChange = (lvl: number) => {
    setInternalLevel(lvl);
    if (onIntakeChange) {
      onIntakeChange(lvl);
    }
  };

  // State metrics
  const metrics = {
    1: { label: 'Kondisi Basal (Puasa Singkat)', bg: 85, insulin: 'Rendah (10 μIU/mL)', status: 'Pemecahan glikogen basal', dotCount: 5 },
    2: { label: 'Pasca-Makan Ringan', bg: 120, insulin: 'Sedang (35 μIU/mL)', status: 'Kebutuhan seluler terpenuhi', dotCount: 10 },
    3: { label: 'Carbo-Loading Ekstrem', bg: 175, insulin: 'Tinggi (80+ μIU/mL)', status: 'Surplus! Kelebihan wajib disimpan', dotCount: 18 },
  }[currentLevel as 1 | 2 | 3] || { label: 'Carbo-Loading', bg: 175, insulin: 'Tinggi', status: 'Surplus', dotCount: 18 };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      
      {/* 1. Indikator Rantai Peristiwa Berurutan Sesuai Panduan */}
      <div className="w-full max-w-xl mb-4 bg-white/95 backdrop-blur-xs rounded-xl border border-stone-200/90 p-3 shadow-2xs">
        <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-stone-700">
          
          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900 mb-1">
              <Utensils className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] text-stone-500 font-mono">1. Asupan</span>
            <span className="font-bold text-amber-950 text-[11px] leading-tight">Tinggi Karbohidrat</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 mx-0.5" />

          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-red-100 text-red-900 mb-1">
              <Activity className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] text-stone-500 font-mono">2. Sirkulasi</span>
            <span className="font-bold text-red-950 text-[11px] leading-tight">Glukosa Darah ↑</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 mx-0.5" />

          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900 mb-1">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] text-stone-500 font-mono">3. Hormonal</span>
            <span className="font-bold text-blue-950 text-[11px] leading-tight">Insulin Pankreas ↑</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 mx-0.5" />

          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-900 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] text-stone-500 font-mono">4. Homeostasis</span>
            <span className="font-bold text-emerald-950 text-[11px] leading-tight">Dialirkan & Disimpan</span>
          </div>

        </div>
      </div>

      {/* 2. Kanvas SVG Orisinal: Atlet, Makanan, Pembuluh Darah & Pankreas */}
      <div className="w-full max-w-lg relative bg-gradient-to-b from-stone-50 via-white to-amber-50/40 rounded-2xl border border-stone-200/90 shadow-xs p-3 overflow-hidden">
        <svg viewBox="0 0 520 300" className="w-full h-auto drop-shadow-xs">
          <defs>
            {/* Gradien Pembuluh Darah */}
            <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#EF4444" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.9" />
            </linearGradient>

            {/* Pola Dinding Sel */}
            <linearGradient id="pancGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Background elemen dekoratif seluler */}
          <rect x="10" y="10" width="500" height="280" rx="16" fill="#FDFBF7" stroke="#E5E2D9" strokeWidth="1" />

          {/* Area Kiri: Atlet Lari & Makanan Tinggi Karbohidrat */}
          <g transform="translate(25, 30)">
            {/* Siluet Atlet Modern */}
            <circle cx="55" cy="45" r="16" fill="#44403C" />
            {/* Badan Atlet */}
            <path
              d="M 45 65 C 40 85 42 115 55 125 L 58 160 L 50 200 L 62 200 L 72 165 L 80 120 C 80 100 70 65 65 65 Z"
              fill="#292524"
            />
            {/* Lengan lari dinamis */}
            <path d="M 46 72 L 25 95 L 30 115" stroke="#292524" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 65 72 L 85 85 L 75 110" stroke="#292524" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Kaki melangkah */}
            <path d="M 52 145 L 30 175 L 20 210" stroke="#292524" strokeWidth="8" strokeLinecap="round" fill="none" />
            
            {/* Piring Carbo-loading (Pasta / Karbohidrat Kompleks) */}
            <g transform="translate(15, 215)">
              <ellipse cx="40" cy="18" rx="35" ry="10" fill="#E7E5E4" stroke="#A8A29E" strokeWidth="1.5" />
              <ellipse cx="40" cy="14" rx="28" ry="7" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
              {/* Mie / Pasta Karbohidrat */}
              <path d="M 22 14 Q 30 7 40 13 Q 50 17 58 13" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
              <path d="M 26 16 Q 35 10 44 15 Q 52 18 55 15" stroke="#D97706" strokeWidth="2" fill="none" />
              <text x="40" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350F">
                Asupan Pasta & Nasi (Pati)
              </text>
            </g>
          </g>

          {/* Saluran Cerna Menuju Vena Porta */}
          <g transform="translate(135, 120)">
            <path
              d="M 0 50 C 25 50 35 25 60 25 L 85 25"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="4 3"
              fill="none"
            />
            <circle cx="85" cy="25" r="5" fill="#D97706" />
            <text x="35" y="15" fontSize="8" fontWeight="bold" fill="#92400E">
              Absorpsi Glukosa Usus
            </text>
          </g>

          {/* Pembuluh Darah Utama (Arteri / Kapiler Sistemik) */}
          <g transform="translate(225, 45)">
            {/* Dinding pembuluh atas & bawah */}
            <path
              d="M 0 50 Q 80 40 160 50 T 260 50 L 260 120 Q 180 110 100 120 T 0 120 Z"
              fill="url(#bloodGradient)"
              opacity="0.9"
            />
            
            {/* Label Pembuluh Darah */}
            <rect x="60" y="30" width="140" height="18" rx="6" fill="#7F1D1D" />
            <text x="130" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FEE2E2">
              Sirkulasi Darah Sistemik
            </text>

            {/* Molekul Glukosa Melayang di Darah (Jumlah dinamis sesuai intake) */}
            {Array.from({ length: metrics.dotCount }).map((_, i) => {
              const xPos = 20 + (i * 230) / metrics.dotCount;
              const yPos = 65 + ((i * 17) % 40);
              return (
                <g key={i} className="animate-pulse" style={{ animationDuration: `${1.5 + (i % 3) * 0.4}s` }}>
                  {/* Hexagon Glukosa */}
                  <polygon
                    points={`${xPos},${yPos - 5} ${xPos + 5},${yPos - 2.5} ${xPos + 5},${yPos + 3.5} ${xPos},${yPos + 6} ${xPos - 5},${yPos + 3.5} ${xPos - 5},${yPos - 2.5}`}
                    fill="#FDE047"
                    stroke="#CA8A04"
                    strokeWidth="1"
                  />
                  <circle cx={xPos} cy={yPos + 0.5} r="1.5" fill="#854D0E" />
                </g>
              );
            })}

            {/* Badge Glukosa Darah Saat Ini */}
            <g transform="translate(85, 75)">
              <rect x="0" y="0" width="90" height="22" rx="6" fill="#1C1917" opacity="0.92" />
              <text x="45" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FEF08A">
                {metrics.bg} mg/dL
              </text>
            </g>
          </g>

          {/* Pankreas & Sekresi Insulin */}
          <g transform="translate(230, 185)">
            {/* Organ Pankreas */}
            <path
              d="M 10 30 C 35 10 90 15 130 25 C 160 35 150 55 120 55 C 80 55 40 65 15 50 Z"
              fill="url(#pancGradient)"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            {/* Sel Beta Pankreas */}
            <circle cx="50" cy="35" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="85" cy="32" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="115" cy="36" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            
            <text x="75" y="68" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350F">
              Pankreas (Sel Beta Pulau Langerhans)
            </text>

            {/* Vesikel Insulin Mengalir Keluar Menuju Sirkulasi */}
            <path d="M 60 20 Q 75 -10 110 -20" stroke="#3B82F6" strokeWidth="3" strokeDasharray="3 3" fill="none" />
            <circle cx="110" cy="-20" r="4" fill="#2563EB" />
            <text x="140" y="-18" fontSize="9" fontWeight="bold" fill="#1D4ED8">
              Sekresi Insulin ↑
            </text>
          </g>

          {/* Panah Aliran Keluar Menuju Organ Target */}
          <g transform="translate(430, 95)">
            <path d="M 10 15 L 60 15" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
            <polygon points="65,15 55,10 55,20" fill="#10B981" />
            <text x="35" y="32" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#065F46">
              Ke Hati & Otot
            </text>
          </g>
        </svg>
      </div>

      {/* 3. Slider Interaktif Tingkat Beban Asupan Karbohidrat */}
      {interactive && (
        <div className="w-full max-w-xl mt-3 p-3 bg-white border border-stone-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-900 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-red-600" />
              <span>Simulasi Fisiologis Asupan Makanan Atlet:</span>
            </span>
            <span className="font-bold font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
              {metrics.label}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleLevelChange(1)}
              className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                currentLevel === 1 
                  ? 'bg-stone-900 text-amber-300 border-stone-800 shadow-2xs' 
                  : 'bg-[#FAF8F5] border-stone-200 hover:bg-stone-100 text-stone-700'
              }`}
            >
              Basal (80 mg/dL)
            </button>
            <button
              type="button"
              onClick={() => handleLevelChange(2)}
              className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                currentLevel === 2 
                  ? 'bg-stone-900 text-amber-300 border-stone-800 shadow-2xs' 
                  : 'bg-[#FAF8F5] border-stone-200 hover:bg-stone-100 text-stone-700'
              }`}
            >
              Makan Biasa (120 mg/dL)
            </button>
            <button
              type="button"
              onClick={() => handleLevelChange(3)}
              className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                currentLevel === 3 
                  ? 'bg-amber-600 text-white border-amber-700 shadow-2xs font-bold' 
                  : 'bg-[#FAF8F5] border-stone-200 hover:bg-stone-100 text-stone-700'
              }`}
            >
              Carbo-Loading (175 mg/dL)
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-100">
            <span>Respons Insulin: <strong>{metrics.insulin}</strong></span>
            <span>Status Metabolik: <strong className="text-amber-900">{metrics.status}</strong></span>
          </div>
        </div>
      )}

    </div>
  );
};
