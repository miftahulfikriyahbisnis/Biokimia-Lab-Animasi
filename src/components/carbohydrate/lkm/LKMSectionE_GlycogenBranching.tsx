/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  GitBranch, 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { LKMProgressiveActivityLayout, InteractionPhase } from './interactive/LKMProgressiveActivityLayout';

export const LKMSectionE_GlycogenBranching: React.FC<{
  onBack: () => void;
  onNext: () => void;
}> = ({ onBack, onNext }) => {
  const [activeSubTab, setActiveSubTab] = useState<'ALPHA_14' | 'ALPHA_16'>('ALPHA_14');

  // --- SUB-TAB 1: PEMANJANGAN ALFA-1,4 ---
  const [phase14, setPhase14] = useState<InteractionPhase>('PREDICTION');
  const [selectedDonorC1, setSelectedDonorC1] = useState<boolean>(false);
  const [selectedAcceptorC4, setSelectedAcceptorC4] = useState<boolean>(false);
  const [isAlpha14Formed, setIsAlpha14Formed] = useState<boolean>(false);
  const [isUDPReleased, setIsUDPReleased] = useState<boolean>(false);

  // --- SUB-TAB 2: PERCABANGAN ALFA-1,6 ---
  const [phase16, setPhase16] = useState<InteractionPhase>('PREDICTION');
  const [isSegmentCut, setIsSegmentCut] = useState<boolean>(false);
  const [isBranchAttached, setIsBranchAttached] = useState<boolean>(false);
  
  // Analisis Pertanyaan Bagian E (2 Pertanyaan Wajib)
  const [analysisQ1, setAnalysisQ1] = useState<string | null>(null);
  const [analysisQ2, setAnalysisQ2] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(100);

  const hints = [
    'Ikatan rantai linear pemanjangan selalu menghubungkan C1 donor (UDP-Glukosa) ke C4 ujung non-pereduksi via ikatan α(1→4) yang dikatalisis oleh Glikogen Sintase.',
    'Enzim pencabang (Branching enzyme / Amilo-α(1,4)→α(1,6)-transglukosidase) memotong blok minimal 6–7 residu dari rantai panjang minimal 11 residu.',
    'Blok tersebut dipindahkan ke gugus hidroksil atom C6 dari residu internal dengan jarak minimal 4 residu dari percabangan sebelumnya.'
  ];

  const handleConnectAlpha14 = () => {
    if (selectedDonorC1 && selectedAcceptorC4) {
      setIsAlpha14Formed(true);
      setIsUDPReleased(true);
    }
  };

  const handleCutBlock = () => {
    setIsSegmentCut(true);
  };

  const handleAttachBranch = () => {
    if (isSegmentCut) {
      setIsBranchAttached(true);
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    const correct = analysisQ1 === 'A' && analysisQ2 === 'A';
    if (!correct) {
      setScore(prev => Math.max(40, prev - 25));
    }
  };

  const handleReset = () => {
    setSelectedDonorC1(false);
    setSelectedAcceptorC4(false);
    setIsAlpha14Formed(false);
    setIsUDPReleased(false);
    setIsSegmentCut(false);
    setIsBranchAttached(false);
    setAnalysisQ1(null);
    setAnalysisQ2(null);
    setIsAnswerChecked(false);
  };

  const isCorrect = analysisQ1 === 'A' && analysisQ2 === 'A';

  // VISUAL CONTENT TAHAP 1 (ALFA-1,4)
  const renderVisualAlpha14 = () => (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="font-bold text-stone-900 text-xs">
          Enzim: <strong className="text-emerald-800">Glikogen Sintase</strong>
        </span>
        <span className="text-[10px] font-mono bg-amber-100 text-amber-950 px-2 py-0.5 rounded font-bold">
          Ikatan α(1→4) Glikosidik
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
        {/* Diagram Pemanjangan Rantai */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[200px]">
          <svg viewBox="0 0 380 180" className="w-full max-w-md h-auto">
            {/* Ujung Non-Pereduksi Rantai Glikogen (Kiri) */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="130" height="70" rx="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
              <text x="65" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F">
                Rantai Glikogen
              </text>
              <text x="65" y="42" textAnchor="middle" fontSize="8" fill="#92400E">
                Ujung Non-Pereduksi
              </text>

              {/* Atom C4 Akseptor */}
              <g 
                onClick={() => setSelectedAcceptorC4(true)} 
                className="cursor-pointer"
              >
                <circle 
                  cx="120" 
                  cy="45" 
                  r="14" 
                  fill={selectedAcceptorC4 ? '#F59E0B' : '#FFFFFF'} 
                  stroke="#B45309" 
                  strokeWidth="2"
                  className={selectedAcceptorC4 ? 'animate-pulse' : ''}
                />
                <text x="120" y="48" textAnchor="middle" fontSize="8" fontWeight="bold" fill={selectedAcceptorC4 ? '#FFFFFF' : '#78350F'}>
                  C4-OH
                </text>
              </g>
            </g>

            {/* Donor Glukosil: UDP-Glukosa (Kanan) */}
            <g transform="translate(220, 50)">
              <rect x="0" y="0" width="120" height="70" rx="14" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
              <text x="60" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E3A8A">
                UDP-Glukosa
              </text>
              <text x="60" y="42" textAnchor="middle" fontSize="8" fill="#1D4ED8">
                {isUDPReleased ? 'UDP Terlepas' : 'Donor Glukosil Aktif'}
              </text>

              {/* Atom C1 Donor */}
              <g 
                onClick={() => setSelectedDonorC1(true)} 
                className="cursor-pointer"
              >
                <circle 
                  cx="10" 
                  cy="45" 
                  r="14" 
                  fill={selectedDonorC1 ? '#F59E0B' : '#FFFFFF'} 
                  stroke="#B45309" 
                  strokeWidth="2"
                  className={selectedDonorC1 ? 'animate-pulse' : ''}
                />
                <text x="10" y="48" textAnchor="middle" fontSize="8" fontWeight="bold" fill={selectedDonorC1 ? '#FFFFFF' : '#78350F'}>
                  C1
                </text>
              </g>
            </g>

            {/* Ikatan Glikosidik Alfa-1,4 yang Terbentuk */}
            {isAlpha14Formed ? (
              <g>
                <path d="M 160 95 Q 190 70 230 95" fill="none" stroke="#D97706" strokeWidth="4" />
                <circle cx="195" cy="80" r="10" fill="#EF4444" />
                <text x="195" y="83" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFF">O</text>
                <text x="195" y="115" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B45309">
                  Ikatan α(1→4)
                </text>
              </g>
            ) : (
              <text x="195" y="95" textAnchor="middle" fontSize="9" fill="#9CA3AF" stroke="none">
                {selectedDonorC1 && selectedAcceptorC4 ? 'Klik Sambungkan' : 'Pilih C1 & C4'}
              </text>
            )}

            {/* Pelepasan Molekul UDP */}
            {isUDPReleased && (
              <g transform="translate(290, 130)" className="animate-bounce">
                <rect x="0" y="0" width="70" height="24" rx="8" fill="#DBEAFE" stroke="#2563EB" />
                <text x="35" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E40AF">
                  + UDP Bebas
                </text>
              </g>
            )}
          </svg>

          <div className="text-[11px] text-stone-600 text-center mt-1">
            Ujung Non-Pereduksi (C4-OH bebas) menerima residu C1 glukosil baru dengan eliminasi molekul UDP.
          </div>
        </div>

        {/* Tombol Interaktif Sambungkan */}
        {selectedDonorC1 && selectedAcceptorC4 && !isAlpha14Formed && (
          <button
            type="button"
            onClick={handleConnectAlpha14}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Zap className="w-4 h-4" />
            <span>Kondensasi: Bentuk Ikatan α(1→4) & Lepaskan UDP</span>
          </button>
        )}

        {isAlpha14Formed && (
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-bold text-center">
            ✓ Rantai linear berhasil diperpanjang oleh Glikogen Sintase!
          </div>
        )}
      </div>
    </div>
  );

  // VISUAL CONTENT TAHAP 2 (ALFA-1,6 PERCABANGAN)
  const renderVisualAlpha16 = () => (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="font-bold text-stone-900 text-xs">
          Enzim: <strong className="text-emerald-800">Branching Enzyme (Amilo-α(1,4)→α(1,6)-transglukosidase)</strong>
        </span>
        <span className="text-[10px] font-mono bg-blue-100 text-blue-950 px-2 py-0.5 rounded font-bold">
          Ikatan α(1→6) Glikosidik
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
        {/* Rantai 11 Residu Glukosa */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[220px]">
          <div className="text-[11px] font-bold text-stone-800 mb-2">
            Rantai Linear Awal: 11 Residu Glukosa (Minimal 11 Residu Diperlukan)
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            {/* Rantai Utama Internal (Residu 1 - 4) */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-stone-500 mr-1">Rantai Inti:</span>
              {[1, 2, 3, 4].map(n => (
                <div
                  key={n}
                  onClick={n === 4 && isSegmentCut ? handleAttachBranch : undefined}
                  className={`w-9 h-9 rounded-full flex flex-col items-center justify-center text-[10px] font-bold border transition-all ${
                    n === 4 && isSegmentCut && !isBranchAttached
                      ? 'bg-orange-100 border-orange-500 text-orange-950 ring-2 ring-orange-400 cursor-pointer animate-pulse'
                      : 'bg-amber-300 border-amber-600 text-stone-900'
                  }`}
                  title={n === 4 ? 'Residu Internal Target C6' : undefined}
                >
                  <span>G{n}</span>
                  {n === 4 && <span className="text-[7px] text-stone-700">C6-OH</span>}
                </div>
              ))}
              <span className="text-stone-400 font-bold px-1">—</span>

              {/* Blok Terminal 7 Residu (Residu 5 - 11) */}
              <div className={`p-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                isSegmentCut ? 'border-dashed border-red-500 bg-red-50/50' : 'border-amber-400 bg-amber-50/60'
              }`}>
                {[5, 6, 7, 8, 9, 10, 11].map(n => (
                  <div
                    key={n}
                    className="w-7 h-7 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-[9px] font-bold border border-amber-600"
                  >
                    G{n}
                  </div>
                ))}
              </div>
            </div>

            {/* Cabang Alfa-1,6 Baru yang Ditranslokasikan */}
            {isBranchAttached && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-300 w-full animate-fadeIn flex flex-col items-center">
                <div className="flex items-center gap-1 text-xs font-bold text-blue-950 mb-1">
                  <GitBranch className="w-4 h-4 text-blue-700" />
                  <span>Titik Cabang α(1→6) Berhasil Dibuat pada Residu G4!</span>
                </div>
                <div className="text-[11px] text-blue-900">
                  Residu 5–11 sekarang membentuk rantai cabang baru. Jumlah ujung non-pereduksi berlipat ganda dari 1 menjadi 2!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kontrol Interaktif Branching */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleCutBlock}
            disabled={isSegmentCut}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
              isSegmentCut ? 'bg-stone-100 text-stone-400 border border-stone-200' : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>1. Potong Blok 7 Residu</span>
          </button>

          <button
            type="button"
            onClick={handleAttachBranch}
            disabled={!isSegmentCut || isBranchAttached}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
              !isSegmentCut || isBranchAttached ? 'bg-stone-100 text-stone-400 border border-stone-200' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>2. Sambung ke C6 Residu G4</span>
          </button>
        </div>
      </div>
    </div>
  );

  // CONTROL CONTENT BAGIAN E (5 FASE PROGRESIF DENGAN 2 PERTANYAAN ANALISIS WAJIB)
  const renderControlContent = () => {
    return (
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Bagian E • Analisis Struktur Percabangan</span>
          <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
            Evaluasi Biokimiawi & Patologi Enzim Pencabang
          </h4>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            Selesaikan dua pertanyaan analisis krusial berikut:
          </p>
        </div>

        {/* Pertanyaan 1: Keuntungan Struktur Bercabang */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
          <label className="font-bold text-stone-900 block">
            1. Mengapa struktur bercabang lebih menguntungkan daripada rantai lurus panjang?
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'A', label: 'Meningkatkan kelarutan glikogen dan memperbanyak ujung non-pereduksi untuk sintesis dan degradasi cepat.' },
              { id: 'B', label: 'Mengurangi berat molekul glikogen agar mudah dipecah.' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnalysisQ1(opt.id)}
                className={`w-full p-2.5 rounded-lg border text-left text-xs cursor-pointer transition-all ${
                  analysisQ1 === opt.id ? 'bg-stone-900 text-amber-300 font-bold' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <strong>{opt.id}. </strong>{opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pertanyaan 2: Defisiensi Enzim Pencabang */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
          <label className="font-bold text-stone-900 block">
            2. Apa yang terjadi jika enzim pencabang mengalami defisiensi klinis?
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'A', label: 'Terbentuk glikogen abnormal dengan cabang sangat sedikit dan rantai luar panjang (Penyakit Andersen / GSD IV).' },
              { id: 'B', label: 'Glikogen tidak dapat dibentuk sama sekali.' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnalysisQ2(opt.id)}
                className={`w-full p-2.5 rounded-lg border text-left text-xs cursor-pointer transition-all ${
                  analysisQ2 === opt.id ? 'bg-stone-900 text-amber-300 font-bold' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <strong>{opt.id}. </strong>{opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Umpan Balik Pemeriksaan */}
        {isAnswerChecked && (
          <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
            isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
          }`}>
            <span className="font-bold flex items-center gap-1.5">
              {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
              <span>{isCorrect ? 'Jawaban Anda Tepat Sekali!' : 'Periksa Kembali Pilihan Anda'}</span>
            </span>
            <p className="text-[11px] leading-relaxed">
              {isCorrect 
                ? 'Struktur bercabang menyediakan ratusan ujung non-pereduksi yang memungkinkan glikogen fosforilase memobilisasi ribuan glukosa per detik saat darurat energi. Defisiensi enzim ini memicu penumpukan amilopektin-like polimer yang memicu sirosis hati pada bayi (Penyakit Andersen).'
                : 'Pilihan yang benar untuk kedua pertanyaan adalah A.'}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6" id="lkm-section-e">
      {/* Header Bagian E */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <GitBranch className="w-4 h-4 text-amber-700" />
          <span>Bagian E • Polimerisasi & Percabangan Glikogen</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Pemanjangan Rantai (Ikatan α-1,4) dan Pembentukan Cabang (Ikatan α-1,6)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Pahami sinergi antara Glikogen Sintase (pembentuk ikatan linear) dan Branching Enzyme (pembentuk titik cabang) dalam menciptakan molekul glikogen yang sangat kompak dan mudah dimobilisasi.
        </p>
      </div>

      {/* Selector Sub-Tab */}
      <div className="flex items-center gap-2 bg-[#FAF8F5] p-1.5 rounded-2xl border border-stone-200">
        <button
          type="button"
          onClick={() => setActiveSubTab('ALPHA_14')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeSubTab === 'ALPHA_14' ? 'bg-stone-900 text-amber-300 shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          1. Pemanjangan Linear (Ikatan α-1,4)
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('ALPHA_16')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeSubTab === 'ALPHA_16' ? 'bg-stone-900 text-amber-300 shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          2. Percabangan (Ikatan α-1,6)
        </button>
      </div>

      {/* 2-Column Progressive Activity Layout */}
      <LKMProgressiveActivityLayout
        title={activeSubTab === 'ALPHA_14' ? 'Pemanjangan Linear oleh Glikogen Sintase' : 'Pembentukan Cabang oleh Branching Enzyme'}
        badge="Bagian E • 5 Tahap Progresif"
        currentPhase={activeSubTab === 'ALPHA_14' ? phase14 : phase16}
        onPhaseChange={activeSubTab === 'ALPHA_14' ? setPhase14 : setPhase16}
        visualContent={activeSubTab === 'ALPHA_14' ? renderVisualAlpha14() : renderVisualAlpha16()}
        controlContent={renderControlContent()}
        hints={hints}
        onReset={handleReset}
        onCheckAnswer={handleCheckAnswer}
        canCheck={analysisQ1 !== null && analysisQ2 !== null}
        score={score}
        isCorrect={isCorrect}
        explanation="Pemanjangan ikatan α(1→4) berlangsung pada ujung non-pereduksi oleh glikogen sintase menggunakan UDP-glukosa. Branching enzyme memotong segmen terminal 7 residu dari rantai minimal 11 residu dan mentranslokasikannya ke posisi C6 residu internal dengan ikatan α(1→6). Percabangan meningkatkan kelarutan glikogen secara dramatis dan melipatgandakan jumlah ujung non-pereduksi untuk sintesis dan degradasi kilat."
      />

      {/* Navigasi Antar-Bagian */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian D</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-f"
        >
          <span>Lanjut ke Bagian F: Tiga Bypass Glukoneogenesis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
