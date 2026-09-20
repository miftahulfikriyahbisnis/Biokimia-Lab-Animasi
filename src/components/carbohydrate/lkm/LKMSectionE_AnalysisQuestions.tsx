/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Layers, 
  Lightbulb, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { InteractiveMetabolicIntegrationSim } from './interactive/InteractiveMetabolicIntegrationSim';

interface LKMSectionEAnalysisQuestionsProps {
  onBack: () => void;
  onNext: () => void;
}

interface AnalysisQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  deepExplanation: string;
}

const ANALYSIS_QUESTIONS: AnalysisQuestion[] = [
  {
    id: 1,
    question: '1. Mengapa glukosa harus diubah terlebih dahulu menjadi UDP-glukosa sebelum digabungkan ke rantai glikogen?',
    context: 'Tinjau dari aspek termodinamika energi bebas biosintesis (endergonik vs eksergonik).',
    options: [
      {
        id: 'A',
        text: 'Karena pembentukan ikatan glikosidik secara langsung dari glukosa bebas bersifat endergonik (ΔG > 0), sehingga membutuhkan donor glukosil teraktivasi berenergi tinggi (UDP-glukosa) yang digerakkan oleh hidrolisis pirofosfat (PPi → 2 Pi, ΔG°′ ≈ -19.2 kJ/mol).',
        isCorrect: true,
        feedback: 'Tepat sekali! Sintesis polimer membutuhkan tarikan termodinamika. Pelepasan dan hidrolisis PPi membuat reaksi biosintesis yang endergonik menjadi berlangsung spontan ke arah pembentukan glikogen.'
      },
      {
        id: 'B',
        text: 'Karena glukosa bebas tidak bisa larut di dalam sitoplasma sel.',
        isCorrect: false,
        feedback: 'Kurang tepat. Glukosa bebas sangat mudah larut dalam air. Alasan utamanya adalah termodinamika pembentukan ikatan glikosidik.'
      },
      {
        id: 'C',
        text: 'Agar molekul glukosa dapat keluar menembus membran sel menuju mitokondria.',
        isCorrect: false,
        feedback: 'Keliru. Glikogenesis berlangsung di sitosol dan glukosa tidak perlu dibawa ke mitokondria untuk sintesis glikogen.'
      }
    ],
    deepExplanation: 'Pembentukan ikatan glikosidik antara dua molekul gula sederhana memerlukan energi bebas (bersifat endergonik). Gugus UDP pada UDP-glukosa bertindak sebagai gugus pergi (leaving group) yang sangat baik. Reaksi ini digerakkan ke arah sintesis secara ireversibel oleh hidrolisis pirofosfat anorganik (PPi) oleh enzim pirofosfatase menjadi dua molekul ortofosfat (Pi).'
  },
  {
    id: 2,
    question: '2. Mengapa struktur glikogen memiliki begitu banyak percabangan α(1→6) dibandingkan rantai lurus murni amilosa?',
    context: 'Tinjau dari aspek kelarutan sitosol dan kecepatan mobilisasi energi seluler.',
    options: [
      {
        id: 'A',
        text: 'Agar glikogen tidak dapat dihidrolisis sama sekali oleh enzim pencernaan.',
        isCorrect: false,
        feedback: 'Keliru. Justru glikogen dirancang untuk dapat dipecah secara kilat saat tubuh memerlukan energi.'
      },
      {
        id: 'B',
        text: 'Meningkatkan kelarutan makromolekul dalam sitosol serta melipatgandakan jumlah ujung nonreduksi secara eksponensial, sehingga sintase dan fosforilase dapat bekerja simultan di ribuan titik sekaligus.',
        isCorrect: true,
        feedback: 'Luar biasa tepat! Struktur percabangan rapat menghasilkan bentuk sferis kompak berdensitas tinggi, mencegah pembentukan agregat kristal tak larut, dan menyediakan ribuan situs aktif bagi enzim glikogen fosforilase.'
      },
      {
        id: 'C',
        text: 'Menyebabkan glikogen berubah menjadi senyawa lipid netral.',
        isCorrect: false,
        feedback: 'Salah. Glikogen adalah karbohidrat murni, bukan lipid.'
      }
    ],
    deepExplanation: 'Rantai linear panjang tanpa cabang (seperti amilosa) cenderung mengkristal dan mengendap karena ikatan hidrogen intermolekuler. Percabangan α(1→6) setiap 8–12 residu menciptakan struktur bola kompak larut air dengan ribuan ujung nonreduksi. Hal ini memungkinkan pemecahan cepat menjadi G1P saat otot berkontraksi atau saat darah hipoglikemia.'
  },
  {
    id: 3,
    question: '3. Apa perbedaan fisiologis mendasar antara fungsi cadangan glikogen hati dan glikogen otot rangka?',
    context: 'Tinjau keberadaan enzim Glukosa-6-fosfatase dan tujuan akhir produksi ATP/glukosa.',
    options: [
      {
        id: 'A',
        text: 'Glikogen hati mempertahankan glukosa darah sistemik karena memiliki enzim Glukosa-6-fosfatase, sedangkan glikogen otot khusus untuk bahan bakar glikolisis kontraksi otot sendiri karena tidak memiliki enzim tersebut.',
        isCorrect: true,
        feedback: 'Tepat sekali! Ketiadaan Glukosa-6-fosfatase di otot memerangkap semua glukosa terfosforilasi (G6P) di dalam serat otot demi regenerasi ATP kontraksi.'
      },
      {
        id: 'B',
        text: 'Glikogen otot dapat melepaskan glukosa bebas ke otak saat tidur, sedangkan hati tidak.',
        isCorrect: false,
        feedback: 'Keliru. Otot rangka tidak pernah menyumbang glukosa bebas ke sirkulasi sistemik bagi organ lain.'
      },
      {
        id: 'C',
        text: 'Glikogen hati hanya berupa lipid, sedangkan glikogen otot adalah protein.',
        isCorrect: false,
        feedback: 'Salah konsep. Keduanya adalah polisakarida glukosa murni, perbedaannya terletak pada ekspresi enzim pengatur defosforilasi.'
      }
    ],
    deepExplanation: 'Hati mengekspresikan Glukosa-6-fosfatase di membran retikulum endoplasma, memungkinkan konversi G6P menjadi glukosa bebas yang ditranspor keluar via GLUT2 menuju sirkulasi sistemik. Otot rangka tidak memiliki enzim ini; produk fosforolisis glikogen otot (G1P → G6P) langsung dialirkan ke glikolisis internal untuk menyuplai ATP kontraksi serat otot itu sendiri.'
  },
  {
    id: 4,
    question: '4. Apa yang diperkirakan terjadi pada pasien dengan defisiensi aktivitas Branching Enzyme (Penyakit Andersen / GSD Tipe IV)?',
    context: 'Tinjau struktur rantai glikogen yang terbentuk dan dampaknya pada hepar.',
    options: [
      {
        id: 'A',
        text: 'Glikogen yang terbentuk memiliki cabang terlalu banyak dan sangat mudah larut.',
        isCorrect: false,
        feedback: 'Kebalikannya! Ketiadaan branching enzyme membuat pembentukan titik cabang terhambat total.'
      },
      {
        id: 'B',
        text: 'Terbentuk polimer glikogen abnormal berantai lurus panjang dengan sedikit cabang (menyerupai amilosa / polyglucosan) yang kelarutannya sangat rendah, memicu endapan presipitasi, reaksi benda asing, dan sirosis hati.',
        isCorrect: true,
        feedback: 'Tepat sekali secara patobiokimiawi! Struktur mirip amilopectin abnormal ini tidak larut, memicu respons imun, kerusakan jaringan hepar berat (sirosis hepatik dini), dan kematian jika tidak ditangani.'
      },
      {
        id: 'C',
        text: 'Tidak ada glikogen sama sekali yang disintesis dalam tubuh.',
        isCorrect: false,
        feedback: 'Kurang tepat. Rantai glukosa tetap disintesis oleh glikogen sintase, namun gagal membentuk percabangan normal.'
      }
    ],
    deepExplanation: 'Defisiensi branching enzyme (amilo-α(1→4)→α(1→6)-transglukosilase) menyebabkan rantai lurus memanjang tanpa cabang. Polimer abnormal ini (disebut badan poliglukosan atau amilopektin-like) memiliki kelarutan sangat buruk, mengendap di hepatosit dan kardiomiosit, serta memicu fibrosis progresif dan gagal hati.'
  },
  {
    id: 5,
    question: '5. Mengapa reaksi fosforilasi glukosa menjadi Glukosa-6-fosfat (G6P) TIDAK hanya dianggap sebagai tahapan glikogenesis semata?',
    context: 'Tinjau peran Glukosa-6-Fosfat sebagai "Central Metabolic Junction" (titik persimpangan).',
    options: [
      {
        id: 'A',
        text: 'Karena G6P adalah titik persimpangan metabolik sentral yang dapat dialirkan ke glikolisis (energi ATP), jalur pentosa fosfat (NADPH & ribosa-5-P), atau glikogenesis (penyimpanan glikogen) tergantung status energi dan sinyal hormon sel.',
        isCorrect: true,
        feedback: 'Sangat tepat! G6P bukan milik eksklusif glikogenesis. Molekul ini merupakan "stasiun transit" utama metabolisme karbohidrat seluler.'
      },
      {
        id: 'B',
        text: 'Karena reaksi ini hanya terjadi pada bakteri dan ragi, bukan pada manusia.',
        isCorrect: false,
        feedback: 'Keliru. Reaksi heksokinase/glukokinase terjadi universal pada seluruh sel mamalia.'
      },
      {
        id: 'C',
        text: 'Karena G6P selalu langsung diubah menjadi asam laktat tanpa perantara.',
        isCorrect: false,
        feedback: 'Salah. Pembentukan laktat membutuhkan seluruh rangkaian 10 tahap glikolisis dari piruvat.'
      }
    ],
    deepExplanation: 'Glukosa-6-fosfat (G6P) berada di persimpangan tiga jalur utama: (1) Katabolisme glikolitik untuk pembentukan ATP dan piruvat; (2) Jalur Pentosa Fosfat (PPP) untuk menghasilkan NADPH (pereduksi biosintesis lipid) dan ribosa-5-fosfat (nukleotida DNA/RNA); serta (3) Glikogenesis untuk penyimpanan energi saat kondisi kenyang (insulin tinggi).'
  }
];

