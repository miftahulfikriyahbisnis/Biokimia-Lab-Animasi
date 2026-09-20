/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Lock, 
  Unlock, 
  ArrowUp,
  Activity,
  Layers
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

interface BypassPair {
  id: number;
  roadblockName: string;
  glycolyticEnzyme: string;
  reactionDescription: string;
  correctBypassEnzyme: string;
  options: string[];
}

const BYPASS_PAIRS: BypassPair[] = [
  {
    id: 1,
    roadblockName: 'Rintangan Termodinamika 1 (Langkah Paling Bawah)',
    glycolyticEnzyme: 'Piruvat Kinase (PEP → Piruvat, ΔG°′ = -31.4 kJ/mol)',
    reactionDescription: 'Reaksi fosforilasi tingkat substrat glikolisis yang sangat eksergonik, tidak dapat dibalik secara langsung.',
    correctBypassEnzyme: 'Piruvat Karboksilase + PEPCK (via Oksaloasetat)',
    options: [
      'Piruvat Karboksilase + PEPCK (via Oksaloasetat)',
      'Laktat Dehidrogenase + Enolase',
      'Piruvat Dehidrogenase Kompleks'
    ]
  },
  {
    id: 2,
    roadblockName: 'Rintangan Termodinamika 2 (Langkah Tengah)',
    glycolyticEnzyme: 'PFK-1 (Fruktosa-6-P → Fruktosa-1,6-bisfosfat, ΔG°′ = -14.2 kJ/mol)',
    reactionDescription: 'Reaksi titik komitmen glikolisis yang dikendalikan secara alosterik ketat oleh ATP dan F-2,6-BP.',
    correctBypassEnzyme: 'Fruktosa-1,6-Bisfosfatase (FBPase-1)',
    options: [
      'Fruktosa-1,6-Bisfosfatase (FBPase-1)',
      'Fosfoglukosa Isomerase',
      'Aldolase Terbalik'
    ]
  },
  {
    id: 3,
    roadblockName: 'Rintangan Termodinamika 3 (Langkah Paling Atas)',
    glycolyticEnzyme: 'Heksokinase / Glukokinase (Glukosa → Glukosa-6-P, ΔG°′ = -16.7 kJ/mol)',
    reactionDescription: 'Reaksi penjeratan glukosa oleh ATP. Untuk menghasilkan glukosa bebas darah, gugus fosfat harus dihidrolisis.',
    correctBypassEnzyme: 'Glukosa-6-Fosfatase (Lumen Retikulum Endoplasma Hati)',
    options: [
      'Glukosa-6-Fosfatase (Lumen Retikulum Endoplasma Hati)',
      'Glukosa Sintase Hepar',
      'Fosfoglukomutase'
    ]
  }
];

