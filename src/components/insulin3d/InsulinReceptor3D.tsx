/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Insulin3DStage, InspectableObject } from './types';

interface InsulinReceptor3DProps {
  stage: Insulin3DStage;
  showLabels: boolean;
  onSelectObject: (obj: InspectableObject) => void;
  selectedObject: InspectableObject;
}

export const InsulinReceptor3D: React.FC<InsulinReceptor3DProps> = ({
  stage,
  showLabels,
  onSelectObject,
  selectedObject
}) => {
  const isSelected = selectedObject === 'RECEPTOR';
  const isBound = stage >= 3;
  const isSignaling = stage === 4;

  const glowRef = useRef<THREE.Mesh>(null);
  const pulseRingsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (glowRef.current && isBound) {
      const scale = 1 + Math.sin(t * 4) * 0.08;
      glowRef.current.scale.set(scale, scale, scale);
    }
    if (pulseRingsRef.current && isSignaling) {
      pulseRingsRef.current.children.forEach((child, i) => {
        const offset = (t * 2 + i * 0.7) % 2.0;
        child.position.y = -0.8 - offset * 1.1;
        const scale = 0.4 + offset * 0.8;
        child.scale.set(scale, scale, scale);
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = Math.max(0, 1 - offset / 2.0);
        }
      });
    }
  });

  // Warna reseptor: ungu dingin saat inaktif, emas-amber hangat saat aktif terikat insulin
  const receptorColor = isBound ? '#D97706' : '#7C3AED';
  const emissiveColor = isBound ? '#F59E0B' : '#4C1D95';
  const emissiveIntensity = isBound ? (isSignaling ? 0.9 : 0.6) : 0.2;

  return (
    <group
      position={[-2.4, 0, 0]}
      scale={[2.2, 2.2, 2.2]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectObject('RECEPTOR');
      }}
    >
      {/* Label 3D HTML */}
      {showLabels && (
        <Html position={[0, 1.75, 0]} center distanceFactor={16}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectObject('RECEPTOR');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight shadow-lg border backdrop-blur-xs whitespace-nowrap cursor-pointer transition-all ${
              isSelected
                ? 'bg-[#8E24AA] text-white border-white ring-2 ring-[#8E24AA]'
                : isBound
                ? 'bg-amber-500 text-white border-amber-300'
                : 'bg-white/95 text-[#3E3E3E] border-[#E5E2D9]'
            }`}
          >
            Reseptor Insulin {isBound ? '(Aktif - Terfosforilasi)' : ''}
          </div>
        </Html>
      )}

      {/* 1. DOMAIN EKSTRASELULER (Subunit α: Kantung Pengikat Insulin) */}
      <group position={[0, 0.7, 0]}>
        {/* Lengan Kiri Subunit α */}
        <mesh position={[-0.24, 0.45, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.14, 0.16, 0.7, 16]} />
          <meshStandardMaterial
            color={receptorColor}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            roughness={0.3}
          />
        </mesh>
        {/* Lengan Kanan Subunit α */}
        <mesh position={[0.24, 0.45, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.14, 0.16, 0.7, 16]} />
          <meshStandardMaterial
            color={receptorColor}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            roughness={0.3}
          />
        </mesh>
        {/* Celah Pengikatan di Atas */}
        <mesh position={[0, 0.82, 0]}>
          <torusGeometry args={[0.26, 0.08, 12, 24]} />
          <meshStandardMaterial
            color={isBound ? '#FBBF24' : '#9333EA'}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity + 0.2}
          />
        </mesh>
      </group>

      {/* 2. DOMAIN TRANSMEMBRAN (Dua Heliks Melintasi Membran) */}
      <mesh position={[-0.14, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.7, 12]} />
        <meshStandardMaterial color="#6D28D9" roughness={0.4} />
      </mesh>
      <mesh position={[0.14, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.7, 12]} />
        <meshStandardMaterial color="#6D28D9" roughness={0.4} />
      </mesh>

      {/* 3. DOMAIN INTRASELULER (Subunit β: Tirosin Kinase di Sitosol) */}
      <group position={[0, -0.65, 0]}>
        {/* Badan Tirosin Kinase */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.25, 0.4, 8, 16]} />
          <meshStandardMaterial
            color={receptorColor}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            roughness={0.3}
          />
        </mesh>

        {/* Residu Tirosin Terfosforilasi (Gugus Fosfat Menyala Saat Aktif) */}
        {isBound && (
          <group>
            {/* Fosfat 1 */}
            <mesh position={[-0.32, -0.15, 0.15]}>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial
                color="#F59E0B"
                emissive="#FDE047"
                emissiveIntensity={1}
                roughness={0.2}
              />
            </mesh>
            {/* Fosfat 2 */}
            <mesh position={[0.32, -0.15, 0.15]}>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial
                color="#F59E0B"
                emissive="#FDE047"
                emissiveIntensity={1}
                roughness={0.2}
              />
            </mesh>
            {/* Fosfat 3 */}
            <mesh position={[0, -0.38, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial
                color="#F59E0B"
                emissive="#FDE047"
                emissiveIntensity={1.2}
                roughness={0.2}
              />
            </mesh>
          </group>
        )}
      </group>

      {/* Efek Cahaya / Glow Aura Saat Terikat */}
      {isBound && (
        <mesh ref={glowRef} position={[0, 0.3, 0]}>
          <sphereGeometry args={[1.0, 16, 16]} />
          <meshBasicMaterial
            color="#F59E0B"
            transparent
            opacity={isSignaling ? 0.35 : 0.2}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Pulsa Cahaya Menuju Sitoplasma (Tahap 4) */}
      {isSignaling && (
        <group ref={pulseRingsRef} position={[0, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.15, 0.28, 24]} />
            <meshBasicMaterial color="#FBBF24" transparent opacity={0.8} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.15, 0.28, 24]} />
            <meshBasicMaterial color="#FBBF24" transparent opacity={0.8} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.15, 0.28, 24]} />
            <meshBasicMaterial color="#FBBF24" transparent opacity={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
};
