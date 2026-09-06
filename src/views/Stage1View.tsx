/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ZoomIn, X, Eye, Layers } from 'lucide-react';

interface Stage1ViewProps {
  isPlaying: boolean;
  speed: 0.5 | 1 | 1.5;
  captionsEnabled: boolean;
  reduceMotion: boolean;
  soundEnabled: boolean;
  onOpenSourceModal: (sourceId: string) => void;
}

export const Stage1View: React.FC<Stage1ViewProps> = () => {
  const [activeDiagram, setActiveDiagram] = useState<'anatomi' | 'feedback'>('anatomi');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Kanvas Bersih Fokus Tunggal */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E2D9] shadow-xs flex flex-col items-center text-center space-y-6 min-h-[500px] justify-center">
        
        {/* Alur Skematis 1 Baris */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-[#706B5C]">
          <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Pankreas</span>
          <ArrowRight className="w-4 h-4 text-[#A5A58D]" />
          <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Pulau Langerhans</span>
          <ArrowRight className="w-4 h-4 text-[#A5A58D]" />
          <span className="px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#3E3E3E]">Sel Beta</span>
          <ArrowRight className="w-4 h-4 text-[#A5A58D]" />
          <span className="px-3 py-1 rounded-xl bg-[#6B705C] text-white font-bold">Insulin</span>
        </div>

        {/* Tab Pilihan Diagram Ilustrasi */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FAF8F2] rounded-2xl border border-[#E5E2D9]">
          <button
            type="button"
            onClick={() => setActiveDiagram('anatomi')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeDiagram === 'anatomi'
                ? 'bg-white text-[#3E3E3E] shadow-xs border border-[#E5E2D9]'
                : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#6B705C]" />
            <span>1. Anatomi & Histologi Asal Insulin</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagram('feedback')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeDiagram === 'feedback'
                ? 'bg-white text-[#3E3E3E] shadow-xs border border-[#E5E2D9]'
                : 'text-[#706B5C] hover:text-[#3E3E3E]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>2. Alur Feedback Negatif Glukosa–Insulin</span>
          </button>
        </div>

        {/* Kotak Diagram Ilustrasi Utama */}
        <div className="w-full max-w-4xl relative group">
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E5E2D9] overflow-hidden p-2 sm:p-4 shadow-inner relative">
            {activeDiagram === 'anatomi' ? (
              <div className="space-y-2">
                <img
                  src="/images/insulin/asal-insulin-anatomi.svg"
                  alt="Anatomi dan Histologi Asal Insulin: Dari Tubuh, Pankreas, Pulau Langerhans hingga Sel Beta"
                  className="w-full h-auto max-h-[520px] object-contain mx-auto rounded-xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <img
                  src="/images/insulin/regulasi-glukosa-insulin.svg"
                  alt="Mekanisme Regulasi Glukosa Darah dan Feedback Negatif Insulin Tanpa Sumbu Hipotalamus-Hipofisis"
                  className="w-full h-auto max-h-[520px] object-contain mx-auto rounded-xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Tombol Perbesar Gambar */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs text-[#3E3E3E] hover:bg-white text-xs font-semibold border border-[#E5E2D9] shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
              title="Perbesar Tampilan Gambar"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#6B705C]" />
              <span className="hidden sm:inline">Perbesar Diagram</span>
            </button>
          </div>
        </div>

        {/* Teks Layar Maksimal Dua Kalimat Pendek */}
        <div className="max-w-xl space-y-3">
          <span className="text-[11px] font-semibold text-[#6B705C] bg-[#F4F1EA] px-3 py-1 rounded-full border border-[#E5E2D9] inline-block">
            Contoh feedback negatif tanpa sumbu hipotalamus–hipofisis.
          </span>
          <p className="font-serif text-lg sm:text-xl text-[#3E3E3E] font-medium leading-relaxed">
            “Sel beta di dalam Pulau Langerhans pankreas membuat dan melepaskan insulin.”
          </p>
          <p className="text-xs text-[#706B5C] leading-relaxed max-w-lg mx-auto">
            Ketika glukosa darah naik, sel beta pankreas mendeteksinya secara langsung dan melepaskan insulin. Setelah glukosa darah turun mendekati normal, pelepasan insulin dikurangi. Karena sel beta dapat mendeteksi glukosa secara langsung, insulin tidak memerlukan rangkaian hipotalamus–hipofisis.
          </p>
        </div>

      </div>

      {/* Modal Zoom Diagram Resolusi Penuh */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-[#E5E2D9]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="p-4 sm:p-5 border-b border-[#E5E2D9] flex items-center justify-between bg-[#FDFCF9]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#F5F2EA] text-xs font-bold text-[#6B705C]">
                  {activeDiagram === 'anatomi' ? 'Diagram Anatomi & Histologi' : 'Diagram Alur Feedback'}
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                  {activeDiagram === 'anatomi'
                    ? 'Asal Insulin: Dari Pankreas hingga Sel Beta'
                    : 'Regulasi Glukosa Darah & Feedback Negatif'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-2 rounded-xl text-[#706B5C] hover:bg-[#F5F2EA] transition-colors"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Isi Gambar Resolusi Tinggi */}
            <div className="p-4 sm:p-6 overflow-auto max-h-[calc(92vh-80px)] flex items-center justify-center bg-[#FAF8F5]">
              <img
                src={
                  activeDiagram === 'anatomi'
                    ? '/images/insulin/asal-insulin-anatomi.svg'
                    : '/images/insulin/regulasi-glukosa-insulin.svg'
                }
                alt="Detail Diagram Insulin"
                className="w-full h-auto max-w-4xl object-contain rounded-xl shadow-xs"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
