/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, HelpCircle, Box, BookOpen, X, Maximize, Minimize } from 'lucide-react';
import { Insulin3DStage, InspectableObject, STAGE_INFOS } from './types';
import { InsulinScene3D } from './InsulinScene3D';
import { AnimationControls } from './AnimationControls';
import { ExplanationPanel } from './ExplanationPanel';
import { TryItYourselfModal } from './TryItYourselfModal';
import { WebGLFallback } from './WebGLFallback';

interface Insulin3DModeProps {
  initialSpeed?: number;
}

export const Insulin3DMode: React.FC<Insulin3DModeProps> = ({
  initialSpeed = 1
}) => {
  const [currentStage, setCurrentStage] = useState<Insulin3DStage>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [selectedObject, setSelectedObject] = useState<InspectableObject>(null);
  const [cameraResetTrigger, setCameraResetTrigger] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTryItModalOpen, setIsTryItModalOpen] = useState<boolean>(false);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(false);
  
  // State panel overlay penjelasan (default terbuka pada layar lebar, dapat diciutkan)
  const [isExplanationOpen, setIsExplanationOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Periksa dukungan WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
      }
    } catch {
      setHasWebGLError(true);
    }
  }, []);

  // Auto-progression ketika sedang memutar simulasi
  useEffect(() => {
    if (!isPlaying) return;

    // Durasi per tahap: 4500ms dibagi faktor kecepatan
    const intervalMs = 4500 / speed;
    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < 7) {
          return (prev + 1) as Insulin3DStage;
        } else {
          // Ketika mencapai tahap 7, hentikan pemutaran otomatis
          setIsPlaying(false);
          return 7;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const handleTogglePlay = () => {
    if (currentStage === 7 && !isPlaying) {
      setCurrentStage(1);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStage(1);
    setSelectedObject(null);
    setCameraResetTrigger((prev) => prev + 1);
  };

  const handlePrevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => (prev - 1) as Insulin3DStage);
    }
  };

  const handleNextStage = () => {
    if (currentStage < 7) {
      setCurrentStage((prev) => (prev + 1) as Insulin3DStage);
    }
  };

  const handleSelectStage = (st: Insulin3DStage) => {
    setCurrentStage(st);
  };

  const handleSelectObject = (obj: InspectableObject) => {
    setSelectedObject(obj);
    if (obj) {
      setIsExplanationOpen(true);
    }
  };

  const handleResetCamera = () => {
    setCameraResetTrigger((prev) => prev + 1);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {
        setIsFullscreen(!isFullscreen);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const stageInfo = STAGE_INFOS[currentStage];

  return (
    <div className="w-full flex flex-col flex-1">
      {/* 
        CONTAINER UTAMA ANIMASI 3D:
        - Lebar 100% mengisi seluruh container halaman
        - Tinggi dinamis: calc(100vh - 210px) pada desktop dengan min-height 650px
        - Pada mobile: minimal 65vh dan responsif
        - Menghilangkan pembatas fixed width, fixed height kecil, max-width sempit, atau aspect-ratio yang menghimpit canvas
      */}
      <div
        ref={containerRef}
        id="insulin-3d-main-container"
        className={`w-full relative rounded-3xl overflow-hidden border border-[#E5E2D9] shadow-sm bg-gradient-to-b from-[#F8FAFC] via-[#FAF9F5] to-[#F3F0E6] flex flex-col select-none transition-all ${
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none border-none w-screen h-screen'
            : 'h-[calc(100vh-210px)] min-h-[650px] lg:min-h-[700px] xl:min-h-[760px] max-sm:h-[65vh] max-sm:min-h-[520px]'
        }`}
        style={{ width: '100%' }}
      >
        {/* 1. KANVAS 3D UTAMA: Memenuhi 100% Seluruh Ruang Container */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {hasWebGLError ? (
            <WebGLFallback
              currentStage={currentStage}
              onSelectStage={handleSelectStage}
              onRetry={() => setHasWebGLError(false)}
            />
          ) : (
            <InsulinScene3D
              stage={currentStage}
              speed={speed}
              showLabels={showLabels}
              cameraResetTrigger={cameraResetTrigger}
              onSelectObject={handleSelectObject}
              selectedObject={selectedObject}
            />
          )}
        </div>

        {/* 2. OVERLAY ATAS: Header Ringkas, Petunjuk Interaksi, dan Aksi Cepat */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2.5">
          {/* Sisi Kiri: Badge Judul Tahap Aktif */}
          <div className="pointer-events-auto flex items-center gap-2 bg-white/92 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E2D9] shadow-xs text-xs text-[#3E3E3E]">
            <div className="p-1 rounded-lg bg-[#6B705C] text-white">
              <Box className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold">Tahap {currentStage}/7:</span>{' '}
              <span className="text-[#6B705C] font-semibold">{stageInfo.title}</span>
            </div>
          </div>

          {/* Sisi Tengah: Petunjuk Interaksi 3D sebagai Overlay di Atas Canvas (Tidak Memotong Ukuran Canvas) */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#E5E2D9] text-[11px] font-medium text-[#706B5C] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Klik & Seret untuk Putar | Scroll untuk Zoom | Klik Objek untuk Detail</span>
          </div>

          {/* Sisi Kanan: Tombol Tantangan, Toggle Panel Penjelasan, dan Layar Penuh */}
          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              onClick={() => setIsTryItModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tantangan Interaktif</span>
            </button>

            <button
              onClick={() => setIsExplanationOpen(!isExplanationOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all shadow-xs ${
                isExplanationOpen
                  ? 'bg-[#6B705C] text-white border-[#6B705C]'
                  : 'bg-white/90 backdrop-blur-md text-[#706B5C] border-[#E5E2D9] hover:bg-white'
              }`}
              title={isExplanationOpen ? 'Sembunyikan Panel Penjelasan' : 'Buka Panel Penjelasan'}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isExplanationOpen ? 'Tutup Panel' : 'Penjelasan'}</span>
              {selectedObject && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={handleToggleFullscreen}
              className="p-1.5 sm:p-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#E5E2D9] text-[#706B5C] hover:text-[#3E3E3E] hover:bg-white shadow-xs cursor-pointer transition-colors"
              title={isFullscreen ? 'Keluar dari Layar Penuh' : 'Mode Layar Penuh'}
              aria-label="Layar Penuh"
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 3. OVERLAY SAMPING KANAN: Panel Penjelasan & Inspeksi Objek Transparan / Ringkas */}
        {isExplanationOpen ? (
          <div
            className="absolute top-14 right-3 bottom-24 sm:top-16 sm:right-4 sm:bottom-24 z-20 w-80 sm:w-96 max-w-[calc(100%-1.5rem)] pointer-events-auto flex flex-col transition-all duration-300 ease-in-out shadow-2xl rounded-2xl overflow-hidden border border-[#E5E2D9] bg-white/95 backdrop-blur-md"
          >
            {/* Header Panel */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAF8F2] border-b border-[#E5E2D9]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#6B705C]" />
                <span className="font-serif font-bold text-xs sm:text-sm text-[#3E3E3E]">
                  Penjelasan Tahap {currentStage} & Inspeksi Objek
                </span>
              </div>
              <button
                onClick={() => setIsExplanationOpen(false)}
                className="p-1 rounded-lg text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#E5E2D9] transition-colors cursor-pointer"
                title="Tutup Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Isi Panel Scrollable */}
            <div className="overflow-y-auto flex-1 p-3.5 sm:p-4 space-y-4">
              <ExplanationPanel
                currentStage={currentStage}
                selectedObject={selectedObject}
                onSelectObject={setSelectedObject}
              />

              {/* Catatan Kaki Biokimiawi */}
              <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#E5E2D9] text-[11px] text-[#706B5C] flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#CB997E] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Catatan Biokimiawi:</strong> Model 3D ini menyajikan representasi sel target yang responsif terhadap insulin (sel otot rangka dan adiposit). Jaringan lain seperti otak dan eritrosit menyerap glukosa secara independen melalui GLUT1 dan GLUT3.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Tombol Pintas Pembuka Panel jika Panel Ditutup */
          <button
            onClick={() => setIsExplanationOpen(true)}
            className="absolute right-3 top-16 sm:top-20 z-20 pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/92 backdrop-blur-md border border-[#E5E2D9] shadow-md text-xs font-semibold text-[#6B705C] hover:bg-white cursor-pointer transition-all hover:translate-x-[-2px]"
            title="Buka Panel Penjelasan & Detail Objek"
          >
            <BookOpen className="w-4 h-4 text-[#CB997E]" />
            <span className="hidden sm:inline">Buka Info & Narasi</span>
            {selectedObject && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>
        )}

        {/* 4. OVERLAY BAWAH: Kontrol Navigasi, Pemutaran & Pengaturan Ringkas */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-4 sm:right-4 z-20 pointer-events-none flex justify-center">
          <div className="pointer-events-auto w-full max-w-3xl">
            <AnimationControls
              currentStage={currentStage}
              isPlaying={isPlaying}
              speed={speed}
              showLabels={showLabels}
              isFullscreen={isFullscreen}
              onTogglePlay={handleTogglePlay}
              onReset={handleReset}
              onPrevStage={handlePrevStage}
              onNextStage={handleNextStage}
              onChangeSpeed={setSpeed}
              onToggleLabels={() => setShowLabels(!showLabels)}
              onResetCamera={handleResetCamera}
              onToggleFullscreen={handleToggleFullscreen}
              onSelectStage={handleSelectStage}
              onOpenTryItYourself={() => setIsTryItModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal Tantangan Interaktif "Coba Sendiri" */}
      <TryItYourselfModal
        isOpen={isTryItModalOpen}
        onClose={() => setIsTryItModalOpen(false)}
        onJumpToStage={handleSelectStage}
      />
    </div>
  );
};
