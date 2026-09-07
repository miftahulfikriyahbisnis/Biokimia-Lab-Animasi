/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { InspectableObject } from './types';

interface CellMembrane3DProps {
  onSelectObject: (obj: InspectableObject) => void;
  selectedObject: InspectableObject;
}

export const CellMembrane3D: React.FC<CellMembrane3DProps> = ({
  onSelectObject,
  selectedObject
}) => {
  const isSelected = selectedObject === 'MEMBRANE';

  // Buat susunan kepala fosfolipid (atas dan bawah)
  const phospholipidHeads = useMemo(() => {
    const heads: { x: number; z: number; key: string }[] = [];
    const stepX = 0.65;
    const stepZ = 0.65;
    for (let x = -4.2; x <= 4.2; x += stepX) {
      for (let z = -1.8; z <= 1.8; z += stepZ) {
        // Beri celah di tengah untuk posisi Reseptor (x ~ -2.4) dan GLUT4 (x ~ 2.2)
        const nearReceptor = Math.hypot(x - (-2.4), z) < 1.15;
        const nearGlut4 = Math.hypot(x - 2.2, z) < 1.35;
        if (!nearReceptor && !nearGlut4) {
          heads.push({ x, z, key: `${x.toFixed(2)}_${z.toFixed(2)}` });
        }
      }
    }
    return heads;
  }, []);

  return (
    <group
      position={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectObject('MEMBRANE');
      }}
    >
      {/* Slab Membran Semi-Transparan (Bilayer Lipid Hidrofobik Inti) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[9.2, 0.9, 4.2]} />
        <meshPhysicalMaterial
          color={isSelected ? '#94A3B8' : '#CBD5E1'}
          roughness={0.2}
          transmission={0.65}
          opacity={0.55}
          transparent
          ior={1.33}
          thickness={1.6}
        />
      </mesh>

      {/* Lapisan Kepala Polar Fosfolipid Atas (Menghadap Ekstraseluler) */}
      <group position={[0, 0.52, 0]}>
        {phospholipidHeads.map((h) => (
          <mesh key={`top_${h.key}`} position={[h.x, 0, h.z]}>
            <sphereGeometry args={[0.26, 10, 10]} />
            <meshStandardMaterial
              color={isSelected ? '#38BDF8' : '#93C5FD'}
              roughness={0.3}
              opacity={0.88}
              transparent
            />
          </mesh>
        ))}
      </group>

      {/* Lapisan Kepala Polar Fosfolipid Bawah (Menghadap Sitosol) */}
      <group position={[0, -0.52, 0]}>
        {phospholipidHeads.map((h) => (
          <mesh key={`bot_${h.key}`} position={[h.x, 0, h.z]}>
            <sphereGeometry args={[0.26, 10, 10]} />
            <meshStandardMaterial
              color={isSelected ? '#38BDF8' : '#93C5FD'}
              roughness={0.3}
              opacity={0.88}
              transparent
            />
          </mesh>
        ))}
      </group>

      {/* Cincin Membran di sekitar Pori Reseptor & Pori GLUT4 */}
      <mesh position={[-2.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.14, 16, 32]} />
        <meshStandardMaterial color="#64748B" roughness={0.4} opacity={0.7} transparent />
      </mesh>
      <mesh position={[2.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.14, 16, 32]} />
        <meshStandardMaterial color="#64748B" roughness={0.4} opacity={0.7} transparent />
      </mesh>
    </group>
  );
};
