/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  Table,
  Dna,
  BookOpen,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { 
  METABOLIC_JOURNEY_STEPS, 
  MODULE_NAV_SECTIONS, 
  MetabolicStepData 
} from '../../data/metabolicJourneyData';
import { CARB_SLIDE_TEASERS, ATP_BALANCE_DATA } from '../../data/carbohydrateData';
import { UnifiedMetabolism3D } from './3d/UnifiedMetabolism3D';
import { MetabolicReactionPanel } from './MetabolicReactionPanel';
import { CarbSceneControls } from './3d/CarbSceneControls';

interface CarbohydrateCatabolismProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export const CarbohydrateCatabolism: React.FC<CarbohydrateCatabolismProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  // State Utama: Langkah 1 hingga 28 dari Data Terpadu
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [resetCameraCount, setResetCameraCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTeasers, setShowTeasers] = useState(false);
  const [showBalanceTable, setShowBalanceTable] = useState(false);
  const [activeBrainTeaser, setActiveBrainTeaser] = useState<'none' | 'riceVsVeggie' | 'sprintLactate'>('none');

  const containerRef = useRef<HTMLDivElement>(null);

  // Ambil data langkah aktif dari satu sumber data yang sama
  const totalSteps = METABOLIC_JOURNEY_STEPS.length;
  const currentStepData = METABOLIC_JOURNEY_STEPS.find(s => s.stepNumber === currentStepNumber) 
    || METABOLIC_JOURNEY_STEPS[0];

  // Timer otomatis jika animasi sedang diputar (Play mode)
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      // 5 detik per langkah pada kecepatan 1x
      const intervalMs = 5000 / speed;
      timer = setInterval(() => {
        setCurrentStepNumber((prev) => {
          if (prev < totalSteps) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, intervalMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, speed, totalSteps]);

  // Navigasi Langkah Maju & Mundur
  const handleNextStep = () => {
    if (currentStepNumber < totalSteps) {
      setCurrentStepNumber(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepNumber > 1) {
      setCurrentStepNumber(prev => prev - 1);
    }
  };

  const handleReplay = () => {
    setCurrentStepNumber(1);
    setIsPlaying(true);
  };

  const handleResetCamera = () => {
    setResetCameraCount(c => c + 1);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* 1. Bar Navigasi Atas & Judul Halaman */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer shadow-2xs"
          id="btn-back-to-carb-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
          <Flame className="w-4 h-4 text-emerald-600" />
          <span>Tahap 3: Pemecahan Oksidatif Glukosa Menjadi Energi (ATP)</span>
        </div>
      </div>

      {/* 2. Header Deskripsi */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E] tracking-tight">
          Perjalanan Berkesinambungan Metabolisme Glukosa
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-4xl leading-relaxed">
          Satu alur utuh yang menghubungkan pemecahan 1 molekul glukosa di sitosol (Glikolisis), transpor kontinu dua piruvat ke matriks mitokondria (Dekarboksilasi Oksidatif), putaran Siklus Krebs, hingga aliran elektron dan sintesis 30–32 ATP pada membran dalam mitokondria.
        </p>
      </div>

      {/* 3. Pemilih Modul Cepat (Quick-Jump Module Tabs) */}
      <div className="bg-white rounded-2xl border border-[#E5E2D9] p-2 sm:p-2.5 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {MODULE_NAV_SECTIONS.map((sec) => {
            const isCurrentModule = currentStepData.module === sec.module;
            return (
              <button
                key={sec.module}
                onClick={() => {
                  setCurrentStepNumber(sec.startStep);
                  setIsPlaying(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isCurrentModule
                    ? 'bg-[#6B705C] text-white shadow-xs ring-2 ring-[#6B705C]/30'
                    : 'bg-[#FAF8F5] text-[#706B5C] border border-[#E5E2D9] hover:bg-[#F5F2EA]'
                }`}
              >
                <span>{sec.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isCurrentModule ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  Tahap {sec.startStep}–{sec.endStep}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. AREA PEMBELAJARAN TERPADU DENGAN RASIO TINGGI 65% (CANVAS 3D) DAN 35% (PANEL REAKSI 2D) */}
      <div 
        ref={containerRef}
        className="w-full bg-white rounded-3xl border border-[#E5E2D9] p-3 sm:p-4 shadow-sm space-y-3 flex flex-col"
        id="unified-metabolic-learning-container"
      >
        {/* Bar Kontrol Animasi (Play, Step-by-Step, Speed, Reset Kamera, Labels) */}
        <CarbSceneControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReplay={handleReplay}
          currentStep={currentStepNumber}
          totalSteps={totalSteps}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          speed={speed}
          onChangeSpeed={setSpeed}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels(!showLabels)}
          onResetCamera={handleResetCamera}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          captionTitle={`${currentStepData.moduleTitle}: ${currentStepData.title}`}
        />

        {/* 4A. CANVAS 3D PERSISTEN TUNGGAL (Mengambil ~65% Tinggi Area Pembelajaran) */}
        <div 
          className="w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-2xl overflow-hidden relative border border-stone-800 shadow-inner"
          id="persistent-metabolic-canvas-3d"
        >
          <UnifiedMetabolism3D
            currentStepData={currentStepData}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
            resetCameraCount={resetCameraCount}
          />
        </div>

        {/* 4B. PANEL REAKSI KIMIA 2D LENGKAP & BESAR (Mengambil ~35% Tinggi Bagian Bawah) */}
        <div className="w-full" id="reaction-panel-container">
          <MetabolicReactionPanel
            currentStepData={currentStepData}
            totalSteps={totalSteps}
            onSelectStep={setCurrentStepNumber}
          />
        </div>
      </div>

      {/* 5. Bagian Pendukung Kuliah & Refleksi Klinis (Dapat Diperluas) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E2D9] pb-2">
          <span className="text-sm font-serif font-bold text-[#3E3E3E] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Materi Tambahan & Relevansi Medis</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBalanceTable(!showBalanceTable)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                showBalanceTable 
                  ? 'bg-emerald-700 text-white border-emerald-700' 
                  : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{showBalanceTable ? 'Tutup Tabel 30–32 ATP' : 'Buka Tabel Neraca 30–32 ATP'}</span>
            </button>

            <button
              onClick={() => setShowTeasers(!showTeasers)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                showTeasers 
                  ? 'bg-amber-600 text-white border-amber-600' 
                  : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showTeasers ? 'Tutup Kasus Klinis' : 'Buka Kasus Klinis Kuliah'}</span>
            </button>
          </div>
        </div>

        {/* Tabel Neraca ATP Lengkap */}
        {showBalanceTable && (
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 shadow-xs space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                Tabel Neraca Lengkap Bioenergetika Respirasi Aerob Glukosa
              </h3>
              <span className="text-xs font-mono text-[#6B705C] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#E5E2D9]">
                Rasio Modern: P/O 2,5 & 1,5
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-[#3E3E3E] font-bold border-b border-[#E5E2D9]">
                  <tr>
                    <th className="p-3">Jalur Metabolisme</th>
                    <th className="p-3">Lokasi Kompartemen</th>
                    <th className="p-3">Produk Reduksi (NADH / FADH₂)</th>
                    <th className="p-3">ATP Langsung (SLP)</th>
                    <th className="p-3 text-right">Rendemen ATP via Transpor Elektron</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2D9]">
                  <tr>
                    <td className="p-3 font-semibold">1. Glikolisis</td>
                    <td className="p-3 text-stone-600">Sitosol</td>
                    <td className="p-3 text-purple-700 font-mono font-bold">2 NADH (Sitosol)</td>
                    <td className="p-3 text-emerald-800 font-bold">+2 ATP bersih</td>
                    <td className="p-3 text-right font-mono font-bold">3 atau 5 ATP (shuttle)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">2. Dekarboksilasi Oksidatif (PDC)</td>
                    <td className="p-3 text-stone-600">Matriks Mitokondria</td>
                    <td className="p-3 text-purple-700 font-mono font-bold">2 NADH (Matriks)</td>
                    <td className="p-3 text-stone-500">0</td>
                    <td className="p-3 text-right font-mono font-bold">5 ATP (2 × 2,5)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">3. Siklus Krebs (2 Putaran)</td>
                    <td className="p-3 text-stone-600">Matriks Mitokondria</td>
                    <td className="p-3 text-purple-700 font-mono font-bold">6 NADH + 2 FADH₂</td>
                    <td className="p-3 text-emerald-800 font-bold">+2 ATP / GTP</td>
                    <td className="p-3 text-right font-mono font-bold">18 ATP (15 + 3)</td>
                  </tr>
                  <tr className="bg-emerald-50/70 font-bold text-emerald-950">
                    <td className="p-3" colSpan={3}>
                      TOTAL RENDEMEN BERSIH PER MOLEKUL GLUKOSA:
                    </td>
                    <td className="p-3 text-emerald-800 font-black">+4 ATP (SLP)</td>
                    <td className="p-3 text-right font-mono text-base text-emerald-800 font-black">
                      30 – 32 ATP
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9]">
                <span className="font-bold text-[#3E3E3E] block mb-1">
                  1. Shuttle Malat-Aspartat (~32 ATP Bersih):
                </span>
                <p className="text-[#706B5C] leading-relaxed">
                  Dominan di <strong>hati, ginjal, dan jantung</strong>. Elektron dari NADH sitosol ditransfer ke NADH matriks tanpa kehilangan daya reduksi (menghasilkan 2,5 ATP per NADH).
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9]">
                <span className="font-bold text-[#3E3E3E] block mb-1">
                  2. Shuttle Gliserol-3-Fosfat (~30 ATP Bersih):
                </span>
                <p className="text-[#706B5C] leading-relaxed">
                  Dominan di <strong>otot rangka dan otak</strong>. Elektron diserahkan ke FAD membentuk FADH₂ di membran dalam, menghasilkan 1,5 ATP per NADH sitosol.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Kasus Klinis & Refleksi Kuliah */}
        {showTeasers && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
            {/* 1. Nasi vs Sayur */}
            <div className="p-4 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px]">
                🌾 PENCERNAAN
              </span>
              <h4 className="font-serif font-bold text-sm text-[#3E3E3E]">
                Kenapa Nasi Bikin Gemuk tapi Sayur Tidak?
              </h4>
              <p className="text-[#706B5C] leading-relaxed">
                Pati nasi memiliki ikatan <strong>α-1,4 dan α-1,6</strong> yang dapat dicerna oleh enzim amilase manusia menjadi glukosa darah dan dioksidasi menghasilkan ATP berlimpah. Selulosa sayur memiliki ikatan <strong>β-1,4</strong> yang tidak dapat dihidrolisis manusia (tidak ada enzim selulase) sehingga lewat sebagai serat makanan.
              </p>
            </div>

            {/* 2. Sensasi Panas Saat Sprint */}
            <div className="p-4 rounded-3xl bg-orange-50/80 border border-orange-200 space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-orange-600 text-white font-bold text-[10px]">
                🏃 KONDISI HIPOKSIA
              </span>
              <h4 className="font-serif font-bold text-sm text-[#3E3E3E]">
                Mengapa Otot Paha Terasa Panas Saat Sprint?
              </h4>
              <p className="text-[#706B5C] leading-relaxed">
                Saat sprint cepat, pasokan oksigen tidak mencukupi laju respirasi mitokondria. Piruvat dialihkan menjadi laktat oleh Laktat Dehidrogenase (LDH) untuk meregenerasi <strong>NAD⁺</strong> dengan cepat agar glikolisis dapat terus memproduksi 2 ATP kilat. Akumulasi ion H⁺ menyebabkan asidosis lokal dan rasa terbakar.
              </p>
            </div>

            {/* 3. Kasus UGD Septic Shock */}
            <div className="p-4 rounded-3xl bg-rose-50/80 border border-rose-200 space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
                🏥 KASUS UGD
              </span>
              <h4 className="font-serif font-bold text-sm text-[#3E3E3E]">
                Hiperlaktatemia pada Syok Septik
              </h4>
              <p className="text-[#706B5C] leading-relaxed">
                Pada syok hipovolemik atau septik, perfusi jaringan kolaps menyebabkan hipoksia selular menyeluruh. Jalur piruvat dehidrogenase (PDC) dan rantai transpor elektron terhenti, memaksa seluruh jaringan memproduksi laktat. Peningkatan laktat darah (&gt; 2 mmol/L) adalah biomarker kritis hipoksia jaringan.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 6. Footer Navigasi Selesai & Lanjut */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5E2D9]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={onCompleteAndNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          id="btn-complete-and-next-anabolism"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Selesaikan Modul Katabolisme & Lanjut ke Anabolisme Karbohidrat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
