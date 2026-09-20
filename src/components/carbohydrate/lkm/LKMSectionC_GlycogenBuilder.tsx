/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  BookOpen, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { InteractiveGlucosePhosphorylation } from './interactive/InteractiveGlucosePhosphorylation';

interface LKMSectionCGlycogenBuilderProps {
  onBack: () => void;
  onNext: () => void;
}

export const LKMSectionC_GlycogenBuilder: React.FC<LKMSectionCGlycogenBuilderProps> = ({
  onBack,
  onNext,
}) => {
  const [showEquationReference, setShowEquationReference] = useState<boolean>(false);

  return (
    <div className="space-y-6" id="lkm-section-c">
      {/* Header Bagian C */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-700" />
          <span>Bagian C • Reaksi Fosforilasi C6 & Jebakan Metabolik</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Inisiasi Glikogenesis: Fosforilasi Glukosa oleh Heksokinase / Glukokinase
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Manipulasi molekul ATP untuk mentransfer gugus fosfat gamma (℗γ) ke atom C6 Haworth glukosa, dan amati bagaimana muatan ionik memerangkap molekul di dalam sitoplasma sel.
        </p>
      </div>

      {/* Modul Interaktif Progresif 5-Layar Bagian C */}
      <InteractiveGlucosePhosphorylation />

      {/* Modul Referensi Persamaan Reaksi Stoikiometri (Dapat Dibuka-Tutup) */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-600" />
            <span>Persamaan Reaksi & Parameter Termodinamika Tahap 1</span>
          </span>
          <button
            type="button"
            onClick={() => setShowEquationReference(!showEquationReference)}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
          >
            {showEquationReference ? 'Sembunyikan Persamaan' : 'Tampilkan Persamaan Stoikiometri'}
          </button>
        </div>

        {showEquationReference && (
          <div className="pt-2 border-t border-stone-200 space-y-2 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-xl font-mono text-stone-900 text-xs font-bold text-center border border-stone-200">
              D-Glukosa + ATP⁴⁻ <span className="text-amber-700">⎯⎯(Heksokinase/Glukokinase, Mg²⁺)⎯⎯→</span> Glukosa-6-fosfat²⁻ + ADP³⁻ + H⁺
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-stone-700">
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <strong>Enzim:</strong> Heksokinase (sebagian besar sel, Km rendah) / Glukokinase (hepar & pankreas, Km tinggi).
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <strong>Energetika:</strong> ΔG°′ = -16.7 kJ/mol (Reaksi sangat eksergonik dan irreversible).
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <strong>Kofaktor Wajib:</strong> Ion Mg²⁺ yang mengkelat muatan negatif rantai polifosfat pada ATP.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigasi Antar-Bagian */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian B</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-d"
        >
          <span>Lanjut ke Bagian D: G6P, G1P, UDP-Glukosa & Glikogenin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
