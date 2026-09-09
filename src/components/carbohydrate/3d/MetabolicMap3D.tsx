/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { METABOLIC_CROSSROADS } from '../../../data/carbohydrateData';

interface MetabolicMap3DProps {
  activePathway: 'gluconeogenesis' | 'cori_cycle' | 'lipogenesis' | 'metabolic_map';
  selectedNode?: string | null;
  onSelectNode?: (nodeName: string | null) => void;
  isPlaying: boolean;
  speed: number;
  showLabels?: boolean;
}

function NodeItem({
  position,
  name,
  color,
  isSelected,
  onClick,
  showLabels
}: {
  position: [number, number, number];
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  showLabels: boolean;
}) {
  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        scale={isSelected ? 1.3 : 1}
      >
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.7 : 0.25}
          roughness={0.25}
        />
      </mesh>

      {showLabels && (
        <Html position={[0, 0.45, 0]} center distanceFactor={8}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap cursor-pointer transition-all ${
              isSelected
                ? 'bg-amber-600 text-white ring-2 ring-amber-300 shadow-md scale-110'
                : 'bg-black/75 text-white/90 hover:bg-black'
            }`}
          >
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionLine({ start, end, color = '#A5A58D' }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const p1 = new THREE.Vector3(...start);
  const p2 = new THREE.Vector3(...end);
  const distance = p1.distanceTo(p2);
  const position = p1.clone().add(p2).multiplyScalar(0.5);

  const orientation = new THREE.Matrix4();
  const up = new THREE.Vector3(0, 1, 0);
  const direction = p2.clone().sub(p1).normalize();
  const axis = new THREE.Vector3().crossVectors(up, direction).normalize();
  const angle = Math.acos(up.dot(direction));
  orientation.makeRotationAxis(axis, angle);

  return (
    <mesh position={position} matrixAutoUpdate={false} onUpdate={(self) => {
      self.matrix.identity();
      self.applyMatrix4(new THREE.Matrix4().setPosition(position));
      self.applyMatrix4(orientation);
    }}>
      <cylinderGeometry args={[0.04, 0.04, distance, 8]} />
      <meshStandardMaterial color={color} opacity={0.6} transparent />
    </mesh>
  );
}

function SceneInner({
  activePathway,
  selectedNode,
  onSelectNode,
  isPlaying,
  speed,
  showLabels
}: {
  activePathway: 'gluconeogenesis' | 'cori_cycle' | 'lipogenesis' | 'metabolic_map';
  selectedNode?: string | null;
  onSelectNode?: (nodeName: string | null) => void;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (isPlaying && groupRef.current && activePathway === 'metabolic_map') {
      groupRef.current.rotation.y += delta * 0.12 * speed;
    }
  });

  // Jika Siklus Cori: Tampilkan organ Hati dan Otot dengan sirkulasi darah
  if (activePathway === 'cori_cycle') {
    return (
      <group>
        {/* Organ Otot Rangka (Kiri) */}
        <group position={[-2.2, 0, 0]}>
          <mesh>
            <capsuleGeometry args={[0.65, 1.2, 16, 16]} />
            <meshStandardMaterial color="#EF4444" roughness={0.4} />
          </mesh>
          {showLabels && (
            <Html position={[0, 1.4, 0]} center distanceFactor={8}>
              <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-700 text-white whitespace-nowrap">
                Otot Rangka (Glikolisis Cepat → Laktat + 2 ATP)
              </div>
            </Html>
          )}
        </group>

        {/* Aliran Darah Sirkulasi (Tengah) */}
        <group position={[0, 0, 0]}>
          {/* Panah Laktat: Otot -> Darah -> Hati */}
          <mesh position={[0, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 2.8, 8]} />
            <meshStandardMaterial color="#EC4899" />
          </mesh>
          <Html position={[0, -0.9, 0]} center distanceFactor={8}>
            <span className="text-[9px] font-bold text-pink-700 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">
              Laktat via Darah →
            </span>
          </Html>

          {/* Panah Glukosa: Hati -> Darah -> Otot */}
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 2.8, 8]} />
            <meshStandardMaterial color="#F59E0B" />
          </mesh>
          <Html position={[0, 0.9, 0]} center distanceFactor={8}>
            <span className="text-[9px] font-bold text-amber-700 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">
              ← Glukosa via Darah
            </span>
          </Html>
        </group>

        {/* Organ Hati (Kanan) */}
        <group position={[2.2, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.9, 1.4, 16]} />
            <meshStandardMaterial color="#B91C1C" roughness={0.4} />
          </mesh>
          {showLabels && (
            <Html position={[0, 1.4, 0]} center distanceFactor={8}>
              <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-900 text-white whitespace-nowrap">
                Hati (Glukoneogenesis: Laktat → Glukosa [-6 ATP])
              </div>
            </Html>
          )}
        </group>
      </group>
    );
  }

  // Jika Lipogenesis: Tampilkan Mitokondria -> Sitrat Shuttle -> Sitosol -> Droplet Lemak Adiposit
  if (activePathway === 'lipogenesis') {
    return (
      <group>
        {/* Mitokondria (Kiri) */}
        <group position={[-1.8, 0, 0]}>
          <mesh>
            <capsuleGeometry args={[0.7, 1.2, 16, 16]} />
            <meshStandardMaterial color="#D97706" opacity={0.5} transparent />
          </mesh>
          <Html position={[0, 1.3, 0]} center distanceFactor={8}>
            <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-800 text-white">
              Mitokondria (Surplus Asetil-KoA + OAA → Sitrat)
            </div>
          </Html>
        </group>

        {/* Sitrat Shuttle Melintasi Membran */}
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.4, 8]} />
          <meshStandardMaterial color="#10B981" />
        </mesh>
        <Html position={[-0.4, 0.4, 0]} center distanceFactor={8}>
          <span className="text-[9px] font-bold text-emerald-800 bg-white/90 px-1 rounded shadow-xs">
            Citrate Shuttle → Sitosol
          </span>
        </Html>

        {/* Droplet Lemak di Jaringan Adiposa (Kanan) */}
        <group position={[1.8, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.95, 24, 24]} />
            <meshStandardMaterial color="#FBBF24" emissive="#D97706" emissiveIntensity={0.3} roughness={0.3} />
          </mesh>
          <Html position={[0, 1.3, 0]} center distanceFactor={8}>
            <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-700 text-white">
              Droplet Trigliserida (Cadangan Lemak)
            </div>
          </Html>
        </group>
      </group>
    );
  }

  // Peta Integrasi Antarjalur (Metabolic Crossroads Map)
  const nodePositions: { [name: string]: [number, number, number] } = {
    'Glukosa-6-Fosfat (G6P)': [0, 2.2, 0],
    'Dihidroksiaseton Fosfat (DHAP)': [-2.0, 1.1, 0],
    'Piruvat (3C)': [0, 0.3, 0],
    'Asetil-KoA (2C)': [0, -1.3, 0],
    'Oksaloasetat (4C)': [2.1, -0.6, 0],
  };

  return (
    <group ref={groupRef}>
      {/* Garis-garis koneksi antar node */}
      <ConnectionLine start={nodePositions['Glukosa-6-Fosfat (G6P)']} end={nodePositions['Dihidroksiaseton Fosfat (DHAP)']} color="#F59E0B" />
      <ConnectionLine start={nodePositions['Glukosa-6-Fosfat (G6P)']} end={nodePositions['Piruvat (3C)']} color="#F59E0B" />
      <ConnectionLine start={nodePositions['Piruvat (3C)']} end={nodePositions['Asetil-KoA (2C)']} color="#10B981" />
      <ConnectionLine start={nodePositions['Piruvat (3C)']} end={nodePositions['Oksaloasetat (4C)']} color="#3B82F6" />
      <ConnectionLine start={nodePositions['Asetil-KoA (2C)']} end={nodePositions['Oksaloasetat (4C)']} color="#EAB308" />

      {/* Render Node Interaktif */}
      {METABOLIC_CROSSROADS.map((node) => {
        const pos = nodePositions[node.name] || [0, 0, 0];
        const isSelected = selectedNode === node.name;
        return (
          <NodeItem
            key={node.name}
            position={pos}
            name={node.name}
            color={node.color}
            isSelected={isSelected}
            onClick={() => onSelectNode?.(isSelected ? null : node.name)}
            showLabels={showLabels}
          />
        );
      })}
    </group>
  );
}

export const MetabolicMap3D: React.FC<MetabolicMap3DProps> = ({
  activePathway,
  selectedNode,
  onSelectNode,
  isPlaying,
  speed,
  showLabels = true
}) => {
  const controlsRef = useRef<any>(null);
  const activeCrossroad = METABOLIC_CROSSROADS.find(n => n.name === selectedNode);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0.4, 6.8], fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#FAF8F5']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} />
        <directionalLight position={[-4, -4, -3]} intensity={0.4} />

        <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.12}>
          <SceneInner
            activePathway={activePathway}
            selectedNode={selectedNode}
            onSelectNode={onSelectNode}
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
          maxDistance={10.0}
          rotateSpeed={0.7}
        />
      </Canvas>

      {/* Info Popover jika ada node persimpangan yang dipilih */}
      {activeCrossroad && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto max-w-md bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-amber-200 text-xs shadow-md">
          <div className="font-bold text-[#3E3E3E] text-xs mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeCrossroad.color }} />
            <span>{activeCrossroad.name}</span>
          </div>
          <span className="text-[10px] font-semibold text-[#A5A58D] block mb-1">Percabangan Nasib Metabolik:</span>
          <ul className="space-y-1 text-[11px] text-[#706B5C]">
            {activeCrossroad.fates.map((fate, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-amber-500 font-bold">•</span>
                <span>{fate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