export const LKMSectionE_AnalysisQuestions: React.FC<LKMSectionEAnalysisQuestionsProps> = ({
  onBack,
  onNext,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [questionStates, setQuestionStates] = useState<Record<number, {
    checked: boolean;
    isCorrect: boolean;
    feedback: string;
    showDeep: boolean;
  }>>({});

  const handleSelectOption = (questionId: number, optionId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
    // Reset status periksa jika jawaban diubah
    if (questionStates[questionId]?.checked) {
      setQuestionStates(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          checked: false,
          isCorrect: false
        }
      }));
    }
  };

  const handleCheckQuestion = (q: AnalysisQuestion) => {
    const selectedOptId = selectedAnswers[q.id];
    if (!selectedOptId) return;

    const opt = q.options.find(o => o.id === selectedOptId);
    if (!opt) return;

    setQuestionStates(prev => ({
      ...prev,
      [q.id]: {
        checked: true,
        isCorrect: opt.isCorrect,
        feedback: opt.feedback,
        showDeep: opt.isCorrect
      }
    }));
  };

  const handleToggleDeep = (qId: number) => {
    setQuestionStates(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        showDeep: !prev[qId]?.showDeep
      }
    }));
  };

  const allAnswered = ANALYSIS_QUESTIONS.every(q => Boolean(selectedAnswers[q.id]));
  const correctCount = Object.values(questionStates).filter(s => s.isCorrect).length;

  return (
    <div className="space-y-6" id="lkm-section-e">
      {/* Header Bagian E */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-amber-700" />
          <span>Bagian E • Pertanyaan Analisis & Sintesis Kritis</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Pertanyaan Analisis Kelompok: Menghubungkan Reaksi Kimia dengan Logika Fisiologis
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Diskusikan 5 pertanyaan analisis terarah berikut bersama kelompok Anda. Pilih opsi jawaban paling komprehensif berdasarkan pemahaman termodinamika dan logika biokimiawi yang telah Anda telaah.
        </p>
      </div>

      {/* Progress Bar Analisis */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 shadow-2xs flex items-center justify-between text-xs">
        <span className="font-bold text-stone-700">Skor Terverifikasi Analisis Kelompok:</span>
        <span className="font-mono font-bold text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300">
          {correctCount} dari {ANALYSIS_QUESTIONS.length} Soal Terjawab Benar
        </span>
      </div>

      {/* Panel Simulasi Integrasi Metabolisme & Prediksi Jalur Dominan */}
      <InteractiveMetabolicIntegrationSim />

      {/* Daftar 5 Soal Analisis */}
      <div className="space-y-5">
        {ANALYSIS_QUESTIONS.map((q) => {
          const userChoice = selectedAnswers[q.id];
          const state = questionStates[q.id];

          return (
            <div 
              key={q.id} 
              className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4"
              id={`analysis-card-${q.id}`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                  {q.context}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Opsi Pilihan */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = userChoice === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full p-3 rounded-xl border text-left text-xs leading-relaxed transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-100/70 border-amber-600 text-stone-900 font-semibold ring-1 ring-amber-500'
                          : 'bg-[#FAF8F5] border-[#E5E2D9] text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold border transition-colors ${
                        isSelected ? 'bg-amber-600 text-white border-amber-600' : 'bg-white border-stone-300 text-stone-600'
                      }`}>
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bar Kontrol Periksa Soal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCheckQuestion(q)}
                  disabled={!userChoice}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-amber-200 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Periksa Jawaban Soal {q.id}</span>
                </button>

                {state?.checked && (
                  <button
                    type="button"
                    onClick={() => handleToggleDeep(q.id)}
                    className="inline-flex items-center gap-1 text-xs text-blue-800 hover:text-blue-950 font-bold cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{state.showDeep ? 'Tutup Penjelasan Ilmiah' : 'Lihat Penjelasan Biokimiawi'}</span>
                  </button>
                )}
              </div>

              {/* Feedback Umpan Balik */}
              {state?.checked && (
                <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 animate-fadeIn ${
                  state.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-red-50 border-red-300 text-red-950'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold">
                    {state.isCorrect ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Analisis Tepat!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>Jawaban Kurang Tepat:</span>
                      </>
                    )}
                  </div>
                  <p className="text-stone-800 leading-relaxed text-[11.5px]">{state.feedback}</p>
                </div>
              )}

              {/* Penjelasan Mendalam */}
              {state?.showDeep && (
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs space-y-1 animate-fadeIn">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-blue-900 block">
                    Penjelasan Sains Mendalam:
                  </span>
                  <p className="text-stone-700 leading-relaxed text-[11.5px]">
                    {q.deepExplanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigasi Bawah */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-bold text-stone-700 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian D: Representasi 2D/3D</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!allAnswered}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-f"
        >
          <span>Lanjut ke Bagian F: Refleksi & Kesimpulan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
