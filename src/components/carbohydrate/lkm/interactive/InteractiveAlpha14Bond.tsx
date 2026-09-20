/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight,
  Info,
  Layers
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

export const InteractiveAlpha14Bond: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [selectedDonorCarbon, setSelectedDonorCarbon] = useState<number | null>(null);
  const [selectedAcceptorCarbon, setSelectedAcceptorCarbon] = useState<number | null>(null);
  const [isBondFormed, setIsBondFormed] = useState<boolean>(false);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Ikatan rantai linear glikogen adalah ikatan α(1→4) glikosidik.',
    'Karbon C1 anomerik dari glukosa baru (donor) menyerang gugus hidroksil pada C4 dari residu terminal rantai (akseptor).',
    'Pilih C1 pada molekul glukosa kiri dan C4 pada molekul glukosa kanan untuk membentuk jembatan oksigen α(1→4)!'
  ];

  const handleSelectDonor = (c: number) => {
    setSelectedDonorCarbon(c);
    setPhase('MANIPULATION');
  };

  const handleSelectAcceptor = (c: number) => {
    setSelectedAcceptorCarbon(c);
    setPhase('MANIPULATION');
  };

  const handleFormBond = () => {
    if (selectedDonorCarbon === 1 && selectedAcceptorCarbon === 4) {
      setIsBondFormed(true);
    }
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const correct = selectedDonorCarbon === 1 && selectedAcceptorCarbon === 4;
    setIsCorrect(correct);
    if (correct) {
      setIsBondFormed(true);
    } else {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setSelectedDonorCarbon(null);
    setSelectedAcceptorCarbon(null);
    setIsBondFormed(false);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Tahap 5 Interaktif: Pemanjangan Rantai Linier & Pembentukan Ikatan α(1→4)"
        instruction="Glikogen sintase mengkatalisis elongasi rantai linear. Pilih karbon anomerik C1 pada glukosa baru (donor) dan karbon C4 pada residu ujung nonreduksi (akseptor). Amati kondensasi jembatan oksigen ikatan α(1→4) glikosidik."
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
        canCheck={selectedDonorCarbon !== null && selectedAcceptorCarbon !== null}
        explanation="Glikogen sintase mentransfer residu glukosil dari UDP-glukosa ke gugus hidroksil pada atom karbon C4 dari rantai glikogen yang sedang memanjang (ujung nonreduksi). Ikatan yang terbentuk adalah ikatan eter kovalen α(1→4) glikosidik, dengan konfigurasi alfa (ikatan C1-O mengarah ke bawah bidang cincin heksosa). Konfigurasi alfa ini memberikan kelengkungan alami pada rantai polisakarida sehingga membentuk struktur heliks kompak, sangat berbeda dengan ikatan β(1→4) pada selulosa yang menghasilkan serat planar kaku."
      />

      {/* TAHAP MANIPULASI IKATAN ALFA-1,4 */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <span className="text-xs font-bold text-stone-900">
            Enzim: Glikogen Sintase (Mengonsumsi UDP-Glukosa)
          </span>
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full">
            {isBondFormed ? '✓ Ikatan α(1→4) Terbentuk + UDP Bebas' : 'Pilih Pasangan Karbon'}
          </span>
        </div>

        {/* Visualisasi Dua Residu Glukosa & Pemilihan Karbon */}
        <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[260px]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl relative">
            
            {/* GLUKOSA DONOR BARU (DARI UDP-GLUKOSA) */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                <span className="text-xs font-bold text-stone-800">Glukosa Baru (Donor)</span>
                <span className="text-[10px] text-amber-700 font-mono font-bold">Terikat UDP</span>
              </div>
              <p className="text-[11px] text-stone-500">Pilih karbon anomerik yang akan menyumbangkan unit glukosil:</p>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleSelectDonor(c)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDonorCarbon === c
                        ? c === 1
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400'
                          : 'bg-red-100 border-red-500 text-red-950 font-bold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">C{c}</div>
                    <div className="text-[9px] text-stone-500">{c === 1 ? 'Anomerik' : `Ring C${c}`}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* GLUKOSA AKSEPTOR (UJUNG NONREDUKSI RANTAI) */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                <span className="text-xs font-bold text-stone-800">Residu Terminal (Akseptor)</span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold">Ujung Nonreduksi</span>
              </div>
              <p className="text-[11px] text-stone-500">Pilih karbon dengan gugus -OH bebas penerima ikatan:</p>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleSelectAcceptor(c)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedAcceptorCarbon === c
                        ? c === 4
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400'
                          : 'bg-red-100 border-red-500 text-red-950 font-bold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">C{c}</div>
                    <div className="text-[9px] text-stone-500">{c === 4 ? 'Target -OH' : `Ring C${c}`}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Animasi Hubungan Ikatan */}
          {isBondFormed && (
            <div className="mt-6 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-2 animate-scale-in w-full max-w-xl">
              <div className="flex items-center justify-center gap-2 text-emerald-900 font-serif font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Jembatan Oksigen Ikatan α(1→4) Glikosidik Berhasil Terbentuk!</span>
              </div>
              <div className="font-mono text-xs text-emerald-800 font-bold">
                [Glukosa-Baru]—C1—O—C4—[Rantai Glikogen] + UDP + H⁺
              </div>
              <p className="text-[11px] text-emerald-900/80">
                Glikogen sintase memanjangkan rantai hingga panjang polimer mencapai ≥11 residu, yang kemudian menjadi substrat bagi enzim percabangan.
              </p>
            </div>
          )}

          {!isBondFormed && selectedDonorCarbon && selectedAcceptorCarbon && (
            <div className="mt-4 text-xs font-semibold text-stone-700">
              Pasangan terpilih: <span className="font-mono font-bold">Donor C{selectedDonorCarbon}</span> dan <span className="font-mono font-bold">Akseptor C{selectedAcceptorCarbon}</span>. Tekan <strong>Periksa Jawaban</strong> di atas untuk memvalidasi ikatan!
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
