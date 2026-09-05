/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, 
  HelpCircle, 
  FileText, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  Layers,
  FlaskConical
} from 'lucide-react';
import { InstructionsModal } from '../components/InstructionsModal';

interface HomeViewProps {
  onStartAnimation: () => void;
  onOpenSources: () => void;
  onOpenGlossary: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartAnimation,
  onOpenSources,
  onOpenGlossary
}) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      {/* Hero Container */}
      <div className="bg-[#4A4E3F] text-[#FDFCF9] rounded-3xl p-6 sm:p-12 shadow-xl border border-[#3E4234] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#6B705C]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#CB997E]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FFE8D6] text-xs font-medium backdrop-blur-xs border border-white/15">
            <FlaskConical className="w-3.5 h-3.5 text-[#CB997E]" />
            <span>Animasi Pembelajaran Interaktif • Pendidikan Kimia</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#FDFCF9] leading-tight">
              Perjalanan Kimia Insulin
            </h1>
            <p className="text-lg sm:text-xl text-[#DDBEA9] font-serif italic">
              Diklasifikasikan, Dibentuk, Dilepaskan, Bekerja, dan Dihentikan
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#FDFCF9]/90 leading-relaxed font-normal">
            Ikuti perjalanan hormon insulin dan amati perubahan kimia yang terjadi sejak insulin dibentuk hingga sinyalnya dihentikan.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            {/* Tombol Utama: Mulai Animasi */}
            <button
              id="btn-home-start-animation"
              onClick={onStartAnimation}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#CB997E] text-white font-semibold text-sm shadow-md hover:bg-[#b8856b] active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Mulai Animasi</span>
            </button>

            {/* Tombol Sekunder: Lihat Petunjuk */}
            <button
              id="btn-home-instructions"
              onClick={() => setShowInstructions(true)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-[#FDFCF9] font-medium text-sm backdrop-blur-xs border border-white/20 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#FFE8D6]" />
              <span>Lihat Petunjuk</span>
            </button>

            {/* Tombol Kecil: Sumber Ilmiah */}
            <button
              id="btn-home-sources"
              onClick={onOpenSources}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs text-[#FFE8D6]/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sumber Ilmiah</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alur Belajar 9 Tahap Ringkas (Card Preview) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#6B705C]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6B705C]">
              Tahapan Perjalanan Molekuler (1 – 9)
            </h2>
          </div>
          <button
            onClick={onOpenGlossary}
            className="text-xs text-[#CB997E] hover:underline flex items-center gap-1 font-medium"
          >
            <BookOpen className="w-3 h-3" />
            <span>Lihat Glosarium Istilah</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#706B5C]">
          <div className="p-3.5 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-[#CB997E] block">Tahap 1 – 3</span>
            <p className="font-medium text-[#3E3E3E]">Asal & Pembentukan</p>
            <p className="text-[11px] text-[#A5A58D]">Asal pankreas, klasifikasi hormon peptida, & pematangan insulin.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-[#CB997E] block">Tahap 4 – 6</span>
            <p className="font-medium text-[#3E3E3E]">Struktur & Reseptor</p>
            <p className="text-[11px] text-[#A5A58D]">51 asam amino 3 disulfida, eksositosis granula, & pengikatan reseptor.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-[#CB997E] block">Tahap 7 – 9</span>
            <p className="font-medium text-[#3E3E3E]">Fosforilasi & Penutup</p>
            <p className="text-[11px] text-[#A5A58D]">Transfer gugus fosforil ATP, pelepasan fosfat (terminasi), & rangkuman.</p>
          </div>
        </div>
      </div>

      {/* Modal Petunjuk */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        onStart={onStartAnimation}
      />
    </div>
  );
};
