/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Info,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { LKMProgressiveActivityLayout, InteractionPhase } from './interactive/LKMProgressiveActivityLayout';

export const LKMSectionD_GlucosylActivation: React.FC<{
  onBack: () => void;
  onNext: () => void;
}> = ({ onBack, onNext }) => {
  // Sub-stage selector: 1: Isomerisasi G6P->G1P, 2: Sintesis UDP-Glc, 3: Primer Glikogenin
  const [subStage, setSubStage] = useState<1 | 2 | 3>(1);

  // --- SUB-STAGE 1 STATE (Isomerisasi G6P -> G1P) ---
  const [stage1Phase, setStage1Phase] = useState<InteractionPhase>('PREDICTION');
  const [stage1Prediction, setStage1Prediction] = useState<string | null>(null);
  const [stage1PhosphatePos, setStage1PhosphatePos] = useState<'C6' | 'INTERMEDIATE' | 'C1'>('C6');
  const [stage1Analysis, setStage1Analysis] = useState<string | null>(null);
  const [stage1Score, setStage1Score] = useState<number>(100);

  // --- SUB-STAGE 2 STATE (Sintesis UDP-Glukosa) ---
  const [stage2Phase, setStage2Phase] = useState<InteractionPhase>('PREDICTION');
  const [stage2Prediction, setStage2Prediction] = useState<string | null>(null);
  const [selectedReactants, setSelectedReactants] = useState<{ g1p: boolean; utp: boolean }>({ g1p: false, utp: false });
  const [isUDPFormed, setIsUDPFormed] = useState<boolean>(false);
  const [isPPiHydrolyzed, setIsPPiHydrolyzed] = useState<boolean>(false);
  const [stage2Analysis, setStage2Analysis] = useState<string | null>(null);
  const [stage2Score, setStage2Score] = useState<number>(100);

  // --- SUB-STAGE 3 STATE (Primer Glikogenin) ---
  const [stage3Phase, setStage3Phase] = useState<InteractionPhase>('PREDICTION');
  const [stage3Prediction, setStage3Prediction] = useState<string | null>(null);
  const [primerCount, setPrimerCount] = useState<number>(0); // 0 to 8
  const [releasedUDPCount, setReleasedUDPCount] = useState<number>(0);
  const [stage3Analysis, setStage3Analysis] = useState<string | null>(null);
  const [stage3Score, setStage3Score] = useState<number>(100);

  // ==========================================
  // HANDLERS TAHAP 1
  // ==========================================
  const handleTransferPhosphateC6toC1 = () => {
    setStage1PhosphatePos('INTERMEDIATE');
    setTimeout(() => {
      setStage1PhosphatePos('C1');
    }, 700);
  };

  // ==========================================
  // HANDLERS TAHAP 2
  // ==========================================
  const handleToggleReactant = (type: 'g1p' | 'utp') => {
    if (isUDPFormed) return;
    setSelectedReactants(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      if (updated.g1p && updated.utp) {
        setIsUDPFormed(true);
        setTimeout(() => {
          setIsPPiHydrolyzed(true);
        }, 800);
      }
      return updated;
    });
  };

  // ==========================================
  // HANDLERS TAHAP 3
  // ==========================================
  const handleAddUDPGlucose = () => {
    if (primerCount < 8) {
      setPrimerCount(prev => prev + 1);
      setReleasedUDPCount(prev => prev + 1);
    }
  };

  // ==========================================
  // RENDERING TAHAP 1: ISOMERISASI G6P -> G1P
  // ==========================================
  const renderVisualStage1 = () => (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="font-bold text-stone-900 text-xs">
          Enzim Katalis: <strong className="text-emerald-800">Fosfoglukomutase (Ser-PO₃²⁻)</strong>
        </span>
        <span className="text-[10px] font-mono bg-stone-200 text-stone-800 px-2 py-0.5 rounded font-bold">
          {stage1PhosphatePos === 'C6' ? 'Glukosa-6-Fosfat' : stage1PhosphatePos === 'INTERMEDIATE' ? 'Zat Antara: G-1,6-Bisfosfat' : 'Glukosa-1-Fosfat'}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
        <svg viewBox="0 0 360 200" className="w-full max-w-sm mx-auto h-auto">
          {/* Cincin Haworth Glukosa */}
          <polygon
            points="240,100 200,150 140,150 100,100 140,55 200,55"
            fill="#FFFDF7"
            stroke="#78716C"
            strokeWidth="3.5"
          />
          <line x1="100" y1="100" x2="140" y2="150" stroke="#44403C" strokeWidth="5" />
          <line x1="140" y1="150" x2="200" y2="150" stroke="#44403C" strokeWidth="5" />
          <line x1="200" y1="150" x2="240" y2="100" stroke="#44403C" strokeWidth="5" />

          {/* Oksigen Cincin */}
          <circle cx="200" cy="55" r="13" fill="#EF4444" />
          <text x="200" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">O</text>

          {/* C5 ke C6 */}
          <line x1="140" y1="55" x2="100" y2="22" stroke="#78716C" strokeWidth="3" />

          {/* KARBON C6 (-CH2OH atau Fosfat) */}
          <g 
            onClick={stage1PhosphatePos === 'C6' ? handleTransferPhosphateC6toC1 : undefined}
            className={stage1PhosphatePos === 'C6' ? 'cursor-pointer' : ''}
          >
            <circle 
              cx="100" 
              cy="22" 
              r={stage1PhosphatePos === 'C6' || stage1PhosphatePos === 'INTERMEDIATE' ? 20 : 14} 
              fill={stage1PhosphatePos === 'C6' || stage1PhosphatePos === 'INTERMEDIATE' ? '#F97316' : '#E7E5E4'}
              stroke="#C2410C"
              strokeWidth={stage1PhosphatePos === 'C6' ? 2.5 : 1}
              className={stage1PhosphatePos === 'C6' ? 'animate-pulse' : ''}
            />
            <text x="100" y="20" textAnchor="middle" fontSize="8" fontWeight="bold" fill={stage1PhosphatePos === 'C6' || stage1PhosphatePos === 'INTERMEDIATE' ? '#FFFFFF' : '#44403C'}>
              C6
            </text>
            <text x="100" y="29" textAnchor="middle" fontSize="6.5" fill={stage1PhosphatePos === 'C6' || stage1PhosphatePos === 'INTERMEDIATE' ? '#FFFFFF' : '#78716C'}>
              {stage1PhosphatePos === 'C6' || stage1PhosphatePos === 'INTERMEDIATE' ? '℗-Fosfat' : '-OH'}
            </text>
          </g>

          {/* KARBON C1 ANOMERIK */}
          <g 
            onClick={stage1PhosphatePos === 'C6' ? handleTransferPhosphateC6toC1 : undefined}
            className="cursor-pointer"
          >
            <circle 
              cx="240" 
              cy="100" 
              r={stage1PhosphatePos === 'C1' || stage1PhosphatePos === 'INTERMEDIATE' ? 22 : 14} 
              fill={stage1PhosphatePos === 'C1' || stage1PhosphatePos === 'INTERMEDIATE' ? '#F97316' : '#FEF08A'}
              stroke="#C2410C"
              strokeWidth={stage1PhosphatePos === 'C1' ? 3 : 1.5}
              className={stage1PhosphatePos === 'C1' ? 'animate-bounce' : ''}
            />
            <text x="240" y="98" textAnchor="middle" fontSize="8" fontWeight="bold" fill={stage1PhosphatePos === 'C1' || stage1PhosphatePos === 'INTERMEDIATE' ? '#FFFFFF' : '#854D0E'}>
              C1
            </text>
            <text x="240" y="108" textAnchor="middle" fontSize="6.5" fill={stage1PhosphatePos === 'C1' || stage1PhosphatePos === 'INTERMEDIATE' ? '#FFFFFF' : '#A16207'}>
              {stage1PhosphatePos === 'C1' || stage1PhosphatePos === 'INTERMEDIATE' ? '℗-Fosfat' : '-OH'}
            </text>
          </g>

          {/* Enzim Fosfoglukomutase di Tengah */}
          <g transform="translate(145, 85)">
            <ellipse cx="25" cy="20" rx="32" ry="18" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" />
            <text x="25" y="17" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#065F46">Fosfoglukomutase</text>
            <text x="25" y="27" textAnchor="middle" fontSize="6.5" fill="#047857">Serin-PO₃²⁻</text>
          </g>
        </svg>

        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-stone-800 text-center">
          {stage1PhosphatePos === 'C6' && (
            <span>Ketuk atom <strong>C6</strong> atau <strong>C1</strong> untuk memindahkan fosfat melalui zat antara <strong>Glukosa-1,6-bisfosfat</strong>.</span>
          )}
          {stage1PhosphatePos === 'INTERMEDIATE' && (
            <span className="font-bold text-amber-900">Enzim mendonasikan fosfat ke C1 membentuk zat antara Glukosa-1,6-bisfosfat...</span>
          )}
          {stage1PhosphatePos === 'C1' && (
            <span className="font-bold text-emerald-900">✓ Fosfat pada C6 diambil kembali oleh enzim. Terbentuk Glukosa-1-Fosfat (G1P)!</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderControlStage1 = () => {
    switch (stage1Phase) {
      case 'PREDICTION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 1 • Prediksi Isomerisasi</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Mengapa Fosfat Dipindahkan ke C1?
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Prediksikan mengapa biosintesis glikogen membutuhkan Glukosa-1-fosfat (G1P), bukan langsung menggunakan G6P:
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStage1Prediction('A')}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  stage1Prediction === 'A' ? 'bg-amber-100 border-amber-600 text-amber-950 font-semibold ring-1 ring-amber-500' : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                A. Karbon C1 adalah karbon anomerik reaktif yang dibutuhkan untuk mengikat nukleotida UTP pada tahap aktivasi.
              </button>
              <button
                type="button"
                onClick={() => setStage1Prediction('B')}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  stage1Prediction === 'B' ? 'bg-amber-100 border-amber-600 text-amber-950 font-semibold ring-1 ring-amber-500' : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                B. Supaya molekul glukosa mengecil ukurannya agar muat masuk ke mitokondria.
              </button>
            </div>
          </div>
        );

      case 'MANIPULATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 1 • Manipulasi Enzimatis</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Pindahkan Fosfat dari C6 ke C1
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Ketuk atom C6 atau C1 pada diagram cincin di sebelah kiri untuk memicu reaksi fosfoglukomutase.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span>Posisi Fosfat:</span>
                <span className="font-bold text-amber-900">
                  {stage1PhosphatePos === 'C6' ? 'C6 (G6P)' : stage1PhosphatePos === 'INTERMEDIATE' ? 'C1 & C6 (G-1,6-BP)' : 'C1 (G1P)'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleTransferPhosphateC6toC1}
                disabled={stage1PhosphatePos === 'C1'}
                className="w-full py-2 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-bold text-xs disabled:opacity-40 cursor-pointer shadow-2xs"
              >
                {stage1PhosphatePos === 'C1' ? '✓ Isomerisasi Selesai' : 'Jalankan Isomerisasi C6 → C1'}
              </button>
            </div>
          </div>
        );

      case 'OBSERVATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 1 • Amati Perubahan</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Mekanisme Fosfoglukomutase
              </h4>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-stone-700 leading-relaxed">
                Enzim tidak memindahkan gugus fosfat yang sama secara langsung. Sebaliknya, residu fosfoserin enzim menyumbangkan fosfatnya ke C1 membentuk <strong>Glukosa-1,6-bisfosfat</strong>. Kemudian, fosfat pada C6 diambil kembali oleh enzim, meregenerasi enzim aktif dan membebaskan <strong>Glukosa-1-fosfat (G1P)</strong>.
              </p>
            </div>
          </div>
        );

      case 'ANALYSIS':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 1 • Analisis Karbon Anomerik</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Mengapa Karbon C1 Sangat Krusial?
              </h4>
            </div>
            <div className="space-y-2">
              {[
                { id: 'A', label: 'C1 adalah karbon anomerik yang memiliki ikatan ester fosfat hemiasetal berenergi tinggi, siap menyerang UTP.' },
                { id: 'B', label: 'C1 tidak memiliki elektron sehingga tidak reaktif sama sekali.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setStage1Analysis(opt.id)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                    stage1Analysis === opt.id ? 'bg-stone-900 text-amber-300 font-bold' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  {opt.id}. {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'FEEDBACK':
        return (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
              <span className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tahap 1 Tuntas: G1P Siap Diaktivasi!</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                Glukosa-1-fosfat telah terbentuk. Sekarang molekul ini siap dipasangkan dengan Uridin Trifosfat (UTP) pada Tahap 2.
              </p>
              <button
                type="button"
                onClick={() => setSubStage(2)}
                className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-[#6B705C] text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
              >
                <span>Lanjut ke Tahap 2: Sintesis UDP-Glukosa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
    }
  };

  // ==========================================
  // RENDERING TAHAP 2: SINTESIS UDP-GLUKOSA
  // ==========================================
  const renderVisualStage2 = () => (
    <div className="w-full space-y-3">
      {/* Label Wajib Sesuai Permintaan Pengguna */}
      <div className="p-2.5 rounded-xl bg-blue-100/90 border border-blue-300 text-blue-950 font-bold text-center text-xs shadow-2xs">
        “UDP-glukosa merupakan donor glukosil teraktivasi.”
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
        {/* Kode Warna Konsisten yang Diminta */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] pb-2 border-b border-stone-200">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="text-stone-700 font-bold">Glukosa: Kuning Emas</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
            <span className="text-stone-700 font-bold">Fosfat: Oranye</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
            <span className="text-stone-700 font-bold">UTP/UDP: Biru</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
            <span className="text-stone-700 font-bold">Enzim: Hijau</span>
          </span>
        </div>

        {/* Diagram Pemasangan Molekul */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Substrat 1: G1P */}
          <div 
            onClick={() => handleToggleReactant('g1p')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              selectedReactants.g1p ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 font-bold text-xs flex items-center justify-center mx-auto mb-1">
              G1P
            </div>
            <span className="text-xs font-bold text-stone-900 block">Glukosa-1-Fosfat</span>
            <span className="text-[10px] text-orange-600 font-mono font-bold">Cincin Emas + 1 Fosfat Oranye</span>
          </div>

          {/* Substrat 2: UTP */}
          <div 
            onClick={() => handleToggleReactant('utp')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              selectedReactants.utp ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-400' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
              UTP
            </div>
            <span className="text-xs font-bold text-stone-900 block">Uridin Trifosfat</span>
            <span className="text-[10px] text-blue-700 font-mono font-bold">Nukleosida Biru + 3 Fosfat</span>
          </div>
        </div>

        {/* Produk Reaksi Saat Pasangan Terbentuk */}
        {isUDPFormed && (
          <div className="pt-3 border-t border-stone-200 space-y-2 animate-fadeIn">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">1. Terbentuk UDP-Glukosa:</span>
                <span className="text-[11px] text-emerald-800">Glukosa emas terikat pada UDP biru dengan ikatan berenergi tinggi</span>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-600 text-white font-mono text-xs font-bold">UDP-Glc</span>
            </div>

            {/* Hidrolisis PPi Reaksi Pendorong */}
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange-950 block">2. Pelepasan & Hidrolisis PPi (Reaksi Pendorong):</span>
                <span className="text-[11px] text-orange-900">
                  PPi⁴⁻ + H₂O ⎯⎯(Pirofosfatase Anorganik)⎯⎯→ 2 Pi (ΔG°′ = -33.5 kJ/mol)
                </span>
              </div>
              <span className="px-2 py-1 rounded bg-orange-600 text-white font-mono text-xs font-bold">2 Pi</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderControlStage2 = () => {
    switch (stage2Phase) {
      case 'PREDICTION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 2 • Prediksi Termodinamika</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Bagaimana Reaksi Didorong ke Depan?
              </h4>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStage2Prediction('A')}
                className={`w-full p-3 rounded-xl border text-left text-xs cursor-pointer ${
                  stage2Prediction === 'A' ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold' : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
                }`}
              >
                A. Reaksi G1P + UTP ⇌ UDP-Glc + PPi mendekati kesetimbangan, namun ditarik kuat ke arah produk oleh hidrolisis cepat pirofosfat (PPi → 2 Pi).
              </button>
            </div>
          </div>
        );

      case 'MANIPULATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 2 • Manipulasi Pasangan Substrat</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Pasangkan G1P dengan UTP
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Ketuk kedua kotak substrat di sebelah kiri untuk mengikatkan G1P ke UTP melalui enzim UDP-glukosa pirofosforilase.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span>Status G1P:</span>
                <span className="font-bold">{selectedReactants.g1p ? '✓ Dipilih' : 'Belum'}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Status UTP:</span>
                <span className="font-bold">{selectedReactants.utp ? '✓ Dipilih' : 'Belum'}</span>
              </div>
            </div>
          </div>
        );

      case 'OBSERVATION':
      case 'ANALYSIS':
      case 'FEEDBACK':
        return (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <span className="font-bold flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>UDP-Glukosa Telah Terbentuk!</span>
              </span>
              <p className="leading-relaxed text-[11px]">
                Energi fosfoanhidrida yang tersimpan di UDP-glukosa akan menjadi donor glukosil untuk membentuk ikatan glikosidik pada primer glikogenin.
              </p>
              <button
                type="button"
                onClick={() => setSubStage(3)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#6B705C] text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs"
              >
                <span>Lanjut ke Tahap 3: Pembentukan Primer Glikogenin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
    }
  };

  // ==========================================
  // RENDERING TAHAP 3: PRIMER GLIKOGENIN
  // ==========================================
  const renderVisualStage3 = () => (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="font-bold text-stone-900 text-xs">
          Protein Inisiator: <strong className="text-amber-900">Glikogenin (Dimer 37 kDa)</strong>
        </span>
        <span className="text-[10px] font-mono bg-amber-100 text-amber-950 px-2 py-0.5 rounded font-bold">
          Residu Tyr-194 (-OH)
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
        {/* Rantai Primer Glikogenin Dinamis */}
        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[160px]">
          <div className="flex items-center gap-1 overflow-x-auto max-w-full py-2">
            {/* Protein Glikogenin Inti */}
            <div className="px-3 py-4 rounded-xl bg-purple-100 border-2 border-purple-500 text-purple-950 text-center font-bold text-xs shrink-0 shadow-xs">
              <span className="block text-[10px] text-purple-700">Protein Inti</span>
              Glikogenin
              <span className="block text-[9px] text-purple-600 font-mono mt-0.5">Tyr-194</span>
            </div>

            <span className="text-stone-400 font-bold">—</span>

            {/* Rantai Glukosa 1 sampai 8 */}
            {Array.from({ length: 8 }).map((_, i) => {
              const isAdded = i < primerCount;
              return (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all shrink-0 ${
                    isAdded
                      ? 'bg-amber-400 text-stone-950 border-amber-600 shadow-2xs scale-105'
                      : 'bg-stone-100 text-stone-300 border-dashed border-stone-300'
                  }`}
                >
                  {isAdded ? `G${i + 1}` : `${i + 1}`}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between w-full text-xs pt-2 border-t border-stone-200/80">
            <span className="text-stone-600 font-semibold">Panjang Primer:</span>
            <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              {primerCount}/8 Residu Glukosil
            </span>
          </div>
        </div>

        {/* Notifikasi Siap Diambil Alih oleh Glikogen Sintase */}
        {primerCount === 8 ? (
          <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-center text-xs shadow-2xs">
            “Primer siap diperpanjang oleh glikogen sintase.”
          </div>
        ) : (
          <p className="text-[11px] text-stone-500 text-center">
            Glikogenin mengkatalisis penambahan autokatalitik hingga terbentuk rantai oligomer 8 residu.
          </p>
        )}
      </div>
    </div>
  );

  const renderControlStage3 = () => {
    switch (stage3Phase) {
      case 'PREDICTION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 3 • Prediksi Inisiasi</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Mengapa Butuh Protein Glikogenin?
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Mengapa glikogen sintase tidak bisa langsung menyambungkan dua molekul glukosa bebas dari nol (de novo)?
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStage3Prediction('A')}
                className={`w-full p-3 rounded-xl border text-left text-xs cursor-pointer ${
                  stage3Prediction === 'A' ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold' : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
                }`}
              >
                A. Glikogen sintase mutlak membutuhkan rantai primer oligoglukosil minimal 4–8 residu sebagai akseptor; ia tidak memiliki situs pengikatan de novo.
              </button>
            </div>
          </div>
        );

      case 'MANIPULATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Tahap 3 • Elongasi Primer</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Tambahkan Residu Glukosa
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Setiap klik akan menambahkan satu residu glukosa dari UDP-glukosa ke gugus Tyr-194 glikogenin dan melepaskan satu molekul UDP bebas.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddUDPGlucose}
              disabled={primerCount >= 8}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs ${
                primerCount >= 8 
                  ? 'bg-emerald-600 text-white cursor-default' 
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{primerCount >= 8 ? '✓ Primer Lengkap (8/8)' : 'Tambahkan satu UDP-glukosa'}</span>
            </button>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span>Molekul UDP Terlepas:</span>
                <span className="font-mono font-bold">{releasedUDPCount} UDP</span>
              </div>
            </div>
          </div>
        );

      case 'OBSERVATION':
      case 'ANALYSIS':
      case 'FEEDBACK':
        return (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <span className="font-bold flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Primer Oktamer Selesai!</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                Primer 8 residu glukosa kini terikat kovalen pada Tirosin-194 glikogenin. Enzim Glikogen Sintase kini dapat mengambil alih pemanjangan rantai glikogen pada Bagian E.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" id="lkm-section-d">
      {/* Header Bagian D */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-amber-700" />
          <span>Bagian D • Aktivasi Glukosil & Inisiasi Primer</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          G6P, G1P, UDP-Glukosa, dan Primer Glikogenin
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Pelajari rantai inisiasi molekuler: dari isomerisasi fosfoglukomutase, sintesis donor glukosil berenergi tinggi (UDP-glukosa), hingga perakitan primer oktamer oleh glikogenin.
        </p>
      </div>

      {/* Sub-Stage Tab Selector */}
      <div className="flex items-center gap-2 bg-[#FAF8F5] p-1.5 rounded-2xl border border-stone-200">
        <button
          type="button"
          onClick={() => setSubStage(1)}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            subStage === 1 ? 'bg-stone-900 text-amber-300 shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          1. Isomerisasi G6P → G1P
        </button>
        <button
          type="button"
          onClick={() => setSubStage(2)}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            subStage === 2 ? 'bg-stone-900 text-amber-300 shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          2. Sintesis UDP-Glukosa
        </button>
        <button
          type="button"
          onClick={() => setSubStage(3)}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            subStage === 3 ? 'bg-stone-900 text-amber-300 shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          3. Primer Glikogenin
        </button>
      </div>

      {/* Progressive Layout Container Sesuai Sub-Stage */}
      {subStage === 1 && (
        <LKMProgressiveActivityLayout
          title="Tahap 1: Isomerisasi Fosfoglukomutase (C6 ke C1)"
          badge="Bagian D • Sub-Tahap 1"
          currentPhase={stage1Phase}
          onPhaseChange={setStage1Phase}
          visualContent={renderVisualStage1()}
          controlContent={renderControlStage1()}
          score={stage1Score}
          explanation="Fosfoglukomutase menggeser posisi fosfat dari C6 ke C1 melalui zat antara Glukosa-1,6-bisfosfat dengan bantuan gugus fosfoserin enzim. Karbon C1 memiliki konfigurasi anomerik yang mutlak diperlukan untuk reaksi aktivasi dengan UTP."
        />
      )}

      {subStage === 2 && (
        <LKMProgressiveActivityLayout
          title="Tahap 2: Pembentukan UDP-Glukosa (Donor Glukosil Teraktivasi)"
          badge="Bagian D • Sub-Tahap 2"
          currentPhase={stage2Phase}
          onPhaseChange={setStage2Phase}
          visualContent={renderVisualStage2()}
          controlContent={renderControlStage2()}
          score={stage2Score}
          explanation="Glukosa-1-fosfat bereaksi dengan UTP menghasilkan UDP-glukosa dan pirofosfat (PPi). Pirofosfat segera dihidrolisis oleh enzim pirofosfatase anorganik menjadi 2 Pi (ΔG°′ = -33.5 kJ/mol), menarik reaksi ke arah kanan secara tak terbalikkan."
        />
      )}

      {subStage === 3 && (
        <LKMProgressiveActivityLayout
          title="Tahap 3: Perakitan Primer Oktamer oleh Protein Glikogenin"
          badge="Bagian D • Sub-Tahap 3"
          currentPhase={stage3Phase}
          onPhaseChange={setStage3Phase}
          visualContent={renderVisualStage3()}
          controlContent={renderControlStage3()}
          score={stage3Score}
          explanation="Glikogenin adalah protein autoglikosilasi yang menempelkan residu glukosa pertama ke gugus -OH Tirosin-194 miliknya sendiri. Glikogenin kemudian menambahkan glukosa berturut-turut hingga panjang 8 residu. Primer oktamer ini kemudian dikenali oleh enzim glikogen sintase."
        />
      )}

      {/* Navigasi Antar-Bagian */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian C</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-e"
        >
          <span>Lanjut ke Bagian E: Pemanjangan & Percabangan Glikogen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
