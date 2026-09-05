/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StageNumber } from '../types';
import { getStageByNumber } from '../data/stages';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Play, 
  Pause, 
  Gauge, 
  FileText,
  RotateCw
} from 'lucide-react';

interface TimelineControlProps {
  currentStage: StageNumber;
  onPrevStage: () => void;
  onNextStage: () => void;
  onReplayStage: () => void;
  onRestartAll: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: 0.5 | 1 | 1.5;
  onChangeSpeed: (speed: 0.5 | 1 | 1.5) => void;
  captionsEnabled: boolean;
  onToggleCaptions: () => void;
}

export const TimelineControl: React.FC<TimelineControlProps> = ({
  currentStage,
  onPrevStage,
  onNextStage,
  onReplayStage,
  onRestartAll,
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  captionsEnabled,
  onToggleCaptions
}) => {
  const stageInfo = getStageByNumber(currentStage);
  const isFirst = currentStage === 1;
  const isLast = currentStage === 9;

  return (
    <nav 
      id="app-timeline-control"
      aria-label="Kontrol Animasi Pembelajaran"
      className="bg-white/95 backdrop-blur-md border-t border-[#E5E2D9] px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md fixed bottom-0 left-0 right-0 z-30"
    >
      {/* Kiri: Tombol Sebelumnya & Ulangi Seluruh Animasi */}
      <div className="flex items-center gap-2">
        <button
          id="btn-stage-prev"
          onClick={onPrevStage}
          disabled={isFirst}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            !isFirst 
              ? 'bg-[#F5F2EA] text-[#706B5C] hover:bg-[#E5E2D9] hover:text-[#3E3E3E] border border-[#E5E2D9] active:scale-95' 
              : 'bg-[#FDFCF9] text-[#A5A58D]/40 border border-[#E5E2D9]/40 cursor-not-allowed'
          }`}
          title="Kembali ke Tahap Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          id="btn-restart-all"
          onClick={onRestartAll}
          className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] border border-[#E5E2D9] transition-colors hidden sm:flex items-center gap-1 text-xs"
          title="Ulangi Seluruh Animasi dari Tahap 1"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Ulangi Semua</span>
        </button>
      </div>

      {/* Tengah: Putar/Jeda, Ulangi Tahap, Kecepatan, Caption */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Putar / Jeda */}
        <button
          id="btn-stage-playpause"
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all ${
            isPlaying 
              ? 'bg-[#CB997E] text-white hover:bg-[#b8856b]' 
              : 'bg-[#6B705C] text-white hover:bg-[#585D4B]'
          }`}
          title={isPlaying ? "Jeda Animasi" : "Putar Animasi"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
        </button>

        {/* Ulangi Tahap Ini */}
        <button
          id="btn-stage-replay"
          onClick={onReplayStage}
          className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] border border-[#E5E2D9] transition-colors flex items-center gap-1 text-xs"
          title="Ulangi Tahap Ini"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden lg:inline">Ulangi Tahap</span>
        </button>

        {/* Pemilihan Kecepatan */}
        <div className="flex items-center bg-[#F5F2EA] p-1 rounded-xl border border-[#E5E2D9] text-xs">
          <span className="hidden sm:inline-flex px-1.5 text-[11px] font-bold text-[#A5A58D] items-center gap-0.5">
            <Gauge className="w-3 h-3" />
          </span>
          {([0.5, 1, 1.5] as const).map(s => (
            <button
              key={s}
              id={`btn-speed-${s}`}
              onClick={() => onChangeSpeed(s)}
              className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                speed === s 
                  ? 'bg-white text-[#6B705C] shadow-xs' 
                  : 'text-[#706B5C] hover:text-[#3E3E3E]'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        {/* Caption / Keterangan Toggle */}
        <button
          id="btn-toggle-caption"
          onClick={onToggleCaptions}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            captionsEnabled 
              ? 'bg-[#6B705C]/15 border-[#6B705C] text-[#6B705C]' 
              : 'border-[#E5E2D9] bg-white text-[#A5A58D] hover:text-[#3E3E3E]'
          }`}
          title={captionsEnabled ? "Sembunyikan Keterangan Teks" : "Tampilkan Keterangan Teks"}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Keterangan</span>
        </button>
      </div>

      {/* Kanan: Tombol Selanjutnya / Rangkuman */}
      <div className="flex items-center gap-2">
        <button
          id="btn-stage-next"
          onClick={onNextStage}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#6B705C] text-white hover:bg-[#585D4B] shadow-sm transition-all active:scale-95"
          title={isLast ? "Buka Rangkuman Akhir" : "Lanjut ke Tahap Berikutnya"}
        >
          <span>{isLast ? 'Rangkuman' : 'Selanjutnya'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
