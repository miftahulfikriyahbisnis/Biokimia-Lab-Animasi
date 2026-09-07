/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Trophy
} from 'lucide-react';

interface TryItYourselfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStage: (stage: 1 | 2 | 3 | 4 | 5 | 6 | 7) => void;
}

interface ChallengeStep {
  stepNumber: number;
  question: string;
  targetConcept: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  correspondingStage: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

const CHALLENGE_STEPS: ChallengeStep[] = [
  {
    stepNumber: 1,
    question: 'Kadar glukosa darah sedang tinggi setelah makan. Molekul apa yang harus Anda pilih dari sirkulasi darah untuk memulai respons penurunan glukosa darah?',
    targetConcept: 'Pengenalan Insulin sebagai Ligan Sinyal',
    options: [
      {
        id: 'A',
        label: 'Pilih Hormon Insulin',
        isCorrect: true,
        feedback: 'Tepat! Insulin disekresikan oleh sel beta pankreas sebagai respons terhadap hiperglikemia untuk memberi instruksi ke jaringan target.'
      },
      {
        id: 'B',
        label: 'Pindahkan Glukosa langsung menembus membran tanpa hormon',
        isCorrect: false,
        feedback: 'Kurang tepat. Membran sel otot/lemak impermeabel terhadap glukosa polar dan membutuhkan transporter GLUT4 yang dipicu oleh insulin.'
      },
      {
        id: 'C',
        label: 'Langsung pecahkan vesikel GLUT4 di dalam sitosol',
        isCorrect: false,
        feedback: 'Belum bisa. Vesikel GLUT4 tetap terkunci di dalam sitoplasma sampai ada sinyal ekstraseluler dari insulin.'
      }
    ],
    correspondingStage: 2
  },
  {
    stepNumber: 2,
    question: 'Ke manakah Anda harus mengarahkan hormon insulin tersebut?',
    targetConcept: 'Pengikatan Reseptor Spesifik di Permukaan Sel',
    options: [
      {
        id: 'A',
        label: 'Arahkan insulin masuk ke dalam saluran GLUT4',
        isCorrect: false,
        feedback: 'Insulin tidak masuk melalui GLUT4! Insulin adalah hormon peptida yang bekerja dari luar sel dan berikatan dengan reseptor permukaan membran.'
      },
      {
        id: 'B',
        label: 'Arahkan insulin ke celah pengikatan Reseptor Insulin di permukaan luar sel',
        isCorrect: true,
        feedback: 'Tepat sekali! Insulin berikatan dengan subunit alfa ekstraseluler reseptor tanpa pernah masuk ke dalam sitosol sel.'
      },
      {
        id: 'C',
        label: 'Arahkan insulin langsung ke nukleus sel otot',
        isCorrect: false,
        feedback: 'Kurang tepat. Insulin adalah hormon hidrofilik dengan reseptor membran, bukan hormon steroid yang masuk ke dalam nukleus.'
      }
    ],
    correspondingStage: 3
  },
  {
    stepNumber: 3,
    question: 'Setelah insulin terikat kokoh di reseptor, apa langkah biokimiawi berikutnya yang harus terjadi agar perintah diteruskan?',
    targetConcept: 'Aktivasi Tirosin Kinase & Sinyal Intraseluler',
    options: [
      {
        id: 'A',
        label: 'Aktifkan autofosforilasi tirosin kinase pada subunit beta reseptor di dalam sitosol',
        isCorrect: true,
        feedback: 'Luar biasa! Reseptor mengaktifkan tirosin kinase intraseluler dan melakukan autofosforilasi dengan ATP untuk memancarkan kaskade sinyal.'
      },
      {
        id: 'B',
        label: 'Biarkan reseptor terlepas kembali tanpa mengirim sinyal apa pun',
        isCorrect: false,
        feedback: 'Kurang tepat. Tanpa aktivasi kaskade sinyal intraseluler, sel tidak akan merespons kehadiran insulin.'
      }
    ],
    correspondingStage: 4
  },
  {
    stepNumber: 4,
    question: 'Kaskade sinyal intraseluler telah memancar ke dalam sitoplasma. Apa yang harus Anda instruksikan pada vesikel penyimpan GLUT4 (GSVs)?',
    targetConcept: 'Translokasi Vesikel GLUT4',
    options: [
      {
        id: 'A',
        label: 'Gerakkan vesikel GLUT4 dari kedalaman sitoplasma menuju ke membran sel plasma',
        isCorrect: true,
        feedback: 'Sangat tepat! Sinyal insulin memicu translokasi vesikel GLUT4 di sepanjang sitoskeleton menuju permukaan membran sel.'
      },
      {
        id: 'B',
        label: 'Simpan vesikel GLUT4 lebih dalam lagi ke dekat mitokondria',
        isCorrect: false,
        feedback: 'Kurang tepat. Jika vesikel dijauhkan, glukosa di luar sel tidak akan bisa masuk ke dalam sel.'
      }
    ],
    correspondingStage: 5
  },
  {
    stepNumber: 5,
    question: 'Vesikel GLUT4 telah tiba di membran sel. Apa yang harus dilakukan selanjutnya?',
    targetConcept: 'Fusi Membran & Integrasi GLUT4',
    options: [
      {
        id: 'A',
        label: 'Fusi membran vesikel dengan membran plasma sehingga protein GLUT4 terpasang sebagai saluran terbuka',
        isCorrect: true,
        feedback: 'Tepat! Fusi membran menempatkan protein transporter GLUT4 pada permukaan sel, membentuk gerbang difusi untuk glukosa.'
      },
      {
        id: 'B',
        label: 'Biarkan vesikel memantul kembali ke sitosol tanpa menyatu',
        isCorrect: false,
        feedback: 'Kurang tepat. Vesikel harus berfusi dengan bilayer lipid agar transporter GLUT4 dapat berfungsi sebagai kanal masuk.'
      }
    ],
    correspondingStage: 6
  },
  {
    stepNumber: 6,
    question: 'GLUT4 kini telah terpasang rapi di membran sel otot/lemak. Bagaimana aliran akhir yang menurunkan glukosa darah?',
    targetConcept: 'Difusi Terfasilitasi Glukosa & Efek Homeostasis',
    options: [
      {
        id: 'A',
        label: 'Alirkan partikel glukosa dari luar sel masuk melalui transporter GLUT4 ke sitosol',
        isCorrect: true,
        feedback: 'Sempurna! Glukosa masuk ke dalam sel melalui difusi terfasilitasi. Penyerapan glukosa ini secara efektif menurunkan kadar glukosa dalam darah!'
      },
      {
        id: 'B',
        label: 'Keluarkan glukosa dari dalam sel kembali ke aliran darah',
        isCorrect: false,
        feedback: 'Kurang tepat. Gradien konsentrasi pascamakan dan aksi GLUT4 mendorong glukosa masuk ke dalam sel untuk disimpan atau digunakan.'
      }
    ],
    correspondingStage: 7
  }
];

export const TryItYourselfModal: React.FC<TryItYourselfModalProps> = ({
  isOpen,
  onClose,
  onJumpToStage
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const step = CHALLENGE_STEPS[currentStepIdx];
  const selectedOpt = step?.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const handleNextStep = () => {
    if (currentStepIdx < CHALLENGE_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      setSelectedOptionId(null);
      // Sinkronkan tahap pada kanvas 3D di belakang modal
      onJumpToStage(CHALLENGE_STEPS[nextIdx].correspondingStage);
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetChallenge = () => {
    setCurrentStepIdx(0);
    setSelectedOptionId(null);
    setIsCompleted(false);
    onJumpToStage(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
          title="Tutup Tantangan"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tantangan */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-amber-100 text-amber-800">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3E3E3E]">
              Tantangan Interaktif: Coba Sendiri
            </h3>
            <p className="text-xs text-[#706B5C]">
              Latih pemahaman mekanisme aksi insulin langkah demi langkah
            </p>
          </div>
        </div>

        {!isCompleted ? (
          <>
            {/* Progress Bar Langkah */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-[#6B705C]">
                <span>Langkah {step.stepNumber} dari 6</span>
                <span className="text-[#A5A58D] font-normal">{step.targetConcept}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E5E2D9] overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(step.stepNumber / 6) * 100}%` }}
                />
              </div>
            </div>

            {/* Pertanyaan Kasus */}
            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Skenario Biologis:
              </span>
              <p className="font-serif font-semibold text-sm sm:text-base text-[#3E3E3E] leading-relaxed">
                {step.question}
              </p>
            </div>

            {/* Pilihan Aksi Interaktif */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-[#706B5C]">Pilih Aksi Anda:</span>
              <div className="space-y-2">
                {step.options.map((opt) => {
                  const isChosen = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                        isChosen
                          ? opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                            : 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                          : 'bg-white border-[#E5E2D9] text-[#3E3E3E] hover:bg-[#F5F2EA]'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isChosen
                            ? opt.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-500 text-white'
                            : 'bg-[#F5F2EA] text-[#706B5C]'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="leading-snug">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback Edukatif */}
            {selectedOpt && (
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 flex items-start gap-2.5 ${
                  selectedOpt.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                {selectedOpt.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold mb-1">
                    {selectedOpt.isCorrect ? 'Langkah Benar!' : 'Perlu Diingat:'}
                  </div>
                  <p>{selectedOpt.feedback}</p>
                </div>
              </div>
            )}

            {/* Tombol Lanjut */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E2D9]">
              {selectedOpt?.isCorrect && (
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585C4C] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  <span>{currentStepIdx < 5 ? 'Lanjut ke Langkah Berikutnya' : 'Lihat Rangkuman Pemahaman'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Layar Berhasil Selesai */
          <div className="text-center space-y-5 py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif font-bold text-xl text-[#3E3E3E]">
                Selamat! Anda Telah Menguasai Mekanisme Kerja Insulin
              </h4>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Berikut 4 prinsip utama biokimia yang berhasil Anda buktikan:
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] text-left space-y-2.5 text-xs text-[#3E3E3E]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                <span><strong>1. Insulin tidak membawa glukosa</strong> secara langsung ke dalam sel.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                <span><strong>2. Insulin berikatan dengan reseptor membran</strong> dan mengaktifkan sinyal intraseluler.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                <span><strong>3. Sinyal insulin memicu translokasi vesikel GLUT4</strong> untuk berfusi dengan membran.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                <span><strong>4. Glukosa masuk melalui porus GLUT4</strong> sehingga kadar glukosa darah menurun normal.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetChallenge}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#706B5C] text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Latihan</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585C4C] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Kembali ke Simulasi 3D
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
