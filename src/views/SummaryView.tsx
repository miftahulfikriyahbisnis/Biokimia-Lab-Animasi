/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw, Home, CheckCircle2 } from 'lucide-react';

interface SummaryViewProps {
  onRestartAnimation: () => void;
  onGoHome: () => void;
  onProceedToPostTest?: () => void;
  onOpenSources?: () => void;
  onOpenGlossary?: () => void;
}

const SUMMARY_STEPS = [
  {
    step: '1',
    title: 'Asal Insulin',
    desc: 'Insulin diproduksi oleh sel beta pada pulau Langerhans di pankreas.'
  },
  {
    step: '2',
    title: 'Jenis atau Klasifikasi Insulin',
    desc: 'Hormon peptida, larut dalam air, bekerja pada reseptor membran sel untuk mengatur metabolisme.'
  },
  {
    step: '3',
    title: 'Pembentukan Insulin',
    desc: 'Preproinsulin → Proinsulin + signal peptide → Insulin matang + C-peptide.'
  },
  {
    step: '4',
    title: 'Struktur Insulin Matang',
    desc: '51 asam amino (Rantai A: 21 AA, Rantai B: 30 AA) dengan 3 ikatan disulfida.'
  },
  {
    step: '5',
    title: 'Penyimpanan dan Pelepasan',
    desc: 'Insulin disimpan dalam granula sel beta dan dilepaskan melalui eksositosis.'
  },
  {
    step: '6',
    title: 'Pengikatan pada Reseptor',
    desc: 'Insulin menempel pada sisi luar reseptor membran tanpa masuk ke dalam sel.'
  },
  {
    step: '7',
    title: 'Fosforilasi & Kerja Sinyal Insulin',
    desc: 'Fosforilasi mengaktifkan reseptor (IR–Tyr–OPO₃²⁻), memicu translokasi GLUT4 ke membran, dan memfasilitasi glukosa masuk ke dalam sel.'
  },
  {
    step: '8',
    title: 'Penghentian Sinyal (Defosforilasi)',
    desc: 'Protein tirosin fosfatase melepaskan Pi melalui hidrolisis, sinyal melemah, dan respons sel secara bertahap kembali ke kondisi basal.'
  }
];

export const SummaryView: React.FC<SummaryViewProps> = ({
  onRestartAnimation,
  onGoHome,
  onProceedToPostTest
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Kanvas Bersih Rangkuman */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E2D9] shadow-xs space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#A5A58D]">
            Tahap 9 — Penutup
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
            Rangkuman Perjalanan Kimia Hormon Insulin
          </h2>
          <p className="text-sm text-[#706B5C] max-w-lg mx-auto">
            Ikhtisar 8 peristiwa utama perjalanan insulin dari organ penghasil hingga penghentian sinyal.
          </p>
        </div>

        {/* Daftar 8 Tahap Ringkas dan Bersih */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUMMARY_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9] flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-xl bg-[#6B705C] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {item.step}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#3E3E3E] font-serif">
                  {item.title}
                </h4>
                <p className="text-xs text-[#706B5C] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Utama */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#E5E2D9]">
          {onProceedToPostTest && (
            <button
              onClick={onProceedToPostTest}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#CB997E] text-white text-sm font-bold shadow-xs hover:bg-[#B8876E] transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lanjut ke Tahap 3: Post-Test</span>
            </button>
          )}

          <button
            onClick={onRestartAnimation}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6B705C] text-white text-sm font-bold shadow-xs hover:bg-[#585D4B] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Animasi</span>
          </button>

          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#E5E2D9] text-[#706B5C] text-sm font-bold hover:bg-[#F5F2EA] transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>

      </div>
    </div>
  );
};
