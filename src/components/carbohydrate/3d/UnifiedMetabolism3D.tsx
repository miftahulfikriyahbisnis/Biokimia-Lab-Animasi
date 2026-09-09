/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { MetabolicStepData } from '../../../data/metabolicJourneyData';
import { 
  CarbonSphere, 
  OxygenSphere, 
  PhosphateToken, 
  CofactorToken, 
  CO2Molecule, 
  HPlusParticle, 
  ElectronParticle, 
  CarbonChainMolecule 
} from './MolecularTokens3D';

interface UnifiedMetabolism3DProps {
  currentStepData: MetabolicStepData;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
  resetCameraCount: number;
}

// 1. Controller Kamera Halus (Lerp Camera)
function CameraRig({ 
  targetPosition, 
  targetLookAt, 
  resetCameraCount 
}: { 
  targetPosition: [number, number, number]; 
  targetLookAt: [number, number, number];
  resetCameraCount: number;
}) {
  const controlsRef = useRef<any>(null);

  // Reset kamera bila tombol Reset diklik
  React.useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...targetLookAt);
      controlsRef.current.object.position.set(...targetPosition);
      controlsRef.current.update();
    }
  }, [resetCameraCount]);

  useFrame((state, delta) => {
    // Lerp kamera menuju target secara stabil
    state.camera.position.lerp(new THREE.Vector3(...targetPosition), delta * 2.5);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(new THREE.Vector3(...targetLookAt), delta * 2.5);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      maxPolarAngle={Math.PI / 2 + 0.15}
      minDistance={2.5}
      maxDistance={15}
    />
  );
}

// 2. Lingkungan Sel Terpadu (Sitosol, Membran Mitokondria, Matriks)
function CellularEnvironment({ stepNumber }: { stepNumber: number }) {
  return (
    <group>
      {/* Zona Sitosol (Sisi Kiri) */}
      <mesh position={[-3.2, 0, -0.6]} receiveShadow>
        <planeGeometry args={[5, 7]} />
        <meshStandardMaterial
          color="#FEF3C7"
          roughness={0.9}
          metalness={0.05}
          transparent
          opacity={0.35}
        />
      </mesh>
      <Html position={[-3.6, 2.7, 0]} center distanceFactor={8}>
        <div className="px-2.5 py-1 rounded-xl bg-amber-100/90 text-amber-900 border border-amber-300 text-[11px] font-bold tracking-wide shadow-xs select-none pointer-events-none">
          Sitosol (Jalur Glikolisis)
        </div>
      </Html>

      {/* Membran Luar Mitokondria & Porin */}
      <group position={[-0.8, 0, 0]}>
        {/* Lapisan Membran Luar */}
        <mesh position={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.08, 0.08, 6.5, 16]} />
          <meshStandardMaterial color="#A7F3D0" roughness={0.4} />
        </mesh>
        <Html position={[0, 2.5, 0]} center distanceFactor={8}>
          <div className="px-2 py-0.5 rounded-lg bg-emerald-100/90 text-emerald-800 border border-emerald-300 text-[10px] font-bold shadow-xs select-none pointer-events-none">
            Membran Luar (Porin)
          </div>
        </Html>
      </group>

      {/* Ruang Antarmembran (IMS) */}
      <mesh position={[-0.4, 0, -0.5]}>
        <planeGeometry args={[0.7, 6.5]} />
        <meshStandardMaterial
          color="#E0F2FE"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Membran Dalam Mitokondria & Transporter MPC */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.12, 0.12, 6.5, 16]} />
          <meshStandardMaterial color="#059669" roughness={0.3} />
        </mesh>
        {/* MPC (Mitochondrial Pyruvate Carrier) Channel */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
          <meshStandardMaterial color="#0D9488" metalness={0.2} roughness={0.4} />
        </mesh>
        <Html position={[0, -0.45, 0]} center distanceFactor={8}>
          <div className="px-1.5 py-0.5 rounded bg-teal-800 text-teal-100 text-[9px] font-bold select-none pointer-events-none">
            MPC Transporter
          </div>
        </Html>
      </group>

      {/* Zona Matriks Mitokondria (Sisi Kanan) */}
      <mesh position={[2.8, 0, -0.6]} receiveShadow>
        <planeGeometry args={[5.5, 7]} />
        <meshStandardMaterial
          color="#FCE7F3"
          roughness={0.8}
          transparent
          opacity={0.25}
        />
      </mesh>
      <Html position={[2.5, 2.7, 0]} center distanceFactor={8}>
        <div className="px-2.5 py-1 rounded-xl bg-purple-100/90 text-purple-900 border border-purple-300 text-[11px] font-bold tracking-wide shadow-xs select-none pointer-events-none">
          Matriks Mitokondria (PDC & Siklus Krebs)
        </div>
      </Html>
    </group>
  );
}

