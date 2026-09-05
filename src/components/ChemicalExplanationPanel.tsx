/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Reaction } from '../types';
import { 
  Sparkles, 
  FlaskConical, 
  Layers, 
  Info, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ChemicalExplanationPanelProps {
  whatHappened: string;
  reaction?: Reaction;
  reactionEquation?: string;
  reactants?: string[];
  products?: string[];
  reactionType?: string;
  changedGroup?: string;
  biologicalMeaning: string;
  simplificationNote?: string;
  onOpenSourceModal?: (sourceId: string) => void;
  captionsEnabled?: boolean;
}

export const ChemicalExplanationPanel: React.FC<ChemicalExplanationPanelProps> = ({
  whatHappened,
  reaction,
  reactionEquation,
  reactants,
  products,
  reactionType,
  changedGroup,
  biologicalMeaning,
  simplificationNote,
  onOpenSourceModal,
  captionsEnabled = true
}) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const eq = reaction?.equation || reactionEquation;
  const rList = reaction?.reactants || reactants || [];
  const pList = reaction?.products || products || [];
  const rType = reaction?.reactionType || reactionType;
  const cGroup = reaction?.changedBondOrGroup || changedGroup;
  const bio = reaction?.biologicalMeaning || biologicalMeaning;
  const simp = reaction?.simplificationNote || simplificationNote;

  if (!captionsEnabled) {
    return (
      <div className="bg-[#FDFCF9] rounded-2xl p-3 border border-[#E5E2D9] text-center text-xs text-[#A5A58D]">
        <span>Keterangan teks disembunyikan. Klik tombol <strong>Keterangan</strong> di bawah untuk menampilkan.</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E5E2D9] shadow-xs space-y-5">
      {/* Header section: Apa yang terjadi? */}
      <div className="space-y-1.5 border-b border-[#E5E2D9] pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B705C] flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-[#CB997E]" />
            Apa yang sedang terjadi?
          </span>
          {rType && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F5F2EA] text-[#706B5C] border border-[#E5E2D9]">
              {rType}
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base text-[#3E3E3E] font-medium leading-relaxed">
          {whatHappened}
        </p>
      </div>

      {/* Persamaan Kimia Utama (if any) */}
      {eq && (
        <div className="bg-[#FDFCF9] rounded-2xl p-4 border border-[#E5E2D9] space-y-1.5 text-center">
          <span className="text-[11px] font-semibold text-[#A5A58D] uppercase tracking-wider block">
            Persamaan Kimia:
          </span>
          <div className="font-mono text-sm sm:text-base font-bold text-[#6B705C] tracking-wide select-all overflow-x-auto py-1">
            {eq}
          </div>
        </div>
      )}

      {/* Rincian Komponen Kimia (Grid scannable) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {rList.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#F5F2EA]/60 border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-[#706B5C] uppercase tracking-wider text-[11px] block">
              Pereaksi
            </span>
            <ul className="space-y-1 text-[#3E3E3E]">
              {rList.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#CB997E]">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {pList.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#F5F2EA]/60 border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-[#706B5C] uppercase tracking-wider text-[11px] block">
              Produk
            </span>
            <ul className="space-y-1 text-[#3E3E3E]">
              {pList.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#6B705C]">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Ikatan/Gugus & Makna Biologis */}
      <div className="space-y-2 text-xs text-[#3E3E3E] bg-[#FDFCF9] p-4 rounded-2xl border border-[#E5E2D9]">
        {cGroup && (
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <strong className="text-[#706B5C] shrink-0 font-medium">Gugus/Ikatan yang berubah:</strong>
            <span className="text-[#3E3E3E] font-medium">{cGroup}</span>
          </div>
        )}
        {bio && (
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 pt-1 border-t border-[#E5E2D9]/60">
            <strong className="text-[#706B5C] shrink-0 font-medium">Makna biologis:</strong>
            <span className="text-[#3E3E3E] leading-relaxed">{bio}</span>
          </div>
        )}
      </div>

      {/* Catatan Penyederhanaan jika ada */}
      {simp && (
        <div className="bg-[#FFE8D6]/40 p-3.5 rounded-2xl border border-[#DDBEA9] text-xs text-[#706B5C] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#CB997E] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#3E3E3E] block font-semibold">Catatan Representasi Kimia:</strong>
            <p className="leading-relaxed mt-0.5">{simp}</p>
          </div>
        </div>
      )}
    </div>
  );
};
