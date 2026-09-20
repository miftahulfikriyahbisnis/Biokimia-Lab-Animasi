/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Lightbulb, 
  CheckCircle, 
  RotateCcw, 
  BookOpen, 
  HelpCircle, 
  Sparkles,
  AlertCircle,
  Award
} from 'lucide-react';

export type InteractionPhase = 'PREDICTION' | 'MANIPULATION' | 'OBSERVATION' | 'ANALYSIS' | 'FEEDBACK';

interface InteractiveStepScaffoldProps {
  currentPhase: InteractionPhase;
  onPhaseChange?: (phase: InteractionPhase) => void;
  title: string;
  instruction: string;
  hints: string[];
  currentHintIndex: number;
  onShowNextHint: () => void;
  onCheckAnswer: () => void;
  onReset: () => void;
  onShowExplanation: () => void;
  isAnswerChecked: boolean;
  isCorrect: boolean | null;
  score: number;
  maxScore?: number;
  explanation: string;
  feedbackText?: string;
  canCheck?: boolean;
}

export const InteractiveStepScaffold: React.FC<InteractiveStepScaffoldProps> = ({
  currentPhase,
  title,
  instruction,
  hints,
  currentHintIndex,
  onShowNextHint,
  onCheckAnswer,
  onReset,
  onShowExplanation,
  isAnswerChecked,
  isCorrect,
  score,
  maxScore = 100,
  explanation,
  feedbackText,
  canCheck = true
}) => {
  const [showFullExplanation, setShowFullExplanation] = React.useState(false);

  const phases: { key: InteractionPhase; label: string; num: number }[] = [
    { key: 'PREDICTION', label: '1. Prediksi', num: 1 },
    { key: 'MANIPULATION', label: '2. Manipulasi', num: 2 },
    { key: 'OBSERVATION', label: '3. Amati', num: 3 },
    { key: 'ANALYSIS', label: '4. Analisis', num: 4 },
    { key: 'FEEDBACK', label: '5. Umpan Balik', num: 5 },
  ];

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-2xl shadow-xs overflow-hidden">
      {/* 1. Header & Alur Fase Pembelajaran */}
      <div className="bg-[#FAF8F5] border-b border-[#E5E2D9] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono font-bold">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Skor: {score}/{maxScore}</span>
            </div>
          </div>
        </div>

        {/* Stepper Fase */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {phases.map((p) => {
            const isActive = currentPhase === p.key;
            return (
              <div 
                key={p.key}
                className={`py-1 px-1.5 rounded-lg text-center text-[10px] font-bold border transition-all truncate ${
                  isActive 
                    ? 'bg-stone-900 text-amber-300 border-stone-800 shadow-2xs ring-1 ring-amber-400/40' 
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                {p.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Instruksi & Pengingat */}
      <div className="px-5 py-3 bg-amber-50/40 border-b border-amber-100 flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900">Misi Mahasiswa: </span>
          {instruction}
          <span className="block text-[11px] text-stone-500 mt-0.5">
            *Dapat menggunakan seret-lepas (drag-and-drop) atau ketuk objek lalu ketuk target tujuan.
          </span>
        </div>
      </div>

      {/* 3. Panel Petunjuk Bertahap */}
      {currentHintIndex > 0 && (
        <div className="px-5 py-3 bg-blue-50/60 border-b border-blue-100 text-xs text-blue-950 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span>Petunjuk Berpikir ({currentHintIndex}/{hints.length})</span>
          </div>
          <p className="pl-6 text-blue-900/90 leading-relaxed">
            {hints[currentHintIndex - 1]}
          </p>
        </div>
      )}

      {/* 4. Kontrol Tombol Aksi */}
      <div className="p-4 bg-white border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {hints.length > 0 && (
            <button
              type="button"
              onClick={onShowNextHint}
              disabled={currentHintIndex >= hints.length}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                currentHintIndex >= hints.length
                  ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                  : 'bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border-stone-200 hover:border-amber-300'
              }`}
              title="Menggunakan petunjuk akan mengurangi skor sebesar 10 poin"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {currentHintIndex === 0 
                  ? 'Minta Petunjuk (-10 Poin)' 
                  : currentHintIndex < hints.length 
                  ? 'Petunjuk Lanjut (-10 Poin)' 
                  : 'Semua Petunjuk Terbuka'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Coba Lagi</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCheckAnswer}
            disabled={!canCheck}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
              !canCheck
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-black text-amber-300 active:scale-95'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>Periksa Jawaban</span>
          </button>

          {isAnswerChecked && (
            <button
              type="button"
              onClick={() => {
                setShowFullExplanation(!showFullExplanation);
                onShowExplanation();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>{showFullExplanation ? 'Tutup Penjelasan' : 'Lihat Penjelasan Ilmiah'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. Umpan Balik Hasil & Penjelasan Ilmiah */}
      {isAnswerChecked && (
        <div className={`p-4 border-t ${
          isCorrect 
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
            : 'bg-red-50/80 border-red-200 text-red-950'
        }`}>
          <div className="flex items-start gap-2.5">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-sm">
                {isCorrect ? 'Luar Biasa, Manipulasi & Jawaban Tepat!' : 'Belum Tepat, Pelajari Dinamikanya!'}
              </div>
              <p className="leading-relaxed">
                {feedbackText || (isCorrect 
                  ? 'Konsep biokimiawi berhasil Anda manipulasi dengan benar sesuai kaidah kimia organik dan termodinamika.'
                  : 'Periksa kembali arah transfer gugus, spesifisitas nomor atom karbon, atau kebutuhan kofaktor energi.')}
              </p>

              {(showFullExplanation || isCorrect) && (
                <div className="mt-3 pt-3 border-t border-emerald-200/60 text-stone-800 bg-white/80 p-3 rounded-xl space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-stone-700" />
                    <span>Penjelasan Ilmiah Mendalam:</span>
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
