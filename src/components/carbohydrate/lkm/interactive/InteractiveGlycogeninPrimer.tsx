/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Layers,
  Award,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

export const InteractiveGlycogeninPrimer: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [primerChainLength, setPrimerChainLength] = useState<number>(0);
  const [predictionSelected, setPredictionSelected] = useState<string | null>(null);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Glikogenin adalah protein glikosiltransferase berbobot 37 kDa dengan kemampuan autokatalitik (menempelkan glukosa ke dirinya sendiri).',
    'Glikogenin mengikat residu glukosa pertama pada gugus fenol -OH dari asam amino Tirosin-194 (Tyr-194).',
    'Rantai primer minimal harus mencapai 8 residu glukosil agar dapat dikenali dan diambil alih oleh enzim glikogen sintase!'
  ];

  const handleAddGlucoseUnit = () => {
    if (primerChainLength < 8) {
      setPrimerChainLength(prev => prev + 1);
      setPhase('MANIPULATION');
    }
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const correct = primerChainLength === 8 && predictionSelected === 'A';
    setIsCorrect(correct);
    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setPrimerChainLength(0);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Tahap 4 Interaktif: Pembentukan Primer oleh Protein Glikogenin"
        instruction="Glikogenin adalah protein inti yang memulai sintesis tanpa membutuhkan enzim lain. Tambahkan residu glukosa satu per satu dari UDP-glukosa ke gugus Tyr-194 hingga primer mencapai panjang 8 residu. Analisis mengapa glikogen sintase tidak dapat memulai dari nol (de novo)."
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
        canCheck={primerChainLength === 8 && predictionSelected !== null}
        explanation="Enzim glikogen sintase memiliki situs aktif yang mutlak memerlukan rantai oligoglukosil minimal 4–8 residu sebagai akseptor ikatan glikosidik pada ujung C4-OH nonreduksinya; ia sama sekali tidak mampu mengikat dua molekul glukosa monomer bebas secara bersamaan dari nol (de novo). Protein glikogenin bertindak sebagai inisiator unik: ia mengikat residu glukosa pertama dari UDP-glukosa ke gugus hidroksil fenil dari rantai samping Tirosin-194 (Tyr-194), kemudian secara autoglikosilasi menyambungkan 7 glukosa berikutnya via ikatan α(1→4) hingga membentuk primer oktamer (8 residu). Pada titik ini, glikogen sintase mengambil alih pemanjangan rantai."
      />

      {/* 1. PERTANYAAN PREDIKSI & ANALISIS */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase">
          <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-[10px] font-mono">1</span>
          <span>Tahap Analisis Ilmiah: Mengapa Glikogen Sintase Tidak Dapat Sintesis De Novo?</span>
        </div>
        <p className="text-xs text-stone-600">
          Diskusikan bersama kelompok Anda: Mengapa sel membutuhkan glikogenin dan tidak bisa mengandalkan glikogen sintase saja sejak molekul glukosa pertama?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            {
              id: 'A',
              text: 'Glikogen sintase hanya dapat mentransfer unit glukosil ke rantai glukan yang sudah ada (memerlukan gugus akseptor C4-OH pada oligomer minimal ~8 residu), tidak dapat menggabungkan 2 glukosa bebas.'
            },
            {
              id: 'B',
              text: 'Karena glikogen sintase berada di membran luar mitokondria, sedangkan glukosa bebas berada di lisosom.'
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

      {/* 2. MANIPULASI PERAKITAN PRIMER GLIKOGENIN */}
      <div className="bg-[#FAF8F5] border border-[#E5E2D9] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <span className="text-xs font-bold text-stone-900">
            Simulasi Autoglikosilasi Glikogenin (Residu Tyr-194 Primer)
          </span>
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Panjang Primer: {primerChainLength} / 8 Residu Glukosil
          </span>
        </div>

        {/* Visualisasi Protein Glikogenin & Rantai Primer */}
        <div className="p-6 bg-white rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[220px]">
          
          <div className="w-full flex items-center justify-start overflow-x-auto py-6 px-4 gap-2">
            {/* Core Protein Glikogenin (Dimer) */}
            <div className="shrink-0 w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-700 text-white flex flex-col items-center justify-center p-2 text-center shadow-md relative">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-200">Protein Inti</span>
              <span className="font-serif font-bold text-sm">Glikogenin</span>
              <span className="text-[9px] text-indigo-300 font-mono mt-1">Homodimer 37 kDa</span>
              
              {/* Anchor Tyr-194 */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-xs flex items-center justify-center text-[8px] font-bold text-stone-900" title="Residu Tirosin-194">
                Y
              </div>
            </div>

            {/* Ikatan Pertama ke Tyr-194 */}
            <div className="shrink-0 text-[10px] font-mono font-bold text-amber-800 px-1">
              — Tyr-194 —
            </div>

            {/* Residu Glukosa yang dirangkai */}
            {Array.from({ length: primerChainLength }).map((_, idx) => (
              <div
                key={idx}
                className="shrink-0 w-12 h-12 rounded-xl bg-amber-50 border-2 border-amber-400 flex flex-col items-center justify-center text-center shadow-2xs animate-scale-in"
              >
                <span className="text-[10px] font-bold text-amber-900">Glc {idx + 1}</span>
                <span className="text-[8px] text-amber-700 font-mono">α(1→4)</span>
              </div>
            ))}

            {/* Slot Kosong Berikutnya */}
            {primerChainLength < 8 && (
              <div className="shrink-0 w-12 h-12 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 flex items-center justify-center text-stone-400 text-xs font-bold">
                +{primerChainLength + 1}
              </div>
            )}
          </div>

          {/* Tombol Manipulasi Penambahan Unit Glukosa */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAddGlucoseUnit}
              disabled={primerChainLength >= 8}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                primerChainLength >= 8
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 ring-2 ring-amber-300/60'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>
                {primerChainLength >= 8
                  ? '✓ Primer Sempurna (8 Residu Tercapai)'
                  : `Tambah Glukosa dari UDP-Glc (Unit #${primerChainLength + 1})`}
              </span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Primer</span>
            </button>
          </div>

          {primerChainLength === 8 && (
            <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Primer 8-residu selesai! Glikogen sintase kini dapat mengenali ujung nonreduksi dan mengambil alih elongasi rantai.
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
