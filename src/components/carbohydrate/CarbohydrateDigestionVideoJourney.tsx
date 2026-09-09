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
    slug: 'mulut',
    title: 'Mulut dan Pencernaan Awal Pati',
    organShort: '1. Mulut',
    subtitle: 'Pengunyahan Mekanik & Hidrolisis Enzim Amilase Saliva (Ptialin)',
    videoSrc: '/videos/carbohydrate/01-mulut.mp4',
    vttSrc: '/videos/carbohydrate/01-mulut.vtt',
    durationLabel: '00:10',
    summary:
      'Nasi dikunyah menjadi partikel yang lebih kecil dan bercampur dengan saliva hingga membentuk bolus. Amilase saliva mulai menghidrolisis sebagian ikatan α-1,4 pada pati, menghasilkan maltosa, maltotriosa, dan dekstrin. Pada tahap ini, pati belum seluruhnya menjadi glukosa.',
    transcript:
      'Pada tahap awal pencernaan karbohidrat, suapan nasi dimasukkan ke dalam rongga mulut. Melalui proses mastikasi (pengunyahan oleh gigi) dan pergerakan lidah, butiran nasi dipecah menjadi partikel yang jauh lebih kecil secara fisik. Kelenjar saliva (parotis, submandibularis, dan sublingualis) menyekresikan saliva yang mengandung musin untuk melumasi makanan menjadi gumpalan licin yang disebut bolus. Bersamaan dengan itu, enzim amilase saliva (ptialin) mulai bekerja menghidrolisis ikatan glikosida α-1,4 internal pada polimer amilosa dan amilopektin. Hasil hidrolisis awal ini adalah disakarida maltosa, trisakarida maltotriosa, serta fragmen oligosakarida bercabang yang disebut dekstrin. Karena makanan berada di mulut dalam waktu singkat, hanya sebagian kecil pati (~5%) yang terhidrolisis di sini, dan belum ada glukosa bebas murni yang diserap.',
    question: {
      prompt: 'Apa hasil utama kerja amilase saliva pada pati?',
      options: [
        'Seluruh pati langsung menjadi glukosa',
        'Maltosa, maltotriosa, dan dekstrin',
        'Piruvat dan ATP',
        'Asetil-KoA dan karbon dioksida'
      ],
      correctIndex: 1,
      explanationCorrect:
        'Benar. Amilase saliva memulai pemecahan pati, tetapi belum menyelesaikannya menjadi glukosa.',
      explanationWrong:
        'Kurang tepat. Amilase saliva hanya memutus sebagian ikatan α-1,4 internal menghasilkan maltosa, maltotriosa, dan dekstrin, bukan seluruhnya glukosa.'
    }
  },
  {
    step: 2,
    slug: 'esofagus-lambung',
    title: 'Esofagus, Lambung, dan Duodenum',
    organShort: '2. Esofagus–Lambung',
    subtitle: 'Gelombang Peristaltik, Inaktivasi Asam Lambung (HCl), & Sekresi Duodenum',
    videoSrc: '/videos/carbohydrate/02-esofagus-lambung.mp4',
    vttSrc: '/videos/carbohydrate/02-esofagus-lambung.vtt',
    durationLabel: '00:10',
    summary:
      'Bolus didorong melalui esofagus oleh gerakan peristaltik. Di lambung, bolus diaduk dan bercampur dengan cairan lambung hingga menjadi kimus. Kondisi asam menginaktivasi amilase saliva. Kimus kemudian masuk ke duodenum dan bercampur dengan amilase pankreas.',
    transcript:
      'Setelah terbentuk di rongga mulut, bolus didorong ke posterior oleh lidah menuju faring dan masuk ke esofagus. Refleks menelan menutup epiglotis untuk mencegah bolus masuk ke saluran napas. Melalui kontraksi sirkuler dan longitudinal terkoordinasi (gelombang peristaltik), bolus ditranspor menuruni esofagus menuju kardia lambung melewati sfingter esofagus bawah (LES). Di lambung, kontraksi otot lambung mengaduk bolus dengan getah lambung (asam klorida/HCl dan enzim pepsin) membentuk bubur semi-cair homogen yang disebut kimus (chyme). Tingkat keasaman yang sangat tinggi (pH 1.5–2.0) di lambung mendenaturasi struktur amilase saliva sehingga aktivitas pemecahan pati terhenti sementara. Selanjutnya, sfingter pilorus membuka sedikit demi sedikit untuk menyemprotkan kimus ke dalam duodenum. Di duodenum, cairan bikarbonat pankreas menetralkan keasaman hingga pH ~7.8 agar amilase pankreas dapat aktif optimal.',
    question: {
      prompt: 'Mengapa aktivitas amilase saliva berhenti di lambung?',
      options: [
        'Karena tidak ada pati di lambung',
        'Karena lambung tidak melakukan gerakan',
        'Karena lingkungan lambung bersifat asam',
        'Karena glukosa telah masuk darah'
      ],
      correctIndex: 2,
      explanationCorrect:
        'Benar. Kondisi asam lambung menginaktivasi amilase saliva.',
      explanationWrong:
        'Kurang tepat. Getah lambung mengandung asam klorida (HCl) ber-pH sangat rendah (1.5–2.0) yang mendenaturasi struktur tersier protein amilase saliva.'
    }
  },
  {
    step: 3,
    slug: 'usus-glukosa-darah',
    title: 'Pati Menjadi Glukosa dan Masuk ke Darah',
    organShort: '3. Usus–Darah',
    subtitle: 'Aksi Amilase Pankreas, Enzim Brush Border Usus, & Absorpsi Vena Porta',
    videoSrc: '/videos/carbohydrate/03-usus-glukosa-darah.mp4',
    vttSrc: '/videos/carbohydrate/03-usus-glukosa-darah.vtt',
    durationLabel: '00:10',
    summary:
      'Amilase pankreas memutus ikatan α-1,4 pada pati sehingga terbentuk maltosa, maltotriosa, oligosakarida, dan α-limit dextrin. Enzim pada permukaan usus halus kemudian menyelesaikan hidrolisis menjadi monosakarida, terutama glukosa. Glukosa selanjutnya diserap dan masuk ke aliran darah.',
    transcript:
      'Di dalam lumen duodenum dan jejunum usus halus, amilase pankreas melanjutkan hidrolisis ikatan α-1,4 internal pada molekul pati. Hasilnya adalah maltosa, maltotriosa, dan α-limit dekstrin (karena amilase tidak dapat memutus titik cabang α-1,6). Selanjutnya, enzim-enzim pada permukaan membran mikrovili enterosit (brush border enzymes), terutama maltase dan sukrase-isomaltase, menyelesaikan tahap akhir hidrolisis menjadi unit monomer terkecil: monosakarida D-glukosa murni. Glukosa kemudian diserap melintasi membran enterosit melalui transpor aktif sekunder menggunakan kotransporter Na+/glukosa (SGLT1) di sisi luminal, lalu dikeluarkan melalui difusi terfasilitasi via GLUT2 di sisi basolateral menuju kapiler mesenterika darah. Glukosa diangkut oleh aliran darah vena porta hepatika ke hati dan seluruh sel tubuh untuk dioksidasi menghasilkan energi ATP.',
    question: {
      prompt: 'Di manakah pemecahan karbohidrat diselesaikan menjadi monosakarida?',
      options: [
        'Mulut',
        'Esofagus',
        'Lambung',
        'Usus halus'
      ],
      correctIndex: 3,
      explanationCorrect:
        'Benar. Pencernaan pati dilanjutkan dan diselesaikan di usus halus hingga terbentuk monosakarida, terutama glukosa.',
      explanationWrong:
        'Kurang tepat. Enzim brush border (seperti maltase dan sukrase-isomaltase) pada mikrovili usus halus yang menyelesaikan pemecahan akhir menjadi monosakarida glukosa.'
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
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src={currentStage.videoSrc}
            playsInline
            preload="metadata"
            controlsList="nodownload"
            className="w-full h-full object-contain bg-black"
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
              setVideoError(`Video "${currentStage.slug}.mp4" belum dapat diputar atau format tidak didukung.`);
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
            Browser Anda tidak mendukung tag video HTML5.
          </video>

          {/* Overlay Jika Error Video */}
          {videoError && (
            <div className="absolute inset-0 bg-stone-900/90 flex flex-col items-center justify-center p-6 text-center text-white z-20 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-400" />
              <div className="space-y-1 max-w-md">
                <p className="text-sm font-bold text-amber-200">Gagal Memuat Video</p>
                <p className="text-xs text-stone-300">{videoError}</p>
                <p className="text-[11px] text-stone-400">
                  Anda tetap dapat mempelajari materi melalui ringkasan, transkrip narasi ilmiah, dan menjawab cek pemahaman di bawah ini.
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

          {/* Big Center Play Overlay saat Video Sedang Pause (Nonaktif di Layar Sentuh) */}
          {!isPlaying && !videoError && !isVideoLoading && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-600/90 hover:bg-amber-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer z-10"
              aria-label="Putar Video"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}

          {/* Custom Control Bar Bawah */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 flex flex-col gap-2 z-10 transition-opacity">
            
            {/* Scrubber Waktu Slider */}
            <div className="w-full flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={duration || 10}
                step={0.1}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCurrentTime(val);
                  if (videoRef.current) {
                    videoRef.current.currentTime = val;
                  }
                }}
                className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-2 transition-all"
                aria-label="Waktu Pemutaran Video"
              />
            </div>

            {/* Tombol-tombol Kontrol: Putar, Jeda, Ulangi, +/-10s, Volume, Kecepatan, Fullscreen */}
            <div className="flex flex-wrap items-center justify-between text-white text-xs gap-2">
              
              {/* Kiri: Play/Pause, Rewind, Forward, Replay, Time Indicator */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Jeda Video' : 'Putar Video'}
                  title={isPlaying ? 'Jeda (Spasi)' : 'Putar (Spasi)'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={handleReplay}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Ulangi Video dari Awal"
                  title="Ulangi dari Awal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleSeekRelative(-10)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-0.5 text-[11px]"
                  aria-label="Mundur 10 detik"
                  title="Mundur 10 Detik"
                >
                  <Rewind10 className="w-3.5 h-3.5" />
                  <span>-10s</span>
                </button>

                <button
                  onClick={() => handleSeekRelative(10)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-0.5 text-[11px]"
                  aria-label="Maju 10 detik"
                  title="Maju 10 Detik"
                >
                  <span>+10s</span>
                </button>

                <span className="text-[11px] font-mono text-stone-300 ml-1">
                  {Math.floor(currentTime)}s / {Math.floor(duration || 10)}s
                </span>
              </div>

              {/* Kanan: Mute/Volume, Pilihan Kecepatan (0.5x, 1x, 1.5x, 2x), Fullscreen */}
              <div className="flex items-center gap-3">
                
                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleToggleMute}
                    className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Nyalakan Suara (M)' : 'Bisukan Suara (M)'}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-14 sm:w-20 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    aria-label="Pengaturan Volume Suara"
                  />
                </div>

                <div className="w-px h-3.5 bg-stone-700" />

                {/* Kecepatan Putar (0.5x, 1x, 1.5x, 2x) */}
                <div className="flex items-center gap-1">
                  {[0.5, 1, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        playbackRate === spd
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-white/10 text-stone-300 hover:bg-white/20'
                      }`}
                      aria-label={`Kecepatan ${spd} kali`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <div className="w-px h-3.5 bg-stone-700" />

                {/* Layar Penuh */}
                <button
                  onClick={handleToggleFullscreen}
                  className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={isFullscreen ? 'Keluar dari Layar Penuh (F)' : 'Layar Penuh (F)'}
                  title="Layar Penuh (F)"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
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
