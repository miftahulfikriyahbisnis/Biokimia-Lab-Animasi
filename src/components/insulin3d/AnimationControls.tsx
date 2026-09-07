/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  Camera,
  Sparkles
} from 'lucide-react';
import { Insulin3DStage } from './types';

interface AnimationControlsProps {
  currentStage: Insulin3DStage;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
  isFullscreen: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  onChangeSpeed: (s: number) => void;
  onToggleLabels: () => void;
  onResetCamera: () => void;
  onToggleFullscreen: () => void;
  onSelectStage: (st: Insulin3DStage) => void;
  onOpenTryItYourself: () => void;
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  currentStage,
  isPlaying,
  speed,
  showLabels,
  isFullscreen,
  onTogglePlay,
  onReset,
  onPrevStage,
  onNextStage,
  onChangeSpeed,
  onToggleLabels,
  onResetCamera,
  onToggleFullscreen,
  onSelectStage,
  onOpenTryItYourself
}) => {
  const stages: Insulin3DStage[] = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="bg-white/94 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-[#E5E2D9] shadow-lg space-y-2">
      {/* 1. Bar Navigasi Pemilihan Langsung Tahap 1 s.d 7 */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-0.5">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap">
          {stages.map((st) => (
            <button
              key={st}
              onClick={() => onSelectStage(st)}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                currentStage === st
                  ? 'bg-[#6B705C] text-white shadow-xs'
                  : currentStage > st
                  ? 'bg-[#E5E2D9] text-[#3E3E3E] hover:bg-[#D4CEBF]'
                  : 'bg-[#F5F2EA] text-[#706B5C] hover:bg-[#E5E2D9]'
              }`}
              title={`Lompat ke Tahap ${st}`}
            >
              <span>{st}</span>
              <span className="hidden lg:inline font-normal text-[11px]">
                {st === 1 && 'Glukosa Naik'}
                {st === 2 && 'Insulin Datang'}
                {st === 3 && 'Ikatan Reseptor'}
                {st === 4 && 'Sinyal Aktif'}
                {st === 5 && 'Translokasi GLUT4'}
                {st === 6 && 'GLUT4 di Membran'}
                {st === 7 && 'Glukosa Masuk'}
              </span>
            </button>
          ))}
        </div>

        {/* Tombol Fitur Interaktif 'Coba Sendiri' */}
        <button
          onClick={onOpenTryItYourself}
          className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all shrink-0 ml-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Coba Sendiri</span>
        </button>
      </div>

      {/* 2. Bar Utama Kontrol Pemutaran & Pengaturan */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#E5E2D9]/70">
        {/* Grup Pemutaran: Prev, Play/Pause, Next, Reset */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={onPrevStage}
            disabled={currentStage <= 1}
            className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Tahap Sebelumnya"
            aria-label="Tahap Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585C4C] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            title={isPlaying ? 'Jeda Simulasi' : 'Mulai / Lanjutkan Simulasi'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentStage === 7 ? 'Ulangi' : 'Mulai'}</span>
              </>
            )}
          </button>

          <button
            onClick={onNextStage}
            disabled={currentStage >= 7}
            className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Tahap Berikutnya"
            aria-label="Tahap Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] cursor-pointer transition-colors"
            title="Ulangi dari Tahap 1"
            aria-label="Ulangi dari awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Grup Kecepatan: 0.5x, 1x, 2x */}
        <div className="flex items-center gap-1 bg-[#F5F2EA] p-1 rounded-xl border border-[#E5E2D9]">
          <span className="text-[11px] font-semibold text-[#706B5C] px-1.5">Laju:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => onChangeSpeed(s)}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                speed === s
                  ? 'bg-[#6B705C] text-white shadow-xs'
                  : 'text-[#706B5C] hover:text-[#3E3E3E]'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        {/* Grup Tampilan: Label, Reset Kamera, Fullscreen */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleLabels}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              showLabels
                ? 'bg-[#FAF8F2] text-[#6B705C] border-[#6B705C]/30'
                : 'bg-white text-[#A5A58D] border-[#E5E2D9] hover:text-[#706B5C]'
            }`}
            title={showLabels ? 'Sembunyikan Label 3D' : 'Tampilkan Label 3D'}
          >
            {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Label 3D</span>
          </button>

          <button
            onClick={onResetCamera}
            className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] border border-[#E5E2D9] cursor-pointer transition-colors"
            title="Reset Sudut Pandang Kamera"
            aria-label="Reset Kamera"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] border border-[#E5E2D9] cursor-pointer transition-colors"
            title={isFullscreen ? 'Keluar dari Layar Penuh' : 'Mode Layar Penuh'}
            aria-label="Layar Penuh"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