export const InteractiveGluconeogenesisBypass: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [selectedBypasses, setSelectedBypasses] = useState<Record<number, string>>({
    1: '',
    2: '',
    3: ''
  });

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Tiga reaksi ireversibel glikolisis (langkah 1, 3, dan 10) memiliki nilai ΔG negatif yang sangat besar sehingga membutuhkan enzim pintas (bypass) terpisah.',
    'Bypass 1 memerlukan 2 langkah enzimatik (karboksilasi piruvat menjadi oksaloasetat oleh piruvat karboksilase di mitokondria, lalu fosforilasi & dekarboksilasi menjadi PEP oleh PEPCK di sitosol).',
    'Bypass 2 dan 3 melibatkan enzim fosfatase sederhana yang melepaskan gugus ortofosfat anorganik (Pi) tanpa sintesis ATP.'
  ];

  const handleSelectOption = (pairId: number, val: string) => {
    setSelectedBypasses(prev => ({ ...prev, [pairId]: val }));
    setPhase('MANIPULATION');
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');

    const allCorrect = BYPASS_PAIRS.every(pair => selectedBypasses[pair.id] === pair.correctBypassEnzyme);
    setIsCorrect(allCorrect);

    if (!allCorrect) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setSelectedBypasses({ 1: '', 2: '', 3: '' });
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  const allSelected = Boolean(selectedBypasses[1] && selectedBypasses[2] && selectedBypasses[3]);

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Aktivitas Interaktif 8: Tiga Reaksi Pintas (Bypass) Glukoneogenesis"
        instruction="Glukoneogenesis bukan sekadar pembalikan sederhana glikolisis karena terhalang oleh 3 reaksi ireversibel yang bertindak sebagai 'jalan tertutup'. Pasangkan enzim pintas yang tepat untuk membuka setiap rintangan termodinamika dari bawah ke atas!"
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
        canCheck={allSelected}
        explanation="Tujuh dari sepuluh reaksi glikolisis bersifat reversibel dan dikatalisis oleh enzim yang sama pada glukoneogenesis. Namun, tiga reaksi (heksokinase, PFK-1, dan piruvat kinase) memiliki kesetimbangan termodinamika yang sangat jauh ke arah pemecahan (ΔG°′ negatif besar). Glukoneogenesis mengatasi hal ini dengan menggunakan 4 enzim bypass spesifik: Piruvat Karboksilase (mitokondria) + PEPCK (sitosol) menggantikan piruvat kinase; Fruktosa-1,6-bisfosfatase (FBPase-1) menggantikan PFK-1; dan Glukosa-6-fosfatase (retikulum endoplasma hepar) menggantikan heksokinase/glukokinase untuk melepaskan glukosa bebas darah."
      />

      {/* DIAGRAM INTERAKTIF 3 ROADBLOCK BYPASS */}
      <div className="space-y-4">
        
        {/* Rintangan 3 (Atas): G6P -> Glukosa */}
        <div className={`p-4 rounded-2xl border transition-all ${
          selectedBypasses[3] === BYPASS_PAIRS[2].correctBypassEnzyme && isAnswerChecked
            ? 'bg-emerald-50/70 border-emerald-300'
            : 'bg-white border-stone-200 shadow-2xs'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              {selectedBypasses[3] === BYPASS_PAIRS[2].correctBypassEnzyme && isAnswerChecked ? (
                <Unlock className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-red-500" />
              )}
              <span className="text-xs font-bold text-stone-900">
                Langkah 3 (Paling Atas): Glukosa-6-Fosfat → D-Glukosa Bebas
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold">
              Jalan Tertutup: Heksokinase (Glikolisis)
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-stone-600 font-medium block">
              Pilih Enzim Pintas (Bypass) Glukoneogenesis:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {BYPASS_PAIRS[2].options.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(3, opt)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedBypasses[3] === opt
                      ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panah Alir Naik Reversibel */}
        <div className="flex items-center justify-center gap-2 text-stone-400 text-xs font-mono">
          <ArrowUp className="w-4 h-4 text-emerald-500 animate-bounce" />
          <span>7 Reaksi Reversibel Glikolisis Berjalan Terbalik (Katalisis Enzim Bersama)</span>
          <ArrowUp className="w-4 h-4 text-emerald-500 animate-bounce" />
        </div>

        {/* Rintangan 2 (Tengah): F1,6BP -> F6P */}
        <div className={`p-4 rounded-2xl border transition-all ${
          selectedBypasses[2] === BYPASS_PAIRS[1].correctBypassEnzyme && isAnswerChecked
            ? 'bg-emerald-50/70 border-emerald-300'
            : 'bg-white border-stone-200 shadow-2xs'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              {selectedBypasses[2] === BYPASS_PAIRS[1].correctBypassEnzyme && isAnswerChecked ? (
                <Unlock className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-red-500" />
              )}
              <span className="text-xs font-bold text-stone-900">
                Langkah 2 (Tengah): Fruktosa-1,6-Bisfosfat → Fruktosa-6-Fosfat
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold">
              Jalan Tertutup: PFK-1 (Glikolisis)
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-stone-600 font-medium block">
              Pilih Enzim Pintas (Bypass) Glukoneogenesis:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {BYPASS_PAIRS[1].options.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(2, opt)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedBypasses[2] === opt
                      ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panah Alir Naik Reversibel */}
        <div className="flex items-center justify-center gap-2 text-stone-400 text-xs font-mono">
          <ArrowUp className="w-4 h-4 text-emerald-500 animate-bounce" />
          <span>Fosfogliserat Mutase, Enolase, Aldolase Membalik Reaksi</span>
          <ArrowUp className="w-4 h-4 text-emerald-500 animate-bounce" />
        </div>

        {/* Rintangan 1 (Bawah): Piruvat -> PEP */}
        <div className={`p-4 rounded-2xl border transition-all ${
          selectedBypasses[1] === BYPASS_PAIRS[0].correctBypassEnzyme && isAnswerChecked
            ? 'bg-emerald-50/70 border-emerald-300'
            : 'bg-white border-stone-200 shadow-2xs'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              {selectedBypasses[1] === BYPASS_PAIRS[0].correctBypassEnzyme && isAnswerChecked ? (
                <Unlock className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-red-500" />
              )}
              <span className="text-xs font-bold text-stone-900">
                Langkah 1 (Paling Bawah): Piruvat → Fosfoenolpiruvat (PEP)
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold">
              Jalan Tertutup: Piruvat Kinase (Glikolisis)
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-stone-600 font-medium block">
              Pilih Pasangan Enzim Pintas (Bypass) Glukoneogenesis:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {BYPASS_PAIRS[0].options.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(1, opt)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedBypasses[1] === opt
                      ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
