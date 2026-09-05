/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StageNumber } from '../types';
import { getStageByNumber } from '../data/stages';
import { FlaskConical } from 'lucide-react';

interface StageHeaderProps {
  stageNumber: StageNumber;
  onSelectStage?: (num: StageNumber) => void;
}

export const StageHeader: React.FC<StageHeaderProps> = ({
  stageNumber,
  onSelectStage
}) => {
  const meta = getStageByNumber(stageNumber);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E5E2D9] shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#6B705C]">
            <FlaskConical className="w-4 h-4 text-[#CB997E]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
              Tahap {stageNumber} dari 9
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3E3E3E] tracking-tight">
            {meta.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#706B5C]">
            {meta.subtitle}
          </p>
        </div>

        {/* Mini Stage Selector */}
        <div className="flex items-center gap-1 bg-[#F5F2EA] p-1.5 rounded-2xl border border-[#E5E2D9]">
          {([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map(num => (
            <button
              key={num}
              onClick={() => onSelectStage?.(num)}
              className={`w-7 h-7 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                num === stageNumber
                  ? 'bg-[#6B705C] text-white shadow-xs'
                  : num < stageNumber
                  ? 'bg-white text-[#6B705C] hover:bg-[#E5E2D9]'
                  : 'text-[#A5A58D] hover:bg-white hover:text-[#3E3E3E]'
              }`}
              title={`Buka Tahap ${num}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar (Visual Segmented Progress) */}
      <div className="space-y-1.5 pt-1">
        <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden flex">
          <div 
            className="bg-[#6B705C] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(stageNumber / 9) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[#A5A58D] font-medium">
          <span>Klasifikasi & Sifat</span>
          <span>Pematangan & Pelepasan</span>
          <span>Aksi & Terminasi Sinyal</span>
        </div>
      </div>
    </div>
  );
};
