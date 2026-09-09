/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowRight, 
  Flame, 
  Zap, 
  Dna, 
  Wind, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { MetabolicStepData } from '../../data/metabolicJourneyData';

interface MetabolicReactionPanelProps {
  currentStepData: MetabolicStepData;
  totalSteps: number;
  onSelectStep?: (stepIndex: number) => void;
}

export const MetabolicReactionPanel: React.FC<MetabolicReactionPanelProps> = ({
  currentStepData,
  totalSteps,
  onSelectStep
}) => {
  const {
    stepNumber,
    moduleTitle,
    location,
    title,
    subTitle,
    substrate,
    product,
    enzyme,
    cofactors,
    equation,
    explanation,
    chemicalDetail,
    carbonStateDescription,
    cumulativeUsedATP,
    cumulativeProducedATP,
    cumulativeNetATP,
    cumulativeNADH,
    cumulativeFADH2,
    cumulativeCO2
  } = currentStepData;

  return (
    <div 
      className="w-full bg-[#FAF8F5] border border-[#E5E2D9] rounded-3xl p-4 sm:p-5 shadow-sm space-y-4 text-stone-800"
      id="metabolic-reaction-panel-2d"
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
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Lokasi: <strong>{location}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Kartu Utama Persamaan Reaksi Kimia (Substrat → Enzim → Produk) */}
      <div className="bg-white rounded-2xl border border-[#E5E2D9] p-4 shadow-xs space-y-3">
        {/* Judul Langkah & Sub-deskripsi */}
        <div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#3E3E3E] leading-snug">
            {title}
          </h3>
          <p className="text-xs text-[#706B5C] font-medium">
            {subTitle}
          </p>
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
            {cofactors.length > 0 && (
              <span className="text-[10px] font-sans text-stone-600 mt-1">
                Kofaktor / Reaktan: {cofactors.join(', ')}
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
            {equation}
          </span>
        </div>
      </div>

      {/* 3. Bar Penjelasan Kimiawi Satu Kalimat & Status Karbon */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Satu Kalimat Penjelasan Perubahan Kimia (Wajib Sesuai Prompt) */}
        <div className="md:col-span-8 bg-white rounded-2xl border border-[#E5E2D9] p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6B705C]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Mekanisme Perubahan Kimiawi:</span>
          </div>
          <p className="text-xs sm:text-sm text-[#3E3E3E] font-medium leading-relaxed">
            {explanation}
          </p>
          <p className="text-[11px] text-[#706B5C] pt-0.5">
            {chemicalDetail}
          </p>
        </div>

        {/* Pelacak Karbon & Keadaan Molekul 3D */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-[#E5E2D9] p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
            <Dna className="w-3.5 h-3.5 text-blue-600" />
            <span>Pelacakan Karbon & Bentuk 3D:</span>
          </div>
          <p className="text-xs font-mono font-semibold text-stone-800">
            {carbonStateDescription}
          </p>
        </div>
      </div>

      {/* 4. Dashboard Penghitung Kumulatif Terintegrasi (ATP, NADH, FADH2, CO2) */}
      <div className="bg-white rounded-2xl border border-[#E5E2D9] p-3.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-serif font-bold text-[#3E3E3E] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Penghitung Bioenergetika Kumulatif (per 1 Glukosa Masuk)</span>
          </span>
          <span className="text-[10px] text-[#A5A58D] font-mono">
            Sinkron Real-Time dengan Langkah {stepNumber}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {/* ATP Kumulatif (Digunakan, Dihasilkan, Bersih) */}
          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-900">ATP Langsung</span>
              <span className="text-[10px] font-mono px-1 rounded bg-amber-200/70 text-amber-900 font-bold">
                SLP
              </span>
            </div>
            <div className="font-mono text-xs text-stone-700 pt-0.5">
              <p>Dipakai: <span className="font-bold text-rose-700">-{cumulativeUsedATP}</span></p>
              <p>Dibuat: <span className="font-bold text-emerald-700">+{cumulativeProducedATP}</span></p>
              <p className="text-[11px] font-bold text-amber-950 border-t border-amber-200/80 pt-0.5 mt-0.5">
                Bersih: <span className="text-emerald-800 font-black">+{cumulativeNetATP} ATP</span>
              </p>
            </div>
          </div>

          {/* NADH Kumulatif */}
          <div className="p-2.5 rounded-xl bg-purple-50/80 border border-purple-200 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-900">NADH Terbentuk</span>
              <span className="text-[10px] font-mono px-1 rounded bg-purple-200/70 text-purple-900 font-bold">
                Reduksi
              </span>
            </div>
            <p className="font-mono text-lg font-black text-purple-900 pt-1">
              {cumulativeNADH} <span className="text-xs font-normal text-purple-700">NADH</span>
            </p>
            <p className="text-[10px] text-purple-700 font-mono">
              ≈ {(cumulativeNADH * 2.5).toFixed(1)} ATP via ETC
            </p>
          </div>

          {/* FADH2 Kumulatif */}
          <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-900">FADH₂ Terbentuk</span>
              <span className="text-[10px] font-mono px-1 rounded bg-blue-200/70 text-blue-900 font-bold">
                Komp. II
              </span>
            </div>
            <p className="font-mono text-lg font-black text-blue-900 pt-1">
              {cumulativeFADH2} <span className="text-xs font-normal text-blue-700">FADH₂</span>
            </p>
            <p className="text-[10px] text-blue-700 font-mono">
              ≈ {(cumulativeFADH2 * 1.5).toFixed(1)} ATP via ETC
            </p>
          </div>

          {/* CO2 Kumulatif */}
          <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-800">CO₂ Dilepaskan</span>
              <span className="text-[10px] font-mono px-1 rounded bg-stone-200 text-stone-800 font-bold">
                Gas
              </span>
            </div>
            <p className="font-mono text-lg font-black text-stone-900 pt-1">
              {cumulativeCO2} / 6 <span className="text-xs font-normal text-stone-600">CO₂</span>
            </p>
            <p className="text-[10px] text-stone-600 font-mono">
              {cumulativeCO2 === 6 ? '✓ Oksidasi 6C tuntas' : `Sisa ${6 - cumulativeCO2}C dioksidasi`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
