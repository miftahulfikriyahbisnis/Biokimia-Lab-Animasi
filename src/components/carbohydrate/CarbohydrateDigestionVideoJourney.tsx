/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw as Rewind10,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  AlertCircle,
  HelpCircle,
  Check,
  FileText,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface StageVideoData {
  step: number;
  slug: string;
  title: string;
  organShort: string;
  subtitle: string;
  videoSrc: string;
  vttSrc: string;
  durationLabel: string;
  summary: string;
  transcript: string;
  question: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanationCorrect: string;
    explanationWrong: string;
  };
}

const DIGESTION_VIDEO_STAGES: StageVideoData[] = [
  {
    step: 1,
    slug: '01-mulut.mp4',
    title: 'Tahap 1 — Mulut',
    organShort: 'Tahap 1: Mulut',
    subtitle: 'Mastikasi Mekanis & Pemutusan Ikatan Alfa-1,4 Glikosidik oleh Alfa-Amilase Saliva',
    videoSrc: '/videos/carbohydrate/01-mulut.mp4',
    vttSrc: '/videos/carbohydrate/01-mulut.vtt',
    durationLabel: '00:10',
    summary:
      'Proses mastikasi (pengunyahan makanan oleh gigi) memecah suapan nasi menjadi partikel yang lebih kecil dan melumasinya dengan saliva hingga membentuk bolus. Enzim alfa-amilase saliva (ptialin) mulai bekerja memutus ikatan alfa-1,4 glikosidik pada rantai pati, menghasilkan maltosa, maltotriosa, dan dekstrin (oligosakarida). Pada tahap mulut ini, pati belum terurai seluruhnya menjadi glukosa.',
    transcript:
      'Pada tahap awal pencernaan karbohidrat, suapan nasi dimasukkan ke dalam rongga mulut. Melalui proses mastikasi (pengunyahan oleh gigi) dan pergerakan lidah, butiran nasi dipecah menjadi partikel yang jauh lebih kecil secara fisik. Kelenjar saliva (parotis, submandibularis, dan sublingualis) menyekresikan saliva yang mengandung musin untuk melumasi makanan menjadi gumpalan licin yang disebut bolus. Bersamaan dengan itu, enzim alfa-amilase saliva (ptialin) mulai bekerja menghidrolisis ikatan alfa-1,4 glikosidik internal pada polimer amilosa dan amilopektin. Hasil hidrolisis awal ini adalah disakarida maltosa, trisakarida maltotriosa, serta fragmen oligosakarida bercabang yang disebut dekstrin. Karena makanan berada di mulut dalam waktu singkat, hanya sebagian kecil pati yang terhidrolisis di sini, dan belum ada glukosa bebas murni yang diserap.',
    question: {
      prompt: 'Apa peran utama enzim alfa-amilase saliva pada pemecahan pati di mulut?',
      options: [
        'Langsung mengubah seluruh pati menjadi glukosa murni',
        'Mulai memutus ikatan alfa-1,4 glikosidik menghasilkan maltosa, maltotriosa, dan dekstrin',
        'Mengubah pati menjadi piruvat dan asam laktat',
        'Menyerap karbohidrat langsung ke dalam aliran darah'
      ],
      correctIndex: 1,
      explanationCorrect:
        'Benar. Enzim alfa-amilase saliva mulai memutus ikatan alfa-1,4 glikosidik menghasilkan maltosa, maltotriosa, dan dekstrin, namun belum menyelesaikannya menjadi glukosa murni.',
      explanationWrong:
        'Kurang tepat. Enzim alfa-amilase saliva hanya memulai pemutusan ikatan alfa-1,4 glikosidik pada pati, belum mengubah seluruhnya menjadi glukosa.'
    }
  },
  {
    step: 2,
    slug: '02-lambung.mp4',
    title: 'Tahap 2 — Esofagus dan Lambung',
    organShort: 'Tahap 2: Esofagus & Lambung',
    subtitle: 'Perjalanan Bolus via Peristaltik & Penghentian Aktivitas Amilase Saliva di Lambung',
    videoSrc: '/videos/carbohydrate/02-lambung.mp4',
    vttSrc: '/videos/carbohydrate/02-lambung.vtt',
    durationLabel: '00:10',
    summary:
      'Bolus didorong melalui esofagus menuju lambung oleh gerakan gelombang peristaltik. Di lambung, bolus diaduk dengan getah lambung hingga berubah menjadi kimus (chyme). Aktivitas alfa-amilase saliva berangsur berhenti karena suasana lambung yang sangat asam akibat sekresi asam klorida (HCl). Pada lambung, pati tidak langsung menjadi glukosa.',
    transcript:
      'Setelah terbentuk di rongga mulut, bolus didorong ke posterior oleh lidah menuju faring dan masuk ke esofagus. Refleks menelan menutup epiglotis untuk mencegah bolus masuk ke saluran napas. Melalui kontraksi sirkuler dan longitudinal terkoordinasi (gelombang peristaltik), bolus ditranspor menuruni esofagus menuju kardia lambung melewati sfingter esofagus bawah (LES). Di lambung, kontraksi otot lambung mengaduk bolus dengan getah lambung (asam klorida/HCl dan enzim pepsin) membentuk bubur semi-cair homogen yang disebut kimus (chyme). Tingkat keasaman yang sangat tinggi (pH 1.5–2.0) di lambung mendenaturasi struktur amilase saliva sehingga aktivitas pemecahan pati terhenti sementara. Pati sama sekali tidak langsung diubah menjadi glukosa di lambung. Selanjutnya, sfingter pilorus membuka sedikit demi sedikit untuk menyemprotkan kimus ke dalam duodenum.',
    question: {
      prompt: 'Mengapa aktivitas alfa-amilase saliva berangsur berhenti saat bolus berada di lambung?',
      options: [
        'Karena pati telah selesai diubah seluruhnya menjadi glukosa',
        'Karena lambung tidak memiliki kontraksi otot',
        'Karena suasana asam lambung (HCl) menginaktivasi enzim alfa-amilase saliva',
        'Karena makanan langsung diserap oleh dinding lambung'
      ],
      correctIndex: 2,
      explanationCorrect:
        'Benar. Suasana sangat asam pada getah lambung (pH 1,5–2,0 karena sekresi HCl) mendenaturasi enzim alfa-amilase saliva sehingga aktivitasnya terhenti.',
      explanationWrong:
        'Kurang tepat. Keasaman tinggi getah lambung (HCl) mendenaturasi struktur protein enzim alfa-amilase saliva.'
    }
  },
  {
    step: 3,
    slug: '03-usus-halus.mp4',
    title: 'Tahap 3 — Usus Halus hingga Monosakarida',
    organShort: 'Tahap 3: Usus Halus',
    subtitle: 'Pemecahan Lanjutan oleh Amilase Pankreas & Disakaridase Menjadi Monosakarida Siap Serap',
    videoSrc: '/videos/carbohydrate/03-usus-halus.mp4',
    vttSrc: '/videos/carbohydrate/03-usus-halus.vtt',
    durationLabel: '00:10',
    summary:
      'Di usus halus, enzim amilase pankreas melanjutkan pemecahan pati menjadi maltosa, maltotriosa, dan oligosakarida. Selanjutnya, enzim disakaridase (seperti maltase, sukrase, isomaltase) pada mikrovili usus halus menghasilkan monosakarida (terutama glukosa) yang dapat diserap melintasi dinding usus ke dalam sirkulasi darah.',
    transcript:
      'Di dalam lumen duodenum dan jejunum usus halus, amilase pankreas melanjutkan hidrolisis ikatan alfa-1,4 internal pada molekul pati. Hasilnya adalah maltosa, maltotriosa, dan oligosakarida seperti alfa-limit dekstrin. Selanjutnya, enzim disakaridase pada permukaan brush border mikrovili usus halus (maltase, sukrase-isomaltase) menyelesaikan hidrolisis menjadi unit monosakarida tunggal, terutama glukosa murni. Monosakarida glukosa ini kemudian diserap melintasi membran enterosit melalui transpor aktif sekunder (SGLT1) dan transporter GLUT2 menuju kapiler darah vena porta hepatika untuk diedarkan ke seluruh tubuh sebagai substrat pembentukan energi ATP.',
    question: {
      prompt: 'Bagaimana peran amilase pankreas dan enzim disakaridase pada pencernaan karbohidrat di usus halus?',
      options: [
        'Amilase pankreas memecah pati menjadi maltosa/oligosakarida, lalu disakaridase menghasilkan monosakarida',
        'Disakaridase mengubah amilum menjadi glikogen sebelum masuk ke lambung',
        'Amilase pankreas mengubah langsung semua protein menjadi glukosa',
        'Enzim amilase saliva memproduksi insulin di dalam lumen usus'
      ],
      correctIndex: 0,
      explanationCorrect:
        'Benar. Amilase pankreas melanjutkan pemecahan pati menjadi maltosa, maltotriosa, dan oligosakarida, kemudian enzim disakaridase menghasilkan monosakarida yang dapat diserap ke aliran darah.',
      explanationWrong:
        'Kurang tepat. Amilase pankreas memecah pati menjadi maltosa, maltotriosa, dan oligosakarida; disakaridase mikrovili usus kemudian menyelesaikan pembentukan monosakarida.'
    }
  }
];

