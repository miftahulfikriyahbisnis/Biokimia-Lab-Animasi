/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Insulin3DStage, InspectableObject } from './types';

interface GlucoseParticles3DProps {
  stage: Insulin3DStage;
  speed: number;
  showLabels: boolean;
  onSelectObject: (obj: InspectableObject) => void;
  selectedObject: InspectableObject;
}

interface GlucoseItem {
  id: number;
  pos: THREE.Vector3;
  basePos: THREE.Vector3;
  speedFactor: number;
  offset: number;
  inCytosol: boolean;
}

export const GlucoseParticles3D: React.FC<GlucoseParticles3DProps> = ({
  stage,
  speed,
  showLabels,
  onSelectObject,
  selectedObject
}) => {
  const isSelected = selectedObject === 'GLUCOSE';
  const groupRef = useRef<THREE.Group>(null);

  // Inisialisasi posisi 24 partikel glukosa di ruang ekstraseluler
  const particles = useMemo<GlucoseItem[]>(() => {
    const list: GlucoseItem[] = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      // Sebarkan di y: 1.3 s.d 3.7, x: -3.8 s.d 3.8, z: -1.7 s.d 1.7
      const x = (Math.random() - 0.5) * 7.6;
      const y = 1.3 + Math.random() * 2.3;
      const z = (Math.random() - 0.5) * 3.4;
      const basePos = new THREE.Vector3(x, y, z);
      list.push({
        id: i,
        pos: basePos.clone(),
        basePos,
        speedFactor: 0.6 + Math.random() * 0.8,
        offset: Math.random() * 10,
        inCytosol: false
      });
    }
    return list;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed;

    particles.forEach((p, idx) => {
      if (stage < 7) {
        // Brown-like float di ruang ekstraseluler
        p.pos.x = p.basePos.x + Math.sin(time * p.speedFactor + p.offset) * 0.35;
        // Jaga agar tetap di atas membran (y >= 1.0)
        p.pos.y = Math.max(1.05, p.basePos.y + Math.cos(time * 0.8 + p.offset) * 0.3);
        p.pos.z = p.basePos.z + Math.sin(time * 0.7 + p.offset) * 0.35;
      } else {
        // TAHAP 7: Glukosa masuk melalui saluran GLUT4 (terletak di x: 2.2, z: 0)
        // Partikel yang gilirannya masuk akan diarahkan ke saluran GLUT4 lalu ke sitosol
        const cycleDuration = 3.5 / speed;
        const cycleProgress = ((time * p.speedFactor * 0.5 + idx * 0.25) % cycleDuration) / cycleDuration;

        if (idx % 2 === 0 || idx < 14) {
          // Partikel yang mengalir melewati GLUT4
          if (cycleProgress < 0.35) {
            // Bergerak mendekati corong atas GLUT4 (x: 2.2, y: 0.85, z: 0)
            const alpha = cycleProgress / 0.35;
            p.pos.x = THREE.MathUtils.lerp(p.basePos.x, 2.2 + (Math.random() - 0.5) * 0.25, alpha);
            p.pos.y = THREE.MathUtils.lerp(p.basePos.y, 0.85, alpha);
            p.pos.z = THREE.MathUtils.lerp(p.basePos.z, 0, alpha);
          } else if (cycleProgress < 0.6) {
            // Melintasi porus GLUT4 (dari y: 0.85 menuju y: -0.85)
            const alpha = (cycleProgress - 0.35) / 0.25;
            p.pos.x = 2.2 + Math.sin(alpha * Math.PI) * 0.05;
            p.pos.y = THREE.MathUtils.lerp(0.85, -0.85, alpha);
            p.pos.z = 0;
          } else {
            // Masuk dan menyebar di dalam sitosol (-y)
            const alpha = (cycleProgress - 0.6) / 0.4;
            p.pos.x = THREE.MathUtils.lerp(2.2, 2.2 + (idx % 2 === 0 ? 1 : -1) * (alpha * 2.8), alpha);
            p.pos.y = THREE.MathUtils.lerp(-0.85, -2.4 - (idx % 3) * 0.6, alpha);
            p.pos.z = THREE.MathUtils.lerp(0, (idx % 4 - 1.5) * 1.2, alpha);
          }
        } else {
          // Sisa glukosa di darah yang berkurang kepadatannya
          p.pos.x = p.basePos.x + Math.sin(time + p.offset) * 0.15;
          p.pos.y = p.basePos.y;
          p.pos.z = p.basePos.z;
        }
      }
    });

    // Update child meshes
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, idx) => {
        const p = particles[idx];
        if (p) {
          mesh.position.copy(p.pos);
        }
      });
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelectObject('GLUCOSE');
      }}
    >
      {/* Label 3D HTML */}
      {showLabels && (
        <Html position={[0, 3.6, 0]} center distanceFactor={16}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectObject('GLUCOSE');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight shadow-lg border backdrop-blur-xs whitespace-nowrap cursor-pointer transition-all ${
              isSelected
                ? 'bg-amber-600 text-white border-white ring-2 ring-amber-500'
                : 'bg-white/95 text-amber-800 border-amber-300'
            }`}
          >
            Glukosa (Darah) {stage === 7 ? '— Mengalir Masuk Melalui GLUT4' : ''}
          </div>
        </Html>
      )}

      {/* Wadah Mesh Partikel Glukosa Diperbesar ~3x Lipat */}
      <group ref={groupRef}>
        {particles.map((p) => (
          <mesh key={p.id} position={[p.pos.x, p.pos.y, p.pos.z]}>
            <sphereGeometry args={[0.34, 16, 16]} />
            <meshStandardMaterial
              color={isSelected ? '#F59E0B' : '#FBBF24'}
              emissive="#F59E0B"
              emissiveIntensity={0.65}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
