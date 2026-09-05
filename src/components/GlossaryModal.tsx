/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GLOSSARY_DATA } from '../data/glossary';
import { GlossaryItem } from '../types';
import { X, Search, BookOpen, Tag } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  if (!isOpen) return null;

  const categories = ['Semua', 'Struktur', 'Reseptor', 'Reaksi', 'Fisiologi'];

  const filteredItems = GLOSSARY_DATA.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Glosarium Kimia Insulin"
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-[#E5E2D9] overflow-hidden">
        {/* Header */}
        <div className="bg-[#6B705C] text-white px-6 py-4 flex items-center justify-between border-b border-[#585D4B]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#FFE8D6]" />
            <h2 className="text-lg font-serif font-semibold">Glosarium Kimia Hormon Insulin</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Glosarium"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Filter */}
        <div className="p-4 bg-[#F5F2EA] border-b border-[#E5E2D9] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#A5A58D] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari istilah kimia (misal: peptida, disulfida, kinase, fosforilasi)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B705C] focus:border-transparent text-[#3E3E3E] placeholder:text-[#A5A58D]"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1 rounded-full font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#6B705C] text-white font-semibold shadow-xs'
                    : 'bg-white border border-[#E5E2D9] text-[#706B5C] hover:bg-[#FDFCF9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-[#E5E2D9]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-[#A5A58D] text-sm">
              Tidak ditemukan istilah kimia dengan kata kunci "{search}".
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.term} className="pt-3.5 first:pt-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif font-semibold text-base text-[#3E3E3E]">{item.term}</h3>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F5F2EA] text-[#6B705C] border border-[#E5E2D9]">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-[#706B5C] leading-relaxed">{item.definition}</p>
              </div>
            ))
          )}
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
