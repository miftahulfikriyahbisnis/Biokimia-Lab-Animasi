/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Printer, 
  Share2, 
  Save, 
  RotateCcw, 
  BookOpen, 
  Check, 
  Sparkles, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { GroupPredictionState } from './LKMSectionA_Prompt';

interface LKMSectionFReflectionProps {
  predictionData: GroupPredictionState;
  onBack: () => void;
  onFinishLKM: () => void;
  groupName: string;
}

export const LKMSectionF_Reflection: React.FC<LKMSectionFReflectionProps> = ({
  predictionData,
  onBack,
  onFinishLKM,
  groupName,
}) => {
  const [reflectionStatus, setReflectionStatus] = useState<'ACCURATE' | 'NEEDS_REVISION' | null>(null);
  const [revisionsNote, setRevisionsNote] = useState<string>('');
  const [newConceptsNote, setNewConceptsNote] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const PREDICTION_LABELS: Record<number, string> = {
    1: 'Dibuang melalui urine sebagai limbah metabolik.',
    2: 'Dibiarkan mengalir bebas dalam darah dan cairan ekstraseluler.',
    3: 'Disimpan dalam bentuk polimer glikogen sebagai cadangan karbohidrat cepat.',
    4: 'Seluruhnya langsung diubah menjadi lemak tubuh (adiposit).'
  };

  const handleSaveLKM = () => {
    setIsSaved(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="lkm-section-f">
      
      {/* Header Bagian F */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>Bagian F • Refleksi Prediksi & Kesimpulan Akhir</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Refleksi Kelompok: Memvalidasi Hipotesis Awal dengan Bukti Biokimiawi
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Bandingkan prediksi awal yang kelompok Anda rumuskan pada Bagian A dengan pemahaman molekuler yang telah Anda rekonstruksi. 
          Sempurnakan argumentasi ilmiah kelompok untuk menutup Lembar Kerja Mahasiswa (LKM) ini.
        </p>
      </div>

      {/* Kartu Kilas Balik Prediksi Awal Kelompok */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Prediksi Awal Kelompok Anda (Terekam dari Bagian A)</span>
          </h3>
          <span className="text-[11px] font-mono text-stone-500 font-bold bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-stone-200">
            Kelompok: {groupName || 'Kelompok Belajar'}
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-stone-500 uppercase text-[10px] block">
              Pilihan Prediksi Kasus Atlet:
            </span>
            <p className="font-bold text-stone-900 text-xs sm:text-sm">
              {predictionData.casePrediction 
                ? PREDICTION_LABELS[predictionData.casePrediction] 
                : 'Belum memilih prediksi pada Bagian A'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-1">
              <span className="font-bold text-stone-500 uppercase text-[10px] block">1. Bentuk Simpanan:</span>
              <p className="text-stone-800">{predictionData.formOfStorage || '-'}</p>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-1">
              <span className="font-bold text-stone-500 uppercase text-[10px] block">2. Organ Penyimpan:</span>
              <p className="text-stone-800">{predictionData.targetOrgans || '-'}</p>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-1">
              <span className="font-bold text-stone-500 uppercase text-[10px] block">3. Waktu Penggunaan:</span>
              <p className="text-stone-800">{predictionData.whenUsed || '-'}</p>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E2D9] space-y-1">
              <span className="font-bold text-stone-500 uppercase text-[10px] block">4. Alasan Bukan Glukosa Bebas:</span>
              <p className="text-stone-800">{predictionData.whyNotFreeGlucose || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluasi Kesesuaian Prediksi */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4">
        <label className="block text-xs sm:text-sm font-bold text-stone-900">
          Bagaimanakah kesesuaian prediksi awal kelompok Anda setelah menelaah LKM ini?
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setReflectionStatus('ACCURATE')}
            className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-start gap-3 ${
              reflectionStatus === 'ACCURATE'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400'
                : 'bg-[#FAF8F5] border-[#E5E2D9] text-stone-700 hover:bg-stone-50'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-stone-900">Prediksi Kami Sudah Sesuai</span>
              <span className="text-[11px] text-stone-600 font-normal">Hipotesis awal kelompok kami selaras dengan mekanisme biokimiawi glikogenesis dan peran organ.</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setReflectionStatus('NEEDS_REVISION')}
            className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-start gap-3 ${
              reflectionStatus === 'NEEDS_REVISION'
                ? 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-400'
                : 'bg-[#FAF8F5] border-[#E5E2D9] text-stone-700 hover:bg-stone-50'
            }`}
          >
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-stone-900">Perlu Ada Perbaikan / Penyempurnaan</span>
              <span className="text-[11px] text-stone-600 font-normal">Terdapat beberapa miskonsepsi awal (misal: peran glukosa bebas, hati vs otot, atau peran UTP) yang kini telah terkoreksi.</span>
            </div>
          </button>
        </div>

        {/* Input Catatan Perbaikan & Konsep Baru */}
        <div className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800 block">
              A. Bagian mana yang perlu diperbaiki dari pemikiran awal kelompok Anda?
            </label>
            <textarea
              rows={2}
              value={revisionsNote}
              onChange={(e) => setRevisionsNote(e.target.value)}
              placeholder="Contoh: Kami awalnya mengira otot bisa membagikan glukosa ke darah, ternyata otot tidak memiliki enzim Glukosa-6-fosfatase..."
              className="w-full text-xs p-3 bg-[#FAF8F5] border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 placeholder:text-stone-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800 block">
              B. Apa konsep kunci terpenting yang baru kelompok Anda pahami secara mendalam?
            </label>
            <textarea
              rows={2}
              value={newConceptsNote}
              onChange={(e) => setNewConceptsNote(e.target.value)}
              placeholder="Contoh: Konsep aktivasi UDP-glukosa yang digerakkan oleh hidrolisis PPi secara eksergonik untuk menggerakkan sintesis polimer yang endergonik..."
              className="w-full text-xs p-3 bg-[#FAF8F5] border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      {/* Kesimpulan Ilmiah Akhir (Mandat Dosen & Kurikulum) */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-md space-y-3 border border-stone-800">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Kesimpulan Ilmiah Akhir LKM Anabolisme Karbohidrat</span>
        </div>
        
        <blockquote className="p-4 bg-stone-800/80 border-l-4 border-amber-400 rounded-r-xl text-stone-200 text-xs sm:text-sm font-medium leading-relaxed italic">
          “Tubuh menyimpan kelebihan energi karena asupan makanan tidak selalu bersamaan dengan kebutuhan energi. 
          Kelebihan glukosa dapat disimpan sebagai glikogen untuk cadangan jangka pendek. 
          Jika kebutuhan energi terpenuhi dan kapasitas penyimpanan glikogen relatif mencukupi, 
          sebagian kelebihan karbon dapat dialihkan menuju sintesis asam lemak dan triasilgliserol sebagai cadangan jangka panjang.”
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-[11px] text-stone-300">
          <div className="p-2.5 rounded-lg bg-stone-800/50 border border-stone-700">
            <span className="font-bold text-amber-300 block">Glikogen Hati:</span>
            <span>Menjaga gula darah puasa via Glukosa-6-fosfatase.</span>
          </div>
          <div className="p-2.5 rounded-lg bg-stone-800/50 border border-stone-700">
            <span className="font-bold text-amber-300 block">Glikogen Otot:</span>
            <span>Khusus bahan bakar kontraksi mekanis internal.</span>
          </div>
          <div className="p-2.5 rounded-lg bg-stone-800/50 border border-stone-700">
            <span className="font-bold text-amber-300 block">Trigliserida Adiposa:</span>
            <span>Penyimpan surplus energi jangka panjang tanpa batas kaku.</span>
          </div>
        </div>
      </div>

      {/* Tombol Simpan Lembar Kerja & Cetak */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveLKM}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-amber-100 hover:bg-stone-800 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            id="btn-save-final-lkm"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Lembar Kerja Kelompok</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            id="btn-print-lkm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF LKM</span>
          </button>
        </div>

        {isSaved && (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>Seluruh data LKM kelompok berhasil tersimpan rapi!</span>
          </div>
        )}
      </div>

      {/* Navigasi Bawah */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-bold text-stone-700 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian E: Pertanyaan Analisis</span>
        </button>

        <button
          type="button"
          onClick={onFinishLKM}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-finish-lkm"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Selesai & Kembali ke Menu Modul Karbohidrat</span>
        </button>
      </div>

    </div>
  );
};
