/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sun, 
  Moon, 
  Activity, 
  Zap, 
  Heart, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { PHYSIOLOGICAL_CONDITIONS, ORGAN_SPECIFIC_ROLES } from '../../data/carbohydrateData';

interface CarbohydrateIntegrationProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export const CarbohydrateIntegration: React.FC<CarbohydrateIntegrationProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  const [selectedCondition, setSelectedCondition] = useState<string>(PHYSIOLOGICAL_CONDITIONS[0].id);

  const activeConditionData = PHYSIOLOGICAL_CONDITIONS.find(c => c.id === selectedCondition) || PHYSIOLOGICAL_CONDITIONS[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Bar Atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800">
          <Layers className="w-3.5 h-3.5 text-purple-600" />
          <span>Tahap 5: Ke Mana Glukosa Pergi? (Integrasi)</span>
        </div>
      </div>

      {/* Header Judul */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
          Integrasi Fisiologis: Ke Mana Glukosa Dialirkan?
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-3xl leading-relaxed">
          Sintesis komprehensif perjalanan glukosa berdasarkan 4 status fisiologis tubuh manusia serta pembagian peran metabolik organ-organ kunci (otak, eritrosit, hati, otot, dan jantung).
        </p>
      </div>

      {/* Selector 4 Kondisi Fisiologis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PHYSIOLOGICAL_CONDITIONS.map((cond) => {
          const isSelected = selectedCondition === cond.id;
          return (
            <button
              key={cond.id}
              onClick={() => setSelectedCondition(cond.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-white border-[#6B705C] ring-2 ring-[#6B705C]/30 shadow-md'
                  : 'bg-[#FAF8F5] border-[#E5E2D9] hover:bg-white text-[#706B5C]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  cond.id === 'fed' ? 'bg-emerald-100 text-emerald-800' :
                  cond.id === 'fasting' ? 'bg-amber-100 text-amber-800' :
                  cond.id === 'exercise' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  Hormon: {cond.hormoneDominance}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-[#3E3E3E]">
                {cond.name}
              </h3>
              <p className="text-[11px] text-[#A5A58D] line-clamp-2">
                {cond.glucoseStatus}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail Kondisi Terpilih */}
      <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E2D9] pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B705C] block">
              Detail Kondisi Fisiologis
            </span>
            <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">
              {activeConditionData.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-[#F5F2EA] text-[#706B5C] border border-[#E5E2D9]">
              Status Glukosa: <strong>{activeConditionData.glucoseStatus}</strong>
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
              Hormon Kunci: <strong>{activeConditionData.hormoneDominance}</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jalur yang Aktif */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Jalur-Jalur Biokimia yang Diaktifkan
            </h4>
            <div className="space-y-2">
              {activeConditionData.activePathways.map((path, i) => (
                <div key={i} className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs">
                  <span className="font-bold text-emerald-950 block">{path.pathway} ({path.organ})</span>
                  <p className="text-emerald-800 text-[11px] mt-0.5">{path.mechanism}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Jalur yang Ditekan & Resiko Fisiologis */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Jalur-Jalur yang Ditekan (Inaktif)
              </h4>
              <div className="p-3 rounded-2xl bg-red-50/60 border border-red-200/60 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {activeConditionData.inhibitedPathways.map((inh, i) => (
                    <span key={i} className="px-2 py-1 rounded-lg bg-white border border-red-200 text-red-800 font-medium text-[11px]">
                      {inh}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1.5 text-xs">
              <span className="font-bold text-[#3E3E3E] block">Ringkasan Aliran Metabolik:</span>
              <p className="text-[#706B5C] leading-relaxed text-[11px]">
                {activeConditionData.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pembagian Peran Organ Kunci */}
      <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-4 shadow-xs">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-base text-[#3E3E3E] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Karakteristik Spesifik Organ Tubuh Manusia</span>
          </h3>
          <p className="text-xs text-[#A5A58D]">
            Setiap organ memiliki prioritas pemanfaatan glukosa dan enzim yang berbeda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ORGAN_SPECIFIC_ROLES.map((org, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#3E3E3E] text-sm">{org.organ}</span>
                <span className="text-[10px] font-semibold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                  {org.fuelPreference}
                </span>
              </div>
              <div className="text-[11px] text-gray-600">
                <span className="font-semibold text-gray-800">Transporter: </span>
                {org.transporter}
              </div>
              <p className="text-[11px] text-[#706B5C] leading-relaxed pt-1 border-t border-[#E5E2D9]">
                {org.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigasi Lanjut ke Post-Test */}
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
          <span>Tandai Selesai & Lanjut: Evaluasi Post-Test Mandiri</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
