/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  BookOpen, 
  Lightbulb, 
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Zap,
  Layers
} from 'lucide-react';
import { InteractiveGlucosePhosphorylation } from './interactive/InteractiveGlucosePhosphorylation';
import { InteractiveG6PtoG1PIsomerization } from './interactive/InteractiveG6PtoG1PIsomerization';
import { InteractiveUDPGLCSynthesis } from './interactive/InteractiveUDPGLCSynthesis';
import { InteractiveGlycogeninPrimer } from './interactive/InteractiveGlycogeninPrimer';
import { InteractiveAlpha14Bond } from './interactive/InteractiveAlpha14Bond';
import { InteractiveAlpha16Branching } from './interactive/InteractiveAlpha16Branching';

interface LKMSectionCGlycogenBuilderProps {
  onBack: () => void;
  onNext: () => void;
}

export interface StageChoice {
  substrate: string;
  enzyme: string;
  product: string;
  energy: string;
  reason: string;
}

interface StageDefinition {
  stepNumber: number;
  title: string;
  equation: string;
  options: {
    substrates: string[];
    enzymes: string[];
    products: string[];
    energies: string[];
    reasons: string[];
  };
  correct: StageChoice;
  explanation: string;
  hint: string;
}

const GLYCOGENESIS_STAGES: StageDefinition[] = [
  {
    stepNumber: 1,
    title: 'Tahap 1: Fosforilasi Glukosa Menjadi Glukosa-6-Fosfat',
    equation: 'Glukosa + ATP⁴⁻ → Glukosa-6-fosfat²⁻ + ADP³⁻ + H⁺',
    options: {
      substrates: [
        'Glukosa bebas + ATP',
        'Glukosa-1-fosfat + ADP',
        'Fruktosa-6-fosfat + ATP'
      ],
      enzymes: [
        'Heksokinase (otot) / Glukokinase (hati)',
        'Fosfoglukomutase',
        'Glukosa-6-fosfatase'
      ],
      products: [
        'Glukosa-6-fosfat (G6P) + ADP + H⁺',
        'Glukosa-1-fosfat (G1P) + Pi',
        'Fruktosa-1,6-bisfosfat + ADP'
      ],
      energies: [
        '1 ATP dikonsumsi (hidrolisis gugus fosforil)',
        'Tidak memerlukan energi',
        '1 UTP dikonsumsi'
      ],
      reasons: [
        'Memerangkap glukosa di dalam sel (karena muatan negatif fosfat) dan membawanya ke titik persimpangan metabolik (G6P dapat ke glikolisis, PPP, atau glikogenesis).',
        'Mengubah glukosa langsung menjadi polimer tanpa zat antara.',
        'Membakar glukosa langsung menjadi karbon dioksida di dalam mitokondria.'
      ]
    },
    correct: {
      substrate: 'Glukosa bebas + ATP',
      enzyme: 'Heksokinase (otot) / Glukokinase (hati)',
      product: 'Glukosa-6-fosfat (G6P) + ADP + H⁺',
      energy: '1 ATP dikonsumsi (hidrolisis gugus fosforil)',
      reason: 'Memerangkap glukosa di dalam sel (karena muatan negatif fosfat) dan membawanya ke titik persimpangan metabolik (G6P dapat ke glikolisis, PPP, atau glikogenesis).'
    },
    hint: 'Perhatikan bagaimana sel mencegah glukosa bocor kembali keluar menembus membran plasma serta peran penting muatan fosfat.',
    explanation: 'Fosforilasi oleh heksokinase/glukokinase membutuhkan 1 ATP. Gugus fosfat bermuatan negatif mencegah G6P berdifusi keluar membran sitoplasma. G6P bukan semata-mata jalur anabolik, melainkan "central junction" yang dapat dialirkan ke glikolisis, PPP, atau glikogenesis sesuai kebutuhan seluler.'
  },
  {
    stepNumber: 2,
    title: 'Tahap 2: Isomerisasi Glukosa-6-Fosfat Menjadi Glukosa-1-Fosfat',
    equation: 'Glukosa-6-fosfat²⁻ ⇌ Glukosa-1-fosfat²⁻',
    options: {
      substrates: [
        'Glukosa-6-fosfat (G6P)',
        'Glukosa bebas',
        'UDP-glukosa'
      ],
      enzymes: [
        'Fosfoglukomutase (via zat antara Glukosa-1,6-bisfosfat)',
        'Fosfoglukoisomerase',
        'Glikogen fosforilase'
      ],
      products: [
        'Glukosa-1-fosfat (G1P)',
        'Fruktosa-6-fosfat',
        'UDP-glukosa'
      ],
      energies: [
        'Reaksi reversibel mendekati ekuilibrium (tanpa konsumsi ATP/UTP)',
        'Memerlukan 1 GTP',
        'Memerlukan 2 ATP'
      ],
      reasons: [
        'Menggeser gugus fosfat ke karbon nomor 1 (C1 anomerik) agar atom karbon tersebut reaktif membentuk ikatan ester dengan nukleotida UTP pada tahap aktivasi glukosil.',
        'Menghilangkan gugus fosfat agar glukosa menjadi netral.',
        'Mengubah konfigurasi D-glukosa menjadi L-glukosa.'
      ]
    },
    correct: {
      substrate: 'Glukosa-6-fosfat (G6P)',
      enzyme: 'Fosfoglukomutase (via zat antara Glukosa-1,6-bisfosfat)',
      product: 'Glukosa-1-fosfat (G1P)',
      energy: 'Reaksi reversibel mendekati ekuilibrium (tanpa konsumsi ATP/UTP)',
      reason: 'Menggeser gugus fosfat ke karbon nomor 1 (C1 anomerik) agar atom karbon tersebut reaktif membentuk ikatan ester dengan nukleotida UTP pada tahap aktivasi glukosil.'
    },
    hint: 'Glikogen sintase nantinya akan menggabungkan C1 glukosa ke C4 rantai glikogen. Di atom karbon manakah fosfat harus berada sebelum bereaksi dengan UTP?',
    explanation: 'Fosfoglukomutase memindahkan fosfat dari C6 ke C1 melalui residu fosfoserin aktif enzim dan zat antara glukosa-1,6-bisfosfat. Perpindahan fosfat ke C1 sangat krusial karena C1 adalah karbon anomerik yang akan dikonjugasikan dengan UDP.'
  },
  {
    stepNumber: 3,
    title: 'Tahap 3: Aktivasi Glukosa-1-Fosfat Menjadi UDP-Glukosa',
    equation: 'Glukosa-1-fosfat²⁻ + UTP⁴⁻ → UDP-glukosa²⁻ + PPi⁴⁻ (diikuti PPi + H₂O → 2 Pi)',
    options: {
      substrates: [
        'Glukosa-1-fosfat (G1P) + UTP',
        'Glukosa-6-fosfat + ATP',
        'Glukosa bebas + UDP'
      ],
      enzymes: [
        'UDP-glukosa pirofosforilase (UGPase)',
        'Glikogen sintase',
        'Glukokinase'
      ],
      products: [
        'UDP-glukosa + Pirofosfat (PPi)',
        'UDP + Glukosa-6-fosfat',
        'UTP + Asam glukonat'
      ],
      energies: [
        '1 UTP dikonsumsi; hidrolisis PPi spontan (ΔG°′ ≈ -19 kJ/mol) menarik reaksi biosintesis endergonik maju secara ireversibel',
        'Menghasilkan 2 ATP bersih',
        'Reaksi tidak memerlukan perubahan energi bebas'
      ],
      reasons: [
        'Membentuk donor glukosil teraktivasi berenergi tinggi karena pembentukan ikatan glikosidik secara langsung dari glukosa bebas bersifat endergonik (memerlukan pasokan energi bebas).',
        'Mempercepat oksidasi glukosa dalam siklus asam sitrat.',
        'Mencegah glukosa masuk ke dalam mitokondria.'
      ]
    },
    correct: {
      substrate: 'Glukosa-1-fosfat (G1P) + UTP',
      enzyme: 'UDP-glukosa pirofosforilase (UGPase)',
      product: 'UDP-glukosa + Pirofosfat (PPi)',
      energy: '1 UTP dikonsumsi; hidrolisis PPi spontan (ΔG°′ ≈ -19 kJ/mol) menarik reaksi biosintesis endergonik maju secara ireversibel',
      reason: 'Membentuk donor glukosil teraktivasi berenergi tinggi karena pembentukan ikatan glikosidik secara langsung dari glukosa bebas bersifat endergonik (memerlukan pasokan energi bebas).'
    },
    hint: 'Mengapa pembentukan makromolekul memerlukan molekul pembawa nukleotida teraktivasi seperti UDP? Apa peran pemutusan pirofosfat (PPi)?',
    explanation: 'Sintesis ikatan glikosidik bersifat endergonik (ΔG > 0). UDP-glukosa bertindak sebagai donor glukosil teraktivasi. Reaksi pembentukan UDP-glukosa digerakkan maju oleh hidrolisis cepat pirofosfat (PPi) oleh pirofosfatase anorganik menjadi 2 Pi (reaksi sangat eksergonik, ΔG°′ ≈ -19.2 kJ/mol).'
  },
  {
    stepNumber: 4,
    title: 'Tahap 4: Pembentukan Primer Oligosakarida oleh Glikogenin',
    equation: 'Glikogenin + n UDP-glukosa → Glikogenin-(glukosa)₈ + n UDP',
    options: {
      substrates: [
        'UDP-glukosa + Protein Glikogenin',
        'Glukosa bebas + Albumin',
        'G1P + Enzim Amilase'
      ],
      enzymes: [
        'Glikogenin (memiliki aktivitas autokatalitik glukosiltransferase)',
        'Glikogen sintase',
        'Branching enzyme'
      ],
      products: [
        'Primer oligoglukosa (±8 residu glukosa terikat kovalen pada residu tirosin Tyr-194 glikogenin) + UDP',
        'Partikel glikogen matang 55.000 glukosa',
        'Glukosa darah bebas'
      ],
      energies: [
        'Menggunakan ikatan ester energi tinggi dari UDP-glukosa (pelepasan UDP)',
        'Memerlukan fosforilasi oksidatif mitokondria',
        'Tanpa perubahan ikatan energi kimia'
      ],
      reasons: [
        'Enzim glikogen sintase tidak mampu memulai sintesis rantai glikogen baru secara de novo (tanpa cetakan primer), sehingga memerlukan oligomer awal yang dirakit oleh glikogenin.',
        'Glikogenin bertindak sebagai hormon penurun gula darah di sitosol.',
        'Glikogenin bertugas memecah cabang glikogen yang rusak.'
      ]
    },
    correct: {
      substrate: 'UDP-glukosa + Protein Glikogenin',
      enzyme: 'Glikogenin (memiliki aktivitas autokatalitik glukosiltransferase)',
      product: 'Primer oligoglukosa (±8 residu glukosa terikat kovalen pada residu tirosin Tyr-194 glikogenin) + UDP',
      energy: 'Menggunakan ikatan ester energi tinggi dari UDP-glukosa (pelepasan UDP)',
      reason: 'Enzim glikogen sintase tidak mampu memulai sintesis rantai glikogen baru secara de novo (tanpa cetakan primer), sehingga memerlukan oligomer awal yang dirakit oleh glikogenin.'
    },
    hint: 'Apakah glikogen sintase bisa merangkai dua glukosa bebas dari nol tanpa ada rantai awal sama sekali?',
    explanation: 'Glikogen sintase bersifat obligat membutuhkan primer berantai minimal 4–8 residu. Glikogenin mengkatalisis transfer glukosil pertama dari UDP-glukosa ke gugus hidroksil tirosin-194 (Tyr-194) dirinya sendiri, lalu memanjangkannya hingga terbentuk rantai primer pendek 8 glukosa.'
  },
  {
    stepNumber: 5,
    title: 'Tahap 5: Pemanjangan Rantai Linier dengan Ikatan α(1→4)',
    equation: '(Glukosa)ₙ + UDP-glukosa → (Glukosa)ₙ₊₁ [ikatan α(1→4)] + UDP',
    options: {
      substrates: [
        'UDP-glukosa + Rantai glikogen pada ujung nonreduksi (C4-OH bebas)',
        'Glukosa bebas + Rantai glikogen pada C1-OH',
        'G6P + Residu Tirosin'
      ],
      enzymes: [
        'Glikogen Sintase (Glycogen Synthase)',
        'Amilase pankreas',
        'Fosfofruktokinase-1'
      ],
      products: [
        'Rantai glikogen yang bertambah 1 residu glukosa via ikatan glikosidik α(1→4) + UDP',
        'Cabang glikogen baru ikatan α(1→6)',
        'Maltosa bebas + Pi'
      ],
      energies: [
        'Menggunakan energi transfer gugus glukosil dari UDP-glukosa (melepas UDP yang akan didaur ulang dengan ATP)',
        'Memerlukan 2 FADH2',
        'Tidak memerlukan donor teraktivasi'
      ],
      reasons: [
        'Membangun tulang punggung linier rantai heliks glikogen dengan mentransfer residu C1 glukosil ke gugus C4-OH bebas di ujung nonreduksi.',
        'Membentuk ikatan silang antar untai DNA sitoplasma.',
        'Mencegah glikogen berinteraksi dengan molekul air.'
      ]
    },
    correct: {
      substrate: 'UDP-glukosa + Rantai glikogen pada ujung nonreduksi (C4-OH bebas)',
      enzyme: 'Glikogen Sintase (Glycogen Synthase)',
      product: 'Rantai glikogen yang bertambah 1 residu glukosa via ikatan glikosidik α(1→4) + UDP',
      energy: 'Menggunakan energi transfer gugus glukosil dari UDP-glukosa (melepas UDP yang akan didaur ulang dengan ATP)',
      reason: 'Membangun tulang punggung linier rantai heliks glikogen dengan mentransfer residu C1 glukosil ke gugus C4-OH bebas di ujung nonreduksi.'
    },
    hint: 'Glikogen sintase adalah enzim kunci pengatur biosintesis glikogen. Jenis ikatan apa yang dibentuknya sepanjang rantai linear?',
    explanation: 'Glikogen sintase mengkatalisis pembentukan ikatan α(1→4) glikosidik antara C1 dari UDP-glukosa dengan C4 di ujung nonreduksi rantai polimer glikogen. Enzim ini diregulasi secara alosterik (diaktivasi oleh G6P) dan secara kovalen (diaktivasi melalui defosforilasi oleh stimulasi insulin).'
  },
  {
    stepNumber: 6,
    title: 'Tahap 6: Pembentukan Titik Cabang dengan Ikatan α(1→6)',
    equation: 'Rantai linier glikogen (≥11 residu) → Rantai bercabang [ikatan α(1→6)]',
    options: {
      substrates: [
        'Segmen oligoglukosa 6–7 residu dari ujung nonreduksi rantai linier (panjang minimal 11 residu)',
        'UDP-glukosa bebas',
        'Glukosa-1-fosfat murni'
      ],
      enzymes: [
        'Branching Enzyme (Amilo-α(1→4)→α(1→6)-transglukosilase)',
        'Debranching enzyme',
        'Glikogenin autokatalitik'
      ],
      products: [
        'Titik percabangan baru dengan ikatan glikosidik α(1→6) berjarak minimal 4 residu dari cabang sebelumnya',
        'Molekul glukosa netral bebas',
        'Rantai lurus amilosa tak larut'
      ],
      energies: [
        'Reaksi transfer segmen intramolekuler (tanpa membutuhkan energi ATP/UTP tambahan)',
        'Memerlukan 4 ATP per titik cabang',
        'Memerlukan 2 NADPH'
      ],
      reasons: [
        'Meningkatkan kelarutan glikogen di sitoplasma sel serta melipatgandakan jumlah ujung nonreduksi secara drastis, sehingga laju sintesis maupun degradasi (glikogenolisis) dapat berlangsung sangat cepat saat dibutuhkan tubuh.',
        'Mengubah glikogen menjadi lemak agar dapat disimpan di dalam vakuola.',
        'Mencegah enzim glikogen sintase bekerja kembali.'
      ]
    },
    correct: {
      substrate: 'Segmen oligoglukosa 6–7 residu dari ujung nonreduksi rantai linier (panjang minimal 11 residu)',
      enzyme: 'Branching Enzyme (Amilo-α(1→4)→α(1→6)-transglukosilase)',
      product: 'Titik percabangan baru dengan ikatan glikosidik α(1→6) berjarak minimal 4 residu dari cabang sebelumnya',
      energy: 'Reaksi transfer segmen intramolekuler (tanpa membutuhkan energi ATP/UTP tambahan)',
      reason: 'Meningkatkan kelarutan glikogen di sitoplasma sel serta melipatgandakan jumlah ujung nonreduksi secara drastis, sehingga laju sintesis maupun degradasi (glikogenolisis) dapat berlangsung sangat cepat saat dibutuhkan tubuh.'
    },
    hint: 'Apa fungsi utama struktur pohon bercabang dibanding rantai lurus amilosa dalam hal kelarutan dan kecepatan akses enzim?',
    explanation: 'Branching enzyme memotong segmen 6–7 residu glukosa dari rantai yang panjangnya minimal 11 residu, lalu mentransfernya ke C6-OH pada residu yang terletak lebih ke dalam rantai yang sama atau rantai tetangga, membentuk ikatan α(1→6). Struktur bercabang ini melipatgandakan ujung nonreduksi sehingga enzim glikogen sintase dan fosforilase dapat bekerja simultan di banyak lokasi.'
  }
];

