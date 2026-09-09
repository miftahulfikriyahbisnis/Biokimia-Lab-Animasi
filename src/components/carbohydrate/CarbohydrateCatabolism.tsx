/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Layers, 
  Sparkles, 
  Info, 
  ChevronRight, 
  HelpCircle,
  Table
} from 'lucide-react';
import { 
  GLYCOLYSIS_STEPS, 
  PYRUVATE_FATE_DATA, 
  OXIDATIVE_DECARBOXYLATION_DATA, 
  KREBS_CYCLE_STEPS, 
  ETC_COMPLEXES, 
  ATP_BALANCE_DATA,
  CARB_SLIDE_TEASERS
} from '../../data/carbohydrateData';
import { CellCatabolism3D } from './3d/CellCatabolism3D';
import { KrebsCycle3D } from './3d/KrebsCycle3D';
import { ElectronTransportChain3D } from './3d/ElectronTransportChain3D';
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
  // 6 Sub-Topik Katabolisme
  const [activeCatabolismTab, setActiveCatabolismTab] = useState<
    'GLYCOLYSIS' | 'PYRUVATE_FATE' | 'OXIDATIVE_DECARB' | 'KREBS' | 'ETC' | 'ATP_CALC'
  >('GLYCOLYSIS');

  // Kontrol Animasi
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [isEasyMode, setIsEasyMode] = useState(false);

  // Sub-state internal
  const [selectedGlycolysisStep, setSelectedGlycolysisStep] = useState(1);
  const [anaerobicMode, setAnaerobicMode] = useState(false);
  const [krebsStep, setKrebsStep] = useState(1);
  const [selectedETCComplex, setSelectedETCComplex] = useState<string | null>('CI');
  const [showQuiz, setShowQuiz] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [activeBrainTeaser, setActiveBrainTeaser] = useState<'none' | 'riceVsVeggie' | 'sprintLactate'>('none');

  const [isSequentialMode, setIsSequentialMode] = useState(false);

  const tabs = [
    { id: 'GLYCOLYSIS' as const, name: 'Pelajari Glikolisis', location: 'Sitoplasma' },
    { id: 'PYRUVATE_FATE' as const, name: 'Pelajari Nasib Piruvat', location: 'Sitoplasma / Matriks' },
    { id: 'OXIDATIVE_DECARB' as const, name: 'Pelajari Dekarboksilasi Oksidatif', location: 'Matriks Mitokondria' },
    { id: 'KREBS' as const, name: 'Pelajari Siklus Krebs', location: 'Matriks Mitokondria' },
    { id: 'ETC' as const, name: 'Pelajari Rantai Transpor Elektron', location: 'Membran Dalam Mitokondria' },
    { id: 'ATP_CALC' as const, name: 'Hitung Total ATP', location: 'Semua Kompartemen' },
  ];

  const currentTabIndex = tabs.findIndex(t => t.id === activeCatabolismTab);

  const handleNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveCatabolismTab(tabs[currentTabIndex + 1].id);
    } else {
      onCompleteAndNext();
    }
  };

  const handlePrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveCatabolismTab(tabs[currentTabIndex - 1].id);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Navigasi Atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <Flame className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tahap 3: Pemecahan Oksidatif Glukosa Menjadi Energi (ATP)</span>
        </div>
      </div>

      {/* Header Judul */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
          Pemecahan Oksidatif Glukosa Menjadi Energi (ATP)
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-3xl leading-relaxed">
          Eksplorasi bagaimana 1 molekul glukosa dipecah secara bertahap melalui jalur aerobik utama: dari pemecahan awal di sitoplasma (glikolisis) hingga pernapasan aerobik di matriks dan membran dalam mitokondria (dekarboksilasi piruvat, siklus asam sitrat, dan fosforilasi oksidatif).
        </p>
      </div>

      {/* PETA / RINGKASAN RUTE LENGKAP & LOKASI SELULER */}
      <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-serif font-bold text-sm text-[#3E3E3E]">
              Peta Rute Oksidatif Glukosa & Kompartemen Sel
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSequentialMode(!isSequentialMode)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSequentialMode 
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs' 
                  : 'bg-[#FAF8F5] text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
              }`}
            >
              <span>{isSequentialMode ? '✓ Mode Penjelajahan Berurutan Aktif' : 'Jalankan Semua Tahap (Berurutan)'}</span>
            </button>
          </div>
        </div>

        {/* Diagram Rute Horizontal Interaktif */}
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-[760px] text-xs">
            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center flex-1">
              <span className="text-[10px] font-bold text-amber-900 block">SUBSTRAT</span>
              <span className="font-bold text-amber-800 text-xs">1 Glukosa (6C)</span>
            </div>
            <span className="text-[#A5A58D] font-bold">→</span>

            <button
              onClick={() => setActiveCatabolismTab('GLYCOLYSIS')}
              className={`p-2.5 rounded-2xl border text-center flex-1 transition-all cursor-pointer ${
                activeCatabolismTab === 'GLYCOLYSIS'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-2 ring-amber-300'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#3E3E3E] hover:bg-amber-50'
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider block opacity-80">Sitoplasma</span>
              <span className="font-bold text-[11px] block">1. Glikolisis</span>
              <span className="text-[9.5px] opacity-90 block">2 Piruvat + 2 ATP + 2 NADH</span>
            </button>
            <span className="text-[#A5A58D] font-bold">→</span>

            <button
              onClick={() => setActiveCatabolismTab('OXIDATIVE_DECARB')}
              className={`p-2.5 rounded-2xl border text-center flex-1 transition-all cursor-pointer ${
                activeCatabolismTab === 'OXIDATIVE_DECARB'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs ring-2 ring-orange-300'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#3E3E3E] hover:bg-orange-50'
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider block opacity-80">Matriks Mitokondria</span>
              <span className="font-bold text-[11px] block">2. Dekarboksilasi Oks.</span>
              <span className="text-[9.5px] opacity-90 block">2 Asetil-KoA + 2 CO₂ + 2 NADH</span>
            </button>
            <span className="text-[#A5A58D] font-bold">→</span>

            <button
              onClick={() => setActiveCatabolismTab('KREBS')}
              className={`p-2.5 rounded-2xl border text-center flex-1 transition-all cursor-pointer ${
                activeCatabolismTab === 'KREBS'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-300'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#3E3E3E] hover:bg-blue-50'
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider block opacity-80">Matriks Mitokondria</span>
              <span className="font-bold text-[11px] block">3. Siklus Krebs</span>
              <span className="text-[9.5px] opacity-90 block">6 NADH + 2 FADH₂ + 2 GTP</span>
            </button>
            <span className="text-[#A5A58D] font-bold">→</span>

            <button
              onClick={() => setActiveCatabolismTab('ETC')}
              className={`p-2.5 rounded-2xl border text-center flex-1 transition-all cursor-pointer ${
                activeCatabolismTab === 'ETC'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs ring-2 ring-purple-300'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#3E3E3E] hover:bg-purple-50'
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider block opacity-80">Membran Dalam</span>
              <span className="font-bold text-[11px] block">4. Transpor Elektron</span>
              <span className="text-[9.5px] opacity-90 block">Gradien H⁺ & H₂O</span>
            </button>
            <span className="text-[#A5A58D] font-bold">→</span>

            <button
              onClick={() => setActiveCatabolismTab('ATP_CALC')}
              className={`p-2.5 rounded-2xl border text-center flex-1 transition-all cursor-pointer ${
                activeCatabolismTab === 'ATP_CALC'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider block opacity-80">HASIL AKHIR</span>
              <span className="font-bold text-[11px] block">30–32 ATP</span>
              <span className="text-[9.5px] opacity-90 block">Energi Siap Pakai</span>
            </button>
          </div>
        </div>

        {/* Bar Navigasi Mode Berurutan jika Aktif */}
        {isSequentialMode && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-900">
                Mode Penjelajahan Berurutan ({currentTabIndex + 1} dari {tabs.length}):
              </span>
              <span className="text-emerald-800 font-semibold">{tabs[currentTabIndex].name}</span>
              <span className="px-2 py-0.5 rounded-full bg-white text-emerald-800 text-[10px] font-bold border border-emerald-200">
                {tabs[currentTabIndex].location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevTab}
                disabled={currentTabIndex === 0}
                className="px-3 py-1 rounded-xl bg-white border border-emerald-200 font-semibold text-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                ← Sebelumnya
              </button>
              <button
                onClick={handleNextTab}
                className="px-3 py-1 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                {currentTabIndex === tabs.length - 1 ? 'Selesai & Lanjut' : 'Lanjut Berikutnya →'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigasi Pemilihan Tahap yang Ingin Dipelajari */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCatabolismTab(tab.id)}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeCatabolismTab === tab.id
                ? 'bg-[#6B705C] text-white border-[#6B705C] shadow-xs'
                : 'bg-white text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
            }`}
          >
            <span>{tab.name}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
              activeCatabolismTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#A5A58D]'
            }`}>
              {tab.location.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* BRAIN TEASERS INTERAKTIF DARI SLIDE KULIAH */}
      <div className="bg-gradient-to-r from-amber-50/90 to-orange-50/70 border border-amber-200/80 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="font-serif font-bold text-xs sm:text-sm text-amber-950">
              Pertanyaan Kritis & Refleksi Klinis Kuliah
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveBrainTeaser(activeBrainTeaser === 'riceVsVeggie' ? 'none' : 'riceVsVeggie')}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeBrainTeaser === 'riceVsVeggie'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-50'
              }`}
            >
              🍚 Nasi vs Sayur
            </button>
            <button
              onClick={() => setActiveBrainTeaser(activeBrainTeaser === 'sprintLactate' ? 'none' : 'sprintLactate')}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeBrainTeaser === 'sprintLactate'
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-white text-orange-900 border-orange-200 hover:bg-orange-50'
              }`}
            >
              🏃 Paha Panas Saat Sprint
            </button>
          </div>
        </div>

        {activeBrainTeaser === 'riceVsVeggie' && (
          <div className="p-3.5 rounded-2xl bg-white/95 border border-amber-200 text-xs space-y-2 animate-fadeIn">
            <h4 className="font-serif font-bold text-[#3E3E3E] text-xs sm:text-sm">
              ❓ {CARB_SLIDE_TEASERS.riceVsVeggie.question}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <span className="font-bold text-amber-900 block mb-1">🌾 Nasi (Pati / Amilum)</span>
                <p className="text-[#706B5C] leading-snug">
                  Tersusun atas ikatan <strong>α-1,4 dan α-1,6 glikosidik</strong>. Saluran cerna manusia menghasilkan enzim <strong>Amilase</strong> yang mampu menghidrolisis pati menjadi glukosa darah dan menghasilkan banyak ATP.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <span className="font-bold text-emerald-900 block mb-1">🥦 Sayur (Selulosa)</span>
                <p className="text-[#706B5C] leading-snug">
                  Tersusun atas ikatan <strong>β-1,4 glikosidik</strong>. Manusia <strong>TIDAK memiliki enzim Selulase</strong>, sehingga selulosa lewat sebagai serat makanan (dietary fiber) tanpa melepaskan glukosa kalori.
                </p>
              </div>
            </div>
            <p className="text-[10px] text-amber-900 font-semibold pt-1">
              ✨ Kesimpulan Biokimia: {CARB_SLIDE_TEASERS.riceVsVeggie.takeaway}
            </p>
          </div>
        )}

        {activeBrainTeaser === 'sprintLactate' && (
          <div className="p-3.5 rounded-2xl bg-white/95 border border-orange-200 text-xs space-y-2 animate-fadeIn">
            <h4 className="font-serif font-bold text-[#3E3E3E] text-xs sm:text-sm">
              ❓ {CARB_SLIDE_TEASERS.sprintLactate.question}
            </h4>
            <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 text-[11px] space-y-1 text-[#706B5C] leading-relaxed">
              <p>• <strong>Kondisi Jaringan:</strong> {CARB_SLIDE_TEASERS.sprintLactate.mechanism}</p>
              <p>• <strong>Penyelamatan Energi Kilat:</strong> {CARB_SLIDE_TEASERS.sprintLactate.solution}</p>
              <p className="text-orange-950 font-semibold pt-0.5">• <strong>Pemicu Sensasi Panas:</strong> {CARB_SLIDE_TEASERS.sprintLactate.causeOfBurn}</p>
            </div>
          </div>
        )}
      </div>

      {/* AREA UTAMA: 3D Scene Sesuai Tab yang Dipilih */}
      {activeCatabolismTab !== 'ATP_CALC' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sisi Kiri (7 Col): Visualisasi 3D Interaktif */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E2D9] p-4 flex flex-col shadow-xs space-y-3 min-h-[500px]">
            
            <CarbSceneControls
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onReplay={() => {
                setSelectedGlycolysisStep(1);
                setKrebsStep(1);
              }}
              currentStep={activeCatabolismTab === 'KREBS' ? krebsStep : selectedGlycolysisStep}
              totalSteps={activeCatabolismTab === 'KREBS' ? 8 : activeCatabolismTab === 'GLYCOLYSIS' ? 10 : 1}
              onPrevStep={() => {
                if (activeCatabolismTab === 'KREBS') setKrebsStep(Math.max(1, krebsStep - 1));
                if (activeCatabolismTab === 'GLYCOLYSIS') setSelectedGlycolysisStep(Math.max(1, selectedGlycolysisStep - 1));
              }}
              onNextStep={() => {
                if (activeCatabolismTab === 'KREBS') setKrebsStep(Math.min(8, krebsStep + 1));
                if (activeCatabolismTab === 'GLYCOLYSIS') setSelectedGlycolysisStep(Math.min(10, selectedGlycolysisStep + 1));
              }}
              speed={speed}
              onChangeSpeed={(s) => setSpeed(s)}
              showLabels={showLabels}
              onToggleLabels={() => setShowLabels(!showLabels)}
              onResetCamera={() => {}}
              isEasyMode={isEasyMode}
              onToggleEasyMode={() => setIsEasyMode(!isEasyMode)}
              captionTitle={
                activeCatabolismTab === 'GLYCOLYSIS' ? `Glikolisis: Tahap ${selectedGlycolysisStep}` :
                activeCatabolismTab === 'PYRUVATE_FATE' ? (anaerobicMode ? 'Nasib Piruvat: Anaerobik' : 'Nasib Piruvat: Aerobik') :
                activeCatabolismTab === 'OXIDATIVE_DECARB' ? 'Dekarboksilasi Oksidatif PDC' :
                activeCatabolismTab === 'KREBS' ? `Siklus Krebs: Tahap ${krebsStep}` :
                'Rantai Transpor Elektron (ETC)'
              }
            />

            {/* Toggle Anaerob vs Aerob jika tab Nasib Piruvat */}
            {activeCatabolismTab === 'PYRUVATE_FATE' && (
              <div className="flex items-center gap-2 bg-[#F5F2EA] p-1.5 rounded-2xl border border-[#E5E2D9]">
                <button
                  onClick={() => setAnaerobicMode(false)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !anaerobicMode ? 'bg-[#6B705C] text-white shadow-xs' : 'text-[#706B5C]'
                  }`}
                >
                  Aerobik (Oksigen Cukup → Mitokondria)
                </button>
                <button
                  onClick={() => setAnaerobicMode(true)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    anaerobicMode ? 'bg-pink-600 text-white shadow-xs' : 'text-[#706B5C]'
                  }`}
                >
                  Anaerobik (Sprint/Hipoksia → Laktat)
                </button>
              </div>
            )}

            {/* Canvas 3D */}
            <div className="flex-1 w-full rounded-2xl bg-[#FAF8F5] overflow-hidden relative border border-[#E5E2D9]/60 min-h-[380px]">
              {(activeCatabolismTab === 'GLYCOLYSIS' || activeCatabolismTab === 'PYRUVATE_FATE' || activeCatabolismTab === 'OXIDATIVE_DECARB') && (
                <CellCatabolism3D
                  stageMode={activeCatabolismTab}
                  anaerobicMode={anaerobicMode}
                  isPlaying={isPlaying}
                  speed={speed}
                  showLabels={showLabels}
                />
              )}
              {activeCatabolismTab === 'KREBS' && (
                <KrebsCycle3D
                  currentStep={krebsStep}
                  onSelectStep={(st) => setKrebsStep(st)}
                  isPlaying={isPlaying}
                  speed={speed}
                  showLabels={showLabels}
                />
              )}
              {activeCatabolismTab === 'ETC' && (
                <ElectronTransportChain3D
                  selectedComplex={selectedETCComplex}
                  onSelectComplex={(id) => setSelectedETCComplex(id)}
                  isPlaying={isPlaying}
                  speed={speed}
                  showLabels={showLabels}
                />
              )}
            </div>
          </div>

          {/* Sisi Kanan (5 Col): Detail Reaksi, Enzim, Kofaktor & Bioenergetika */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-4 shadow-xs">
              
              {/* KONTEN TAB: GLIKOLISIS */}
              {activeCatabolismTab === 'GLYCOLYSIS' && (() => {
                const stepData = GLYCOLYSIS_STEPS[selectedGlycolysisStep - 1] || GLYCOLYSIS_STEPS[0];
                return (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        stepData.phase === 'INVESTASI' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Fase {stepData.phase} (Tahap {stepData.stepNumber}/10)
                      </span>
                      <span className="text-[11px] font-mono text-[#706B5C]">
                        {stepData.carbonCount} Karbon
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                      {stepData.name}
                    </h3>

                    <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#A5A58D]">Substrat:</span>
                        <span className="font-semibold text-[#3E3E3E]">{stepData.substrate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A5A58D]">Produk:</span>
                        <span className="font-bold text-emerald-800">{stepData.product}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#E5E2D9] pt-1">
                        <span className="text-[#A5A58D]">Enzim Katalis:</span>
                        <span className="font-bold text-cyan-800">{stepData.enzyme}</span>
                      </div>
                      {stepData.cofactor && (
                        <div className="flex justify-between">
                          <span className="text-[#A5A58D]">Kofaktor:</span>
                          <span className="text-gray-700">{stepData.cofactor}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-[#706B5C] text-[11px] leading-relaxed">
                      {stepData.chemicalExplanation}
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                        <span className="text-[10px] text-amber-900 font-bold block">Perubahan ATP:</span>
                        <span className="font-bold text-amber-800 text-xs">
                          {stepData.atpChange > 0 ? `+${stepData.atpChange} ATP` : stepData.atpChange < 0 ? `${stepData.atpChange} ATP` : '0 ATP'}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-purple-50 border border-purple-200">
                        <span className="text-[10px] text-purple-900 font-bold block">Perubahan NADH:</span>
                        <span className="font-bold text-purple-800 text-xs">
                          {stepData.nadhChange > 0 ? `+${stepData.nadhChange} NADH` : '0 NADH'}
                        </span>
                      </div>
                    </div>

                    {/* Persamaan Reaksi Bersih vs Reaksi Kotor */}
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1 text-[11px]">
                      <span className="font-bold text-amber-900 block text-[11px]">
                        ⚖️ Reaksi Bersih vs Reaksi Kotor Glikolisis
                      </span>
                      <div className="space-y-1 font-mono text-[10px]">
                        <div>
                          <span className="text-amber-800 font-bold">Reaksi Bersih:</span>
                          <div className="text-amber-950 font-semibold bg-white/70 p-1 rounded border border-amber-200/60 mt-0.5">
                            {CARB_SLIDE_TEASERS.glycolysisEquations.reaksiBersih}
                          </div>
                        </div>
                        <div>
                          <span className="text-[#706B5C] font-bold">Reaksi Kotor (Gross):</span>
                          <div className="text-[#3E3E3E] bg-white/70 p-1 rounded border border-stone-200/60 mt-0.5">
                            {CARB_SLIDE_TEASERS.glycolysisEquations.reaksiKotor}
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#706B5C] pt-1 leading-snug">
                        {CARB_SLIDE_TEASERS.glycolysisEquations.penjelasan}
                      </p>
                    </div>

                    {/* Masuknya Gula Lain (Fruktosa & Galaktosa) */}
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5 text-[11px]">
                      <span className="font-bold text-blue-900 block">
                        🍭 Masuknya Gula Lain ke Jalur Glikolisis
                      </span>
                      <div className="space-y-1 text-[10.5px]">
                        <p className="text-blue-950">
                          <strong>• Galaktosa (Susu):</strong> {CARB_SLIDE_TEASERS.otherSugarsEntry.galaktosa.pathway} Masuk pada tahap 2 sebagai G6P.
                        </p>
                        <p className="text-blue-950">
                          <strong>• Fruktosa (Di Hati):</strong> Masuk via Fruktosa-1-P (konsumsi 1 ATP) lalu dipecah menjadi DHAP + Gliseraldehida. 
                          <span className="text-red-700 font-semibold block mt-0.5">
                            ⚠️ Perhatian Klinis: Fruktosa di hati mem-bypass titik kontrol utama PFK-1! Asupan berlebih (minuman manis/boba) langsung diubah menjadi lemak (lipogenesis/fatty liver).
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* KONTEN TAB: NASIB PIRUVAT */}
              {activeCatabolismTab === 'PYRUVATE_FATE' && (
                <div className="space-y-3 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    Percabangan Jalur Piruvat
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                    {anaerobicMode ? PYRUVATE_FATE_DATA.anaerobic.title : PYRUVATE_FATE_DATA.aerobic.title}
                  </h3>
                  
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                    {anaerobicMode ? (
                      <>
                        <div>
                          <span className="text-[#A5A58D] block">Persamaan Reaksi:</span>
                          <span className="font-mono text-pink-800 font-bold block mt-0.5">
                            {PYRUVATE_FATE_DATA.anaerobic.reaction}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#A5A58D] block">Tujuan Biokimiawi:</span>
                          <p className="text-[#706B5C] text-[11px] leading-relaxed">
                            {PYRUVATE_FATE_DATA.anaerobic.purpose}
                          </p>
                        </div>
                        <div className="p-2 rounded-xl bg-pink-50 border border-pink-200">
                          <span className="font-bold text-pink-900 block text-[10px]">Catatan Ilmiah:</span>
                          <p className="text-pink-800 text-[10.5px] leading-snug">
                            {PYRUVATE_FATE_DATA.anaerobic.scientificNote}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span className="text-[#A5A58D] block">Lokasi Reaksi:</span>
                          <span className="font-bold text-amber-900">{PYRUVATE_FATE_DATA.aerobic.location}</span>
                        </div>
                        <div>
                          <span className="text-[#A5A58D] block">Transporter Membran:</span>
                          <span className="font-semibold text-[#3E3E3E]">{PYRUVATE_FATE_DATA.aerobic.transporter}</span>
                        </div>
                        <div>
                          <span className="text-[#A5A58D] block">Nasib Karbon:</span>
                          <p className="text-[#706B5C] text-[11px] leading-relaxed">
                            {PYRUVATE_FATE_DATA.aerobic.destination}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* KONTEN TAB: DEKARBOKSILASI OKSIDATIF */}
              {activeCatabolismTab === 'OXIDATIVE_DECARB' && (
                <div className="space-y-3 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 block">
                    Jembatan Menuju Siklus Krebs
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                    {OXIDATIVE_DECARBOXYLATION_DATA.title}
                  </h3>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                    <div>
                      <span className="text-[#A5A58D] block">Kompleks Enzim:</span>
                      <span className="font-bold text-cyan-900">{OXIDATIVE_DECARBOXYLATION_DATA.enzymeComplex}</span>
                    </div>
                    <div>
                      <span className="text-[#A5A58D] block">Kofaktor Esensial:</span>
                      <span className="text-[#706B5C] text-[11px]">{OXIDATIVE_DECARBOXYLATION_DATA.cofactors.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-[#A5A58D] block">Hasil per 1 Glukosa (2 Piruvat):</span>
                      <div className="flex gap-2 mt-1">
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">2 Asetil-KoA</span>
                        <span className="bg-gray-200 text-gray-800 font-bold px-2 py-0.5 rounded">2 CO₂</span>
                        <span className="bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded">2 NADH</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#706B5C] text-[11px] leading-relaxed">
                    {OXIDATIVE_DECARBOXYLATION_DATA.carbonTracking}
                  </p>
                </div>
              )}

              {/* KONTEN TAB: SIKLUS KREBS */}
              {activeCatabolismTab === 'KREBS' && (() => {
                const kStep = KREBS_CYCLE_STEPS[krebsStep - 1] || KREBS_CYCLE_STEPS[0];
                return (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        Tahap {kStep.stepNumber} dari 8
                      </span>
                      <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
                        {kStep.carbonCount} Atom Karbon
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                      {kStep.name}
                    </h3>

                    <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#A5A58D]">Substrat:</span>
                        <span className="font-semibold text-[#3E3E3E]">{kStep.substrate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A5A58D]">Produk:</span>
                        <span className="font-bold text-amber-800">{kStep.product}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#E5E2D9] pt-1">
                        <span className="text-[#A5A58D]">Enzim:</span>
                        <span className="font-bold text-cyan-800">{kStep.enzyme}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                      <span className="font-bold text-amber-900 block text-[10px] mb-0.5">Mengapa tahap ini terjadi?</span>
                      <p className="text-amber-800 text-[11px] leading-snug">{kStep.whyItHappens}</p>
                    </div>

                    <p className="text-[#706B5C] text-[11px] leading-relaxed">
                      {kStep.chemicalDetail}
                    </p>
                  </div>
                );
              })()}

              {/* KONTEN TAB: ETC */}
              {activeCatabolismTab === 'ETC' && (() => {
                const cDetail = ETC_COMPLEXES.find(c => c.id === selectedETCComplex) || ETC_COMPLEXES[0];
                return (
                  <div className="space-y-3 text-xs">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                      Kompleks Rantai Pernapasan
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                      {cDetail.name}
                    </h3>

                    <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#A5A58D]">Status Pompa Proton:</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                          cDetail.protonPumped > 0 ? 'bg-rose-100 text-rose-800' : 'bg-gray-200 text-gray-800'
                        }`}>
                          {cDetail.protonPumped > 0 ? `Memompa +${cDetail.protonPumped} H⁺` : 'TIDAK Memompa H⁺'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#A5A58D] block">Sumber → Tujuan Elektron:</span>
                        <span className="text-[#3E3E3E] font-medium">{cDetail.electronSource} → {cDetail.electronDestination}</span>
                      </div>
                    </div>

                    <p className="text-[#706B5C] text-[11px] leading-relaxed">
                      {cDetail.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900">
                      💡 <strong>Penting:</strong> Akseptor elektron terminal adalah molekul <strong>Oksigen (O₂)</strong> pada Kompleks IV yang direduksi menjadi H₂O.
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Kotak Refleksi Pertanyaan Katabolisme */}
            <div className="bg-white rounded-3xl border border-[#E5E2D9] p-4 text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#3E3E3E] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Kuis Kilat Katabolisme
                </span>
                <button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="text-[11px] font-semibold text-[#6B705C] hover:underline cursor-pointer"
                >
                  {showQuiz ? 'Tutup' : 'Uji Pemahaman'}
                </button>
              </div>

              {showQuiz && (
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                  <p className="text-[#3E3E3E] font-medium text-[11px]">
                    Manakah kompleks rantai transpor elektron yang TIDAK memompa proton H⁺ ke ruang antarmembran?
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Kompleks I', 'Kompleks II', 'Kompleks III', 'Kompleks IV'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setUserAnswer(opt)}
                        className={`p-1.5 rounded-lg border text-[10px] font-semibold transition-all ${
                          userAnswer === opt
                            ? opt === 'Kompleks II'
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                              : 'bg-red-100 border-red-300 text-red-900'
                            : 'bg-white border-[#E5E2D9] text-[#706B5C]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {userAnswer && (
                    <p className={`text-[10px] p-2 rounded-lg ${
                      userAnswer === 'Kompleks II' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                    }`}>
                      {userAnswer === 'Kompleks II' 
                        ? '✅ Benar! Kompleks II (Suksinat Dehidrogenase) menerima elektron dari FADH2 tetapi tidak memompa proton karena ΔG terlalu kecil.' 
                        : '❌ Kurang tepat. Kompleks II adalah kompleks yang tidak memompa proton.'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* TAB 6: TABEL PERHITUNGAN TOTAL ATP */
        <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                  Neraca Rendemen Energi Total (ATP) per Molekul Glukosa
                </h3>
                <p className="text-xs text-[#A5A58D]">
                  Berdasarkan rasio P/O modern: 1 NADH ≈ 2.5 ATP, 1 FADH₂ ≈ 1.5 ATP
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#706B5C] border-b border-[#E5E2D9]">
                  <th className="p-3 font-bold">Jalur Metabolisme</th>
                  <th className="p-3 font-bold">ATP Langsung</th>
                  <th className="p-3 font-bold">Koenzim Tereduksi</th>
                  <th className="p-3 font-bold">Shuttle Malat-Aspartat (Hati/Jantung)</th>
                  <th className="p-3 font-bold">Shuttle Gliserol-Fosfat (Otot/Otak)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9]/70">
                {ATP_BALANCE_DATA.breakdown.map((row, i) => (
                  <tr key={i} className="hover:bg-[#FAF8F5]/50">
                    <td className="p-3 font-bold text-[#3E3E3E]">{row.pathway}</td>
                    <td className="p-3 text-emerald-700 font-semibold">{row.directATP}</td>
                    <td className="p-3 text-purple-700 font-semibold">{row.reducedCoenzymes}</td>
                    <td className="p-3 font-mono font-bold text-amber-800">{row.malateAspartateATP}</td>
                    <td className="p-3 font-mono font-bold text-blue-800">{row.glycerolPhosphateATP}</td>
                  </tr>
                ))}
                <tr className="bg-[#FAF8F5] font-bold text-sm">
                  <td className="p-3 text-[#3E3E3E]">TOTAL RENDEMEN BERSIH:</td>
                  <td className="p-3 text-emerald-800">4 ATP/GTP</td>
                  <td className="p-3 text-purple-800">10 NADH + 2 FADH₂</td>
                  <td className="p-3 font-mono text-amber-900 bg-amber-100/70">~32 ATP</td>
                  <td className="p-3 font-mono text-blue-900 bg-blue-100/70">~30 ATP</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1 text-xs">
              <span className="font-bold text-amber-900 block text-xs">
                {ATP_BALANCE_DATA.totals.malateAspartateShuttle.name}
              </span>
              <p className="text-[#706B5C] leading-relaxed">
                {ATP_BALANCE_DATA.totals.malateAspartateShuttle.note}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1 text-xs">
              <span className="font-bold text-blue-900 block text-xs">
                {ATP_BALANCE_DATA.totals.glycerolPhosphateShuttle.name}
              </span>
              <p className="text-[#706B5C] leading-relaxed">
                {ATP_BALANCE_DATA.totals.glycerolPhosphateShuttle.note}
              </p>
            </div>
          </div>

          {/* PERBANDINGAN PERHITUNGAN LAMA (KLASIK) VS MODERN */}
          <div className="p-5 rounded-3xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h4 className="font-serif font-bold text-sm text-[#3E3E3E]">
                Perhitungan Klasik (36/38 ATP) vs Perhitungan Modern (30/32 ATP)
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white border border-[#E5E2D9] space-y-1.5">
                <span className="font-bold text-[#706B5C] block text-[11px]">
                  📜 {CARB_SLIDE_TEASERS.modernVsClassicAtp.classic.era}
                </span>
                <p className="text-[#706B5C] text-[10.5px]">
                  {CARB_SLIDE_TEASERS.modernVsClassicAtp.classic.basis}
                </p>
                <div className="font-mono text-[10px] text-stone-700 bg-stone-50 p-2 rounded-xl border border-stone-200 space-y-0.5">
                  <p>• {CARB_SLIDE_TEASERS.modernVsClassicAtp.classic.nadhYield}</p>
                  <p>• {CARB_SLIDE_TEASERS.modernVsClassicAtp.classic.fadh2Yield}</p>
                  <p className="font-bold text-stone-900 pt-0.5">• {CARB_SLIDE_TEASERS.modernVsClassicAtp.classic.totalYield}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                <span className="font-bold text-emerald-900 block text-[11px]">
                  🔬 {CARB_SLIDE_TEASERS.modernVsClassicAtp.modern.era}
                </span>
                <p className="text-emerald-950 text-[10.5px]">
                  {CARB_SLIDE_TEASERS.modernVsClassicAtp.modern.basis}
                </p>
                <div className="font-mono text-[10px] text-emerald-900 bg-white/80 p-2 rounded-xl border border-emerald-200 space-y-0.5">
                  <p>• {CARB_SLIDE_TEASERS.modernVsClassicAtp.modern.nadhCalculation}</p>
                  <p>• {CARB_SLIDE_TEASERS.modernVsClassicAtp.modern.fadh2Calculation}</p>
                  <p className="font-bold text-emerald-950 pt-0.5">• Total Bersih: 30 / 32 ATP</p>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-[#A5A58D] leading-relaxed">
              *Didukung data kristalografi cryo-EM struktur rotor cincin-c ATP Synthase mamalia (Allegretti et al., Nature 2015; Nicholls & Ferguson 2013).
            </p>
          </div>

          {/* STUDI KASUS UGD: HIPERLAKTATEMIA PADA SYOK SEPTIK */}
          <div className="p-5 rounded-3xl bg-red-50/70 border border-red-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-red-600 text-white font-bold text-[10px]">KASUS UGD</span>
              <h4 className="font-serif font-bold text-sm text-red-950">
                {CARB_SLIDE_TEASERS.septicShockEmergency.title}
              </h4>
            </div>
            <p className="text-xs text-red-900 leading-relaxed">
              {CARB_SLIDE_TEASERS.septicShockEmergency.scenario}
            </p>
            <div className="p-3 rounded-2xl bg-white/80 border border-red-200 text-xs space-y-1 text-stone-800">
              <span className="font-bold text-red-950 text-[11px] block">Mekanisme Biokimiawi Seluler:</span>
              <p className="text-[#706B5C] text-[11px] leading-relaxed">
                {CARB_SLIDE_TEASERS.septicShockEmergency.clinicalMechanism}
              </p>
              <p className="text-red-900 font-semibold text-[10.5px] pt-1">
                💡 Intisari Klinis: {CARB_SLIDE_TEASERS.septicShockEmergency.emergencySignificance}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigasi Lanjut */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={onCompleteAndNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Tandai Selesai & Lanjut: Anabolisme Karbohidrat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
