/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface CellCatabolism3DProps {
  stageMode: 'GLYCOLYSIS' | 'PYRUVATE_FATE' | 'OXIDATIVE_DECARB';
  anaerobicMode?: boolean; // toggle anaerob vs aerob untuk nasib piruvat
  isPlaying: boolean;
  speed: number;
  showLabels?: boolean;
}

function CellScene({ stageMode, anaerobicMode, isPlaying, speed, showLabels }: {
  stageMode: 'GLYCOLYSIS' | 'PYRUVATE_FATE' | 'OXIDATIVE_DECARB';
  anaerobicMode?: boolean;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
}) {
  const atpParticlesRef = useRef<THREE.Group>(null);
  const nadhParticlesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const time = state.clock.getElapsedTime() * speed;

    if (atpParticlesRef.current) {
      atpParticlesRef.current.children.forEach((p, idx) => {
        p.position.y += Math.sin(time + idx) * 0.005;
        p.position.x += Math.cos(time + idx * 2) * 0.005;
      });
    }

    if (nadhParticlesRef.current) {
      nadhParticlesRef.current.children.forEach((p, idx) => {
        p.position.y += Math.cos(time + idx) * 0.006;
      });
    }
  });

  return (
    <group>
      {/* Batas Membran Sel (Transparan Luar) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshStandardMaterial
          color="#E5E7EB"
          transparent
          opacity={0.12}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sitoplasma (Area Luas) */}
      {showLabels && (
        <Html position={[-1.8, 2.2, 0]} center distanceFactor={10}>
          <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/80 text-white shadow-xs pointer-events-none">
            Sitoplasma Sel (Lokasi Glikolisis)
          </div>
        </Html>
      )}

      {/* Mitokondria (Organel Kanan Dalam) */}
      <group position={[1.3, -0.2, 0]} rotation={[0, 0, -0.3]}>
        {/* Membran Luar Mitokondria */}
        <mesh>
          <capsuleGeometry args={[0.9, 1.6, 16, 16]} />
          <meshStandardMaterial
            color="#D97706"
            transparent
            opacity={0.35}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Matriks Mitokondria (Krista Bagian Dalam) */}
        <mesh scale={[0.75, 0.75, 0.75]}>
          <capsuleGeometry args={[0.8, 1.4, 16, 16]} />
          <meshStandardMaterial
            color="#B45309"
            transparent
            opacity={0.65}
            roughness={0.5}
          />
        </mesh>

        {showLabels && (
          <Html position={[0, 1.4, 0]} center distanceFactor={10}>
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-800 text-white shadow-xs pointer-events-none">
              Mitokondria (Matriks & Krista)
            </div>
          </Html>
        )}

        {/* Enzim Piruvat Dehidrogenase Kompleks (PDC) di Matriks */}
        {stageMode === 'OXIDATIVE_DECARB' && (
          <group position={[0, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.38, 16, 16]} />
              <meshStandardMaterial color="#06B6D4" roughness={0.3} metalness={0.2} />
            </mesh>
            {showLabels && (
              <Html position={[0, 0.5, 0]} center distanceFactor={8}>
                <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-700 text-white whitespace-nowrap pointer-events-none">
                  Kompleks PDC (E1, E2, E3)
                </div>
              </Html>
            )}
            {/* Pelepasan CO2 */}
            <mesh position={[0.45, 0.3, 0]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#6B7280" />
            </mesh>
            {showLabels && (
              <Html position={[0.6, 0.4, 0]} center distanceFactor={8}>
                <span className="text-[9px] font-bold text-gray-700 bg-white/90 px-1 rounded">CO₂ ↑</span>
              </Html>
            )}
          </group>
        )}
      </group>

      {/* Model Glikolisis di Sitoplasma (Kiri) */}
      <group position={[-1.2, 0.2, 0]}>
        {/* Molekul Glukosa Awal (6C Kuning) */}
        <group position={[-0.8, 1.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#F59E0B" emissive="#D97706" emissiveIntensity={0.4} />
          </mesh>
          {showLabels && (
            <Html position={[0, 0.45, 0]} center distanceFactor={9}>
              <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-600 text-white whitespace-nowrap">
                Glukosa (6C)
              </div>
            </Html>
          )}
        </group>

        {/* Panah Aliran Glikolisis */}
        <mesh position={[-0.4, 0.3, 0]} rotation={[0, 0, -0.8]}>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
          <meshStandardMaterial color="#A5A58D" />
        </mesh>

        {/* Enzim Kunci PFK-1 */}
        <mesh position={[-0.4, 0.3, 0]}>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshStandardMaterial color="#06B6D4" roughness={0.3} />
        </mesh>
        {showLabels && (
          <Html position={[-0.4, 0.55, 0]} center distanceFactor={9}>
            <div className="px-1 py-0.2 rounded text-[8.5px] font-semibold bg-cyan-800 text-cyan-100 whitespace-nowrap">
              PFK-1 (Rate-limiting)
            </div>
          </Html>
        )}

        {/* 2 Molekul Piruvat Hasil Glikolisis (3C Hijau) */}
        <group position={[0.2, -0.6, 0]}>
          <mesh position={[-0.25, 0, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0.25, 0, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={0.3} />
          </mesh>
          {showLabels && (
            <Html position={[0, -0.4, 0]} center distanceFactor={9}>
              <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-700 text-white whitespace-nowrap">
                2 × Piruvat (3C)
              </div>
            </Html>
          )}
        </group>

        {/* Percabangan Nasib Piruvat */}
        {stageMode === 'PYRUVATE_FATE' && (
          <>
            {anaerobicMode ? (
              /* Jalur Anaerob: Piruvat -> Laktat di sitosol */
              <group position={[-0.5, -1.5, 0]}>
                <mesh>
                  <sphereGeometry args={[0.28, 16, 16]} />
                  <meshStandardMaterial color="#EC4899" emissive="#BE185D" emissiveIntensity={0.4} />
                </mesh>
                {showLabels && (
                  <Html position={[0, -0.4, 0]} center distanceFactor={9}>
                    <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-pink-700 text-white whitespace-nowrap">
                      Laktat (Anaerob via LDH) — Regenerasi NAD⁺
                    </div>
                  </Html>
                )}
              </group>
            ) : (
              /* Jalur Aerob: Piruvat meluncur masuk ke mitokondria */
              <group position={[0.9, -0.4, 0]}>
                <mesh rotation={[0, 0, 0.4]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
                  <meshStandardMaterial color="#F59E0B" />
                </mesh>
                {showLabels && (
                  <Html position={[0, 0.3, 0]} center distanceFactor={9}>
                    <div className="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-amber-700 text-white whitespace-nowrap">
                      Transporter MPC → Matriks Mitokondria
                    </div>
                  </Html>
                )}
              </group>
            )}
          </>
        )}
      </group>

      {/* Partikel ATP (Hijau Terang) */}
      <group ref={atpParticlesRef}>
        {[-1.8, -0.8, -0.2, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.8 + (i % 2) * 0.4, (i % 3) * 0.2]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial color="#22C55E" emissive="#16A34A" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>

      {/* Partikel NADH (Ungu) */}
      <group ref={nadhParticlesRef}>
        {[-1.4, -0.5, 0.8].map((x, i) => (
          <mesh key={i} position={[x, -0.1 + i * 0.4, 0.2]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial color="#8B5CF6" emissive="#6D28D9" emissiveIntensity={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export const CellCatabolism3D: React.FC<CellCatabolism3DProps> = ({
  stageMode,
  anaerobicMode = false,
  isPlaying,
  speed,
  showLabels = true
}) => {
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0.5, 6.8], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#FAF8F5']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 6, 4]} intensity={1.1} />
        <directionalLight position={[-5, -4, -3]} intensity={0.4} />

        <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.15}>
          <CellScene
            stageMode={stageMode}
            anaerobicMode={anaerobicMode}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
          />
        </Float>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={4.0}
          maxDistance={10.0}
          rotateSpeed={0.7}
        />
      </Canvas>

      {/* Legenda Molekul */}
      <div className="absolute top-3 right-3 flex flex-col gap-1 bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-[#E5E2D9] text-[10px] text-[#706B5C] shadow-xs">
        <span className="font-bold text-[#3E3E3E] text-[11px] mb-0.5">Komponen Molekuler:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Glukosa (6C) & Asetil-KoA (2C)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Piruvat (3C) & ATP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span>NADH (Karier Elektron)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
          <span>Enzim (PFK-1 / PDC)</span>
        </div>
        {stageMode === 'PYRUVATE_FATE' && anaerobicMode && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            <span>Laktat (Anaerob)</span>
          </div>
        )}
      </div>
    </div>
  );
};
