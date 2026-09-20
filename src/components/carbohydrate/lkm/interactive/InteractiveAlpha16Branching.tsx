/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GitBranch, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Scissors, 
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

export const InteractiveAlpha16Branching: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [selectedSegmentCut, setSelectedSegmentCut] = useState<boolean>(false);
  const [targetBranchCarbon, setTargetBranchCarbon] = useState<number | null>(null);
  const [isBranched, setIsBranched] = useState<boolean>(false);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Enzim percabangan (amylo-(1,4→1,6)-transglycosylase) memotong fragmen terminal sekitar 6–7 residu dari rantai yang panjangnya minimal 11 residu.',
    'Fragmen ini dipindahkan ke gugus hidroksil pada atom Karbon C6 dari residu glukosa internal yang lebih ke dalam.',
    'Titik cabang harus membentuk ikatan α(1→6) glikosidik dan berjarak minimal 4 residu dari cabang yang sudah ada.'
  ];

  const handleCutSegment = () => {
    setSelectedSegmentCut(true);
    setPhase('MANIPULATION');
  };

  const handleAttachToC6 = (carbonNum: number) => {
    setTargetBranchCarbon(carbonNum);
    if (selectedSegmentCut && carbonNum === 6) {
      setIsBranched(true);
    }
    setPhase('MANIPULATION');
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const correct = selectedSegmentCut && targetBranchCarbon === 6;
    setIsCorrect(correct);
    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setSelectedSegmentCut(false);
    setTargetBranchCarbon(null);
    setIsBranched(false);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Tahap 6 Interaktif: Pembentukan Percabangan α(1→6) oleh Branching Enzyme"
        instruction="Glikogen memerlukan struktur bercabang rapat. Potong segmen terminal (residu 5-11) dengan menekan tombol Gunting, lalu tempelkan ke atom C6 residu internal. Amati pelipatgandaan ujung nonreduksi dari 1 menjadi 2!"
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
        canCheck={selectedSegmentCut && targetBranchCarbon !== null}
        explanation="Enzim percabangan (amilo-α(1,4→1,6)-transglukosilase) memutus ikatan α(1→4) pada rantai glikogen yang telah mencapai panjang minimal 11 residu, memindahkan oligomer terminal sepanjang 6–7 residu, dan menyambungkannya ke atom C6-OH residu glukosa internal melalui ikatan kovalen α(1→6) glikosidik. Akibat biologis krusial: Setiap pembentukan 1 titik cabang menambah 1 ujung nonreduksi baru tanpa menambah molekul primer baru. Dengan demikian, struktur pohon sferis glikogen memiliki ribuan ujung nonreduksi yang memungkinkan degradasi fosforolitik super cepat saat otot atau hati membutuhkan mobilisasi glukosa mendadak."
      />

      {/* TAHAP MANIPULASI PERCABANGAN */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <span className="text-xs font-bold text-stone-900">
            Enzim: Amilo-(1,4→1,6)-Transglukosilase (Branching Enzyme)
          </span>
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full">
            {isBranched ? '✓ 2 Ujung Nonreduksi Aktif' : '1 Ujung Nonreduksi (Linier)'}
          </span>
        </div>

        {/* Kontrol Manipulasi */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCutSegment}
            disabled={selectedSegmentCut}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSegmentCut
                ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-xs'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>1. Potong Segmen Terminal 6-Residu</span>
          </button>

          <span className="text-stone-300">|</span>

          <span className="text-xs text-stone-600 font-medium">
            2. Tempelkan ke Karbon Internal:
          </span>

          {[1, 4, 6].map(c => (
            <button
              key={c}
              type="button"
              onClick={() => handleAttachToC6(c)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                targetBranchCarbon === c
                  ? c === 6
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                    : 'bg-red-100 border-red-500 text-red-950'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              Karbon C{c} {c === 6 ? '(-CH₂OH)' : ''}
            </button>
          ))}
        </div>

        {/* Visualisasi Rantai: Linier vs Bercabang */}
        <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[260px]">
          
          {!isBranched ? (
            /* Tampilan Sebelum Percabangan: Rantai Linier 11 Residu */
            <div className="space-y-4 w-full">
              <div className="text-xs font-mono font-bold text-stone-500 text-center">
                Rantai Linier 11 Residu: Hanya Ada 1 Ujung Nonreduksi
              </div>

              <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-4">
                {Array.from({ length: 11 }).map((_, idx) => {
                  const isCutBlock = idx >= 5;
                  return (
                    <div
                      key={idx}
                      className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold border transition-all ${
                        selectedSegmentCut && isCutBlock
                          ? 'border-dashed border-amber-500 bg-amber-100 text-amber-900 -translate-y-2 shadow-md'
                          : 'border-stone-300 bg-white text-stone-800'
                      }`}
                    >
                      <span>G{idx + 1}</span>
                      <span className="text-[8px] text-stone-400">α1,4</span>
                    </div>
                  );
                })}
              </div>

              {selectedSegmentCut && (
                <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs text-center font-semibold animate-pulse">
                  Fragmen terminal G6–G11 telah dipotong! Pilih tombol <strong>Karbon C6 (-CH₂OH)</strong> di atas untuk menyambungkannya ke titik cabang internal.
                </div>
              )}
            </div>
          ) : (
            /* Tampilan Setelah Percabangan: Cabang α(1→6) Terbentuk */
            <div className="space-y-6 w-full max-w-xl animate-scale-in">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <GitBranch className="w-4 h-4 text-emerald-700" />
                  Struktur Bercabang α(1→6) Berhasil Dibentuk!
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Total 2 Ujung Nonreduksi
                </span>
              </div>

              {/* Diagram Rantai Utama & Cabang */}
              <div className="relative p-6 bg-white rounded-xl border border-emerald-300">
                {/* Cabang Baru Menjulur ke Atas */}
                <div className="absolute left-32 -top-3 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded mb-1">
                    Cabang Baru α(1→6)
                  </span>
                  <div className="flex items-center gap-1 bg-emerald-50 p-1.5 rounded-lg border border-emerald-300 shadow-2xs">
                    {[6, 7, 8, 9, 10, 11].map(n => (
                      <div key={n} className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        G{n}
                      </div>
                    ))}
                    <span className="text-[9px] font-bold text-emerald-900 ml-1">Ujung #2 ⭐</span>
                  </div>
                  <div className="h-4 w-0.5 bg-emerald-500" />
                </div>

                {/* Rantai Utama Linier */}
                <div className="flex items-center gap-1 pt-12">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div 
                      key={n} 
                      className={`w-9 h-9 rounded flex items-center justify-center text-[10px] font-bold border ${
                        n === 3 
                          ? 'border-emerald-500 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-400' 
                          : 'border-stone-300 bg-stone-50 text-stone-800'
                      }`}
                    >
                      {n === 3 ? 'C3(C6)' : `G${n}`}
                    </div>
                  ))}
                  <span className="text-[9px] font-bold text-stone-800 ml-2">Ujung #1 ⭐</span>
                </div>
              </div>

              {/* Perbandingan Kuantitatif Ujung Nonreduksi */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-100 text-stone-800 border border-stone-200">
                  <div className="font-bold text-stone-900">Sebelum Percabangan</div>
                  <div className="text-xl font-bold font-mono text-stone-700 mt-1">1 Titik Akses</div>
                  <p className="text-[11px] text-stone-500 mt-0.5">Hanya 1 molekul fosforilase yang dapat memecah glikogen secara berurutan.</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-300">
                  <div className="font-bold text-emerald-900">Setelah Percabangan</div>
                  <div className="text-xl font-bold font-mono text-emerald-700 mt-1">2 Titik Akses</div>
                  <p className="text-[11px] text-emerald-800 mt-0.5">Kecepatan mobilisasi energi berlipat ganda karena enzim bekerja di kedua ujung simultan.</p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
