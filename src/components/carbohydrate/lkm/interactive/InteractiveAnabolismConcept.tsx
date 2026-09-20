/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Zap,
  TrendingDown,
  TrendingUp,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

interface ProcessItem {
  id: string;
  name: string;
  description: string;
  category: 'ANABOLISME' | 'KATABOLISME';
  energyBehavior: 'Memerlukan ATP/Nukleotida' | 'Menghasilkan ATP/NADH';
  explanation: string;
}

const PROCESS_ITEMS: ProcessItem[] = [
  {
    id: 'glikogenesis',
    name: 'Glikogenesis',
    description: 'Penggabungan monomer glukosa menjadi makromolekul polimer glikogen sferis.',
    category: 'ANABOLISME',
    energyBehavior: 'Memerlukan ATP/Nukleotida',
    explanation: 'Anabolisme karbohidrat: membangun molekul penyimpan berbobot tinggi dari prekursor sederhana, mengonsumsi ATP dan UTP.'
  },
  {
    id: 'lipogenesis',
    name: 'Sintesis Asam Lemak',
    description: 'Penyusunan rantai hidrokarbon panjang asam lemak dari unit asetil-KoA dan malonil-KoA.',
    category: 'ANABOLISME',
    energyBehavior: 'Memerlukan ATP/Nukleotida',
    explanation: 'Anabolisme lipid: memerlukan donor pereduksi NADPH dan energi bebas ATP untuk membentuk ikatan ester triasilgliserol.'
  },
  {
    id: 'glukoneogenesis',
    name: 'Glukoneogenesis',
    description: 'Biosintesis glukosa baru dari prekursor non-heksosa (piruvat, laktat, gliserol).',
    category: 'ANABOLISME',
    energyBehavior: 'Memerlukan ATP/Nukleotida',
    explanation: 'Anabolisme: membalik rintangan termodinamika ireversibel glikolisis dengan konsumsi total 4 ATP, 2 GTP, dan 2 NADH per molekul glukosa.'
  },
  {
    id: 'sintesis_protein',
    name: 'Sintesis Protein (Translasi)',
    description: 'Polimerisasi asam-asam amino membentuk rantai polipeptida fungsional.',
    category: 'ANABOLISME',
    energyBehavior: 'Memerlukan ATP/Nukleotida',
    explanation: 'Anabolisme peptida: memerlukan aktivasi asam amino oleh ATP (aminoasil-tRNA) dan pemanjangan oleh GTP.'
  },
  {
    id: 'glikolisis',
    name: 'Glikolisis',
    description: 'Pemecahan oksidatif 1 molekul glukosa menjadi 2 molekul piruvat berkarbon tiga.',
    category: 'KATABOLISME',
    energyBehavior: 'Menghasilkan ATP/NADH',
    explanation: 'Katabolisme heksosa: menghasilkan keuntungan bersih 2 ATP dan 2 NADH untuk pasokan energi instan.'
  },
  {
    id: 'siklus_krebs',
    name: 'Siklus Asam Sitrat (TCA)',
    description: 'Oksidasi tuntas gugus asetil menjadi 2 molekul CO₂ dengan pelepasan elektron berenergi tinggi.',
    category: 'KATABOLISME',
    energyBehavior: 'Menghasilkan ATP/NADH',
    explanation: 'Pusat katabolisme aerob: menangkap elektron ke 3 NADH, 1 FADH₂, dan 1 GTP/ATP per putaran.'
  },
  {
    id: 'beta_oksidasi',
    name: 'Beta-Oksidasi Asam Lemak',
    description: 'Pemotongan bertahap rantai asil-KoA pada karbon beta menjadi fragmen 2-karbon asetil-KoA.',
    category: 'KATABOLISME',
    energyBehavior: 'Menghasilkan ATP/NADH',
    explanation: 'Katabolisme lipid: menghasilkan FADH₂, NADH, dan unit asetil-KoA untuk respirasi seluler mitokondria.'
  },
  {
    id: 'glikogenolisis',
    name: 'Glikogenolisis',
    description: 'Pemecahan fosforolitik glikogen menjadi glukosa-1-fosfat saat kadar glukosa turun.',
    category: 'KATABOLISME',
    energyBehavior: 'Menghasilkan ATP/NADH',
    explanation: 'Katabolisme cadangan glikogen: melepaskan monomer untuk mempertahankan glikemia darah atau glikolisis kontraksi otot.'
  }
];

