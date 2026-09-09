/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { RICE_JOURNEY_STAGES } from '../../data/carbohydrateData';
import { DigestiveAnatomyViewer2D } from './DigestiveAnatomyViewer2D';

interface RiceToGlucoseJourneyProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export const RiceToGlucoseJourney: React.FC<RiceToGlucoseJourneyProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [stageProgress, setStageProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [userSelection, setUserSelection] = useState<string | null>(null);

  const activeStage = RICE_JOURNEY_STAGES[currentStep - 1] || RICE_JOURNEY_STAGES[0];

  const handleNextStep = () => {
    if (currentStep < RICE_JOURNEY_STAGES.length) {
      setCurrentStep(currentStep + 1);
      setStageProgress(0);
      setUserSelection(null);
    } else {
      // At step 7, next triggers transition to oxidative glucose breakdown
      onCompleteAndNext();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setStageProgress(0);
      setUserSelection(null);
    }
  };

  // Otomatis menjalankan perjalanan dari tahap 1 ke tahap 7 saat isPlaying aktif
  useEffect(() => {
    if (!isPlaying) return;

    // Durasi per tahap: 8 detik pada kecepatan 1x
    const intervalMs = 100;
    const totalStepMs = 8000 / speed;
    const increment = (intervalMs / totalStepMs) * 100;

    const timer = setInterval(() => {
      setStageProgress((prev) => {
        if (prev >= 100) {
          if (autoAdvance) {
            if (currentStep < RICE_JOURNEY_STAGES.length) {
              setCurrentStep((s) => s + 1);
              setUserSelection(null);
              return 0;
            } else {
              // Tahap 7 telah selesai
              setIsPlaying(false);
              return 100;
            }
          }
          return 0;
        }
        return Math.min(100, prev + increment);
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed, autoAdvance, currentStep]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Bar Navigasi Atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#706B5C] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E5E2D9]">
            Tahap {currentStep} dari {RICE_JOURNEY_STAGES.length}
          </span>
        </div>
      </div>

      {/* Header Judul Materi: Dari Sesuap Nasi hingga Monosakarida di Aliran Darah */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Tahap 2: Saluran Cerna Karbohidrat
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
          Dari Sesuap Nasi hingga Monosakarida di Aliran Darah
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-3xl leading-relaxed">
          Amati perjalanan mekanik dan biokimiawi pati nasi secara berurutan: dari suapan nasi di mulut, pemotongan awal oleh amilase saliva, pembentukan bolus licin, peristaltik esofagus, inaktivasi asam di lambung, pemecahan lanjutan oleh amilase pankreas di duodenum, hingga aksi enzim brush border mengubahnya menjadi monosakarida glukosa yang diserap ke aliran darah.
        </p>
      </div>

      {/* Timeline Navigasi 7 Tahap Cepat */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
        {RICE_JOURNEY_STAGES.map((st) => (
          <button
            key={st.step}
            onClick={() => {
              setCurrentStep(st.step);
              setUserSelection(null);
            }}
            className={`px-3 py-2 rounded-2xl border text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              currentStep === st.step
                ? 'bg-[#6B705C] text-white border-[#6B705C] shadow-xs'
                : 'bg-white text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === st.step ? 'bg-white/20 text-white' : 'bg-[#F5F2EA] text-[#706B5C]'
            }`}>
              {st.step}
            </span>
            <span>{st.organ.split('(')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Kontrol Navigasi & Kecepatan */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E5E2D9] shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
          </button>
          
          <button
            onClick={() => setCurrentStep(1)}
            className="p-1.5 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
            title="Ulangi dari Awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-[#E5E2D9] mx-1" />

          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="p-1.5 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Tahap Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-[#706B5C]">
            Tahap {currentStep} / {RICE_JOURNEY_STAGES.length}
          </span>
          <button
            onClick={handleNextStep}
            disabled={currentStep === RICE_JOURNEY_STAGES.length}
            className="p-1.5 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Tahap Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Toggle Perjalanan Otomatis */}
          <button
            onClick={() => setAutoAdvance(!autoAdvance)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              autoAdvance
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-stone-100 text-stone-600 border border-stone-200'
            }`}
            title="Jika aktif, animasi akan otomatis berpindah dari tahap 1 hingga tahap 7"
          >
            <span className={`w-2 h-2 rounded-full ${autoAdvance ? 'bg-emerald-600 animate-pulse' : 'bg-stone-400'}`} />
            <span>{autoAdvance ? 'Lanjut Otomatis: Aktif' : 'Lanjut Manual'}</span>
          </button>

          <div className="flex items-center gap-1">
            <span className="text-[#A5A58D]">Kecepatan:</span>
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded-lg font-mono text-[11px] transition-colors cursor-pointer ${
                  speed === s ? 'bg-[#6B705C] text-white font-bold' : 'bg-[#F5F2EA] text-[#706B5C] hover:bg-[#E5E2D9]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-[#E5E2D9]" />

          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer ${
              showLabels ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-[#FAF8F5] text-[#706B5C]'
            }`}
          >
            {showLabels ? 'Label Organ: Aktif' : 'Label: Mati'}
          </button>
        </div>
      </div>

      {/* Progress Bar Perjalanan Tahap Ini */}
      <div className="bg-white px-4 py-2 rounded-2xl border border-[#E5E2D9] space-y-1 shadow-xs">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-[#3E3E3E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            Progres Tahap {currentStep}: {activeStage.organ}
          </span>
          <span className="text-[#A5A58D] font-mono text-[10.5px]">
            {Math.round(stageProgress)}% {autoAdvance && isPlaying ? (currentStep === 7 ? '(Menyelesaikan...)' : '➔ Lanjut otomatis') : '(Manual)'}
          </span>
        </div>
        <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${stageProgress}%` }}
          />
        </div>
      </div>

      {/* Grid Visualizer Anatomi 2D & Penjelasan Interaktif */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: 2D Anatomical Canvas Viewer & Full Structured Data */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E5E2D9] p-4 flex flex-col shadow-xs space-y-4">
          <DigestiveAnatomyViewer2D
            currentStep={currentStep}
            activeStage={activeStage}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
            onSelectStep={(s) => setCurrentStep(s)}
            onNextStep={handleNextStep}
            onOpenOxidative={onCompleteAndNext}
          />
        </div>

        {/* Kolom Kanan: Penjelasan Ilmiah, Reaksi Kimia, & Pertanyaan Refleksi */}
        <div className="lg:col-span-4 space-y-4 flex flex-col">
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-4 shadow-xs">
            
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Tahap {activeStage.step}: {activeStage.organ}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                {activeStage.title}
              </h3>
              <p className="text-xs text-[#A5A58D]">
                {activeStage.subtitle}
              </p>
            </div>

            {/* Kotak Penjelasan Ilmiah vs Versi Mudah */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#3E3E3E] text-[11px] block">
                  {isEasyMode ? '💡 Versi Penjelasan Mudah:' : '🔬 Mekanisme Biokimiawi:'}
                </span>
                <button
                  onClick={() => setIsEasyMode(!isEasyMode)}
                  className="text-[10px] font-semibold text-amber-800 hover:underline cursor-pointer"
                >
                  {isEasyMode ? 'Lihat Versi Ilmiah' : 'Lihat Versi Mudah'}
                </button>
              </div>
              <p className="text-[#706B5C] leading-relaxed text-[11px]">
                {isEasyMode ? activeStage.simpleExplanation : activeStage.scientificExplanation}
              </p>
            </div>

            {/* Data Reaksi Kimia Tahap Ini */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-200/60">
                <span className="font-bold text-cyan-900 block text-[10px]">Enzim Terlibat:</span>
                <p className="text-cyan-800 text-[11px] font-semibold">{activeStage.enzymes.join(', ')}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                <span className="font-bold text-amber-900 block text-[10px]">Substrat:</span>
                <p className="text-amber-800 text-[11px]">{activeStage.substrates.join(', ')}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/60">
                <span className="font-bold text-rose-900 block text-[10px]">Ikatan yang Diputus:</span>
                <p className="text-rose-800 text-[11px] font-medium">{activeStage.bondCleaved || 'Tidak ada'}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                <span className="font-bold text-emerald-900 block text-[10px]">Hasil / Produk:</span>
                <p className="text-emerald-800 text-[11px] font-semibold">{activeStage.products.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Kotak Pertanyaan Interaktif Tahap Ini */}
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-4 text-xs space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#3E3E3E] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                Refleksi Tahap Ini
              </span>
              <button
                onClick={() => setShowQuestion(!showQuestion)}
                className="text-[11px] font-semibold text-[#6B705C] hover:underline cursor-pointer"
              >
                {showQuestion ? 'Sembunyikan' : 'Coba Tebak'}
              </button>
            </div>

            {showQuestion && (
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                <p className="text-[#3E3E3E] font-medium text-[11px]">
                  {currentStep === 1 && 'Apakah nasi yang baru dikunyah di mulut sudah selesai dipecah menjadi glukosa siap serap?'}
                  {currentStep === 2 && 'Apakah terjadi pemecahan kimiawi karbohidrat baru saat bolus melewati esofagus?'}
                  {currentStep === 3 && 'Mengapa amilase saliva terhenti total aktivitasnya saat bolus tiba di lambung?'}
                  {currentStep === 4 && 'Apa peran cairan bikarbonat dan amilase pankreas yang disekresikan ke lumen duodenum?'}
                  {currentStep === 5 && 'Mengapa amilase pankreas menghasilkan maltosa, maltotriosa, dan α-limit dextrin, bukan seluruhnya glukosa?'}
                  {currentStep === 6 && 'Enzim apa saja di brush border usus halus yang akhirnya menuntaskan oligosakarida menjadi monosakarida glukosa?'}
                  {currentStep === 7 && 'Bagaimana glukosa berpindah dari lumen usus hingga tiba di dalam sirkulasi darah tubuh?'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUserSelection('yes')}
                    className="px-3 py-1 rounded-lg bg-white border border-[#E5E2D9] text-[11px] font-semibold hover:bg-amber-50 cursor-pointer"
                  >
                    Lihat Jawaban
                  </button>
                </div>
                {userSelection && (
                  <div className="text-[10px] text-emerald-800 bg-emerald-100 p-2.5 rounded-xl font-medium leading-relaxed">
                    {currentStep === 1 && 'Belum! Pengunyahan mekanik memotong ukuran butiran nasi menjadi partikel kecil, saliva melumasinya menjadi bolus, dan amilase saliva memotong sebagian ikatan pati menjadi maltosa, maltotriosa, dan dekstrin. Glukosa murni belum terbentuk di sini.'}
                    {currentStep === 2 && 'Tidak ada pemecahan kimiawi. Esofagus murni merupakan saluran transpor mekanik melalui gelombang peristaltik otot terkoordinasi untuk mendorong bolus masuk ke lambung.'}
                    {currentStep === 3 && 'Karena getah lambung (HCl) sangat asam (pH 1.5–2.0). Keasaman ekstrem ini mendenaturasi sisi aktif amilase saliva secara permanen (inaktif).'}
                    {currentStep === 4 && 'Natrium bikarbonat (NaHCO₃) menetralkan asam lambung menjadi pH ~7.8 agar enzim amilase pankreas dapat aktif optimal memotong sisa rantai pati.'}
                    {currentStep === 5 && 'Karena amilase pankreas adalah endoglukosidase yang hanya memutus ikatan α-1,4 internal dan TIDAK dapat memutus titik cabang α-1,6 pada amilopektin, sehingga meninggalkan α-limit dextrin.'}
                    {currentStep === 6 && 'Maltase memutus ikatan maltosa & maltotriosa menjadi glukosa, dan sukrase-isomaltase memutus titik cabang α-1,6 α-limit dekstrin hingga seluruhnya menjadi glukosa bebas.'}
                    {currentStep === 7 && 'Glukosa melintasi membran enterosit usus via transporter SGLT1 dan GLUT2, menembus endotel kapiler darah, lalu mengalir bersama eritrosit menuju vena porta hepatika dan seluruh sel tubuh untuk diubah menjadi ATP.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigasi Footer */}
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Lanjut ke Pemecahan Oksidatif Glukosa (ATP)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
