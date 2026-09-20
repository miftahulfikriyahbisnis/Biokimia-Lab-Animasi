/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Zap, 
  Activity, 
  Layers, 
  Flame, 
  ShieldCheck,
  CheckCircle2,
  Info,
  Maximize2
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
  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-3 select-none">
      
      {/* 4 Organ Selector Badges */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
        {(['PANCREAS', 'LIVER', 'MUSCLE', 'ADIPOSE'] as OrganKey[]).map((org) => {
          const isSelected = selectedOrgan === org;
          const isExplored = exploredOrgans[org];
          const labels: Record<OrganKey, { name: string; tag: string; color: string }> = {
            PANCREAS: { name: 'Pankreas', tag: 'Sensor & Insulin', color: 'border-blue-400 bg-blue-50 text-blue-950' },
            LIVER: { name: 'Hati (Hepar)', tag: 'Glikogen Sistemik', color: 'border-red-400 bg-red-50 text-red-950' },
            MUSCLE: { name: 'Otot Rangka', tag: 'Glikogen Tertutup', color: 'border-amber-400 bg-amber-50 text-amber-950' },
            ADIPOSE: { name: 'Adiposa', tag: 'Lipogenesis & TAG', color: 'border-yellow-400 bg-yellow-50 text-yellow-950' },
          };
          const conf = labels[org];

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
              <span className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                {conf.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kanvas Dua Tampilan: Tubuh Makroskopik (Kiri) + Zoom Seluler Submikroskopik (Kanan) */}
      <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-xs p-3 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* SISI 1: Peta Tubuh Manusia Interaktif (md:col-span-5) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-2 bg-[#FAF8F5] rounded-xl border border-stone-200 relative">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1 font-mono">
              Peta Anatomi (Ketuk Organ)
            </span>

            <svg viewBox="0 0 240 380" className="w-full max-w-[200px] h-auto">
              <defs>
                <linearGradient id="bodySkin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5F2EC" />
                  <stop offset="100%" stopColor="#E7E2D8" />
                </linearGradient>
                <linearGradient id="vesselRed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#B91C1C" />
                </linearGradient>
              </defs>

              {/* Siluet Tubuh Manusia Minimalis Bersih */}
              <g fill="url(#bodySkin)" stroke="#D6D0C4" strokeWidth="1.5">
                {/* Kepala & Leher */}
                <circle cx="120" cy="35" r="22" />
                <path d="M 113 57 L 113 72 L 127 72 L 127 57 Z" />
                {/* Torso & Bahu */}
                <path d="M 75 80 Q 120 72 165 80 L 155 210 Q 120 215 85 210 Z" />
                {/* Lengan */}
                <path d="M 75 80 L 52 160 L 45 220 L 56 222 L 66 165 L 85 110" />
                <path d="M 165 80 L 188 160 L 195 220 L 184 222 L 174 165 L 155 110" />
                {/* Kaki / Otot Paha */}
                <path d="M 87 210 L 80 320 L 92 360 L 110 360 L 114 260 L 120 220" />
                <path d="M 153 210 L 160 320 L 148 360 L 130 360 L 126 260 L 120 220" />
              </g>

              {/* Pembuluh Darah Sistemik Aorta & Vena Cava */}
              <path d="M 120 75 L 120 215 L 98 320" stroke="url(#vesselRed)" strokeWidth="3" fill="none" opacity="0.4" />
              <path d="M 120 215 L 142 320" stroke="url(#vesselRed)" strokeWidth="3" fill="none" opacity="0.4" />

              {/* ORGAN 1: HATI (Hepar - Kanan atas abdomen pengamat/kiri anatomis) */}
              <g 
                onClick={() => onSelectOrgan('LIVER')}
                className="cursor-pointer transition-all hover:scale-105"
                transform="translate(86, 120)"
              >
                <path
                  d="M 0 10 C 15 -5 45 -5 55 12 C 55 25 35 38 10 36 C -2 32 -5 20 0 10 Z"
                  fill={selectedOrgan === 'LIVER' ? '#DC2626' : '#EF4444'}
                  stroke={selectedOrgan === 'LIVER' ? '#7F1D1D' : '#B91C1C'}
                  strokeWidth={selectedOrgan === 'LIVER' ? 3 : 1.5}
                  className={selectedOrgan === 'LIVER' ? 'filter drop-shadow' : ''}
                />
                <circle cx="28" cy="18" r="3" fill="#FEF08A" />
                {selectedOrgan === 'LIVER' && (
                  <circle cx="28" cy="18" r="8" fill="none" stroke="#FEF08A" strokeWidth="2" className="animate-ping" />
                )}
                <text x="28" y="46" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7F1D1D">
                  Hati
                </text>
              </g>

              {/* ORGAN 2: PANKREAS (Di belakang lambung, dekat duodenum) */}
              <g 
                onClick={() => onSelectOrgan('PANCREAS')}
                className="cursor-pointer transition-all hover:scale-105"
                transform="translate(112, 142)"
              >
                <path
                  d="M 0 8 C 15 2 30 5 40 10 C 35 18 20 18 5 15 Z"
                  fill={selectedOrgan === 'PANCREAS' ? '#2563EB' : '#60A5FA'}
                  stroke={selectedOrgan === 'PANCREAS' ? '#1E3A8A' : '#1D4ED8'}
                  strokeWidth={selectedOrgan === 'PANCREAS' ? 2.5 : 1.5}
                />
                {selectedOrgan === 'PANCREAS' && (
                  <circle cx="20" cy="10" r="6" fill="none" stroke="#BFDBFE" strokeWidth="2" className="animate-ping" />
                )}
                <text x="20" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E3A8A">
                  Pankreas
                </text>
              </g>

              {/* ORGAN 3: JARINGAN ADIPOSA (Abdomen Bawah / Subkutan) */}
              <g 
                onClick={() => onSelectOrgan('ADIPOSE')}
                className="cursor-pointer transition-all hover:scale-105"
                transform="translate(95, 175)"
              >
                <ellipse 
                  cx="25" 
                  cy="15" 
                  rx="26" 
                  ry="14" 
                  fill={selectedOrgan === 'ADIPOSE' ? '#EAB308' : '#FDE047'} 
                  stroke={selectedOrgan === 'ADIPOSE' ? '#854D0E' : '#CA8A04'}
                  strokeWidth={selectedOrgan === 'ADIPOSE' ? 2.5 : 1.5}
                  opacity="0.9"
                />
                <circle cx="25" cy="15" r="4" fill="#FEF08A" />
                <text x="25" y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#854D0E">
                  Adiposa
                </text>
              </g>

              {/* ORGAN 4: OTOT RANGKA (Paha Femur & Lengan) */}
              <g 
                onClick={() => onSelectOrgan('MUSCLE')}
                className="cursor-pointer transition-all hover:scale-105"
                transform="translate(75, 235)"
              >
                {/* Otot Paha Kanan & Kiri */}
                <path
                  d="M 5 0 C 15 20 15 50 8 70 C 0 50 -2 20 5 0 Z"
                  fill={selectedOrgan === 'MUSCLE' ? '#EA580C' : '#FB923C'}
                  stroke={selectedOrgan === 'MUSCLE' ? '#7C2D12' : '#C2410C'}
                  strokeWidth={selectedOrgan === 'MUSCLE' ? 2.5 : 1.5}
                />
                <path
                  d="M 85 0 C 75 20 75 50 82 70 C 90 50 92 20 85 0 Z"
                  fill={selectedOrgan === 'MUSCLE' ? '#EA580C' : '#FB923C'}
                  stroke={selectedOrgan === 'MUSCLE' ? '#7C2D12' : '#C2410C'}
                  strokeWidth={selectedOrgan === 'MUSCLE' ? 2.5 : 1.5}
                />
                <text x="45" y="40" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7C2D12">
                  Otot Rangka
                </text>
              </g>
            </svg>
          </div>

          {/* SISI 2: Tampilan Submikroskopik Detail Organ Terpilih (md:col-span-7) */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-3 p-3 bg-stone-50/70 rounded-xl border border-stone-200">
            
            {/* 1. PANKREAS DETAIL */}
            {selectedOrgan === 'PANCREAS' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-blue-600 text-white font-bold text-xs">PANKREAS</span>
                    <span className="font-bold text-stone-900 text-xs">Pulau Langerhans (Sel Beta)</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Sensor Glukosa</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-blue-200/80 shadow-2xs space-y-2">
                  <svg viewBox="0 0 320 140" className="w-full h-auto">
                    {/* Dinding Sel Beta */}
                    <rect x="20" y="20" width="160" height="100" rx="14" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
                    <text x="100" y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E40AF">
                      Sel Beta Pankreas
                    </text>

                    {/* Sensor Glukokinase */}
                    <rect x="30" y="55" width="45" height="24" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1" />
                    <text x="52" y="70" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1E3A8A">
                      Glukokinase
                    </text>

                    {/* Vesikel Insulin */}
                    <g transform="translate(100, 60)" className="animate-pulse">
                      <circle cx="15" cy="15" r="10" fill="#2563EB" />
                      <circle cx="35" cy="20" r="8" fill="#3B82F6" />
                      <circle cx="25" cy="35" r="9" fill="#1D4ED8" />
                      <text x="25" y="20" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFF">INS</text>
                    </g>

                    {/* Eksositosis Insulin ke Sirkulasi */}
                    <path d="M 180 70 L 230 70" stroke="#2563EB" strokeWidth="3" strokeDasharray="3 3" />
                    <polygon points="235,70 225,65 225,75" fill="#2563EB" />

                    {/* Pembuluh Darah */}
                    <rect x="240" y="20" width="60" height="100" rx="8" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
                    <text x="270" y="45" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991B1B">Sirkulasi</text>
                    <text x="270" y="65" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2563EB">Insulin ↑↑</text>
                  </svg>

                  <div className="p-2 rounded-lg bg-blue-50 text-[11px] text-blue-950 font-medium">
                    Kadar glukosa darah pasca-makan menstimulasi eksositosis vesikel insulin untuk memberi komando anabolik ke seluruh jaringan perifer.
                  </div>
                </div>
              </div>
            )}

            {/* 2. HATI DETAIL */}
            {selectedOrgan === 'LIVER' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-red-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-red-600 text-white font-bold text-xs">HATI</span>
                    <span className="font-bold text-stone-900 text-xs">Hepatosit & Homeostasis Darah</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-800 bg-red-100 px-2 py-0.5 rounded">GLUT2 & G6Pase</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-red-200/80 shadow-2xs space-y-2">
                  <svg viewBox="0 0 320 150" className="w-full h-auto">
                    {/* Hepatosit */}
                    <rect x="20" y="15" width="280" height="120" rx="14" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
                    <text x="75" y="32" fontSize="9" fontWeight="bold" fill="#991B1B">Hepatosit (Sel Hati)</text>

                    {/* Kanal Transporter GLUT2 */}
                    <rect x="15" y="55" width="12" height="36" rx="3" fill="#B91C1C" />
                    <text x="8" y="76" fontSize="7" fontWeight="bold" fill="#7F1D1D" transform="rotate(-90 8,76)">GLUT2</text>
                    <path d="M 5 73 L 32 73" stroke="#F59E0B" strokeWidth="2.5" />

                    {/* Reaksi 1: Glukosa -> G6P (Glukokinase) */}
                    <rect x="38" y="60" width="60" height="26" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1" />
                    <text x="68" y="73" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991B1B">Glukosa</text>
                    <text x="68" y="82" textAnchor="middle" fontSize="6.5" fill="#B91C1C">→ G6P (GK)</text>

                    {/* Panah Cabang 1: Glikogenesis */}
                    <path d="M 100 68 L 135 50" stroke="#059669" strokeWidth="2" />
                    <rect x="138" y="38" width="70" height="24" rx="6" fill="#D1FAE5" stroke="#059669" strokeWidth="1" />
                    <text x="173" y="52" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#065F46">Glikogen Hepar</text>

                    {/* Granula Glikogen Bertambah */}
                    <g transform="translate(215, 40)" className="animate-pulse">
                      <circle cx="6" cy="6" r="5" fill="#10B981" />
                      <circle cx="18" cy="8" r="6" fill="#059669" />
                      <circle cx="12" cy="18" r="5" fill="#047857" />
                    </g>

                    {/* Panah Cabang 2: Lipogenesis & Citrate Shuttle jika berlebih */}
                    <path d="M 100 78 L 135 98" stroke="#D97706" strokeWidth="2" />
                    <rect x="138" y="86" width="95" height="26" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
                    <text x="185" y="99" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#78350F">Lipogenesis (Citrate)</text>
                    <text x="185" y="108" textAnchor="middle" fontSize="6.5" fill="#92400E">→ Asetil-KoA → VLDL</text>
                  </svg>

                  {/* Label Wajib Sesuai Permintaan Pengguna */}
                  <div className="p-2 rounded-lg bg-red-100/80 border border-red-200 text-red-950 font-bold text-center text-xs">
                    “Glikogen hati membantu mempertahankan glukosa darah.”
                  </div>
                </div>
              </div>
            )}

            {/* 3. OTOT RANGKA DETAIL */}
            {selectedOrgan === 'MUSCLE' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-amber-600 text-white font-bold text-xs">OTOT RANGKA</span>
                    <span className="font-bold text-stone-900 text-xs">Miosit & Translokasi GLUT4</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Tertutup (Internal)</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs space-y-2">
                  <svg viewBox="0 0 320 150" className="w-full h-auto">
                    {/* Sarkolema & Miosit */}
                    <rect x="20" y="15" width="280" height="120" rx="14" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
                    <text x="80" y="32" fontSize="9" fontWeight="bold" fill="#9A3412">Miosit (Serat Otot)</text>

                    {/* Reseptor Insulin & Translokasi Vesikel GLUT4 */}
                    <g transform="translate(40, 45)">
                      <circle cx="15" cy="15" r="10" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
                      <text x="15" y="18" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#7C2D12">GLUT4</text>
                      <path d="M 15 26 L 15 45" stroke="#EA580C" strokeWidth="2" strokeDasharray="2 2" />
                      <text x="15" y="55" textAnchor="middle" fontSize="6" fill="#C2410C">Translokasi ke Membran</text>
                    </g>

                    {/* Aliran Masuk Glukosa */}
                    <path d="M 75 75 L 120 75" stroke="#F59E0B" strokeWidth="3" />
                    <polygon points="125,75 115,70 115,80" fill="#F59E0B" />

                    {/* Sintesis Glikogen Otot */}
                    <rect x="130" y="60" width="85" height="30" rx="6" fill="#FFEDD5" stroke="#C2410C" strokeWidth="1" />
                    <text x="172" y="75" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#7C2D12">Glikogen Otot</text>
                    <text x="172" y="85" textAnchor="middle" fontSize="6.5" fill="#9A3412">Khusus ATP Kontraksi</text>

                    {/* Tanda Silang: Tidak Bisa Lepas ke Darah karena Tanpa G6Pase */}
                    <g transform="translate(230, 60)">
                      <rect x="0" y="0" width="60" height="30" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1" />
                      <text x="30" y="14" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#991B1B">Ke Darah: X</text>
                      <text x="30" y="24" textAnchor="middle" fontSize="5.5" fill="#7F1D1D">Tanpa G6Pase</text>
                    </g>
                  </svg>

                  {/* Label Wajib Sesuai Permintaan Pengguna */}
                  <div className="p-2 rounded-lg bg-amber-100/80 border border-amber-200 text-amber-950 font-bold text-center text-xs">
                    “Glikogen otot digunakan oleh otot itu sendiri.”
                  </div>
                </div>
              </div>
            )}

            {/* 4. JARINGAN ADIPOSA DETAIL */}
            {selectedOrgan === 'ADIPOSE' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-yellow-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-yellow-600 text-white font-bold text-xs">JARINGAN ADIPOSA</span>
                    <span className="font-bold text-stone-900 text-xs">Adiposit & Pembentukan Droplet TAG</span>
                  </div>
                  <span className="text-[10px] font-mono text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded">Glukosa + Asam Lemak</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-yellow-200/80 shadow-2xs space-y-2">
                  <svg viewBox="0 0 320 150" className="w-full h-auto">
                    {/* Adiposit */}
                    <rect x="20" y="15" width="280" height="120" rx="14" fill="#FEFCE8" stroke="#CA8A04" strokeWidth="2" />
                    <text x="75" y="32" fontSize="9" fontWeight="bold" fill="#854D0E">Adiposit (Sel Lemak)</text>

                    {/* Masuknya Glukosa via GLUT4 & Asam Lemak via LPL */}
                    <g transform="translate(30, 45)">
                      <rect x="0" y="0" width="60" height="18" rx="4" fill="#FEF08A" stroke="#EAB308" />
                      <text x="30" y="12" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#713F12">Glukosa (GLUT4)</text>

                      <rect x="0" y="24" width="60" height="18" rx="4" fill="#FED7AA" stroke="#F97316" />
                      <text x="30" y="36" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#7C2D12">Asam Lemak (VLDL)</text>
                    </g>

                    {/* Pembentukan Gliserol-3-P dan Esterifikasi */}
                    <path d="M 95 65 L 135 65" stroke="#CA8A04" strokeWidth="2" />
                    <text x="115" y="60" textAnchor="middle" fontSize="6" fill="#854D0E">Esterifikasi</text>

                    {/* Droplet Lemak Membesar Dinamis */}
                    <g transform="translate(180, 70)" className="animate-pulse">
                      <circle cx="25" cy="10" r="28" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
                      <text x="25" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#713F12">
                        Droplet TAG
                      </text>
                    </g>
                  </svg>

                  {/* Label Wajib Sesuai Permintaan Pengguna */}
                  <div className="p-2 rounded-lg bg-yellow-100/80 border border-yellow-200 text-yellow-950 font-bold text-center text-xs">
                    “Triasilgliserol menjadi cadangan energi jangka panjang.”
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
};
