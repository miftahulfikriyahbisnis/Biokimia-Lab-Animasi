/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

export const InteractiveGlucosePhosphorylation: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [predictedCarbon, setPredictedCarbon] = useState<number | null>(null);
  
  // State interaksi
  const [selectedPhosphateSource, setSelectedPhosphateSource] = useState<boolean>(false);
  const [targetedCarbon, setTargetedCarbon] = useState<number | null>(null);
  const [isTransferred, setIsTransferred] = useState<boolean>(false);
  
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mistakeCount, setMistakeCount] = useState<number>(0);

  const hints = [
    'Fosforilasi glukosa oleh enzim heksokinase/glukokinase menargetkan gugus hidroksil primer (-CH₂OH) yang paling mudah diakses secara sterik.',
    'Karbon C1 adalah karbon anomerik, sedangkan C6 adalah karbon ekstrasiklik (-CH₂OH) yang berada di luar cincin piranosa.',
    'Seret atau ketuk gugus fosfat (Pi) dari ATP dan tempelkan tepat pada atom C6 glukosa!'
  ];

  const handleDragStartPhosphate = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'ATP_GAMMA_PHOSPHATE');
    setSelectedPhosphateSource(true);
  };

  const handleDropOnCarbon = (carbonNum: number) => {
    setTargetedCarbon(carbonNum);
    setSelectedPhosphateSource(false);
    setPhase('MANIPULATION');
    if (carbonNum === 6) {
      setIsTransferred(true);
    } else {
      setMistakeCount(prev => prev + 1);
      if (mistakeCount >= 1 && hintIndex < 2) {
        setHintIndex(prev => prev + 1);
      }
    }
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const correct = targetedCarbon === 6 && predictedCarbon === 6;
    setIsCorrect(correct);
    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setTargetedCarbon(null);
    setSelectedPhosphateSource(false);
    setIsTransferred(false);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Tahap 1 Interaktif: Fosforilasi Glukosa (Reaksi Jebakan Metabolik)"
        instruction="Prediksikan atom karbon mana yang menerima fosfat dari ATP. Seret gugus fosfat dari ATP ke karbon C6 (atau ketuk tombol fosfat lalu ketuk karbon C6). Amati perubahan ATP menjadi ADP dan terbentuknya Glukosa-6-Fosfat."
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
        canCheck={targetedCarbon !== null && predictedCarbon !== null}
        explanation="Glukosa bebas yang masuk ke dalam sitosol sel segera difosforilasi pada posisi C6-OH oleh heksokinase (pada sebagian besar jaringan) atau glukokinase (pada hepatosit dan sel beta pankreas). Reaksi ini mengonsumsi 1 molekul ATP (hidrolisis gugus γ-fosfat menjadi ADP) dengan ion Mg²⁺ sebagai kofaktor esensial penstabil muatan negatif. Muatan ionik -2 dari gugus fosfat pada pH fisiologis membuat G6P terperangkap secara permanen di sitoplasma karena membran lipid bilipid tidak permeabel terhadap anion poliatomik bermuatan tinggi dan tidak dikenali oleh transporter pasif GLUT."
      />

      {/* 1. TAHAP PREDIKSI */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase">
          <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-[10px] font-mono">1</span>
          <span>Tahap Prediksi Mahasiswa: Karbon Penerima Gugus Fosforil</span>
        </div>
        <p className="text-xs text-stone-600">
          Sebelum memindahkan gugus fosfat, diskusikan bersama kelompok Anda: Atom karbon nomor berapa pada cincin glukosa yang difosforilasi pada tahap inisiasi ini?
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map(cNum => (
            <button
              key={cNum}
              type="button"
              onClick={() => {
                setPredictedCarbon(cNum);
                setPhase('MANIPULATION');
              }}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                predictedCarbon === cNum
                  ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              <div className="text-xs font-mono font-bold">Karbon C{cNum}</div>
              <div className="text-[10px] text-stone-500">
                {cNum === 1 ? 'Anomerik' : cNum === 6 ? '-CH₂OH' : `Ring C${cNum}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAHAP MANIPULASI: MOLEKUL ATP & CINCIN GLUKOSA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Donor Energi: Molekul ATP */}
        <div className="md:col-span-4 bg-[#FAF8F5] border border-[#E5E2D9] rounded-2xl p-4 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                Donor Energi: {isTransferred ? 'ADP + H⁺' : 'ATP⁴⁻ (Adenosin Trifosfat)'}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                isTransferred ? 'bg-stone-200 text-stone-700' : 'bg-amber-100 text-amber-900'
              }`}>
                {isTransferred ? 'Telah Mentransfer Pi' : 'Tersedia 1 ATP'}
              </span>
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-stone-200 text-center space-y-2">
              <div className="text-xs font-mono text-stone-700 font-bold">
                Adenosin — ℗α — ℗β {isTransferred ? '' : '— ℗γ'}
              </div>
              <div className="text-[11px] text-stone-500">
                {isTransferred 
                  ? 'Gugus γ-fosfat telah terlepas. ATP berubah menjadi Adenosin Difosfat (ADP).'
                  : 'Gugus γ-fosfat memiliki ikatan fosfoanhidrida berenergi tinggi (ΔG°′ hidrolisis ≈ -30.5 kJ/mol).'}
              </div>
            </div>
          </div>

          {/* Tombol / Objek Drag Fosfat */}
          {!isTransferred ? (
            <div
              draggable
              onDragStart={handleDragStartPhosphate}
              onClick={() => setSelectedPhosphateSource(!selectedPhosphateSource)}
              className={`p-3 rounded-xl border-2 border-dashed text-center transition-all cursor-grab active:cursor-grabbing select-none ${
                selectedPhosphateSource
                  ? 'border-amber-500 bg-amber-100 text-amber-950 font-bold ring-2 ring-amber-400 animate-pulse'
                  : 'border-amber-300 bg-amber-50/70 hover:bg-amber-100/70 text-amber-900'
              }`}
            >
              <div className="text-xs font-bold flex items-center justify-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">℗</span>
                <span>Gugus γ-Fosfat (Pi)</span>
              </div>
              <div className="text-[10px] text-amber-700/80 mt-0.5">
                {selectedPhosphateSource ? '👉 Ketuk Karbon C6 Glukosa di samping' : 'Seret atau ketuk untuk memilih'}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-center text-xs font-bold">
              ✓ Fosfat berhasil ditransfer ke substrat glukosa!
            </div>
          )}
        </div>

        {/* Akseptor: Cincin Glukosa Piranosa */}
        <div className="md:col-span-8 bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-xs font-bold text-stone-900">
              Struktur Substrat: {isTransferred ? 'Glukosa-6-Fosfat (G6P²⁻)' : 'D-Glukosa Bebas (C₆H₁₂O₆)'}
            </span>
            <span className="text-[11px] text-stone-500">
              {isTransferred ? 'Status: Terperangkap dalam Sel' : 'Status: Dapat Berdifusi Lewat GLUT'}
            </span>
          </div>

          {/* Diagram Interaktif Karbon C1 - C6 Glukosa */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[220px]">
            <div className="relative w-full max-w-sm h-48">
              {/* Representasi Cincin Heksagonal Interaktif */}
              <svg className="w-full h-full" viewBox="0 0 320 200">
                {/* Ikatan Cincin Piranosa */}
                <polygon 
                  points="160,50 230,85 230,145 160,180 90,145 90,85" 
                  fill="#FFFDF9" 
                  stroke="#78716C" 
                  strokeWidth="3"
                />
                {/* Atom Oksigen Cincin (Antara C5 dan C1) */}
                <circle cx="205" cy="65" r="14" fill="#EF4444" />
                <text x="205" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">O</text>

                {/* Ikatan C5 ke C6 */}
                <line x1="90" y1="85" x2="60" y2="40" stroke="#78716C" strokeWidth="3" />

                {/* Garis koneksi fosfat jika terpasang ke C6 */}
                {isTransferred && (
                  <line x1="60" y1="40" x2="30" y2="25" stroke="#F59E0B" strokeWidth="3" strokeDasharray="2 2" />
                )}
              </svg>

              {/* Node Karbon Interaktif */}
              
              {/* C1 (Anomerik) */}
              <button
                type="button"
                onClick={() => handleDropOnCarbon(1)}
                className={`absolute right-12 top-20 w-9 h-9 rounded-full flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer shadow-xs ${
                  targetedCarbon === 1 ? 'bg-red-500 text-white ring-2 ring-red-300' : 'bg-white border border-stone-300 hover:border-amber-400 text-stone-800'
                }`}
              >
                <span>C1</span>
              </button>

              {/* C2 */}
              <button
                type="button"
                onClick={() => handleDropOnCarbon(2)}
                className={`absolute right-12 bottom-8 w-9 h-9 rounded-full flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer shadow-xs ${
                  targetedCarbon === 2 ? 'bg-red-500 text-white ring-2 ring-red-300' : 'bg-white border border-stone-300 hover:border-amber-400 text-stone-800'
                }`}
              >
                <span>C2</span>
              </button>

              {/* C3 */}
              <button
                type="button"
                onClick={() => handleDropOnCarbon(3)}
                className={`absolute left-32 bottom-0 w-9 h-9 rounded-full flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer shadow-xs ${
                  targetedCarbon === 3 ? 'bg-red-500 text-white ring-2 ring-red-300' : 'bg-white border border-stone-300 hover:border-amber-400 text-stone-800'
                }`}
              >
                <span>C3</span>
              </button>

              {/* C4 */}
              <button
                type="button"
                onClick={() => handleDropOnCarbon(4)}
                className={`absolute left-14 bottom-8 w-9 h-9 rounded-full flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer shadow-xs ${
                  targetedCarbon === 4 ? 'bg-red-500 text-white ring-2 ring-red-300' : 'bg-white border border-stone-300 hover:border-amber-400 text-stone-800'
                }`}
              >
                <span>C4</span>
              </button>

              {/* C5 */}
              <button
                type="button"
                onClick={() => handleDropOnCarbon(5)}
                className={`absolute left-14 top-20 w-9 h-9 rounded-full flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer shadow-xs ${
                  targetedCarbon === 5 ? 'bg-red-500 text-white ring-2 ring-red-300' : 'bg-white border border-stone-300 hover:border-amber-400 text-stone-800'
                }`}
              >
                <span>C5</span>
              </button>

              {/* C6 (Target Fosfat -CH2OH) */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDropOnCarbon(6);
                }}
                onClick={() => {
                  if (selectedPhosphateSource || !isTransferred) {
                    handleDropOnCarbon(6);
                  }
                }}
                className={`absolute left-6 top-3 p-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                  targetedCarbon === 6
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold ring-2 ring-emerald-400 scale-105'
                    : selectedPhosphateSource
                    ? 'border-amber-500 bg-amber-100 text-amber-900 ring-2 ring-amber-300 animate-bounce'
                    : 'border-stone-300 bg-white hover:border-amber-400 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                  <span>C6 (-CH₂OH)</span>
                  {isTransferred && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[10px] animate-pulse">
                      -O-℗O₃²⁻
                    </span>
                  )}
                </div>
                <div className="text-[9px] text-stone-500">Target Hidroksil Primer</div>
              </div>

            </div>

            {/* Status Target Terpilih */}
            <div className="mt-2 text-xs text-stone-700">
              {targetedCarbon === null ? (
                <span className="text-stone-400 italic">Belum ada karbon yang dipilih atau menerima gugus fosfat.</span>
              ) : targetedCarbon === 6 ? (
                <span className="text-emerald-700 font-bold">
                  ✓ Karbon C6 berhasil menerima fosfat! Glukosa kini menjadi Glukosa-6-Fosfat (G6P).
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  ⚠️ Anda memilih Karbon C{targetedCarbon}. Fosforilasi inisiasi seluler secara enzimatik terjadi pada gugus alkohol primer C6!
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
