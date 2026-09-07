/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Info,
  BookOpen,
  Lightbulb,
  TrendingDown,
  Activity,
  Layers,
  X,
  CheckCircle2
} from 'lucide-react';
import {
  Insulin3DStage,
  InspectableObject,
  STAGE_INFOS,
  OBJECT_DETAILS
} from './types';

interface ExplanationPanelProps {
  currentStage: Insulin3DStage;
  selectedObject: InspectableObject;
  onSelectObject: (obj: InspectableObject) => void;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  currentStage,
  selectedObject,
  onSelectObject
}) => {
  const [detailMode, setDetailMode] = useState<'NONE' | 'SCIENTIFIC' | 'ANALOGY'>('NONE');

  const stageInfo = STAGE_INFOS[currentStage];
  const selectedDetail = selectedObject ? OBJECT_DETAILS[selectedObject] : null;

  return (
    <div className="space-y-4">
      {/* 1. KARTU INSPEKTOR OBJEK YANG DIKLIK (Jika ada objek yang sedang dipilih) */}
      {selectedDetail && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F2] border-2 border-[#6B705C]/30 shadow-xs relative animate-in fade-in duration-200">
          <button
            onClick={() => onSelectObject(null)}
            className="absolute top-3 right-3 p-1 rounded-lg text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#E5E2D9] transition-colors cursor-pointer"
            title="Tutup Info Objek"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedDetail.color }}
            />
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#3E3E3E]">
              {selectedDetail.title}
            </h4>
          </div>

          <div className="inline-block px-2.5 py-0.5 mb-2.5 rounded-full text-[10px] font-bold bg-[#E5E2D9] text-[#4F5342]">
            {selectedDetail.badge}
          </div>

          <p className="text-xs sm:text-sm text-[#3E3E3E] leading-relaxed mb-3 bg-white p-3 rounded-xl border border-[#E5E2D9]">
            {selectedDetail.description}
          </p>

          <div className="flex items-start gap-1.5 text-[11px] text-[#6B705C] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#CB997E] mt-0.5" />
            <span>{selectedDetail.keyFact}</span>
          </div>
        </div>
      )}

      {/* 2. KARTU UTAMA PENJELASAN TAHAP SAAT INI */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E5E2D9] shadow-xs space-y-4">
        {/* Header Tahap */}
        <div className="flex items-center justify-between gap-2 border-b border-[#E5E2D9] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#6B705C] text-white flex items-center justify-center text-xs font-bold font-mono">
              {currentStage}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
              Tahap {currentStage} dari 7
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#A5A58D]">
            Mekanisme Kerja Insulin
          </span>
        </div>

        {/* Judul & Subtitle */}
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3E3E3E]">
            {stageInfo.title}
          </h3>
          <p className="text-xs text-[#706B5C] font-medium">
            {stageInfo.subtitle}
          </p>
        </div>

        {/* Kalimat Narasi Utama */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9]">
          <p className="font-serif text-base sm:text-lg font-semibold text-[#3E3E3E] leading-snug">
            “{stageInfo.narrativeText}”
          </p>
        </div>

        {/* Objek Aktif & Efek Glukosa Darah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#6B705C]">
              <Activity className="w-3.5 h-3.5 text-[#CB997E]" />
              <span>Objek Aktif:</span>
            </div>
            <ul className="space-y-0.5 text-[#3E3E3E] text-[11px]">
              {stageInfo.activeObjects.map((obj, i) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#6B705C]" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#6B705C]">
              <TrendingDown className="w-3.5 h-3.5 text-[#CB997E]" />
              <span>Dampak Glukosa Darah:</span>
            </div>
            <p className="text-[#3E3E3E] text-[11px] leading-relaxed">
              {stageInfo.bloodGlucoseEffect}
            </p>
          </div>
        </div>

        {/* Tombol Pilihan Penjelasan Tambahan: Ilmiah vs Analogi Mudah */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setDetailMode(detailMode === 'SCIENTIFIC' ? 'NONE' : 'SCIENTIFIC')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              detailMode === 'SCIENTIFIC'
                ? 'bg-[#6B705C] text-white border-[#6B705C] shadow-xs'
                : 'bg-white text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Apa yang sebenarnya terjadi?</span>
          </button>

          <button
            onClick={() => setDetailMode(detailMode === 'ANALOGY' ? 'NONE' : 'ANALOGY')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              detailMode === 'ANALOGY'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Versi mudah</span>
          </button>

          {/* Tombol pintas buka GLUT4 jika belum dipilih */}
          {!selectedDetail && (
            <button
              onClick={() => onSelectObject('GLUT4')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#1D3557] border border-blue-200 hover:bg-blue-100 text-xs font-semibold cursor-pointer transition-all ml-auto"
            >
              <Info className="w-3.5 h-3.5 text-[#1D3557]" />
              <span>Info GLUT4</span>
            </button>
          )}
        </div>

        {/* Kotak Konten Detail Ilmiah */}
        {detailMode === 'SCIENTIFIC' && (
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#6B705C]/30 text-xs leading-relaxed text-[#3E3E3E] space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-bold text-[#6B705C]">
              <BookOpen className="w-4 h-4 text-[#CB997E]" />
              <span>Penjelasan Biokimiawi Mendalam:</span>
            </div>
            <p>{stageInfo.scientificDetail}</p>
          </div>
        )}

        {/* Kotak Konten Detail Analogi Sederhana */}
        {detailMode === 'ANALOGY' && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs leading-relaxed text-amber-950 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Analogi Sehari-hari:</span>
            </div>
            <p>{stageInfo.analogyDetail}</p>
          </div>
        )}
      </div>

      {/* 3. LEGENDA WARNA VISUAL MODEL 3D */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5E2D9] shadow-xs space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6B705C]">
          <Layers className="w-3.5 h-3.5 text-[#CB997E]" />
          <span>Panduan Warna Objek 3D:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
          <button
            onClick={() => onSelectObject('GLUCOSE')}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500 shrink-0" />
            <span className="font-medium text-[#3E3E3E]">Partikel Glukosa</span>
          </button>
          <button
            onClick={() => onSelectObject('INSULIN')}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-sky-500 border border-sky-600 shrink-0" />
            <span className="font-medium text-[#3E3E3E]">Molekul Insulin</span>
          </button>
          <button
            onClick={() => onSelectObject('RECEPTOR')}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-purple-600 border border-purple-700 shrink-0" />
            <span className="font-medium text-[#3E3E3E]">Reseptor Insulin</span>
          </button>
          <button
            onClick={() => onSelectObject('GLUT4')}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-[#1D3557] border border-blue-950 shrink-0" />
            <span className="font-medium text-[#3E3E3E]">GLUT4 Transporter</span>
          </button>
          <button
            onClick={() => onSelectObject('VESICLE')}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-teal-400 border border-teal-500 shrink-0" />
            <span className="font-medium text-[#3E3E3E]">Vesikel GLUT4</span>
          </button>
          <button
            onClick={() => onSelectObject('MEMBRANE')}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-500 shrink-0" />
            <span className="font-medium text-[#3E3E3E]">Membran Bilayer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
