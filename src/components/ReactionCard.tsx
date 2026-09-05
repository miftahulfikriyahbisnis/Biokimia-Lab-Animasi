/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Reaction } from '../types';
import { SOURCES_DATA } from '../data/sources';
import { BookMarked, FlaskConical, Droplet, Zap, AlertCircle, ArrowRight } from 'lucide-react';

interface ReactionCardProps {
  reaction: Reaction;
  onOpenSourceModal?: (sourceId: string) => void;
}

export const ReactionCard: React.FC<ReactionCardProps> = ({ reaction, onOpenSourceModal }) => {
  const sources = SOURCES_DATA.filter(s => reaction.sourceIds.includes(s.id));

  return (
    <div 
      id={`reaction-card-${reaction.id}`} 
      className="bg-white rounded-2xl border border-[#E5E2D9] shadow-xs overflow-hidden text-[#3E3E3E] text-sm"
    >
      {/* Header with Title and Reaction Type */}
      <div className="bg-[#6B705C] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#585D4B]">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-[#FFE8D6]" />
          <span className="font-serif font-semibold text-base text-white tracking-tight">{reaction.name}</span>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
          reaction.isPhysicalMovement 
            ? 'bg-[#FFE8D6] text-[#A53F2B] border border-[#DDBEA9]' 
            : 'bg-[#F5F2EA] text-[#4A4E3F] border border-[#E5E2D9]'
        }`}>
          {reaction.reactionType}
        </span>
      </div>

      {/* Chemical Equation Bar */}
      <div className="bg-[#F5F2EA] px-5 py-3 border-b border-[#E5E2D9] flex items-center justify-center">
        <div className="font-mono text-sm sm:text-base font-bold text-[#3E3E3E] tracking-wide text-center overflow-x-auto max-w-full py-1">
          {reaction.equation}
        </div>
      </div>

      {/* 12-field Scientific Information Grid */}
      <div className="p-5 space-y-3.5">
        {/* Reactants and Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#FDFCF9] p-3.5 rounded-xl border border-[#E5E2D9]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#706B5C] block mb-1.5">
              Pereaksi (Substrat)
            </span>
            <ul className="list-disc list-inside text-xs space-y-1 text-[#3E3E3E]">
              {reaction.reactants.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="bg-[#FDFCF9] p-3.5 rounded-xl border border-[#E5E2D9]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C] block mb-1.5">
              Produk Hasil
            </span>
            <ul className="list-disc list-inside text-xs space-y-1 text-[#3E3E3E]">
              {reaction.products.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enzyme & Bond Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#F5F2EA] border border-[#E5E2D9]">
            <span className="text-[#A5A58D] font-medium block">Enzim Katalis:</span>
            <span className="font-semibold text-[#3E3E3E] mt-0.5 block">{reaction.enzyme || 'Tanpa enzim khusus / Spontan terarah'}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#F5F2EA] border border-[#E5E2D9]">
            <span className="text-[#A5A58D] font-medium block">Ikatan/Gugus yang Berubah:</span>
            <span className="font-semibold text-[#3E3E3E] mt-0.5 block">{reaction.changedBondOrGroup}</span>
          </div>
        </div>

        {/* Water & ATP Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F2EA] border border-[#E5E2D9]">
            <Droplet className="w-4 h-4 text-[#6B705C] shrink-0" />
            <div>
              <span className="text-[#706B5C] block text-[11px]">Keterlibatan Air (H₂O):</span>
              <span className="font-semibold text-[#3E3E3E]">
                {reaction.usesWater ? 'Air Digunakan (Hidrolisis)' : reaction.producesWater ? 'Air Dihasilkan (Kondensasi)' : 'Tidak Melibatkan H₂O'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFE8D6]/80 border border-[#DDBEA9]">
            <Zap className="w-4 h-4 text-[#CB997E] shrink-0" />
            <div>
              <span className="text-[#A53F2B] block text-[11px]">Penggunaan ATP:</span>
              <span className="font-semibold text-[#A53F2B]">
                {reaction.usesATP ? 'Ya, Donor Fosforil (ATP → ADP)' : 'Tidak Menggunakan ATP'}
              </span>
            </div>
          </div>
        </div>

        {/* Biological Meaning */}
        <div className="p-3.5 bg-[#F5F2EA] rounded-xl border border-[#E5E2D9] text-xs">
          <span className="font-bold text-[#4A4E3F] block mb-1">Makna Biologis:</span>
          <p className="text-[#706B5C] leading-relaxed">{reaction.biologicalMeaning}</p>
        </div>

        {/* Simplification Note */}
        {reaction.simplificationNote && (
          <div className="p-3.5 bg-[#FFE8D6] rounded-xl border border-[#DDBEA9] text-xs flex gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#A53F2B] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#A53F2B] block mb-1">Catatan Penyederhanaan Ilmiah:</span>
              <p className="text-[#A53F2B]/90 leading-relaxed">{reaction.simplificationNote}</p>
            </div>
          </div>
        )}

        {/* Scientific Sources Footer */}
        {sources.length > 0 && (
          <div className="pt-2.5 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#A5A58D]">
              <BookMarked className="w-3.5 h-3.5 text-[#6B705C]" />
              <span>Sumber Ilmiah:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sources.map(s => (
                <button
                  key={s.id}
                  onClick={() => onOpenSourceModal?.(s.id)}
                  className="text-[11px] font-semibold text-[#6B705C] hover:text-[#3E3E3E] underline decoration-[#A5A58D]"
                >
                  {s.authors} ({s.year})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
