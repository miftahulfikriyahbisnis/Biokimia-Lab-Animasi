/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Utensils, 
  Activity, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  HeartPulse,
  TrendingUp,
  Flame,
  Layers,
  ImageOff
} from 'lucide-react';

interface CarboLoadingIllustrationProps {
  intakeLevel?: number; // 1: Basal (85mg/dL), 2: Normal (120mg/dL), 3: Carbo-loading (175mg/dL)
  onIntakeChange?: (level: number) => void;
  interactive?: boolean;
}

export const CarboLoadingIllustration: React.FC<CarboLoadingIllustrationProps> = ({
  intakeLevel = 3,
  onIntakeChange,
  interactive = true,
}) => {
  const [internalLevel, setInternalLevel] = useState<number>(intakeLevel);
  const [imgError, setImgError] = useState<boolean>(false);
  const [activePathway, setActivePathway] = useState<'HEPAR' | 'OTOT' | 'ADIPOSA' | null>('HEPAR');

  const currentLevel = onIntakeChange ? intakeLevel : internalLevel;

  const handleLevelChange = (lvl: number) => {
    setInternalLevel(lvl);
    if (onIntakeChange) {
      onIntakeChange(lvl);
    }
  };

  // State metrics sesuai intake karbohidrat
  const metrics = {
    1: { 
      label: 'Kondisi Basal (Puasa Singkat)', 
      bg: 85, 
      insulinText: 'Rendah (8-12 μIU/mL)', 
      insulinLevel: 'LOW',
      status: 'Pemecahan glikogen basal', 
      dotCount: 4 
    },
    2: { 
      label: 'Pasca-Makan Normal', 
      bg: 120, 
      insulinText: 'Sedang (30-45 μIU/mL)', 
      insulinLevel: 'MEDIUM',
      status: 'Kebutuhan seluler terpenuhi', 
      dotCount: 8 
    },
    3: { 
      label: 'Carbo-Loading Ekstrem', 
      bg: 175, 
      insulinText: 'Tinggi (80+ μIU/mL)', 
      insulinLevel: 'HIGH',
      status: 'Surplus Glukosa! Sintesis cadangan makromolekul dipicu secara masif', 
      dotCount: 16 
    },
  }[currentLevel as 1 | 2 | 3] || { 
    label: 'Carbo-Loading', 
    bg: 175, 
    insulinText: 'Tinggi (80+ μIU/mL)', 
    insulinLevel: 'HIGH',
    status: 'Surplus', 
    dotCount: 16 
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 select-none">
      
      {/* 1. Indikator Rantai Peristiwa Fisiologis Berurutan */}
      <div className="w-full max-w-xl mb-3 bg-white/95 backdrop-blur-xs rounded-xl border border-stone-200 p-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-stone-700">
          
          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900 mb-1">
              <Utensils className="w-3.5 h-3.5" />
            </span>
            <span className="text-[9px] text-stone-500 font-mono">1. Asupan</span>
            <span className="font-bold text-amber-950 text-[10.5px] leading-tight">Tinggi Karbohidrat</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />

          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-red-100 text-red-900 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <span className="text-[9px] text-stone-500 font-mono">2. Glukosa Darah</span>
            <span className="font-bold text-red-950 text-[10.5px] leading-tight">{metrics.bg} mg/dL ↑</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />

          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900 mb-1">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <span className="text-[9px] text-stone-500 font-mono">3. Insulin</span>
            <span className="font-bold text-blue-950 text-[10.5px] leading-tight">Sekresi Sel Beta ↑</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />

          <div className="flex flex-col items-center text-center flex-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-900 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span className="text-[9px] text-stone-500 font-mono">4. Distribusi</span>
            <span className="font-bold text-emerald-950 text-[10.5px] leading-tight">Hati, Otot, Lemak</span>
          </div>

        </div>
      </div>

      {/* 2. Visual Panel: Gambar Atlet + Overlay Interaktif */}
      <div className="w-full max-w-xl relative bg-white rounded-2xl border border-stone-200 shadow-xs p-3 overflow-hidden">
        
        {/* Kontainer Gambar Atlet Referensi Pengguna */}
        <div className="relative w-full rounded-xl overflow-hidden bg-[#FAF8F5] border border-stone-200 min-h-[260px] flex items-center justify-center">
          
          {/* USER-PROVIDED REFERENCE ASSET — DO NOT REPLACE */}
          {!imgError ? (
            <img 
              src="/images/carbohydrate/atlet-carbo-loading.png"
              alt="Atlet Carbo-Loading - Aset Referensi"
              onError={() => setImgError(true)}
              className="w-full h-auto max-h-[340px] object-contain"
            />
          ) : (
            <div className="w-full flex flex-col items-center justify-center p-6 text-center bg-stone-100/90 min-h-[260px]">
              <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-2.5 text-stone-500">
                <ImageOff className="w-6 h-6" />
              </div>
              <p className="font-bold text-stone-800 text-xs sm:text-sm">
                Gambar referensi belum berhasil dimuat.
              </p>
              <p className="text-[11px] text-stone-500 font-mono mt-1">
                Lokasi file: /images/carbohydrate/atlet-carbo-loading.png
              </p>
              <p className="text-[10px] text-stone-400 mt-2 max-w-sm leading-relaxed">
                Silakan pastikan file atlet carbo-loading telah diunggah. Sesuai instruksi, sistem tidak menggambar siluet manusia pengganti.
              </p>
            </div>
          )}

          {/* OVERLAY INTERAKTIF DI ATAS GAMBAR */}
          <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
            
            {/* Bagian Atas Overlay: Makanan Tinggi Karbohidrat & Glukosa Darah */}
            <div className="flex items-start justify-between gap-2 pointer-events-auto">
              
              {/* Ikon Makanan Tinggi Karbohidrat */}
              <div className="p-2 rounded-xl bg-amber-900/85 backdrop-blur-xs text-white border border-amber-500/40 shadow-sm max-w-[170px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Utensils className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wide">
                    Makanan Tinggi Karbohidrat
                  </span>
                </div>
                <div className="text-[11px] text-amber-100 font-semibold leading-tight">
                  Pasta, Nasi, & Pati Kompleks
                </div>
                <div className="text-[9px] text-amber-200/80 mt-0.5">
                  Dipecah menjadi D-Glukosa di lumen usus
                </div>
              </div>

              {/* Indikator Glukosa Darah & Insulin Meningkat */}
              <div className="flex flex-col gap-1.5 items-end">
                {/* Indikator Glukosa Darah */}
                <div className="px-2.5 py-1.5 rounded-xl bg-red-900/85 backdrop-blur-xs text-white border border-red-500/40 shadow-sm flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-red-300 animate-pulse shrink-0" />
                  <div className="text-right">
                    <span className="text-[9px] text-red-200 block font-mono">Glukosa Darah</span>
                    <span className="text-xs font-bold text-red-100">{metrics.bg} mg/dL (Hiperglikemia Ringan)</span>
                  </div>
                </div>

                {/* Indikator Insulin Meningkat */}
                <div className="px-2.5 py-1.5 rounded-xl bg-blue-900/85 backdrop-blur-xs text-white border border-blue-500/40 shadow-sm flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                  <div className="text-right">
                    <span className="text-[9px] text-blue-200 block font-mono">Insulin Pankreas</span>
                    <span className="text-xs font-bold text-blue-100">{metrics.insulinText}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bagian Bawah Overlay: Tiga Arah Menuju Hati, Otot, dan Jaringan Adiposa */}
            <div className="pointer-events-auto bg-stone-900/90 backdrop-blur-md rounded-xl border border-stone-700/80 p-2.5 text-white shadow-md">
              <div className="flex items-center justify-between text-[10px] font-bold text-stone-300 uppercase tracking-wider mb-2">
                <span>Distribusi Nasib Glukosa (Pilih Target Organ):</span>
                <span className="text-amber-400 font-mono">Respon Anabolik Insulin</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Arah 1: Hati */}
                <button
                  type="button"
                  onClick={() => setActivePathway('HEPAR')}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                    activePathway === 'HEPAR'
                      ? 'bg-red-950 border-red-400 text-red-100 ring-2 ring-red-400/50'
                      : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-300">1. Hati (Hepar)</span>
                    <ArrowRight className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-[9.5px] text-stone-300 block mt-0.5 leading-tight">
                    Glikogenesis Sistemik (~100g)
                  </span>
                </button>

                {/* Arah 2: Otot Rangka */}
                <button
                  type="button"
                  onClick={() => setActivePathway('OTOT')}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                    activePathway === 'OTOT'
                      ? 'bg-amber-950 border-amber-400 text-amber-100 ring-2 ring-amber-400/50'
                      : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-300">2. Otot Rangka</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                  </div>
                  <span className="text-[9.5px] text-stone-300 block mt-0.5 leading-tight">
                    Glikogenesis Miosit (~400g)
                  </span>
                </button>

                {/* Arah 3: Jaringan Adiposa */}
                <button
                  type="button"
                  onClick={() => setActivePathway('ADIPOSA')}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                    activePathway === 'ADIPOSA'
                      ? 'bg-yellow-950 border-yellow-400 text-yellow-100 ring-2 ring-yellow-400/50'
                      : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-yellow-300">3. Adiposa</span>
                    <ArrowRight className="w-3 h-3 text-yellow-400" />
                  </div>
                  <span className="text-[9.5px] text-stone-300 block mt-0.5 leading-tight">
                    Lipogenesis (Cadangan TAG)
                  </span>
                </button>
              </div>

              {/* Rincian Jalur Aktif Terpilih */}
              <div className="mt-2 pt-2 border-t border-stone-800 text-[10.5px] text-stone-200">
                {activePathway === 'HEPAR' && (
                  <p>
                    <strong className="text-red-400 font-semibold">Hepar: </strong>
                    Glukosa masuk melalui GLUT2 independen-insulin, difosforilasi oleh <em>glukokinase</em> ber-Km tinggi, lalu diubah menjadi glikogen hepar untuk menstabilkan glukosa darah sistemik saat jeda makan.
                  </p>
                )}
                {activePathway === 'OTOT' && (
                  <p>
                    <strong className="text-amber-400 font-semibold">Otot Rangka: </strong>
                    Insulin memicu translokasi vesikel GLUT4 ke membran miosit. Glukosa difosforilasi oleh <em>heksokinase</em> dan disimpan sebagai glikogen otot khusus untuk kontraksi lari maraton.
                  </p>
                )}
                {activePathway === 'ADIPOSA' && (
                  <p>
                    <strong className="text-yellow-400 font-semibold">Jaringan Adiposa: </strong>
                    Kelebihan glukosa melampaui kapasitas simpan glikogen dialirkan ke jalur glikolisis → piruvat → asetil-KoA → sintesis asam lemak & esterifikasi gliserol-3-P menjadi triasilgliserol (TAG).
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* 3. Slider Interaktif Tingkat Asupan Karbohidrat */}
        {interactive && (
          <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>Simulasi Tingkat Asupan Karbohidrat:</span>
              </span>
              <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                {metrics.label}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[
                { lvl: 1, name: 'Basal (85 mg/dL)' },
                { lvl: 2, name: 'Normal (120 mg/dL)' },
                { lvl: 3, name: 'Carbo-Loading (175 mg/dL)' },
              ].map(({ lvl, name }) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleLevelChange(lvl)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentLevel === lvl
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-stone-500 text-center">
              Geser atau pilih tingkat asupan untuk mengamati peningkatan proporsional glukosa darah dan sekresi insulin.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
