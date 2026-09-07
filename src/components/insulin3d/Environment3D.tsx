/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Html } from '@react-three/drei';

interface Environment3DProps {
  showLabels: boolean;
}

export const Environment3D: React.FC<Environment3DProps> = ({ showLabels }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Label Ruang Ekstraseluler (Atas) */}
      {showLabels && (
        <Html position={[-3.8, 3.4, -1.0]} center distanceFactor={15}>
          <div className="px-2.5 py-1 rounded-lg bg-sky-50/90 text-sky-900 border border-sky-300 text-[11px] font-bold uppercase tracking-wider select-none pointer-events-none shadow-xs">
            Ruang Ekstraseluler (Aliran Darah)
          </div>
        </Html>
      )}

      {/* Label Sitosol / Dalam Sel (Bawah) */}
      {showLabels && (
        <Html position={[-3.8, -3.4, -1.0]} center distanceFactor={15}>
          <div className="px-2.5 py-1 rounded-lg bg-amber-50/90 text-amber-950 border border-amber-300 text-[11px] font-bold uppercase tracking-wider select-none pointer-events-none shadow-xs">
            Sitosol Sel Target (Otot / Lemak)
          </div>
        </Html>
      )}

      {/* Grid Lantai Halus di Bawah Sitosol untuk Kedalaman Ruang */}
      <mesh position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshBasicMaterial color="#F5F2EA" opacity={0.35} transparent />
      </mesh>
    </group>
  );
};
