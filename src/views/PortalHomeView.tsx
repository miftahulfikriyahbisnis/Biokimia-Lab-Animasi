/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Award,
  LogOut,
  BarChart2,
  User,
  FlaskConical
} from 'lucide-react';

interface PortalHomeViewProps {
  profile: StudentProfile;
  onOpenHormoneModule?: () => void;
  onSelectHormoneModule?: () => void;
  onOpenProgressModal: () => void;
  onLogout?: () => void;
  onSwitchProfile?: () => void;
}

interface ModuleCardInfo {
  id: string;
  title: string;
  category: string;
  isAvailable: boolean;
  subtopics?: string[];
  description: string;
  iconBg: string;
  iconColor: string;
}

export const PortalHomeView: React.FC<PortalHomeViewProps> = ({
  profile,
  onOpenHormoneModule,
  onSelectHormoneModule,
  onOpenProgressModal,
  onLogout,
  onSwitchProfile
}) => {
  const [comingSoonModal, setComingSoonModal] = useState<string | null>(null);

  const handleOpenHormone = () => {
    if (onOpenHormoneModule) {
      onOpenHormoneModule();
    } else if (onSelectHormoneModule) {
      onSelectHormoneModule();
    }
  };

  const handleLogoutAction = () => {
    if (onLogout) {
      onLogout();
    } else if (onSwitchProfile) {
      onSwitchProfile();
    }
  };

  const modules: ModuleCardInfo[] = [
    {
      id: 'hormon',
      title: 'Hormon',
      category: 'Komunikasi & Regulasi Biokimia',
      isAvailable: true,
      description: 'Materi umum hormon seluler, mekanisme hidrofilik vs lipofilik, dan eksplorasi animasi kimiawi spesifik sintesis hingga defosforilasi insulin.',
      subtopics: [
        'Materi Umum & Klasifikasi Hormon',
        'Animasi Molekuler Insulin (9 Tahap)',
        'Evaluasi Post-Test Mandiri'
      ],
      iconBg: 'bg-[#6B705C]',
      iconColor: 'text-white'
    },
    {
      id: 'karbohidrat',
      title: 'Karbohidrat',
      category: 'Makromolekul & Metabolisme Energi',
      isAvailable: false,
      description: 'Kajian struktur monosakarida, polisakarida, serta regulasi katabolisme dan anabolisme glukosa.',
      subtopics: [
        'Struktur dan fungsi karbohidrat',
        'Katabolisme karbohidrat',
        'Anabolisme karbohidrat'
      ],
      iconBg: 'bg-[#F5F2EA]',
      iconColor: 'text-[#6B705C]'
    },
    {
      id: 'protein',
      title: 'Protein',
      category: 'Struktur & Polipeptida',
      isAvailable: false,
      description: 'Tingkatan struktur protein dari primer hingga kuartener serta kaskade metabolisme asam amino.',
      subtopics: [
        'Struktur dan fungsi protein',
        'Metabolisme protein'
      ],
      iconBg: 'bg-[#F5F2EA]',
      iconColor: 'text-[#6B705C]'
    },
    {
      id: 'lipid',
      title: 'Lipid',
      category: 'Membran & Cadangan Energi',
      isAvailable: false,
      description: 'Sifat kimia asam lemak, fosfolipid bilayer, serta jalur sintesis dan beta-oksidasi.',
      subtopics: [
        'Struktur dan fungsi lipid',
        'Metabolisme lipid'
      ],
      iconBg: 'bg-[#F5F2EA]',
      iconColor: 'text-[#6B705C]'
    },
    {
      id: 'asam_nukleat',
      title: 'Asam Nukleat',
      category: 'Informasi Genetik & Replikasi',
      isAvailable: false,
      description: 'Kimia rantai nukleotida, heliks ganda DNA, sintesis RNA, dan ekspresi genetik.',
      subtopics: [
        'DNA dan RNA',
        'Nukleotida',
        'Fungsi biologis asam nukleat'
      ],
      iconBg: 'bg-[#F5F2EA]',
      iconColor: 'text-[#6B705C]'
    },
    {
      id: 'enzim',
      title: 'Enzim',
      category: 'Katalisis Biokimia',
      isAvailable: false,
      description: 'Termodinamika kinetika Michaelis-Menten, sisi aktif, dan mekanisme inhibisi.',
      iconBg: 'bg-[#F5F2EA]',
      iconColor: 'text-[#6B705C]'
    },
    {
      id: 'vitamin_mineral',
      title: 'Vitamin dan Mineral',
      category: 'Kofaktor & Mikronutrien',
      isAvailable: false,
      description: 'Peran kofaktor koenzimatik vitamin larut air dan lemak serta mineral esensial.',
      iconBg: 'bg-[#F5F2EA]',
      iconColor: 'text-[#6B705C]'
    }
  ];

  // Hitung progres modul hormon
  const postTestHistoryCount = profile?.postTestHistory?.length ?? 0;
  const hormoneProgressPercent = profile?.insulinAnimationCompleted 
    ? (postTestHistoryCount > 0 ? 100 : 75)
    : (profile?.hormoneGeneralCompleted ? 40 : 10);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EA] text-[#6B705C] text-xs font-semibold border border-[#E5E2D9]">
            <Sparkles className="w-3.5 h-3.5 text-[#CB997E]" />
            Portal Pembelajaran Biokimia
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E] tracking-tight">
            Halo, {profile.name}. Siap menjelajahi Biokimia?
          </h2>
          <p className="text-xs sm:text-sm text-[#706B5C]">
            NIM: <span className="font-mono font-medium text-[#3E3E3E]">{profile.nim}</span> • Kelas: <span className="font-medium text-[#3E3E3E]">{profile.studentClass}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenProgressModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#706B5C] hover:text-[#3E3E3E] text-xs font-semibold transition-colors cursor-pointer border border-[#E5E2D9]"
          >
            <BarChart2 className="w-4 h-4 text-[#6B705C]" />
            <span>Progres Belajar</span>
          </button>
          <button
            onClick={handleLogoutAction}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FFE8D6] text-[#706B5C] hover:text-[#A53F2B] text-xs font-semibold transition-colors cursor-pointer border border-[#E5E2D9]"
            title="Keluar ke pemilihan profil"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar dari Profil</span>
          </button>
        </div>
      </div>

      {/* Daftar Modul Biokimia */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#3E3E3E]">
              Daftar Modul Pembelajaran
            </h3>
            <p className="text-xs text-[#706B5C]">
              Pilih modul untuk memulai eksplorasi konsep molekuler, animasi, dan evaluasi.
            </p>
          </div>
          <span className="text-xs font-medium text-[#6B705C] bg-[#F5F2EA] px-3 py-1 rounded-full border border-[#E5E2D9]">
            1 Modul Aktif • 6 Segera Hadir
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map(mod => (
            <div
              key={mod.id}
              onClick={() => {
                if (mod.isAvailable) {
                  handleOpenHormone();
                } else {
                  setComingSoonModal(mod.title);
                }
              }}
              className={`rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden group ${
                mod.isAvailable
                  ? 'bg-white border-[#6B705C]/40 shadow-xs hover:shadow-md hover:border-[#6B705C] hover:-translate-y-0.5'
                  : 'bg-[#FDFCF9] border-[#E5E2D9] hover:bg-white hover:border-[#D5D2C9]'
              }`}
            >
              {/* Badge Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold text-[#706B5C] uppercase tracking-wider">
                  {mod.category}
                </span>
                {mod.isAvailable ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#E8EDE0] text-[#585D4B] px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B705C] animate-pulse"></span>
                    Tersedia
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F5F2EA] text-[#A5A58D] px-2 py-0.5 rounded-full border border-[#E5E2D9]">
                    <Lock className="w-3 h-3" />
                    Segera Hadir
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mb-4">
                <h4 className="text-xl font-serif font-bold text-[#3E3E3E] group-hover:text-[#6B705C] transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs text-[#706B5C] line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* Subtopics list if available */}
              {mod.subtopics && (
                <div className="mb-5 space-y-1.5 pt-2 border-t border-[#F5F2EA]">
                  <span className="text-[10px] font-bold text-[#A5A58D] uppercase tracking-wider block">
                    Submateri:
                  </span>
                  {mod.subtopics.map((sub, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#706B5C]">
                      <span className="w-1 h-1 rounded-full bg-[#CB997E]"></span>
                      <span className="truncate">{sub}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Card */}
              <div className="pt-3 border-t border-[#E5E2D9]/70 flex items-center justify-between mt-auto">
                {mod.isAvailable ? (
                  <>
                    <div className="text-xs">
                      <span className="text-[#A5A58D]">Progres: </span>
                      <span className="font-bold text-[#6B705C]">{hormoneProgressPercent}%</span>
                    </div>
                    <button
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#6B705C] group-hover:bg-[#585D4B] text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <span>{hormoneProgressPercent > 0 ? 'Lanjutkan' : 'Mulai'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-between text-xs text-[#A5A58D]">
                    <span>Tahap Pengembangan</span>
                    <span className="text-[11px] underline">Detail</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Segera Hadir */}
      {comingSoonModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E5E2D9] shadow-lg space-y-5 text-center animate-in fade-in zoom-in duration-150">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F2EA] text-[#6B705C] flex items-center justify-center mx-auto border border-[#E5E2D9]">
              <Lock className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                Modul {comingSoonModal}
              </h3>
              <p className="text-xs sm:text-sm text-[#706B5C] leading-relaxed">
                Modul ini sedang dikembangkan dan akan tersedia pada pembaruan berikutnya.
              </p>
            </div>

            <div className="p-3 bg-[#FDFCF9] rounded-2xl border border-[#E5E2D9] text-xs text-[#706B5C] text-left">
              Saat ini Anda dapat mempelajari modul aktif: <strong>Modul Hormon</strong> (Materi Umum, Animasi Kimiawi Insulin, dan Post-Test Interaktif).
            </div>

            <button
              onClick={() => setComingSoonModal(null)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#6B705C] hover:bg-[#585D4B] text-white transition-colors cursor-pointer shadow-xs"
            >
              Mengerti & Kembali
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
