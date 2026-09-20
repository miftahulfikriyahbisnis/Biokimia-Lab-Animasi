/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

const CORRECT_ORDER = [
  { id: 'glukosa', name: '1. Glukosa', compartment: 'Sitosol' },
  { id: 'piruvat', name: '2. Piruvat', compartment: 'Sitosol → Mitokondria' },
  { id: 'asetil_koa_mito', name: '3. Asetil-KoA', compartment: 'Matriks Mitokondria' },
  { id: 'sitrat', name: '4. Sitrat (Shuttle Menembus Membran)', compartment: 'Mitokondria → Sitosol' },
  { id: 'malonil_koa', name: '5. Malonil-KoA', compartment: 'Sitosol' },
  { id: 'asam_lemak', name: '6. Asam Lemak (Palmitat)', compartment: 'Sitosol (Kompleks FAS)' },
  { id: 'tag', name: '7. Triasilgliserol (TAG)', compartment: 'Retikulum Endoplasma / Adiposit' }
];

export const InteractiveLipogenesisCitrateShuttle: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Asetil-KoA yang dihasilkan di dalam mitokondria tidak dapat langsung menembus membran mitokondria bagian dalam ke sitosol.',
    'Asetil-KoA harus berkondensasi dengan oksaloasetat membentuk Sitrat, yang kemudian keluar ke sitosol melalui Citrate Shuttle.',
    'Urutan jalur lipogenesis: Glukosa → Piruvat → Asetil-KoA (mito) → Sitrat (keluar ke sitosol) → Malonil-KoA → Asam Lemak → Triasilgliserol.'
  ];

  const handleAddStep = (id: string) => {
    if (!userSequence.includes(id)) {
      setUserSequence(prev => [...prev, id]);
      setPhase('MANIPULATION');
    }
  };

  const handleRemoveStep = (id: string) => {
    setUserSequence(prev => prev.filter(item => item !== id));
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');

    const isMatch = userSequence.length === CORRECT_ORDER.length &&
      userSequence.every((id, idx) => id === CORRECT_ORDER[idx].id);

    setIsCorrect(isMatch);
    if (!isMatch) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setUserSequence([]);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Aktivitas Interaktif 10: Perakitan Jalur Lipogenesis & Citrate Shuttle"
        instruction="Ketika cadangan glikogen hati jenuh, kelebihan glukosa dialihkan ke lipogenesis. Susunlah 7 tahapan jalur sintesis triasilgliserol secara berurutan dan perhatikan perpindahan molekul antara mitokondria dan sitosol!"
        hints={hints}
        currentHintIndex={hintIndex}
        onShowNextHint={() => {
          setHintIndex(prev => Math.min(hints.length, prev + 1));
          setScore(prev => Math.max(30, prev - 10));
        }}
        onCheckAnswer={handleCheck}
        onReset={handleReset}
        onShowExplanation={() => {}}
        isAnswerChecked={isAnswerChecked}
        isCorrect={isCorrect}
        score={score}
        maxScore={100}
        canCheck={userSequence.length === CORRECT_ORDER.length}
        explanation="Ketika kapasitas penyimpanan glikogen tercapai, insulin mengaktifkan enzim piruvat dehidrogenase dan asetil-KoA karboksilase (ACC). Glukosa dipecah menjadi piruvat di sitosol, masuk ke matriks mitokondria, dan dioksidasi menjadi asetil-KoA. Karena membran dalam mitokondria impermeabel terhadap asetil-KoA, molekul ini berkondensasi dengan oksaloasetat membentuk Sitrat. Sitrat keluar ke sitosol melalui transporter trikarboksilat (Citrate Shuttle), di mana enzim ATP-sitrat liase memecahnya kembali menjadi asetil-KoA dan oksaloasetat. Asetil-KoA sitosol dikarboksilasi menjadi Malonil-KoA oleh ACC (tahap penentu laju), lalu dipolimerisasi oleh kompleks Fatty Acid Synthase (FAS) menggunakan donor elektron NADPH hingga membentuk asam lemak (palmitat). Akhirnya, asam lemak diesterifikasi menjadi triasilgliserol (TAG) dan dikirim ke jaringan adiposa via lipoprotein VLDL."
      />

      {/* 1. BANK KARTU TAHAPAN (ACAK / TERSEDIA) */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-900 uppercase">
            Pilihan Tahapan Lipogenesis (Ketuk untuk Menambahkan ke Urutan):
          </span>
          <span className="text-[10px] text-stone-500 font-mono">
            {userSequence.length} / 7 Tahap Dipilih
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {CORRECT_ORDER.map(item => {
            const isUsed = userSequence.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleAddStep(item.id)}
                disabled={isUsed}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isUsed
                    ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                    : 'bg-[#FAF8F5] hover:bg-amber-50 text-stone-800 border-stone-300 hover:border-amber-400 shadow-2xs'
                }`}
              >
                <div className="text-xs font-bold font-mono">{item.name.replace(/^\d+\.\s*/, '')}</div>
                <div className="text-[9px] text-stone-500 mt-1 truncate">{item.compartment}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. AREA ALIRAN KOMPARTEMEN (SITOSOL & MITOKONDRIA) */}
      <div className="bg-[#FAF8F5] border border-[#E5E2D9] rounded-2xl p-5 space-y-4">
        <div className="text-xs font-serif font-bold text-stone-800 text-center">
          Papan Rantai Alur Jalur Lipogenesis Terpadu:
        </div>

        {/* Kotak Alur Interaktif */}
        <div className="min-h-[140px] p-4 bg-white rounded-xl border border-stone-200 flex flex-wrap items-center justify-center gap-2">
          {userSequence.length === 0 ? (
            <div className="text-xs text-stone-400 italic">
              Rantai masih kosong. Ketuk tahapan di atas mulai dari molekul prekursor pertama (Glukosa).
            </div>
          ) : (
            userSequence.map((id, idx) => {
              const item = CORRECT_ORDER.find(c => c.id === id)!;
              const isChecked = isAnswerChecked;
              const isPositionRight = CORRECT_ORDER[idx].id === id;

              return (
                <div key={id} className="flex items-center gap-2">
                  <div className={`p-2.5 rounded-xl border flex flex-col items-center justify-center min-w-[120px] transition-all relative ${
                    isChecked
                      ? isPositionRight
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-red-50 border-red-400 text-red-950 font-bold'
                      : 'bg-[#FAF8F5] border-stone-300 text-stone-800 shadow-2xs'
                  }`}>
                    <span className="text-[10px] font-mono text-stone-500">Langkah #{idx + 1}</span>
                    <span className="text-xs font-bold">{item.name.replace(/^\d+\.\s*/, '')}</span>
                    <span className="text-[9px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded mt-0.5">
                      {item.compartment}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveStep(id)}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-stone-200 hover:bg-red-500 text-stone-600 hover:text-white text-[10px] flex items-center justify-center cursor-pointer"
                      title="Hapus langkah"
                    >
                      ✕
                    </button>
                  </div>

                  {idx < userSequence.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Penjelasan Khusus Citrate Shuttle */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-stone-700 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950">Inti Mekanisme Citrate Shuttle: </span>
            Asetil-KoA di mitokondria tidak memiliki transporter membran langsung. Reaksi Sitrat Sintase menggabungkan Asetil-KoA (2C) dengan Oksaloasetat (4C) menjadi Sitrat (6C), yang leluasa keluar menembus membran dalam ke sitosol untuk sintesis asam lemak.
          </div>
        </div>
      </div>
    </div>
  );
};
