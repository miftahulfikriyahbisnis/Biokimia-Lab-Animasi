/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Zap,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

interface ReactionToken {
  id: string;
  name: string;
  formula: string;
  role: 'REACTANT' | 'PRODUCT' | 'DISTRACTOR';
  description: string;
}

const TOKENS: ReactionToken[] = [
  { id: 'g1p', name: 'Glukosa-1-Fosfat', formula: 'G1P²⁻', role: 'REACTANT', description: 'Monomer heksosa dengan fosfat anomerik aktif' },
  { id: 'utp', name: 'Uridin Trifosfat', formula: 'UTP⁴⁻', role: 'REACTANT', description: 'Nukleosida trifosfat penyedia gugus uridilil' },
  { id: 'udp_glc', name: 'UDP-Glukosa', formula: 'UDP-Glc²⁻', role: 'PRODUCT', description: 'Bentuk glukosa teraktivasi donor glukosil berenergi tinggi' },
  { id: 'ppi', name: 'Pirofosfat Anorganik', formula: 'PPi⁴⁻', role: 'PRODUCT', description: 'Dua molekul fosfat berkondensasi fosfoanhidrida' },
  { id: 'atp', name: 'Adenosin Trifosfat', formula: 'ATP⁴⁻', role: 'DISTRACTOR', description: 'Nukleotida energi umum (bukan donor glikogenesis)' },
  { id: 'nadph', name: 'Nikotinamida Koenzim', formula: 'NADPH + H⁺', role: 'DISTRACTOR', description: 'Kofaktor pereduksi (khas untuk sintesis asam lemak)' }
];

