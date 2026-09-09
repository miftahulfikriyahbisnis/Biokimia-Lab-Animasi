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
  Maximize2, 
  Minimize2, 
  Eye, 
  EyeOff, 
  Compass, 
  Zap, 
  BookOpen, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

interface CarbSceneControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReplay: () => void;
  currentStep?: number;
  totalSteps?: number;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  speed: number;
  onChangeSpeed: (newSpeed: number) => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  onResetCamera: () => void;
  isEasyMode?: boolean;
  onToggleEasyMode?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  captionTitle?: string;
}

export const CarbSceneControls: React.FC<CarbSceneControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReplay,
  currentStep = 1,
  totalSteps = 1,
  onPrevStep,
  onNextStep,
  speed,
  onChangeSpeed,
  showLabels,
  onToggleLabels,
  onResetCamera,
  isEasyMode = false,
  onToggleEasyMode,
  isFullscreen = false,
  onToggleFullscreen,
  captionTitle
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E5E2D9] shadow-xs text-xs">
      
      {/* Sisi Kiri: Kontrol Putar & Navigasi Tahap */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
            isPlaying 
              ? 'bg-[#E8EDE0] text-[#585D4B] hover:bg-[#D9E2CE]' 
              : 'bg-[#6B705C] text-white hover:bg-[#585D4B]'
          }`}
          title={isPlaying ? 'Jeda animasi' : 'Lanjutkan animasi'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isPlaying ? 'Jeda' : 'Putar'}</span>
        </button>

        <button
          onClick={onReplay}
          className="p-1.5 rounded-xl hover:bg-[#F5F2EA] text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer border border-[#E5E2D9]"
          title="Ulangi dari awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {totalSteps > 1 && (
          <div className="flex items-center gap-1 border-l border-[#E5E2D9] pl-2 ml-1">
            <button
              onClick={onPrevStep}
              disabled={currentStep <= 1}
              className={`p-1.5 rounded-xl border border-[#E5E2D9] transition-colors ${
                currentStep <= 1 
                  ? 'opacity-40 cursor-not-allowed text-[#A5A58D]' 
                  : 'hover:bg-[#F5F2EA] text-[#706B5C] cursor-pointer'
              }`}
              title="Tahap Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-semibold text-[#706B5C] px-1.5">
              {currentStep} / {totalSteps}
            </span>
            <button
              onClick={onNextStep}
              disabled={currentStep >= totalSteps}
              className={`p-1.5 rounded-xl border border-[#E5E2D9] transition-colors ${
                currentStep >= totalSteps 
                  ? 'opacity-40 cursor-not-allowed text-[#A5A58D]' 
                  : 'hover:bg-[#F5F2EA] text-[#706B5C] cursor-pointer'
              }`}
              title="Tahap Berikutnya"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Sisi Tengah: Judul Langkah Aktif */}
      {captionTitle && (
        <div className="hidden lg:flex items-center gap-2 max-w-sm text-[#3E3E3E] font-medium text-xs truncate">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <span className="truncate">{captionTitle}</span>
        </div>
      )}

      {/* Sisi Kanan: Kecepatan, Label, Kamera, Toggle Mode */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Speed Selector */}
        <div className="flex items-center bg-[#F5F2EA] rounded-xl p-0.5 border border-[#E5E2D9]">
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => onChangeSpeed(s)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                speed === s
                  ? 'bg-white text-[#6B705C] shadow-xs'
                  : 'text-[#706B5C] hover:text-[#3E3E3E]'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        {/* Toggle Label */}
        <button
          onClick={onToggleLabels}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer ${
            showLabels 
              ? 'bg-[#F5F2EA] border-[#6B705C]/30 text-[#6B705C]' 
              : 'bg-white border-[#E5E2D9] text-[#A5A58D]'
          }`}
          title={showLabels ? 'Sembunyikan Label Objek' : 'Tampilkan Label Objek'}
        >
          {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span className="hidden md:inline text-[11px] font-medium">Label</span>
        </button>

        {/* Reset Kamera */}
        <button
          onClick={onResetCamera}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#706B5C] border border-[#E5E2D9] transition-colors cursor-pointer"
          title="Reset Posisi Sudut Pandang Kamera"
        >
          <Compass className="w-3.5 h-3.5 text-[#CB997E]" />
          <span className="hidden md:inline text-[11px] font-medium">Reset Kamera</span>
        </button>

        {/* Mode Mudah vs Ilmiah */}
        {onToggleEasyMode && (
          <button
            onClick={onToggleEasyMode}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              isEasyMode 
                ? 'bg-amber-50 border-amber-300 text-amber-800' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-800'
            }`}
            title={isEasyMode ? 'Beralih ke Penjelasan Ilmiah Lengkap' : 'Beralih ke Penjelasan Ringkas & Mudah'}
          >
            {isEasyMode ? <Zap className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-semibold">
              {isEasyMode ? 'Versi Mudah' : 'Penjelasan Ilmiah'}
            </span>
          </button>
        )}

        {/* Fullscreen */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#706B5C] border border-[#E5E2D9] transition-colors cursor-pointer"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
