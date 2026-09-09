/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  RotateCw, 
  Layers, 
  HelpCircle, 
  Zap, 
  BookOpen 
} from 'lucide-react';
import { CARB_THEORY_DATA } from '../../data/carbohydrateData';
import { GlucoseMolecule3D } from './3d/GlucoseMolecule3D';

interface CarbohydrateTheoryProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export const CarbohydrateTheory: React.FC<CarbohydrateTheoryProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  const [isStraightChain, setIsStraightChain] = useState(false);
  const [selectedCarbon, setSelectedCarbon] = useState<number | null>(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [isEasyMode, setIsEasyMode] = useState(false);

  // Detail keterangan karbon saat diklik
  const carbonDetails: { [key: number]: { title: string; desc: string; role: string } } = {
    1: {
      title: 'Karbon Anomerik (C-1)',
      desc: 'Atom C-1 merupakan pusat hemiasetal yang menentukan anomerik α (OH ke bawah) atau β (OH ke atas). Membentuk ikatan α-1,4 glikosidik dengan C-4 molekul lain pada pati dan glikogen.',
      role: 'Sangat reaktif; substrat pengikatan ikatan polimer.'
    },
    2: {
      title: 'Karbon Kiral C-2',
      desc: 'Pada glukosa cincin piranosa, gugus hidroksil (-OH) berada pada posisi ekuatorial. Dikonversi menjadi gugus keto pada reaksi isomerisasi glikolisis (G6P → F6P).',
      role: 'Mengalami penataan ulang selama tahap 2 glikolisis.'
    },
    3: {
      title: 'Karbon Kiral C-3',
      desc: 'Gugus -OH pada C-3 mengarah ke sisi berlawanan (atas bidang) pada proyeksi Haworth dan kiri pada proyeksi Fischer.',
      role: 'Penentu stereokimia spesifik D-glukosa.'
    },
    4: {
      title: 'Karbon Kiral C-4',
      desc: 'Ujung non-pereduksi yang menyediakan gugus -OH untuk disambung dengan C-1 molekul glukosa berikutnya dalam pembentukan ikatan linear α-1,4 glikosidik.',
      role: 'Titik perpanjangan rantai amilosa dan glikogen.'
    },
    5: {
      title: 'Karbon Kiral C-5',
      desc: 'Atom C-5 mengikat atom oksigen cincin eter piranosa (jembatan C1-O-C5) dan menentukan konfigurasi D pada monosakarida tubuh manusia.',
      role: 'Menutup cincin hemiasetal intramolekuler.'
    },
    6: {
      title: 'Karbon C-6 (Gugus -CH₂OH Ekstrasiklik)',
      desc: 'Berada di luar bidang cincin piranosa. Tempat terjadinya fosforilasi pertama oleh enzim heksokinase/glukokinase dengan konsumsi ATP membentuk Glukosa-6-Fosfat (G6P).',
      role: 'Kunci penguncian glukosa di dalam sitoplasma sel.'
    }
  };

  const activeCarbonInfo = selectedCarbon ? carbonDetails[selectedCarbon] : carbonDetails[1];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Bar Navigasi Atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <button
          onClick={() => setIsEasyMode(!isEasyMode)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
            isEasyMode ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
          }`}
        >
          {isEasyMode ? <Zap className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
          <span>{isEasyMode ? 'Mode Penjelasan Ringkas' : 'Mode Penjelasan Ilmiah Lengkap'}</span>
        </button>
      </div>

      {/* Header Judul Materi Dasar */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          Tahap 1: Landasan Teori & Struktur Molekul
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
          Materi Dasar & Karakteristik Molekul Glukosa
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-3xl leading-relaxed">
          {CARB_THEORY_DATA.definition.content}
        </p>
      </div>

      {/* Grid: 3D Glukosa & Panel Interaktif */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri (7 Col): Visualisasi 3D Molekul Glukosa */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E2D9] p-4 flex flex-col shadow-xs min-h-[460px]">
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-serif font-bold text-sm text-[#3E3E3E]">
                Model 3D D-Glukosa (C₆H₁₂O₆)
              </h3>
              <p className="text-[11px] text-[#A5A58D]">
                Klik atom karbon bernomor (C-1 s.d. C-6) untuk mempelajari perannya
              </p>
            </div>

            {/* Toggle Haworth vs Fischer */}
            <button
              onClick={() => setIsStraightChain(!isStraightChain)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F5F2EA] hover:bg-[#EAE5D9] border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] transition-all cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-600" />
              <span>{isStraightChain ? 'Bentuk Cincin (Haworth)' : 'Bentuk Rantai (Fischer)'}</span>
            </button>
          </div>

          {/* Canvas 3D Molekul */}
          <div className="flex-1 w-full rounded-2xl bg-[#FAF8F5] overflow-hidden relative border border-[#E5E2D9]/60 min-h-[340px]">
            <GlucoseMolecule3D
              isStraightChain={isStraightChain}
              selectedCarbon={selectedCarbon}
              onSelectCarbon={(id) => setSelectedCarbon(id)}
              showLabels={true}
            />
          </div>

          {/* Panel Info Karbon Terpilih */}
          <div className="mt-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-900">{activeCarbonInfo.title}</span>
              <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
                Atom Terpilih
              </span>
            </div>
            <p className="text-[#706B5C] text-[11px] leading-relaxed mb-1">
              {activeCarbonInfo.desc}
            </p>
            <div className="text-[10px] font-semibold text-[#6B705C]">
              Signifikansi Biokimia: {activeCarbonInfo.role}
            </div>
          </div>
        </div>

        {/* Kolom Kanan (5 Col): Perbandingan Katabolisme vs Anabolisme */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif font-bold text-sm text-[#3E3E3E]">
                Perbandingan Katabolisme vs Anabolisme
              </h3>
            </div>

            <div className="space-y-3">
              {CARB_THEORY_DATA.catabolismVsAnabolism.map((row, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9]/70 space-y-1.5 text-xs">
                  <span className="font-bold text-[#3E3E3E] block text-[11px] uppercase tracking-wider">
                    {row.aspect}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                      <span className="font-bold text-emerald-800 block text-[10px] mb-0.5">Katabolisme</span>
                      <p className="text-emerald-900 leading-snug">{row.catabolism}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-200/60">
                      <span className="font-bold text-blue-800 block text-[10px] mb-0.5">Anabolisme</span>
                      <p className="text-blue-900 leading-snug">{row.anabolism}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kotak Mini: Mengapa Selulosa Tidak Dicerna? */}
          <div className="bg-amber-50/70 rounded-3xl border border-amber-200 p-4 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Mengapa Manusia Tidak Bisa Mencerna Selulosa?</span>
            </div>
            <p className="text-[#706B5C] text-[11px] leading-relaxed">
              Selulosa tersusun atas polimer glukosa dengan ikatan <strong>β-1,4 glikosidik</strong>. Manusia hanya memproduksi enzim amilase yang memecah ikatan <strong>α-1,4</strong>. Tanpa enzim <em>selulase</em>, selulosa lewat sebagai serat pangan (dietary fiber) yang membantu peristaltik usus.
            </p>
          </div>
        </div>
      </div>

      {/* Bagian Polisakarida & Organ Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kartu Polisakarida */}
        <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-3 shadow-xs">
          <h3 className="font-serif font-bold text-sm text-[#3E3E3E] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Karakteristik Jenis Karbohidrat Penting</span>
          </h3>
          <div className="space-y-2">
            {CARB_THEORY_DATA.carbohydrateTypes.map((c, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9]/60 text-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#3E3E3E]">{c.name}</span>
                  <span className="text-[10px] text-[#A5A58D]">{c.category}</span>
                </div>
                <p className="text-[11px] text-[#706B5C] leading-relaxed">{c.composition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kartu Organ Utama */}
        <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-3 shadow-xs">
          <h3 className="font-serif font-bold text-sm text-[#3E3E3E] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Peran Organ Utama dalam Metabolisme Karbohidrat</span>
          </h3>
          <div className="space-y-2">
            {CARB_THEORY_DATA.majorLocations.map((loc, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9]/60 text-xs space-y-0.5">
                <span className="font-bold text-[#3E3E3E] block">{loc.organ}</span>
                <p className="text-[11px] text-[#706B5C] leading-relaxed">{loc.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mode "Coba Sendiri": Latihan Mandiri Singkat */}
      <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-sm text-[#3E3E3E]">
              Mode "Coba Sendiri": Uji Pemahaman Kilat
            </h3>
          </div>
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="text-xs font-semibold text-[#6B705C] hover:underline cursor-pointer"
          >
            {showQuiz ? 'Tutup Latihan' : 'Mulai Latihan Cepat'}
          </button>
        </div>

        {showQuiz && (
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-3 text-xs">
            <p className="font-semibold text-[#3E3E3E]">
              Pertanyaan: Mengapa fosforilasi glukosa oleh ATP pada atom C-6 membentuk Glukosa-6-Fosfat (G6P) mutlak penting bagi sel manusia?
            </p>
            <div className="space-y-1.5">
              {[
                { key: 'A', text: 'Mengubah glukosa langsung menjadi gas karbondioksida di sitoplasma' },
                { key: 'B', text: 'Menambahkan muatan negatif (-2) sehingga molekul terperangkap di dalam sel dan tidak dapat keluar menembus membran' },
                { key: 'C', text: 'Menghilangkan semua atom hidrogen dari molekul glukosa' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setQuizAnswer(opt.key)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                    quizAnswer === opt.key
                      ? opt.key === 'B'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                        : 'bg-red-50 border-red-300 text-red-900'
                      : 'bg-white border-[#E5E2D9] text-[#706B5C] hover:bg-[#F5F2EA]'
                  }`}
                >
                  <span className="font-bold mr-2">{opt.key}.</span>
                  {opt.text}
                </button>
              ))}
            </div>

            {quizAnswer && (
              <div className={`p-2.5 rounded-xl text-[11px] ${
                quizAnswer === 'B' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
              }`}>
                {quizAnswer === 'B' 
                  ? '✅ Tepat sekali! Penambahan gugus fosfat bermuatan negatif menjebak G6P di dalam sitoplasma karena transporter GLUT hanya mengenali glukosa netral tak terfosforilasi.' 
                  : '❌ Kurang tepat. Jawaban yang benar adalah B: Muatan negatif fosfat mengunci molekul di dalam sel.'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigasi Lanjut */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={onCompleteAndNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Tandai Selesai & Lanjut: Perjalanan Nasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
