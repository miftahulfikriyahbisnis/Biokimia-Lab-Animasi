/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ETC_COMPLEXES } from '../../../data/carbohydrateData';

interface ElectronTransportChain3DProps {
  selectedComplex?: string | null;
  onSelectComplex?: (id: string | null) => void;
  isPlaying: boolean;
  speed: number;
  showLabels?: boolean;
}

function ETCScene({ selectedComplex, onSelectComplex, isPlaying, speed, showLabels }: {
  selectedComplex?: string | null;
  onSelectComplex?: (id: string | null) => void;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
}) {
  const electronRef = useRef<THREE.Group>(null);
  const protonRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const time = state.clock.getElapsedTime() * speed;

    // Rotasi rotor ATP Synthase
    if (rotorRef.current) {
      rotorRef.current.rotation.y += delta * 3.5 * speed;
    }

    // Gerakan elektron melompat dari CI/CII ke CoQ -> CIII -> CytC -> CIV
    if (electronRef.current) {
      electronRef.current.children.forEach((el, i) => {
        const offset = (time * 1.5 + i * 0.8) % 4.5;
        el.position.x = -2.8 + offset * 1.2;
        el.position.y = Math.sin(offset * Math.PI) * 0.2;
      });
    }

    // Gerakan proton dipompa ke atas (ke ruang antarmembran)
    if (protonRef.current) {
      protonRef.current.children.forEach((pr, i) => {
        pr.position.y = 0.5 + ((time * 0.8 + i * 0.3) % 1.2);
      });
    }
  });

  return (
    <group>
      {/* 1. Ruang Antarmembran (Atas: Konsentrasi H⁺ Tinggi) */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[6.4, 1.2, 2.0]} />
        <meshStandardMaterial color="#FEE2E2" opacity={0.3} transparent />
      </mesh>
      {showLabels && (
        <Html position={[-2.4, 1.8, 0]} center distanceFactor={9}>
          <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-600 text-white shadow-xs pointer-events-none whitespace-nowrap">
            Ruang Antarmembran (Gradien [H⁺] Tinggi)
          </div>
        </Html>
      )}

      {/* 2. Membran Dalam Mitokondria (Lapisan Ganda Lipid) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6.4, 0.65, 2.0]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.6} />
      </mesh>

      {/* 3. Matriks Mitokondria (Bawah) */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[6.4, 1.2, 2.0]} />
        <meshStandardMaterial color="#FEF3C7" opacity={0.3} transparent />
      </mesh>
      {showLabels && (
        <Html position={[-2.4, -1.8, 0]} center distanceFactor={9}>
          <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-700 text-white shadow-xs pointer-events-none whitespace-nowrap">
            Matriks Mitokondria (pH lebih basa)
          </div>
        </Html>
      )}

      {/* Kompleks I (NADH DH) - Pompa 4 H⁺ */}
      <group position={[-2.5, 0, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectComplex?.(selectedComplex === 'CI' ? null : 'CI');
          }}
          scale={selectedComplex === 'CI' ? 1.15 : 1}
        >
          <boxGeometry args={[0.7, 1.1, 0.8]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive={selectedComplex === 'CI' ? '#2563EB' : '#1D4ED8'}
            emissiveIntensity={selectedComplex === 'CI' ? 0.6 : 0.2}
          />
        </mesh>
        {showLabels && (
          <Html position={[0, -0.7, 0]} center distanceFactor={8}>
            <div className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-800 text-white whitespace-nowrap pointer-events-none">
              Kompleks I (+4H⁺)
            </div>
          </Html>
        )}
      </group>

      {/* Kompleks II (Suksinat DH) - TIDAK Memompa H⁺ */}
      <group position={[-1.6, -0.15, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectComplex?.(selectedComplex === 'CII' ? null : 'CII');
          }}
          scale={selectedComplex === 'CII' ? 1.15 : 1}
        >
          <boxGeometry args={[0.55, 0.7, 0.6]} />
          <meshStandardMaterial
            color="#F97316"
            emissive={selectedComplex === 'CII' ? '#EA580C' : '#C2410C'}
            emissiveIntensity={selectedComplex === 'CII' ? 0.6 : 0.2}
          />
        </mesh>
        {showLabels && (
          <Html position={[0, -0.55, 0]} center distanceFactor={8}>
            <div className="px-1 py-0.5 rounded text-[7.5px] font-bold bg-orange-700 text-white whitespace-nowrap pointer-events-none">
              K-II (0 H⁺)
            </div>
          </Html>
        )}
      </group>

      {/* Koenzim Q (Ubiquinone) */}
      <group position={[-1.0, 0.1, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#EAB308" emissive="#CA8A04" emissiveIntensity={0.5} />
        </mesh>
        {showLabels && (
          <Html position={[0, 0.35, 0]} center distanceFactor={8}>
            <span className="text-[7.5px] font-bold text-amber-800 bg-white/90 px-1 rounded">CoQ</span>
          </Html>
        )}
      </group>

      {/* Kompleks III (Sitokrom bc1) - Pompa 4 H⁺ */}
      <group position={[-0.3, 0, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectComplex?.(selectedComplex === 'CIII' ? null : 'CIII');
          }}
          scale={selectedComplex === 'CIII' ? 1.15 : 1}
        >
          <boxGeometry args={[0.75, 1.05, 0.8]} />
          <meshStandardMaterial
            color="#10B981"
            emissive={selectedComplex === 'CIII' ? '#059669' : '#047857'}
            emissiveIntensity={selectedComplex === 'CIII' ? 0.6 : 0.2}
          />
        </mesh>
        {showLabels && (
          <Html position={[0, -0.7, 0]} center distanceFactor={8}>
            <div className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-800 text-white whitespace-nowrap pointer-events-none">
              Kompleks III (+4H⁺)
            </div>
          </Html>
        )}
      </group>

      {/* Sitokrom c */}
      <group position={[0.4, 0.55, 0]}>
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#EC4899" emissive="#DB2777" emissiveIntensity={0.5} />
        </mesh>
        {showLabels && (
          <Html position={[0, 0.32, 0]} center distanceFactor={8}>
            <span className="text-[7.5px] font-bold text-pink-700 bg-white/90 px-1 rounded">Cyt c</span>
          </Html>
        )}
      </group>

      {/* Kompleks IV (Sitokrom c Oksidase) - Pompa 2 H⁺, O2 -> H2O */}
      <group position={[1.1, 0, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectComplex?.(selectedComplex === 'CIV' ? null : 'CIV');
          }}
          scale={selectedComplex === 'CIV' ? 1.15 : 1}
        >
          <boxGeometry args={[0.75, 1.1, 0.8]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive={selectedComplex === 'CIV' ? '#7C3AED' : '#6D28D9'}
            emissiveIntensity={selectedComplex === 'CIV' ? 0.6 : 0.2}
          />
        </mesh>
        {showLabels && (
          <Html position={[0, -0.7, 0]} center distanceFactor={8}>
            <div className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-purple-800 text-white whitespace-nowrap pointer-events-none">
              Kompleks IV (+2H⁺ / O₂)
            </div>
          </Html>
        )}
      </group>

      {/* ATP Synthase (Kompleks V / F0F1-ATPase) */}
      <group position={[2.3, -0.15, 0]}>
        {/* Subunit F0 (Kanal membran) */}
        <mesh ref={rotorRef} position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.5, 12]} />
          <meshStandardMaterial color="#06B6D4" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Tangkai Pusat Stator */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
          <meshStandardMaterial color="#0891B2" />
        </mesh>

        {/* Kepala Katalitik F1 (di dalam matriks menghasilkan ATP) */}
        <mesh position={[0, -0.65, 0]}>
          <sphereGeometry args={[0.42, 20, 20]} />
          <meshStandardMaterial color="#22C55E" emissive="#16A34A" emissiveIntensity={0.4} />
        </mesh>

        {showLabels && (
          <Html position={[0, -1.2, 0]} center distanceFactor={8}>
            <div className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-800 text-white whitespace-nowrap pointer-events-none">
              ATP Synthase (ADP + Pi → ATP)
            </div>
          </Html>
        )}
      </group>

      {/* Elektron Berpendar Mengalir (Biru Muda #38BDF8) */}
      <group ref={electronRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={1} />
          </mesh>
        ))}
      </group>

      {/* Proton H⁺ Dipompa (Merah Muda #F43F5E) */}
      <group ref={protonRef}>
        {[-2.5, -0.3, 1.1].map((x, idx) => (
          <mesh key={idx} position={[x, 0.6, 0.1]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#F43F5E" emissive="#E11D48" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export const ElectronTransportChain3D: React.FC<ElectronTransportChain3DProps> = ({
  selectedComplex,
  onSelectComplex,
  isPlaying,
  speed,
  showLabels = true
}) => {
  const controlsRef = useRef<any>(null);
  const activeDetail = ETC_COMPLEXES.find(c => c.id === selectedComplex);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0.8, 6.2], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#FAF8F5']} />
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} />
        <directionalLight position={[-4, -3, -2]} intensity={0.35} />

        <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.1}>
          <ETCScene
            selectedComplex={selectedComplex}
            onSelectComplex={onSelectComplex}
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

      {/* Panel Info Kompleks yang Dipilih */}
      {activeDetail ? (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto max-w-md bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-blue-200 text-xs shadow-md">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-[#3E3E3E] text-xs">{activeDetail.name}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {activeDetail.protonPumped > 0 ? `Pompa +${activeDetail.protonPumped} H⁺` : 'TIDAK Pompa H⁺'}
            </span>
          </div>
          <p className="text-[11px] text-[#706B5C] leading-relaxed mb-1.5">
            {activeDetail.description}
          </p>
          <div className="text-[10px] text-gray-500">
            Sumber e⁻: {activeDetail.electronSource} → Tujuan e⁻: {activeDetail.electronDestination}
          </div>
        </div>
      ) : (
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E2D9] text-[11px] text-[#706B5C] shadow-xs">
          Klik salah satu kompleks protein untuk mempelajari mekanisme pemompaan proton & aliran elektron.
        </div>
      )}
    </div>
  );
};