export const LKMSectionC_GlycogenBuilder: React.FC<LKMSectionCGlycogenBuilderProps> = ({
  onBack,
  onNext,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  
  // State pilihan mahasiswa per tahap
  const [userSelections, setUserSelections] = useState<Record<number, Partial<StageChoice>>>({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {}
  });

  // State status pemeriksaan per tahap
  const [stageStatus, setStageStatus] = useState<Record<number, {
    checked: boolean;
    isCorrect: boolean;
    showHint: boolean;
    showExplanation: boolean;
    incorrectFields: string[];
  }>>({
    1: { checked: false, isCorrect: false, showHint: false, showExplanation: false, incorrectFields: [] },
    2: { checked: false, isCorrect: false, showHint: false, showExplanation: false, incorrectFields: [] },
    3: { checked: false, isCorrect: false, showHint: false, showExplanation: false, incorrectFields: [] },
    4: { checked: false, isCorrect: false, showHint: false, showExplanation: false, incorrectFields: [] },
    5: { checked: false, isCorrect: false, showHint: false, showExplanation: false, incorrectFields: [] },
    6: { checked: false, isCorrect: false, showHint: false, showExplanation: false, incorrectFields: [] }
  });

  const currentStage = GLYCOGENESIS_STAGES[currentStepIndex];
  const currentStepNum = currentStage.stepNumber;
  const currentSel = userSelections[currentStepNum] || {};
  const currentStat = stageStatus[currentStepNum];

  const handleSelectField = (field: keyof StageChoice, value: string) => {
    setUserSelections(prev => ({
      ...prev,
      [currentStepNum]: {
        ...prev[currentStepNum],
        [field]: value
      }
    }));
    // Reset status checked jika user mengubah pilihan
    if (currentStat.checked) {
      setStageStatus(prev => ({
        ...prev,
        [currentStepNum]: {
          ...prev[currentStepNum],
          checked: false,
          isCorrect: false,
          incorrectFields: []
        }
      }));
    }
  };

  const handleCheckAnswer = () => {
    const incorrectFields: string[] = [];
    if (currentSel.substrate !== currentStage.correct.substrate) incorrectFields.push('Substrat');
    if (currentSel.enzyme !== currentStage.correct.enzyme) incorrectFields.push('Enzim');
    if (currentSel.product !== currentStage.correct.product) incorrectFields.push('Produk');
    if (currentSel.energy !== currentStage.correct.energy) incorrectFields.push('Energi/Nukleotida');
    if (currentSel.reason !== currentStage.correct.reason) incorrectFields.push('Alasan Biologis');

    const isAllCorrect = incorrectFields.length === 0;

    setStageStatus(prev => ({
      ...prev,
      [currentStepNum]: {
        ...prev[currentStepNum],
        checked: true,
        isCorrect: isAllCorrect,
        showExplanation: isAllCorrect, // jika benar langsung buka penjelasan
        incorrectFields
      }
    }));
  };

  const handleRetry = () => {
    setStageStatus(prev => ({
      ...prev,
      [currentStepNum]: {
        ...prev[currentStepNum],
        checked: false,
        isCorrect: false,
        incorrectFields: []
      }
    }));
  };

  const handleToggleHint = () => {
    setStageStatus(prev => ({
      ...prev,
      [currentStepNum]: {
        ...prev[currentStepNum],
        showHint: !prev[currentStepNum].showHint
      }
    }));
  };

  const handleToggleExplanation = () => {
    setStageStatus(prev => ({
      ...prev,
      [currentStepNum]: {
        ...prev[currentStepNum],
        showExplanation: !prev[currentStepNum].showExplanation
      }
    }));
  };

  const isCurrentComplete = 
    Boolean(currentSel.substrate && currentSel.enzyme && currentSel.product && currentSel.energy && currentSel.reason);

  const completedStagesCount = Object.values(stageStatus).filter(s => s.isCorrect).length;

  return (
    <div className="space-y-6" id="lkm-section-c">
      {/* Header Bagian C */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>Bagian C • Misi Rekonstruksi Jalur Biosintesis</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Misi Membangun Glikogen: Dari Glukosa Bebas Menjadi Polimer Bercabang
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Buktikan pemahaman kelompok Anda dengan menyusun 6 tahapan reaksi glikogenesis secara aktif.
          Tentukan <strong>substrat, enzim, produk, kebutuhan energi,</strong> serta <strong>alasan biologis</strong> pada setiap kartu misi.
        </p>
      </div>

      {/* Bar Indikator Progres 6 Tahap */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-stone-700">Kemajuan Misi Glikogenesis:</span>
          <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {completedStagesCount} dari 6 Tahap Tuntas Terverifikasi
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {GLYCOGENESIS_STAGES.map((s, idx) => {
            const stat = stageStatus[s.stepNumber];
            const isCurrent = currentStepIndex === idx;

            return (
              <button
                key={s.stepNumber}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between h-14 ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/50'
                    : stat.isCorrect
                    ? 'border-emerald-300 bg-emerald-50/40 text-emerald-950'
                    : 'border-stone-200 bg-[#FAF8F5] text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-[11px]">Tahap {s.stepNumber}</span>
                  {stat.isCorrect ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : stat.checked ? (
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-stone-300" />
                  )}
                </div>
                <span className="text-[10px] truncate text-stone-500">{s.title.split(':')[1]?.trim() || s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Kartu Misi Aktif */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-5">
        
        {/* Header Tahap */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E5E2D9] pb-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-stone-800 text-amber-300 text-[10px] font-mono font-bold">
              MISI TAHAP {currentStage.stepNumber} DARI 6
            </span>
            <h3 className="text-base font-serif font-bold text-stone-900 mt-1">
              {currentStage.title}
            </h3>
          </div>

          <div className="bg-[#FAF8F5] border border-stone-200 px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold text-stone-700">
            Stoikiometri: {currentStage.equation}
          </div>
        </div>

        {/* Modul Manipulasi Interaktif Khusus Tahap Aktif */}
        <div className="pb-2">
          {currentStepNum === 1 && <InteractiveGlucosePhosphorylation />}
          {currentStepNum === 2 && <InteractiveG6PtoG1PIsomerization />}
          {currentStepNum === 3 && <InteractiveUDPGLCSynthesis />}
          {currentStepNum === 4 && <InteractiveGlycogeninPrimer />}
          {currentStepNum === 5 && <InteractiveAlpha14Bond />}
          {currentStepNum === 6 && <InteractiveAlpha16Branching />}
        </div>

        {/* 5 Dropdown / Selector Komponen Misi */}
        <div className="border-t border-stone-200 pt-4">
          <div className="text-xs font-bold text-stone-900 mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Sintesis Ilmiah Lembar Kerja (Konstruksi Komponen Reaksi)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* 1. Substrat */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
            <label className="font-bold text-stone-900 flex items-center justify-between">
              <span>A. Substrat Reaksi:</span>
              {currentStat.checked && (
                currentSel.substrate === currentStage.correct.substrate ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Benar</span>
                ) : (
                  <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Perbaiki</span>
                )
              )}
            </label>
            <div className="space-y-1.5">
              {currentStage.options.substrates.map((sub, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectField('substrate', sub)}
                  className={`w-full p-2 rounded-lg border text-left transition-all cursor-pointer text-[11.5px] ${
                    currentSel.substrate === sub
                      ? 'bg-amber-100/80 border-amber-600 text-stone-900 font-bold'
                      : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Enzim Katalis */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
            <label className="font-bold text-stone-900 flex items-center justify-between">
              <span>B. Enzim Katalis Utama:</span>
              {currentStat.checked && (
                currentSel.enzyme === currentStage.correct.enzyme ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Benar</span>
                ) : (
                  <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Perbaiki</span>
                )
              )}
            </label>
            <div className="space-y-1.5">
              {currentStage.options.enzymes.map((enz, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectField('enzyme', enz)}
                  className={`w-full p-2 rounded-lg border text-left transition-all cursor-pointer text-[11.5px] ${
                    currentSel.enzyme === enz
                      ? 'bg-amber-100/80 border-amber-600 text-stone-900 font-bold'
                      : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {enz}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Produk Dihasilkan */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
            <label className="font-bold text-stone-900 flex items-center justify-between">
              <span>C. Produk Dihasilkan:</span>
              {currentStat.checked && (
                currentSel.product === currentStage.correct.product ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Benar</span>
                ) : (
                  <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Perbaiki</span>
                )
              )}
            </label>
            <div className="space-y-1.5">
              {currentStage.options.products.map((prod, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectField('product', prod)}
                  className={`w-full p-2 rounded-lg border text-left transition-all cursor-pointer text-[11.5px] ${
                    currentSel.product === prod
                      ? 'bg-amber-100/80 border-amber-600 text-stone-900 font-bold'
                      : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {prod}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Energi / Nukleotida Digunakan */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
            <label className="font-bold text-stone-900 flex items-center justify-between">
              <span>D. Energi / Nukleotida Terlibat:</span>
              {currentStat.checked && (
                currentSel.energy === currentStage.correct.energy ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Benar</span>
                ) : (
                  <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Perbaiki</span>
                )
              )}
            </label>
            <div className="space-y-1.5">
              {currentStage.options.energies.map((en, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectField('energy', en)}
                  className={`w-full p-2 rounded-lg border text-left transition-all cursor-pointer text-[11.5px] ${
                    currentSel.energy === en
                      ? 'bg-amber-100/80 border-amber-600 text-stone-900 font-bold'
                      : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {en}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Alasan Biologis Tahapan (Full Width) */}
          <div className="md:col-span-2 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
            <label className="font-bold text-stone-900 flex items-center justify-between">
              <span>E. Alasan Biologis & Termodinamika Tahapan Tersebut:</span>
              {currentStat.checked && (
                currentSel.reason === currentStage.correct.reason ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Benar</span>
                ) : (
                  <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Perbaiki</span>
                )
              )}
            </label>
            <div className="space-y-1.5">
              {currentStage.options.reasons.map((rsn, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectField('reason', rsn)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer text-[11.5px] ${
                    currentSel.reason === rsn
                      ? 'bg-amber-100/80 border-amber-600 text-stone-900 font-bold'
                      : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {rsn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Tombol Aksi: Petunjuk, Periksa Jawaban, Coba Lagi, Lihat Penjelasan */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5E2D9]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleHint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
              id="btn-stage-hint"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{currentStat.showHint ? 'Tutup Petunjuk' : 'Petunjuk Berpikir'}</span>
            </button>

            {currentStat.checked && !currentStat.isCorrect && (
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                id="btn-stage-retry"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleToggleExplanation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold transition-colors cursor-pointer"
              id="btn-stage-explanation"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{currentStat.showExplanation ? 'Tutup Penjelasan' : 'Lihat Penjelasan Biokimiawi'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCheckAnswer}
              disabled={!isCurrentComplete}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-amber-100 text-xs font-bold shadow-xs transition-all cursor-pointer"
              id="btn-check-answer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Periksa Jawaban Misi</span>
            </button>

            {currentStepIndex < GLYCOGENESIS_STAGES.length - 1 && (
              <button
                type="button"
                onClick={() => setCurrentStepIndex(prev => prev + 1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Tahap Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Kotak Petunjuk (Jika dibuka) */}
        {currentStat.showHint && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5 animate-fadeIn">
            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-[11px] uppercase tracking-wider">Petunjuk Diskusi Kelompok:</span>
              <p className="mt-0.5 text-stone-800 leading-relaxed">{currentStage.hint}</p>
            </div>
          </div>
        )}

        {/* Kotak Umpan Balik Berdasarkan Alasan Ilmiah */}
        {currentStat.checked && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
            currentStat.isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-red-50/80 border-red-300 text-red-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {currentStat.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Misi Tahap {currentStage.stepNumber} Terverifikasi Tepat!</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <span>Beberapa Komponen Perlu Didiskusikan Kembali:</span>
                </>
              )}
            </div>

            {!currentStat.isCorrect && (
              <div className="text-stone-800 text-xs">
                Periksa kembali pilihan kelompok Anda pada bagian:{' '}
                <strong className="text-red-800">{currentStat.incorrectFields.join(', ')}</strong>.
                Gunakan tombol "Petunjuk Berpikir" di atas jika membutuhkan arahan konsep.
              </div>
            )}
          </div>
        )}

        {/* Kotak Penjelasan Ilmiah Mendalam (Jika dibuka atau sudah tuntas) */}
        {currentStat.showExplanation && (
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs space-y-1.5 animate-fadeIn">
            <span className="font-bold text-[11px] uppercase tracking-wider block text-blue-900">
              Ulasan Mekanisme Biokimiawi & Stoikiometri:
            </span>
            <p className="text-stone-700 leading-relaxed text-[11.5px]">
              {currentStage.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigasi Bawah */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-bold text-stone-700 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian B: Peta Organ</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-d"
        >
          <span>Lanjut ke Bagian D: Representasi 2D & 3D</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
