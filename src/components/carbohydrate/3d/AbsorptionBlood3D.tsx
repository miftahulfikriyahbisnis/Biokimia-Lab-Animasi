/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AbsorptionBlood3DProps {
  isPlaying: boolean;
  speed: number;
}

export const AbsorptionBlood3D: React.FC<AbsorptionBlood3DProps> = ({
  isPlaying,
  speed
}) => {
  const timeRef = useRef(0);
  const glucoseTransRef = useRef<THREE.Group>(null);
  const rbcGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    timeRef.current += delta * speed;
    const t = timeRef.current;

    // Movement of glucose from lumen (top) -> SGLT1 -> cytoplasm -> GLUT2 -> capillary (bottom)
    if (glucoseTransRef.current) {
      const cycle = (t * 0.4) % 1;
      // 0 to 0.35: lumen to apical SGLT1
      // 0.35 to 0.70: cytoplasm to basolateral GLUT2
      // 0.70 to 1.0: into capillary bloodstream
      const y = THREE.MathUtils.lerp(1.2, -1.2, cycle);
      glucoseTransRef.current.position.y = y;
    }

    // Red blood cells flowing in mesenteric capillary towards hepatic portal vein
    if (rbcGroupRef.current) {
      rbcGroupRef.current.position.x = (t * 0.8) % 4 - 2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. INTESTINAL LUMEN (TOP ZONE) */}
      <mesh position={[0, 1.3, 0]}>
        <planeGeometry args={[4.8, 0.6]} />
        <meshBasicMaterial color="#FEF3C7" transparent opacity={0.3} />
      </mesh>

      {/* 2. APICAL MEMBRANE WITH TRANSPORTERS (SGLT1, GLUT5) */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[4.8, 0.12, 0.5]} />
        <meshStandardMaterial color="#FB7185" roughness={0.4} />
      </mesh>

      {/* SGLT1 Transporter (Glucose + Na+ Symport) */}
      <group position={[-0.8, 0.95, 0.12]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.22, 16]} />
          <meshStandardMaterial color="#0284C7" roughness={0.3} />
        </mesh>
      </group>

      {/* GLUT5 Transporter (Fructose Facilitated Diffusion) */}
      <group position={[0.8, 0.95, 0.12]}>
        <mesh>
          <cylinderGeometry args={[0.10, 0.10, 0.22, 16]} />
          <meshStandardMaterial color="#0D9488" roughness={0.3} />
        </mesh>
      </group>

      {/* 3. ENTEROCYTE CYTOPLASM (MIDDLE ZONE) */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.8, 1.55, 0.45]} />
        <meshStandardMaterial color="#FFE4E6" transparent opacity={0.5} roughness={0.6} />
      </mesh>

      {/* Cell Nucleus */}
      <mesh position={[1.4, 0.1, 0.05]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#F43F5E" roughness={0.5} transparent opacity={0.7} />
      </mesh>

      {/* 4. BASOLATERAL MEMBRANE WITH GLUT2 */}
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[4.8, 0.12, 0.5]} />
        <meshStandardMaterial color="#FB7185" roughness={0.4} />
      </mesh>

      {/* GLUT2 Transporter (Glucose, Galactose, Fructose Efflux) */}
      <group position={[0, -0.75, 0.12]}>
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 0.22, 16]} />
          <meshStandardMaterial color="#7C3AED" roughness={0.3} />
        </mesh>
      </group>

      {/* 5. CAPILLARY BLOOD VESSEL (MESENTERIC CAPILLARY TO PORTAL VEIN) */}
      <group position={[0, -1.35, 0.1]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 4.8, 24]} />
          <meshStandardMaterial
            color="#BE123C"
            transparent
            opacity={0.75}
            roughness={0.3}
          />
        </mesh>

        {/* Erythrocytes (Biconcave Red Blood Cells) Flowing to Liver */}
        <group ref={rbcGroupRef}>
          {[-1.5, -0.8, -0.1, 0.6, 1.3].map((x, i) => (
            <mesh key={i} position={[x, (i % 2 === 0 ? 0.08 : -0.08), 0]} rotation={[0.3, 0.2, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.045, 16]} />
              <meshStandardMaterial color="#E11D48" roughness={0.2} metalness={0.1} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 6. GLUCOSE MOLECULE IN TRANSIT (Lumen -> SGLT1 -> GLUT2 -> Blood) */}
      <group ref={glucoseTransRef} position={[-0.8, 1.2, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 6]} />
          <meshStandardMaterial
            color="#FBBF24"
            emissive="#F59E0B"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};