// 3. Objek Transformasi Molekuler Glikolisis (Tahap 1 - 11)
function GlycolysisSceneObjects({ 
  stepNumber, 
  isPlaying, 
  speed, 
  showLabels 
}: { 
  stepNumber: number; 
  isPlaying: boolean; 
  speed: number; 
  showLabels: boolean; 
}) {
  const isSplit = stepNumber >= 4;
  const isSecondPhosphate = stepNumber >= 3;
  const isFirstPhosphate = stepNumber >= 1;
  const isPayoffATP1 = stepNumber >= 7;
  const isPayoffATP2 = stepNumber >= 10;

  // Animasi getar lembut
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current && isPlaying) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 * speed) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[-2.5, 0, 0]}>
      {/* 1. Sebelum Terbelah (Tahap 1, 2, 3): 1 Molekul 6 Karbon Utuh */}
      {!isSplit && (
        <group position={[0, 0, 0]}>
          <CarbonChainMolecule
            numCarbons={6}
            phosphateIndices={
              isSecondPhosphate ? [0, 5] : isFirstPhosphate ? [5] : []
            }
            label={
              showLabels
                ? stepNumber === 1
                  ? 'Glukosa-6-Fosfat (6C-P)'
                  : stepNumber === 2
                  ? 'Fruktosa-6-Fosfat (6C-P)'
                  : 'Fruktosa-1,6-Bisfosfat (P-6C-P)'
                : undefined
            }
          />

          {/* Kofaktor Reaktan / Produk Berinteraksi */}
          {stepNumber === 1 && (
            <group position={[0, 1.3, 0]}>
              <CofactorToken position={[-0.8, 0, 0]} type="ATP" />
              <Html position={[0, 0, 0]} center distanceFactor={8}>
                <span className="text-stone-700 font-bold text-xs">➔</span>
              </Html>
              <CofactorToken position={[0.8, 0, 0]} type="ADP" />
            </group>
          )}

          {stepNumber === 3 && (
            <group position={[0, 1.3, 0]}>
              <CofactorToken position={[-0.8, 0, 0]} type="ATP" />
              <Html position={[0, 0, 0]} center distanceFactor={8}>
                <span className="text-stone-700 font-bold text-xs">➔</span>
              </Html>
              <CofactorToken position={[0.8, 0, 0]} type="ADP" />
            </group>
          )}
        </group>
      )}

      {/* 2. Setelah Terbelah oleh Aldolase (Tahap 4 - 11): DUA Unit 3-Karbon Berdampingan */}
      {isSplit && (
        <group>
          {/* Molekul 3C Pertama (G3P / 1,3-BPG / 3-PG / PEP / Piruvat 1) */}
          <group position={[0, 0.85, 0]}>
            <CarbonChainMolecule
              numCarbons={3}
              phosphateIndices={
                stepNumber === 4
                  ? [0] // G3P punya 1 fosfat
                  : stepNumber === 5
                  ? [0] // G3P
                  : stepNumber === 6
                  ? [0, 2] // 1,3-BPG punya 2 fosfat
                  : stepNumber <= 9
                  ? [0] // 3-PG, 2-PG, PEP punya 1 fosfat
                  : []  // Piruvat lepas fosfat jadi ATP!
              }
              oxygenIndices={stepNumber >= 10 ? [0, 2] : [0]}
              label={
                showLabels
                  ? stepNumber === 4
                    ? 'G3P (3C-P)'
                    : stepNumber === 6
                    ? '1,3-BPG (P-3C-P)'
                    : stepNumber <= 9
                    ? 'PEP / 3-PG (3C-P)'
                    : 'Piruvat 1 (3C)'
                  : undefined
              }
            />
          </group>

          {/* Molekul 3C Kedua (DHAP -> G3P -> Piruvat 2) */}
          <group position={[0, -0.85, 0]}>
            <CarbonChainMolecule
              numCarbons={3}
              phosphateIndices={
                stepNumber === 4
                  ? [2] // DHAP punya 1 fosfat
                  : stepNumber === 5
                  ? [0] // sudah jadi G3P kedua
                  : stepNumber === 6
                  ? [0, 2] // 1,3-BPG kedua
                  : stepNumber <= 9
                  ? [0]
                  : [] // Piruvat 2 bebas fosfat
              }
              oxygenIndices={stepNumber >= 10 ? [0, 2] : [0]}
              label={
                showLabels
                  ? stepNumber === 4
                    ? 'DHAP (P-3C)'
                    : stepNumber === 5
                    ? 'G3P Kedua (3C-P)'
                    : stepNumber <= 9
                    ? 'PEP Kedua (3C-P)'
                    : 'Piruvat 2 (3C)'
                  : undefined
              }
            />
          </group>

          {/* Tampilan Kofaktor Fase Pembayaran */}
          {stepNumber === 6 && (
            <group position={[1.4, 0, 0]}>
              <CofactorToken position={[0, 0.6, 0]} type="NADH" pulse={true} />
              <CofactorToken position={[0, -0.6, 0]} type="NADH" pulse={true} />
            </group>
          )}

          {(stepNumber === 7 || stepNumber === 10) && (
            <group position={[1.4, 0, 0]}>
              <CofactorToken position={[0, 0.6, 0]} type="ATP" pulse={true} />
              <CofactorToken position={[0, -0.6, 0]} type="ATP" pulse={true} />
            </group>
          )}

          {stepNumber === 9 && (
            <group position={[1.3, 0, 0]}>
              <Html position={[0, 0, 0]} center distanceFactor={8}>
                <div className="px-2 py-1 rounded-lg bg-sky-100 border border-sky-300 text-sky-900 text-[10px] font-bold shadow-xs">
                  + 2 H₂O Dilepas
                </div>
              </Html>
            </group>
          )}
        </group>
      )}
    </group>
  );
}

