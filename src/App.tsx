/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, StageNumber, AppView, StudentProfile } from './types';
import { Header } from './components/Header';
import { StageHeader } from './components/StageHeader';
import { TimelineControl } from './components/TimelineControl';
import { GlossaryModal } from './components/GlossaryModal';
import { SourcesModal } from './components/SourcesModal';
import { StudentProgressModal } from './components/StudentProgressModal';

import { 
  getActiveProfile, 
  updateActiveProfile, 
  clearActiveProfile 
} from './utils/storage';

// Portal Views
import { StudentAuthView } from './views/StudentAuthView';
import { PortalHomeView } from './views/PortalHomeView';
import { HormoneMapView } from './views/HormoneMapView';
import { GeneralHormoneView } from './views/GeneralHormoneView';
import { PostTestView } from './views/PostTestView';
import { CarbohydrateModuleView } from './views/CarbohydrateModuleView';

// Insulin Animation Views (Tahap 2)
import { HomeView } from './views/HomeView';
import { Stage1View } from './views/Stage1View';
import { Stage2View } from './views/Stage2View';
import { Stage3View } from './views/Stage3View';
import { Stage4View } from './views/Stage4View';
import { Stage5View } from './views/Stage5View';
import { Stage6View } from './views/Stage6View';
import { Stage7View } from './views/Stage7View';
import { Stage8View } from './views/Stage8View';
import { SummaryView } from './views/SummaryView';
import { BACKGROUND_PARTICLES } from './data/backgroundParticles';

