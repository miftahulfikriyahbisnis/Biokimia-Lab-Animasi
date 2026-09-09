/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Glycogenesis3DProps {
  growthLevel: number; // 1 to 4
  isPlaying: boolean;
  speed: number;
  showLabels?: boolean;
}

function GlycogenGranule({ growthLevel, isPlaying, speed, showLabels }: {
  growthLevel: number;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
}) {
  const granuleGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (isPlaying && granuleGroup.current) {
      granuleGroup.current.rotation.y += delta * 0.2 * speed;
      granuleGroup.current.rotation.x += delta * 0.08 * speed;
    }
  });

  // Susunan cabang konsentris glikogen
  const layers = [
    { tier: 1, count: 6, radius: 0.9, color: '#F59E0B' },
    { tier: 2, count: 12, radius: 1.6, color: '#FBBF24' },
    { tier: 3, count: 20, radius: 2.3, color: '#FCD34D' },
    { tier: 4, count: 28, radius: 3.0, color: '#FEF08A' },
  ];

  return (
    <group ref={granuleGroup}>
      {/* 1. Protein Inti Pusat: Glycogenin */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#6D28D9" emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
      {showLabels && (
        <Html position={[0, 0, 0]} center distanceFactor={8}>
          <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-900/90 text-purple-100 shadow-md pointer-events-none whitespace-nowrap">
            Primer Glycogenin
          </div>
        </Html>
      )}

      {/* 2. Cincin Cabang Glukosa Bertingkat */}
      {layers.slice(0, growthLevel).map((layer) => {
        return (
          <group key={layer.tier}>
            {Array.from({ length: layer.count }).map((_, idx) => {
              const phi = Math.acos(-1 + (2 * idx) / layer.count);
              const theta = Math.sqrt(layer.count * Math.PI) * phi;
              const x = layer.radius * Math.cos(theta) * Math.sin(phi);
              const y = layer.radius * Math.sin(theta) * Math.sin(phi);
              const z = layer.radius * Math.cos(phi);

              return (
                <group key={idx} position={[x, y, z]}>
                  {/* Residu Glukosa */}
                  <mesh>
                    <sphereGeometry args={[0.18, 14, 14]} />
                    <meshStandardMaterial
                      color={layer.color}
                      emissive="#D97706"
                      emissiveIntensity={0.2}
                      roughness={0.2}
                    />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

export const Glycogenesis3D: React.FC<Glycogenesis3DProps> = ({
  growthLevel,
  isPlaying,
  speed,
  showLabels = true
}) => {
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 1.2, 7.5], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#FAF8F5']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 7, 5]} intensity={1.1} />
        <directionalLight position={[-5, -4, -3]} intensity={0.4} />

        <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.15}>
          <GlycogenGranule
            growthLevel={growthLevel}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
          />
        </Float>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={4.2}
          maxDistance={11.0}
          rotateSpeed={0.7}
        />
      </Canvas>

      {/* Info Biokimiawi Glikogenesis */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto max-w-sm bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#E5E2D9] text-xs shadow-md">
        <div className="font-bold text-[#3E3E3E] text-xs mb-1">
          Granula Glikogen (Tingkat Pertumbuhan {growthLevel}/4)
        </div>
        <p className="text-[11px] text-[#706B5C] leading-relaxed mb-1.5">
          Glukosa dirangkai dengan ikatan α-1,4 linear oleh <span className="font-semibold text-amber-700">Glycogen Synthase</span> dan dicabangkan ikatan α-1,6 oleh <span className="font-semibold text-purple-700">Branching Enzyme</span>.
        </p>
        <div className="text-[10px] text-[#6B705C] bg-[#F5F2EA] p-1.5 rounded-lg border border-[#E5E2D9]">
          💡 <strong>Keuntungan Osmotik:</strong> Polimer glikogen padat mencegah sel membengkak dan lisis dibandingkan jika 400 mM glukosa disimpan dalam bentuk bebas.
        </div>
      </div>
    </div>
  );
};
