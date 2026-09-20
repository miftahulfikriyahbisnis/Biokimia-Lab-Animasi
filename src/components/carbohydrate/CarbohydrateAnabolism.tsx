/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Award, 
  HelpCircle, 
  Activity, 
  Layers, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { LKMSectionA_Prompt, GroupPredictionState } from './lkm/LKMSectionA_Prompt';
import { LKMSectionB_GlucoseFateMap } from './lkm/LKMSectionB_GlucoseFateMap';
import { LKMSectionC_GlycogenBuilder } from './lkm/LKMSectionC_GlycogenBuilder';
import { LKMSectionD_GlucosylActivation } from './lkm/LKMSectionD_GlucosylActivation';
import { LKMSectionE_GlycogenBranching } from './lkm/LKMSectionE_GlycogenBranching';
import { LKMSectionF_BypassAndReflection } from './lkm/LKMSectionF_BypassAndReflection';

interface CarbohydrateAnabolismProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export type LKMSectionId = 'SECTION_A' | 'SECTION_B' | 'SECTION_C' | 'SECTION_D' | 'SECTION_E' | 'SECTION_F';

export const CarbohydrateAnabolism: React.FC<CarbohydrateAnabolismProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  // Kelompok Asal Mahasiswa
  const [groupName, setGroupName] = useState<string>('Kelompok 1');

  // Bagian LKM yang sedang aktif
  const [activeSection, setActiveSection] = useState<LKMSectionId>('SECTION_A');

  // Progress kelengkapan bagian
  const [completedSections, setCompletedSections] = useState<Record<LKMSectionId, boolean>>({
    SECTION_A: false,
    SECTION_B: false,
    SECTION_C: false,
    SECTION_D: false,
    SECTION_E: false,
    SECTION_F: false,
  });

  // State Prediksi Awal Kelompok (Bagian A) yang disimpan dan direfleksikan di Bagian F
  const [predictionData, setPredictionData] = useState<GroupPredictionState>({
    casePrediction: null,
    formOfStorage: '',
    targetOrgans: '',
    whenUsed: '',
    whyNotFreeGlucose: '',
    isSubmitted: false
  });

  const sectionsNav: { id: LKMSectionId; letter: string; title: string; subtitle: string }[] = [
    { id: 'SECTION_A', letter: 'A', title: 'Pemantik', subtitle: 'Carbo-Loading & Prediksi' },
    { id: 'SECTION_B', letter: 'B', title: 'Peta Organ', subtitle: 'Hati, Otot, Adiposa' },
    { id: 'SECTION_C', letter: 'C', title: 'Fosforilasi C6', subtitle: 'Haworth & Jebakan G6P' },
    { id: 'SECTION_D', letter: 'D', title: 'Aktivasi UDP-Glc', subtitle: 'G1P & Glikogenin' },
    { id: 'SECTION_E', letter: 'E', title: 'Percabangan', subtitle: 'Ikatan α-1,4 & α-1,6' },
    { id: 'SECTION_F', letter: 'F', title: 'Tiga Bypass', subtitle: 'Glukoneogenesis & Refleksi' },
  ];

  const handleSavePrediction = (data: GroupPredictionState) => {
    setPredictionData(data);
    setCompletedSections(prev => ({ ...prev, SECTION_A: true }));
  };

  const handleFinishLKM = () => {
    setCompletedSections(prev => ({ ...prev, SECTION_F: true }));
    onCompleteAndNext();
  };

  const completedCount = Object.values(completedSections).filter(Boolean).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6" id="anabolism-container">
      
      {/* 1. Bar Navigasi Atas & Info Kelompok */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E2D9] pb-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-2xs"
          id="btn-back-to-home"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-xs shadow-2xs">
            <Users className="w-3.5 h-3.5 text-stone-600" />
            <span className="font-semibold text-stone-500">Kelompok:</span>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nama Kelompok..."
              className="font-bold text-stone-900 border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500 rounded px-1 w-28 sm:w-36 text-xs"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{completedCount}/6 Bagian Selesai</span>
          </div>
        </div>
      </div>

      {/* 2. Header Judul LKM Digital */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-amber-200 text-[11px] font-mono font-bold">
            Lembar Kerja Mahasiswa (LKM) Digital
          </span>
          <span className="text-xs text-stone-400">•</span>
          <span className="text-xs text-[#6B705C] font-semibold">
            Pembelajaran Kolaboratif Berbasis Representasi Multipel
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          LKM Digital: Anabolisme Karbohidrat & Pembentukan Cadangan Energi
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-4xl leading-relaxed">
          Dirancang untuk dikerjakan secara berkelompok setelah penjelasan dosen. 
          Hubungkan kondisi fisiologis, organ target, kompartemen sitosol, reaksi biosintesis berenergi UTP/ATP, dan struktur molekuler 2D/3D glikogen.
        </p>
      </div>

      {/* 3. Bar Stepper Tab 6 Bagian LKM (A sampai F) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {sectionsNav.map((sec) => {
          const isActive = activeSection === sec.id;
          const isDone = completedSections[sec.id];

          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                isActive
                  ? 'bg-stone-900 text-amber-100 border-stone-800 shadow-xs ring-1 ring-amber-400/40'
                  : isDone
                  ? 'bg-emerald-50/70 text-emerald-950 border-emerald-300 hover:bg-emerald-100/60'
                  : 'bg-white text-stone-700 border-[#E5E2D9] hover:bg-[#FAF8F5]'
              }`}
              id={`tab-lkm-${sec.id}`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? 'bg-amber-400 text-stone-900'
                    : isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 text-stone-700'
                }`}>
                  {sec.letter}
                </span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <div>
                <div className="font-bold text-xs leading-tight">{sec.title}</div>
                <div className={`text-[10px] truncate ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  {sec.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. RENDER BAGIAN LKM AKTIF */}
      <div className="transition-opacity duration-200">
        
        {/* BAGIAN A: PEMANTIK (KASUS ATLET, PREDIKSI, & 4 PERTANYAAN) */}
        {activeSection === 'SECTION_A' && (
          <LKMSectionA_Prompt
            predictionData={predictionData}
            onSavePrediction={handleSavePrediction}
            onNext={() => {
              setCompletedSections(prev => ({ ...prev, SECTION_A: true }));
              setActiveSection('SECTION_B');
            }}
          />
        )}

        {/* BAGIAN B: PETA TUJUAN GLUKOSA (HATI, OTOT, ADIPOSA) */}
        {activeSection === 'SECTION_B' && (
          <LKMSectionB_GlucoseFateMap
            onBack={() => setActiveSection('SECTION_A')}
            onNext={() => {
              setCompletedSections(prev => ({ ...prev, SECTION_B: true }));
              setActiveSection('SECTION_C');
            }}
          />
        )}

        {/* BAGIAN C: MISI MEMBANGUN GLIKOGEN (6 TAHAPAN REKONSTRUKSI) */}
        {activeSection === 'SECTION_C' && (
          <LKMSectionC_GlycogenBuilder
            onBack={() => setActiveSection('SECTION_B')}
            onNext={() => {
              setCompletedSections(prev => ({ ...prev, SECTION_C: true }));
              setActiveSection('SECTION_D');
            }}
          />
        )}

        {/* BAGIAN D: G6P, G1P, UDP-GLUKOSA, & GLIKOGENIN */}
        {activeSection === 'SECTION_D' && (
          <LKMSectionD_GlucosylActivation
            onBack={() => setActiveSection('SECTION_C')}
            onNext={() => {
              setCompletedSections(prev => ({ ...prev, SECTION_D: true }));
              setActiveSection('SECTION_E');
            }}
          />
        )}

        {/* BAGIAN E: PEMANJANGAN & PERCABANGAN GLIKOGEN */}
        {activeSection === 'SECTION_E' && (
          <LKMSectionE_GlycogenBranching
            onBack={() => setActiveSection('SECTION_D')}
            onNext={() => {
              setCompletedSections(prev => ({ ...prev, SECTION_E: true }));
              setActiveSection('SECTION_F');
            }}
          />
        )}

        {/* BAGIAN F: TIGA BYPASS GLUKONEOGENESIS & REFLEKSI PREDIKSI */}
        {activeSection === 'SECTION_F' && (
          <LKMSectionF_BypassAndReflection
            predictionData={predictionData}
            groupName={groupName}
            onBack={() => setActiveSection('SECTION_E')}
            onFinishLKM={handleFinishLKM}
          />
        )}

      </div>

    </div>
  );
};
