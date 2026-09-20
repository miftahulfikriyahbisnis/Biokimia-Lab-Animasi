/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

interface ErrorCase {
  id: number;
  title: string;
  context: string;
  diagramNodes: {
    nodeId: string;
    label: string;
    isError: boolean;
    errorReason?: string;
  }[];
  correctionOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  scientificSummary: string;
}

const ERROR_CASES: ErrorCase[] = [
  {
    id: 1,
    title: 'Kasus Deteksi 1: Kesalahan Lokalisasi Enzim pada Otot Rangka',
    context: 'Perhatikan diagram metabolisme miosit (otot rangka) di bawah ini. Diagram ini sengaja memuat 1 kesalahan fisiologis mendasar.',
    diagramNodes: [
      { nodeId: 'n1', label: 'Glikogen Otot', isError: false },
      { nodeId: 'n2', label: 'Glikogen Fosforilase', isError: false },
      { nodeId: 'n3', label: 'Glukosa-1-Fosfat (G1P)', isError: false },
      { nodeId: 'n4', label: 'Fosfoglukomutase', isError: false },
      { nodeId: 'n5', label: 'Glukosa-6-Fosfat (G6P)', isError: false },
      { nodeId: 'n6', label: 'Enzim Glukosa-6-Fosfatase melepaskan Glukosa ke Darah Bebas', isError: true, errorReason: 'Otot rangka TIDAK memiliki enzim Glukosa-6-fosfatase!' }
    ],
    correctionOptions: [
      {
        id: 'A',
        text: 'Ganti dengan: Otot rangka TIDAK memiliki Glukosa-6-fosfatase; G6P langsung masuk glikolisis internal untuk ATP kontraksi.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Ganti dengan: Glukosa-1-fosfat langsung diubah menjadi laktat di mitokondria.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Ganti dengan: Glikogen otot harus diubah menjadi badan keton terlebih dahulu.',
        isCorrect: false
      }
    ],
    scientificSummary: 'Otot rangka tidak mengekspresikan enzim Glukosa-6-fosfatase. Oleh karena itu, glikogen otot bersifat tertutup dan eksklusif untuk konsumsi energi serat otot itu sendiri melalui glikolisis; otot tidak dapat menyumbangkan glukosa bebas untuk menjaga kadar glukosa darah sistemik.'
  },
  {
    id: 2,
    title: 'Kasus Deteksi 2: Kesalahan Aliran Prekursor Glukoneogenesis',
    context: 'Tinjau skema glukoneogenesis hepar berikut. Ada 1 rute yang secara biokimiawi mustahil terjadi pada manusia.',
    diagramNodes: [
      { nodeId: 'm1', label: 'Asam Lemak Palmitat (16C)', isError: false },
      { nodeId: 'm2', label: 'Beta-Oksidasi', isError: false },
      { nodeId: 'm3', label: 'Asetil-KoA', isError: false },
      { nodeId: 'm4', label: 'Asetil-KoA → Piruvat (Netto Glukosa)', isError: true, errorReason: 'Reaksi Piruvat Dehidrogenase bersifat ireversibel; asetil-KoA tidak dapat diubah kembali menjadi piruvat!' },
      { nodeId: 'm5', label: 'Glukoneogenesis → Glukosa Darah', isError: false }
    ],
    correctionOptions: [
      {
        id: 'A',
        text: 'Asetil-KoA tidak bisa diubah menjadi piruvat karena enzim PDH ireversibel; asam lemak rantai genap tidak menghasilkan glukosa netto.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Palmitat harus diubah menjadi etanol terlebih dahulu di sitosol.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Piruvat seharusnya langsung berubah menjadi glikogen tanpa G6P.',
        isCorrect: false
      }
    ],
    scientificSummary: 'Kompleks Piruvat Dehidrogenase mengkatalisis dekarboksilasi oksidatif piruvat menjadi asetil-KoA dengan ΔG°′ sangat negatif sehingga berlangsung searah (ireversibel). Mamalia tidak dapat mensintesis piruvat atau glukosa dari asetil-KoA.'
  },
  {
    id: 3,
    title: 'Kasus Deteksi 3: Kesalahan Spesifisitas Ikatan Glikogen Sintase',
    context: 'Perhatikan tahap perakitan glikogenesis berikut. Temukan kekeliruan jenis ikatan atau enzim.',
    diagramNodes: [
      { nodeId: 'k1', label: 'UDP-Glukosa + Primer', isError: false },
      { nodeId: 'k2', label: 'Glikogen Sintase', isError: false },
      { nodeId: 'k3', label: 'Membentuk Ikatan α(1→6) Langsung pada Rantai Linier', isError: true, errorReason: 'Glikogen sintase HANYA membentuk ikatan α(1→4)! Ikatan α(1→6) dibentuk oleh Branching Enzyme.' },
      { nodeId: 'k4', label: 'Branching Enzyme', isError: false },
      { nodeId: 'k5', label: 'Glikogen Bercabang Sferis', isError: false }
    ],
    correctionOptions: [
      {
        id: 'A',
        text: 'Glikogen sintase hanya mengkatalisis pembentukan ikatan α(1→4) linier; cabang α(1→6) hanya dibentuk oleh enzim percabangan (branching enzyme).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Glikogen sintase membentuk ikatan peptida antara glukosa dan lipid.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Reaksi ini membutuhkan insulin sebagai substrat stokiometri.',
        isCorrect: false
      }
    ],
    scientificSummary: 'Situs katalitik glikogen sintase secara kaku hanya mengenali atom C4-OH dari ujung nonreduksi dan mengikatkannya dengan C1 donor glukosil membentuk ikatan α(1→4). Enzim ini tidak memiliki aktivitas transglukosilasi untuk membentuk titik cabang α(1→6).'
  }
];

