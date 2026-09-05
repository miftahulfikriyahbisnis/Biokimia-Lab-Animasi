/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, AppView, StudentProfile } from '../types';
import { getStageById } from '../data/stages';
import { 
  Volume2, 
  VolumeX, 
  BookOpen, 
  FileText, 
  Maximize2,
  Minimize2,
  Zap,
  Home,
  User,
  Award,
  LogOut,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  appView: AppView;
  onNavigateAppView: (view: AppView) => void;
  activeProfile: StudentProfile | null;
  onOpenProgressModal: () => void;
  onSwitchProfile: () => void;
  currentScreen: ScreenId;
  onNavigateScreen: (screen: ScreenId) => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  reduceMotion: boolean;
  setReduceMotion: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenGlossary: () => void;
  onOpenSources: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appView,
  onNavigateAppView,
  activeProfile,
  onOpenProgressModal,
  onSwitchProfile,
  currentScreen,
  onNavigateScreen,
  soundEnabled,
  setSoundEnabled,
  reduceMotion,
  setReduceMotion,
  onOpenGlossary,
  onOpenSources
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentStage = getStageById(currentScreen);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  return (
    <header 
      id="app-main-header" 
      className="bg-white/90 backdrop-blur-md text-[#3E3E3E] border-b border-[#E5E2D9] px-4 sm:px-8 py-3 flex items-center justify-between gap-3 shadow-xs sticky top-0 z-40"
    >
      {/* Brand & Context Breadcrumb */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div 
          onClick={() => onNavigateAppView('PORTAL_HOME')}
          className="h-10 w-10 rounded-xl bg-[#6B705C] text-white flex items-center justify-center shrink-0 shadow-xs font-serif font-bold text-sm tracking-wider cursor-pointer hover:bg-[#585D4B] transition-colors"
          title="Ke Beranda Portal"
        >
          BIO
        </div>
        
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-[#706B5C] truncate">
            <button 
              onClick={() => onNavigateAppView('PORTAL_HOME')}
              className="hover:text-[#6B705C] font-medium transition-colors cursor-pointer"
            >
              Portal Biokimia
            </button>
            
            {appView !== 'PORTAL_HOME' && (
              <>
                <ChevronRight className="w-3 h-3 text-[#A5A58D]" />
                <button
                  onClick={() => onNavigateAppView('HORMONE_MAP')}
                  className="hover:text-[#6B705C] font-medium transition-colors cursor-pointer"
                >
                  Modul Hormon
                </button>
              </>
            )}

            {appView === 'STAGE_1_GENERAL_HORMONE' && (
              <>
                <ChevronRight className="w-3 h-3 text-[#A5A58D]" />
                <span className="text-[#CB997E] font-bold">Tahap 1: Materi</span>
              </>
            )}

            {appView === 'STAGE_2_INSULIN_ANIMATION' && (
              <>
                <ChevronRight className="w-3 h-3 text-[#A5A58D]" />
                <span className="text-[#CB997E] font-bold">
                  Tahap 2: Animasi {currentStage ? `(${currentStage.number}/8)` : ''}
                </span>
              </>
            )}

            {appView === 'STAGE_3_POST_TEST' && (
              <>
                <ChevronRight className="w-3 h-3 text-[#A5A58D]" />
                <span className="text-[#CB997E] font-bold">Tahap 3: Post-Test</span>
              </>
            )}
          </div>

          <h1 className="text-sm sm:text-base font-serif italic font-semibold text-[#6B705C] truncate tracking-tight">
            {appView === 'PORTAL_HOME' 
              ? 'Portal Interaktif Biokimia Kedokteran & Sains' 
              : appView === 'HORMONE_MAP'
              ? 'Peta Pembelajaran Modul Hormon'
              : appView === 'STAGE_1_GENERAL_HORMONE'
              ? 'Tahap 1: Dasar Biokimiawi Hormon'
              : appView === 'STAGE_2_INSULIN_ANIMATION'
              ? (currentStage ? `Tahap ${currentStage.number}: ${currentStage.title}` : 'Perjalanan Kimia Insulin')
              : 'Tahap 3: Evaluasi Post-Test Mandiri'}
          </h1>
        </div>
      </div>

      {/* Identitas Mahasiswa & Global Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        
        {/* Tombol Progres & Profil Mahasiswa */}
        {activeProfile && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenProgressModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F2] text-[#3E3E3E] hover:bg-[#F5F2EA] border border-[#E5E2D9] transition-colors cursor-pointer"
              title="Lihat Nilai & Riwayat Evaluasi"
            >
              <Award className="w-3.5 h-3.5 text-[#CB997E]" />
              <span className="hidden md:inline font-sans truncate max-w-[120px]">
                {activeProfile.name.split(' ')[0]} ({activeProfile.highestScore} pt)
              </span>
              <span className="md:hidden text-[11px] font-mono">
                {activeProfile.highestScore}
              </span>
            </button>

            <button
              onClick={onSwitchProfile}
              className="p-2 rounded-xl text-[#706B5C] hover:text-[#A53F2B] hover:bg-[#FFE8D6] transition-colors cursor-pointer border border-[#E5E2D9]"
              title={`Ganti Akun Mahasiswa (${activeProfile.name})`}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigasi Cepat ke Peta Modul */}
        {appView !== 'PORTAL_HOME' && appView !== 'HORMONE_MAP' && (
          <button
            onClick={() => onNavigateAppView('HORMONE_MAP')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#F5F2EA] text-[#706B5C] hover:bg-white hover:text-[#6B705C] border border-[#E5E2D9] transition-colors cursor-pointer"
            title="Kembali ke Peta Modul Hormon"
          >
            <MapPin className="w-3.5 h-3.5 text-[#6B705C]" />
            <span className="hidden lg:inline">Peta Modul</span>
          </button>
        )}

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl text-[#706B5C] hover:text-[#6B705C] hover:bg-[#F5F2EA] border border-[#E5E2D9] transition-colors cursor-pointer"
          title={isFullscreen ? "Keluar dari Layar Penuh" : "Mode Layar Penuh"}
          aria-label="Toggle Layar Penuh"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Reduce Motion Toggle */}
        <button
          onClick={() => setReduceMotion(prev => !prev)}
          className={`p-2 rounded-xl text-xs transition-colors flex items-center gap-1 border border-[#E5E2D9] cursor-pointer ${
            reduceMotion 
              ? 'bg-[#FFE8D6] text-[#A53F2B] border-[#DDBEA9]' 
              : 'bg-white text-[#706B5C] hover:bg-[#F5F2EA]'
          }`}
          title={reduceMotion ? "Animasi Disederhanakan (Reduce Motion Aktif)" : "Kurangi Gerakan Animasi"}
          aria-label="Toggle Kurangi Gerakan Animasi"
        >
          <Zap className={`w-4 h-4 ${reduceMotion ? 'text-[#A53F2B]' : 'text-[#706B5C]'}`} />
          <span className="hidden xl:inline text-[11px]">{reduceMotion ? 'Statis' : 'Animasi'}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => setSoundEnabled(prev => !prev)}
          className="p-2 rounded-xl text-[#706B5C] hover:text-[#6B705C] hover:bg-[#F5F2EA] border border-[#E5E2D9] transition-colors cursor-pointer"
          title={soundEnabled ? "Nonaktifkan Suara Interaktif" : "Aktifkan Suara Interaktif"}
          aria-label="Toggle Suara"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#6B705C]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
        </button>

        {/* Glosarium Button */}
        <button
          onClick={onOpenGlossary}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#F5F2EA] text-[#706B5C] hover:bg-white hover:text-[#6B705C] border border-[#E5E2D9] transition-colors cursor-pointer"
          title="Buka Glosarium Istilah Kimia"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#6B705C]" />
          <span className="hidden md:inline">Glosarium</span>
        </button>

        {/* Sumber Ilmiah Button */}
        <button
          onClick={onOpenSources}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#F5F2EA] text-[#706B5C] hover:bg-white hover:text-[#6B705C] border border-[#E5E2D9] transition-colors cursor-pointer"
          title="Buka Referensi Jurnal Ilmiah"
        >
          <FileText className="w-3.5 h-3.5 text-[#6B705C]" />
          <span className="hidden md:inline">Sumber</span>
        </button>

      </div>
    </header>
  );
};
