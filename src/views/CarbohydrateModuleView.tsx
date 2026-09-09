/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { updateActiveProfile } from '../utils/storage';
import { CarbohydrateHome } from '../components/carbohydrate/CarbohydrateHome';
import { CarbohydrateTheory } from '../components/carbohydrate/CarbohydrateTheory';
import { CarbohydrateDigestionVideoJourney } from '../components/carbohydrate/CarbohydrateDigestionVideoJourney';
import { CarbohydrateCatabolism } from '../components/carbohydrate/CarbohydrateCatabolism';
import { CarbohydrateAnabolism } from '../components/carbohydrate/CarbohydrateAnabolism';
import { CarbohydrateIntegration } from '../components/carbohydrate/CarbohydrateIntegration';
import { CarbohydratePostTest } from '../components/carbohydrate/CarbohydratePostTest';

type CarbSubSection = 
  | 'HOME' 
  | 'THEORY' 
  | 'RICE_JOURNEY' 
  | 'CATABOLISM' 
  | 'ANABOLISM' 
  | 'INTEGRATION' 
  | 'POST_TEST';

interface CarbohydrateModuleViewProps {
  profile: StudentProfile | null;
  onProfileUpdated: (updated: StudentProfile) => void;
  onBackToPortal: () => void;
}

export const CarbohydrateModuleView: React.FC<CarbohydrateModuleViewProps> = ({
  profile,
  onProfileUpdated,
  onBackToPortal
}) => {
  const [currentSection, setCurrentSection] = useState<CarbSubSection>('HOME');

  // Helper untuk memperbarui progres sub-bagian karbohidrat
  const handleUpdateProgress = (patch: Partial<NonNullable<StudentProfile['carbohydrateProgress']>>) => {
    if (!profile) return;
    const currentProg = profile.carbohydrateProgress || {
      theoryCompleted: false,
      riceJourneyCompleted: false,
      catabolismCompleted: false,
      anabolismCompleted: false,
      integrationCompleted: false,
      postTestCompleted: false,
      highestScore: 0,
      lastAttemptDate: new Date().toISOString()
    };

    const updatedProfile: StudentProfile = {
      ...profile,
      carbohydrateProgress: {
        ...currentProg,
        ...patch,
        lastAttemptDate: new Date().toISOString()
      }
    };

    updateActiveProfile(updatedProfile);
    onProfileUpdated(updatedProfile);
  };

  const handleSavePostTestScore = (score: number) => {
    const currentHighest = profile?.carbohydrateProgress?.highestScore || 0;
    handleUpdateProgress({
      postTestCompleted: true,
      highestScore: Math.max(currentHighest, score)
    });
  };

  return (
    <div className="w-full">
      {/* 1. Beranda Modul Karbohidrat */}
      {currentSection === 'HOME' && (
        <CarbohydrateHome
          profile={profile}
          onNavigateSection={(sec) => setCurrentSection(sec)}
          onBackToPortal={onBackToPortal}
        />
      )}

      {/* 2. Materi Dasar & Struktur 3D Glukosa */}
      {currentSection === 'THEORY' && (
        <CarbohydrateTheory
          isCompleted={!!profile?.carbohydrateProgress?.theoryCompleted}
          onBackToHome={() => setCurrentSection('HOME')}
          onCompleteAndNext={() => {
            handleUpdateProgress({ theoryCompleted: true });
            setCurrentSection('RICE_JOURNEY');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 3. Perjalanan Nasi Menjadi Glukosa (Tiga Video Pembelajaran Bertahap) */}
      {currentSection === 'RICE_JOURNEY' && (
        <CarbohydrateDigestionVideoJourney
          isCompleted={!!profile?.carbohydrateProgress?.riceJourneyCompleted}
          onBackToHome={() => setCurrentSection('HOME')}
          onCompleteAndNext={() => {
            handleUpdateProgress({ riceJourneyCompleted: true });
            setCurrentSection('CATABOLISM');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 4. Peta Katabolisme Karbohidrat (Glikolisis, Nasib Piruvat, DO, Krebs, ETC, ATP) */}
      {currentSection === 'CATABOLISM' && (
        <CarbohydrateCatabolism
          isCompleted={!!profile?.carbohydrateProgress?.catabolismCompleted}
          onBackToHome={() => setCurrentSection('HOME')}
          onCompleteAndNext={() => {
            handleUpdateProgress({ catabolismCompleted: true });
            setCurrentSection('ANABOLISM');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 5. Peta Anabolisme Karbohidrat (Glikogenesis, Glukoneogenesis, Siklus Cori, Lipogenesis, Crossroads) */}
      {currentSection === 'ANABOLISM' && (
        <CarbohydrateAnabolism
          isCompleted={!!profile?.carbohydrateProgress?.anabolismCompleted}
          onBackToHome={() => setCurrentSection('HOME')}
          onCompleteAndNext={() => {
            handleUpdateProgress({ anabolismCompleted: true });
            setCurrentSection('INTEGRATION');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 6. Ringkasan Integrasi Fisiologis: Ke Mana Glukosa Pergi? */}
      {currentSection === 'INTEGRATION' && (
        <CarbohydrateIntegration
          isCompleted={!!profile?.carbohydrateProgress?.integrationCompleted}
          onBackToHome={() => setCurrentSection('HOME')}
          onCompleteAndNext={() => {
            handleUpdateProgress({ integrationCompleted: true });
            setCurrentSection('POST_TEST');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 7. Evaluasi Post-Test Mandiri (20 Soal) & Unduh PDF */}
      {currentSection === 'POST_TEST' && (
        <CarbohydratePostTest
          profile={profile}
          onBackToHome={() => setCurrentSection('HOME')}
          onSaveScore={handleSavePostTestScore}
        />
      )}
    </div>
  );
};
