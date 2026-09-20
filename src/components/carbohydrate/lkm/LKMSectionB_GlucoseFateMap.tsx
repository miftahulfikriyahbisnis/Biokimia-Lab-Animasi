/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  BookOpen,
  Info
} from 'lucide-react';
import { HumanOrganFateMapSVG, OrganKey } from './illustrations/HumanOrganFateMapSVG';
import { LKMProgressiveActivityLayout, InteractionPhase } from './interactive/LKMProgressiveActivityLayout';
import { InteractiveLipogenesisCitrateShuttle } from './interactive/InteractiveLipogenesisCitrateShuttle';

interface LKMSectionBGlucoseFateMapProps {
  onBack: () => void;
  onNext: () => void;
}

export const LKMSectionB_GlucoseFateMap: React.FC<LKMSectionBGlucoseFateMapProps> = ({
  onBack,
  onNext,
}) => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [selectedOrgan, setSelectedOrgan] = useState<OrganKey>('LIVER');
  const [exploredOrgans, setExploredOrgans] = useState<Record<OrganKey, boolean>>({
    PANCREAS: false,
    LIVER: true,
    MUSCLE: false,
    ADIPOSE: false,
  });

  // Layar 1 Prediksi
  const [predictionHypothesis, setPredictionHypothesis] = useState<string | null>(null);

  // Layar 4 Analisis
  const [quizAnswerHati, setQuizAnswerHati] = useState<string | null>(null);
  const [quizAnswerOtot, setQuizAnswerOtot] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(100);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showShuttleModal, setShowShuttleModal] = useState<boolean>(false);

  const hints = [
    'Hati dan otot rangka sama-sama mampu menyintesis dan menyimpan polimer glikogen dalam jumlah besar.',
    'Untuk dapat keluar melintasi membran sel menuju aliran darah, molekul glukosa harus berada dalam bentuk netral tak bermuatan (glukosa bebas, bukan ester fosfat seperti G6P).',
    'Enzim Glukosa-6-fosfatase hanya diekspresikan secara fungsional di lumen retikulum endoplasma sel hepar dan tubulus ginjal, namun TIDAK diekspresikan di sel otot rangka.'
  ];

  const handleSelectOrgan = (org: OrganKey) => {
    setSelectedOrgan(org);
    setExploredOrgans(prev => ({ ...prev, [org]: true }));
  };

  const exploredCount = Object.values(exploredOrgans).filter(Boolean).length;

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const isCorrect = quizAnswerHati === 'A' && quizAnswerOtot === 'B';
    if (!isCorrect) {
      setScore(prev => Math.max(40, prev - 25));
    }
  };

  const handleReset = () => {
    setQuizAnswerHati(null);
    setQuizAnswerOtot(null);
    setIsAnswerChecked(false);
    setPhase('MANIPULATION');
  };

  const isCorrect = quizAnswerHati === 'A' && quizAnswerOtot === 'B';

  // VISUAL CONTENT (KOLOM KIRI ~60%)
  const renderVisualContent = () => {
    return (
      <div className="w-full space-y-3">
        {/* Tracker Eksplorasi 4 Organ */}
        <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200/90 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">Eksplorasi Organ:</span>
            <span className="font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-bold">
              {exploredCount}/4 Organ Ditinjau
            </span>
          </div>
          <span className="text-[11px] text-stone-500">
            {exploredCount === 4 ? 'Semua organ telah dipelajari' : 'Ketuk organ pada peta untuk mengeksplorasi'}
          </span>
        </div>

        {/* Peta Tubuh & Seluler SVG Interaktif */}
        <HumanOrganFateMapSVG
          selectedOrgan={selectedOrgan}
          onSelectOrgan={handleSelectOrgan}
          exploredOrgans={exploredOrgans}
        />
      </div>
    );
  };

  // CONTROL CONTENT (KOLOM KANAN ~40%)
  const renderControlContent = () => {
    switch (phase) {
      case 'PREDICTION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 1 • Prediksi Organ</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Otonomi vs Kerja Sama Antar-Organ
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Menurut prediksi kelompok Anda, apakah glikogen yang tersimpan di otot rangka dapat dilepaskan ke darah untuk membantu organ vital lain (seperti otak) saat berpuasa?
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPredictionHypothesis('YES')}
                className={`w-full p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                  predictionHypothesis === 'YES'
                    ? 'bg-amber-100 border-amber-600 text-amber-950 ring-1 ring-amber-500'
                    : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                A. Ya, semua cadangan glikogen tubuh bebas keluar masuk darah untuk mempertahankan glukosa sistemik.
              </button>
              <button
                type="button"
                onClick={() => setPredictionHypothesis('NO')}
                className={`w-full p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                  predictionHypothesis === 'NO'
                    ? 'bg-amber-100 border-amber-600 text-amber-950 ring-1 ring-amber-500'
                    : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                B. Tidak, ada perbedaan enzimatis mendasar yang membuat glikogen otot bersifat tertutup khusus untuk dirinya sendiri.
              </button>
            </div>

            {predictionHypothesis && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prediksi tercatat! Lanjutkan ke <strong>Layar 2 • Manipulasi</strong> untuk membuktikan secara molekuler.</span>
              </div>
            )}
          </div>
        );

      case 'MANIPULATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 2 • Manipulasi & Navigasi Organ</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Eksplorasi Nasib Glukosa di 4 Organ Kunci
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Pilihlah setiap organ pada tombol atas atau ketuk langsung pada peta tubuh di sebelah kiri untuk melihat jalur biosintesisnya.
              </p>
            </div>

            <div className="space-y-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
              <span className="font-bold text-stone-900 block">Daftar Penugasan Organ:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <div className={`p-2 rounded-lg border text-center ${exploredOrgans.PANCREAS ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                  1. Pankreas {exploredOrgans.PANCREAS ? '✓' : ''}
                </div>
                <div className={`p-2 rounded-lg border text-center ${exploredOrgans.LIVER ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                  2. Hati (Hepar) {exploredOrgans.LIVER ? '✓' : ''}
                </div>
                <div className={`p-2 rounded-lg border text-center ${exploredOrgans.MUSCLE ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                  3. Otot Rangka {exploredOrgans.MUSCLE ? '✓' : ''}
                </div>
                <div className={`p-2 rounded-lg border text-center ${exploredOrgans.ADIPOSE ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                  4. Jaringan Adiposa {exploredOrgans.ADIPOSE ? '✓' : ''}
                </div>
              </div>
            </div>

            {selectedOrgan === 'LIVER' && (
              <div className="p-3 bg-red-50/80 rounded-xl border border-red-200 text-xs space-y-1">
                <span className="font-bold text-red-950 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-red-700" />
                  <span>Jalur Lipogenesis Lanjutan (Citrate Shuttle):</span>
                </span>
                <p className="text-[11px] text-red-900 leading-relaxed">
                  Bila kapasitas glikogen hati penuh (~100 g), surplus asetil-KoA disalurkan keluar mitokondria via Citrate Shuttle menjadi asam lemak dan VLDL.
                </p>
                <button
                  type="button"
                  onClick={() => setShowShuttleModal(!showShuttleModal)}
                  className="mt-1 text-[11px] font-bold text-red-700 underline cursor-pointer"
                >
                  {showShuttleModal ? 'Tutup Simulasi Shuttle' : 'Buka Detail Simulasi Citrate Shuttle'}
                </button>
                {showShuttleModal && (
                  <div className="mt-2 pt-2 border-t border-red-200">
                    <InteractiveLipogenesisCitrateShuttle />
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'OBSERVATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 3 • Amati Fakta Fisiologis</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Perbandingan Karakteristik Jalur Antar-Organ
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Amati ringkasan komparatif hasil penelusuran molekuler Anda:
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 space-y-1">
                <strong className="text-red-950 block">Hati (Hepar):</strong>
                <p className="text-stone-700 text-[11px]">
                  Glukosa masuk via GLUT2 (tidak tergantung insulin). Memiliki <strong>Glukosa-6-fosfatase</strong> di retikulum endoplasma. 
                  <span className="font-bold text-red-900 block mt-0.5">“Glikogen hati membantu mempertahankan glukosa darah.”</span>
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <strong className="text-amber-950 block">Otot Rangka:</strong>
                <p className="text-stone-700 text-[11px]">
                  Glukosa masuk via GLUT4 (translokasi dipicu insulin/kontraksi). <strong>TIDAK MEMILIKI Glukosa-6-fosfatase</strong>. 
                  <span className="font-bold text-amber-900 block mt-0.5">“Glikogen otot digunakan oleh otot itu sendiri.”</span>
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-yellow-50 border border-yellow-200 space-y-1">
                <strong className="text-yellow-950 block">Jaringan Adiposa:</strong>
                <p className="text-stone-700 text-[11px]">
                  Glukosa menghasilkan gliserol-3-fosfat yang diesterifikasi dengan asam lemak menjadi triasilgliserol droplet netral.
                  <span className="font-bold text-yellow-900 block mt-0.5">“Triasilgliserol menjadi cadangan energi jangka panjang.”</span>
                </p>
              </div>
            </div>
          </div>
        );

      case 'ANALYSIS':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 4 • Analisis Sebab-Akibat</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Mengapa Glikogen Hati Berbeda dengan Glikogen Otot?
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Jawablah pertanyaan krusial berikut berdasarkan enzimatis yang Anda amati:
              </p>
            </div>

            {/* Pertanyaan 1: Hati */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <label className="font-bold text-stone-900 block">
                1. Mengapa glikogen hati dapat berkontribusi langsung menaikkan glukosa darah?
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'A', label: 'Hati memiliki enzim Glukosa-6-fosfatase sehingga dapat membuang fosfat dan melepaskan glukosa netral bebas ke darah.' },
                  { id: 'B', label: 'Hati memiliki pori-pori membran raksasa yang meloloskan molekul G6P bermuatan fosfat langsung ke darah.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswerHati(opt.id)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs cursor-pointer transition-all ${
                      quizAnswerHati === opt.id
                        ? 'bg-stone-900 text-amber-300 border-stone-800 font-semibold'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    <strong>{opt.id}. </strong>{opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pertanyaan 2: Otot */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <label className="font-bold text-stone-900 block">
                2. Mengapa glikogen otot rangka TIDAK DAPAT digunakan untuk menaikkan glukosa darah?
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'A', label: 'Otot tidak bisa memecah glikogen menjadi G6P.' },
                  { id: 'B', label: 'Otot tidak memiliki Glukosa-6-fosfatase sehingga G6P tetap terperangkap bermuatan negatif untuk glikolisis kontraksi otot sendiri.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswerOtot(opt.id)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs cursor-pointer transition-all ${
                      quizAnswerOtot === opt.id
                        ? 'bg-stone-900 text-amber-300 border-stone-800 font-semibold'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    <strong>{opt.id}. </strong>{opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'FEEDBACK':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 5 • Umpan Balik Ilmiah</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Hasil Evaluasi Pemahaman Organ
              </h4>
            </div>

            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Jawaban Anda Benar & Sempurna!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span>Periksa Kembali Jawaban Analisis</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed text-[11px]">
                {isCorrect
                  ? 'Tepat sekali! Hepar adalah satu-satunya organ penyimpan glikogen yang mengekspresikan Glukosa-6-fosfatase untuk kepentingan glukosa darah sistemik. Otot rangka adalah organ konsumen energi yang egois: semua glikogen yang disimpannya didedikasikan murni untuk regenerasi ATP serat kontraksinya sendiri.'
                  : 'Jawaban yang benar: Hati memiliki Glukosa-6-fosfatase (Pilihan A pada soal 1), sedangkan otot rangka tidak memiliki Glukosa-6-fosfatase sehingga G6P terkunci di dalam sel (Pilihan B pada soal 2).'}
              </p>

              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-stone-600 hover:text-stone-900 font-semibold underline text-[11px] cursor-pointer"
                >
                  Coba Jawab Ulang
                </button>
                <span className="font-mono font-bold text-stone-900">Skor: {score}/100</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" id="lkm-section-b">
      {/* Header Bagian B */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Activity className="w-4 h-4 text-blue-700" />
          <span>Bagian B • Representasi Makroskopik & Fisiologis</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Peta Organ Tujuan Glukosa: Pankreas, Hati, Otot, dan Jaringan Adiposa
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Ketahui bagaimana sinyal insulin memobilisasi pengangkutan glukosa ke organ penampung energi melalui 5 tahap progresif.
        </p>
      </div>

      {/* Progressive 2-Column Activity Layout */}
      <LKMProgressiveActivityLayout
        title="Peta Organ Nasib Glukosa: Integrasi Kompartemen & Enzim Kunci"
        badge="Bagian B • 5 Tahap Progresif"
        currentPhase={phase}
        onPhaseChange={setPhase}
        visualContent={renderVisualContent()}
        controlContent={renderControlContent()}
        hints={hints}
        currentHintIndex={currentHintIndex}
        onShowNextHint={() => setCurrentHintIndex(prev => Math.min(hints.length, prev + 1))}
        onReset={handleReset}
        onCheckAnswer={phase === 'ANALYSIS' ? handleCheckAnswer : undefined}
        canCheck={quizAnswerHati !== null && quizAnswerOtot !== null}
        score={score}
        isCorrect={isCorrect}
        explanation="Glukosa-6-fosfatase terikat pada membran retikulum endoplasma (ER) sel hepar dan tubulus ginjal. Enzim ini mengkatalisis hidrolisis Glukosa-6-fosfat + H2O -> Glukosa + Pi. Glukosa netral yang terbentuk kemudian ditransportasikan keluar sel via transporter GLUT2 ke dalam sirkulasi darah. Otot rangka tidak mengekspresikan Glukosa-6-fosfatase sehingga G6P tidak dapat meninggalkan miosit."
      />

      {/* Navigasi Lanjut & Kembali */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian A</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-c"
        >
          <span>Lanjut ke Bagian C: Fosforilasi Glukosa C6</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
