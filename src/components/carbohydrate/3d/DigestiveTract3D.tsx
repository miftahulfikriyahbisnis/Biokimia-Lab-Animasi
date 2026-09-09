/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  Sparkles, 
  Layers, 
  Activity, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SagittalHeadAnatomy } from './SagittalHeadAnatomy';
import { BrushBorder3D } from './BrushBorder3D';
import { AbsorptionBlood3D } from './AbsorptionBlood3D';
import { RICE_JOURNEY_STAGES } from '../../../data/carbohydrateData';

interface DigestiveTract3DProps {
  currentStep: number; // 1 to 9
  isPlaying: boolean;
  speed: number;
  showLabels?: boolean;
  isZoomedView?: boolean;
  onToggleZoom?: () => void;
}

/**
 * Camera controller that delivers smooth ~1s transitions between stages
 * and remains steady thereafter, keeping the sagittal profile in clear anatomical focus.
 */
const CameraController: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const { camera } = useThree();
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    switch (currentStep) {
      case 1:
        // Mouth fills 45-55% of canvas, sagittal view of profile, lips, jaw, tongue
        targetPos.set(-1.0, 1.45, 2.9);
        targetLook.set(-1.0, 1.45, 0);
        break;
      case 2:
        // Oral cavity focus: Saliva and salivary amylase cleaving starch
        targetPos.set(-1.0, 1.45, 2.9);
        targetLook.set(-1.0, 1.45, 0);
        break;
      case 3:
        // Bolus formation on dorsum of tongue moving towards oropharynx
        targetPos.set(-0.90, 1.40, 3.0);
        targetLook.set(-0.90, 1.40, 0);
        break;
      case 4:
        // Swallowing: Oropharynx, epiglottis closing trachea (blue), bolus entering esophagus (pink)
        targetPos.set(-0.55, 1.05, 3.2);
        targetLook.set(-0.55, 1.05, 0);
        break;
      case 5:
        // Peristalsis: Esophageal muscular tube descent towards stomach
        targetPos.set(-0.28, 0.05, 3.8);
        targetLook.set(-0.28, 0.05, 0);
        break;
      case 6:
        // Stomach: J-shaped pouch, churning motility, gastric acid
        targetPos.set(-0.15, -1.75, 3.2);
        targetLook.set(-0.15, -1.75, 0);
        break;
      case 7:
        // Duodenum & Pancreas: Pancreatic duct and amylase secretion
        targetPos.set(0.10, -2.15, 2.8);
        targetLook.set(0.10, -2.15, 0);
        break;
      case 8:
        // Brush Border: Microvilli lawn, membrane enzymes, glucose liberation
        targetPos.set(0, 0, 3.4);
        targetLook.set(0, 0, 0);
        break;
      case 9:
        // Absorption: Enterocyte transporters, capillary, portal vein
        targetPos.set(0, 0, 3.4);
        targetLook.set(0, 0, 0);
        break;
      default:
        targetPos.set(-1.0, 1.45, 2.9);
        targetLook.set(-1.0, 1.45, 0);
    }

    // Smooth transition over ~1 second, then stays stationary
    camera.position.lerp(targetPos, delta * 3.2);
    camera.lookAt(targetLook);
  });

  return null;
};

export const DigestiveTract3D: React.FC<DigestiveTract3DProps> = ({
  currentStep = 1,
  isPlaying,
  speed
}) => {
  // Retrieve current stage metadata from RICE_JOURNEY_STAGES
  const activeStage = RICE_JOURNEY_STAGES[currentStep - 1] || RICE_JOURNEY_STAGES[0];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      
      {/* Canvas 3D Viewport */}
      <div className="relative w-full h-[380px] sm:h-[420px] bg-[#FAF8F5] rounded-2xl overflow-hidden">
        
        {/* Subtle Phase Indicator Top Left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E2D9] shadow-xs text-xs font-medium text-[#3E3E3E]">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Tahap {activeStage.step}: {activeStage.organ}</span>
        </div>

        {/* Three.js Canvas */}
        <Canvas
          camera={{ position: [-1.0, 1.45, 2.9], fov: 45 }}
          className="w-full h-full"
        >
          {/* Anatomical Studio Lighting */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 5, 4]} intensity={1.2} />
          <directionalLight position={[-4, 3, 2]} intensity={0.8} />
          <pointLight position={[0, 1, 3]} intensity={0.5} />

          {/* Smooth Camera Controller */}
          <CameraController currentStep={currentStep} />

          {/* Conditional 3D Scenes */}
          {currentStep <= 7 && (
            <SagittalHeadAnatomy
              currentStep={currentStep}
              isPlaying={isPlaying}
              speed={speed}
            />
          )}

          {currentStep === 8 && (
            <BrushBorder3D
              isPlaying={isPlaying}
              speed={speed}
            />
          )}

          {currentStep === 9 && (
            <AbsorptionBlood3D
              isPlaying={isPlaying}
              speed={speed}
            />
          )}
        </Canvas>
      </div>

      {/* Structured Bottom Panel below Canvas (Strictly No Floating Text on Anatomy) */}
      <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E5E2D9] shadow-xs space-y-3 text-xs">
        
        {/* Header: Stage Name & Location */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E2D9]/70 pb-2.5">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
              Nama Tahap
            </span>
            <h4 className="font-serif font-bold text-sm text-[#3E3E3E]">
              {activeStage.title}
            </h4>
          </div>
          <div className="px-3 py-1 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] text-[#706B5C] font-semibold text-[11px]">
            📍 Lokasi: <span className="text-[#3E3E3E]">{activeStage.locationDetail}</span>
          </div>
        </div>

        {/* 3-Column Biochemical Data: Substrat, Enzim, Produk Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <span className="font-bold text-amber-900 block text-[10px] uppercase tracking-wide">
              Substrat:
            </span>
            <p className="text-amber-800 font-medium mt-0.5">
              {activeStage.substrates.join(', ')}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-200/60">
            <span className="font-bold text-cyan-900 block text-[10px] uppercase tracking-wide">
              Enzim:
            </span>
            <p className="text-cyan-800 font-medium mt-0.5">
              {activeStage.enzymes.join(', ')}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
            <span className="font-bold text-emerald-900 block text-[10px] uppercase tracking-wide">
              Produk Utama:
            </span>
            <p className="text-emerald-800 font-bold mt-0.5">
              {activeStage.products.join(', ')}
            </p>
          </div>
        </div>

        {/* Apa yang Sedang Terjadi */}
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1">
          <span className="font-bold text-[#3E3E3E] text-[10.5px] uppercase tracking-wide flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-600" />
            Apa yang Sedang Terjadi:
          </span>
          <p className="text-[#555] leading-relaxed text-[11px]">
            {activeStage.whatIsHappening || activeStage.mechanism}
          </p>
        </div>

        {/* Pesan Penting */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-[11px]">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950 block text-[11px]">
              Pesan Penting:
            </span>
            <p className="text-amber-900 font-medium leading-relaxed mt-0.5">
              {activeStage.importantMessage || activeStage.simpleExplanation}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
