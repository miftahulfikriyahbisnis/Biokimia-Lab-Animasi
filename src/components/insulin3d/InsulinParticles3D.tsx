/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Insulin3DStage, InspectableObject } from './types';

interface InsulinParticles3DProps {
  stage: Insulin3DStage;
  speed: number;
  showLabels: boolean;
  onSelectObject: (obj: InspectableObject) => void;
  selectedObject: InspectableObject;
}

export const InsulinParticles3D: React.FC<InsulinParticles3DProps> = ({
  stage,
  speed,
  showLabels,
  onSelectObject,
  selectedObject
}) => {
  const isSelected = selectedObject === 'INSULIN';
  const mainInsulinRef = useRef<THREE.Group>(null);
  const secondaryInsulinRef = useRef<THREE.Group>(null);

  // Posisi target reseptor (tempat penempelan insulin di domain alfa ekstraseluler):
  // Reseptor berada di x: -2.4, ketinggian celah di y: ~3.32, z: 0
  const receptorPocket = new THREE.Vector3(-2.4, 3.32, 0);
  const initialInsulinPos = new THREE.Vector3(-4.8, 3.8, 0.5);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime() * speed;

    if (mainInsulinRef.current) {
      if (stage === 1) {
        // Mengambang bebas di pembuluh darah / ruang ekstraseluler
        mainInsulinRef.current.position.x = initialInsulinPos.x + Math.sin(time * 0.8) * 0.4;
        mainInsulinRef.current.position.y = initialInsulinPos.y + Math.cos(time * 0.7) * 0.3;
        mainInsulinRef.current.position.z = initialInsulinPos.z + Math.sin(time * 0.5) * 0.2;
      } else if (stage === 2) {
        // Bergerak mendekati reseptor secara halus
        mainInsulinRef.current.position.lerp(receptorPocket, Math.min(1, delta * 2.5 * speed));
      } else {
        // Stage 3 s.d 7: Menempel kokoh di kantung pengikat reseptor ekstraseluler!
        // Beri sedikit getaran termal mikro
        mainInsulinRef.current.position.x = receptorPocket.x + Math.sin(time * 3) * 0.015;
        mainInsulinRef.current.position.y = receptorPocket.y + Math.cos(time * 3) * 0.015;
        mainInsulinRef.current.position.z = receptorPocket.z;
      }
    }

    if (secondaryInsulinRef.current) {
      // Molekul insulin kedua yang beredar bebas di kejauhan
      secondaryInsulinRef.current.position.x = 2.8 + Math.sin(time * 0.6) * 0.5;
      secondaryInsulinRef.current.position.y = 3.2 + Math.cos(time * 0.5) * 0.3;
      secondaryInsulinRef.current.position.z = -1.2 + Math.sin(time * 0.4) * 0.4;
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelectObject('INSULIN');
      }}
    >
      {/* 1. MOLEKUL INSULIN UTAMA (Yang Mengikat Reseptor) */}
      <group ref={mainInsulinRef} position={[-4.8, 3.8, 0.5]}>
        {/* Label 3D HTML */}
        {showLabels && (
          <Html position={[0, 0.95, 0]} center distanceFactor={15}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectObject('INSULIN');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight shadow-lg border backdrop-blur-xs whitespace-nowrap cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#0284C7] text-white border-white ring-2 ring-[#0284C7]'
                  : stage >= 3
                  ? 'bg-sky-500 text-white border-sky-300'
                  : 'bg-white/95 text-[#0369A1] border-[#E5E2D9]'
              }`}
            >
              Hormon Insulin {stage >= 3 ? '(Terikat di Reseptor)' : ''}
            </div>
          </Html>
        )}

        {/* Struktur Sederhana Dua Rantai Peptida Insulin (Rantai A & B) Diperbesar 3x lipat */}
        <group scale={2.25}>
          {/* Rantai A (Biru Muda Sian) */}
          <mesh position={[-0.12, 0.08, 0]}>
            <capsuleGeometry args={[0.13, 0.22, 8, 16]} />
            <meshStandardMaterial
              color={isSelected ? '#38BDF8' : '#00D8F6'}
              emissive="#00B4D8"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>

          {/* Rantai B (Biru Pekat) */}
          <mesh position={[0.12, -0.06, 0]}>
            <capsuleGeometry args={[0.14, 0.28, 8, 16]} />
            <meshStandardMaterial
              color={isSelected ? '#0284C7' : '#0077B6'}
              emissive="#03045E"
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>

          {/* Ikatan Disulfida Sederhana (Jembatan Emas S-S) */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.04, 0.04, 0.26, 8]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.5} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* 2. MOLEKUL INSULIN SEKUNDER (Beredar Bebas di Pembuluh) Diperbesar 3x lipat */}
      <group ref={secondaryInsulinRef} position={[2.8, 3.2, -1.2]} scale={1.65}>
        <mesh position={[-0.1, 0.06, 0]}>
          <capsuleGeometry args={[0.12, 0.18, 8, 12]} />
          <meshStandardMaterial color="#00D8F6" emissive="#00B4D8" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.1, -0.05, 0]}>
          <capsuleGeometry args={[0.13, 0.22, 8, 12]} />
          <meshStandardMaterial color="#0077B6" />
        </mesh>
      </group>
    </group>
  );
};
