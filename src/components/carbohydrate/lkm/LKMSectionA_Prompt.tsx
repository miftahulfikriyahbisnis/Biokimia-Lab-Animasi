/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Lightbulb, 
  Save, 
  Edit3, 
  HelpCircle,
  Activity,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { CarboLoadingIllustration } from './illustrations/CarboLoadingIllustration';
import { InteractiveAnabolismConcept } from './interactive/InteractiveAnabolismConcept';
import { LKMProgressiveActivityLayout, InteractionPhase } from './interactive/LKMProgressiveActivityLayout';

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
  { id: 1, label: 'Glukosa dibuang melalui urine sebagai limbah metabolik tubuh.' },
  { id: 2, label: 'Glukosa tetap bebas di dalam darah dan cairan ekstraseluler.' },
  { id: 3, label: 'Glukosa disimpan terlebih dahulu sebagai glikogen sebagai cadangan cepat.' },
  { id: 4, label: 'Semua glukosa langsung diubah menjadi lemak tubuh (adiposit).' },
];

const GUIDING_QUESTIONS = [
  {
    key: 'formOfStorage' as const,
    label: '1. Dalam bentuk makromolekul apa energi terutama disimpan pertama kali?',
    placeholder: 'Diskusikan bersama kelompok: Makromolekul apa yang dibentuk dari monomer glukosa?...',
    hint: 'Pikirkan jenis polimer karbohidrat bercabang yang disintesis secara cepat dari unit glukosa.'
  },
  {
    key: 'targetOrgans' as const,
    label: '2. Di organ atau jaringan mana proses penyimpanan tersebut terutama berlangsung?',
    placeholder: 'Diskusikan organ utama yang memiliki kapasitas menampung cadangan ini...',
    hint: 'Tinjau organ metabolik sentral di rongga perut (hepar) dan jaringan kontraktil penggerak tubuh (miosit).'
  },
  {
    key: 'whenUsed' as const,
    label: '3. Kapan cadangan energi tersebut akan dimobilisasi dan digunakan kembali oleh tubuh?',
    placeholder: 'Diskusikan kondisi fisiologis saat cadangan tersebut dipecah kembali...',
    hint: 'Pikirkan kondisi saat jeda makan (puasa singkat) atau saat otot berkontraksi intensif saat maraton.'
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
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [formData, setFormData] = useState<GroupPredictionState>(predictionData);
  const [activeHintKey, setActiveHintKey] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<boolean>(false);
  const [intakeSimulation, setIntakeSimulation] = useState<number>(3); // 1, 2, 3
  const [showConceptModal, setShowConceptModal] = useState<boolean>(false);

  const handleOptionSelect = (id: number) => {
    setFormData(prev => ({ ...prev, casePrediction: id }));
  };

  const handleTextChange = (field: keyof GroupPredictionState, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const updated = { ...formData, isSubmitted: true };
    onSavePrediction(updated);
    setSaveFeedback(true);
  };

  const isFormComplete = 
    formData.casePrediction !== null &&
    formData.formOfStorage.trim().length > 3 &&
    formData.targetOrgans.trim().length > 3 &&
    formData.whenUsed.trim().length > 3 &&
    formData.whyNotFreeGlucose.trim().length > 3;

  // VISUAL CONTENT UNTUK KOLOM KIRI (~60%)
  const renderVisualContent = () => {
    return (
      <div className="w-full space-y-3">
        {/* Banner Kasus Atlet */}
        <div className="bg-white/95 rounded-xl border border-stone-200/90 p-3 shadow-2xs">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block font-mono">
            Skenario Fisiologis Klinis
          </span>
          <p className="text-xs text-stone-800 font-medium leading-relaxed italic mt-0.5">
            “Seorang atlet lari jarak jauh meningkatkan konsumsi karbohidrat (carbo-loading) sebelum lomba maraton. Setelah kebutuhan energi langsung sel-sel tubuhnya terpenuhi, apa yang dilakukan tubuh terhadap kelebihan glukosa tersebut?”
          </p>
        </div>

        {/* Ilustrasi Orisinal Atlet, Aliran Darah, & Pankreas */}
        <CarboLoadingIllustration 
          intakeLevel={intakeSimulation} 
          onIntakeChange={setIntakeSimulation}
          interactive={phase === 'MANIPULATION' || phase === 'OBSERVATION'}
        />

        {/* Status Simulasi Dinamis */}
        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-950 flex items-center justify-between">
          <span className="font-semibold">
            Status Sirkulasi: {intakeSimulation === 3 ? 'Surplus Glukosa Tinggi (175 mg/dL)' : intakeSimulation === 2 ? 'Kondisi Normal (120 mg/dL)' : 'Kondisi Basal (85 mg/dL)'}
          </span>
          <span className="font-bold text-amber-900 font-mono">
            {intakeSimulation === 3 ? 'Glikogenesis Terpacu' : 'Homeostasis Stabil'}
          </span>
        </div>
      </div>
    );
  };

  // CONTROL CONTENT UNTUK KOLOM KANAN (~40%) BERDASARKAN FASE PROGRESIF
  const renderControlContent = () => {
    switch (phase) {
      case 'PREDICTION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 1 • Hipotesis Awal</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Ke Mana Kelebihan Glukosa Dialirkan?
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Pilihlah satu dugaan ilmiah yang paling logis menurut kelompok Anda. 
                <em>(Prediksi ini tidak langsung dinilai benar/salah, melainkan disimpan untuk dievaluasi di bagian akhir LKM).</em>
              </p>
            </div>

            <div className="space-y-2">
              {PREDICTION_OPTIONS.map((opt) => {
                const isSelected = formData.casePrediction === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-600 text-stone-900 shadow-2xs ring-1 ring-amber-500 font-semibold'
                        : 'bg-[#FAF8F5] border-[#E5E2D9] text-stone-700 hover:bg-stone-100/80'
                    }`}
                    id={`pred-opt-${opt.id}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border transition-colors ${
                      isSelected ? 'bg-amber-600 text-white border-amber-600' : 'bg-white border-stone-300 text-stone-600'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="leading-snug">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {formData.casePrediction && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pilihan terekam! Klik tombol <strong>Lanjut: 2. Manipulasi</strong> untuk melanjutkan.</span>
              </div>
            )}
          </div>
        );

      case 'MANIPULATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 2 • Manipulasi Variabel</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Simulasikan Beban Asupan Karbohidrat
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Ubah tingkat konsumsi karbohidrat atlet menggunakan tombol pada ilustrasi di sebelah kiri untuk melihat respons fisiologis pankreas.
              </p>
            </div>

            <div className="space-y-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
              <span className="font-bold text-stone-800 block">Pilih Kondisi Eksperimen:</span>
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  type="button"
                  onClick={() => setIntakeSimulation(1)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                    intakeSimulation === 1 ? 'bg-stone-900 text-amber-300 border-stone-800' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  1. Asupan Basal (Glukosa 85 mg/dL) → Sekresi insulin minimal
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeSimulation(2)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                    intakeSimulation === 2 ? 'bg-stone-900 text-amber-300 border-stone-800' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  2. Pasca-Makan Ringan (Glukosa 120 mg/dL) → Kebutuhan energi harian
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeSimulation(3)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                    intakeSimulation === 3 ? 'bg-amber-600 text-white border-amber-700 font-bold' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  3. Carbo-Loading Ekstrem (Glukosa 175 mg/dL) → Sekresi insulin masif!
                </button>
              </div>
            </div>

            <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-700" />
                <span>Pengamatan Fisiologis:</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                Saat asupan karbohidrat tinggi, sel beta pankreas melepaskan insulin untuk merangsang penyerapan glukosa dan memicu biosintesis cadangan energi makromolekuler.
              </p>
            </div>
          </div>
        );

      case 'OBSERVATION':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 3 • Pengamatan Aliran</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Dinamika Aliran Molekul & Hormon
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Perhatikan bagaimana tubuh memproses lonjakan karbohidrat secara sistemik:
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-start gap-2 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-stone-900">Pencernaan & Absorpsi:</strong>
                  <p className="text-stone-600 text-[11px]">Pati makanan dihidrolisis menjadi D-glukosa bebas di usus halus dan diserap masuk vena porta.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-start gap-2 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-900 font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-stone-900">Kadar Glukosa Darah Naik:</strong>
                  <p className="text-stone-600 text-[11px]">Konsentrasi glukosa melebihi ambang batas basal (&gt;110 mg/dL), mengaktifkan sensor glukokinase di sel beta pankreas.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-start gap-2 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-stone-900">Lonjakan Insulin Sistemik:</strong>
                  <p className="text-stone-600 text-[11px]">Vesikel insulin dieksositosis ke peredaran darah, menginstruksikan jaringan tubuh untuk menyerap glukosa.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ANALYSIS':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 4 • Analisis Kelompok</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                4 Pertanyaan Diskusi Terarah
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Tuliskan penalaran ilmiah kelompok Anda secara ringkas pada 4 kolom berikut:
              </p>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {GUIDING_QUESTIONS.map((q) => {
                const currentVal = formData[q.key] as string;
                const showHint = activeHintKey === q.key;

                return (
                  <div key={q.key} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
                    <div className="flex items-start justify-between gap-1">
                      <label className="font-bold text-stone-800 leading-snug">
                        {q.label}
                      </label>
                      <button
                        type="button"
                        onClick={() => setActiveHintKey(showHint ? null : q.key)}
                        className="text-[10px] font-semibold text-amber-800 hover:text-amber-900 shrink-0 cursor-pointer"
                      >
                        {showHint ? 'Tutup' : 'Petunjuk'}
                      </button>
                    </div>

                    {showHint && (
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                        {q.hint}
                      </div>
                    )}

                    <textarea
                      rows={2}
                      value={currentVal}
                      onChange={(e) => handleTextChange(q.key, e.target.value)}
                      placeholder={q.placeholder}
                      className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'FEEDBACK':
        return (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono">Layar 5 • Konfirmasi & Simpan</span>
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base mt-0.5">
                Hipotesis Kelompok Siap Diuji
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Prediksi awal dan analisis kelompok telah terekam. Anda akan menguji hipotesis ini langkah demi langkah melalui Peta Organ dan Misi Molekuler.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-2">
              <span className="font-bold text-amber-950 block">Ringkasan Hipotesis Kelompok:</span>
              <p className="text-stone-700">
                Pilihan Kasus: <strong>{PREDICTION_OPTIONS.find(o => o.id === formData.casePrediction)?.label || 'Belum dipilih'}</strong>
              </p>
              <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 text-amber-200 hover:bg-stone-800 font-bold text-xs cursor-pointer shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Data Hipotesis</span>
                </button>
                {saveFeedback && (
                  <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Tersimpan!</span>
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Modul Pengayaan: Konsep Anabolisme</span>
                <button
                  type="button"
                  onClick={() => setShowConceptModal(!showConceptModal)}
                  className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
                >
                  {showConceptModal ? 'Tutup Klasifikasi' : 'Buka Klasifikasi Reaksi'}
                </button>
              </div>
              {showConceptModal && (
                <div className="pt-2">
                  <InteractiveAnabolismConcept />
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" id="lkm-section-a">
      {/* Header Bagian A */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4 text-amber-700" />
          <span>Bagian A • Aktivitas Diskusi Kelompok Asal</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Pemantik: Mengapa Tubuh Menabung Energi? (Kasus Carbo-Loading Atlet)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Sebelum menelaah reaksi kimia molekuler, rumuskan hipotesis awal bersama kelompok Anda melalui alur progresif 
          <strong> Prediksi → Manipulasi → Amati → Analisis → Umpan Balik</strong>.
        </p>
      </div>

      {/* Progressive 2-Column Activity Layout */}
      <LKMProgressiveActivityLayout
        title="Pemantik Kasus Carbo-Loading: Regulasi Glukosa Darah & Penyimpanan"
        badge="Bagian A • 5 Tahap Progresif"
        currentPhase={phase}
        onPhaseChange={setPhase}
        visualContent={renderVisualContent()}
        controlContent={renderControlContent()}
        score={formData.isSubmitted ? 100 : 80}
        canProceedToNext={true}
        explanation="Setelah mengonsumsi makanan tinggi karbohidrat, peningkatan glukosa darah merangsang sekresi insulin dari sel beta pankreas. Glukosa tidak dibiarkan mengalir bebas dalam jumlah besar karena dapat meningkatkan osmolaritas plasma dan memicu dehidrasi seluler. Sebagai gantinya, glukosa disimpan secara efisien dalam bentuk polimer bercabang berbobot molekul tinggi: glikogen di hepar dan otot rangka."
        isCorrect={formData.casePrediction === 3}
      />

      {/* Navigasi Lanjut ke Bagian B */}
      <div className="flex items-center justify-end pt-2 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={() => {
            handleSubmit();
            onNext();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-b"
        >
          <span>Lanjut ke Bagian B: Peta Organ Tujuan Glukosa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