// 4. Objek Transisi Sitosol ke Matriks Mitokondria (Tahap 12)
function TransitionSceneObjects({ 
  isPlaying, 
  speed, 
  showLabels 
}: { 
  isPlaying: boolean; 
  speed: number; 
  showLabels: boolean; 
}) {
  const transGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (transGroupRef.current && isPlaying) {
      // Dua piruvat bergerak kontinu dari sitosol (x: -2.0) menembus membran (x: 0) ke matriks (x: 1.5)
      const t = (state.clock.elapsedTime * 0.4 * speed) % 1;
      transGroupRef.current.position.x = -2.0 + t * 3.5;
    }
  });

  return (
    <group ref={transGroupRef} position={[-0.5, 0, 0]}>
      <group position={[0, 0.6, 0]}>
        <CarbonChainMolecule
          numCarbons={3}
          oxygenIndices={[0, 2]}
          label={showLabels ? 'Piruvat 1 (3C)' : undefined}
        />
      </group>
      <group position={[0, -0.6, 0]}>
        <CarbonChainMolecule
          numCarbons={3}
          oxygenIndices={[0, 2]}
          label={showLabels ? 'Piruvat 2 (3C)' : undefined}
        />
      </group>

      <Html position={[0, 1.4, 0]} center distanceFactor={8}>
        <div className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md border border-emerald-400 whitespace-nowrap select-none pointer-events-none flex items-center gap-1.5 animate-pulse">
          <span>➔ Bergerak Menembus Transporter MPC Menuju Matriks</span>
        </div>
      </Html>
    </group>
  );
}

