/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Insulin3DStage, InspectableObject } from './types';

interface SignalPathway3DProps {
  stage: Insulin3DStage;
  speed: number;
  showLabels: boolean;
  onSelectObject: (obj: InspectableObject) => void;
  selectedObject: InspectableObject;
}

export const SignalPathway3D: React.FC<SignalPathway3DProps> = ({
  stage,
  speed,
  showLabels,
  onSelectObject,
  selectedObject
}) => {
  const isSelected = selectedObject === 'SIGNAL';
  const isSignaling = stage === 4 || stage === 5;
  const signalParticlesRef = useRef<THREE.Group>(null);

  // Kurva lintasan sinyal dari domain kinase reseptor (-2.4, -1.35, 0) menuju vesikel GLUT4 (2.2, -2.8, 0)
  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-2.4, -1.35, 0),
      new THREE.Vector3(-0.1, -2.5, 0.4),
      new THREE.Vector3(2.2, -2.8, 0)
    );
  }, []);

  // Buat titik-titik partikel sinyal sepanjang kurva
  const particleCount = 18;
  const particleProgress = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => i / particleCount);
  }, [particleCount]);

  useFrame((_, delta) => {
    if (!isSignaling || !signalParticlesRef.current) return;

    signalParticlesRef.current.children.forEach((mesh, idx) => {
      particleProgress[idx] = (particleProgress[idx] + delta * 0.75 * speed) % 1.0;
      const point = curve.getPoint(particleProgress[idx]);
      mesh.position.copy(point);
      const mat = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = Math.sin(particleProgress[idx] * Math.PI) * 0.9;
      }
    });
  });

  if (!isSignaling && !isSelected) return null;

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelectObject('SIGNAL');
      }}
    >
      {/* Label 3D HTML */}
      {showLabels && isSignaling && (
        <Html position={[-0.1, -2.1, 0.2]} center distanceFactor={16}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectObject('SIGNAL');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight shadow-lg border backdrop-blur-xs whitespace-nowrap cursor-pointer transition-all ${
              isSelected
                ? 'bg-amber-600 text-white border-white ring-2 ring-amber-400'
                : 'bg-amber-500/95 text-white border-amber-300'
            }`}
          >
            Sinyal Intraseluler (Penyederhanaan Kaskade)
          </div>
        </Html>
      )}

      {/* Garis Lintasan Putus-Putus */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                curve.getPoints(32).flatMap((p) => [p.x, p.y, p.z])
              ),
              3
            ]}
          />
        </bufferGeometry>
        <lineDashedMaterial
          color="#F59E0B"
          dashSize={0.25}
          gapSize={0.15}
          transparent
          opacity={0.7}
        />
      </line>

      {/* Partikel Pulsa Cahaya yang Bergerak Sepanjang Kurva Diperbesar ~3x Lipat */}
      <group ref={signalParticlesRef}>
        {particleProgress.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshBasicMaterial color="#FDE047" transparent opacity={0.88} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
