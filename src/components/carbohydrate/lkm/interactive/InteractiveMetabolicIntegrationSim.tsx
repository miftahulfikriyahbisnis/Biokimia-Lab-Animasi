/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sliders, 
  Activity, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  Zap,
  Layers,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

type Scenario = 'POST_PRANDIAL' | 'FASTING' | 'EXERCISE';
type Pathway = 'GLYCOGENESIS' | 'GLYCOGENOLYSIS' | 'GLYCOLYSIS' | 'GLUCONEOGENESIS' | 'LIPOGENESIS' | 'BETA_OXIDATION';

interface SimulationState {
  scenario: Scenario;
  insulin: 'HIGH' | 'LOW';
  glucagon: 'HIGH' | 'LOW';
  atpLevel: 'HIGH' | 'LOW';
  glycogenStore: 'FULL' | 'EMPTY';
}

export const InteractiveMetabolicIntegrationSim: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [simState, setSimState] = useState<SimulationState>({
    scenario: 'POST_PRANDIAL',
    insulin: 'HIGH',
    glucagon: 'LOW',
    atpLevel: 'HIGH',
    glycogenStore: 'EMPTY'
  });

  const [predictedDominantPathway, setPredictedDominantPathway] = useState<Pathway | null>(null);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Rasio Insulin/Glukagon adalah pengatur utama keadaan makan (kenyang) vs puasa.',
    'Ketika Insulin tinggi dan cadangan glikogen belum penuh, Glikogenesis aktif paling dominan untuk memulihkan cadangan hepar dan otot.',
    'Jika Insulin tinggi namun cadangan glikogen sudah PENUH, kelebihan glukosa akan dialihkan ke Lipogenesis (sintesis asam lemak & TAG).'
  ];

  // Menentukan jalur aktif berdasarkan variabel fisiologis
  const calculateOutcomes = () => {
    let dominant: Pathway = 'GLYCOGENESIS';
    let rationale = '';

    if (simState.scenario === 'POST_PRANDIAL') {
      if (simState.glycogenStore === 'FULL') {
        dominant = 'LIPOGENESIS';
        rationale = 'Setelah makan dengan insulin tinggi dan simpanan glikogen sudah jenuh (penuh), kelebihan glukosa diubah menjadi asetil-KoA dan disalurkan via Citrate Shuttle ke Lipogenesis (sintesis asam lemak & TAG).';
      } else {
        dominant = 'GLYCOGENESIS';
        rationale = 'Setelah makan dengan insulin tinggi dan cadangan glikogen belum penuh, glikogen sintase didefosforilasi menjadi bentuk aktif (bentuk a) via Protein Fosfatase-1 (PP1). Glikogenesis mendominasi.';
      }
    } else if (simState.scenario === 'FASTING') {
      if (simState.glycogenStore === 'EMPTY') {
        dominant = 'GLUCONEOGENESIS';
        rationale = 'Saat puasa panjang ketika glikogen hati telah habis (kosong), glukagon tinggi memicu transkripsi gen PEPCK dan Glukosa-6-fosfatase sehingga Glukoneogenesis hepar menjadi andalan utama mempertahankan glukosa darah.';
      } else {
        dominant = 'GLYCOGENOLYSIS';
        rationale = 'Saat awal puasa dengan glukagon tinggi, cAMP mengaktifkan PKA yang memfosforilasi Fosforilase Kinase dan Glikogen Fosforilase (bentuk a aktif) untuk memobilisasi glikogen hati.';
      }
    } else if (simState.scenario === 'EXERCISE') {
      dominant = 'GLYCOLYSIS';
      rationale = 'Kontraksi otot intensif meningkatkan AMP dan Ca²⁺ intraseluler, mengaktifkan AMPK dan PFK-1 untuk mempercepat glikolisis dan regenerasi kilat ATP miosin.';
    }

    return { dominant, rationale };
  };

  const outcome = calculateOutcomes();

  const handleRunSimulation = () => {
    setIsSimulated(true);
    setPhase('OBSERVATION');
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const correct = predictedDominantPathway === outcome.dominant;
    setIsCorrect(correct);
    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setPredictedDominantPathway(null);
    setIsSimulated(false);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('PREDICTION');
  };

  const setScenarioPreset = (scen: Scenario) => {
    if (scen === 'POST_PRANDIAL') {
      setSimState({
        scenario: 'POST_PRANDIAL',
        insulin: 'HIGH',
        glucagon: 'LOW',
        atpLevel: 'HIGH',
        glycogenStore: 'EMPTY'
      });
    } else if (scen === 'FASTING') {
      setSimState({
        scenario: 'FASTING',
        insulin: 'LOW',
        glucagon: 'HIGH',
        atpLevel: 'LOW',
        glycogenStore: 'EMPTY'
      });
    } else if (scen === 'EXERCISE') {
      setSimState({
        scenario: 'EXERCISE',
        insulin: 'LOW',
        glucagon: 'HIGH',
        atpLevel: 'LOW',
        glycogenStore: 'EMPTY'
      });
    }
    setIsSimulated(false);
    setIsAnswerChecked(false);
    setPhase('PREDICTION');
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Aktivitas Interaktif 11: Panel Integrasi & Simulasi Regulasi Hormonal Metabolisme"
        instruction="Ubah parameter hormonal dan status energi sel, lalu PREDIKSIKAN jalur metabolik mana yang akan menjadi dominan. Tekan 'Jalankan Simulasi' untuk mengamati lintasan yang teraktivasi versus terhambat."
        hints={hints}
        currentHintIndex={hintIndex}
        onShowNextHint={() => {
          setHintIndex(prev => Math.min(hints.length, prev + 1));
          setScore(prev => Math.max(30, prev - 10));
        }}
        onCheckAnswer={handleCheck}
        onReset={handleReset}
        onShowExplanation={() => {}}
        isAnswerChecked={isAnswerChecked}
        isCorrect={isCorrect}
        score={score}
        maxScore={100}
        canCheck={predictedDominantPathway !== null && isSimulated}
        explanation="Pengaturan metabolisme karbohidrat dan lipid diintegrasikan secara ketat melalui rasio hormon insulin/glukagon dan status muatan energi seluler (AMPK dan rasio ATP/AMP). Insulin (keadaan kenyang) memicu kaskade defosforilasi melalui Protein Fosfatase-1 (PP1), yang mengaktifkan glikogen sintase dan asetil-KoA karboksilase (ACC) seraya menonaktifkan glikogen fosforilase. Sebaliknya, glukagon dan epinefrin memicu pembentukan cAMP dan aktivasi Protein Kinase A (PKA), yang memfosforilasi enzim-enzim tersebut dengan efek kebalikan (mengaktifkan glikogenolisis dan glukoneogenesis, menghambat glikogenesis). Kapasitas penyimpanan glikogen hepar yang terbatas (~100 g) memaksa tubuh mengalihkan kelebihan glukosa kronis menjadi asam lemak (lipogenesis)."
      />

      {/* 1. KONTROL PENGATURAN FISIOLOGIS */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <span className="text-xs font-bold text-stone-900 uppercase flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-amber-600" />
            Pengaturan Fisiologis & Hormon
          </span>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Preset Cepat:</span>
            <button
              type="button"
              onClick={() => setScenarioPreset('POST_PRANDIAL')}
              className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                simState.scenario === 'POST_PRANDIAL' ? 'bg-amber-100 border-amber-400 text-amber-950' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              Setelah Makan
            </button>
            <button
              type="button"
              onClick={() => setScenarioPreset('FASTING')}
              className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                simState.scenario === 'FASTING' ? 'bg-amber-100 border-amber-400 text-amber-950' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              Puasa
            </button>
            <button
              type="button"
              onClick={() => setScenarioPreset('EXERCISE')}
              className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                simState.scenario === 'EXERCISE' ? 'bg-amber-100 border-amber-400 text-amber-950' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              Olahraga
            </button>
          </div>
        </div>

        {/* 4 Pengatur Parameter Toggle */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Insulin */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-stone-800 block">Insulin Darah</span>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, insulin: 'LOW' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.insulin === 'LOW' ? 'bg-stone-800 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Rendah
              </button>
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, insulin: 'HIGH' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.insulin === 'HIGH' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Tinggi
              </button>
            </div>
          </div>

          {/* Glukagon */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-stone-800 block">Glukagon Darah</span>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, glucagon: 'LOW' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.glucagon === 'LOW' ? 'bg-stone-800 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Rendah
              </button>
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, glucagon: 'HIGH' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.glucagon === 'HIGH' ? 'bg-red-600 text-white border-red-700' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Tinggi
              </button>
            </div>
          </div>

          {/* Muatan ATP */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-stone-800 block">Muatan Energi ATP</span>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, atpLevel: 'LOW' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.atpLevel === 'LOW' ? 'bg-stone-800 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Rendah (AMP↑)
              </button>
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, atpLevel: 'HIGH' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.atpLevel === 'HIGH' ? 'bg-amber-500 text-stone-950 border-amber-600' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Tinggi (ATP↑)
              </button>
            </div>
          </div>

          {/* Cadangan Glikogen */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-bold text-stone-800 block">Cadangan Glikogen</span>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, glycogenStore: 'EMPTY' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.glycogenStore === 'EMPTY' ? 'bg-stone-800 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Belum Penuh
              </button>
              <button
                type="button"
                onClick={() => setSimState(prev => ({ ...prev, glycogenStore: 'FULL' }))}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  simState.glycogenStore === 'FULL' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                Penuh (Jenuh)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. TAHAP PREDIKSI MAHASISWA */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase">
          <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-[10px] font-mono">1</span>
          <span>Tahap Prediksi Mahasiswa: Pilih Jalur yang Akan Mendominasi</span>
        </div>
        <p className="text-xs text-stone-600">
          Dengan kondisi hormon dan energi di atas, jalur metabolik mana yang menurut kelompok Anda akan aktif paling dominan?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'GLYCOGENESIS' as Pathway, label: 'Glikogenesis' },
            { id: 'GLYCOGENOLYSIS' as Pathway, label: 'Glikogenolisis' },
            { id: 'GLYCOLYSIS' as Pathway, label: 'Glikolisis' },
            { id: 'GLUCONEOGENESIS' as Pathway, label: 'Glukoneogenesis' },
            { id: 'LIPOGENESIS' as Pathway, label: 'Lipogenesis' },
            { id: 'BETA_OXIDATION' as Pathway, label: 'Beta-Oksidasi' }
          ].map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPredictedDominantPathway(p.id);
                setPhase('MANIPULATION');
              }}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer text-xs ${
                predictedDominantPathway === p.id
                  ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={predictedDominantPathway === null}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
              predictedDominantPathway === null
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-black text-amber-300 active:scale-95'
            }`}
          >
            <Play className="w-4 h-4 text-amber-400" />
            <span>2. Jalankan Simulasi Enzimatik</span>
          </button>
        </div>
      </div>

      {/* 3. HASIL SIMULASI ENZIMATIK (AMATI JALUR AKTIF VS TERHAMBAT) */}
      {isSimulated && (
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-300 space-y-4 animate-scale-in">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Hasil Simulasi: Respon Lintasan Metabolik Sistemik
            </span>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Jalur Dominan Terhitung: {outcome.dominant}
            </span>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed">
            {outcome.rationale}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Jalur yang Diaktifkan (Aktif):</span>
              </div>
              <ul className="mt-1.5 list-disc list-inside text-[11px] space-y-1">
                {outcome.dominant === 'GLYCOGENESIS' && (
                  <>
                    <li>Glikogen Sintase (defosforilasi via PP1)</li>
                    <li>Glukokinase / Heksokinase (aliran masuk G6P)</li>
                  </>
                )}
                {outcome.dominant === 'LIPOGENESIS' && (
                  <>
                    <li>Asetil-KoA Karboksilase (ACC aktif terpolimerisasi)</li>
                    <li>Kompleks Fatty Acid Synthase (FAS) & Citrate Shuttle</li>
                  </>
                )}
                {outcome.dominant === 'GLUCONEOGENESIS' && (
                  <>
                    <li>Fruktosa-1,6-bisfosfatase & PEPCK (induksi PKA)</li>
                    <li>Glukosa-6-fosfatase hepar melepaskan glukosa darah</li>
                  </>
                )}
                {outcome.dominant === 'GLYCOGENOLYSIS' && (
                  <>
                    <li>Glikogen Fosforilase (bentuk a terfosforilasi via cAMP)</li>
                    <li>Enzim Debranching membebaskan glukosa bebas</li>
                  </>
                )}
                {outcome.dominant === 'GLYCOLYSIS' && (
                  <>
                    <li>Fosfofruktokinase-1 (stimulasi alosterik AMP & ADP)</li>
                    <li>Piruvat Kinase menghasilkan piruvat & ATP miosin</li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-stone-100 border border-stone-300 text-stone-800">
              <div className="font-bold flex items-center gap-1.5 text-stone-900">
                <Flame className="w-4 h-4 text-stone-500" />
                <span>Jalur yang Ditekan / Dihambat:</span>
              </div>
              <ul className="mt-1.5 list-disc list-inside text-[11px] space-y-1 text-stone-600">
                {outcome.dominant === 'GLYCOGENESIS' && (
                  <>
                    <li>Glikogen Fosforilase (dinonaktifkan oleh PP1)</li>
                    <li>Glukoneogenesis ditekan oleh insulin</li>
                  </>
                )}
                {outcome.dominant === 'LIPOGENESIS' && (
                  <>
                    <li>Beta-Oksidasi (dihambat oleh Malonil-KoA via CPT-1)</li>
                    <li>Lipolisis adiposa dihambat ketat oleh insulin</li>
                  </>
                )}
                {outcome.dominant === 'GLUCONEOGENESIS' && (
                  <>
                    <li>Glikolisis (PFK-1 ditekan karena F-2,6-BP rendah)</li>
                    <li>Glikogenesis dihambat oleh fosforilasi PKA</li>
                  </>
                )}
                {outcome.dominant === 'GLYCOGENOLYSIS' && (
                  <>
                    <li>Glikogen Sintase (dihambat oleh fosforilasi PKA)</li>
                  </>
                )}
                {outcome.dominant === 'GLYCOLYSIS' && (
                  <>
                    <li>Glukoneogenesis & Glikogenesis tidak aktif</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
