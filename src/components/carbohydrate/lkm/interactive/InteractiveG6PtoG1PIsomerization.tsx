/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Layers,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

export const InteractiveG6PtoG1PIsomerization: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [predictionSelected, setPredictionSelected] = useState<string | null>(null);

  // Posisi fosfat: 'C6' (awal/G6P), 'C1_C6' (intermediate bisphosphate), 'C1' (produk akhir/G1P)
  const [phosphatePosition, setPhosphatePosition] = useState<'C6' | 'C1_C6' | 'C1'>('C6');
  const [selectedPhosphateToMove, setSelectedPhosphateToMove] = useState<boolean>(false);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Enzim fosfoglukomutase menggeser gugus fosforil antar posisi di molekul heksosa yang sama.',
    'Sebelum fosfat di C6 dilepaskan, enzim fosfo-serin menyumbangkan fosfat ke C1 membentuk zat antara Glukosa-1,6-bisfosfat.',
    'Pindahkan fosfat dari C6 menuju C1 anomerik agar heksosa siap dihubungkan dengan nukleotida UTP!'
  ];

  const handleTransferToC1 = () => {
    setSelectedPhosphateToMove(false);
    // Simulasikan pergerakan melalui zat antara
    setPhosphatePosition('C1_C6');
    setTimeout(() => {
      setPhosphatePosition('C1');
    }, 600);
    setPhase('MANIPULATION');
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const correct = phosphatePosition === 'C1' && predictionSelected === 'A';
    setIsCorrect(correct);
    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setPhosphatePosition('C6');
    setSelectedPhosphateToMove(false);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Tahap 2 Interaktif: Isomerisasi G6P Menjadi G1P (Mobilisasi ke Karbon Anomerik)"
        instruction="Prediksikan mengapa gugus fosfat harus dipindahkan ke C1. Klik gugus fosfat di C6 lalu ketuk C1 (atau seret) untuk memindahkan gugus fosfat melalui zat antara Glukosa-1,6-bisfosfat hingga terbentuk Glukosa-1-Fosfat (G1P)."
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
        canCheck={phosphatePosition === 'C1' && predictionSelected !== null}
        explanation="Reaksi isomerisasi ini dikatalisis oleh enzim fosfoglukomutase secara reversibel. Enzim memiliki residu fosfoseril aktif (Ser-OH terfosforilasi). Enzim pertama mendonasikan fosfatnya ke C1 glukosa membentuk senyawa antara Glukosa-1,6-bisfosfat, kemudian mengambil kembali fosfat pada C6 ke residu serin enzim, menghasilkan Glukosa-1-fosfat (G1P). Alasan esensial: Karbon C1 adalah satu-satunya karbon anomerik yang memiliki reaktivitas hemiasetal untuk menyerang gugus α-fosforil UTP pada tahap biosintesis berikutnya; C6 tidak memiliki sifat elektrofilik anomerik tersebut."
      />

      {/* 1. PREDIKSI KONSEPTUAL */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase">
          <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-[10px] font-mono">1</span>
          <span>Tahap Prediksi Mahasiswa: Alasan Biologis Pemindahan Fosfat ke C1</span>
        </div>
        <p className="text-xs text-stone-600">
          Mengapa gugus fosfat harus dipindahkan dari posisi C6 ke C1 untuk sintesis glikogen?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            {
              id: 'A',
              text: 'Karbon C1 adalah karbon anomerik yang akan membentuk ikatan glikosidik dengan UDP dan rantai glikogen. C6 tidak dapat membentuk ikatan anomerik tersebut.'
            },
            {
              id: 'B',
              text: 'Agar molekul glukosa menjadi lebih kecil dan dapat menembus matriks mitokondria.'
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
                  ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
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

      {/* 2. MANIPULASI PEMINDAHAN FOSFAT */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="text-xs font-bold text-stone-900">
            Katalisis Enzim: Fosfoglukomutase (dengan kofaktor Glukosa-1,6-bisfosfat)
          </div>
          <div className="text-xs font-mono font-bold text-stone-600">
            {phosphatePosition === 'C6' && 'Status: Glukosa-6-Fosfat (G6P)'}
            {phosphatePosition === 'C1_C6' && 'Status: Zat Antara [Glukosa-1,6-Bisfosfat]'}
            {phosphatePosition === 'C1' && 'Status: Glukosa-1-Fosfat (G1P) — SELESAI'}
          </div>
        </div>

        {/* Diagram Interaktif Perpindahan Fosfat */}
        <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md h-52">
            <svg className="w-full h-full" viewBox="0 0 360 200">
              {/* Cincin Heksagonal Piranosa */}
              <polygon 
                points="180,50 250,85 250,145 180,180 110,145 110,85" 
                fill="#FFFDF9" 
                stroke="#78716C" 
                strokeWidth="3"
              />
              <circle cx="225" cy="65" r="14" fill="#EF4444" />
              <text x="225" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">O</text>

              {/* Lengan C6 */}
              <line x1="110" y1="85" x2="80" y2="40" stroke="#78716C" strokeWidth="3" />

              {/* Panah Indikator Jalur Mutase */}
              <path 
                d="M 65 30 Q 180 -10 270 95" 
                fill="none" 
                stroke="#F59E0B" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
              />
            </svg>

            {/* POSISI C6 */}
            <div className="absolute left-6 top-2 text-center">
              <div
                onClick={() => {
                  if (phosphatePosition === 'C6') {
                    setSelectedPhosphateToMove(true);
                  }
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  phosphatePosition === 'C6' || phosphatePosition === 'C1_C6'
                    ? selectedPhosphateToMove
                      ? 'border-amber-500 bg-amber-100 text-amber-950 ring-2 ring-amber-400 scale-105'
                      : 'border-amber-400 bg-amber-50 text-amber-900 shadow-xs'
                    : 'border-stone-200 bg-stone-100 text-stone-400'
                }`}
              >
                <div className="text-xs font-mono font-bold">C6 (-CH₂OH)</div>
                <div className="text-[10px]">
                  {(phosphatePosition === 'C6' || phosphatePosition === 'C1_C6') ? (
                    <span className="font-bold text-amber-700">℗ Gugus Fosfat</span>
                  ) : (
                    <span className="text-stone-400">-OH Bebas</span>
                  )}
                </div>
              </div>
              {phosphatePosition === 'C6' && (
                <div className="text-[9px] text-amber-600 mt-1">
                  {selectedPhosphateToMove ? '👉 Ketuk Karbon C1 di kanan' : 'Ketuk untuk Pindahkan'}
                </div>
              )}
            </div>

            {/* POSISI C1 (ANOMERIK) */}
            <div className="absolute right-6 top-20 text-center">
              <div
                onClick={() => {
                  if (selectedPhosphateToMove || phosphatePosition === 'C6') {
                    handleTransferToC1();
                  }
                }}
                className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                  phosphatePosition === 'C1' || phosphatePosition === 'C1_C6'
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold ring-2 ring-emerald-400 scale-105'
                    : selectedPhosphateToMove
                    ? 'border-amber-500 bg-amber-100 text-amber-900 ring-2 ring-amber-400 animate-bounce'
                    : 'border-stone-300 bg-white hover:border-amber-400 text-stone-800'
                }`}
              >
                <div className="text-xs font-mono font-bold">C1 (Karbon Anomerik)</div>
                <div className="text-[10px]">
                  {phosphatePosition === 'C1' || phosphatePosition === 'C1_C6' ? (
                    <span className="font-bold text-emerald-700">✓ ℗ Fosfat Terikat</span>
                  ) : (
                    <span className="text-stone-500">Target Pemindahan</span>
                  )}
                </div>
              </div>
              {phosphatePosition !== 'C1' && (
                <div className="text-[9px] text-stone-500 mt-1">Klik untuk tempelkan ke C1</div>
              )}
            </div>

          </div>

          {/* Umpan Balik Teks Langkah */}
          <div className="mt-4 text-xs font-medium text-stone-700">
            {phosphatePosition === 'C1' ? (
              <span className="text-emerald-700 font-bold">
                ✓ Fosfat kini berada di C1 anomerik! Glukosa-1-Fosfat (G1P) siap bereaksi dengan UTP.
              </span>
            ) : selectedPhosphateToMove ? (
              <span className="text-amber-800 font-semibold animate-pulse">
                Fosfat di C6 telah dipilih. Klik kotak Karbon C1 di kanan untuk memicu perpindahan fosfoglukomutase.
              </span>
            ) : (
              <span className="text-stone-500">
                Klik kotak C6 untuk memilih gugus fosfat yang akan digeser.
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
