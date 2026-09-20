/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Layers, 
  CheckCircle2, 
  Info,
  Check,
  AlertCircle
} from 'lucide-react';
import { InteractiveLipogenesisCitrateShuttle } from './interactive/InteractiveLipogenesisCitrateShuttle';
import { InteractiveGluconeogenesisBypass } from './interactive/InteractiveGluconeogenesisBypass';
import { InteractiveGluconeogenesisPrecursors } from './interactive/InteractiveGluconeogenesisPrecursors';

interface LKMSectionBGlucoseFateMapProps {
  onBack: () => void;
  onNext: () => void;
}

type SelectedOrgan = 'LIVER' | 'MUSCLE' | 'ADIPOSE';

export const LKMSectionB_GlucoseFateMap: React.FC<LKMSectionBGlucoseFateMapProps> = ({
  onBack,
  onNext,
}) => {
  const [selectedOrgan, setSelectedOrgan] = useState<SelectedOrgan>('LIVER');
  const [quizAnswerHati, setQuizAnswerHati] = useState<string | null>(null);
  const [quizAnswerOtot, setQuizAnswerOtot] = useState<string | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);

  const organData = {
    LIVER: {
      name: 'Hati (Hepar)',
      badge: 'Regulator Homeostasis Glukosa Sistemik',
      role: 'Penyimpan Glikogen Cadangan & Glukosa Darah',
      keyEnzyme: 'Glukokinase (Km tinggi) & Glukosa-6-fosfatase',
      transporter: 'GLUT2 (Dua arah / bidirectional, insulin-independent)',
      fate: 'Menyimpan glukosa berlebih sebagai glikogen hepar (hingga ~100 g atau 8-10% berat basah hati). Ketika glukosa darah turun saat puasa, hati mendefosforilasi G6P via Glukosa-6-fosfatase untuk melepaskan glukosa bebas ke sirkulasi.',
      fateLipogenesis: 'Bila kapasitas glikogen hepar telah penuh dan asupan karbohidrat tetap berlebih, piruvat dioksidasi menjadi Asetil-KoA, disalurkan via Citrate Shuttle ke sitosol untuk sintesis asam lemak (lipogenesis) lalu dikemas dalam VLDL ke adiposit.',
      physiologicalFunction: 'Mempertahankan konsentrasi glukosa darah dalam rentang normal (70–100 mg/dL) demi memasok otak dan eritrosit.',
      color: 'border-red-400 bg-red-50/60 text-red-950',
      dotColor: 'bg-red-600'
    },
    MUSCLE: {
      name: 'Otot Rangka (Skeletal Muscle)',
      badge: 'Konsumen Energi Mekanis Kontraksi',
      role: 'Penyimpan Glikogen Tertutup Khusus Internal',
      keyEnzyme: 'Heksokinase (Km rendah) & TIDAK MEMILIKI Glukosa-6-fosfatase',
      transporter: 'GLUT4 (Insulin-dependent, translokasi ke membran saat insulin naik atau saat kontraksi/AMPK)',
      fate: 'Menyerap glukosa darah secara aktif setelah makan melalui GLUT4 yang distimulasi insulin. Diubah menjadi G6P dan disimpan sebagai glikogen otot (~400 g total massa tubuh).',
      fateLipogenesis: 'Otot rangka TIDAK melepaskan glukosa bebas ke darah karena tidak memiliki enzim Glukosa-6-fosfatase. G6P dari glikogenolisis langsung masuk jalur glikolisis internal untuk regenerasi ATP kontraksi miosin.',
      physiologicalFunction: 'Sebagai bahan bakar cadangan darurat siap pakai untuk aktivitas mekanis dan kontraksi serat otot itu sendiri.',
      color: 'border-amber-400 bg-amber-50/60 text-amber-950',
      dotColor: 'bg-amber-600'
    },
    ADIPOSE: {
      name: 'Jaringan Adiposa (Adipose Tissue)',
      badge: 'Cadangan Energi Densitas Tinggi Jangka Panjang',
      role: 'Penyimpanan Triasilgliserol (TAG)',
      keyEnzyme: 'Gliserol-3-fosfat dehidrogenase & Lipoprotein Lipase (LPL)',
      transporter: 'GLUT4 (Insulin-dependent)',
      fate: 'Glukosa masuk melalui GLUT4 di bawah rangsangan insulin. Glukosa dimetabolisme sebagian menjadi Dihidroksiaseton fosfat (DHAP) lalu direduksi menjadi Gliserol-3-fosfat, yang bertindak sebagai kerangka (backbone) esterifikasi asam lemak.',
      fateLipogenesis: 'Menggabungkan gliserol-3-fosfat dengan asam lemak bebas (dari lipogenesis hepar VLDL dan sintesis lokal) menjadi triasilgliserol droplet netral anhidrat.',
      physiologicalFunction: 'Menyimpan energi surplus jangka panjang tanpa batas kapasitas yang kaku, melindungi organ dalam, dan isolator termal tubuh.',
      color: 'border-yellow-400 bg-yellow-50/60 text-yellow-950',
      dotColor: 'bg-yellow-500'
    }
  };

  const handleCheckQuiz = () => {
    setQuizChecked(true);
  };

  const isQuizCorrect = quizAnswerHati === 'A' && quizAnswerOtot === 'B';

  return (
    <div className="space-y-6" id="lkm-section-b">
      {/* Header Bagian B */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Activity className="w-4 h-4 text-blue-700" />
          <span>Bagian B • Representasi Makroskopik & Fisiologis</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Peta Tujuan Glukosa: Ke Mana Kelebihan Karbon Dialirkan?
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Setelah makan (kondisi post-prandial), kadar glukosa darah meningkat dan memicu sekresi <strong>insulin</strong> dari sel beta pankreas. 
          Pahami bagaimana 3 organ kunci tubuh merespons sinyal insulin dan memproses nasib glukosa.
        </p>
      </div>

      {/* Rantai Peristiwa Fisiologis Pasca-Makan */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
        <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">Tahap 1</span>
          <h4 className="text-xs font-bold text-stone-900">Insulin Meningkat</h4>
          <p className="text-[11px] text-stone-600 leading-tight">Glukosa darah merangsang pelepasan hormon insulin oleh pankreas.</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">Tahap 2</span>
          <h4 className="text-xs font-bold text-stone-900">Glukosa Masuk Sel</h4>
          <p className="text-[11px] text-stone-600 leading-tight">GLUT4 bertranslokasi di otot & adiposit; GLUT2 & glukokinase bekerja aktif di hati.</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">Tahap 3</span>
          <h4 className="text-xs font-bold text-stone-900">Glikogenesis Diaktifkan</h4>
          <p className="text-[11px] text-stone-600 leading-tight">Sintesis glikogen dipacu di hati dan otot untuk menampung cadangan karbohidrat cepat.</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">Tahap 4</span>
          <h4 className="text-xs font-bold text-stone-900">Lipogenesis Surplus</h4>
          <p className="text-[11px] text-stone-600 leading-tight">Jika glikogen telah penuh, kelebihan asetil-KoA diubah jadi asam lemak & disimpan di adiposit.</p>
        </div>
      </div>

      {/* Ilustrasi Interaktif 3 Organ Kunci */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Kolom Kiri: Diagram Anatomi / Organ Selector */}
        <div className="lg:col-span-5 bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              Pilih Organ Tubuh untuk Dieksplorasi:
            </h3>
            <span className="text-[10px] text-stone-500 font-mono">3 Target Utama</span>
          </div>

          {/* Tombol Organ Interaktif */}
          <div className="space-y-2.5">
            <button
              onClick={() => setSelectedOrgan('LIVER')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                selectedOrgan === 'LIVER'
                  ? 'bg-red-50 border-red-500 shadow-2xs ring-1 ring-red-400'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] hover:bg-stone-50'
              }`}
              id="organ-btn-liver"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-stone-900">Hati (Hepar)</div>
                  <div className="text-[11px] text-stone-500">Menjaga glukosa darah sistemik</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-100 text-red-900">G6Pase (+)</span>
            </button>

            <button
              onClick={() => setSelectedOrgan('MUSCLE')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                selectedOrgan === 'MUSCLE'
                  ? 'bg-amber-50 border-amber-500 shadow-2xs ring-1 ring-amber-400'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] hover:bg-stone-50'
              }`}
              id="organ-btn-muscle"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-stone-900">Otot Rangka (Skeletal Muscle)</div>
                  <div className="text-[11px] text-stone-500">Khusus bahan bakar kontraksi sendiri</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">G6Pase (-)</span>
            </button>

            <button
              onClick={() => setSelectedOrgan('ADIPOSE')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                selectedOrgan === 'ADIPOSE'
                  ? 'bg-yellow-50 border-yellow-500 shadow-2xs ring-1 ring-yellow-400'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] hover:bg-stone-50'
              }`}
              id="organ-btn-adipose"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-yellow-500 shrink-0" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-stone-900">Jaringan Adiposa</div>
                  <div className="text-[11px] text-stone-500">Cadangan energi triasilgliserol jangka panjang</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-yellow-100 text-yellow-900">TAG Depot</span>
            </button>
          </div>

          {/* Diagram Skematik Tubuh SVG */}
          <div className="p-3 bg-[#FAF8F5] border border-[#E5E2D9] rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 240 220" className="w-full h-44">
              {/* Siluet Tubuh */}
              <path
                d="M 120 15 C 130 15 138 23 138 33 C 138 42 130 49 120 49 C 110 49 102 42 102 33 C 102 23 110 15 120 15 Z
                   M 102 52 C 85 55 70 70 65 95 L 60 145 L 75 145 L 80 105 L 90 105 L 85 210 L 105 210 L 115 130 L 125 130 L 135 210 L 155 210 L 150 105 L 160 105 L 165 145 L 180 145 L 175 95 C 170 70 155 55 138 52 Z"
                fill="#E8E5DC"
                stroke="#C5C0B3"
                strokeWidth="1.5"
              />

              {/* Hati (Liver) */}
              <g 
                onClick={() => setSelectedOrgan('LIVER')} 
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <path
                  d="M 108 85 C 115 80 135 82 138 92 C 140 100 125 106 112 104 C 105 102 102 92 108 85 Z"
                  fill={selectedOrgan === 'LIVER' ? '#EF4444' : '#FCA5A5'}
                  stroke="#DC2626"
                  strokeWidth="1.5"
                />
                <text x="125" y="96" textAnchor="middle" fontSize="7" fill="#FFFFFF" fontWeight="bold">Hati</text>
              </g>

              {/* Otot Rangka (Muscle) */}
              <g 
                onClick={() => setSelectedOrgan('MUSCLE')} 
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <rect x="68" y="100" width="10" height="28" rx="4" fill={selectedOrgan === 'MUSCLE' ? '#D97706' : '#FCD34D'} stroke="#B45309" strokeWidth="1" />
                <rect x="162" y="100" width="10" height="28" rx="4" fill={selectedOrgan === 'MUSCLE' ? '#D97706' : '#FCD34D'} stroke="#B45309" strokeWidth="1" />
                <rect x="90" y="145" width="12" height="40" rx="4" fill={selectedOrgan === 'MUSCLE' ? '#D97706' : '#FCD34D'} stroke="#B45309" strokeWidth="1" />
                <rect x="138" y="145" width="12" height="40" rx="4" fill={selectedOrgan === 'MUSCLE' ? '#D97706' : '#FCD34D'} stroke="#B45309" strokeWidth="1" />
                <text x="73" y="117" textAnchor="middle" fontSize="5" fill="#FFFFFF" fontWeight="bold">Otot</text>
              </g>

              {/* Jaringan Adiposa (Adipose) */}
              <g 
                onClick={() => setSelectedOrgan('ADIPOSE')} 
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <ellipse cx="120" cy="118" rx="16" ry="10" fill={selectedOrgan === 'ADIPOSE' ? '#EAB308' : '#FEF08A'} stroke="#CA8A04" strokeWidth="1.2" />
                <text x="120" y="120" textAnchor="middle" fontSize="6" fill="#713F12" fontWeight="bold">Adiposa</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Kolom Kanan: Detail Penjelasan Fisiologis Organ Terpilih */}
        <div className="lg:col-span-7 bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4">
          {(() => {
            const data = organData[selectedOrgan];
            return (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-[#E5E2D9] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${data.dotColor}`} />
                      <h3 className="text-base font-serif font-bold text-stone-900">{data.name}</h3>
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500">{data.badge}</span>
                  </div>
                  <span className="text-xs font-bold text-stone-700 bg-[#FAF8F5] border border-[#E5E2D9] px-2.5 py-1 rounded-xl">
                    {data.role}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-1">
                    <span className="font-bold text-stone-500 uppercase text-[10px] block">Enzim Kunci Pengatur:</span>
                    <p className="font-semibold text-stone-900">{data.keyEnzyme}</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-1">
                    <span className="font-bold text-stone-500 uppercase text-[10px] block">Transporter Glukosa:</span>
                    <p className="font-semibold text-stone-900">{data.transporter}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-1 text-xs">
                  <span className="font-bold text-blue-950 text-[11px] uppercase tracking-wider block">Nasib Glukosa di Organ Ini:</span>
                  <p className="text-stone-700 leading-relaxed">{data.fate}</p>
                </div>

                <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1 text-xs">
                  <span className="font-bold text-amber-950 text-[11px] uppercase tracking-wider block">Saat Surplus Berlebih (Lipogenesis):</span>
                  <p className="text-stone-700 leading-relaxed">{data.fateLipogenesis}</p>
                </div>

                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Fungsi Fisiologis Utama:</span>
                    <span className="text-emerald-900">{data.physiologicalFunction}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Cek Pemahaman Representasi Makroskopik (Mini-Check) */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#6B705C]" />
          <h3 className="text-xs sm:text-sm font-bold text-stone-900">
            Aktivitas Diskusi Kelompok: Mengapa Nasib Glikogen Hati Berbeda dari Glikogen Otot?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Soal 1 */}
          <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E2D9] rounded-xl space-y-2">
            <span className="font-bold text-stone-800 block">
              1. Mengapa glikogen hati MAMPU melepaskan glukosa bebas ke dalam sirkulasi darah?
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setQuizAnswerHati('A')}
                className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  quizAnswerHati === 'A'
                    ? 'bg-blue-100 border-blue-500 font-bold text-blue-950'
                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                A. Karena sel hati mengekspresikan enzim <strong>Glukosa-6-fosfatase</strong> di lumen retikulum endoplasma.
              </button>
              <button
                type="button"
                onClick={() => setQuizAnswerHati('B')}
                className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  quizAnswerHati === 'B'
                    ? 'bg-blue-100 border-blue-500 font-bold text-blue-950'
                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                B. Karena hati tidak memerlukan energi ATP sehingga semua glukosa langsung dibuang ke darah.
              </button>
            </div>
          </div>

          {/* Soal 2 */}
          <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E2D9] rounded-xl space-y-2">
            <span className="font-bold text-stone-800 block">
              2. Mengapa glikogen otot rangka TIDAK DAPAT melepaskan glukosa bebas ke dalam darah?
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setQuizAnswerOtot('A')}
                className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  quizAnswerOtot === 'A'
                    ? 'bg-blue-100 border-blue-500 font-bold text-blue-950'
                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                A. Karena otot tidak memiliki simpanan glikogen sama sekali setelah makan.
              </button>
              <button
                type="button"
                onClick={() => setQuizAnswerOtot('B')}
                className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  quizAnswerOtot === 'B'
                    ? 'bg-blue-100 border-blue-500 font-bold text-blue-950'
                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                B. Karena serat otot rangka <strong>TIDAK mengekspresikan enzim Glukosa-6-fosfatase</strong>, sehingga G6P terkunci di dalam sel untuk glikolisis internal.
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleCheckQuiz}
            disabled={!quizAnswerHati || !quizAnswerOtot}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-amber-200 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Periksa Jawaban Analisis Organ</span>
          </button>

          {quizChecked && (
            <div className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
              isQuizCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              {isQuizCorrect ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tepat sekali! Kelompok Anda telah membedakan peran fisiologis hepar dan miosit dengan tepat.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Diskusikan kembali bersama kelompok keberadaan enzim kunci Glukosa-6-fosfatase pada kedua jaringan tersebut.</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Aktivitas Interaktif Lipogenesis & Shuttle Sitrat */}
      <InteractiveLipogenesisCitrateShuttle />

      {/* Aktivitas Interaktif Reaksi Pintas (Bypass) Glukoneogenesis */}
      <InteractiveGluconeogenesisBypass />

      {/* Aktivitas Interaktif Prekursor Glukoneogenesis */}
      <InteractiveGluconeogenesisPrecursors />

      {/* Navigasi Bawah */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-bold text-stone-700 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian A: Pemantik</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-c"
        >
          <span>Lanjut ke Bagian C: Misi Membangun Glikogen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
