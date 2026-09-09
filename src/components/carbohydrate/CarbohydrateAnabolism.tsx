/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  Layers,
  Activity,
  Eye,
  EyeOff,
  Flame,
  BookOpen
} from 'lucide-react';
import { 
  ANABOLISM_JOURNEY_STEPS, 
  ANABOLISM_MODULE_NAV_SECTIONS, 
  AnabolismStepData 
} from '../../data/anabolismJourneyData';
import { JIGSAW_CASE_STUDIES } from '../../data/carbohydrateData';
import { UnifiedAnabolism3D } from './3d/UnifiedAnabolism3D';
import { AnabolismReactionPanel } from './AnabolismReactionPanel';

interface CarbohydrateAnabolismProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export const CarbohydrateAnabolism: React.FC<CarbohydrateAnabolismProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  // Step aktif (1-indexed dari anabolismJourneyData)
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(1);
  const totalSteps = ANABOLISM_JOURNEY_STEPS.length;

  // Kontrol Animasi 3D
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [resetCameraCount, setResetCameraCount] = useState<number>(0);

  // Bagian Tambahan (Klinis / Jigsaw Refleksi)
  const [showClinicalDrawer, setShowClinicalDrawer] = useState<boolean>(false);
  const [selectedJigsawId, setSelectedJigsawId] = useState<number>(1);
  const [showJigsawKey, setShowJigsawKey] = useState<boolean>(false);

  // Dapatkan data langkah saat ini
  const currentStepData: AnabolismStepData = 
    ANABOLISM_JOURNEY_STEPS.find(s => s.stepNumber === currentStepNumber) || ANABOLISM_JOURNEY_STEPS[0];

  // Auto-play timer untuk maju ke tahap berikutnya
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const stepDuration = 6000 / speed;
      timer = setTimeout(() => {
        if (currentStepNumber < totalSteps) {
          setCurrentStepNumber(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, stepDuration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepNumber, totalSteps, speed]);

  // Handler Navigasi Tahap
  const handlePrev = () => {
    if (currentStepNumber > 1) {
      setCurrentStepNumber(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStepNumber < totalSteps) {
      setCurrentStepNumber(prev => prev + 1);
    }
  };

  const handleJumpToModule = (startStep: number) => {
    setCurrentStepNumber(startStep);
    setResetCameraCount(c => c + 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6" id="anabolism-container">
      
      {/* 1. Bar Navigasi Atas & Status Modul */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-2xs"
          id="btn-back-to-home"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowClinicalDrawer(!showClinicalDrawer)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
            id="btn-toggle-clinical-cases"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>{showClinicalDrawer ? 'Tutup Kasus Klinis' : '8 Kasus Klinis Jigsaw'}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Modul Anabolisme Karbohidrat</span>
          </div>
        </div>
      </div>

      {/* 2. Header Judul & Deskripsi Pembelajaran */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-stone-800 text-stone-200 text-[11px] font-mono font-semibold">
            Jalur Biosintesis & Penyimpanan Cadangan Energi
          </span>
          <span className="text-xs text-stone-500">•</span>
          <span className="text-xs text-emerald-800 font-semibold">
            Persisten 3D + Panel Reaksi Kimia Stoikiometri
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E] tracking-tight">
          Anabolisme Karbohidrat: Jalur Biosintetik Molekuler Terpadu
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-4xl leading-relaxed">
          Eksplorasi pembentukan makromolekul glikogen (glikogenesis), resintesis glukosa baru dari prekursor non-karbohidrat (glukoneogenesis), pengalihan surplus energi menjadi asam lemak dan trigliserida (lipogenesis), serta sintesis asam amino nonesensial secara berkesinambungan.
        </p>
      </div>

      {/* 3. Bar Pemilih Cepat 6 Modul Utama Anabolisme */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
        {ANABOLISM_MODULE_NAV_SECTIONS.map((sec) => {
          const isActive = currentStepNumber >= sec.startStep && currentStepNumber <= sec.endStep;
          return (
            <button
              key={sec.module}
              onClick={() => handleJumpToModule(sec.startStep)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-stone-900 text-amber-200 border-stone-800 shadow-xs'
                  : 'bg-white text-stone-600 border-[#E5E2D9] hover:bg-[#FAF8F5] hover:text-stone-900'
              }`}
              id={`nav-section-${sec.module}`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400' : 'bg-stone-300'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. AREA VISUALISASI UTAMA (3D ANIMASI ~65% & PANEL REAKSI ~35%) */}
      <div className="space-y-4">
        
        {/* 4A. KONTROL DAN PERSISTENT CANVAS 3D (Area Visualisasi Molekuler) */}
        <div className="w-full bg-[#111315] rounded-3xl border border-stone-800 overflow-hidden shadow-md flex flex-col">
          
          {/* Bar Kontrol Atas Canvas */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#181A1D] border-b border-stone-800 text-stone-200 text-xs">
            {/* Indikator Langkah & Modul */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-600/60 font-mono text-[11px] font-bold">
                Langkah {currentStepNumber} / {totalSteps}
              </span>
              <span className="font-semibold text-stone-300 hidden sm:inline">
                {currentStepData.title}
              </span>
            </div>

            {/* Tombol Pemutar & Navigasi */}
            <div className="flex items-center gap-1.5">
              {/* Mundur */}
              <button
                onClick={handlePrev}
                disabled={currentStepNumber <= 1}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200 transition-colors cursor-pointer"
                title="Langkah Sebelumnya"
                id="btn-anabolism-prev"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Putar / Jeda */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                id="btn-anabolism-play-pause"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
              </button>

              {/* Maju */}
              <button
                onClick={handleNext}
                disabled={currentStepNumber >= totalSteps}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200 transition-colors cursor-pointer"
                title="Langkah Berikutnya"
                id="btn-anabolism-next"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <span className="w-px h-4 bg-stone-700 mx-1" />

              {/* Kecepatan */}
              <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
                {[0.5, 1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      speed === s ? 'bg-amber-400 text-stone-950 shadow-2xs' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Label Toggle */}
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  showLabels 
                    ? 'bg-amber-950/80 border-amber-600 text-amber-200' 
                    : 'bg-stone-800 border-stone-700 text-stone-400'
                }`}
                title={showLabels ? 'Sembunyikan Label Molekul' : 'Tampilkan Label Molekul'}
                id="btn-toggle-labels"
              >
                {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              {/* Reset Kamera */}
              <button
                onClick={() => setResetCameraCount(c => c + 1)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 transition-colors cursor-pointer"
                title="Reset Posisi Kamera 3D"
                id="btn-reset-camera"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Kanvas 3D Tunggal yang Persisten */}
          <div className="w-full h-[460px] sm:h-[520px] relative">
            <UnifiedAnabolism3D
              currentStepData={currentStepData}
              isPlaying={isPlaying}
              speed={speed}
              showLabels={showLabels}
              resetCameraCount={resetCameraCount}
            />

            {/* Legenda Token Molekuler di Pojok Kiri Bawah Canvas */}
            <div className="absolute bottom-3 left-3 bg-stone-950/85 backdrop-blur-sm border border-stone-800 p-2.5 rounded-2xl text-[10px] text-stone-300 space-y-1.5 pointer-events-none select-none">
              <span className="font-bold text-stone-400 uppercase tracking-wider block text-[9px]">
                Representasi Token Molekul 3D
              </span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#262626] border border-stone-600 inline-block" />
                  <span>Karbon (C)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block" />
                  <span>Oksigen (O)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] inline-block" />
                  <span>Nitrogen (N)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] inline-block" />
                  <span>Fosfat (P)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1 rounded bg-sky-900 text-sky-200 text-[8px] font-bold">UTP/UDP</span>
                  <span>Aktivasi Gula</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1 rounded bg-purple-900 text-purple-200 text-[8px] font-bold">NADPH</span>
                  <span>Daya Reduksi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Bar Kemajuan Langkah */}
          <div className="w-full bg-[#181A1D] px-4 py-2 border-t border-stone-800 flex items-center gap-2">
            <span className="text-[10px] text-stone-400 font-mono shrink-0">
              {currentStepNumber} / {totalSteps}
            </span>
            <div className="flex-1 flex gap-1 h-2 bg-stone-900 rounded-full p-0.5 overflow-hidden">
              {ANABOLISM_JOURNEY_STEPS.map((step) => {
                const isPassed = step.stepNumber <= currentStepNumber;
                const isCurrent = step.stepNumber === currentStepNumber;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStepNumber(step.stepNumber)}
                    className={`h-full flex-1 rounded-full transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-400 shadow-xs'
                        : isPassed
                        ? 'bg-emerald-500/80 hover:bg-emerald-400'
                        : 'bg-stone-800 hover:bg-stone-700'
                    }`}
                    title={`Langkah ${step.stepNumber}: ${step.title}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 4B. PANEL REAKSI KIMIA 2D LENGKAP (~35% Area Visual) */}
        <AnabolismReactionPanel
          currentStepData={currentStepData}
          totalSteps={totalSteps}
          onSelectStep={(step) => setCurrentStepNumber(step)}
        />
      </div>

      {/* 5. DRAWER / KOTAK KASUS KLINIS JIGSAW (Bila Dibuka Oleh Pengguna) */}
      {showClinicalDrawer && (
        <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-4 shadow-sm" id="clinical-cases-drawer">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-[#3E3E3E] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>8 Kasus Klinis Jigsaw Anabolisme & Kelainan Penyimpanan Glikogen</span>
              </h3>
              <p className="text-xs text-[#706B5C]">
                Analisis penerapan biokimia anabolik pada kasus patologi manusia, defisiensi enzim, dan gangguan regulasi hormon.
              </p>
            </div>
            <button
              onClick={() => setShowClinicalDrawer(false)}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              Tutup
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* List Kasus */}
            <div className="md:col-span-1 space-y-1">
              {JIGSAW_CASE_STUDIES.map((k) => (
                <button
                  key={k.id}
                  onClick={() => {
                    setSelectedJigsawId(k.id);
                    setShowJigsawKey(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    selectedJigsawId === k.id
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#706B5C] hover:bg-[#F5F2EA]'
                  }`}
                >
                  <div className="font-bold text-[11px] text-stone-900 truncate">{k.topic}</div>
                  <div className="text-[10px] text-stone-500">{k.groupName}</div>
                </button>
              ))}
            </div>

            {/* Detail Kasus Terpilih */}
            <div className="md:col-span-3 bg-[#FAF8F5] rounded-2xl border border-[#E5E2D9] p-4 space-y-3">
              {(() => {
                const c = JIGSAW_CASE_STUDIES.find(x => x.id === selectedJigsawId) || JIGSAW_CASE_STUDIES[0];
                return (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                        {c.groupName}
                      </span>
                      <span className="text-stone-400 text-[10px]">Kasus {c.id} dari 8</span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#3E3E3E]">
                      {c.topic}
                    </h4>

                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9] space-y-1">
                      <span className="font-bold text-[#3E3E3E] text-[11px]">Konteks Kasus / Skenario Fisiologis:</span>
                      <p className="text-stone-600 leading-relaxed text-[11px]">{c.scenario}</p>
                    </div>

                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 space-y-1 text-blue-950">
                      <span className="font-bold text-[11px]">Tugas Pembahasan Mahasiswa:</span>
                      <p className="text-[11px] font-medium">{c.studentTask}</p>
                      {c.scaffoldingQuestions && c.scaffoldingQuestions.length > 0 && (
                        <ul className="list-disc pl-4 text-[10.5px] text-stone-700 mt-1.5 space-y-0.5">
                          {c.scaffoldingQuestions.map((q, idx) => (
                            <li key={idx}>{q}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => setShowJigsawKey(!showJigsawKey)}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-[11px] font-bold transition-all cursor-pointer"
                      >
                        {showJigsawKey ? 'Sembunyikan Pembahasan Biokimia' : 'Lihat Kunci Pembahasan Biokimia'}
                      </button>

                      {showJigsawKey && (
                        <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                          <span className="font-bold text-[11px]">Penjelasan Mekanisme Biokimiawi:</span>
                          <p className="text-[11px] leading-relaxed">{c.keyBiochemicalTakeaway}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 6. Footer Tombol Navigasi Lanjut */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
          id="btn-footer-back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Menu Utama</span>
        </button>

        <button
          onClick={onCompleteAndNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
          id="btn-footer-complete-next"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Tandai Selesai & Lanjut: Integrasi Fisiologis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
