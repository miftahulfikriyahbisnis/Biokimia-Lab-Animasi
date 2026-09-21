/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  Activity, 
  Layers, 
  Flame, 
  ShieldCheck,
  CheckCircle2,
  Info,
  Maximize2,
  ImageOff
} from 'lucide-react';

export type OrganKey = 'PANCREAS' | 'LIVER' | 'MUSCLE' | 'ADIPOSE';

interface HumanOrganFateMapSVGProps {
  selectedOrgan: OrganKey;
  onSelectOrgan: (organ: OrganKey) => void;
  exploredOrgans: Record<OrganKey, boolean>;
}

export const HumanOrganFateMapSVG: React.FC<HumanOrganFateMapSVGProps> = ({
  selectedOrgan,
  onSelectOrgan,
  exploredOrgans,
}) => {
  const [imgError, setImgError] = useState<boolean>(false);

  // Koordinat hotspot transparan di atas gambar tubuh dan organ
  const HOTSPOTS: Record<OrganKey, { 
    name: string; 
    tag: string; 
    top: string; 
    left: string; 
    width: string; 
    height: string;
    pulseColor: string;
  }> = {
    PANCREAS: {
      name: 'Pankreas',
      tag: 'Sensor Glukosa & Sekresi Insulin',
      top: '42%',
      left: '46%',
      width: '18%',
      height: '10%',
      pulseColor: 'border-blue-400 bg-blue-500/20 ring-blue-400'
    },
    LIVER: {
      name: 'Hati (Hepar)',
      tag: 'Pusat Glikogen Sistemik (Buffer Darah)',
      top: '36%',
      left: '32%',
      width: '24%',
      height: '13%',
      pulseColor: 'border-red-400 bg-red-500/20 ring-red-400'
    },
    MUSCLE: {
      name: 'Otot Rangka',
      tag: 'Glikogen Tertutup (Bahan Bakar Kontraksi)',
      top: '60%',
      left: '20%',
      width: '26%',
      height: '24%',
      pulseColor: 'border-amber-400 bg-amber-500/20 ring-amber-400'
    },
    ADIPOSE: {
      name: 'Jaringan Adiposa',
      tag: 'Lipogenesis & Penyimpanan Triasilgliserol (TAG)',
      top: '48%',
      left: '52%',
      width: '22%',
      height: '14%',
      pulseColor: 'border-yellow-400 bg-yellow-500/20 ring-yellow-400'
    }
  };

  // Data biokimia untuk panel penjelasan di sisi kanan
  const ORGAN_DETAILS: Record<OrganKey, {
    title: string;
    transporter: string;
    enzyme: string;
    kmValue: string;
    anabolicFate: string;
    insulinResponse: string;
    glucoseRelease: string;
  }> = {
    PANCREAS: {
      title: 'Pankreas (Sel Beta Pulau Langerhans)',
      transporter: 'GLUT2 (Km ~15-20 mM, afinitas rendah, kapasitas tinggi)',
      enzyme: 'Glukokinase (Heksokinase IV) sebagai sensor glukosa seluler',
      kmValue: 'Km tinggi (~10 mM), tidak dihambat oleh G6P',
      anabolicFate: 'Memicu sintesis dan eksositosis vesikel hormon INSULIN ke sirkulasi porta',
      insulinResponse: 'Meningkatkan rasio ATP/ADP intraseluler → menutup kanal K_ATP → depolarisasi membran → influks Ca²⁺ → eksositosis insulin',
      glucoseRelease: 'Tidak melepaskan glukosa (berfungsi sebagai master kelenjar endokrin pengatur anabolisme)'
    },
    LIVER: {
      title: 'Hati / Hepar (Pusat Pengatur Glikemia Sistemik)',
      transporter: 'GLUT2 (Dua arah / bidirectional, independen insulin)',
      enzyme: 'Glukokinase (Heksokinase IV) aktif saat glukosa darah tinggi',
      kmValue: 'Km tinggi (~10 mM), kurva sigmoidal kooperatif',
      anabolicFate: 'Sintesis Glikogen Hati (~100 gram, ~10% bobot basah hepar) sebagai cadangan glukosa sistemik',
      insulinResponse: 'Mengaktifkan Fosfoprotein Fosfatase-1 (PP1) → defosforilasi & mengaktifkan Glikogen Sintase',
      glucoseRelease: 'DAPAT MELEPASKAN GLUKOSA ke darah karena memiliki enzim GLUKOSA-6-FOSFATASE di lumen RE'
    },
    MUSCLE: {
      title: 'Otot Rangka (Miosit Penggerak Tubuh)',
      transporter: 'GLUT4 (Dependen insulin, translokasi vesikel ke sarkolema)',
      enzyme: 'Heksokinase II (Km sangat rendah ~0.1 mM, afinitas sangat tinggi)',
      kmValue: 'Dihambat kuat oleh produknya sendiri (Glukosa-6-Fosfat)',
      anabolicFate: 'Sintesis Glikogen Otot (~400 gram, cadangan energi internal eksklusif kontraksi)',
      insulinResponse: 'Insulin mengikat reseptor RTK → kaskade IRS-1/PI3K/Akt → translokasi GLUT4 ke membran',
      glucoseRelease: 'TIDAK DAPAT MELEPASKAN GLUKOSA ke darah (tidak memiliki enzim Glukosa-6-Fosfatase). G6P wajib masuk glikolisis internal'
    },
    ADIPOSE: {
      title: 'Jaringan Adiposa (Penyimpanan Cadangan Lemak)',
      transporter: 'GLUT4 (Dependen insulin, translokasi vesikel intraseluler)',
      enzyme: 'Heksokinase I & II',
      kmValue: 'Km rendah, afinitas tinggi',
      anabolicFate: 'Lipogenesis: Glukosa → G3P (tulang punggung gliserol) + Asetil-KoA → Asam Lemak → Triasilgliserol (TAG)',
      insulinResponse: 'Menstimulasi penyerapan glukosa dan mengaktifkan Lipoprotein Lipase (LPL) serta menghambat Lipase Sensitif Hormon (HSL)',
      glucoseRelease: 'Tidak melepaskan glukosa (melepaskan asam lemak bebas dan gliserol hanya saat lapar/puasa)'
    }
  };

  const selectedData = ORGAN_DETAILS[selectedOrgan];

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-3 select-none">
      
      {/* 4 Organ Selector Badges */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
        {(['PANCREAS', 'LIVER', 'MUSCLE', 'ADIPOSE'] as OrganKey[]).map((org) => {
          const isSelected = selectedOrgan === org;
          const isExplored = exploredOrgans[org];
          const conf = HOTSPOTS[org];

          return (
            <button
              key={org}
              type="button"
              onClick={() => onSelectOrgan(org)}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'bg-stone-900 text-amber-300 border-stone-800 shadow-xs ring-2 ring-amber-400/60' 
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold truncate">{conf.name}</span>
                {isExplored && (
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-emerald-600'}`} />
                )}
              </div>
              <span className={`text-[9.5px] truncate mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                {conf.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kanvas Dua Tampilan: Peta Anatomi Dasar (Kiri) + Panel Penjelasan Biokimia (Kanan) */}
      <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-xs p-3 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* SISI 1: Peta Tubuh Manusia Interaktif Berbasis Aset Referensi Pengguna (md:col-span-5) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-2 bg-[#FAF8F5] rounded-xl border border-stone-200 relative">
            <div className="w-full flex items-center justify-between mb-1 px-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider font-mono">
                Peta Organ (Ketuk Hotspot)
              </span>
              <span className="text-[9px] text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded font-bold">
                Aset Referensi Pengguna
              </span>
            </div>

            {/* Kontainer Gambar Tubuh & Organ */}
            <div className="relative w-full max-w-[240px] aspect-[2/3] rounded-lg overflow-hidden bg-white border border-stone-200 flex items-center justify-center">
              
              {/* USER-PROVIDED REFERENCE ASSET — DO NOT REPLACE */}
              {!imgError ? (
                <img
                  src="/images/carbohydrate/peta-organ-tubuh.png"
                  alt="Peta Organ Tubuh dan Nasib Glukosa - Aset Referensi"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-stone-100">
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center mb-2 text-stone-500">
                    <ImageOff className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-stone-800 text-[11px] leading-tight">
                    Gambar referensi belum berhasil dimuat.
                  </p>
                  <p className="text-[9px] text-stone-500 font-mono mt-1">
                    /images/carbohydrate/peta-organ-tubuh.png
                  </p>
                  <p className="text-[8.5px] text-stone-400 mt-1 max-w-[180px]">
                    Hotspot interaktif tetap aktif pada koordinat organ anatomi di bawah ini.
                  </p>
                </div>
              )}

              {/* OVERLAY HOTSPOT TRANSPARAN DI ATAS GAMBAR DASAR */}
              <div className="absolute inset-0 pointer-events-none">
                {(['PANCREAS', 'LIVER', 'MUSCLE', 'ADIPOSE'] as OrganKey[]).map((org) => {
                  const conf = HOTSPOTS[org];
                  const isSelected = selectedOrgan === org;

                  return (
                    <button
                      key={org}
                      type="button"
                      onClick={() => onSelectOrgan(org)}
                      title={`Klik untuk melihat jalur metabolik ${conf.name}`}
                      style={{
                        top: conf.top,
                        left: conf.left,
                        width: conf.width,
                        height: conf.height,
                      }}
                      className={`absolute rounded-xl transition-all cursor-pointer pointer-events-auto border-2 flex items-center justify-center ${
                        isSelected
                          ? `${conf.pulseColor} ring-4 ring-offset-1 scale-105 shadow-md`
                          : 'border-dashed border-stone-400/60 bg-stone-500/10 hover:bg-stone-500/25'
                      }`}
                    >
                      <span className={`text-[8px] font-bold px-1 py-0.5 rounded shadow-2xs ${
                        isSelected ? 'bg-stone-950 text-amber-300' : 'bg-white/80 text-stone-800'
                      }`}>
                        {conf.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ANIMASI OVERLAY ALIRAN GLUKOSA & INSULIN */}
              <div className="absolute inset-x-0 bottom-1 p-1 bg-stone-900/85 backdrop-blur-xs text-white rounded text-[8.5px] text-center pointer-events-none">
                <span className="text-amber-300 font-bold">Aliran Glukosa & Insulin: </span>
                <span className="animate-pulse">Menuju {HOTSPOTS[selectedOrgan].name}</span>
              </div>

            </div>

            <p className="text-[9.5px] text-stone-500 text-center mt-2">
              Gambar dasar tidak diubah atau digambar ulang. Ketuk hotspot untuk menyorot organ.
            </p>
          </div>

          {/* SISI 2: Panel Penjelasan Biokimia Mendalam di Sebelah Kanan (md:col-span-7) */}
          <div className="md:col-span-7 flex flex-col justify-between p-3 bg-stone-50/80 rounded-xl border border-stone-200 min-h-[340px]">
            <div>
              {/* Header Organ Terpilih */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-900 uppercase">
                    Detail Fisiologis & Jalur Anabolik
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base mt-0.5 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span>{selectedData.title}</span>
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {HOTSPOTS[selectedOrgan].tag}
                </span>
              </div>

              {/* Karakteristik Transporter & Enzim */}
              <div className="space-y-2 text-xs">
                
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-[10px] font-bold text-blue-900 uppercase font-mono block">
                    1. Transporter Glukosa (GLUT)
                  </span>
                  <p className="text-stone-800 text-[11px] font-semibold mt-0.5">
                    {selectedData.transporter}
                  </p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-[10px] font-bold text-amber-900 uppercase font-mono block">
                    2. Enzim Fosforilasi Pertama & Afinitas Substrat
                  </span>
                  <p className="text-stone-800 text-[11px] font-semibold mt-0.5">
                    {selectedData.enzyme}
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Karakteristik Kinetika: {selectedData.kmValue}
                  </p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase font-mono block">
                    3. Respon Terhadap Stimulasi Insulin
                  </span>
                  <p className="text-stone-700 text-[10.5px] leading-relaxed mt-0.5">
                    {selectedData.insulinResponse}
                  </p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-[10px] font-bold text-purple-900 uppercase font-mono block">
                    4. Nasib Anabolik Utama & Bentuk Penyimpanan
                  </span>
                  <p className="text-stone-800 text-[11px] font-semibold mt-0.5">
                    {selectedData.anabolicFate}
                  </p>
                </div>

                {/* Perbedaan Kritis Pelepasan Glukosa Bebas */}
                <div className={`p-2 rounded-lg border text-[11px] font-semibold ${
                  selectedOrgan === 'LIVER' 
                    ? 'bg-red-50 border-red-300 text-red-950' 
                    : selectedOrgan === 'MUSCLE'
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-stone-100 border-stone-300 text-stone-800'
                }`}>
                  <span className="text-[10px] uppercase font-bold block">
                    Kemampuan Pelepasan Glukosa ke Darah:
                  </span>
                  <span>{selectedData.glucoseRelease}</span>
                </div>

              </div>
            </div>

            {/* Footer Tip */}
            <div className="mt-3 pt-2 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between">
              <span>Klik organ lain untuk membandingkan kinetika dan peran kompartemen.</span>
              <span className="font-mono text-stone-700 font-bold">LKM Bioenergetika</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
