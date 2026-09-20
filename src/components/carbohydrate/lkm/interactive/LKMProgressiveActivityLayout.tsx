/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lightbulb, 
  CheckCircle, 
  RotateCcw, 
  BookOpen, 
  HelpCircle, 
  Sparkles,
  AlertCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sliders,
  CheckCircle2,
  FileQuestion
} from 'lucide-react';

export type InteractionPhase = 'PREDICTION' | 'MANIPULATION' | 'OBSERVATION' | 'ANALYSIS' | 'FEEDBACK';

interface LKMProgressiveActivityLayoutProps {
  title: string;
  badge?: string;
  currentPhase: InteractionPhase;
  onPhaseChange: (phase: InteractionPhase) => void;
  visualContent: React.ReactNode;
  controlContent: React.ReactNode;
  hints?: string[];
  currentHintIndex?: number;
  onShowNextHint?: () => void;
  onReset?: () => void;
  onCheckAnswer?: () => void;
  canCheck?: boolean;
  score?: number;
  maxScore?: number;
  explanation?: string;
  feedbackText?: string;
  isCorrect?: boolean | null;
  onNextPhase?: () => void;
  onPrevPhase?: () => void;
  canProceedToNext?: boolean;
  phaseInstructions?: Record<InteractionPhase, string>;
}

