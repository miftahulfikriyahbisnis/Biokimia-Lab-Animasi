/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BookOpen, 
  Flame, 
  Hammer, 
  Award, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Activity, 
  ArrowLeft,
  Compass
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface CarbohydrateHomeProps {
  profile: StudentProfile | null;
  onNavigateSection: (section: 'THEORY' | 'RICE_JOURNEY' | 'CATABOLISM' | 'ANABOLISM' | 'INTEGRATION' | 'POST_TEST') => void;
  onBackToPortal: () => void;
}

export const CarbohydrateHome: React.FC<CarbohydrateHomeProps> = ({
  profile,
  onNavigateSection,
  onBackToPortal
}) => {
  const carbProgress = profile?.carbohydrateProgress;

  const sections = [
    {
      id: 'THEORY' as const,
      title: 'Materi Dasar & Molekul Glukosa',
      subtitle: 'Fondasi konsep, perbandingan katabolisme vs anabolisme, dan struktur 3D glukosa',
      badge: 'Tahap 1',
      completed: !!carbProgress?.theoryCompleted,
      icon: BookOpen,
      iconBg: 'bg-amber-100 text-amber-800',
      highlights: ['Pengertian & Bioenergetika', 'Struktur 3D Haworth vs Fischer', 'Jenis Polisakarida & Organ Utama']
    },
    {
      id: 'RICE_JOURNEY' as const,
      title: 'Dari Sesuap Nasi hingga Monosakarida di Aliran Darah',
      subtitle: 'Tiga video pembelajaran bertahap: Mulut (Saliva & Bolus), Esofagus & Lambung (Peristaltik & Kimus), hingga Usus & Glukosa Darah',
      badge: 'Tahap 2',
      completed: !!carbProgress?.riceJourneyCompleted,
      icon: Compass,
      iconBg: 'bg-orange-100 text-orange-800',
      highlights: ['Video 1: Mulut & Pencernaan Awal Pati', 'Video 2: Esofagus, Lambung, & Duodenum', 'Video 3: Pati Menjadi Glukosa & Masuk ke Darah']
    },
    {
      id: 'CATABOLISM' as const,
      title: 'Pemecahan Oksidatif Glukosa Menjadi Energi (ATP)',
      subtitle: 'Peta rute lengkap pemecahan glukosa aerobik: Glikolisis, Nasib Piruvat, DO, Siklus Krebs, ETC, & Total ATP',
      badge: 'Tahap 3',
      completed: !!carbProgress?.catabolismCompleted,
      icon: Flame,
      iconBg: 'bg-emerald-100 text-emerald-800',
      highlights: ['Glikolisis di Sitoplasma', 'Dekarboksilasi & Siklus Krebs di Matriks Mitokondria', 'Rantai Transpor Elektron & Sintesis ATP']
    },
    {
      id: 'ANABOLISM' as const,
      title: 'Peta Anabolisme Karbohidrat',
      subtitle: '5 Visualisasi 3D penyusunan glukosa menjadi cadangan energi dan biomolekul',
      badge: 'Tahap 4',
      completed: !!carbProgress?.anabolismCompleted,
      icon: Hammer,
      iconBg: 'bg-blue-100 text-blue-800',
      highlights: ['Glikogenesis (Granula Glikogen)', 'Glukoneogenesis & 3 Reaksi Bypass', 'Siklus Cori & Lipogenesis dari Karbohidrat']
    },
    {
      id: 'INTEGRATION' as const,
      title: 'Ke Mana Glukosa Pergi? (Integrasi)',
      subtitle: 'Ringkasan komprehensif 4 kondisi fisiologis tubuh manusia',
      badge: 'Tahap 5',
      completed: !!carbProgress?.integrationCompleted,
      icon: Layers,
      iconBg: 'bg-purple-100 text-purple-800',
      highlights: ['Kondisi Setelah Makan', 'Kondisi Puasa', 'Olahraga Intens & Kelebihan Kalori']
    },
    {
      id: 'POST_TEST' as const,
      title: 'Evaluasi Post-Test Mandiri (20 Soal)',
      subtitle: 'Uji pemahaman komprehensif, analisis penguasaan subtopik, dan unduh sertifikat PDF',
      badge: 'Tahap Evaluasi',
      completed: !!carbProgress?.postTestCompleted,
      icon: Award,
      iconBg: 'bg-[#6B705C]/15 text-[#6B705C]',
      highlights: ['20 Soal Pilihan Ganda Berbobot', 'Analisis Kekuatan & Kelemahan Subtopik', 'Unduh Laporan Portofolio PDF']
    }
  ];

  // Hitung persentase progres
  const completedCount = sections.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Tombol Navigasi Atas & Baris Identitas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToPortal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] hover:border-[#6B705C] transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal Modul</span>
        </button>

        {profile && (
          <div className="text-right">
            <span className="text-xs text-[#A5A58D] block">Mahasiswa Aktif</span>
            <span className="text-xs font-bold text-[#3E3E3E]">{profile.name} • {profile.nim}</span>
          </div>
        )}
      </div>

      {/* Hero Banner Modul Karbohidrat */}
      <div className="rounded-3xl bg-linear-to-br from-[#FAF8F5] via-[#F5F2EA] to-[#EDE7DE] p-6 sm:p-8 border border-[#E5E2D9] relative overflow-hidden shadow-xs">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E5E2D9] text-xs font-semibold text-[#6B705C]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Modul Pembelajaran Biokimia Lengkap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#3E3E3E] tracking-tight">
            Eksplorasi Metabolisme Karbohidrat
          </h1>
          <p className="text-sm text-[#706B5C] leading-relaxed">
            Kajian interaktif menyeluruh mengenai pencernaan pati dari nasi, struktur 3D glukosa, katabolisme pemecahan energi (glikolisis hingga fosforilasi oksidatif), anabolisme biosintesis (glikogen dan glukoneogenesis), serta regulasi integratif dalam tubuh manusia.
          </p>

          {/* Indikator Progres Modul */}
          <div className="pt-3 max-w-md">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#706B5C]">Progres Modul Karbohidrat</span>
              <span className="font-bold text-[#6B705C]">{progressPercent}% Selesai</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E5E2D9] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#6B705C] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {carbProgress?.highestScore !== undefined && (
              <span className="text-[11px] font-medium text-[#706B5C] block mt-1.5">
                Skor Tertinggi Post-Test: <strong>{carbProgress.highestScore} / 100</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid 6 Kartu Sub-Materi */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-[#3E3E3E]">
            Tahapan Eksplorasi Materi
          </h2>
          <span className="text-xs text-[#A5A58D]">Pilih salah satu tahap untuk mulai belajar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((sec) => {
            const IconComponent = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => onNavigateSection(sec.id)}
                className={`rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between text-left group relative overflow-hidden ${
                  sec.completed
                    ? 'bg-white border-emerald-300/70 hover:border-emerald-500 hover:shadow-md'
                    : 'bg-white border-[#E5E2D9] hover:border-[#6B705C] hover:shadow-md'
                }`}
              >
                {/* Header Kartu */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${sec.iconBg}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#706B5C] uppercase tracking-wider">
                      {sec.badge}
                    </span>
                  </div>
                  {sec.completed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Selesai
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#A5A58D] bg-[#F5F2EA] px-2 py-0.5 rounded-full">
                      Belum Selesai
                    </span>
                  )}
                </div>

                {/* Judul & Deskripsi */}
                <div className="space-y-1.5 mb-4">
                  <h3 className="text-base font-serif font-bold text-[#3E3E3E] group-hover:text-[#6B705C] transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-[#706B5C] leading-relaxed line-clamp-2">
                    {sec.subtitle}
                  </p>
                </div>

                {/* Sorotan Pokok Bahasan */}
                <div className="space-y-1 pt-2 border-t border-[#F5F2EA] mb-4">
                  {sec.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#706B5C]">
                      <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Tombol Masuk */}
                <div className="pt-3 border-t border-[#E5E2D9]/70 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-[#6B705C] group-hover:underline">
                    Buka Pembelajaran
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-[#F5F2EA] group-hover:bg-[#6B705C] text-[#706B5C] group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