export const InteractiveErrorDetection: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedCorrectionId, setSelectedCorrectionId] = useState<string | null>(null);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const activeCase = ERROR_CASES[currentCaseIndex];

  const hints = [
    'Tinjau kembali perbedaan kompartemen hepar vs otot atau sifat ireversibilitas enzim dehidrogenase.',
    'Satu di antara node diagram di bawah menyatakan peristiwa enzimatik yang tidak pernah terjadi di dalam sel tubuh manusia.',
    'Ketuk bagian kotak yang keliru pada diagram, lalu pilih pembetulan ilmiah yang tepat di bawahnya!'
  ];

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setPhase('MANIPULATION');
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');

    const node = activeCase.diagramNodes.find(n => n.nodeId === selectedNodeId);
    const correction = activeCase.correctionOptions.find(c => c.id === selectedCorrectionId);

    const correct = Boolean(node?.isError && correction?.isCorrect);
    setIsCorrect(correct);

    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setSelectedNodeId(null);
    setSelectedCorrectionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('PREDICTION');
  };

  const handleNextCase = () => {
    if (currentCaseIndex < ERROR_CASES.length - 1) {
      setCurrentCaseIndex(prev => prev + 1);
      handleReset();
    }
  };

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex(prev => prev - 1);
      handleReset();
    }
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title={`Aktivitas Interaktif 12: Deteksi & Koreksi Kesalahan Ilmiah (${currentCaseIndex + 1}/${ERROR_CASES.length})`}
        instruction="Sebuah diagram jalur sengaja dibuat mengandung satu kesalahan biokimiawi fatal. Ketuk bagian node diagram yang keliru, lalu pilih penjelasan pembetulannya yang tepat!"
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
        canCheck={selectedNodeId !== null && selectedCorrectionId !== null}
        explanation={activeCase.scientificSummary}
      />

      {/* Navigasi Antar Kasus */}
      <div className="flex items-center justify-between bg-white border border-[#E5E2D9] px-4 py-2.5 rounded-2xl">
        <span className="text-xs font-bold text-stone-800">
          {activeCase.title}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevCase}
            disabled={currentCaseIndex === 0}
            className="px-2.5 py-1 rounded-lg border text-xs font-semibold disabled:opacity-30 cursor-pointer"
          >
            ← Kasus Sebelumnya
          </button>
          <button
            type="button"
            onClick={handleNextCase}
            disabled={currentCaseIndex >= ERROR_CASES.length - 1}
            className="px-2.5 py-1 rounded-lg border text-xs font-semibold disabled:opacity-30 cursor-pointer"
          >
            Kasus Berikutnya →
          </button>
        </div>
      </div>

      {/* 1. DIAGRAM ALUR DENGAN KESALAHAN TERSEMBUNYI */}
      <div className="bg-[#FAF8F5] border border-[#E5E2D9] rounded-2xl p-5 space-y-4">
        <div className="text-xs text-stone-600 leading-relaxed">
          {activeCase.context}
        </div>

        <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3">
          <span className="text-[10px] font-bold text-stone-500 uppercase block tracking-wider">
            Ketuk Kotak Node yang Menurut Anda Salah:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {activeCase.diagramNodes.map((node, idx) => {
              const isSelected = selectedNodeId === node.nodeId;
              const isChecked = isAnswerChecked;
              const isNodeErroneous = node.isError;

              return (
                <React.Fragment key={node.nodeId}>
                  <button
                    type="button"
                    onClick={() => handleSelectNode(node.nodeId)}
                    className={`p-3 rounded-xl border text-xs text-center transition-all cursor-pointer max-w-xs ${
                      isSelected
                        ? isChecked
                          ? isNodeErroneous
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400'
                            : 'bg-red-100 border-red-500 text-red-950'
                          : 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                        : 'bg-[#FAF8F5] hover:bg-stone-100 border-stone-300 text-stone-800'
                    }`}
                  >
                    <span className="block font-bold">{node.label}</span>
                    {isChecked && isSelected && node.errorReason && (
                      <span className="text-[10px] text-red-700 font-semibold block mt-1">
                        ⚠️ {node.errorReason}
                      </span>
                    )}
                  </button>

                  {idx < activeCase.diagramNodes.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 2. PILIHAN KOREKSI ILMIAH */}
        {selectedNodeId && (
          <div className="p-4 bg-white rounded-xl border border-amber-200 space-y-2 animate-scale-in">
            <span className="text-xs font-bold text-stone-900 block">
              Pilih Solusi / Koreksi yang Tepat untuk Memperbaiki Kesalahan:
            </span>

            <div className="space-y-2">
              {activeCase.correctionOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedCorrectionId(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedCorrectionId === opt.id
                      ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-1 ring-amber-400'
                      : 'bg-[#FAF8F5] hover:bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-amber-800">{opt.id}.</span>
                    <span>{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
