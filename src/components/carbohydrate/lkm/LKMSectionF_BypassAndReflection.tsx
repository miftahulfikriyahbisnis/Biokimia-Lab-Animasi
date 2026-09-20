/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Activity, 
  ShieldAlert, 
  Zap, 
  Layers, 
  Sparkles,
  HelpCircle,
  FileText,
  Printer,
  BookOpen
} from 'lucide-react';
import { GroupPredictionState } from './LKMSectionA_Prompt';
import { LKMProgressiveActivityLayout, InteractionPhase } from './interactive/LKMProgressiveActivityLayout';

interface LKMSectionFBypassProps {
  predictionData: GroupPredictionState;
  groupName: string;
  onBack: () => void;
  onFinishLKM: () => void;
}

export type BypassId = 1 | 2 | 3;

export const LKMSectionF_BypassAndReflection: React.FC<LKMSectionFBypassProps> = ({
  predictionData,
  groupName,
  onBack,
  onFinishLKM
}) => {
  const [activeBypass, setActiveBypass] = useState<BypassId>(1);
  const [exploredBypasses, setExploredBypasses] = useState<Record<BypassId, boolean>>({
    1: true,
    2: false,
    3: false
  });

  // 5-Phase State for Bypass Activity
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [predictionHypothesis, setPredictionHypothesis] = useState<string | null>(null);
  const [analysisAnswer, setAnalysisAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(100);

  // Bagian Refleksi Akhir LKM
  const [reflectionStatus, setReflectionStatus] = useState<'VALIDATED' | 'REVISED' | null>(null);
  const [finalConclusion, setFinalConclusion] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const hints = [
    'Tiga reaksi glikolisis (langkah 1: Heksokinase, langkah 3: PFK-1, dan langkah 10: Piruvat Kinase) bersifat sangat eksergonik dengan nilai ΔG negatif yang besar, menjadikannya ireversibel.',
    'Bypass 1 memerlukan kerja sama dua kompartemen: Piruvat Karboksilase di dalam matriks mitokondria (membentuk Oksaloasetat) dan PEPCK di sitosol (via shuttle malat).',
    'Bypass 2 dan 3 adalah reaksi defosforilasi hidrolitik yang melepaskan Pi anorganik oleh enzim fosfatase spesifik, tanpa menghasilkan sintesis ATP.'
  ];

  const handleSelectBypass = (id: BypassId) => {
    setActiveBypass(id);
    setExploredBypasses(prev => ({ ...prev, [id]: true }));
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    if (analysisAnswer !== 'A') {
      setScore(prev => Math.max(40, prev - 25));
    }
  };

  const handleReset = () => {
    setAnalysisAnswer(null);
    setIsAnswerChecked(false);
    setPhase('MANIPULATION');
  };

  const isCorrect = analysisAnswer === 'A';

  // VISUAL CONTENT: Perbandingan Berdampingan Glikolisis vs Glukoneogenesis
  const renderVisualContent = () => {
    return (
      <div className="w-full space-y-3">
        {/* Selector 3 Bypass Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 1 as BypassId, title: 'Bypass 1', desc: 'Piruvat → PEP' },
            { id: 2 as BypassId, title: 'Bypass 2', desc: 'FBP → F6P' },
            { id: 3 as BypassId, title: 'Bypass 3', desc: 'G6P → Glukosa' }
          ].map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => handleSelectBypass(b.id)}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                activeBypass === b.id
                  ? 'bg-stone-900 text-amber-300 border-stone-800 shadow-2xs font-bold ring-1 ring-amber-400'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
              }`}
            >
              <div className="text-xs font-bold">{b.title}</div>
              <div className="text-[10px] opacity-80">{b.desc}</div>
            </button>
          ))}
        </div>

        {/* Perbandingan Kolom Berdampingan: Glikolisis (Merah Ke Bawah) vs Glukoneogenesis (Biru/Hijau Ke Atas) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <div className="grid grid-cols-2 gap-3 text-xs mb-3 pb-2 border-b border-stone-200">
            {/* Header Glikolisis */}
            <div className="text-center font-bold text-red-700 flex items-center justify-center gap-1">
              <span>Glikolisis (Katabolisme)</span>
              <span className="text-red-600 font-mono">↓ Ke Bawah</span>
            </div>
            {/* Header Glukoneogenesis */}
            <div className="text-center font-bold text-emerald-800 flex items-center justify-center gap-1">
              <span>Glukoneogenesis (Anabolisme)</span>
              <span className="text-emerald-700 font-mono">↑ Ke Atas</span>
            </div>
          </div>

          {/* DETAIL BYPASS 1: Piruvat -> Oksaloasetat -> PEP */}
          {activeBypass === 1 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs">
                <div className="font-bold text-stone-900 mb-1 flex items-center justify-between">
                  <span>Bypass 1: Pembalikan Reaksi Piruvat Kinase</span>
                  <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                    Investasi: 1 ATP + 1 GTP
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {/* Sisi Glikolisis */}
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-950">
                    <strong>Glikolisis (Langkah 10):</strong>
                    <div className="font-mono text-[10px] mt-1 text-red-900">PEP + ADP → Piruvat + ATP</div>
                    <div className="text-[10px] text-red-800 mt-1">
                      Enzim: Piruvat Kinase<br />
                      ΔG°′ = -31.4 kJ/mol (Sangat ireversibel)
                    </div>
                  </div>

                  {/* Sisi Glukoneogenesis */}
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950">
                    <strong>Glukoneogenesis (2 Langkah Pintas):</strong>
                    <div className="font-mono text-[10px] mt-1 text-emerald-900">
                      1. Piruvat + CO₂ + ATP → Oksaloasetat + ADP + Pi<br />
                      2. Oksaloasetat + GTP → PEP + GDP + CO₂
                    </div>
                    <div className="text-[10px] text-emerald-800 mt-1">
                      Enzim: <strong>Piruvat Karboksilase</strong> (Matriks Mitokondria) & <strong>PEPCK</strong> (Sitosol)
                    </div>
                  </div>
                </div>

                {/* Shuttle Malat Detail */}
                <div className="mt-2.5 p-2 bg-blue-50/80 rounded-lg border border-blue-200 text-[11px] text-blue-950 space-y-1">
                  <strong>Kompartemen & Shuttle Malat:</strong>
                  <p className="text-[10px] leading-relaxed">
                    Membran mitokondria bagian dalam tidak memiliki transporter untuk Oksaloasetat. Maka, Oksaloasetat direduksi menjadi <strong>Malat</strong> oleh Malat Dehidrogenase mitokondria, keluar melintasi transporter malat ke sitosol, lalu dioksidasi kembali menjadi Oksaloasetat sebelum diubah menjadi PEP oleh PEPCK sitosol.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DETAIL BYPASS 2: F1,6BP -> F6P */}
          {activeBypass === 2 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs">
                <div className="font-bold text-stone-900 mb-1 flex items-center justify-between">
                  <span>Bypass 2: Pembalikan Reaksi Fosfofruktokinase-1 (PFK-1)</span>
                  <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                    Pelepasan Pi (Hidrolisis)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-950">
                    <strong>Glikolisis (Langkah 3):</strong>
                    <div className="font-mono text-[10px] mt-1 text-red-900">F6P + ATP → F-1,6-BP + ADP</div>
                    <div className="text-[10px] text-red-800 mt-1">
                      Enzim: PFK-1 (ΔG°′ = -14.2 kJ/mol)<br />
                      Dihambat oleh ATP & sitrat, dipacu oleh F-2,6-BP.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950">
                    <strong>Glukoneogenesis (Bypass 2):</strong>
                    <div className="font-mono text-[10px] mt-1 text-emerald-900">
                      F-1,6-BP + H₂O → F6P + Pi
                    </div>
                    <div className="text-[10px] text-emerald-800 mt-1">
                      Enzim: <strong>Fruktosa-1,6-bisfosfatase-1 (FBPase-1)</strong><br />
                      Reaksi hidrolisis sederhana tanpa menghasilkan ATP.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DETAIL BYPASS 3: G6P -> Glukosa */}
          {activeBypass === 3 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs">
                <div className="font-bold text-stone-900 mb-1 flex items-center justify-between">
                  <span>Bypass 3: Pembalikan Reaksi Heksokinase / Glukokinase</span>
                  <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                    Lumen Retikulum Endoplasma
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-950">
                    <strong>Glikolisis (Langkah 1):</strong>
                    <div className="font-mono text-[10px] mt-1 text-red-900">Glukosa + ATP → G6P + ADP</div>
                    <div className="text-[10px] text-red-800 mt-1">
                      Enzim: Heksokinase/Glukokinase<br />
                      ΔG°′ = -16.7 kJ/mol
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950">
                    <strong>Glukoneogenesis (Bypass 3):</strong>
                    <div className="font-mono text-[10px] mt-1 text-emerald-900">
                      G6P + H₂O → D-Glukosa Bebas + Pi
                    </div>
                    <div className="text-[10px] text-emerald-800 mt-1">
                      Enzim: <strong>Glukosa-6-fosfatase</strong><br />
                      Tertanam di lumen membran retikulum endoplasma hepar.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // CONTROL CONTENT: Kuis Analisis & Refleksi
  const renderControlContent = () => {
    switch (phase) {
      case 'PREDICTION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 1 • Prediksi Termodinamika</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Apakah Glukoneogenesis Sekadar Kebalikan Glikolisis?
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Menurut hipotesis kelompok Anda, mengapa sel tidak bisa menggunakan 10 enzim glikolisis yang sama dan hanya menjalankannya ke arah sebaliknya?
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPredictionHypothesis('A')}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  predictionHypothesis === 'A' ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold' : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                A. Karena tiga langkah glikolisis memiliki penurunan energi bebas (ΔG) yang sangat besar dan bersifat ireversibel di dalam sel.
              </button>
              <button
                type="button"
                onClick={() => setPredictionHypothesis('B')}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  predictionHypothesis === 'B' ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold' : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                B. Karena enzim glikolisis akan rusak segera setelah digunakan satu kali.
              </button>
            </div>
          </div>
        );

      case 'MANIPULATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 2 • Manipulasi Eksplorasi Bypass</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Kaji Setiap Langkah Pintas (Bypass 1, 2, dan 3)
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Ketuk ketiga tombol bypass di bagian atas visualisasi sebelah kiri untuk memeriksa enzim dan kebutuhan energinya.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <span className="font-bold text-stone-900 block">Status Eksplorasi Bypass:</span>
              <div className="flex items-center justify-between text-[11px]">
                <span>Bypass 1 (Piruvat → PEP):</span>
                <span className={exploredBypasses[1] ? 'font-bold text-emerald-600' : 'text-stone-400'}>
                  {exploredBypasses[1] ? '✓ Ditinjau' : 'Belum'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Bypass 2 (FBP → F6P):</span>
                <span className={exploredBypasses[2] ? 'font-bold text-emerald-600' : 'text-stone-400'}>
                  {exploredBypasses[2] ? '✓ Ditinjau' : 'Belum'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Bypass 3 (G6P → Glukosa):</span>
                <span className={exploredBypasses[3] ? 'font-bold text-emerald-600' : 'text-stone-400'}>
                  {exploredBypasses[3] ? '✓ Ditinjau' : 'Belum'}
                </span>
              </div>
            </div>
          </div>
        );

      case 'OBSERVATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 3 • Amati Fakta Bypass</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Ringkasan Enzim Pintas Kunci
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <strong>1. Piruvat Karboksilase & PEPCK:</strong> Menggantikan Piruvat Kinase dengan konsumsi 1 ATP + 1 GTP per molekul piruvat.
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <strong>2. FBPase-1:</strong> Menggantikan PFK-1 dengan hidrolisis fosfat anorganik (Pi).
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <strong>3. Glukosa-6-fosfatase:</strong> Menggantikan Heksokinase di retikulum endoplasma sel hepar untuk melepaskan glukosa bebas ke darah.
              </div>
            </div>
          </div>
        );

      case 'ANALYSIS':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 4 • Kuis Analisis Kunci</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Mengapa Glukoneogenesis Bukan Sekadar Pembalikan Glikolisis?
              </h4>
            </div>

            <div className="space-y-2">
              {[
                { 
                  id: 'A', 
                  label: 'Tiga reaksi glikolisis bersifat sangat eksergonik (ireversibel) sehingga membutuhkan enzim bypass khusus dengan input energi untuk membalikkan arah termodinamika.' 
                },
                { 
                  id: 'B', 
                  label: 'Karena glukoneogenesis hanya bisa terjadi di dalam lambung bukan di dalam sel.' 
                },
                { 
                  id: 'C', 
                  label: 'Karena glukoneogenesis tidak menghasilkan glukosa melainkan langsung menghasilkan lemak.' 
                }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAnalysisAnswer(opt.id)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs cursor-pointer transition-all ${
                    analysisAnswer === opt.id ? 'bg-stone-900 text-amber-300 font-bold' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  <strong>{opt.id}. </strong>{opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'FEEDBACK':
        return (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <ShieldAlert className="w-5 h-5 text-red-600" />}
                <span>{isCorrect ? 'Analisis Sempurna & Tepat!' : 'Periksa Kembali Jawaban Analisis'}</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                {isCorrect
                  ? 'Tiga reaksi glikolisis (Heksokinase, PFK-1, Piruvat Kinase) memiliki nilai ΔG negatif yang masif. Glukoneogenesis mem-bypass ketiga titik ireversibel ini menggunakan Piruvat Karboksilase + PEPCK, FBPase-1, dan Glukosa-6-fosfatase, sehingga jalur ini memiliki nilai ΔG total negatif yang menguntungkan secara termodinamika.'
                  : 'Pilihan yang benar adalah A: Tiga reaksi glikolisis bersifat sangat eksergonik (ireversibel) sehingga membutuhkan enzim bypass khusus.'}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" id="lkm-section-f">
      {/* Header Bagian F */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>Bagian F • Tiga Bypass Glukoneogenesis & Refleksi Akhir</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Tiga Bypass Glukoneogenesis dan Validasi Refleksi Ilmiah
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Kaji bagaimana sel hepar menyintesis glukosa baru dari prekursor non-karbohidrat melalui 3 rintangan termodinamika, kemudian validasi prediksi awal kelompok Anda dari Bagian A.
        </p>
      </div>

      {/* Progressive 2-Column Activity Layout untuk Tiga Bypass */}
      <LKMProgressiveActivityLayout
        title="Peta Tiga Bypass Glukoneogenesis vs Glikolisis"
        badge="Bagian F • 5 Tahap Progresif"
        currentPhase={phase}
        onPhaseChange={setPhase}
        visualContent={renderVisualContent()}
        controlContent={renderControlContent()}
        hints={hints}
        onReset={handleReset}
        onCheckAnswer={phase === 'ANALYSIS' ? handleCheckAnswer : undefined}
        canCheck={analysisAnswer !== null}
        score={score}
        isCorrect={isCorrect}
        explanation="Glukoneogenesis membutuhkan 4 enzim pengganti untuk mem-bypass 3 reaksi ireversibel glikolisis: (1) Piruvat Karboksilase dan PEPCK menggantikan Piruvat Kinase; (2) FBPase-1 menggantikan PFK-1; dan (3) Glukosa-6-fosfatase menggantikan Heksokinase. Sinergi ini menjamin arah anabolik tetap disukai secara termodinamika."
      />

      {/* Bagian Validasi & Refleksi Prediksi Kelompok (Terekam dari Bagian A) */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Kilas Balik Prediksi Awal Kelompok (Tercatat dari Bagian A)</span>
          </h3>
          <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
            {groupName}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 block">Bentuk Penyimpanan Pilihan Awal:</span>
            <p className="text-stone-700">
              {predictionData.casePrediction 
                ? `${predictionData.casePrediction === 3 ? 'Polimer Glikogen' : 'Pilihan ' + predictionData.casePrediction}`
                : 'Disimpan dalam bentuk polimer glikogen'}
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 block">Organ Target Menurut Prediksi:</span>
            <p className="text-stone-700">
              {predictionData.targetOrgans || 'Hati (Hepar) dan Otot Rangka'}
            </p>
          </div>
        </div>

        {/* Validasi Prediksi oleh Mahasiswa */}
        <div className="space-y-3 pt-2">
          <label className="font-bold text-xs text-stone-900 block">
            Setelah menelaah biokimiawi anabolisme karbohidrat dari Bagian A sampai F, bagaimana validitas hipotesis awal kelompok Anda?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setReflectionStatus('VALIDATED')}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                reflectionStatus === 'VALIDATED'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Prediksi Awal Kami Tepat & Tervalidasi</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Glukosa berlebih memang disimpan sebagai glikogen di hati dan otot serta lemak di adiposa saat kapasitas penuh.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setReflectionStatus('REVISED')}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                reflectionStatus === 'REVISED'
                  ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Prediksi Kami Memerlukan Revisi Ilmiah</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Kami awalnya belum menyadari perbedaan fungsi enzimatis glikogen hati vs otot serta pentingnya aktivasi UDP-glukosa.
              </p>
            </button>
          </div>

          {/* Form Kesimpulan Akhir Kelompok */}
          <div className="space-y-1.5 pt-2">
            <label className="font-bold text-xs text-stone-900 block">
              Rumuskan Kesimpulan Akhir Kelompok (Keterpaduan Anabolisme Karbohidrat):
            </label>
            <textarea
              rows={3}
              value={finalConclusion}
              onChange={(e) => setFinalConclusion(e.target.value)}
              placeholder="Tuliskan kesimpulan kelompok: keterpaduan carbo-loading, pembentukan glikogen, enzim pengatur, serta tiga bypass glukoneogenesis..."
              className="w-full p-3 text-xs bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setIsSaved(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{isSaved ? '✓ Refleksi & Kesimpulan Tersimpan' : 'Simpan Refleksi Kelompok'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Ekspor LKM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigasi Akhir & Tombol Selesaikan LKM */}
      <div className="flex items-center justify-between pt-3 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian E</span>
        </button>

        <button
          type="button"
          onClick={onFinishLKM}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
          id="btn-finish-lkm"
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Selesaikan & Kumpulkan LKM Anabolisme</span>
        </button>
      </div>
    </div>
  );
};
