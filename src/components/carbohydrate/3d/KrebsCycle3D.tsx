/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { KREBS_CYCLE_STEPS } from '../../../data/carbohydrateData';

interface KrebsCycle3DProps {
  currentStep: number; // 1 to 8
  onSelectStep?: (step: number) => void;
  isPlaying: boolean;
  speed: number;
  showLabels?: boolean;
}

function KrebsRing({ currentStep, onSelectStep, isPlaying, speed, showLabels }: {
  currentStep: number;
  onSelectStep?: (step: number) => void;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
}) {
  const ringGroupRef = useRef<THREE.Group>(null);
  const radius = 2.4;

  useFrame((_, delta) => {
    if (isPlaying && ringGroupRef.current) {
      ringGroupRef.current.rotation.z -= delta * 0.15 * speed;
    }
  });

  return (
    <group>
      {/* Matriks Mitokondria Latar Belakang Lingkaran */}
      <mesh position={[0, 0, -0.4]}>
        <circleGeometry args={[3.2, 32]} />
        <meshStandardMaterial color="#FEF3C7" opacity={0.35} transparent />
      </mesh>

      {/* Cincin Jalur Siklus */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[radius, 0.04, 16, 64]} />
        <meshStandardMaterial color="#D97706" opacity={0.6} transparent />
      </mesh>

      <group ref={ringGroupRef}>
        {KREBS_CYCLE_STEPS.map((st, index) => {
          // Posisi melingkar: Step 1 di jam 12 (-π/2) searah jarum jam
          const angle = -Math.PI / 2 + (index / 8) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = -Math.sin(angle) * radius; // invert Y for clockwise
          const isCurrent = currentStep === st.stepNumber;

          // Warna node:
          // Step 1: Campuran Kuning (Asetil-KoA) & Biru (Oksaloasetat)
          // Step 3-4: CO2 rilis
          // Step 5: GTP (Hijau)
          // Step 6: FADH2 (Jingga)
          // Step 8: OAA (Biru)
          let nodeColor = '#D97706';
          if (st.stepNumber === 1) nodeColor = '#EAB308';
          else if (st.stepNumber === 3 || st.stepNumber === 4) nodeColor = '#8B5CF6';
          else if (st.stepNumber === 5) nodeColor = '#10B981';
          else if (st.stepNumber === 6) nodeColor = '#F97316';
          else if (st.stepNumber === 8) nodeColor = '#3B82F6';

          return (
            <group key={st.stepNumber} position={[x, y, 0]}>
              {/* Bulatan Intermediat Reaksi */}
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStep?.(st.stepNumber);
                }}
                scale={isCurrent ? 1.4 : 1}
              >
                <sphereGeometry args={[0.26, 20, 20]} />
                <meshStandardMaterial
                  color={nodeColor}
                  emissive={nodeColor}
                  emissiveIntensity={isCurrent ? 0.7 : 0.2}
                  roughness={0.25}
                />
              </mesh>

              {/* Produk sampingan mengapung (CO2, NADH, FADH2, GTP) */}
              {st.co2Released && (
                <mesh position={[0.35, 0.25, 0]}>
                  <sphereGeometry args={[0.1, 12, 12]} />
                  <meshStandardMaterial color="#6B7280" />
                </mesh>
              )}
              {st.nadhProduced && (
                <mesh position={[-0.35, 0.25, 0]}>
                  <sphereGeometry args={[0.11, 12, 12]} />
                  <meshStandardMaterial color="#8B5CF6" emissive="#7C3AED" emissiveIntensity={0.6} />
                </mesh>
              )}
              {st.fadh2Produced && (
                <mesh position={[0.35, -0.25, 0]}>
                  <sphereGeometry args={[0.11, 12, 12]} />
                  <meshStandardMaterial color="#F97316" emissive="#EA580C" emissiveIntensity={0.6} />
                </mesh>
              )}
              {st.gtpProduced && (
                <mesh position={[0, -0.35, 0]}>
                  <sphereGeometry args={[0.11, 12, 12]} />
                  <meshStandardMaterial color="#22C55E" emissive="#16A34A" emissiveIntensity={0.8} />
                </mesh>
              )}

              {/* Label Tahap */}
              {showLabels && (
                <Html position={[0, isCurrent ? 0.5 : 0.38, 0]} center distanceFactor={8}>
                  <div
                    onClick={() => onSelectStep?.(st.stepNumber)}
                    className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-amber-600 text-white ring-2 ring-amber-300 shadow-md scale-110'
                        : 'bg-black/70 text-white/90 hover:bg-black'
                    }`}
                  >
                    T{st.stepNumber}: {st.product.split('(')[0].trim()}
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>

      {/* Pusat Siklus: Label Matriks Mitokondria & Pelacakan Karbon */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.4, 20, 20]} />
          <meshStandardMaterial color="#B45309" opacity={0.3} transparent />
        </mesh>
        <Html center distanceFactor={8}>
          <div className="text-center pointer-events-none p-1.5 rounded-xl bg-white/90 backdrop-blur-xs border border-amber-200 shadow-xs">
            <span className="text-[10px] font-bold text-amber-900 block">Siklus Krebs</span>
            <span className="text-[8px] text-amber-700 block">2C (Kuning) + 4C (Biru) → 6C</span>
          </div>
        </Html>
      </group>
    </group>
  );
}

export const KrebsCycle3D: React.FC<KrebsCycle3DProps> = ({
  currentStep,
  onSelectStep,
  isPlaying,
  speed,
  showLabels = true
}) => {
  const controlsRef = useRef<any>(null);
  const activeStepData = KREBS_CYCLE_STEPS.find(s => s.stepNumber === currentStep) || KREBS_CYCLE_STEPS[0];

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#FAF8F5']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.1} />
        <directionalLight position={[-4, -4, -3]} intensity={0.4} />

        <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.12}>
          <KrebsRing
            currentStep={currentStep}
            onSelectStep={onSelectStep}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
          />
        </Float>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={3.8}
          maxDistance={9.5}
          rotateSpeed={0.7}
        />
      </Canvas>

      {/* Panel Info Tahap Aktif */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto max-w-md bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#E5E2D9] text-xs shadow-md">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-bold text-[#3E3E3E] text-xs">
            Tahap {activeStepData.stepNumber}: {activeStepData.name}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            {activeStepData.carbonCount} Karbon
          </span>
        </div>
        <p className="text-[11px] text-[#706B5C] leading-relaxed mb-1.5">
          {activeStepData.whyItHappens}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          <span className="font-semibold text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
            Enzim: {activeStepData.enzyme}
          </span>
          {activeStepData.co2Released && (
            <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">Melepas CO₂</span>
          )}
          {activeStepData.nadhProduced && (
            <span className="bg-purple-100 text-purple-700 font-bold px-1.5 py-0.5 rounded">+1 NADH</span>
          )}
          {activeStepData.fadh2Produced && (
            <span className="bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded">+1 FADH₂</span>
          )}
          {activeStepData.gtpProduced && (
            <span className="bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">+1 GTP/ATP</span>
          )}
        </div>
      </div>
    </div>
  );
};