export function App() {
  // State Profil Mahasiswa Aktif
  const [activeProfile, setActiveProfile] = useState<StudentProfile | null>(() => getActiveProfile());
  
  // State Alur Navigasi Portal & Modul
  const [appView, setAppView] = useState<AppView>(() => {
    const saved = getActiveProfile();
    return saved ? 'PORTAL_HOME' : 'STUDENT_AUTH';
  });

  // State Layar Animasi Insulin (Ketika di STAGE_2_INSULIN_ANIMATION)
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('STAGE_1');
  
  // Kontrol Animasi Player
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<0.5 | 1 | 1.5>(1);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [stageKey, setStageKey] = useState<number>(0);

  // Modals
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [selectedSourceId, setSelectedSourceId] = useState<string | undefined>(undefined);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  // Cek profil mahasiswa saat pertama render
  useEffect(() => {
    const profile = getActiveProfile();
    if (!profile && appView !== 'STUDENT_AUTH') {
      setAppView('STUDENT_AUTH');
    }
  }, [appView]);

  // Handler Login / Buat Akun Mahasiswa
  const handleAuthSuccess = (profile: StudentProfile) => {
    setActiveProfile(profile);
    setAppView('PORTAL_HOME');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler Ganti Akun Mahasiswa
  const handleSwitchProfile = () => {
    clearActiveProfile();
    setActiveProfile(null);
    setAppView('STUDENT_AUTH');
  };

  // Navigasi Antar Halaman Portal
  const handleNavigateAppView = (view: AppView) => {
    setAppView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper nomor tahap animasi insulin (1 sampai 8) atau null
  const getCurrentStageNumber = (): StageNumber | null => {
    if (appView !== 'STAGE_2_INSULIN_ANIMATION') return null;
    if (currentScreen.startsWith('STAGE_')) {
      const num = parseInt(currentScreen.replace('STAGE_', ''), 10);
      if (num >= 1 && num <= 8) return num as StageNumber;
    }
    return null;
  };

  const currentStageNumber = getCurrentStageNumber();

  // Navigasi Tahap Animasi Insulin
  const handleNavigateScreen = (screen: ScreenId) => {
    setCurrentScreen(screen);
    setIsPlaying(true);
    setStageKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStage = () => {
    if (currentStageNumber && currentStageNumber > 1) {
      handleNavigateScreen(`STAGE_${currentStageNumber - 1}` as ScreenId);
    }
  };

  const handleNextStage = () => {
    if (currentStageNumber) {
      if (currentStageNumber < 8) {
        handleNavigateScreen(`STAGE_${currentStageNumber + 1}` as ScreenId);
      } else {
        // Menuju Rangkuman Penutup (Tahap 9)
        handleNavigateScreen('SUMMARY');
        // Tandai animasi insulin selesai
        const updated = updateActiveProfile({ insulinAnimationCompleted: true });
        if (updated) setActiveProfile(updated);
      }
    }
  };

  const handleReplayStage = () => {
    setIsPlaying(true);
    setStageKey(prev => prev + 1);
  };

  const handleRestartAllStages = () => {
    handleNavigateScreen('STAGE_1');
  };

  const handleOpenSourceModal = (sourceId?: string) => {
    setSelectedSourceId(sourceId);
    setIsSourcesOpen(true);
  };

  // Selesaikan Tahap 1 (Materi Umum Hormon)
  const handleCompleteGeneralHormone = () => {
    const updated = updateActiveProfile({ hormoneGeneralCompleted: true });
    if (updated) setActiveProfile(updated);
    setAppView('HORMONE_MAP');
  };

  // Menuju Tahap 2 dari Tahap 1
  const handleProceedToInsulinFromGeneral = () => {
    const updated = updateActiveProfile({ hormoneGeneralCompleted: true });
    if (updated) setActiveProfile(updated);
    setCurrentScreen('STAGE_1');
    setAppView('STAGE_2_INSULIN_ANIMATION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Menuju Tahap 3 Post-Test dari Rangkuman Animasi
  const handleProceedToPostTestFromSummary = () => {
    const updated = updateActiveProfile({ insulinAnimationCompleted: true });
    if (updated) setActiveProfile(updated);
    setAppView('STAGE_3_POST_TEST');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Deteksi modul Hormon (termasuk materi umum, animasi insulin & post-test) vs Halaman Utama Biokimia
  const isHormoneView = 
    appView === 'HORMONE_MAP' ||
    appView === 'STAGE_1_GENERAL_HORMONE' ||
    appView === 'STAGE_2_INSULIN_ANIMATION' ||
    appView === 'STAGE_3_POST_TEST';

  // Gambar 1: Background halaman utama yang menampilkan seluruh materi Biokimia (Portal & Auth)
  // Gambar 2: Background khusus ketika pengguna membuka materi Hormon, termasuk bagian hormon insulin
  const activeBgImage = isHormoneView
    ? "url('/ChatGPT%20Image%20Sep%206,%202026,%2003_48_41%20AM.png'), url('/bg-hormone.png')"
    : "url('/ChatGPT%20Image%20Sep%206,%202026,%2003_47_23%20AM.png'), url('/bg-biochemistry.png')";

  return (
    <div className={`min-h-screen text-[#3E3E3E] flex flex-col font-sans selection:bg-[#CB997E]/30 selection:text-[#3E3E3E] relative ${
      reduceMotion ? 'motion-reduce' : ''
    }`}>
      {/* Pembungkus Background Utama dengan overflow: hidden (mencegah scrollbar & layout shift) */}
      <div 
        id="app-page-background"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Layer 1: Background Image dengan Cinematic Slow Movement (scale 1.00 -> 1.06, slow pan, 30s ease-in-out alternate) */}
        {/* Inset negatif (-inset-[4%]) memastikan gambar tidak pernah memperlihatkan ruang kosong saat bergeser & zoom */}
        <div 
          id="app-animated-bg-layer"
          className={`absolute -top-[4%] -bottom-[4%] -left-[4%] -right-[4%] transition-[background-image] duration-700 ease-in-out will-change-transform ${
            reduceMotion ? 'motion-reduce-bg' : 'animate-cinematic-bg'
          }`}
          style={{
            backgroundImage: activeBgImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Layer 2: Efek Cahaya Lembut Ambient (radial gradient, max opacity <= 0.12, tenang tanpa kedip/neon) */}
        <div 
          id="app-ambient-light-layer"
          className={`absolute inset-0 pointer-events-none will-change-[opacity,transform] ${
            reduceMotion ? 'opacity-[0.04]' : 'animate-ambient-glow'
          }`}
          style={{
            background: isHormoneView
              ? 'radial-gradient(circle at 48% 40%, rgba(245, 158, 11, 0.12) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)'
              : 'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.11) 0%, rgba(245, 158, 11, 0.08) 45%, transparent 75%)',
          }}
        />

        {/* Layer 3: Partikel Cahaya Mikro (12 partikel, opacity rendah, gerak lambat, tidak interaktif, di bawah panel) */}
        <div 
          id="app-particles-container"
          className={`absolute inset-0 pointer-events-none overflow-hidden ${
            reduceMotion ? 'hidden' : ''
          }`}
        >
          {BACKGROUND_PARTICLES.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-particle-drift pointer-events-none"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: isHormoneView ? '#FDE047' : '#BAE6FD',
                boxShadow: isHormoneView
                  ? '0 0 6px 1px rgba(253, 224, 71, 0.45)'
                  : '0 0 6px 1px rgba(186, 230, 253, 0.45)',
                animationDelay: particle.delay,
                // Variabel CSS untuk durasi, arah geser, dan opacity dasar
                ['--p-dur' as any]: particle.duration,
                ['--p-dx' as any]: particle.dx,
                ['--p-dy' as any]: particle.dy,
                ['--p-base-op' as any]: particle.opacity,
              }}
            />
          ))}
        </div>
      </div>

      {/* Panel Putih Semi-Transparan untuk Seluruh Konten Aplikasi */}
      <div 
        id="app-content-panel"
        className="min-h-screen flex flex-col flex-1 w-full relative z-10"
        style={{
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      >
        {/* Header Utama Navigasi Portal & Mahasiswa */}
        {activeProfile && appView !== 'STUDENT_AUTH' && (
          <Header
            appView={appView}
            onNavigateAppView={handleNavigateAppView}
            activeProfile={activeProfile}
            onOpenProgressModal={() => setIsProgressModalOpen(true)}
            onSwitchProfile={handleSwitchProfile}
            currentScreen={currentScreen}
            onNavigateScreen={handleNavigateScreen}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            reduceMotion={reduceMotion}
            setReduceMotion={setReduceMotion}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
            onOpenSources={() => {
              setSelectedSourceId(undefined);
              setIsSourcesOpen(true);
            }}
          />
        )}

      {/* Konten Utama Aplikasi */}
      <main className={`flex-1 w-full mx-auto transition-all ${
        appView === 'STAGE_2_INSULIN_ANIMATION' && currentScreen === 'STAGE_7'
          ? 'max-w-full px-2 sm:px-4 lg:px-6 py-2 pb-20'
          : 'max-w-6xl px-4 sm:px-6 py-6 pb-28'
      }`}>
        
        {/* TAMPILAN 1: OTENTIKASI / INPUT MAHASISWA TANPA PASSWORD */}
        {(!activeProfile || appView === 'STUDENT_AUTH') && (
          <StudentAuthView onAuthSuccess={handleAuthSuccess} />
        )}

        {/* TAMPILAN 2: BERANDA PORTAL (PETA 7 MODUL BIOKIMIA) */}
        {activeProfile && appView === 'PORTAL_HOME' && (
          <PortalHomeView
            profile={activeProfile}
            onOpenHormoneModule={() => setAppView('HORMONE_MAP')}
            onSelectHormoneModule={() => setAppView('HORMONE_MAP')}
            onOpenCarbohydrateModule={() => setAppView('CARBOHYDRATE_MODULE')}
            onOpenProgressModal={() => setIsProgressModalOpen(true)}
            onLogout={handleSwitchProfile}
            onSwitchProfile={handleSwitchProfile}
          />
        )}

        {/* TAMPILAN 3: PETA MODUL HORMON (TAHAP 1, 2, 3) */}
        {activeProfile && appView === 'HORMONE_MAP' && (
          <HormoneMapView
            profile={activeProfile}
            onSelectTahap1={() => setAppView('STAGE_1_GENERAL_HORMONE')}
            onSelectTahap2={() => {
              setCurrentScreen('STAGE_1');
              setAppView('STAGE_2_INSULIN_ANIMATION');
            }}
            onSelectTahap3={() => setAppView('STAGE_3_POST_TEST')}
            onBackToPortal={() => setAppView('PORTAL_HOME')}
            onOpenProgressModal={() => setIsProgressModalOpen(true)}
          />
        )}

        {/* TAMPILAN 4: TAHAP 1 — MATERI UMUM HORMON (8 SUBTOPIK) */}
        {activeProfile && appView === 'STAGE_1_GENERAL_HORMONE' && (
          <GeneralHormoneView
            onCompleteTahap1={handleProceedToInsulinFromGeneral}
            onCompleteStage={handleCompleteGeneralHormone}
            onProceedToInsulinAnimation={handleProceedToInsulinFromGeneral}
            onBackToMap={() => setAppView('HORMONE_MAP')}
          />
        )}

        {/* TAMPILAN 5: TAHAP 2 — ANIMASI KIMIA PERJALANAN INSULIN (8 TAHAP + RANGKUMAN) */}
        {activeProfile && appView === 'STAGE_2_INSULIN_ANIMATION' && (
          <div className="space-y-6">
            {/* Header Tahap Animasi Insulin */}
            {currentStageNumber !== null && (
              <StageHeader
                stageNumber={currentStageNumber}
                onSelectStage={(num) => handleNavigateScreen(`STAGE_${num}` as ScreenId)}
              />
            )}

            {/* View Switcher Tahap 1 - 8 & Rangkuman */}
            <div key={currentStageNumber ? `stage-${currentStageNumber}-${stageKey}` : currentScreen}>
              {currentScreen === 'STAGE_1' && (
                <Stage1View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {currentScreen === 'STAGE_2' && (
                <Stage2View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {currentScreen === 'STAGE_3' && (
                <Stage3View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {currentScreen === 'STAGE_4' && (
                <Stage4View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {currentScreen === 'STAGE_5' && (
                <Stage5View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {currentScreen === 'STAGE_6' && (
                <Stage6View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {currentScreen === 'STAGE_7' && (
                <Stage7View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {currentScreen === 'STAGE_8' && (
                <Stage8View
                  isPlaying={isPlaying}
                  speed={speed}
                  captionsEnabled={captionsEnabled}
                  reduceMotion={reduceMotion}
                  soundEnabled={soundEnabled}
                  onOpenSourceModal={handleOpenSourceModal}
                />
              )}

              {(currentScreen === 'STAGE_9' || currentScreen === 'SUMMARY') && (
                <SummaryView
                  onRestartAnimation={handleRestartAllStages}
                  onGoHome={() => setAppView('HORMONE_MAP')}
                  onProceedToPostTest={handleProceedToPostTestFromSummary}
                  onOpenSources={() => {
                    setSelectedSourceId(undefined);
                    setIsSourcesOpen(true);
                  }}
                  onOpenGlossary={() => setIsGlossaryOpen(true)}
                />
              )}
            </div>
          </div>
        )}

        {/* TAMPILAN 6: TAHAP 3 — POST-TEST HORMON & INSULIN */}
        {activeProfile && appView === 'STAGE_3_POST_TEST' && (
          <PostTestView
            profile={activeProfile}
            onFinishTest={() => {
              const profile = getActiveProfile();
              if (profile) setActiveProfile(profile);
            }}
            onBackToMap={() => setAppView('HORMONE_MAP')}
            onProfileUpdated={(updated) => setActiveProfile(updated)}
          />
        )}

        {/* TAMPILAN 7: MODUL LENGKAP METABOLISME KARBOHIDRAT */}
        {activeProfile && appView === 'CARBOHYDRATE_MODULE' && (
          <CarbohydrateModuleView
            profile={activeProfile}
            onProfileUpdated={(updated) => setActiveProfile(updated)}
            onBackToPortal={() => setAppView('PORTAL_HOME')}
          />
        )}

      </main>

      {/* Floating Bottom Timeline Control (Hanya aktif di Tahap 2 Animasi 1 - 8) */}
      {appView === 'STAGE_2_INSULIN_ANIMATION' && currentStageNumber !== null && (
        <TimelineControl
          currentStage={currentStageNumber}
          onPrevStage={handlePrevStage}
          onNextStage={handleNextStage}
          onReplayStage={handleReplayStage}
          onRestartAll={handleRestartAllStages}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(prev => !prev)}
          speed={speed}
          onChangeSpeed={setSpeed}
          captionsEnabled={captionsEnabled}
          onToggleCaptions={() => setCaptionsEnabled(prev => !prev)}
        />
      )}
      </div>

      {/* Modal Dialog Global */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => {
          setIsSourcesOpen(false);
          setSelectedSourceId(undefined);
        }}
        highlightedSourceId={selectedSourceId}
      />

      {activeProfile && (
        <StudentProgressModal
          isOpen={isProgressModalOpen}
          onClose={() => setIsProgressModalOpen(false)}
          profile={activeProfile}
        />
      )}

    </div>
  );
}

export default App;