interface VideoDigestionProgress {
  video1Completed: boolean;
  video2Completed: boolean;
  video3Completed: boolean;
  journeyCompleted: boolean;
  lastActiveStep: number;
}

const STORAGE_KEY = 'carbohydrateDigestionProgress';

interface CarbohydrateDigestionVideoJourneyProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export const CarbohydrateDigestionVideoJourney: React.FC<CarbohydrateDigestionVideoJourneyProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  // Progres tersimpan secara terpisah di localStorage
  const [progress, setProgress] = useState<VideoDigestionProgress>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          video1Completed: !!parsed.video1Completed,
          video2Completed: !!parsed.video2Completed,
          video3Completed: !!parsed.video3Completed,
          journeyCompleted: !!parsed.journeyCompleted || isCompleted,
          lastActiveStep: Math.min(Math.max(Number(parsed.lastActiveStep) || 1, 1), 3)
        };
      }
    } catch {
      // Fallback aman jika localStorage belum terisi
    }
    return {
      video1Completed: isCompleted,
      video2Completed: isCompleted,
      video3Completed: isCompleted,
      journeyCompleted: isCompleted,
      lastActiveStep: 1
    };
  });

  // State langkah aktif saat ini (1, 2, atau 3)
  const [activeStep, setActiveStep] = useState<number>(progress.lastActiveStep || 1);

  // Player video states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.9);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);

  // Cek Pemahaman Modal & States
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const currentStage = DIGESTION_VIDEO_STAGES[activeStep - 1] || DIGESTION_VIDEO_STAGES[0];

  // Simpan progres ke localStorage saat ada perubahan
  const saveProgress = (patch: Partial<VideoDigestionProgress>) => {
    setProgress((prev) => {
      const updated = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Gagal menyimpan carbohydrateDigestionProgress:', err);
      }
      return updated;
    });
  };

  // Cek apakah suatu tahap terkunci
  const isStepLocked = (step: number): boolean => {
    if (step === 1) return false;
    if (step === 2) return !progress.video1Completed;
    if (step === 3) return !progress.video2Completed;
    return true;
  };

  // Cek status tahap
  const getStepStatus = (step: number): 'locked' | 'active' | 'completed' => {
    if (step === 1 && progress.video1Completed && activeStep !== 1) return 'completed';
    if (step === 2 && progress.video2Completed && activeStep !== 2) return 'completed';
    if (step === 3 && progress.video3Completed && activeStep !== 3) return 'completed';
    if (step === activeStep) return 'active';
    if (isStepLocked(step)) return 'locked';
    return 'completed';
  };

  // Ketika berpindah tahap
  const handleSelectStep = (step: number) => {
    if (isStepLocked(step)) return;

    // Hentikan video lama & reset waktu
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setActiveStep(step);
    setIsPlaying(false);
    setCurrentTime(0);
    setVideoError(null);
    setIsVideoLoading(true);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setQuizSubmitted(false);

    saveProgress({ lastActiveStep: step });
  };

  // Sinkronisasi Video ref saat tahap berganti
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.pause();
    vid.currentTime = 0;
    vid.playbackRate = playbackRate;
    vid.volume = volume;
    vid.muted = isMuted;

    // Tidak autoplay dengan suara sesuai instruksi
    setIsPlaying(false);
  }, [activeStep]);

  // Video event handlers
  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      setVideoError(null);
    }).catch((err) => {
      console.warn('Playback notice:', err);
    });
  };

  const handlePause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    handlePlay();
  };

  const handleSeekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    const target = Math.max(0, Math.min(videoRef.current.duration || 10, videoRef.current.currentTime + seconds));
    videoRef.current.currentTime = target;
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (newVol: number) => {
    if (!videoRef.current) return;
    const clamped = Math.max(0, Math.min(1, newVol));
    videoRef.current.volume = clamped;
    setVolume(clamped);
    if (clamped === 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  const handleSpeedChange = (spd: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = spd;
    setPlaybackRate(spd);
  };

  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika fokus pada input teks
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSeekRelative(-10);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSeekRelative(10);
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        handleToggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted]);

  // Video onEnded handler
  const handleVideoEnded = () => {
    setIsPlaying(false);

    // Buka quiz cek pemahaman antartahap
    setShowQuiz(true);
    setSelectedAnswer(null);
    setQuizSubmitted(false);

    // Simpan tanda video telah selesai diputar
    if (activeStep === 1) {
      saveProgress({ video1Completed: true });
    } else if (activeStep === 2) {
      saveProgress({ video2Completed: true });
    } else if (activeStep === 3) {
      saveProgress({ video3Completed: true, journeyCompleted: true });
    }
  };

  // Navigasi Antartahap
  const handlePrevStage = () => {
    if (activeStep > 1) {
      handleSelectStep(activeStep - 1);
    }
  };

  const handleNextStage = () => {
    if (activeStep === 1) {
      handleSelectStep(2);
    } else if (activeStep === 2) {
      handleSelectStep(3);
    } else if (activeStep === 3) {
      // Tombol akhir: Lanjutkan ke Pemecahan Oksidatif Glukosa Menjadi ATP
      onCompleteAndNext();
    }
  };

  // Handler jawaban kuis cek pemahaman
  const handleSubmitQuiz = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);

    const isCorrect = selectedAnswer === currentStage.question.correctIndex;
    if (isCorrect) {
      if (activeStep === 1) {
        saveProgress({ video1Completed: true });
      } else if (activeStep === 2) {
        saveProgress({ video2Completed: true });
      } else if (activeStep === 3) {
        saveProgress({ video3Completed: true, journeyCompleted: true });
      }
    }
  };

  const isCurrentQuizPassed =
    (activeStep === 1 && progress.video1Completed) ||
    (activeStep === 2 && progress.video2Completed) ||
    (activeStep === 3 && progress.video3Completed);

  const canGoNext =
    (activeStep === 1 && progress.video1Completed) ||
    (activeStep === 2 && progress.video2Completed) ||
    (activeStep === 3 && progress.video3Completed);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8" id="carbohydrate-video-journey">
      
      {/* 1. Bar Navigasi Atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] hover:border-[#6B705C] transition-colors cursor-pointer shadow-2xs"
          aria-label="Kembali ke Beranda Karbohidrat"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Modul Karbohidrat</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#706B5C] bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-[#E5E2D9]">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Tahap Pembelajaran {activeStep} dari 3
          </span>
        </div>
      </div>

      {/* 2. Header Judul Materi */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Video Pembelajaran Bertahap Saluran Pencernaan</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
          Dari Sesuap Nasi hingga Monosakarida di Aliran Darah
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-3xl leading-relaxed">
          Saksikan transformasi biokimiawi dan fisiologis pati beras secara berurutan melalui tiga video pembelajaran terarah: dari proses pengunyahan di mulut, transit melalui esofagus dan lambung, hingga pemecahan akhir enzimatis di usus halus dan absorpsi glukosa ke aliran darah.
        </p>
      </div>

      {/* 3. Tampilan Stepper Indikator Tahap (1. Mulut -> 2. Esofagus-Lambung -> 3. Usus-Darah) */}
      <div className="bg-white p-3 rounded-2xl border border-[#E5E2D9] shadow-2xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DIGESTION_VIDEO_STAGES.map((st, idx) => {
            const status = getStepStatus(st.step);
            const isLocked = isStepLocked(st.step);
            const isCompleted =
              (st.step === 1 && progress.video1Completed) ||
              (st.step === 2 && progress.video2Completed) ||
              (st.step === 3 && progress.video3Completed);

            return (
              <React.Fragment key={st.step}>
                <button
                  onClick={() => handleSelectStep(st.step)}
                  disabled={isLocked}
                  aria-label={`Pilih ${st.organShort}: ${st.title} (${isCompleted ? 'Selesai' : isLocked ? 'Terkunci' : 'Sedang Dipelajari'})`}
                  className={`flex-1 min-w-[200px] flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeStep === st.step
                      ? 'bg-amber-50/80 border-amber-500 text-[#3E3E3E] ring-2 ring-amber-500/20 shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 hover:bg-emerald-100/50'
                      : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-700 text-white'
                        : activeStep === st.step
                        ? 'bg-amber-700 text-white'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : isLocked ? <Lock className="w-3.5 h-3.5" /> : st.step}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold block truncate">
                      {st.organShort}
                    </span>
                    <span className="text-[10px] text-[#706B5C] block truncate">
                      {isCompleted ? '✓ Selesai dipelajari' : activeStep === st.step ? '▶ Sedang diputar' : '🔒 Belum dipelajari'}
                    </span>
                  </div>
                </button>

                {idx < DIGESTION_VIDEO_STAGES.length - 1 && (
                  <div className="text-stone-300 hidden sm:block shrink-0 px-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 4. Pemutar Video Utama (Satu Video Aktif, 75-85% Lebar Desktop, Centered) */}
      <div className="w-full max-w-5xl mx-auto space-y-4">
        
        {/* Banner Judul Tahap Aktif */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF8F5] px-4 py-3 rounded-2xl border border-[#E5E2D9]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
              TAHAP {currentStage.step} DARI 3
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#3E3E3E]">
              {currentStage.title}
            </h2>
            <p className="text-xs text-[#706B5C]">
              {currentStage.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
              aria-label="Tampilkan atau sembunyikan transkrip teks"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscript ? 'Tutup Transkrip' : 'Buka Transkrip'}</span>
            </button>
          </div>
        </div>

        {/* Video Box Container 16:9 */}
        <div
          ref={playerContainerRef}
          className="relative w-full aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-stone-800 flex items-center justify-center group"
          id="active-video-container"
        >
          {/* HTML5 Video Element with controls, playsInline, preload="metadata", object-fit: contain */}
          <video
            ref={videoRef}
            key={currentStage.videoSrc}
            src={currentStage.videoSrc}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain bg-black"
            style={{ objectFit: 'contain' }}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
              }
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration || 10);
                setIsVideoLoading(false);
              }
            }}
            onWaiting={() => setIsVideoLoading(true)}
            onPlaying={() => {
              setIsVideoLoading(false);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={handleVideoEnded}
            onError={() => {
              setVideoError(`Berkas video tidak dapat dimuat.`);
              setIsVideoLoading(false);
              setIsPlaying(false);
            }}
            aria-label={`Pemutar video: ${currentStage.title}`}
          >
            <track
              src={currentStage.vttSrc}
              kind="subtitles"
              srcLang="id"
              label="Bahasa Indonesia"
              default
            />
            Browser Anda tidak mendukung pemutar video HTML5.
          </video>

          {/* Overlay Jika Error Video: Menampilkan Nama dan Path File yang Gagal (Tanpa Konten Pengganti) */}
          {videoError && (
            <div className="absolute inset-0 bg-stone-900/95 flex flex-col items-center justify-center p-6 text-center text-white z-30 space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2 max-w-md">
                <p className="text-base font-bold text-rose-300">Gagal Memuat Video</p>
                <div className="bg-stone-950/80 rounded-xl p-3 border border-stone-800 text-left font-mono text-xs space-y-1">
                  <p>
                    <span className="text-stone-400 font-sans text-[11px]">Nama file: </span>
                    <span className="text-amber-300 font-bold">{currentStage.slug}</span>
                  </p>
                  <p>
                    <span className="text-stone-400 font-sans text-[11px]">Path file: </span>
                    <span className="text-emerald-300 font-bold">{currentStage.videoSrc}</span>
                  </p>
                </div>
                <p className="text-[11px] text-stone-400">
                  File video tidak dapat diputar. Pastikan file tersedia di folder public/videos/carbohydrate/. Tidak ada konten animasi buatan atau pengganti yang ditampilkan.
                </p>
              </div>
              <button
                onClick={() => {
                  setVideoError(null);
                  setIsVideoLoading(true);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Muat Ulang Video</span>
              </button>
            </div>
          )}
        </div>

        {/* Toolbar Aksi Tambahan: Tombol Putar Ulang, Layar Penuh, Kecepatan, & Info File */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 bg-stone-900 text-white px-4 py-2.5 rounded-xl border border-stone-800 text-xs">
          {/* Tombol Putar Ulang dan Layar Penuh */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-medium transition-colors cursor-pointer border border-stone-700"
              aria-label="Putar Ulang Video dari Awal"
              title="Putar Ulang Video dari Awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Putar Ulang</span>
            </button>

            <button
              onClick={handleToggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors cursor-pointer border border-stone-700"
              aria-label="Mode Layar Penuh"
              title="Layar Penuh"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Keluar Layar Penuh</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Layar Penuh</span>
                </>
              )}
            </button>
          </div>

          {/* Kecepatan Putar dan Info Berkas Video Aktif */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-stone-400 text-[11px]">Kecepatan:</span>
              {[0.5, 1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    playbackRate === spd
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                  aria-label={`Kecepatan ${spd}x`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-stone-700 text-[11px] font-mono text-stone-400">
              <span className="text-stone-500">Berkas:</span>
              <span className="text-emerald-400">{currentStage.slug}</span>
            </div>
          </div>
        </div>

        {/* 5. Panel Ringkasan Tahap di Bawah Video */}
        <div className="bg-white rounded-2xl border border-[#E5E2D9] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#3E3E3E] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              Ringkasan Tahap {currentStage.step}: {currentStage.title}
            </h3>
            <span className="text-[11px] font-semibold text-[#706B5C] bg-[#FAF8F5] px-2.5 py-0.5 rounded-lg border border-[#E5E2D9]">
              Durasi: {currentStage.durationLabel}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#5D574B] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5E2D9]/80">
            {currentStage.summary}
          </p>

          {/* Transkrip Narasi Ilmiah (Opsional Terbuka/Tertutup) */}
          {showTranscript && (
            <div className="pt-2 border-t border-[#E5E2D9] space-y-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Transkrip Narasi Biokimia Lengkap:
              </span>
              <p className="text-xs text-[#706B5C] leading-relaxed bg-amber-50/40 p-3 rounded-xl border border-amber-200/60 font-sans">
                {currentStage.transcript}
              </p>
            </div>
          )}
        </div>

        {/* 6. Cek Pemahaman Antartahap (Muncul Setelah Video Selesai / Dapat Dicoba) */}
        {(showQuiz || isCurrentQuizPassed) && (
          <div className="bg-white rounded-2xl border-2 border-amber-300/80 p-5 shadow-xs space-y-4 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Cek Pemahaman Tahap {currentStage.step}
                  </h4>
                  <p className="text-xs text-[#706B5C]">
                    Jawab pertanyaan singkat ini untuk membuka atau memantapkan tahap berikutnya.
                  </p>
                </div>
              </div>

              {isCurrentQuizPassed && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  Terverifikasi
                </span>
              )}
            </div>

            {/* Pertanyaan */}
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-[#3E3E3E]">
                {currentStage.question.prompt}
              </p>

              {/* Pilihan Jawaban A, B, C, D */}
              <div className="space-y-2">
                {currentStage.question.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                  const isSelected = selectedAnswer === optIdx;
                  const isCorrect = optIdx === currentStage.question.correctIndex;

                  let optClass = 'bg-white border-[#E5E2D9] text-[#706B5C] hover:bg-stone-50';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-50 border-rose-500 text-rose-900';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-amber-50 border-amber-500 text-amber-900 font-semibold ring-1 ring-amber-500';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        setSelectedAnswer(optIdx);
                        setQuizSubmitted(false);
                      }}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${optClass}`}
                      aria-label={`Pilihan ${letter}: ${opt}`}
                    >
                      <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] bg-stone-100 text-[#3E3E3E] shrink-0">
                        {letter}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Tombol Periksa Jawaban */}
              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={selectedAnswer === null}
                  className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Periksa Jawaban
                </button>
              ) : (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    selectedAnswer === currentStage.question.correctIndex
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border border-rose-200 text-rose-900'
                  }`}
                >
                  <p className="font-bold mb-0.5">
                    {selectedAnswer === currentStage.question.correctIndex ? '✓ Jawaban Tepat!' : '✕ Belum Tepat'}
                  </p>
                  <p>
                    {selectedAnswer === currentStage.question.correctIndex
                      ? currentStage.question.explanationCorrect
                      : currentStage.question.explanationWrong}
                  </p>
                  {selectedAnswer !== currentStage.question.correctIndex && (
                    <button
                      onClick={() => setQuizSubmitted(false)}
                      className="mt-2 text-[11px] font-bold text-rose-800 underline cursor-pointer"
                    >
                      Coba jawab kembali
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 7. Bar Navigasi Bawah: [<- Tahap Sebelumnya] [Ulangi Video] [Tahap Berikutnya ->] */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5E2D9]">
          
          {/* Kiri: Tahap Sebelumnya */}
          <div>
            {activeStep > 1 ? (
              <button
                onClick={handlePrevStage}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
                aria-label="Kembali ke tahap sebelumnya"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tahap Sebelumnya ({DIGESTION_VIDEO_STAGES[activeStep - 2]?.organShort})</span>
              </button>
            ) : (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Beranda Karbohidrat</span>
              </button>
            )}
          </div>

          {/* Tengah: Ulangi Video Aktif */}
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
            aria-label="Ulangi pemutaran video aktif"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Video</span>
          </button>

          {/* Kanan: Tahap Berikutnya atau Lanjut ke Pemecahan Oksidatif Glukosa */}
          <div>
            {activeStep < 3 ? (
              <button
                onClick={handleNextStage}
                disabled={!canGoNext}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                  canGoNext
                    ? 'bg-amber-700 hover:bg-amber-800 text-white'
                    : 'bg-stone-200 text-stone-500 border border-stone-300 opacity-60 cursor-not-allowed'
                }`}
                title={canGoNext ? 'Lanjut ke tahap berikutnya' : 'Selesaikan video dan kuis tahap ini terlebih dahulu'}
                aria-label={`Lanjut ke Tahap ${activeStep + 1}`}
              >
                <span>Lanjut ke Tahap {activeStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onCompleteAndNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                aria-label="Lanjutkan ke Pemecahan Oksidatif Glukosa Menjadi ATP"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Lanjutkan ke Pemecahan Oksidatif Glukosa (ATP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