export const InteractiveUDPGLCSynthesis: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [selectedReactant1, setSelectedReactant1] = useState<string | null>(null);
  const [selectedReactant2, setSelectedReactant2] = useState<string | null>(null);
  const [selectedProduct1, setSelectedProduct1] = useState<string | null>(null);
  const [selectedProduct2, setSelectedProduct2] = useState<string | null>(null);

  const [activeSlot, setActiveSlot] = useState<'R1' | 'R2' | 'P1' | 'P2' | null>('R1');
  const [selectedTokenForPlacement, setSelectedTokenForPlacement] = useState<string | null>(null);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Enzim yang mengkatalisis adalah UDP-glukosa pirofosforilase.',
    'Reaktan memerlukan gula heksosa berfosfat C1 dan nukleotida Uridin (bukan Adenin atau NADPH).',
    'Persamaan reaksi lengkapnya: G1P + UTP ⇌ UDP-glukosa + PPi.'
  ];

  const handleSelectToken = (tokenId: string) => {
    setSelectedTokenForPlacement(tokenId);
    // Jika ada slot aktif, tempatkan langsung
    if (activeSlot === 'R1') {
      setSelectedReactant1(tokenId);
      setActiveSlot('R2');
    } else if (activeSlot === 'R2') {
      setSelectedReactant2(tokenId);
      setActiveSlot('P1');
    } else if (activeSlot === 'P1') {
      setSelectedProduct1(tokenId);
      setActiveSlot('P2');
    } else if (activeSlot === 'P2') {
      setSelectedProduct2(tokenId);
      setActiveSlot(null);
    }
    setPhase('MANIPULATION');
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');

    const reactants = [selectedReactant1, selectedReactant2].sort();
    const products = [selectedProduct1, selectedProduct2].sort();

    const reactantsValid = reactants[0] === 'g1p' && reactants[1] === 'utp';
    const productsValid = products[0] === 'ppi' && products[1] === 'udp_glc';

    const correct = reactantsValid && productsValid;
    setIsCorrect(correct);
    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setSelectedReactant1(null);
    setSelectedReactant2(null);
    setSelectedProduct1(null);
    setSelectedProduct2(null);
    setActiveSlot('R1');
    setSelectedTokenForPlacement(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  const canCheck = selectedReactant1 && selectedReactant2 && selectedProduct1 && selectedProduct2;

  const getToken = (id: string | null) => TOKENS.find(t => t.id === id);

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Tahap 3 Interaktif: Pembentukan UDP-Glukosa (Aktivasi Monomer Glukosil)"
        instruction="Rakit persamaan reaksi biosintesis aktivasi glukosa dengan memilih dan menempatkan token yang tepat: 2 Reaktan di sisi kiri dan 2 Produk di sisi kanan. Amati peran hidrolisis pirofosfat (PPi) sebagai motor penggerak reaksi."
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
        canCheck={Boolean(canCheck)}
        explanation="UDP-glukosa pirofosforilase mengkatalisis serangan oksigen fosforil G1P ke fosforil-α dari UTP, membebaskan Uridin Difosfat Glukosa (UDP-glukosa) dan pirofosfat anorganik (PPi). Reaksi ini sendiri memiliki ΔG°′ mendekati 0 (mudah reversibel). Namun, di dalam sel terdapat enzim pirofosfatase anorganik aktif yang segera menghidrolisis PPi menjadi 2 Pi (ΔG°′ ≈ -19.2 kJ/mol). Pasangan hidrolisis eksergonik kuat ini menarik seluruh kesetimbangan reaksi ke arah pembentukan UDP-glukosa secara ireversibel."
      />

      {/* 1. BANK TOKEN KIMIA */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-900 uppercase">
            Pilihan Token Molekul (Ketuk untuk Mengisi Slot Reaksi):
          </span>
          <span className="text-[10px] text-stone-500">
            Slot Aktif: <strong className="text-amber-700">{activeSlot ? `Slot ${activeSlot}` : 'Semua Slot Terisi'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {TOKENS.map(t => {
            const isUsed = [selectedReactant1, selectedReactant2, selectedProduct1, selectedProduct2].includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectToken(t.id)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isUsed
                    ? 'bg-stone-100 text-stone-400 border-stone-200'
                    : 'bg-[#FAF8F5] hover:bg-amber-50 text-stone-800 border-stone-300 hover:border-amber-400 shadow-2xs'
                }`}
              >
                <div className="font-mono font-bold text-xs text-amber-950">{t.formula}</div>
                <div className="text-[10px] text-stone-600 truncate mt-0.5">{t.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PAPAN PERAKITAN PERSAMAAN REAKSI */}
      <div className="bg-[#FAF8F5] border border-[#E5E2D9] rounded-2xl p-5 space-y-4">
        <div className="text-center text-xs font-serif font-bold text-stone-800">
          Perakitan Reaksi: UDP-Glukosa Pirofosforilase
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          
          {/* SLOT REAKTAN 1 */}
          <div 
            onClick={() => setActiveSlot('R1')}
            className={`w-32 sm:w-36 h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${
              activeSlot === 'R1'
                ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300'
                : selectedReactant1
                ? 'border-stone-400 bg-white shadow-2xs'
                : 'border-dashed border-stone-300 bg-stone-50'
            }`}
          >
            {selectedReactant1 ? (
              <div>
                <div className="font-mono font-bold text-xs text-stone-900">{getToken(selectedReactant1)?.formula}</div>
                <div className="text-[10px] text-stone-500">{getToken(selectedReactant1)?.name}</div>
              </div>
            ) : (
              <span className="text-[11px] text-stone-400 italic">[ Reaktan 1 ]</span>
            )}
          </div>

          <Plus className="w-4 h-4 text-stone-400" />

          {/* SLOT REAKTAN 2 */}
          <div 
            onClick={() => setActiveSlot('R2')}
            className={`w-32 sm:w-36 h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${
              activeSlot === 'R2'
                ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300'
                : selectedReactant2
                ? 'border-stone-400 bg-white shadow-2xs'
                : 'border-dashed border-stone-300 bg-stone-50'
            }`}
          >
            {selectedReactant2 ? (
              <div>
                <div className="font-mono font-bold text-xs text-stone-900">{getToken(selectedReactant2)?.formula}</div>
                <div className="text-[10px] text-stone-500">{getToken(selectedReactant2)?.name}</div>
              </div>
            ) : (
              <span className="text-[11px] text-stone-400 italic">[ Reaktan 2 ]</span>
            )}
          </div>

          <div className="flex flex-col items-center px-2">
            <span className="text-[10px] font-mono text-stone-500">Enzim</span>
            <ArrowRight className="w-5 h-5 text-amber-600" />
          </div>

          {/* SLOT PRODUK 1 */}
          <div 
            onClick={() => setActiveSlot('P1')}
            className={`w-32 sm:w-36 h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${
              activeSlot === 'P1'
                ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300'
                : selectedProduct1
                ? 'border-stone-400 bg-white shadow-2xs'
                : 'border-dashed border-stone-300 bg-stone-50'
            }`}
          >
            {selectedProduct1 ? (
              <div>
                <div className="font-mono font-bold text-xs text-stone-900">{getToken(selectedProduct1)?.formula}</div>
                <div className="text-[10px] text-stone-500">{getToken(selectedProduct1)?.name}</div>
              </div>
            ) : (
              <span className="text-[11px] text-stone-400 italic">[ Produk 1 ]</span>
            )}
          </div>

          <Plus className="w-4 h-4 text-stone-400" />

          {/* SLOT PRODUK 2 */}
          <div 
            onClick={() => setActiveSlot('P2')}
            className={`w-32 sm:w-36 h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${
              activeSlot === 'P2'
                ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300'
                : selectedProduct2
                ? 'border-stone-400 bg-white shadow-2xs'
                : 'border-dashed border-stone-300 bg-stone-50'
            }`}
          >
            {selectedProduct2 ? (
              <div>
                <div className="font-mono font-bold text-xs text-stone-900">{getToken(selectedProduct2)?.formula}</div>
                <div className="text-[10px] text-stone-500">{getToken(selectedProduct2)?.name}</div>
              </div>
            ) : (
              <span className="text-[11px] text-stone-400 italic">[ Produk 2 ]</span>
            )}
          </div>

        </div>

        {/* Reaksi Penarik Termodinamika: Hidrolisis PPi */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-amber-200 text-xs text-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Reaksi Penggerak Searah:</strong> PPi⁴⁻ + H₂O → 2 Pi²⁻ (ΔG°′ = -19.2 kJ/mol dikatalisis <em>anorganik pirofosfatase</em>).
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Tarik Kesetimbangan Ireversibel
          </span>
        </div>
      </div>
    </div>
  );
};
