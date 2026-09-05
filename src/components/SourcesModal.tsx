/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SOURCES_DATA } from '../data/sources';
import { X, ExternalLink, BookMarked, CheckCircle2 } from 'lucide-react';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightedSourceId?: string;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose, highlightedSourceId }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Sumber Ilmiah Kimia Insulin"
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-[#E5E2D9] overflow-hidden">
        {/* Header */}
        <div className="bg-[#6B705C] text-white px-6 py-4 flex items-center justify-between border-b border-[#585D4B]">
          <div className="flex items-center gap-2.5">
            <BookMarked className="w-5 h-5 text-[#FFE8D6]" />
            <div>
              <h2 className="text-lg font-serif font-semibold">Sumber Rujukan Ilmiah Peer-Reviewed</h2>
              <p className="text-xs text-[#E5E2D9]">Dasar kimia, struktur kriomikroskop elektron, dan transduksi sinyal insulin</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Sumber"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-[#F5F2EA] p-3.5 rounded-2xl border border-[#E5E2D9] text-xs text-[#706B5C] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
            <p>
              Semua persamaan reaksi kimia, tata nama, struktur prabentuk α₂β₂, stoikiometri ATP → ADP, serta model pematangan proinsulin pada media ini diverifikasi berdasarkan literatur biokimia dan endokrinologi molekuler terkini.
            </p>
          </div>

          {SOURCES_DATA.map((source, idx) => {
            const isHighlighted = highlightedSourceId === source.id;
            return (
              <div 
                key={source.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  isHighlighted 
                    ? 'border-[#6B705C] bg-[#F5F2EA] shadow-sm ring-2 ring-[#6B705C]/20' 
                    : 'border-[#E5E2D9] bg-[#FDFCF9] hover:border-[#DDBEA9]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#CB997E] tracking-wider uppercase">
                      Referensi #{idx + 1}
                    </span>
                    <h3 className="text-sm font-serif font-semibold text-[#3E3E3E] leading-snug">
                      {source.title}
                    </h3>
                    <p className="text-xs text-[#706B5C]">
                      {source.authors} ({source.year}) • <span className="italic">{source.journal}</span>
                    </p>
                  </div>
                  <a
                    href={`https://doi.org/${source.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs text-[#6B705C] hover:text-[#3E3E3E] font-semibold bg-white hover:bg-[#F5F2EA] px-2.5 py-1.5 rounded-xl border border-[#E5E2D9] shadow-xs"
                  >
                    <span>DOI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="mt-3 pt-3 border-t border-[#E5E2D9] text-xs text-[#706B5C] bg-white p-3 rounded-xl border border-[#E5E2D9]">
                  <span className="font-semibold text-[#3E3E3E] block mb-0.5">Relevansi Konsep dalam Modul:</span>
                  <p>{source.relevance}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#F5F2EA] px-6 py-3.5 border-t border-[#E5E2D9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold bg-[#6B705C] text-white rounded-xl hover:bg-[#585D4B] transition-colors shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
