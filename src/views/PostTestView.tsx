/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { StudentProfile, PostTestRecord, PostTestDetailItem } from '../types';
import { generateRandomTestSet, PostTestQuestion } from '../data/postTestBank';
import { addPostTestToActiveProfile } from '../utils/storage';
import { exportPostTestToPDF } from '../utils/pdfExport';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Flag, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Download, 
  Printer, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Flame, 
  AlertTriangle,
  FileText,
  Home
} from 'lucide-react';

interface PostTestViewProps {
  profile: StudentProfile;
  onFinishTest: () => void;
  onBackToMap: () => void;
  onProfileUpdated: (updated: StudentProfile) => void;
}

export const PostTestView: React.FC<PostTestViewProps> = ({
  profile,
  onFinishTest,
  onBackToMap,
  onProfileUpdated
}) => {
  // Setup Soal Acak 15 Butir
  const [questions, setQuestions] = useState<PostTestQuestion[]>(() => generateRandomTestSet(15));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [qId: string]: 'A' | 'B' | 'C' | 'D' }>({});
  const [flagged, setFlagged] = useState<{ [qId: string]: boolean }>({});
  
  // Timer 20 Menit = 1200 Detik
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Hasil Post-Test yang Disimpan
  const [savedRecord, setSavedRecord] = useState<PostTestRecord | null>(null);

  // Streak Counter Visual Seru
  const [streak, setStreak] = useState<number>(0);
  const [showStreakBonus, setShowStreakBonus] = useState<boolean>(false);

  // Timer Effect
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Audio Beep sintetis sederhana menggunakan Web Audio API
  const playSfx = (type: 'correct' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Abaikan jika browser memblokir audio context tanpa user gesture
    }
  };

  const handleSelectAnswer = (optId: 'A' | 'B' | 'C' | 'D') => {
    const currentQ = questions[currentIndex];
    const prevAnswer = answers[currentQ.id];
    setAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
    
    // Periksa streak visual
    if (optId === currentQ.correctAnswer) {
      playSfx('correct');
      setStreak(prev => {
        const next = prev + 1;
        if (next % 3 === 0) {
          setShowStreakBonus(true);
          setTimeout(() => setShowStreakBonus(false), 2500);
        }
        return next;
      });
    } else {
      playSfx('click');
      setStreak(0);
    }
  };

  const handleToggleFlag = () => {
    const currentQ = questions[currentIndex];
    setFlagged(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  // Submit Post-Test
  const handleSubmitTest = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);

    const durationUsed = 20 * 60 - timeLeft;
    let correctCount = 0;

    const details: PostTestDetailItem[] = questions.map(q => {
      const userAns = answers[q.id] || '-';
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correctCount += 1;

      return {
        questionId: q.id,
        question: q.question,
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const incorrectCount = questions.length - correctCount;

    let category: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Belajar Kembali' = 'Perlu Belajar Kembali';
    if (score >= 86) category = 'Sangat Baik';
    else if (score >= 76) category = 'Baik';
    else if (score >= 66) category = 'Cukup';

    const record: PostTestRecord = {
      id: `record_${Date.now()}`,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      score,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      durationSeconds: durationUsed,
      category,
      details
    };

    setSavedRecord(record);
    const updated = addPostTestToActiveProfile(record);
    if (updated) {
      onProfileUpdated(updated);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ulangi Paket Soal Baru
  const handleRestartNewSet = () => {
    const newSet = generateRandomTestSet(15);
    setQuestions(newSet);
    setCurrentIndex(0);
    setAnswers({});
    setFlagged({});
    setTimeLeft(20 * 60);
    setIsSubmitted(false);
    setSavedRecord(null);
    setStreak(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      
      {/* Jika Belum Dikumpulkan: Tampilan Pengerjaan Post-Test */}
      {!isSubmitted ? (
        <>
          {/* Header Post-Test: Identitas & Timer */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5E2D9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#706B5C] mb-1">
                <span>Modul Hormon</span>
                <span>/</span>
                <span className="font-bold text-[#CB997E]">Tahap 3: Post-Test</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">
                Evaluasi Mandiri Biokimia Hormon & Insulin
              </h2>
              <p className="text-xs text-[#706B5C] mt-0.5">
                {profile.name} ({profile.nim}) • Kelas: {profile.studentClass}
              </p>
            </div>

            {/* Timer & Sound Toggle */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={() => setSoundEnabled(prev => !prev)}
                className="p-2 rounded-xl border border-[#E5E2D9] text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
                title={soundEnabled ? "Nonaktifkan suara streak" : "Aktifkan suara streak"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#6B705C]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
              </button>

              <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono text-sm font-bold shadow-xs ${
                timeLeft < 180 
                  ? 'bg-[#FFE8D6] text-[#A53F2B] border-[#DDBEA9] animate-pulse' 
                  : 'bg-[#F5F2EA] text-[#3E3E3E] border-[#E5E2D9]'
              }`}>
                <Clock className="w-4 h-4 text-[#6B705C]" />
                <span>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Indikator Streak Interaktif */}
          {streak >= 2 && (
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] text-xs text-[#6B705C] animate-in fade-in slide-in-from-top duration-200">
              <Flame className="w-4 h-4 text-[#CB997E] fill-current animate-bounce" />
              <span><strong>{streak} Jawaban Tepat Berturut-turut!</strong> Pertahankan konsentrasi.</span>
              {showStreakBonus && (
                <span className="ml-2 px-2 py-0.5 bg-[#E8EDE0] text-[#585D4B] font-bold rounded-full text-[10px]">
                  Visual Streak Combo!
                </span>
              )}
            </div>
          )}

          {/* Navigasi Nomor Soal Grid 1 - 15 */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E5E2D9] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#3E3E3E]">
                Status Pengerjaan: {answeredCount} dari {questions.length} Soal Dijawab
              </span>
              <div className="flex items-center gap-3 text-[11px] text-[#706B5C]">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6B705C]"></span> Dijawab
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CB997E]"></span> Ditinjau
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5F2EA] border border-[#E5E2D9]"></span> Belum
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5 pt-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = Boolean(answers[q.id]);
                const isFlag = Boolean(flagged[q.id]);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-[#3E3E3E] ring-offset-1 bg-[#6B705C] text-white shadow-xs'
                        : isFlag
                        ? 'bg-[#CB997E] text-white'
                        : isAnswered
                        ? 'bg-[#E8EDE0] text-[#585D4B] border border-[#C3CDB4]'
                        : 'bg-[#F5F2EA] text-[#706B5C] hover:bg-[#E5E2D9]'
                    }`}
                  >
                    {idx + 1}
                    {isFlag && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#A53F2B]"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kotak Soal Aktif (1 Soal per Layar) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xs space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#F5F2EA] text-[#6B705C] text-xs font-bold border border-[#E5E2D9]">
                  Soal {currentIndex + 1} dari {questions.length}
                </span>
                <span className="text-[11px] text-[#A5A58D] font-medium hidden sm:inline">
                  Topik: {currentQ.topic}
                </span>
              </div>

              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                  flagged[currentQ.id]
                    ? 'bg-[#FFE8D6] text-[#A53F2B] border-[#DDBEA9]'
                    : 'bg-[#FDFCF9] text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'fill-current' : ''}`} />
                <span>{flagged[currentQ.id] ? 'Ditandai Ditinjau' : 'Tandai untuk Ditinjau'}</span>
              </button>
            </div>

            {/* Teks Pertanyaan */}
            <h3 className="text-base sm:text-lg font-medium text-[#3E3E3E] leading-relaxed">
              {currentQ.question}
            </h3>

            {/* 4 Pilihan Jawaban A - D */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map(opt => {
                const isSelected = answers[currentQ.id] === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectAnswer(opt.id)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition-all border flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8EDE0] border-[#6B705C] text-[#3E3E3E] font-medium shadow-xs'
                        : 'bg-[#FDFCF9] hover:bg-white border-[#E5E2D9] text-[#706B5C] hover:border-[#6B705C]'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs ${
                      isSelected 
                        ? 'bg-[#6B705C] text-white' 
                        : 'bg-[#F5F2EA] text-[#706B5C] border border-[#E5E2D9]'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Tombol Kontrol Soal */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border ${
                  currentIndex === 0 
                    ? 'opacity-40 cursor-not-allowed bg-white border-[#E5E2D9] text-[#A5A58D]' 
                    : 'bg-white hover:bg-[#F5F2EA] border-[#E5E2D9] text-[#706B5C] cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#CB997E] hover:bg-[#B8876E] text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selesaikan Post-Test</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tombol Submit Global di Bawah */}
          <div className="text-center pt-2">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#A53F2B] hover:underline cursor-pointer"
            >
              <span>Kumpulkan dan Selesaikan Ujian Sekarang</span>
            </button>
          </div>
        </>
      ) : (
        /* ========================================================= */
        /* HASIL POST-TEST & ANALISIS JAWABAN */
        /* ========================================================= */
        savedRecord && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Kartu Skor & Ringkasan Nilai */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E2D9] shadow-xs text-center space-y-6">
              
              <div className="w-16 h-16 rounded-3xl bg-[#F5F2EA] text-[#6B705C] flex items-center justify-center mx-auto border border-[#E5E2D9]">
                <Award className="w-8 h-8 text-[#CB997E]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                  Hasil Evaluasi Modul Hormon
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                  {savedRecord.category === 'Sangat Baik' 
                    ? 'Luar Biasa, Capaian Sangat Memuaskan!' 
                    : savedRecord.category === 'Baik' 
                    ? 'Bagus Sekali, Pemahaman Anda Kuat!' 
                    : savedRecord.category === 'Cukup' 
                    ? 'Hasil Cukup Baik, Terus Tingkatkan!' 
                    : 'Perlu Belajar dan Berlatih Kembali'}
                </h2>
                <p className="text-xs text-[#706B5C]">
                  {profile.name} ({profile.nim}) • {profile.studentClass} • {savedRecord.date}
                </p>
              </div>

              {/* Angka Skor Utama */}
              <div className="p-6 rounded-3xl bg-[#FAF8F2] border border-[#E5E2D9] max-w-sm mx-auto space-y-1">
                <span className="text-xs text-[#706B5C] font-semibold uppercase">Nilai Akhir Akademik</span>
                <div className="text-5xl font-serif font-bold text-[#6B705C]">
                  {savedRecord.score}
                  <span className="text-lg text-[#A5A58D] font-normal font-sans"> / 100</span>
                </div>
                <div className="pt-2">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-[#E8EDE0] text-[#585D4B] border border-[#C3CDB4]">
                    Predikat: {savedRecord.category}
                  </span>
                </div>
              </div>

              {/* Rincian Angka */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs max-w-xl mx-auto">
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9]">
                  <span className="text-[#706B5C] block">Benar</span>
                  <span className="font-bold text-[#6B705C] text-sm">{savedRecord.correctCount} Soal</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9]">
                  <span className="text-[#706B5C] block">Salah</span>
                  <span className="font-bold text-[#A53F2B] text-sm">{savedRecord.incorrectCount} Soal</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9]">
                  <span className="text-[#706B5C] block">Persentase</span>
                  <span className="font-bold text-[#3E3E3E] text-sm">{savedRecord.score}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9]">
                  <span className="text-[#706B5C] block">Durasi</span>
                  <span className="font-bold text-[#3E3E3E] text-sm">
                    {Math.floor(savedRecord.durationSeconds / 60)}m {savedRecord.durationSeconds % 60}d
                  </span>
                </div>
              </div>

              {/* Tombol Aksi PDF, Cetak, dan Ulang */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => exportPostTestToPDF(profile, savedRecord)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Hasil PDF</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#F5F2EA] text-[#706B5C] hover:text-[#3E3E3E] text-xs font-semibold transition-colors border border-[#E5E2D9] cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Hasil</span>
                </button>

                <button
                  onClick={handleRestartNewSet}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#F5F2EA] text-[#706B5C] hover:text-[#3E3E3E] text-xs font-semibold transition-colors border border-[#E5E2D9] cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Coba Paket Soal Lain</span>
                </button>

                <button
                  onClick={onBackToMap}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#706B5C] text-xs font-semibold transition-colors border border-[#E5E2D9] cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Kembali ke Peta Modul</span>
                </button>
              </div>

            </div>

            {/* Topik yang Perlu Dipelajari Kembali */}
            {savedRecord.incorrectCount > 0 && (
              <div className="bg-[#FAF8F2] rounded-3xl p-6 border border-[#E5E2D9] space-y-3 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A53F2B] block">
                  Rekomendasi Topik Pembelajaran Lanjutan
                </span>
                <p className="text-xs text-[#706B5C]">
                  Berdasarkan analisis butir soal yang belum terjawab dengan tepat, Anda disarankan meninjau materi:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {Array.from(new Set(savedRecord.details.filter(d => !d.isCorrect).map(d => d.topic))).map(top => (
                    <span key={top} className="px-3 py-1 rounded-full bg-[#FFE8D6] text-[#A53F2B] text-xs font-semibold border border-[#DDBEA9]">
                      • {top}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pembahasan Rinci 15 Soal */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xs space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
                <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                  Pembahasan dan Analisis Jawaban
                </h3>
                <span className="text-xs text-[#706B5C]">
                  {savedRecord.details.length} Butir Soal
                </span>
              </div>

              <div className="space-y-4">
                {savedRecord.details.map((item, index) => (
                  <div
                    key={item.questionId}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      item.isCorrect 
                        ? 'bg-[#FAFBF9] border-[#E8EDE0]' 
                        : 'bg-[#FFFDFC] border-[#FFE8D6]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#A5A58D] uppercase">
                          Soal {index + 1} • {item.topic}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-[#3E3E3E]">
                          {item.question}
                        </p>
                      </div>

                      {item.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#585D4B] bg-[#E8EDE0] px-2.5 py-1 rounded-full shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6B705C]" /> Benar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A53F2B] bg-[#FFE8D6] px-2.5 py-1 rounded-full shrink-0">
                          <XCircle className="w-3.5 h-3.5 text-[#A53F2B]" /> Salah
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-[#E5E2D9]/60">
                      <div>
                        <span className="text-[#706B5C]">Jawaban Anda: </span>
                        <span className={`font-bold ${item.isCorrect ? 'text-[#6B705C]' : 'text-[#A53F2B]'}`}>
                          ({item.userAnswer})
                        </span>
                      </div>
                      {!item.isCorrect && (
                        <div>
                          <span className="text-[#706B5C]">Kunci Jawaban yang Benar: </span>
                          <span className="font-bold text-[#6B705C]">({item.correctAnswer})</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9] text-xs text-[#706B5C] italic leading-relaxed">
                      <strong>Pembahasan Kimiawi:</strong> {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )
      )}

      {/* Dialog Konfirmasi Selesaikan Post-Test */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#E5E2D9] shadow-lg space-y-4 text-center animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] text-[#CB997E] flex items-center justify-center mx-auto border border-[#E5E2D9]">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                Kumpulkan Jawaban Post-Test?
              </h3>
              <p className="text-xs text-[#706B5C]">
                Anda telah menjawab <strong>{answeredCount} dari {questions.length}</strong> soal.
                {answeredCount < questions.length && (
                  <span className="text-[#A53F2B] block font-medium mt-1">
                    Peringatan: Masih terdapat {questions.length - answeredCount} soal yang belum dijawab!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#F5F2EA] text-[#706B5C] hover:bg-[#E5E2D9] transition-colors cursor-pointer"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={handleSubmitTest}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#6B705C] text-white hover:bg-[#585D4B] transition-colors cursor-pointer shadow-xs"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
