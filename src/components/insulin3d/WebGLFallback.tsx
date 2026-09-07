/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { STAGE_INFOS, Insulin3DStage } from './types';

interface WebGLFallbackProps {
  currentStage: Insulin3DStage;
  onSelectStage: (st: Insulin3DStage) => void;
  onRetry: () => void;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  currentStage,
  onSelectStage,
  onRetry
}) => {
  const stageInfo = STAGE_INFOS[currentStage];

  return (
    <div className="w-full bg-[#FAF8F2] rounded-3xl p-6 sm:p-10 border border-[#E5E2D9] space-y-6 text-center">
      <div className="max-w-md mx-auto space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
          Mode Tampilan Terstruktur (Fallback WebGL)
        </h3>
        <p className="text-xs text-[#706B5C] leading-relaxed">
          Browser atau perangkat Anda menggunakan rendering terstruktur langkah demi langkah untuk visualisasi mekanisme kerja insulin.
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B705C] text-white text-xs font-bold hover:bg-[#585C4C] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Muat Ulang Akselerasi 3D</span>
        </button>
      </div>

      {/* Navigasi Tahap 1 s.d 7 */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {([1, 2, 3, 4, 5, 6, 7] as Insulin3DStage[]).map((st) => (
          <button
            key={st}
            onClick={() => onSelectStage(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStage === st
                ? 'bg-[#6B705C] text-white shadow-xs'
                : 'bg-white text-[#706B5C] border border-[#E5E2D9] hover:bg-[#F5F2EA]'
            }`}
          >
            Tahap {st}
          </button>
        ))}
      </div>

      {/* Konten Tahap Saat Ini */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-[#E5E2D9] text-left space-y-4 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#6B705C] uppercase tracking-wider">
            Tahap {currentStage} dari 7
          </span>
          <h4 className="font-serif font-bold text-xl text-[#3E3E3E]">
            {stageInfo.title}
          </h4>
          <p className="text-xs text-[#706B5C]">{stageInfo.subtitle}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] font-serif text-base font-semibold text-[#3E3E3E]">
          “{stageInfo.narrativeText}”
        </div>

        <div className="space-y-2 text-xs text-[#3E3E3E]">
          <div className="font-bold text-[#6B705C]">Rincian Ilmiah:</div>
          <p className="leading-relaxed bg-[#F5F2EA] p-3 rounded-xl">
            {stageInfo.scientificDetail}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#6B705C]">
          <CheckCircle2 className="w-4 h-4 text-[#CB997E]" />
          <span>Dampak: {stageInfo.bloodGlucoseEffect}</span>
        </div>
      </div>
    </div>
  );
};
