/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Download, 
  FileText, 
  AlertCircle,
  BarChart2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { CARBOHYDRATE_POST_TEST_QUESTIONS } from '../../data/carbohydrateQuestions';
import { StudentProfile } from '../../types';
import { generateCarbohydratePdfReport } from '../../utils/carbohydratePdfExport';

interface CarbohydratePostTestProps {
  profile: StudentProfile | null;
  onBackToHome: () => void;
  onSaveScore: (score: number) => void;
}

export const CarbohydratePostTest: React.FC<CarbohydratePostTestProps> = ({
  profile,
  onBackToHome,
  onSaveScore
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = CARBOHYDRATE_POST_TEST_QUESTIONS;
  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: index
    }));
  };

  const answeredCount = Object.keys(userAnswers).length;

  // Hitung Skor
  let correctCount = 0;
  questions.forEach(q => {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });
  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  // Analisis Per Kategori / Subtopik
  const categoryStats: { [category: string]: { correct: number; total: number } } = {};
  questions.forEach(q => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total++;
    if (userAnswers[q.id] === q.correctAnswer) {
      categoryStats[q.category].correct++;
    }
  });

  const handleSubmit = () => {
    setIsSubmitted(true);
    onSaveScore(finalScore);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const handleDownloadPdf = () => {
    generateCarbohydratePdfReport(
      profile?.name || 'Mahasiswa Biokimia',
      profile?.nim || 'BIO-2025-001',
      finalScore,
      correctCount,
      totalQuestions,
      userAnswers
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Bar Navigasi Atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Post-Test Mandiri (20 Soal)</span>
        </div>
      </div>

      {!isSubmitted ? (
        /* MODE MENGERJAKAN SOAL */
        <div className="space-y-6">
          
          {/* Header Soal & Progres */}
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#A5A58D] uppercase tracking-wider block">
                  Soal {currentQuestionIndex + 1} dari {totalQuestions}
                </span>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 inline-block mt-0.5">
                  Subtopik: {currentQ.category}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-[#706B5C]">Terjawab:</span>
                <span className="text-xs font-bold text-[#3E3E3E] ml-1">
                  {answeredCount} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Bar Progres Pengerjaan */}
            <div className="w-full h-1.5 rounded-full bg-[#E5E2D9] overflow-hidden">
              <div
                className="h-full bg-[#6B705C] transition-all"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Teks Pertanyaan */}
            <div className="pt-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#3E3E3E] leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Daftar Pilihan Jawaban (A, B, C, D) */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                const letter = ['A', 'B', 'C', 'D'][idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-400 text-amber-950 ring-2 ring-amber-300/40 shadow-xs'
                        : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#706B5C] hover:bg-white hover:border-[#6B705C]'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-[#E5E2D9] text-[#706B5C]'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-xs leading-relaxed pt-0.5 font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigasi Antar Nomor Soal */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F5F2EA] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {/* Tombol Grid Nomor Cepat */}
            <div className="hidden sm:flex items-center gap-1 overflow-x-auto max-w-md px-2">
              {questions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isCurrent = currentQuestionIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#6B705C] text-white shadow-xs'
                        : isAns
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-white border border-[#E5E2D9] text-[#A5A58D] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B705C] text-white text-xs font-semibold hover:bg-[#585D4B] transition-all cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kumpulkan Post-Test</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* HASIL POST-TEST & ANALISIS KELULUSAN */
        <div className="space-y-6">
          
          {/* Banner Nilai Akhir */}
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 sm:p-8 text-center space-y-4 shadow-xs">
            <div className="inline-flex p-3 rounded-2xl bg-amber-100 text-amber-800">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-[#3E3E3E]">
                Hasil Evaluasi Post-Test Mandiri
              </h2>
              <p className="text-xs text-[#706B5C]">
                Modul Pembelajaran Metabolisme Karbohidrat
              </p>
            </div>

            <div className="py-2">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-[#3E3E3E]">
                {finalScore}
              </span>
              <span className="text-sm font-semibold text-[#A5A58D] ml-1">/ 100</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold">
              {finalScore >= 75 ? (
                <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full border border-emerald-300">
                  🎉 Lulus Kompetensi (Batas Minimal: 75)
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-900 px-4 py-1 rounded-full border border-amber-300">
                  ⚠️ Perlu Penguatan Materi (Batas Minimal: 75)
                </span>
              )}
            </div>

            <div className="text-xs text-[#706B5C]">
              Jumlah Jawaban Benar: <strong>{correctCount} dari {totalQuestions} Soal</strong>
            </div>

            {/* Aksi Unduh PDF & Ulangi */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Laporan Portofolio PDF</span>
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#FAF8F5] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Post-Test</span>
              </button>
            </div>
          </div>

          {/* Analisis Penguasaan Per Subtopik */}
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                Analisis Penguasaan Subtopik
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(categoryStats).map(([catName, stats]) => {
                const percent = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={catName} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#3E3E3E] line-clamp-1">{catName}</span>
                      <span className="font-bold text-amber-900">{percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E5E2D9] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${percent >= 75 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#A5A58D] block">
                      {stats.correct} dari {stats.total} soal benar
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pembahasan Rinci 20 Soal */}
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
              Kunci Jawaban & Pembahasan Biokimiawi Rinci
            </h3>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-[#3E3E3E] text-xs">
                        {idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full shrink-0">
                          <XCircle className="w-3.5 h-3.5" /> Salah
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-[11px] text-[#706B5C]">
                      <div>
                        Jawaban Anda: <strong className={isCorrect ? 'text-emerald-800' : 'text-red-800'}>
                          {userAns !== undefined ? q.options[userAns] : 'Tidak dijawab'}
                        </strong>
                      </div>
                      {!isCorrect && (
                        <div>
                          Kunci Jawaban Benar: <strong className="text-emerald-800">{q.options[q.correctAnswer]}</strong>
                        </div>
                      )}
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E5E2D9] text-[11px] text-[#706B5C] leading-relaxed">
                      💡 <strong>Penjelasan Ilmiah:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
