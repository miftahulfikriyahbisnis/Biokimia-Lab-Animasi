/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, Users, CheckCircle, ArrowRight, Lightbulb, Save, Edit3 } from 'lucide-react';
import { InteractiveAnabolismConcept } from './interactive/InteractiveAnabolismConcept';

export interface GroupPredictionState {
  casePrediction: number | null; // 1 | 2 | 3 | 4
  formOfStorage: string;
  targetOrgans: string;
  whenUsed: string;
  whyNotFreeGlucose: string;
  isSubmitted: boolean;
}

interface LKMSectionAPromptProps {
  predictionData: GroupPredictionState;
  onSavePrediction: (data: GroupPredictionState) => void;
  onNext: () => void;
}

const PREDICTION_OPTIONS = [
  { id: 1, label: 'Dibuang melalui urine sebagai limbah metabolik tubuh.' },
  { id: 2, label: 'Dibiarkan mengalir bebas dalam darah dan cairan ekstraseluler.' },
  { id: 3, label: 'Disimpan dalam bentuk polimer glikogen sebagai cadangan karbohidrat.' },
  { id: 4, label: 'Seluruhnya langsung diubah menjadi lemak tubuh (adiposit).' },
];

const GUIDING_QUESTIONS = [
  {
    key: 'formOfStorage' as const,
    label: '1. Dalam bentuk apa energi terutama disimpan pertama kali?',
    placeholder: 'Diskusikan bersama kelompok: Makromolekul apa yang dibentuk dari monomer glukosa?...',
    hint: 'Pikirkan jenis polimer karbohidrat bercabang yang disintesis dari glukosa.'
  },
  {
    key: 'targetOrgans' as const,
    label: '2. Di organ atau jaringan mana proses penyimpanan tersebut berlangsung?',
    placeholder: 'Diskusikan organ utama yang memiliki kapasitas menampung cadangan ini...',
    hint: 'Tinjau organ metabolik sentral di rongga perut dan jaringan kontraktil penggerak tubuh.'
  },
  {
    key: 'whenUsed' as const,
    label: '3. Kapan cadangan energi tersebut akan digunakan kembali oleh tubuh?',
    placeholder: 'Diskusikan kondisi fisiologis saat cadangan tersebut dipecah kembali...',
    hint: 'Pikirkan kondisi saat jeda makan (puasa singkat) atau saat otot berkontraksi intensif.'
  },
  {
    key: 'whyNotFreeGlucose' as const,
    label: '4. Mengapa glukosa tidak disimpan sebagai glukosa bebas dalam jumlah besar di dalam sel?',
    placeholder: 'Tinjau dari aspek fisikokimia / tekanan osmotik seluler...',
    hint: 'Apa akibatnya terhadap osmolaritas sel dan masuknya air jika ribuan molekul glukosa monomer larut bebas di sitoplasma?'
  }
];

export const LKMSectionA_Prompt: React.FC<LKMSectionAPromptProps> = ({
  predictionData,
  onSavePrediction,
  onNext,
}) => {
  const [formData, setFormData] = useState<GroupPredictionState>(predictionData);
  const [activeHintKey, setActiveHintKey] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<boolean>(false);

  const handleOptionSelect = (id: number) => {
    setFormData(prev => ({ ...prev, casePrediction: id }));
  };

  const handleTextChange = (field: keyof GroupPredictionState, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...formData, isSubmitted: true };
    onSavePrediction(updated);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 3000);
  };

  const isFormComplete = 
    formData.casePrediction !== null &&
    formData.formOfStorage.trim().length > 3 &&
    formData.targetOrgans.trim().length > 3 &&
    formData.whenUsed.trim().length > 3 &&
    formData.whyNotFreeGlucose.trim().length > 3;

  return (
    <div className="space-y-6" id="lkm-section-a">
      {/* Header Bagian A */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4 text-amber-700" />
          <span>Bagian A • Aktivitas Diskusi Kelompok Asal</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Pemantik: Mengapa Tubuh Menabung Energi?
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Sebelum menelaah reaksi kimia molekuler, diskusikan skenario fisiologis berikut bersama anggota kelompok Anda.
          Rumuskan hipotesis awal bersama. <em>Catatan: Jawaban awal kelompok Anda akan disimpan dan dievaluasi kembali pada tahap akhir LKM.</em>
        </p>
      </div>

      {/* Aktivitas Interaktif 1: Konsep Dasar Anabolisme vs Katabolisme */}
      <InteractiveAnabolismConcept />

      {/* Skenario Kasus */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-3">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          Kasus Fisiologis Nyata
        </span>
        <blockquote className="p-4 bg-[#FAF8F5] border-l-4 border-amber-500 rounded-r-xl text-stone-800 text-sm font-medium leading-relaxed italic">
          “Seorang atlet lari jarak jauh meningkatkan konsumsi karbohidrat (carbo-loading) sebelum kompetisi. Setelah kebutuhan energi langsung sel-sel tubuhnya terpenuhi, apa yang dilakukan tubuh terhadap kelebihan glukosa tersebut?”
        </blockquote>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pilihan Prediksi Kasus */}
        <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-4">
          <label className="block text-xs sm:text-sm font-bold text-stone-900">
            Pilihlah satu prediksi yang paling tepat menurut kesepakatan kelompok Anda:
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PREDICTION_OPTIONS.map((opt) => {
              const isSelected = formData.casePrediction === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.id)}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100/70 border-amber-600 text-stone-900 shadow-2xs ring-1 ring-amber-500'
                      : 'bg-[#FAF8F5] border-[#E5E2D9] text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                  id={`pred-opt-${opt.id}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border transition-colors ${
                    isSelected ? 'bg-amber-600 text-white border-amber-600' : 'bg-white border-stone-400 text-stone-600'
                  }`}>
                    {opt.id}
                  </span>
                  <span className="leading-snug">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Pertanyaan Diskusi Kelompok */}
        <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-stone-600" />
              <span>Pertanyaan Diskusi Terarah Kelompok</span>
            </h3>
            <span className="text-[11px] text-stone-500">4 Pertanyaan Reflektif</span>
          </div>

          <div className="space-y-4">
            {GUIDING_QUESTIONS.map((q) => {
              const currentVal = formData[q.key] as string;
              const showHint = activeHintKey === q.key;

              return (
                <div key={q.key} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <label className="text-xs sm:text-sm font-bold text-stone-800 leading-snug">
                      {q.label}
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveHintKey(showHint ? null : q.key)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-900 shrink-0 cursor-pointer"
                      title="Lihat Petunjuk Berpikir"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Tutup Petunjuk' : 'Petunjuk'}</span>
                    </button>
                  </div>

                  {showHint && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-2">
                      <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{q.hint}</span>
                    </div>
                  )}

                  <textarea
                    rows={2}
                    value={currentVal}
                    onChange={(e) => handleTextChange(q.key, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full text-xs sm:text-sm p-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900 placeholder:text-stone-400"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bar Tombol Simpan & Lanjut */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!isFormComplete}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-amber-100 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
              id="btn-save-prediction"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Jawaban Awal Kelompok</span>
            </button>

            {saveFeedback && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fadeIn">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Jawaban awal berhasil tersimpan! Kunci jawaban tidak ditampilkan sekarang.</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={!formData.isSubmitted && !isFormComplete}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
            id="btn-next-to-section-b"
          >
            <span>Lanjut ke Bagian B: Peta Tujuan Glukosa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
