/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowRight, 
  Zap, 
  Sparkles, 
  Dna, 
  CheckCircle,
  HelpCircle,
  Clock,
  Layers,
  Activity,
  Layers3
} from 'lucide-react';
import { AnabolismStepData } from '../../data/anabolismJourneyData';

interface AnabolismReactionPanelProps {
  currentStepData: AnabolismStepData;
  totalSteps: number;
  onSelectStep?: (stepNumber: number) => void;
}

export const AnabolismReactionPanel: React.FC<AnabolismReactionPanelProps> = ({
  currentStepData,
  totalSteps,
  onSelectStep
}) => {
  const {
    stepNumber,
    moduleTitle,
    location,
    title,
    substrate,
    product,
    reactionEquation,
    enzyme,
    cofactors,
    energyInput,
    energyOutput,
    carbonCountBefore,
    carbonCountAfter,
    bondType,
    explanation,
    biologicalFunction,
    cumulativeCounters
  } = currentStepData;

  return (
    <div 
      className="w-full bg-[#FAF8F5] border border-[#E5E2D9] rounded-3xl p-4 sm:p-5 shadow-sm space-y-4 text-stone-800"
      id="anabolism-reaction-panel-2d"
    >
      {/* 1. Bar Header: Modul, Nomor Tahap, & Lokasi Kompartemen Sel */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E2D9] pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#6B705C] text-white text-xs font-bold tracking-wide">
            Tahap {stepNumber} / {totalSteps}
          </span>
          <span className="text-xs sm:text-sm font-serif font-bold text-[#3E3E3E]">
            {moduleTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-300/80 text-blue-950 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Lokasi Reaksi: <strong>{location}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Kartu Utama Persamaan Reaksi Kimia (Substrat → Enzim → Produk) */}
      <div className="bg-white rounded-2xl border border-[#E5E2D9] p-4 shadow-xs space-y-3">
        {/* Judul Langkah & Jenis Ikatan */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#3E3E3E] leading-snug">
              {title}
            </h3>
            <p className="text-xs text-[#706B5C]">
              Tipe Ikatan / Modifikasi: <strong className="text-emerald-800">{bondType}</strong>
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded-xl border border-[#E5E2D9] text-xs font-mono">
            <span className="text-stone-500">Jumlah Karbon:</span>
            <span className="font-bold text-[#3E3E3E]">{carbonCountBefore}C</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-emerald-800">{carbonCountAfter}C</span>
          </div>
        </div>

        {/* Kotak Persamaan Reaksi 2D Bersih & Jelas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-[#FAF8F5] p-3 rounded-xl border border-[#E5E2D9]/80 font-mono text-xs">
          {/* Substrat Awal */}
          <div className="md:col-span-4 bg-white p-3 rounded-lg border border-[#E5E2D9] text-center shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-[#A5A58D] block mb-0.5">
              Substrat
            </span>
            <span className="font-bold text-[#3E3E3E] text-xs sm:text-sm block">
              {substrate}
            </span>
          </div>

          {/* Tanda Panah & Enzim / Kofaktor */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center px-1">
            <span className="text-[11px] font-sans font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 block mb-1">
              Enzim: {enzyme}
            </span>
            <div className="flex items-center gap-1 text-emerald-700 font-bold">
              <span className="h-0.5 w-10 sm:w-16 bg-emerald-600" />
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </div>
            {cofactors && (
              <span className="text-[10px] font-sans text-stone-600 mt-1">
                Kofaktor / Reaktan: {cofactors}
              </span>
            )}
          </div>

          {/* Produk Akhir */}
          <div className="md:col-span-4 bg-white p-3 rounded-lg border border-[#E5E2D9] text-center shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-[#A5A58D] block mb-0.5">
              Produk
            </span>
            <span className="font-bold text-emerald-800 text-xs sm:text-sm block">
              {product}
            </span>
          </div>
        </div>

        {/* Persamaan Kimia Stoikiometri Lengkap */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs font-mono text-amber-950 overflow-x-auto">
          <span className="font-sans text-[11px] font-bold text-amber-900 shrink-0">
            Persamaan Reaksi:
          </span>
          <span className="font-semibold text-center flex-1">
            {reactionEquation}
          </span>
        </div>
      </div>

      {/* 3. Bar Penjelasan Kimiawi Satu Kalimat & Fungsi Biologis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 bg-white rounded-2xl border border-[#E5E2D9] space-y-1">
          <span className="text-[11px] font-bold text-[#3E3E3E] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Mekanisme Kimiawi Reaksi:</span>
          </span>
          <p className="text-xs text-[#706B5C] leading-relaxed">
            {explanation}
          </p>
        </div>

        <div className="p-3 bg-white rounded-2xl border border-[#E5E2D9] space-y-1">
          <span className="text-[11px] font-bold text-[#3E3E3E] flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fungsi Biologis & Signifikansi Fisiologis:</span>
          </span>
          <p className="text-xs text-[#706B5C] leading-relaxed">
            {biologicalFunction}
          </p>
        </div>
      </div>

      {/* 4. Bar Bioenergetika & Penghitung Kumulatif (ATP, UTP, GTP, NADPH, & Produk) */}
      <div className="bg-white rounded-2xl border border-[#E5E2D9] p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#3E3E3E] flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Penghitung Bioenergetika Anabolik Kumulatif</span>
          </span>
          <span className="text-[10px] text-stone-500 font-mono">
            Input Energi Reaksi Ini: <strong className="text-red-700">{energyInput}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {/* ATP Terpakai */}
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] font-bold text-amber-900 block">ATP Terpakai</span>
            <span className="font-mono text-sm font-bold text-amber-800">
              {cumulativeCounters.atp} ATP
            </span>
          </div>

          {/* UTP Terpakai */}
          <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-[10px] font-bold text-sky-900 block">UTP Terpakai</span>
            <span className="font-mono text-sm font-bold text-sky-800">
              {cumulativeCounters.utp} UTP
            </span>
          </div>

          {/* GTP Terpakai */}
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-900 block">GTP Terpakai</span>
            <span className="font-mono text-sm font-bold text-emerald-800">
              {cumulativeCounters.gtp} GTP
            </span>
          </div>

          {/* NADPH Terpakai */}
          <div className="p-2 rounded-xl bg-purple-50 border border-purple-200">
            <span className="text-[10px] font-bold text-purple-900 block">NADPH Pereduksi</span>
            <span className="font-mono text-sm font-bold text-purple-800">
              {cumulativeCounters.nadph} NADPH
            </span>
          </div>

          {/* Status Produk */}
          <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-stone-100 border border-stone-200">
            <span className="text-[10px] font-bold text-stone-700 block">Status Produk</span>
            <span className="font-mono text-[11px] font-bold text-stone-900 truncate block">
              {cumulativeCounters.productCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
