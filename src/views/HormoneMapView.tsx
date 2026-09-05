/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Award,
  Sparkles,
  Home
} from 'lucide-react';

interface HormoneMapViewProps {
  profile: StudentProfile;
  isUnlockedForPresentation?: boolean;
  onTogglePresentationUnlock?: () => void;
  onSelectTahap1: () => void;
  onSelectTahap2: () => void;
  onSelectTahap3: () => void;
  onBackToPortal?: () => void;
  onGoToPortalHome?: () => void;
  onRestartModule?: () => void;
  onOpenProgressModal?: () => void;
}

export const HormoneMapView: React.FC<HormoneMapViewProps> = ({
  profile,
  isUnlockedForPresentation = false,
  onTogglePresentationUnlock,
  onSelectTahap1,
  onSelectTahap2,
  onSelectTahap3,
  onBackToPortal,
  onGoToPortalHome,
  onRestartModule,
  onOpenProgressModal
}) => {
  const [internalUnlock, setInternalUnlock] = useState(false);
  const isUnlocked = isUnlockedForPresentation || internalUnlock;
  const toggleUnlock = onTogglePresentationUnlock || (() => setInternalUnlock(prev => !prev));
  const handleGoHome = onBackToPortal || onGoToPortalHome || (() => {});

  const hasHistory = (profile?.postTestHistory?.length ?? 0) > 0;

  const [showResumeBanner, setShowResumeBanner] = useState<boolean>(
    Boolean(profile?.hormoneGeneralCompleted || profile?.insulinAnimationCompleted)
  );

  // Status kuncian
  const isTahap1Unlocked = true; // Selalu terbuka
  const isTahap2Unlocked = isUnlocked || Boolean(profile?.hormoneGeneralCompleted);
  const isTahap3Unlocked = isUnlocked || Boolean(profile?.hormoneGeneralCompleted && profile?.insulinAnimationCompleted);

  // Helper resume
  const handleResume = () => {
    if (profile.lastStudiedSection === 'POST_TEST' && isTahap3Unlocked) {
      onSelectTahap3();
    } else if (profile.lastStudiedSection === 'INSULIN_ANIMATION' && isTahap2Unlocked) {
      onSelectTahap2();
    } else {
      onSelectTahap1();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Banner Sapaan & Breadcrumb Navigasi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-[#E5E2D9] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#706B5C] mb-1">
            <button 
              onClick={handleGoHome}
              className="hover:text-[#6B705C] flex items-center gap-1 font-medium cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Portal Biokimia</span>
            </button>
            <span>/</span>
            <span className="font-semibold text-[#3E3E3E]">Modul Hormon</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3E3E3E]">
            Peta Pembelajaran Modul Hormon
          </h2>
          <p className="text-xs text-[#706B5C] mt-0.5">
            Selesaikan tahap secara bertahap mulai dari konsep dasar hingga evaluasi mandiri.
          </p>
        </div>

        {/* Tombol Presentasi Kelas */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleUnlock}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              isUnlocked
                ? 'bg-[#E8EDE0] text-[#585D4B] border-[#C3CDB4]'
                : 'bg-[#F5F2EA] text-[#706B5C] hover:text-[#3E3E3E] border-[#E5E2D9]'
            }`}
            title="Membuka seluruh tahap tanpa syarat (khusus presentasi atau demonstrasi kelas dosen)"
          >
            {isUnlocked ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-[#6B705C]" />
                <span>Presentasi Kelas Aktif (Semua Terbuka)</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#A5A58D]" />
                <span>Buka Semua untuk Presentasi Kelas</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Banner Lanjutkan dari Bagian Terakhir */}
      {showResumeBanner && (
        <div className="bg-[#FAF8F2] border border-[#E5E2D9] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6B705C]">
              <Sparkles className="w-4 h-4 text-[#CB997E]" />
              <span>Lanjutkan dari bagian terakhir?</span>
            </div>
            <p className="text-xs text-[#706B5C]">
              Anda sebelumnya berada di bagian{' '}
              <strong>
                {profile.lastStudiedSection === 'POST_TEST'
                  ? 'Tahap 3: Post-Test'
                  : profile.lastStudiedSection === 'INSULIN_ANIMATION'
                  ? 'Tahap 2: Animasi Spesifik Insulin'
                  : 'Tahap 1: Materi Umum Hormon'}
              </strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResume}
              className="px-4 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Lanjutkan
            </button>
            <button
              onClick={() => {
                if (onRestartModule) onRestartModule();
                setShowResumeBanner(false);
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#706B5C] text-xs font-medium border border-[#E5E2D9] transition-colors cursor-pointer"
              title="Mengulang modul dari tahap 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mulai Ulang Modul</span>
            </button>
            <button
              onClick={handleGoHome}
              className="px-3 py-2 rounded-xl text-xs text-[#A5A58D] hover:text-[#706B5C] cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}

      {/* Tiga Kartu Tahap Pembelajaran */}
      <div className="space-y-4">
        
        {/* TAHAP 1 */}
        <div 
          onClick={() => {
            if (isTahap1Unlocked) onSelectTahap1();
          }}
          className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E2D9] hover:border-[#6B705C] transition-all cursor-pointer shadow-xs group flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F2EA] text-[#6B705C] flex items-center justify-center shrink-0 font-serif font-bold text-lg border border-[#E5E2D9]">
              1
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#CB997E]">
                  TAHAP 1
                </span>
                {profile.hormoneGeneralCompleted && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#585D4B] bg-[#E8EDE0] px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-[#6B705C]" /> Selesai
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3E3E3E] group-hover:text-[#6B705C] transition-colors">
                Materi Umum Hormon
              </h3>
              <p className="text-xs sm:text-sm text-[#706B5C] max-w-2xl leading-relaxed">
                7 bagian interaktif: konsep dasar hormon, sifat kimiawi (peptida, steroid, turunan asam amino), kelenjar endokrin, mekanisme hidrofilik vs lipofilik, feedback negatif & positif, serta sumbu hipotalamus–hipofisis.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 self-end md:self-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelectTahap1();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] text-white text-xs font-semibold group-hover:bg-[#585D4B] transition-colors shadow-xs cursor-pointer"
            >
              <span>{profile.hormoneGeneralCompleted ? 'Pelajari Ulang' : 'Buka Materi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAHAP 2 */}
        <div 
          onClick={() => {
            if (isTahap2Unlocked) onSelectTahap2();
          }}
          className={`rounded-3xl p-6 sm:p-7 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            isTahap2Unlocked 
              ? 'bg-white border-[#E5E2D9] hover:border-[#6B705C] cursor-pointer shadow-xs group'
              : 'bg-[#FDFCF9] border-[#E5E2D9] opacity-75 cursor-not-allowed'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-serif font-bold text-lg border ${
              isTahap2Unlocked 
                ? 'bg-[#F5F2EA] text-[#6B705C] border-[#E5E2D9]' 
                : 'bg-[#F5F2EA]/60 text-[#A5A58D] border-[#E5E2D9]'
            }`}>
              2
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#CB997E]">
                  TAHAP 2
                </span>
                {!isTahap2Unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#A5A58D] bg-[#F5F2EA] px-2 py-0.5 rounded-md border border-[#E5E2D9]">
                    <Lock className="w-3 h-3" /> Terkunci (Selesaikan Tahap 1)
                  </span>
                ) : profile.insulinAnimationCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#585D4B] bg-[#E8EDE0] px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-[#6B705C]" /> Selesai
                  </span>
                ) : (
                  <span className="text-[11px] text-[#6B705C] font-semibold">Tersedia</span>
                )}
              </div>
              <h3 className={`text-lg sm:text-xl font-serif font-bold transition-colors ${
                isTahap2Unlocked ? 'text-[#3E3E3E] group-hover:text-[#6B705C]' : 'text-[#706B5C]'
              }`}>
                Animasi Spesifik Insulin (9 Tahap Kimiawi)
              </h3>
              <p className="text-xs sm:text-sm text-[#706B5C] max-w-2xl leading-relaxed">
                Kajian molekuler lengkap: struktur & ikatan disulfida, transkripsi & translasi, pemrosesan preproinsulin, proinsulin, pemotongan C-peptide, penyimpanan heksamer Zn²⁺, pelepasan, ikatan reseptor tirosin kinase, translokasi GLUT4, hingga defosforilasi.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 self-end md:self-center">
            {isTahap2Unlocked ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTahap2();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] text-white text-xs font-semibold group-hover:bg-[#585D4B] transition-colors shadow-xs cursor-pointer"
              >
                <span>{profile.insulinAnimationCompleted ? 'Tonton Ulang' : 'Mulai Animasi'}</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[#A5A58D] bg-[#F5F2EA] px-4 py-2 rounded-xl border border-[#E5E2D9]">
                <Lock className="w-3.5 h-3.5" />
                <span>Selesaikan Tahap 1</span>
              </div>
            )}
          </div>
        </div>

        {/* TAHAP 3 */}
        <div 
          onClick={() => {
            if (isTahap3Unlocked) onSelectTahap3();
          }}
          className={`rounded-3xl p-6 sm:p-7 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            isTahap3Unlocked 
              ? 'bg-white border-[#E5E2D9] hover:border-[#6B705C] cursor-pointer shadow-xs group'
              : 'bg-[#FDFCF9] border-[#E5E2D9] opacity-75 cursor-not-allowed'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-serif font-bold text-lg border ${
              isTahap3Unlocked 
                ? 'bg-[#F5F2EA] text-[#6B705C] border-[#E5E2D9]' 
                : 'bg-[#F5F2EA]/60 text-[#A5A58D] border-[#E5E2D9]'
            }`}>
              3
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#CB997E]">
                  TAHAP 3
                </span>
                {!isTahap3Unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#A5A58D] bg-[#F5F2EA] px-2 py-0.5 rounded-md border border-[#E5E2D9]">
                    <Lock className="w-3 h-3" /> Terkunci (Selesaikan Tahap 1 & 2)
                  </span>
                ) : hasHistory ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#585D4B] bg-[#E8EDE0] px-2 py-0.5 rounded-md">
                    <Award className="w-3 h-3 text-[#CB997E]" /> Skor Terbaik: {profile.highestScore || 0}/100
                  </span>
                ) : (
                  <span className="text-[11px] text-[#6B705C] font-semibold">Tersedia untuk Dikerjakan</span>
                )}
              </div>
              <h3 className={`text-lg sm:text-xl font-serif font-bold transition-colors ${
                isTahap3Unlocked ? 'text-[#3E3E3E] group-hover:text-[#6B705C]' : 'text-[#706B5C]'
              }`}>
                Post-Test Hormon dan Insulin
              </h3>
              <p className="text-xs sm:text-sm text-[#706B5C] max-w-2xl leading-relaxed">
                Evaluasi objektif 15 butir soal acak (konsep, aplikasi, analisis HOTS, dan interpretasi reaksi) berdurasi 20 menit dengan analisis jawaban langsung dan unduh laporan resmi sebagai PDF.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 self-end md:self-center">
            {isTahap3Unlocked ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTahap3();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#CB997E] hover:bg-[#B8876E] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                <span>{hasHistory ? 'Kerjakan Ulang' : 'Mulai Post-Test'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[#A5A58D] bg-[#F5F2EA] px-4 py-2 rounded-xl border border-[#E5E2D9]">
                <Lock className="w-3.5 h-3.5" />
                <span>Selesaikan Tahap 1 & 2</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
