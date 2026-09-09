/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BrushBorder3DProps {
  isPlaying: boolean;
  speed: number;
}

export const BrushBorder3D: React.FC<BrushBorder3DProps> = ({
  isPlaying,
  speed
}) => {
  const timeRef = useRef(0);
  const glucoseGroupRef = useRef<THREE.Group>(null);
  const disaccharideGroupRef = useRef<THREE.Group>(null);

  // Array of microvilli projections along the apical membrane
  const microvilli = useMemo(() => {
    const list = [];
    for (let x = -2.2; x <= 2.2; x += 0.16) {
      list.push(x);
    }
    return list;
  }, []);

  // Brush border enzymes anchored to the microvillar membrane
  const enzymes = useMemo(() => [
    { name: 'Maltase', x: -1.2, color: '#F59E0B' },
    { name: 'Glucoamylase', x: -0.4, color: '#D97706' },
    { name: 'Isomaltase (α-Dekstrinase)', x: 0.4, color: '#EA580C' },
    { name: 'Sukrase-Isomaltase', x: 1.2, color: '#B45309' }
  ], []);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    timeRef.current += delta * speed;
    const t = timeRef.current;

    if (disaccharideGroupRef.current) {
      // Disaccharides floating downwards toward the brush border enzymes
      const yCycle = (t * 0.5) % 1;
      disaccharideGroupRef.current.position.y = THREE.MathUtils.lerp(1.2, 0.45, yCycle);
      disaccharideGroupRef.current.position.x = Math.sin(t * 1.5) * 0.15;
    }

    if (glucoseGroupRef.current) {
      // Glucose monomers generated and dispersing
      const pulse = 1 + Math.sin(t * 3) * 0.08;
      glucoseGroupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* 1. ENTEROCYTE APICAL CELL MEMBRANE BASE */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[4.8, 0.8, 0.6]} />
        <meshStandardMaterial color="#FDA4AF" roughness={0.5} />
      </mesh>

      {/* 2. BRUSH BORDER MICROVILLI (Dense cylindrical projections) */}
      <group position={[0, -0.3, 0]}>
        {microvilli.map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.35, (idx % 2 === 0 ? 0.05 : -0.05)]}>
            <cylinderGeometry args={[0.045, 0.045, 0.7, 16]} />
            <meshStandardMaterial
              color="#FB7185"
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>
        ))}
      </group>

      {/* 3. MEMBRANE-BOUND ENZYMES (Maltase, Glucoamylase, Isomaltase) */}
      {enzymes.map((enz, i) => (
        <group key={i} position={[enz.x, 0.42, 0.12]}>
          {/* Enzyme Globular Head */}
          <mesh>
            <sphereGeometry args={[0.09, 16, 16, 0, Math.PI * 1.7]} />
            <meshStandardMaterial
              color={enz.color}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          {/* Membrane Anchor Stalk */}
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
            <meshStandardMaterial color="#FBBF24" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 4. APPROACHING SUBSTRATES (Maltosa & Dekstrin) */}
      <group ref={disaccharideGroupRef} position={[0, 1.0, 0.12]}>
        {/* Maltose pairs (2 linked glucose rings) */}
        {[-1.0, -0.2, 0.6].map((x, idx) => (
          <group key={idx} position={[x, 0, 0]}>
            <mesh position={[-0.055, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.03, 6]} />
              <meshStandardMaterial color="#FDE68A" roughness={0.3} />
            </mesh>
            <mesh position={[0.055, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.03, 6]} />
              <meshStandardMaterial color="#FDE68A" roughness={0.3} />
            </mesh>
            {/* α-1,4 bond */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
              <meshStandardMaterial color="#D97706" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. GENERATED GLUCOSE MONOMERS (D-Glukosa Bebas dengan Kilau Emas) */}
      <group ref={glucoseGroupRef} position={[0, 0.15, 0.15]}>
        {[-1.3, -0.9, -0.5, -0.1, 0.3, 0.7, 1.1, 1.5].map((x, idx) => (
          <group key={idx} position={[x, 0.1 + (idx % 2) * 0.12, 0]}>
            <mesh>
              <cylinderGeometry args={[0.055, 0.055, 0.035, 6]} />
              <meshStandardMaterial
                color="#FBBF24"
                emissive="#F59E0B"
                emissiveIntensity={0.5}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Visual Marker for GLUKOSA */}
      <group position={[0, 0.85, 0.15]}>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.6, 0.38]} />
          <meshBasicMaterial color="#1E293B" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.04, 0.06, 16]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
      </group>
    </group>
  );
};