export const InteractiveAnabolismConcept: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [predictionSelected, setPredictionSelected] = useState<string | null>(null);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);

  // Klasifikasi penempatan
  const [placedItems, setPlacedItems] = useState<{
    ANABOLISME: string[];
    KATABOLISME: string[];
  }>({
    ANABOLISME: [],
    KATABOLISME: []
  });

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Anabolisme (biosintesis) menyusun molekul kompleks dari prekursor sederhana dan bersifat endergonik (memerlukan ATP/UTP/GTP).',
    'Katabolisme mendegradasi atau memecah molekul kompleks menjadi molekul sederhana untuk memanen energi kimia (ATP/NADH).',
    'Glikogenesis, Glukoneogenesis, dan Lipogenesis semuanya adalah jalur biosintesis (anabolisme).'
  ];

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e: React.DragEvent, targetCategory: 'ANABOLISME' | 'KATABOLISME') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      placeItem(id, targetCategory);
    }
  };

  const placeItem = (id: string, targetCategory: 'ANABOLISME' | 'KATABOLISME') => {
    setPlacedItems(prev => {
      const otherCategory = targetCategory === 'ANABOLISME' ? 'KATABOLISME' : 'ANABOLISME';
      return {
        ...prev,
        [otherCategory]: prev[otherCategory].filter(item => item !== id),
        [targetCategory]: Array.from(new Set([...prev[targetCategory], id]))
      };
    });
    setSelectedProcessId(null);
    setPhase('MANIPULATION');
  };

  const unplaceItem = (id: string) => {
    setPlacedItems(prev => ({
      ANABOLISME: prev.ANABOLISME.filter(item => item !== id),
      KATABOLISME: prev.KATABOLISME.filter(item => item !== id)
    }));
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');

    const anabolismeCorrect = placedItems.ANABOLISME.every(id => {
      const item = PROCESS_ITEMS.find(p => p.id === id);
      return item?.category === 'ANABOLISME';
    }) && placedItems.ANABOLISME.length === 4;

    const katabolismeCorrect = placedItems.KATABOLISME.every(id => {
      const item = PROCESS_ITEMS.find(p => p.id === id);
      return item?.category === 'KATABOLISME';
    }) && placedItems.KATABOLISME.length === 4;

    const allCorrect = anabolismeCorrect && katabolismeCorrect && predictionSelected === 'A';
    setIsCorrect(allCorrect);

    if (!allCorrect) {
      setScore(prev => Math.max(20, prev - 15));
    }
  };

  const handleReset = () => {
    setPlacedItems({ ANABOLISME: [], KATABOLISME: [] });
    setSelectedProcessId(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  const handleShowHint = () => {
    setHintIndex(prev => Math.min(hints.length, prev + 1));
    setScore(prev => Math.max(20, prev - 10));
  };

  const unplacedList = PROCESS_ITEMS.filter(
    p => !placedItems.ANABOLISME.includes(p.id) && !placedItems.KATABOLISME.includes(p.id)
  );

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Aktivitas Interaktif 1: Klasifikasi Konsep Anabolisme vs Katabolisme"
        instruction="Prediksikan definisi anabolisme, lalu kelompokkan 8 proses biokimia ke dalam wadah Anabolisme atau Katabolisme. Amati perbedaan kebutuhan energi dan perubahan ukuran molekul."
        hints={hints}
        currentHintIndex={hintIndex}
        onShowNextHint={handleShowHint}
        onCheckAnswer={handleCheck}
        onReset={handleReset}
        onShowExplanation={() => {}}
        isAnswerChecked={isAnswerChecked}
        isCorrect={isCorrect}
        score={score}
        maxScore={100}
        canCheck={placedItems.ANABOLISME.length + placedItems.KATABOLISME.length === 8}
        explanation="Anabolisme adalah lintasan biosintetik konvergen atau divergen yang merakit molekul kecil menjadi polimer atau struktur kompleks berdensitas energi tinggi (misal: glikogen, triasilgliserol, protein). Proses ini selalu bersifat endergonik (ΔG > 0 jika tidak dipasangkan) sehingga mutlak membutuhkan hidrolisis ikatan fosfoanhidrida berenergi tinggi (ATP, UTP, GTP) dan kofaktor pereduksi (NADPH). Sebaliknya, katabolisme memecah nutrien kompleks menjadi produk sederhana seperti piruvat, CO₂, dan H₂O seraya menangkap energi bebas dalam bentuk ATP dan NADH."
      />

      {/* 1. TAHAP PREDIKSI KONSEPTUAL */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase">
          <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-[10px] font-mono">1</span>
          <span>Tahap Prediksi Mahasiswa: Karakteristik Inti Anabolisme</span>
        </div>
        <p className="text-xs text-stone-600">
          Sebelum mengelompokkan, tentukan pernyataan yang paling tepat mendefinisikan prinsip termodinamika anabolisme:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[
            {
              id: 'A',
              text: 'Membangun molekul kompleks dari molekul sederhana, bersifat endergonik, dan mengonsumsi energi bebas (ATP/UTP).',
              correct: true
            },
            {
              id: 'B',
              text: 'Memecah molekul kompleks menjadi sederhana, bersifat eksergonik, dan menghasilkan bersih ATP serta NADH.',
              correct: false
            }
          ].map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setPredictionSelected(opt.id);
                setPhase('MANIPULATION');
              }}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                predictionSelected === opt.id
                  ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-400'
                  : 'bg-stone-50/50 hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-800">{opt.id}.</span>
                <span>{opt.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAHAP MANIPULASI (DRAG & DROP ATAU TAP-TO-PLACE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Kolom Daftar Proses yang Belum Dikelompokkan */}
        <div className="lg:col-span-4 bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900">
              Daftar Proses Biokimia ({unplacedList.length} Tersisa)
            </span>
            <span className="text-[10px] text-stone-500">Seret atau Ketuk Objek</span>
          </div>

          <div className="space-y-2 min-h-[220px]">
            {unplacedList.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-xl">
                Semua proses telah ditempatkan! Silakan tekan tombol <strong>Periksa Jawaban</strong> di atas.
              </div>
            ) : (
              unplacedList.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => setSelectedProcessId(selectedProcessId === item.id ? null : item.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer text-xs select-none ${
                    selectedProcessId === item.id
                      ? 'bg-amber-100 border-amber-500 text-amber-950 ring-2 ring-amber-400/50 scale-[1.02]'
                      : 'bg-[#FAF8F5] hover:bg-amber-50/50 border-stone-200 text-stone-800 hover:border-amber-300'
                  }`}
                >
                  <div className="font-bold text-stone-900 flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 font-mono">
                      Pilih
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Wadah ANABOLISME & KATABOLISME */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Wadah 1: ANABOLISME */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'ANABOLISME')}
            onClick={() => {
              if (selectedProcessId) {
                placeItem(selectedProcessId, 'ANABOLISME');
              }
            }}
            className={`border-2 rounded-2xl p-4 flex flex-col justify-between transition-all min-h-[300px] ${
              selectedProcessId
                ? 'border-emerald-400 bg-emerald-50/40 ring-2 ring-emerald-300/40 cursor-pointer'
                : 'border-emerald-200 bg-emerald-50/20'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs sm:text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Wadah ANABOLISME (Biosintesis)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {placedItems.ANABOLISME.length} / 4
                </span>
              </div>

              <div className="text-[11px] text-emerald-800/80 italic">
                Ciri: Membangun polimer, membutuhkan input energi bebas (ATP/UTP/NADPH).
              </div>

              {/* Daftar item di Anabolisme */}
              <div className="space-y-1.5 pt-2">
                {placedItems.ANABOLISME.map(id => {
                  const item = PROCESS_ITEMS.find(p => p.id === id)!;
                  const isChecked = isAnswerChecked;
                  const isItemRight = item.category === 'ANABOLISME';

                  return (
                    <div
                      key={id}
                      className={`p-2 rounded-xl text-xs border flex items-start justify-between gap-2 transition-all ${
                        isChecked
                          ? isItemRight
                            ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-medium'
                            : 'bg-red-100/80 border-red-400 text-red-950 font-medium'
                          : 'bg-white border-emerald-200 text-stone-800 shadow-2xs'
                      }`}
                    >
                      <div>
                        <span className="font-bold block">{item.name}</span>
                        {isChecked && (
                          <span className="text-[10px] block mt-0.5 text-stone-600">
                            {item.explanation}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          unplaceItem(id);
                        }}
                        className="text-[10px] text-stone-400 hover:text-red-600 cursor-pointer p-0.5"
                        title="Keluarkan dari wadah"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedProcessId && (
              <div className="mt-3 p-2 bg-emerald-100/90 text-emerald-900 rounded-xl text-[11px] font-bold text-center border border-emerald-300 animate-pulse">
                Ketuk di sini untuk menempatkan ke Anabolisme
              </div>
            )}
          </div>

          {/* Wadah 2: KATABOLISME */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'KATABOLISME')}
            onClick={() => {
              if (selectedProcessId) {
                placeItem(selectedProcessId, 'KATABOLISME');
              }
            }}
            className={`border-2 rounded-2xl p-4 flex flex-col justify-between transition-all min-h-[300px] ${
              selectedProcessId
                ? 'border-blue-400 bg-blue-50/40 ring-2 ring-blue-300/40 cursor-pointer'
                : 'border-blue-200 bg-blue-50/20'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs sm:text-sm">
                  <TrendingDown className="w-4 h-4 text-blue-600" />
                  <span>Wadah KATABOLISME (Degradasi)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                  {placedItems.KATABOLISME.length} / 4
                </span>
              </div>

              <div className="text-[11px] text-blue-800/80 italic">
                Ciri: Memecah substrat, memanen energi kimia (ATP/NADH/FADH₂).
              </div>

              {/* Daftar item di Katabolisme */}
              <div className="space-y-1.5 pt-2">
                {placedItems.KATABOLISME.map(id => {
                  const item = PROCESS_ITEMS.find(p => p.id === id)!;
                  const isChecked = isAnswerChecked;
                  const isItemRight = item.category === 'KATABOLISME';

                  return (
                    <div
                      key={id}
                      className={`p-2 rounded-xl text-xs border flex items-start justify-between gap-2 transition-all ${
                        isChecked
                          ? isItemRight
                            ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-medium'
                            : 'bg-red-100/80 border-red-400 text-red-950 font-medium'
                          : 'bg-white border-blue-200 text-stone-800 shadow-2xs'
                      }`}
                    >
                      <div>
                        <span className="font-bold block">{item.name}</span>
                        {isChecked && (
                          <span className="text-[10px] block mt-0.5 text-stone-600">
                            {item.explanation}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          unplaceItem(id);
                        }}
                        className="text-[10px] text-stone-400 hover:text-red-600 cursor-pointer p-0.5"
                        title="Keluarkan dari wadah"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedProcessId && (
              <div className="mt-3 p-2 bg-blue-100/90 text-blue-900 rounded-xl text-[11px] font-bold text-center border border-blue-300 animate-pulse">
                Ketuk di sini untuk menempatkan ke Katabolisme
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
