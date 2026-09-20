/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Info,
  GitBranch,
  Flame,
  Check,
  AlertCircle
} from 'lucide-react';
import { LKMProgressiveActivityLayout, InteractionPhase } from './LKMProgressiveActivityLayout';

export const InteractiveGlucosePhosphorylation: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [predictedCarbon, setPredictedCarbon] = useState<number | null>(null);
  
  // State interaksi manipulasi
  const [selectedPhosphateSource, setSelectedPhosphateSource] = useState<boolean>(false);
  const [targetedCarbon, setTargetedCarbon] = useState<number | null>(null);
  const [isTransferred, setIsTransferred] = useState<boolean>(false);
  const [shakeCarbon, setShakeCarbon] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // State kuis analisis
  const [analysisAnswer, setAnalysisAnswer] = useState<string | null>(null);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [viewMode3D, setViewMode3D] = useState<boolean>(false);

  const hints = [
    'Fosforilasi glukosa oleh enzim heksokinase/glukokinase menargetkan gugus hidroksil primer (-CH₂OH) yang paling mudah diakses secara sterik di luar cincin piranosa.',
    'Karbon C1 sampai C5 membentuk cincin piranosa bersama atom oksigen cincin. Karbon C6 adalah karbon ekstrasiklik (-CH₂OH).',
    'Seret atau ketuk gugus fosfat gamma (℗γ berwarna jingga) dari ATP dan tempelkan tepat pada atom C6 glukosa!'
  ];

  const handleDragStartPhosphate = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'ATP_GAMMA_PHOSPHATE');
    setSelectedPhosphateSource(true);
  };

  const handleSelectCarbon = (carbonNum: number) => {
    if (isTransferred) return;

    if (!selectedPhosphateSource) {
      // Jika belum memilih fosfat, ingatkan
      setErrorMessage('Pilih atau seret gugus fosfat gamma (℗γ) dari molekul ATP terlebih dahulu!');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setTargetedCarbon(carbonNum);
    setSelectedPhosphateSource(false);

    if (carbonNum === 6) {
      setIsTransferred(true);
      setErrorMessage(null);
    } else {
      // Salah karbon: picu shake animation
      setShakeCarbon(carbonNum);
      setErrorMessage('Perhatikan gugus hidroksil primer di luar cincin (C6). Karbon dalam cincin terhalang secara sterik!');
      setScore(prev => Math.max(40, prev - 15));
      setTimeout(() => {
        setShakeCarbon(null);
        setErrorMessage(null);
      }, 2500);
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');
    const isCorrect = targetedCarbon === 6 && analysisAnswer === 'A';
    if (!isCorrect) {
      setScore(prev => Math.max(40, prev - 20));
    }
  };

  const handleReset = () => {
    setTargetedCarbon(null);
    setSelectedPhosphateSource(false);
    setIsTransferred(false);
    setShakeCarbon(null);
    setErrorMessage(null);
    setAnalysisAnswer(null);
    setIsAnswerChecked(false);
    setPhase('MANIPULATION');
  };

  const isCorrect = isTransferred && analysisAnswer === 'A';

  // VISUAL CONTENT (KOLOM KIRI ~60%)
  const renderVisualContent = () => {
    return (
      <div className="w-full space-y-3">
        {/* Toggle 2D Haworth vs 3D Ball & Stick */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500 text-white font-mono font-bold text-[10px]">C6</span>
            <span className="font-bold text-stone-900 text-xs">
              {isTransferred ? 'Produk: Glukosa-6-Fosfat (G6P²⁻)' : 'Substrat: D-Glukosa & ATP'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg border border-stone-200 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setViewMode3D(false)}
              className={`px-2 py-0.5 rounded cursor-pointer ${!viewMode3D ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500'}`}
            >
              2D Haworth
            </button>
            <button
              type="button"
              onClick={() => setViewMode3D(true)}
              className={`px-2 py-0.5 rounded cursor-pointer ${viewMode3D ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-500'}`}
            >
              3D Konformasi Kursi
            </button>
          </div>
        </div>

        {/* Notifikasi Kesalahan / Shake */}
        {errorMessage && (
          <div className="p-2.5 rounded-xl bg-red-100 border border-red-300 text-red-950 text-xs flex items-center gap-2 animate-bounce">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Kanvas Biokimia Utama */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 overflow-hidden relative">
          
          {/* Molekul ATP Lengkap: Adenosin — Pα — Pβ — Pγ */}
          <div className="mb-4 p-3 bg-stone-50/80 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Donor Gugus Fosforil: {isTransferred ? 'ADP³⁻ (Adenosin Difosfat)' : 'ATP⁴⁻ (Adenosin Trifosfat)'}</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isTransferred ? 'bg-stone-200 text-stone-700' : 'bg-orange-100 text-orange-950'
              }`}>
                {isTransferred ? 'Gugus γ Terlepas' : 'Fosfat γ Siap Ditransfer'}
              </span>
            </div>

            {/* Rantai Struktur ATP */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs py-1">
              <span className="px-2.5 py-1.5 rounded-lg bg-stone-200 text-stone-800 font-bold border border-stone-300">
                Adenosin
              </span>
              <span className="text-stone-400 font-bold">—</span>
              <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold border border-amber-300 text-[11px]">
                ℗α
              </span>
              <span className="text-stone-400 font-bold">—</span>
              <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold border border-amber-300 text-[11px]">
                ℗β
              </span>
              <span className="text-stone-400 font-bold">—</span>

              {/* Fosfat Gamma (Pγ) yang Ditonjolkan */}
              {!isTransferred ? (
                <div
                  draggable
                  onDragStart={handleDragStartPhosphate}
                  onClick={() => setSelectedPhosphateSource(!selectedPhosphateSource)}
                  className={`px-3 py-1.5 rounded-lg font-bold border cursor-pointer transition-all flex items-center gap-1 select-none ${
                    selectedPhosphateSource
                      ? 'bg-orange-600 text-white border-orange-700 shadow-md ring-2 ring-orange-400 animate-pulse scale-105'
                      : 'bg-orange-500 hover:bg-orange-600 text-white border-orange-600 shadow-xs'
                  }`}
                  title="Klik atau seret fosfat gamma ke atom C6 glukosa"
                >
                  <span className="text-sm">℗γ</span>
                  <span className="text-[10px] hidden sm:inline">(Fosfat Gamma)</span>
                </div>
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 text-[10px]">
                  ✓ Ditransfer ke C6
                </span>
              )}
            </div>
            
            <p className="text-[10px] text-stone-500 text-center mt-1">
              {!isTransferred 
                ? 'Ketuk atau seret fosfat gamma (℗γ berwarna jingga) lalu klik atom C6 pada cincin glukosa di bawah.' 
                : 'Ikatan fosfoanhidrida terputus, melepaskan energi bebas untuk menggerakkan fosforilasi glukosa.'}
            </p>
          </div>

          {/* Struktur Haworth D-Glukosa Orisinal dengan Penomoran C1 - C6 yang Jelas */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col items-center justify-center min-h-[220px]">
            {!viewMode3D ? (
              <svg viewBox="0 0 340 220" className={`w-full max-w-sm h-auto ${shakeCarbon ? 'animate-shake' : ''}`}>
                <defs>
                  <filter id="glowFosfat" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                </defs>

                {/* Garis Cincin Piranosa Haworth */}
                {/* Vertices: C1=(240,110), C2=(200,165), C3=(140,165), C4=(100,110), C5=(140,65), O=(200,65) */}
                <polygon
                  points="240,110 200,165 140,165 100,110 140,65 200,65"
                  fill="#FFFFFF"
                  stroke="#78716C"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Sisi Bawah Cincin Lebih Tebal (Perspektif Haworth) */}
                <line x1="100" y1="110" x2="140" y2="165" stroke="#44403C" strokeWidth="5" />
                <line x1="140" y1="165" x2="200" y2="165" stroke="#44403C" strokeWidth="6" />
                <line x1="200" y1="165" x2="240" y2="110" stroke="#44403C" strokeWidth="5" />

                {/* Oksigen Cincin */}
                <circle cx="200" cy="65" r="14" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
                <text x="200" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">O</text>

                {/* Ikatan C5 ke C6 Ekstrasiklik (-CH2OH) */}
                <line x1="140" y1="65" x2="100" y2="25" stroke="#78716C" strokeWidth="3.5" />

                {/* GUGUS C6 & GUGUS FOSFAT */}
                <g 
                  onClick={() => handleSelectCarbon(6)}
                  className="cursor-pointer transition-all hover:scale-110"
                >
                  <circle
                    cx="100"
                    cy="25"
                    r={isTransferred ? 24 : 18}
                    fill={isTransferred ? '#F97316' : selectedPhosphateSource ? '#FEF08A' : '#F5F5F4'}
                    stroke={isTransferred ? '#C2410C' : '#D97706'}
                    strokeWidth={isTransferred ? 3 : 2}
                    filter={isTransferred ? 'url(#glowFosfat)' : undefined}
                    className={selectedPhosphateSource && !isTransferred ? 'animate-pulse' : ''}
                  />
                  <text x="100" y="21" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isTransferred ? '#FFFFFF' : '#78350F'}>
                    C6
                  </text>
                  <text x="100" y="32" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isTransferred ? '#FFFFFF' : '#92400E'}>
                    {isTransferred ? '-CH₂-O-PO₃²⁻' : '-CH₂OH'}
                  </text>
                </g>

                {/* C1 (Anomerik) */}
                <g onClick={() => handleSelectCarbon(1)} className="cursor-pointer">
                  <circle cx="240" cy="110" r="13" fill="#F5F5F4" stroke="#A8A29E" strokeWidth="1.5" />
                  <text x="240" y="114" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#292524">C1</text>
                  <line x1="240" y1="110" x2="270" y2="135" stroke="#78716C" strokeWidth="2" />
                  <text x="275" y="140" fontSize="8" fill="#57534E">OH (α/β)</text>
                </g>

                {/* C2 */}
                <g onClick={() => handleSelectCarbon(2)} className="cursor-pointer">
                  <circle cx="200" cy="165" r="13" fill="#F5F5F4" stroke="#A8A29E" strokeWidth="1.5" />
                  <text x="200" y="169" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#292524">C2</text>
                  <line x1="200" y1="165" x2="200" y2="195" stroke="#78716C" strokeWidth="2" />
                  <text x="200" y="206" textAnchor="middle" fontSize="8" fill="#57534E">OH</text>
                </g>

                {/* C3 */}
                <g onClick={() => handleSelectCarbon(3)} className="cursor-pointer">
                  <circle cx="140" cy="165" r="13" fill="#F5F5F4" stroke="#A8A29E" strokeWidth="1.5" />
                  <text x="140" y="169" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#292524">C3</text>
                  <line x1="140" y1="165" x2="140" y2="135" stroke="#78716C" strokeWidth="2" />
                  <text x="140" y="130" textAnchor="middle" fontSize="8" fill="#57534E">OH</text>
                </g>

                {/* C4 */}
                <g onClick={() => handleSelectCarbon(4)} className="cursor-pointer">
                  <circle cx="100" cy="110" r="13" fill="#F5F5F4" stroke="#A8A29E" strokeWidth="1.5" />
                  <text x="100" y="114" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#292524">C4</text>
                  <line x1="100" y1="110" x2="70" y2="135" stroke="#78716C" strokeWidth="2" />
                  <text x="55" y="140" fontSize="8" fill="#57534E">OH</text>
                </g>

                {/* C5 */}
                <g onClick={() => handleSelectCarbon(5)} className="cursor-pointer">
                  <circle cx="140" cy="65" r="13" fill="#F5F5F4" stroke="#A8A29E" strokeWidth="1.5" />
                  <text x="140" y="69" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#292524">C5</text>
                </g>
              </svg>
            ) : (
              // 3D Konformasi Kursi
              <div className="text-center py-6 space-y-2">
                <div className="p-4 bg-white rounded-xl border border-stone-200 inline-block font-mono text-xs">
                  <div className="font-bold text-stone-900">Konformasi Kursi ⁴C₁ D-Glukopiranosa</div>
                  <div className="text-stone-600 text-[11px] mt-1">
                    Semua gugus hidroksil bulky berada pada posisi ekuatorial yang stabil.
                  </div>
                  <div className="mt-2 text-amber-900 font-bold">
                    C6 ekstrasiklik: -CH₂-O-{isTransferred ? 'PO₃²⁻ (Muatan Negatif Terbuka)' : 'OH'}
                  </div>
                </div>
              </div>
            )}

            <div className="text-[10px] text-stone-500 text-center mt-2">
              Proyeksi Haworth D-Glukosa: Karbon C1–C5 berada dalam cincin piranosa, sedangkan C6 adalah gugus hidroksil primer ekstrasiklik.
            </div>
          </div>

          {/* Data Termodinamika & Enzimatis Saat Berhasil Ditransfer */}
          {isTransferred && (
            <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-emerald-950">
                  Enzim Katalis: Heksokinase (sebagian besar sel) / Glukokinase (hepar & pankreas)
                </span>
              </div>
              <div className="font-mono font-bold text-emerald-900 bg-white px-2.5 py-1 rounded border border-emerald-200">
                ΔG°′ = -16.7 kJ/mol (Irreversible)
              </div>
            </div>
          )}

        </div>

        {/* Diagram Titik Persimpangan Metabolik G6P Sesuai Instruksi Khusus */}
        <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-blue-950">
            <GitBranch className="w-4 h-4 text-blue-700" />
            <span>G6P sebagai Central Metabolic Junction (Titik Persimpangan 3 Jalur):</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px]">
            <div className="p-2 rounded-lg bg-white border border-blue-200 text-blue-950">
              <span className="font-bold block">1. Glikolisis</span>
              <span className="text-stone-500">Penghasil ATP & Piruvat</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-blue-200 text-blue-950">
              <span className="font-bold block">2. Jalur Pentosa Fosfat</span>
              <span className="text-stone-500">NADPH & Ribosa-5-P</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 font-bold">
              <span className="block">3. Glikogenesis</span>
              <span className="text-amber-800">Penyimpanan Glikogen</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // CONTROL CONTENT (KOLOM KANAN ~40%)
  const renderControlContent = () => {
    switch (phase) {
      case 'PREDICTION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 1 • Prediksi Karbon Target</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Atom Karbon Mana yang Menerima Fosfat?
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Sebelum melakukan manipulasi kimiawi, tentukan atom karbon nomor berapa (C1–C6) yang difosforilasi oleh Heksokinase/Glukokinase pada tahap inisiasi ini:
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map(cNum => (
                <button
                  key={cNum}
                  type="button"
                  onClick={() => setPredictedCarbon(cNum)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    predictedCarbon === cNum
                      ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold ring-1 ring-amber-500'
                      : 'bg-[#FAF8F5] border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-mono font-bold">Karbon C{cNum}</div>
                  <div className="text-[10px] text-stone-500">
                    {cNum === 1 ? 'Anomerik' : cNum === 6 ? '-CH₂OH' : `Cincin ${cNum}`}
                  </div>
                </button>
              ))}
            </div>

            {predictedCarbon && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prediksi Karbon C{predictedCarbon} dipilih! Klik <strong>Lanjut: 2. Manipulasi</strong> untuk mentransfer gugus fosfat.</span>
              </div>
            )}
          </div>
        );

      case 'MANIPULATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 2 • Manipulasi Gugus Kimia</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Pindahkan Fosfat Gamma (℗γ) ke Gugus Target
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                1. Ketuk atau seret gugus <strong>℗γ (jingga)</strong> dari molekul ATP.<br />
                2. Tempelkan tepat pada atom karbon target pada rumus Haworth glukosa di sebelah kiri.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <span className="font-bold text-stone-900 block">Status Manipulasi:</span>
              <div className="flex items-center justify-between text-[11px]">
                <span>Sumber Fosfat:</span>
                <span className={selectedPhosphateSource ? 'font-bold text-orange-600' : 'text-stone-600'}>
                  {selectedPhosphateSource ? 'Fosfat ℗γ Terpilih' : 'Belum dipilih'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Akseptor:</span>
                <span className={isTransferred ? 'font-bold text-emerald-600' : 'text-stone-600'}>
                  {isTransferred ? 'C6 (-CH₂-O-PO₃²⁻)' : 'Menunggu penempatan'}
                </span>
              </div>
            </div>

            {isTransferred && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <strong className="flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transfer Gugus Selesai!</span>
                </strong>
                <p className="text-[11px] leading-relaxed">
                  G6P telah terbentuk dan ATP terhidrolisis menjadi ADP. Lanjutkan ke <strong>Layar 3 • Amati</strong> untuk menelaah sifat fisiknya.
                </p>
              </div>
            )}
          </div>
        );

      case 'OBSERVATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 3 • Amati Perubahan Molekuler</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Akibat Pembentukan Glukosa-6-Fosfat (G6P)
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Perhatikan perbedaan penting antara glukosa bebas dengan G6P yang baru terbentuk:
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1 shadow-2xs">
                <span className="font-bold text-stone-900 block">1. Muatan Negatif Permanen (-2):</span>
                <p className="text-stone-600 text-[11px]">
                  Pada pH sitosol (~7.2), gugus fosfat terionisasi sempurna menjadi dianion (-PO₃²⁻). Lapisan ganda fosfolipid membran sel menolak ion bermuatan tinggi ini.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1 shadow-2xs">
                <span className="font-bold text-stone-900 block">2. Jebakan Metabolik (Trapping):</span>
                <p className="text-stone-600 text-[11px]">
                  Transporter glukosa (GLUT) hanya mengenali molekul glukosa netral tanpa fosfat. Dengan demikian, G6P terkunci secara ireversibel di dalam sel.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1 shadow-2xs">
                <span className="font-bold text-stone-900 block">3. Menjaga Gradien Difusi Masuk:</span>
                <p className="text-stone-600 text-[11px]">
                  Karena glukosa bebas segera diubah menjadi G6P, konsentrasi glukosa intrasel tetap rendah sehingga glukosa dari darah terus mengalir masuk menuruni gradien konsentrasi.
                </p>
              </div>
            </div>
          </div>
        );

      case 'ANALYSIS':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 4 • Analisis Sebab-Akibat</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Pertanyaan Analisis Kritis
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Apa akibat biologis paling penting dari penambahan gugus fosfat pada glukosa oleh heksokinase?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { 
                  id: 'A', 
                  label: 'Muatan negatif gugus fosfat membantu memerangkap glukosa di dalam sel dan menghasilkan G6P sebagai titik persimpangan metabolik (dapat menuju glikolisis, PPP, atau glikogenesis).' 
                },
                { 
                  id: 'B', 
                  label: 'Menjadikan molekul glukosa netral sehingga dapat berdifusi bebas menembus membran sel kapan pun dibutuhkan.' 
                },
                { 
                  id: 'C', 
                  label: 'Mengunci molekul glukosa sehingga hanya dan mutlak bisa digunakan untuk sintesis glikogen saja tanpa jalur lain.' 
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAnalysisAnswer(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    analysisAnswer === opt.id
                      ? 'bg-stone-900 text-amber-300 border-stone-800 font-semibold shadow-2xs'
                      : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <strong className="block text-amber-400">{opt.id}.</strong>
                  <span className="leading-relaxed">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'FEEDBACK':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 5 • Umpan Balik Ilmiah</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Hasil Evaluasi Reaksi Fosforilasi C6
              </h4>
            </div>

            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Luar Biasa, Pemahaman Biokimia Anda Tepat!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span>Periksa Kembali Jawaban atau Manipulasi</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed text-[11px]">
                {isCorrect 
                  ? 'Fosfat gamma berhasil Anda transfer ke atom C6. G6P memiliki muatan negatif ganda (-2) yang mencegahnya melintasi membran dan tidak dikenali oleh transporter GLUT. Penting dicatat: G6P bukanlah substrat eksklusif glikogenesis, melainkan titik persimpangan (junction) sentral yang juga dapat dialirkan ke Glikolisis (energi) atau Jalur Pentosa Fosfat (NADPH & ribosa).'
                  : 'Jawaban yang tepat adalah Pilihan A. Muatan negatif fosfat memerangkap glukosa di dalam sel dan menjadikannya titik persimpangan metabolik multidirectional.'}
              </p>

              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-stone-600 hover:text-stone-900 font-semibold underline text-[11px] cursor-pointer"
                >
                  Coba Manipulasi Ulang
                </button>
                <span className="font-mono font-bold text-stone-900">Skor: {score}/100</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <LKMProgressiveActivityLayout
        title="Tahap 1: Fosforilasi Glukosa C6 & Jebakan Metabolik"
        badge="Bagian C • 5 Tahap Progresif"
        currentPhase={phase}
        onPhaseChange={setPhase}
        visualContent={renderVisualContent()}
        controlContent={renderControlContent()}
        hints={hints}
        currentHintIndex={hintIndex}
        onShowNextHint={() => setHintIndex(prev => Math.min(hints.length, prev + 1))}
        onReset={handleReset}
        onCheckAnswer={phase === 'ANALYSIS' ? handleCheckAnswer : undefined}
        canCheck={isTransferred && analysisAnswer !== null}
        score={score}
        isCorrect={isCorrect}
        explanation="Fosforilasi glukosa oleh heksokinase atau glukokinase menargetkan gugus hidroksil primer C6 (-CH₂OH). Reaksi ini bersifat eksergonik (ΔG°′ = -16.7 kJ/mol) dan mengonsumsi 1 ATP. Muatan -2 dari gugus fosfat memerangkap glukosa di dalam sel karena tidak dapat berdifusi melintasi lapisan ganda lipid dan tidak memiliki afinitas terhadap transporter GLUT. G6P selanjutnya bertindak sebagai titik persimpangan cabang metabolik fleksibel: dapat masuk ke glikolisis, jalur pentosa fosfat, atau glikogenesis."
      />
    </div>
  );
};