export const LKMProgressiveActivityLayout: React.FC<LKMProgressiveActivityLayoutProps> = ({
  title,
  badge = 'Eksplorasi Aktif Berbasis Data',
  currentPhase,
  onPhaseChange,
  visualContent,
  controlContent,
  hints = [],
  currentHintIndex = 0,
  onShowNextHint,
  onReset,
  onCheckAnswer,
  canCheck = true,
  score = 100,
  maxScore = 100,
  explanation,
  feedbackText,
  isCorrect = null,
  onNextPhase,
  onPrevPhase,
  canProceedToNext = true,
  phaseInstructions
}) => {
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  const phaseList: { key: InteractionPhase; label: string; num: number; icon: React.FC<{ className?: string }> }[] = [
    { key: 'PREDICTION', label: '1. Prediksi', num: 1, icon: FileQuestion },
    { key: 'MANIPULATION', label: '2. Manipulasi', num: 2, icon: Sliders },
    { key: 'OBSERVATION', label: '3. Amati', num: 3, icon: Eye },
    { key: 'ANALYSIS', label: '4. Analisis', num: 4, icon: BookOpen },
    { key: 'FEEDBACK', label: '5. Umpan Balik', num: 5, icon: Award },
  ];

  const currentPhaseIndex = phaseList.findIndex(p => p.key === currentPhase);

  const defaultInstructions: Record<InteractionPhase, string> = {
    PREDICTION: 'Pilihlah dugaan ilmiah awal kelompok Anda sebelum memulai manipulasi molekuler.',
    MANIPULATION: 'Lakukan interaksi langsung: klik atom, seret gugus kimia, atau sambungkan substrat pada kanvas.',
    OBSERVATION: 'Amati secara saksama perubahan konformasi, pelepasan energi, dan aliran molekul yang terjadi.',
    ANALYSIS: 'Jawab pertanyaan sebab-akibat untuk menghubungkan hasil pengamatan dengan konsep biokimia.',
    FEEDBACK: 'Tinjau skor, validasi alasan ilmiah, dan perbaiki pemahaman konsep jika diperlukan.'
  };

  const currentInstruction = phaseInstructions?.[currentPhase] || defaultInstructions[currentPhase];

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-2xl shadow-xs overflow-hidden">
      
      {/* 1. Bar Navigasi Fase (Progressive Stepper) */}
      <div className="bg-[#FAF8F5] border-b border-[#E5E2D9] px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-amber-800 uppercase bg-amber-100/70 px-2 py-0.5 rounded">
              {badge}
            </span>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg mt-0.5">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono font-bold text-xs shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Skor: {score}/{maxScore}</span>
            </div>

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 transition-all cursor-pointer"
                title="Reset aktivitas ke kondisi awal"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* 5-Step Stepper Header */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2 pt-1">
          {phaseList.map((p, idx) => {
            const isActive = currentPhase === p.key;
            const isCompleted = idx < currentPhaseIndex;
            const Icon = p.icon;

            return (
              <button
                key={p.key}
                type="button"
                onClick={() => onPhaseChange(p.key)}
                className={`py-1.5 px-1 sm:px-2 rounded-xl text-center text-[10px] sm:text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  isActive 
                    ? 'bg-stone-900 text-amber-300 border-stone-800 shadow-2xs ring-2 ring-amber-400/50' 
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-amber-300' : isCompleted ? 'text-emerald-600' : 'text-stone-400'}`} />
                <span className="truncate">{p.label}</span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600 hidden sm:inline shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Banner Instruksi Singkat Sesuai Fase */}
      <div className="px-4 py-2.5 sm:px-6 bg-amber-50/50 border-b border-amber-100 flex items-center justify-between gap-3 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="leading-snug">
            <strong className="text-stone-900">Langkah {currentPhaseIndex + 1} • {phaseList[currentPhaseIndex]?.label}: </strong>
            {currentInstruction}
          </p>
        </div>

        {hints.length > 0 && onShowNextHint && (
          <button
            type="button"
            onClick={onShowNextHint}
            disabled={currentHintIndex >= hints.length}
            className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              currentHintIndex >= hints.length
                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Petunjuk ({currentHintIndex}/{hints.length})</span>
          </button>
        )}
      </div>

      {/* 3. Panel Petunjuk Aktif (jika dibuka) */}
      {currentHintIndex > 0 && hints[currentHintIndex - 1] && (
        <div className="px-4 py-2 sm:px-6 bg-blue-50/70 border-b border-blue-100 text-xs text-blue-950 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-blue-900">Petunjuk Ilmiah: </strong>
            {hints[currentHintIndex - 1]}
          </p>
        </div>
      )}

      {/* 4. TATA LETAK UTAMA DUA KOLOM (60% Kiri, 40% Kanan pada Desktop, Stack pada Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        
        {/* KOLOM KIRI (~60%): Ilustrasi, Struktur Molekul, Peta Organ, atau Animasi */}
        <div className="lg:col-span-7 bg-[#FCFAF6] border-b lg:border-b-0 lg:border-r border-[#E5E2D9] p-4 sm:p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            {visualContent}
          </div>
        </div>

        {/* KOLOM KANAN (~40%): Instruksi, Pilihan Mahasiswa, Kontrol Manipulasi, Cek Jawaban */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-4 flex-1">
            {controlContent}
          </div>

          {/* Navigasi Bawah Antarfase */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (onPrevPhase) {
                  onPrevPhase();
                } else if (currentPhaseIndex > 0) {
                  onPhaseChange(phaseList[currentPhaseIndex - 1].key);
                }
              }}
              disabled={currentPhaseIndex === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
              {onCheckAnswer && currentPhase === 'MANIPULATION' && (
                <button
                  type="button"
                  onClick={onCheckAnswer}
                  disabled={!canCheck}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Periksa</span>
                </button>
              )}

              {currentPhaseIndex < phaseList.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (onNextPhase) {
                      onNextPhase();
                    } else {
                      onPhaseChange(phaseList[currentPhaseIndex + 1].key);
                    }
                  }}
                  disabled={!canProceedToNext}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                >
                  <span>Lanjut: {phaseList[currentPhaseIndex + 1]?.label}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Tahap Ini Tuntas</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bagian Umpan Balik Lengkap (Jika di Fase FEEDBACK) */}
      {currentPhase === 'FEEDBACK' && (
        <div className={`p-4 sm:p-5 border-t ${
          isCorrect 
            ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950' 
            : 'bg-amber-50/90 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1.5 text-xs flex-1">
              <div className="font-bold text-sm">
                {isCorrect ? 'Analisis & Manipulasi Tepat!' : 'Konsep Perlu Diperhatikan Kembali'}
              </div>
              <p className="leading-relaxed">
                {feedbackText || (isCorrect 
                  ? 'Selamat! Pemahaman Anda mengenai reaksi biosintesis ini sesuai dengan kaidah termodinamika dan regulasi seluler.'
                  : 'Cermati kembali aliran transfer gugus dan fungsi organ/enzim yang terlibat.')}
              </p>

              {explanation && (
                <div className="mt-3 pt-3 border-t border-stone-200/60 text-stone-800 bg-white/90 p-3.5 rounded-xl space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                    <BookOpen className="w-3.5 h-3.5 text-stone-700" />
                    <span>Rasionalitas Biokimiawi Mendalam:</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-stone-700">
                    {explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
