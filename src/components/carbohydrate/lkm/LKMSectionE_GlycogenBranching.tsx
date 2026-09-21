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
import { ReferenceAssetViewer } from './ReferenceAssetViewer';

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
  const [selectedBranchC1, setSelectedBranchC1] = useState<boolean>(false);
  const [selectedTargetC6, setSelectedTargetC6] = useState<boolean>(false);
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
    setSelectedBranchC1(false);
    setSelectedTargetC6(false);
    setIsBranchAttached(false);
    setAnalysisQ1(null);
    setAnalysisQ2(null);
    setIsAnswerChecked(false);
  };

  const isCorrect = analysisQ1 === 'A' && analysisQ2 === 'A';

  // VISUAL CONTENT TAHAP 1 (ALFA-1,4)
  const renderVisualAlpha14 = () => (
    <div className="w-full space-y-3">
      {/* 1. Gambar Aset Referensi Pengguna untuk Percabangan Glikogen */}
      {/* USER-PROVIDED REFERENCE ASSET — DO NOT REPLACE */}
      <ReferenceAssetViewer
        src="/images/carbohydrate/percabangan-glikogen.png"
        alt="Percabangan Glikogen Alfa-1,4 dan Alfa-1,6 - Aset Referensi Pengguna"
        minHeight="140px"
        aspectRatio="21/9"
      />

      <div className="flex items-center justify-between pb-1">
        <span className="font-bold text-stone-900 text-xs">
          Enzim: <strong className="text-emerald-800">Glikogen Sintase</strong>
        </span>
        <span className="text-[10px] font-mono bg-amber-100 text-amber-950 px-2 py-0.5 rounded font-bold">
          Ikatan α(1→4) Glikosidik Linear
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-3 sm:p-4 shadow-xs space-y-3">
        {/* Diagram Pemanjangan Rantai */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[200px]">
          <svg viewBox="0 0 400 180" className="w-full max-w-md h-auto">
            {/* Ujung Non-Pereduksi Rantai Glikogen (Kiri) */}
            <g transform="translate(30, 45)">
              <rect x="0" y="0" width="140" height="75" rx="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
              <text x="70" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F">
                Rantai Glikogen
              </text>
              <text x="70" y="37" textAnchor="middle" fontSize="8" fill="#92400E">
                Ujung Non-Pereduksi
              </text>
              <text x="70" y="66" textAnchor="middle" fontSize="7" fill="#B45309">
                (Gugus C4-OH Bebas)
              </text>

              {/* Atom C4 Akseptor */}
              <g 
                onClick={() => setSelectedAcceptorC4(!selectedAcceptorC4)} 
                className="cursor-pointer"
              >
                <circle 
                  cx="130" 
                  cy="45" 
                  r="14" 
                  fill={selectedAcceptorC4 ? '#F59E0B' : '#FFFFFF'} 
                  stroke="#B45309" 
                  strokeWidth="2.5"
                  className={selectedAcceptorC4 ? 'animate-pulse' : ''}
                />
                <text x="130" y="48" textAnchor="middle" fontSize="8" fontWeight="bold" fill={selectedAcceptorC4 ? '#FFFFFF' : '#78350F'}>
                  C4
                </text>
              </g>
            </g>

            {/* Donor Glukosil: UDP-Glukosa (Kanan) */}
            <g transform="translate(230, 45)">
              <rect x="0" y="0" width="140" height="75" rx="14" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
              <text x="70" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E3A8A">
                UDP-Glukosa
              </text>
              <text x="70" y="37" textAnchor="middle" fontSize="8" fill="#1D4ED8">
                {isUDPReleased ? 'UDP Tereliminasi' : 'Donor Glukosil Teraktivasi'}
              </text>
              <text x="70" y="66" textAnchor="middle" fontSize="7" fill="#2563EB">
                (Gugus C1 Anomerik Aktif)
              </text>

              {/* Atom C1 Donor */}
              <g 
                onClick={() => setSelectedDonorC1(!selectedDonorC1)} 
                className="cursor-pointer"
              >
                <circle 
                  cx="10" 
                  cy="45" 
                  r="14" 
                  fill={selectedDonorC1 ? '#F59E0B' : '#FFFFFF'} 
                  stroke="#B45309" 
                  strokeWidth="2.5"
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
                <path d="M 170 90 Q 200 65 230 90" fill="none" stroke="#D97706" strokeWidth="4" />
                <circle cx="200" cy="75" r="10" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
                <text x="200" y="78" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#FFFFFF">O</text>
                <text x="200" y="115" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#B45309">
                  Ikatan α(1→4) Terbentuk!
                </text>
              </g>
            ) : (
              <text x="200" y="92" textAnchor="middle" fontSize="9" fill="#78716C" stroke="none">
                {selectedDonorC1 && selectedAcceptorC4 ? 'Siap Kondensasi' : 'Pilih Atom C1 & C4'}
              </text>
            )}

            {/* Pelepasan Molekul UDP */}
            {isUDPReleased && (
              <g transform="translate(300, 130)" className="animate-bounce">
                <rect x="0" y="0" width="80" height="26" rx="8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
                <text x="40" y="17" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E40AF">
                  + UDP Bebas
                </text>
              </g>
            )}
          </svg>

          <div className="text-[11px] text-stone-600 text-center mt-1">
            Ujung Non-Pereduksi (C4-OH) bertindak sebagai nukleofil yang menyerang karbon C1 dari donor UDP-glukosa.
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
            ✓ Rantai linear berhasil diperpanjang oleh Glikogen Sintase melalui ikatan α(1→4)!
          </div>
        )}
      </div>
    </div>
  );

  // VISUAL CONTENT TAHAP 2 (ALFA-1,6 PERCABANGAN)
  const renderVisualAlpha16 = () => (
    <div className="w-full space-y-3">
      {/* 1. Gambar Aset Referensi Pengguna untuk Percabangan Glikogen */}
      {/* USER-PROVIDED REFERENCE ASSET — DO NOT REPLACE */}
      <ReferenceAssetViewer
        src="/images/carbohydrate/percabangan-glikogen.png"
        alt="Percabangan Glikogen Alfa-1,4 dan Alfa-1,6 - Aset Referensi Pengguna"
        minHeight="140px"
        aspectRatio="21/9"
      />

      <div className="flex items-center justify-between pb-1">
        <span className="font-bold text-stone-900 text-xs">
          Enzim: <strong className="text-emerald-800">Branching Enzyme (Amilo-α(1,4)→α(1,6)-transglukosidase)</strong>
        </span>
        <span className="text-[10px] font-mono bg-blue-100 text-blue-950 px-2 py-0.5 rounded font-bold">
          Ikatan α(1→6) Glikosidik Cabang
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-3 sm:p-4 shadow-xs space-y-3">
        {/* Ringkasan Arsitektur Makromolekul Glikogen Sesuai Panduan Wajib */}
        <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-1.5 bg-purple-50 rounded-lg border border-purple-200">
            <span className="block font-bold text-purple-950">Pusat Partikel</span>
            <span className="text-purple-700">Protein Glikogenin</span>
          </div>
          <div className="p-1.5 bg-amber-50 rounded-lg border border-amber-200">
            <span className="block font-bold text-amber-950">1 Ujung Pereduksi</span>
            <span className="text-amber-700">Terikat di Glikogenin</span>
          </div>
          <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="block font-bold text-emerald-950">Banyak Ujung</span>
            <span className="text-emerald-700">Nonreduksi (Perifer)</span>
          </div>
        </div>

        {/* Rantai 15 Residu Glukosa (a s.d. o) dan Glikogenin Sesuai Diagram Referensi Pengguna */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[240px]">
          <div className="text-xs font-bold text-stone-900 mb-1 flex items-center justify-between w-full">
            <span>Model Rantai Biosintesis: 15 Residu Glukosa (a s.d. o) &amp; Glikogenin</span>
            <span className="text-[10px] font-mono bg-red-100 text-red-900 px-2 py-0.5 rounded font-bold">
              Ikatan Linear α(1→4) &amp; Cabang α(1→6)
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 w-full mt-2">
            {!isBranchAttached ? (
              /* TAMPILAN 1: SEBELUM / SAAT PEMOTONGAN SEGMEN CABANG */
              <div className="w-full flex flex-col items-center gap-2 overflow-x-auto py-2">
                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {/* Blok Segmen Cabang: o, n, m, l, k (dipotong dari ujung nonreduksi) */}
                  <div className={`p-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                    isSegmentCut ? 'border-dashed border-red-500 bg-red-50/70 animate-pulse' : 'border-amber-300 bg-amber-50/50'
                  }`}>
                    <div className="text-[9px] font-mono text-red-700 font-bold px-1">
                      {isSegmentCut ? 'Segmen Terpotong:' : 'Ujung Nonreduksi:'}
                    </div>
                    {['o', 'n', 'm', 'l', 'k'].map(letter => (
                      <div
                        key={letter}
                        onClick={letter === 'k' && isSegmentCut ? () => setSelectedBranchC1(!selectedBranchC1) : undefined}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex flex-col items-center justify-center text-[10px] font-bold border transition-all ${
                          letter === 'k' && isSegmentCut
                            ? selectedBranchC1
                              ? 'bg-blue-300 border-blue-600 text-blue-950 ring-2 ring-blue-500 scale-110 cursor-pointer animate-pulse'
                              : 'bg-blue-100 border-blue-500 text-blue-900 cursor-pointer hover:scale-105'
                            : 'bg-red-500 border-red-700 text-white shadow-2xs'
                        }`}
                        title={letter === 'k' ? 'Residu k: Karbon C1 donor cabang' : `Residu ${letter}`}
                      >
                        <span>{letter}</span>
                        {letter === 'k' && isSegmentCut && (
                          <span className="text-[6.5px] font-mono font-bold text-blue-950">C1</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <span className={`font-bold px-1 ${isSegmentCut ? 'text-red-500 text-xs' : 'text-stone-400'}`}>
                    {isSegmentCut ? '✂ [Terputus]' : '—'}
                  </span>

                  {/* Rantai Inti yang Tertinggal: j, i, h, g, f, e, d, c, b, a */}
                  <div className="p-1.5 rounded-xl border border-stone-200 bg-white flex items-center gap-1">
                    {['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'].map(letter => (
                      <div
                        key={letter}
                        onClick={letter === 'h' && isSegmentCut ? () => setSelectedTargetC6(!selectedTargetC6) : undefined}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex flex-col items-center justify-center text-[10px] font-bold border transition-all ${
                          letter === 'h' && isSegmentCut
                            ? selectedTargetC6
                              ? 'bg-orange-200 border-orange-600 text-orange-950 ring-2 ring-orange-500 scale-110 cursor-pointer animate-pulse'
                              : 'bg-orange-100 border-orange-500 text-orange-950 cursor-pointer hover:scale-105'
                            : letter === 'h'
                              ? 'bg-red-500 border-red-700 text-white'
                              : 'bg-red-500 border-red-700 text-white'
                        }`}
                        title={letter === 'h' ? 'Residu h: Karbon C6 akseptor titik cabang' : `Residu ${letter}`}
                      >
                        <span>{letter}</span>
                        {letter === 'h' && isSegmentCut && (
                          <span className="text-[6px] font-mono font-bold text-orange-950">C6</span>
                        )}
                      </div>
                    ))}

                    {/* Residu Glikogenin (Pita Hijau) */}
                    <div className="flex items-center gap-1 pl-1 border-l border-stone-200 ml-1">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold" title="Ikatan O-glikosidik Tyr-194">
                        O
                      </div>
                      <div className="px-2 py-1 bg-emerald-100 border border-emerald-400 rounded-lg text-[9px] font-bold text-emerald-900 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Glikogenin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TAMPILAN 2: SETELAH CABANG ALFA-1,6 BERHASIL TERSAMBUNG KE RESIDU h */
              <div className="w-full p-3 bg-white rounded-xl border border-stone-200 flex flex-col items-center gap-3">
                <div className="flex items-start gap-4">
                  {/* Diagram Cabang Sprouting */}
                  <div className="relative pl-6 py-4">
                    {/* Cabang Diagonal ke Atas: k -> l -> m -> n -> o */}
                    <div className="flex items-center gap-1 -rotate-25 origin-bottom-left mb-3 ml-20">
                      <span className="text-[8px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded mr-1">
                        Cabang α(1→6):
                      </span>
                      {['k', 'l', 'm', 'n', 'o'].map(letter => (
                        <div
                          key={letter}
                          className={`w-7 h-7 rounded-full flex flex-col items-center justify-center text-[10px] font-bold border ${
                            letter === 'o'
                              ? 'bg-amber-400 border-amber-600 text-amber-950 ring-2 ring-amber-400'
                              : 'bg-red-500 border-red-700 text-white'
                          }`}
                        >
                          <span>{letter}</span>
                          {letter === 'o' && <span className="text-[5.5px] font-bold text-amber-950">UJUNG</span>}
                        </div>
                      ))}
                    </div>

                    {/* Rantai Utama: j -> i -> h -> g -> f -> e -> d -> c -> b -> a -> Glikogenin */}
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] font-bold text-stone-500 mr-1">Rantai Utama:</span>
                      {['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'].map(letter => (
                        <div
                          key={letter}
                          className={`w-7 h-7 rounded-full flex flex-col items-center justify-center text-[10px] font-bold border ${
                            letter === 'j'
                              ? 'bg-amber-400 border-amber-600 text-amber-950 ring-2 ring-amber-400'
                              : letter === 'h'
                                ? 'bg-red-600 border-red-800 text-white ring-2 ring-blue-500'
                                : 'bg-red-500 border-red-700 text-white'
                          }`}
                        >
                          <span>{letter}</span>
                          {letter === 'j' && <span className="text-[5.5px] font-bold text-amber-950">UJUNG</span>}
                          {letter === 'h' && <span className="text-[5.5px] font-bold text-blue-200">α(1→6)</span>}
                        </div>
                      ))}

                      {/* Glikogenin */}
                      <div className="flex items-center gap-1 pl-1 ml-1 border-l border-stone-200">
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">
                          O
                        </div>
                        <div className="px-2 py-1 bg-emerald-100 border border-emerald-400 rounded-lg text-[9px] font-bold text-emerald-900">
                          Glikogenin
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2 UJUNG NONREDUKSI (NONREDUCING ENDS) */}
                <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-center w-full">
                  <div className="text-xs font-bold text-amber-950 flex items-center justify-center gap-1.5">
                    <span>★ Terbentuk 2 Ujung Non-Pereduksi (Nonreducing Ends): Residu &apos;j&apos; &amp; Residu &apos;o&apos;</span>
                  </div>
                  <div className="text-[10px] text-amber-900 mt-0.5">
                    Memungkinkan pemanjangan paralel oleh glikogen sintase [α(1→4)] dan percabangan berulang [α(1→6)] hingga membentuk partikel bola glikogen utuh.
                  </div>
                </div>
              </div>
            )}

            {/* Indikator Pemilihan Atom untuk Percabangan */}
            {isSegmentCut && !isBranchAttached && (
              <div className="p-2 bg-stone-100 rounded-lg text-xs text-center border border-stone-200 w-full">
                <span className="text-stone-700">Pasangkan atom: </span>
                <span className={`px-1.5 py-0.5 rounded font-bold mr-1 ${selectedBranchC1 ? 'bg-blue-200 text-blue-950' : 'bg-stone-200 text-stone-600'}`}>
                  C1 Segmen Cabang (Residu k)
                </span>
                <span className="text-stone-500">&amp;</span>
                <span className={`px-1.5 py-0.5 rounded font-bold ml-1 ${selectedTargetC6 ? 'bg-orange-200 text-orange-950' : 'bg-stone-200 text-stone-600'}`}>
                  C6 Rantai Utama (Residu h)
                </span>
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
            onClick={() => {
              if (isSegmentCut && selectedBranchC1 && selectedTargetC6) {
                setIsBranchAttached(true);
              }
            }}
            disabled={!isSegmentCut || isBranchAttached || !selectedBranchC1 || !selectedTargetC6}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
              !isSegmentCut || isBranchAttached || !selectedBranchC1 || !selectedTargetC6
                ? 'bg-stone-100 text-stone-400 border border-stone-200' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>2. Bentuk Ikatan α(1→6) (C1 - C6)</span>
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