// 5. Objek Dekarboksilasi Oksidatif (Tahap 13)
function OxidativeDecarbSceneObjects({ 
  showLabels 
}: { 
  showLabels: boolean; 
}) {
  return (
    <group position={[1.8, 0, 0]}>
      {/* Kompleks PDC di Latar Belakang */}
      <mesh position={[0, 0, -0.3]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="#FDE68A" roughness={0.6} transparent opacity={0.3} />
      </mesh>
      <Html position={[0, 1.6, 0]} center distanceFactor={8}>
        <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
          Kompleks Piruvat Dehidrogenase (PDC)
        </span>
      </Html>

      {/* Kedua Asetil-KoA (2 Karbon + Gugus KoA) */}
      <group position={[-0.2, 0.6, 0]}>
        <CarbonChainMolecule
          numCarbons={2}
          hasCoA={true}
          oxygenIndices={[0]}
          label={showLabels ? 'Asetil-KoA 1 (2C-CoA)' : undefined}
        />
      </group>
      <group position={[-0.2, -0.6, 0]}>
        <CarbonChainMolecule
          numCarbons={2}
          hasCoA={true}
          oxygenIndices={[0]}
          label={showLabels ? 'Asetil-KoA 2 (2C-CoA)' : undefined}
        />
      </group>

      {/* 2 Molekul CO2 yang terlepas (1C abu-abu gelap + 2 O merah) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[1.3, 1.0, 0]}>
          <CO2Molecule />
        </group>
        <group position={[1.3, -1.0, 0]}>
          <CO2Molecule />
        </group>
      </Float>

      {/* 2 NADH yang terbentuk */}
      <group position={[0.8, 0, 0]}>
        <CofactorToken position={[0, 0.35, 0]} type="NADH" pulse={true} />
        <CofactorToken position={[0, -0.35, 0]} type="NADH" pulse={true} />
      </group>
    </group>
  );
}

// 6. Objek Cincin Siklus Krebs Berputar (Tahap 14 - 22)
function KrebsCycleSceneObjects({ 
  stepNumber, 
  isPlaying, 
  speed, 
  showLabels 
}: { 
  stepNumber: number; 
  isPlaying: boolean; 
  speed: number; 
  showLabels: boolean; 
}) {
  const krebsIndex = stepNumber - 14; // 0 to 8
  const radius = 1.6;

  // Stasiun 8 Enzim Siklus Krebs pada Cincin
  const stations = useMemo(() => [
    { name: 'Sitrat Sintase', angle: 0, c: 6, label: 'Sitrat (6C)' },
    { name: 'Akonitase', angle: Math.PI / 4, c: 6, label: 'Isositrat (6C)' },
    { name: 'Isositrat DH', angle: Math.PI / 2, c: 5, label: 'α-Ketoglutarat (5C) + CO₂' },
    { name: 'α-KGDH', angle: (3 * Math.PI) / 4, c: 4, label: 'Suksinil-KoA (4C) + CO₂' },
    { name: 'Suksinil-KoA Sintetase', angle: Math.PI, c: 4, label: 'Suksinat (4C) + ATP' },
    { name: 'Suksinat DH', angle: (5 * Math.PI) / 4, c: 4, label: 'Fumarat (4C) + FADH₂' },
    { name: 'Fumarase', angle: (6 * Math.PI) / 4, c: 4, label: 'Malat (4C)' },
    { name: 'Malat DH', angle: (7 * Math.PI) / 4, c: 4, label: 'Oksaloasetat (4C) Tetap di Siklus' }
  ], []);

  // Penentuan posisi molekul aktif di siklus
  const currentStation = stations[Math.min(krebsIndex, stations.length - 1)];
  const activeAngle = currentStation.angle;
  const activeX = Math.cos(activeAngle) * radius;
  const activeY = Math.sin(activeAngle) * radius;

  return (
    <group position={[2.2, 0, 0]}>
      {/* Visualisasi Cincin Sirkular Siklus Krebs */}
      <mesh position={[0, 0, -0.1]}>
        <ringGeometry args={[radius - 0.04, radius + 0.04, 64]} />
        <meshBasicMaterial color="#93C5FD" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* Label Pusat Siklus Krebs */}
      <Html position={[0, 0, 0]} center distanceFactor={8}>
        <div className="text-center p-2 rounded-2xl bg-white/90 border border-blue-200 shadow-xs pointer-events-none select-none">
          <p className="text-[11px] font-black text-blue-900 tracking-wide">SIKLUS KREBS</p>
          <p className="text-[9px] text-blue-700 font-medium">Matriks Mitokondria</p>
        </div>
      </Html>

      {/* 8 Stasiun Enzim Siklus */}
      {stations.map((st, i) => {
        const sx = Math.cos(st.angle) * radius;
        const sy = Math.sin(st.angle) * radius;
        const isActive = i === krebsIndex;

        return (
          <group key={i} position={[sx, sy, 0]}>
            <mesh>
              <sphereGeometry args={[isActive ? 0.16 : 0.09, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? '#F59E0B' : '#94A3B8'}
                emissive={isActive ? '#D97706' : '#000000'}
                emissiveIntensity={isActive ? 0.8 : 0}
              />
            </mesh>
          </group>
        );
      })}

      {/* Molekul Aktif Berputar Sesuai Tahap */}
      <group position={[activeX, activeY, 0]}>
        <CarbonChainMolecule
          numCarbons={currentStation.c}
          label={showLabels ? currentStation.label : undefined}
          customColor="#1F2937"
        />
      </group>

      {/* Kofaktor yang Dihasilkan pada Langkah Terpilih */}
      {stepNumber === 16 && ( // IDH: CO2 + NADH
        <group position={[activeX + 0.6, activeY, 0]}>
          <CO2Molecule position={[0, 0.4, 0]} />
          <CofactorToken position={[0, -0.4, 0]} type="NADH" pulse={true} />
        </group>
      )}

      {stepNumber === 17 && ( // a-KGDH: CO2 + NADH
        <group position={[activeX - 0.6, activeY, 0]}>
          <CO2Molecule position={[0, 0.4, 0]} />
          <CofactorToken position={[0, -0.4, 0]} type="NADH" pulse={true} />
        </group>
      )}

      {stepNumber === 18 && ( // Suksinil-CoA Sintetase: ATP
        <group position={[activeX - 0.6, activeY, 0]}>
          <CofactorToken type="ATP" pulse={true} />
        </group>
      )}

      {stepNumber === 19 && ( // Suksinat DH: FADH2
        <group position={[activeX - 0.6, activeY, 0]}>
          <CofactorToken type="FADH2" pulse={true} />
        </group>
      )}

      {stepNumber === 21 && ( // Malat DH: NADH
        <group position={[activeX + 0.6, activeY, 0]}>
          <CofactorToken type="NADH" pulse={true} />
        </group>
      )}
    </group>
  );
}

// 7. Objek Rantai Transpor Elektron & ATP Synthase (Tahap 23 - 28)
function ETCOxPhosSceneObjects({ 
  stepNumber, 
  isPlaying, 
  speed, 
  showLabels 
}: { 
  stepNumber: number; 
  isPlaying: boolean; 
  speed: number; 
  showLabels: boolean; 
}) {
  const atpSynthaseRotorRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Rotasi rotor ATP synthase yang realistis bila sedang di tahap fosforilasi oksidatif
    if (atpSynthaseRotorRef.current && isPlaying && stepNumber >= 27) {
      atpSynthaseRotorRef.current.rotation.y += delta * 4 * speed;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Membran Dalam Fosfolipid Bilayer (Zona Tengah Horisontal) */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[7.5, 0.6, 1.2]} />
        <meshStandardMaterial color="#059669" roughness={0.3} />
      </mesh>

      {/* Label Ruang Antarmembran (Atas) & Matriks (Bawah) */}
      <Html position={[-3.0, 1.4, 0]} center distanceFactor={8}>
        <div className="px-2 py-0.5 rounded-lg bg-sky-100 border border-sky-300 text-sky-950 text-[10px] font-bold select-none pointer-events-none">
          Ruang Antarmembran (IMS: Akumulasi H⁺ Tinggi)
        </div>
      </Html>
      <Html position={[-3.0, -1.4, 0]} center distanceFactor={8}>
        <div className="px-2 py-0.5 rounded-lg bg-purple-100 border border-purple-300 text-purple-950 text-[10px] font-bold select-none pointer-events-none">
          Matriks Mitokondria (H⁺ Rendah, Tempat ATP Dibuat)
        </div>
      </Html>

      {/* Kompleks I: NADH Dehidrogenase (x: -2.4) */}
      <group position={[-2.4, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 1.1, 0.7]} />
          <meshStandardMaterial 
            color={stepNumber === 23 ? '#F59E0B' : '#0284C7'} 
            roughness={0.4} 
          />
        </mesh>
        <Html position={[0, 0.7, 0]} center distanceFactor={8}>
          <span className="px-1.5 py-0.5 rounded bg-sky-900 text-white font-bold text-[9px] whitespace-nowrap">
            Komp. I (Pompa 4H⁺)
          </span>
        </Html>
        {stepNumber === 23 && (
          <>
            {/* NADH masuk di sisi matriks */}
            <CofactorToken position={[0, -1.0, 0]} type="NADH" />
            {/* Elektron mengalir */}
            <ElectronParticle position={[0, 0, 0.4]} />
            {/* 4 H+ terpompa ke atas */}
            <HPlusParticle position={[-0.2, 0.9, 0]} />
            <HPlusParticle position={[0.2, 0.9, 0]} />
          </>
        )}
      </group>

      {/* Kompleks II: Suksinat Dehidrogenase (x: -1.4, Tidak memompa H+) */}
      <group position={[-1.4, -0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.75, 0.6]} />
          <meshStandardMaterial 
            color={stepNumber === 24 ? '#F59E0B' : '#0369A1'} 
            roughness={0.4} 
          />
        </mesh>
        <Html position={[0, 0.55, 0]} center distanceFactor={8}>
          <span className="px-1.5 py-0.5 rounded bg-sky-900 text-white font-bold text-[9px] whitespace-nowrap">
            Komp. II (0 H⁺)
          </span>
        </Html>
        {stepNumber === 24 && (
          <>
            <CofactorToken position={[0, -0.85, 0]} type="FADH2" />
            <ElectronParticle position={[0, 0, 0.4]} />
          </>
        )}
      </group>

      {/* Koenzim Q Mobile Carrier */}
      <group position={[-0.8, 0.1, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#F97316" metalness={0.3} roughness={0.3} />
        </mesh>
        <Html position={[0, 0.35, 0]} center distanceFactor={8}>
          <span className="px-1 rounded bg-orange-600 text-white font-bold text-[8px]">
            CoQ
          </span>
        </Html>
      </group>

      {/* Kompleks III: Sitokrom bc1 (x: -0.1) */}
      <group position={[-0.1, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.85, 1.0, 0.7]} />
          <meshStandardMaterial 
            color={stepNumber === 25 ? '#F59E0B' : '#0284C7'} 
            roughness={0.4} 
          />
        </mesh>
        <Html position={[0, 0.7, 0]} center distanceFactor={8}>
          <span className="px-1.5 py-0.5 rounded bg-sky-900 text-white font-bold text-[9px] whitespace-nowrap">
            Komp. III (Pompa 4H⁺)
          </span>
        </Html>
        {stepNumber === 25 && (
          <>
            <ElectronParticle position={[0, 0, 0.4]} />
            <HPlusParticle position={[-0.2, 0.9, 0]} />
            <HPlusParticle position={[0.2, 0.9, 0]} />
          </>
        )}
      </group>

      {/* Sitokrom c Mobile Carrier */}
      <group position={[0.6, 0.45, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#EC4899" metalness={0.3} roughness={0.3} />
        </mesh>
        <Html position={[0, 0.35, 0]} center distanceFactor={8}>
          <span className="px-1 rounded bg-pink-700 text-white font-bold text-[8px]">
            Cyt c
          </span>
        </Html>
      </group>

      {/* Kompleks IV: Sitokrom c Oksidase (x: 1.3) */}
      <group position={[1.3, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 1.05, 0.7]} />
          <meshStandardMaterial 
            color={stepNumber === 26 ? '#F59E0B' : '#0284C7'} 
            roughness={0.4} 
          />
        </mesh>
        <Html position={[0, 0.7, 0]} center distanceFactor={8}>
          <span className="px-1.5 py-0.5 rounded bg-sky-900 text-white font-bold text-[9px] whitespace-nowrap">
            Komp. IV (Pompa 2H⁺)
          </span>
        </Html>
        {stepNumber === 26 && (
          <>
            <ElectronParticle position={[0, 0, 0.4]} />
            <HPlusParticle position={[0, 0.9, 0]} />
            <Html position={[0, -0.9, 0]} center distanceFactor={8}>
              <div className="px-2 py-0.5 rounded bg-rose-800 text-white text-[9px] font-bold whitespace-nowrap shadow-xs">
                O₂ + 4e⁻ + 4H⁺ ➔ 2 H₂O
              </div>
            </Html>
          </>
        )}
      </group>

      {/* Kompleks V: F0F1-ATP Synthase (x: 2.7) */}
      <group position={[2.7, 0, 0]}>
        {/* Stator & Tangkai Membran F0 */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.7, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.4} roughness={0.4} />
        </mesh>

        {/* Rotor F1 yang Berputar di Sisi Matriks */}
        <group ref={atpSynthaseRotorRef} position={[0, -0.65, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.42, 20, 20]} />
            <meshStandardMaterial 
              color={stepNumber >= 27 ? '#F59E0B' : '#059669'} 
              metalness={0.3} 
              roughness={0.3} 
            />
          </mesh>
          {/* Subunit Tonjolan Rotor untuk Visual Putaran */}
          <mesh position={[0.38, 0, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#EAB308" />
          </mesh>
          <mesh position={[-0.38, 0, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#EAB308" />
          </mesh>
        </group>

        <Html position={[0, 0.7, 0]} center distanceFactor={8}>
          <span className="px-2 py-0.5 rounded bg-emerald-800 text-white font-bold text-[9px] whitespace-nowrap shadow-xs">
            ATP Synthase (Komp. V)
          </span>
        </Html>

        {/* Aliran Proton Masuk & Produksi ATP */}
        {stepNumber >= 27 && (
          <>
            {/* Aliran H+ dari IMS kembali ke matriks */}
            <HPlusParticle position={[0, 0.7, 0]} />
            <HPlusParticle position={[0, -0.1, 0]} />

            {/* Pelepasan ATP di Matriks */}
            <CofactorToken position={[0.7, -0.9, 0]} type="ATP" pulse={true} />
            <Html position={[0, -1.3, 0]} center distanceFactor={8}>
              <div className="px-2 py-1 rounded-xl bg-amber-500 text-amber-950 font-black text-[10px] whitespace-nowrap shadow-md border border-amber-300">
                ADP + Pi ➔ ATP Terbentuk!
              </div>
            </Html>
          </>
        )}
      </group>
    </group>
  );
}

// 8. Komponen Utama Canvas 3D Tunggal yang Persisten
export const UnifiedMetabolism3D: React.FC<UnifiedMetabolism3DProps> = ({
  currentStepData,
  isPlaying,
  speed,
  showLabels,
  resetCameraCount
}) => {
  const { stepNumber, animationState } = currentStepData;
  const { cameraTarget, cameraPosition } = animationState;

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden bg-gradient-to-b from-stone-900 via-stone-850 to-stone-900 shadow-inner">
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <color attach="background" args={['#18181B']} />
        
        {/* Kontrol Kamera Terpadu */}
        <CameraRig
          targetPosition={cameraPosition}
          targetLookAt={cameraTarget}
          resetCameraCount={resetCameraCount}
        />

        {/* Pencahayaan Studio Ilmiah */}
        <ambientLight intensity={0.85} />
        <directionalLight
          position={[5, 8, 6]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, 4, 3]} intensity={0.6} color="#FEF08A" />
        <pointLight position={[4, -3, 3]} intensity={0.6} color="#A7F3D0" />

        {/* Latar Belakang Kompartemen Sel Terpadu */}
        <CellularEnvironment stepNumber={stepNumber} />

        {/* 1. Objek Glikolisis (Tahap 1 - 11) */}
        {stepNumber <= 11 && (
          <GlycolysisSceneObjects
            stepNumber={stepNumber}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
          />
        )}

        {/* 2. Objek Transisi Sitosol ke Matriks (Tahap 12) */}
        {stepNumber === 12 && (
          <TransitionSceneObjects
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
          />
        )}

        {/* 3. Objek Dekarboksilasi Oksidatif (Tahap 13) */}
        {stepNumber === 13 && (
          <OxidativeDecarbSceneObjects
            showLabels={showLabels}
          />
        )}

        {/* 4. Objek Siklus Krebs (Tahap 14 - 22) */}
        {stepNumber >= 14 && stepNumber <= 22 && (
          <KrebsCycleSceneObjects
            stepNumber={stepNumber}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
          />
        )}

        {/* 5. Objek Transpor Elektron & Fosforilasi Oksidatif (Tahap 23 - 28) */}
        {stepNumber >= 23 && (
          <ETCOxPhosSceneObjects
            stepNumber={stepNumber}
            isPlaying={isPlaying}
            speed={speed}
            showLabels={showLabels}
          />
        )}
      </Canvas>

      {/* Floating Indicator Nama Objek Aktif Saja (Sesuai Syarat Prompt) */}
      <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-xl bg-stone-900/90 text-amber-300 font-serif font-bold text-xs shadow-md border border-stone-700 backdrop-blur-md">
          {animationState.activeMoleculeName}
        </span>
        <span className="hidden sm:inline px-2.5 py-1 rounded-xl bg-black/60 text-stone-300 font-sans text-[11px] backdrop-blur-md border border-stone-800">
          {animationState.stagePhase}
        </span>
      </div>
    </div>
  );
};
