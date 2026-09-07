/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Insulin3DStage, InspectableObject } from './types';

interface GLUT4Vesicle3DProps {
  stage: Insulin3DStage;
  speed: number;
  showLabels: boolean;
  onSelectObject: (obj: InspectableObject) => void;
  selectedObject: InspectableObject;
}

export const GLUT4Vesicle3D: React.FC<GLUT4Vesicle3DProps> = ({
  stage,
  speed,
  showLabels,
  onSelectObject,
  selectedObject
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const vesicleMeshRef = useRef<THREE.Mesh>(null);
  const channelGlowRef = useRef<THREE.Mesh>(null);

  const isGlut4Selected = selectedObject === 'GLUT4';
  const isVesicleSelected = selectedObject === 'VESICLE';

  // Target Y position berdasarkan tahap:
  // Stage 1-4: Sitosol dalam (y = -2.8)
  // Stage 5: Sedang bergerak menuju membran (y = -0.8)
  // Stage 6-7: Menyatu di membran (y = 0.0)
  const getTargetY = (st: Insulin3DStage) => {
    if (st <= 4) return -2.8;
    if (st === 5) return -0.8;
    return 0.0;
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY = getTargetY(stage);
    const lerpSpeed = stage === 5 ? 2.5 * speed : 3.5 * speed;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      Math.min(1, delta * lerpSpeed)
    );

    // Animasi denyut halus pada pori saat tahap 6 dan 7 (saluran terbuka)
    if (stage >= 6 && channelGlowRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.08;
      channelGlowRef.current.scale.set(pulse, 1, pulse);
    }
  });

  const isDockedInMembrane = stage >= 6;
  const isMoving = stage === 5;

  return (
    <group
      ref={groupRef}
      position={[2.2, -2.8, 0]}
      scale={[2.2, 2.2, 2.2]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectObject(isDockedInMembrane ? 'GLUT4' : 'VESICLE');
      }}
    >
      {/* Label 3D HTML */}
      {showLabels && (
        <Html position={[0, isDockedInMembrane ? 0.8 : 0.95, 0]} center distanceFactor={16}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectObject('GLUT4');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight shadow-lg border backdrop-blur-xs whitespace-nowrap cursor-pointer transition-all ${
              isGlut4Selected || isVesicleSelected
                ? 'bg-[#1D3557] text-white border-white ring-2 ring-[#1D3557]'
                : isDockedInMembrane
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-white/95 text-[#1D3557] border-[#E5E2D9]'
            }`}
          >
            {isDockedInMembrane
              ? 'GLUT4 – Glucose Transporter Type 4 (Aktif di Membran)'
              : isMoving
              ? 'Vesikel GLUT4 (Translokasi ke Membran)'
              : 'Vesikel GLUT4 (Tersimpan di Sitosol)'}
          </div>
        </Html>
      )}

      {/* 1. KANTONG VESIKEL SEMI-TRANSPARAN (Hanya terlihat jelas saat berada di sitosol / belum menyatu penuh) */}
      {!isDockedInMembrane && (
        <mesh
          ref={vesicleMeshRef}
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectObject('VESICLE');
          }}
        >
          <sphereGeometry args={[0.82, 24, 24]} />
          <meshPhysicalMaterial
            color={isVesicleSelected ? '#2DD4BF' : '#99F6E4'}
            transmission={0.7}
            opacity={0.45}
            transparent
            roughness={0.2}
            ior={1.2}
          />
        </mesh>
      )}

      {/* 2. PROTEIN GLUT4 (Kompleks Transporter 12-Heliks Transmembran) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelectObject('GLUT4');
        }}
      >
        {/* Unit Saluran Utama GLUT4 (Silinder Barel Berlubang di Tengah) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.68, 24, 1, true]} />
          <meshStandardMaterial
            color={isGlut4Selected ? '#1E40AF' : '#1D3557'}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cincin Atas Porus GLUT4 (Menghadap Luar Sel saat di membran) */}
        <mesh position={[0, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.09, 12, 24]} />
          <meshStandardMaterial
            color={isDockedInMembrane ? '#10B981' : '#3B82F6'}
            emissive={isDockedInMembrane ? '#059669' : '#1D4ED8'}
            emissiveIntensity={isDockedInMembrane ? 0.6 : 0.2}
          />
        </mesh>

        {/* Cincin Bawah Porus GLUT4 (Menghadap Sitosol) */}
        <mesh position={[0, -0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.09, 12, 24]} />
          <meshStandardMaterial
            color={isDockedInMembrane ? '#10B981' : '#3B82F6'}
            emissive={isDockedInMembrane ? '#059669' : '#1D4ED8'}
            emissiveIntensity={isDockedInMembrane ? 0.6 : 0.2}
          />
        </mesh>

        {/* Heliks-Heliks Transmembran Sekeliling Dinding GLUT4 */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 0.45;
          const z = Math.sin(rad) * 0.45;
          return (
            <mesh key={`helix_${idx}`} position={[x, 0, z]}>
              <cylinderGeometry args={[0.08, 0.08, 0.68, 8]} />
              <meshStandardMaterial
                color={isDockedInMembrane ? '#047857' : '#1E3A8A'}
                roughness={0.4}
              />
            </mesh>
          );
        })}

        {/* Cahaya Pori Masuk Glukosa saat Menyatu pada Membran */}
        {isDockedInMembrane && (
          <mesh ref={channelGlowRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.7, 16]} />
            <meshBasicMaterial
              color="#34D399"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* Vesikel GLUT4 Cadangan Tambahan di Dalam Sel */}
      {!isDockedInMembrane && (
        <group position={[0.75, -0.65, 0.4]}>
          <mesh>
            <sphereGeometry args={[0.38, 16, 16]} />
            <meshPhysicalMaterial color="#A7F3D0" transmission={0.7} opacity={0.35} transparent />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.32, 12]} />
            <meshStandardMaterial color="#1E3A8A" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
};
