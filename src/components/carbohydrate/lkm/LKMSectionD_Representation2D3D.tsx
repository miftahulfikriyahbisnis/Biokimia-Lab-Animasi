/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  Box, 
  Layers, 
  Activity, 
  CheckCircle, 
  Play, 
  Pause,
  Maximize2,
  Info,
  HelpCircle
} from 'lucide-react';
import { InteractiveErrorDetection } from './interactive/InteractiveErrorDetection';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface LKMSectionDRepresentationProps {
  onBack: () => void;
  onNext: () => void;
}

type InspectionFocus = 'C1_C6' | 'ALPHA_1_4' | 'ALPHA_1_6' | 'LINEAR_VS_BRANCHED' | 'NON_REDUCING_ENDS';
type ActiveSubView = 'FLOW_2D' | 'STRUCTURE_INSPECT';

// -------------------------------------------------------------
// 3D MOLECULAR SCENE IMPLEMENTATION
// -------------------------------------------------------------

function InspectableMoleculeScene({ 
  focus, 
  onSelectElement 
}: { 
  focus: InspectionFocus; 
  onSelectElement: (name: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Rotasi halus lambat untuk memberi kedalaman ruang
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  // Posisi 6 karbon cincin piranosa untuk representasi akurat
  const ringCarbons = [
    { id: 'C1', pos: [1.3, -0.2, 0] as [number, number, number], label: 'C1 (Anomerik)' },
    { id: 'C2', pos: [0.7, -1.1, 0.2] as [number, number, number], label: 'C2' },
    { id: 'C3', pos: [-0.6, -1.0, -0.1] as [number, number, number], label: 'C3' },
    { id: 'C4', pos: [-1.2, 0.1, 0.1] as [number, number, number], label: 'C4' },
    { id: 'C5', pos: [-0.4, 1.1, -0.2] as [number, number, number], label: 'C5' },
    { id: 'C6', pos: [-0.8, 2.2, 0.3] as [number, number, number], label: 'C6 (Metilol -CH₂OH)' }
  ];

  return (
    <group ref={groupRef}>
      
      {/* 1. FOCUS A: C1 DAN C6 */}
      {focus === 'C1_C6' && (
        <group position={[0, -0.3, 0]}>
          {/* Cincin Glukosa Pusat */}
          {ringCarbons.map((c) => {
            const isTarget = c.id === 'C1' || c.id === 'C6';
            return (
              <group key={c.id} position={c.pos} onClick={() => onSelectElement(c.id)}>
                <mesh>
                  <sphereGeometry args={[isTarget ? 0.32 : 0.2, 24, 24]} />
                  <meshStandardMaterial 
                    color={c.id === 'C1' ? '#3B82F6' : c.id === 'C6' ? '#10B981' : '#52525B'}
                    emissive={c.id === 'C1' ? '#1D4ED8' : c.id === 'C6' ? '#047857' : '#000000'}
                    emissiveIntensity={isTarget ? 0.6 : 0}
                    roughness={0.2}
                  />
                </mesh>
                <Html position={[0, 0.35, 0]} center distanceFactor={8}>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold pointer-events-none whitespace-nowrap shadow-md ${
                    c.id === 'C1' 
                      ? 'bg-blue-900 text-blue-100 ring-2 ring-blue-400' 
                      : c.id === 'C6' 
                      ? 'bg-emerald-900 text-emerald-100 ring-2 ring-emerald-400' 
                      : 'bg-stone-800/80 text-stone-300'
                  }`}>
                    {c.label}
                  </div>
                </Html>
              </group>
            );
          })}

          {/* Ikatan Antar Karbon Cincin */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={12}
                array={new Float32Array([
                  1.3, -0.2, 0,  0.7, -1.1, 0.2,
                  0.7, -1.1, 0.2, -0.6, -1.0, -0.1,
                  -0.6, -1.0, -0.1, -1.2, 0.1, 0.1,
                  -1.2, 0.1, 0.1, -0.4, 1.1, -0.2,
                  -0.4, 1.1, -0.2, 1.3, -0.2, 0, // cincin via O ring
                  -0.4, 1.1, -0.2, -0.8, 2.2, 0.3 // ke C6
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#A1A1AA" linewidth={2} />
          </lineSegments>

          {/* Oksigen Cincin */}
          <mesh position={[0.6, 0.7, 0.1]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#EF4444" roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* 2. FOCUS B: IKATAN ALPHA(1->4) */}
      {focus === 'ALPHA_1_4' && (
        <group position={[-1.2, 0, 0]}>
          {/* Cincin Glukosa Kiri */}
          <group position={[-1.6, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.6, 20, 20]} />
              <meshStandardMaterial color="#F59E0B" roughness={0.3} />
            </mesh>
            <Html position={[0, 0.8, 0]} center distanceFactor={8}>
              <div className="bg-amber-950 text-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                Residu Glukosa A
              </div>
            </Html>
            {/* C1 atom highlight */}
            <mesh position={[0.7, 0, 0]} onClick={() => onSelectElement('C1')}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#3B82F6" emissive="#1D4ED8" emissiveIntensity={0.5} />
            </mesh>
          </group>

          {/* Jembatan Ikatan O-glikosidik alpha(1->4) */}
          <group position={[0, 0, 0]} onClick={() => onSelectElement('ALPHA_1_4')}>
            <mesh>
              <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
              <meshStandardMaterial color="#DC2626" emissive="#991B1B" emissiveIntensity={0.8} />
            </mesh>
            <Html position={[0, 0.4, 0]} center distanceFactor={7}>
              <div className="bg-red-900 text-red-100 px-2.5 py-1 rounded text-xs font-bold ring-2 ring-red-400 animate-pulse shadow-lg cursor-pointer">
                Ikatan α(1→4) Glikosidik
              </div>
            </Html>
          </group>

          {/* Cincin Glukosa Kanan */}
          <group position={[1.6, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.6, 20, 20]} />
              <meshStandardMaterial color="#FBBF24" roughness={0.3} />
            </mesh>
            <Html position={[0, 0.8, 0]} center distanceFactor={8}>
              <div className="bg-amber-950 text-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                Residu Glukosa B (Ujung Nonreduksi)
              </div>
            </Html>
            {/* C4 atom highlight */}
            <mesh position={[-0.7, 0, 0]} onClick={() => onSelectElement('C4')}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#8B5CF6" emissive="#6D28D9" emissiveIntensity={0.5} />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. FOCUS C: TITIK CABANG ALPHA(1->6) */}
      {focus === 'ALPHA_1_6' && (
        <group position={[0, -0.6, 0]}>
          {/* Rantai Utama Linier */}
          <group position={[-1.8, 0, 0]}>
            <mesh><sphereGeometry args={[0.45, 16, 16]} /><meshStandardMaterial color="#F59E0B" /></mesh>
          </group>
          <group position={[0, 0, 0]}>
            <mesh><sphereGeometry args={[0.55, 20, 20]} /><meshStandardMaterial color="#F59E0B" /></mesh>
            {/* C6-OH yang dicabangkan ke atas */}
            <mesh position={[0, 0.7, 0]} onClick={() => onSelectElement('C6')}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#10B981" emissive="#047857" emissiveIntensity={0.6} />
            </mesh>
            <Html position={[0, -0.8, 0]} center distanceFactor={8}>
              <div className="bg-stone-900 text-stone-200 px-2 py-0.5 rounded text-[10px] font-mono">
                Rantai Utama [α(1→4)]
              </div>
            </Html>
          </group>
          <group position={[1.8, 0, 0]}>
            <mesh><sphereGeometry args={[0.45, 16, 16]} /><meshStandardMaterial color="#F59E0B" /></mesh>
          </group>

          {/* Jembatan Cabang alpha(1->6) ke atas */}
          <group position={[0, 1.2, 0]} onClick={() => onSelectElement('ALPHA_1_6')}>
            <mesh rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 1.0, 16]} />
              <meshStandardMaterial color="#10B981" emissive="#065F46" emissiveIntensity={0.9} />
            </mesh>
            <Html position={[0.7, 0, 0]} center distanceFactor={7}>
              <div className="bg-emerald-950 text-emerald-200 px-2.5 py-1 rounded text-xs font-bold ring-2 ring-emerald-400 animate-pulse shadow-lg cursor-pointer">
                Titik Cabang α(1→6)
              </div>
            </Html>
          </group>

          {/* Rantai Baru Cabang di atas */}
          <group position={[0.3, 2.1, 0]}>
            <mesh><sphereGeometry args={[0.5, 18, 18]} /><meshStandardMaterial color="#34D399" /></mesh>
            <Html position={[0, 0.7, 0]} center distanceFactor={8}>
              <div className="bg-emerald-900 text-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">
                Cabang Baru Glukosil
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* 4. FOCUS D: LINEAR VS BERPOSITIF CABANG */}
      {focus === 'LINEAR_VS_BRANCHED' && (
        <group position={[0, 0, 0]}>
          {/* Rantai Linear (Atas) */}
          <group position={[0, 1.4, 0]}>
            {[-2.2, -1.1, 0, 1.1, 2.2].map((x, i) => (
              <mesh key={i} position={[x, 0, 0]}>
                <sphereGeometry args={[0.3, 14, 14]} />
                <meshStandardMaterial color="#94A3B8" roughness={0.4} />
              </mesh>
            ))}
            <Html position={[0, 0.6, 0]} center distanceFactor={8}>
              <div className="bg-slate-900 text-slate-200 px-2.5 py-0.5 rounded text-xs font-bold">
                Rantai Linier Murni (Hanya 1 Ujung Nonreduksi, Kelarutan Rendah)
              </div>
            </Html>
          </group>

          {/* Rantai Bercabang Glikogen (Bawah) */}
          <group position={[0, -1.2, 0]}>
            {/* Inti Glikogenin */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.45, 18, 18]} />
              <meshStandardMaterial color="#8B5CF6" emissive="#5B21B6" emissiveIntensity={0.4} />
            </mesh>
            {/* Cabang 1 */}
            {[-0.9, -1.8, -2.5].map((x, i) => (
              <mesh key={i} position={[x, 0.3 * i, 0]}>
                <sphereGeometry args={[0.26, 12, 12]} />
                <meshStandardMaterial color="#F59E0B" />
              </mesh>
            ))}
            {/* Cabang 2 */}
            {[0.9, 1.8, 2.5].map((x, i) => (
              <mesh key={i} position={[x, 0.4 * i, 0]}>
                <sphereGeometry args={[0.26, 12, 12]} />
                <meshStandardMaterial color="#F59E0B" />
              </mesh>
            ))}
            {/* Sub-cabang ke atas */}
            <mesh position={[1.4, 1.1, 0]}>
              <sphereGeometry args={[0.24, 12, 12]} />
              <meshStandardMaterial color="#10B981" />
            </mesh>
            <mesh position={[2.0, 1.5, 0]}>
              <sphereGeometry args={[0.24, 12, 12]} />
              <meshStandardMaterial color="#F59E0B" />
            </mesh>

            <Html position={[0, -0.7, 0]} center distanceFactor={8}>
              <div className="bg-amber-950 text-amber-200 px-2.5 py-0.5 rounded text-xs font-bold">
                Pohon Glikogen Bercabang (Banyak Ujung Nonreduksi, Kelarutan Tinggi)
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* 5. FOCUS E: BANYAKNYA UJUNG NONREDUKSI */}
      {focus === 'NON_REDUCING_ENDS' && (
        <group position={[0, 0, 0]}>
          {/* Partikel Glikogen Mini dengan Ujung Bercahaya */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.5, 20, 20]} />
            <meshStandardMaterial color="#8B5CF6" />
          </mesh>

          {/* 6 Ujung Nonreduksi Aktif */}
          {[
            { pos: [-2.2, 1.2, 0] as [number, number, number], id: 'Ujung 1' },
            { pos: [-2.4, -0.8, 0.4] as [number, number, number], id: 'Ujung 2' },
            { pos: [0, 2.3, -0.2] as [number, number, number], id: 'Ujung 3' },
            { pos: [2.2, 1.4, 0.2] as [number, number, number], id: 'Ujung 4' },
            { pos: [2.5, -0.6, -0.3] as [number, number, number], id: 'Ujung 5' },
            { pos: [0.5, -2.1, 0.1] as [number, number, number], id: 'Ujung 6' },
          ].map((end, idx) => (
            <group key={idx} position={end.pos} onClick={() => onSelectElement('NON_REDUCING_END')}>
              <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#FBBF24" emissive="#F59E0B" emissiveIntensity={0.8} />
              </mesh>
              <Html position={[0, 0.45, 0]} center distanceFactor={7}>
                <div className="bg-amber-900/90 text-amber-100 text-[9px] font-bold px-1.5 py-0.5 rounded shadow ring-1 ring-amber-400 pointer-events-none whitespace-nowrap">
                  Ujung C4-OH Bebas
                </div>
              </Html>
            </group>
          ))}
        </group>
      )}

    </group>
  );
}

// -------------------------------------------------------------
// MAIN COMPONENT (2D & 3D MULTIPLE REPRESENTATION)
// -------------------------------------------------------------

export const LKMSectionD_Representation2D3D: React.FC<LKMSectionDRepresentationProps> = ({
  onBack,
  onNext,
}) => {
  const [activeSubView, setActiveSubView] = useState<ActiveSubView>('FLOW_2D');
  const [focus, setFocus] = useState<InspectionFocus>('C1_C6');
  const [useFallback2D, setUseFallback2D] = useState<boolean>(false);
  const [selectedElementInfo, setSelectedElementInfo] = useState<string>('C1_C6');

  // Aliran 2D Step Runner
  const [flowStep, setFlowStep] = useState<number>(1);
  const [isFlowPlaying, setIsFlowPlaying] = useState<boolean>(false);

  // Auto-play aliran 2D
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFlowPlaying) {
      timer = setInterval(() => {
        setFlowStep(prev => (prev >= 6 ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isFlowPlaying]);

  // Informasi ilmiah per elemen struktural
  const structuralDescriptions: Record<string, { title: string; content: string; keyRule: string }> = {
    C1_C6: {
      title: 'Peran Karbon C1 dan C6 pada Glukosa',
      content: 'C1 adalah karbon anomerik (hemiasetal pada glukosa bebas). Karbon C1 inilah yang bereaksi dengan UTP untuk membentuk UDP-glukosa dan menjadi donor glukosil pada pemanjangan rantai. C6 adalah karbon ekstrasiklik (-CH₂OH). Gugus hidroksil pada C6 bertindak sebagai akseptor saat enzim percabangan membentuk ikatan α(1→6).',
      keyRule: 'Prinsip Kunci: C1 membentuk ikatan α(1→4) linier, sedangkan C6 menerima ikatan α(1→6) cabang.'
    },
    ALPHA_1_4: {
      title: 'Ikatan Glikosidik α(1→4) Linier',
      content: 'Dibentuk oleh enzim Glikogen Sintase dengan menyambungkan C1 dari UDP-glukosa ke gugus C4-OH bebas pada ujung nonreduksi rantai yang sedang tumbuh. Ikatan ini memberikan orientasi heliks terbuka pada tulang punggung polimer glikogen.',
      keyRule: 'Prinsip Kunci: Ikatan α(1→4) bertanggung jawab atas panjang linier rantai glikogen.'
    },
    ALPHA_1_6: {
      title: 'Titik Percabangan α(1→6)',
      content: 'Dibentuk oleh Branching Enzyme dengan memotong segmen terminal 6–7 residu glukosa dan memindahkannya ke gugus hidroksil C6 pada residu internal. Percabangan terjadi rata-rata setiap 8–12 residu glukosa.',
      keyRule: 'Prinsip Kunci: Titik cabang α(1→6) mengubah rantai lurus menjadi struktur bola padat berdensitas tinggi.'
    },
    LINEAR_VS_BRANCHED: {
      title: 'Perbandingan: Rantai Linier vs Glikogen Bercabang',
      content: 'Rantai linier panjang (seperti amilosa) mudah terpilin rapat, membentuk kristal tak larut, dan hanya memiliki SATU ujung nonreduksi. Sebaliknya, glikogen bercabang memiliki kelarutan tinggi di dalam sitosol dan memiliki ribuan ujung nonreduksi.',
      keyRule: 'Prinsip Kunci: Struktur bercabang mencegah presipitasi glukosa dan melipatgandakan laju degradasi saat tubuh membutuhkan energi instan.'
    },
    NON_REDUCING_ENDS: {
      title: 'Banyaknya Ujung Nonreduksi (Non-Reducing Ends)',
      content: 'Setiap ujung cabang glikogen diakhiri oleh residu glukosa dengan C4-OH bebas yang disebut "ujung nonreduksi". Satu partikel glikogen matang memiliki hingga 2.000 ujung nonreduksi. Hal ini memungkinkan enzim glikogen sintase dan glikogen fosforilase bekerja secara simultan di ribuan titik sekaligus.',
      keyRule: 'Prinsip Kunci: Semakin banyak ujung nonreduksi, semakin cepat laju mobilisasi glukosa oleh otot dan hati saat stres metabolik.'
    }
  };

  const currentInfo = structuralDescriptions[focus] || structuralDescriptions.C1_C6;

  return (
    <div className="space-y-6" id="lkm-section-d">
      
      {/* Header Bagian D */}
      <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-purple-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-700" />
          <span>Bagian D • Representasi Submikroskopik & Struktural</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Representasi 2D & 3D: Dinamika Aliran Reaksi dan Analisis Ikatan Molekuler
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Gunakan animasi 2D untuk memahami kontinuitas aliran jalur metabolik di sitosol. 
          Gunakan representasi 3D terarah untuk menginspeksi atom C1, C6, ikatan $\alpha(1\rightarrow 4)$, titik cabang $\alpha(1\rightarrow 6)$, dan ujung nonreduksi.
        </p>
      </div>

      {/* Tab Switcher Utama (Aliran 2D vs Inspeksi Struktural 3D) */}
      <div className="flex items-center gap-2 border-b border-[#E5E2D9] pb-2">
        <button
          type="button"
          onClick={() => setActiveSubView('FLOW_2D')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubView === 'FLOW_2D'
              ? 'bg-stone-900 text-amber-200 shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
          id="btn-subview-flow2d"
        >
          <Activity className="w-4 h-4" />
          <span>1. Animasi 2D: Aliran Jalur Biosintesis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView('STRUCTURE_INSPECT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubView === 'STRUCTURE_INSPECT'
              ? 'bg-stone-900 text-amber-200 shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
          id="btn-subview-3d"
        >
          <Box className="w-4 h-4" />
          <span>2. Inspeksi Atom & Ikatan: C1, C6, α(1→4), α(1→6)</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAMPILAN 1: ANIMASI ALIRAN JALUR 2D INTERAKTIF */}
      {/* ========================================================= */}
      {activeSubView === 'FLOW_2D' && (
        <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-2xs space-y-5">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E2D9] pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block">
                Peta Vektor Jalur Sitosol
              </span>
              <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900">
                Alur Kontinu: Glukosa Darah Menjadi Granula Glikogen
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFlowPlaying(!isFlowPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                {isFlowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isFlowPlaying ? 'Jeda Alur' : 'Putar Alur 2D'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFlowStep(1)}
                className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition-colors cursor-pointer"
                title="Reset ke Tahap 1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Diagram Alur 2D Vektor SVG Dinamis */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E5E2D9] rounded-2xl overflow-x-auto">
            <svg viewBox="0 0 900 240" className="w-full min-w-[700px] h-56 select-none">
              
              {/* Batas Membran Sel / Ruang Sitosol */}
              <rect x="10" y="10" width="880" height="220" rx="16" fill="#F4F1EA" stroke="#D1CDC2" strokeWidth="1.5" />
              <text x="30" y="32" fontSize="11" fill="#78716C" fontWeight="bold">Sitosol Seluler (Hepatosit / Miosit)</text>

              {/* Garis Alur Menghubungkan Tahap 1 sampai 6 */}
              <path
                d="M 120 120 L 250 120 L 380 120 L 510 120 L 640 120 L 770 120"
                stroke="#CBD5E1"
                strokeWidth="4"
                strokeDasharray="6 4"
                fill="none"
              />

              {/* TAHAP 1: GLUKOSA -> G6P */}
              <g 
                onClick={() => setFlowStep(1)} 
                className="cursor-pointer"
              >
                <circle cx="120" cy="120" r="38" fill={flowStep === 1 ? '#FEF3C7' : '#FFFFFF'} stroke={flowStep === 1 ? '#D97706' : '#94A3B8'} strokeWidth={flowStep === 1 ? 3 : 1.5} />
                <text x="120" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1C1917">Glukosa</text>
                <text x="120" y="130" textAnchor="middle" fontSize="8" fill="#78716C">6 Karbon</text>
                {flowStep === 1 && (
                  <circle cx="120" cy="120" r="44" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" className="animate-spin" />
                )}
                <text x="120" y="175" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B45309">1. Fosforilasi (ATP)</text>
              </g>

              {/* TAHAP 2: G6P -> G1P */}
              <g 
                onClick={() => setFlowStep(2)} 
                className="cursor-pointer"
              >
                <circle cx="250" cy="120" r="38" fill={flowStep === 2 ? '#FEF3C7' : '#FFFFFF'} stroke={flowStep === 2 ? '#D97706' : '#94A3B8'} strokeWidth={flowStep === 2 ? 3 : 1.5} />
                <text x="250" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1C1917">G-6-P</text>
                <text x="250" y="130" textAnchor="middle" fontSize="8" fill="#78716C">Persimpangan</text>
                <text x="250" y="175" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B45309">2. Mutase (G1P)</text>
              </g>

              {/* TAHAP 3: G1P + UTP -> UDP-GLUKOSA */}
              <g 
                onClick={() => setFlowStep(3)} 
                className="cursor-pointer"
              >
                <circle cx="380" cy="120" r="38" fill={flowStep === 3 ? '#DBEAFE' : '#FFFFFF'} stroke={flowStep === 3 ? '#2563EB' : '#94A3B8'} strokeWidth={flowStep === 3 ? 3 : 1.5} />
                <text x="380" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E3A8A">UDP-Glukosa</text>
                <text x="380" y="130" textAnchor="middle" fontSize="8" fill="#1D4ED8">Donor Aktif</text>
                <text x="380" y="175" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1D4ED8">3. Aktivasi (UTP)</text>
              </g>

              {/* TAHAP 4: PRIMER GLIKOGENIN */}
              <g 
                onClick={() => setFlowStep(4)} 
                className="cursor-pointer"
              >
                <circle cx="510" cy="120" r="38" fill={flowStep === 4 ? '#F3E8FF' : '#FFFFFF'} stroke={flowStep === 4 ? '#9333EA' : '#94A3B8'} strokeWidth={flowStep === 4 ? 3 : 1.5} />
                <text x="510" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581C87">Glikogenin</text>
                <text x="510" y="130" textAnchor="middle" fontSize="8" fill="#6B21A8">Primer Inti</text>
                <text x="510" y="175" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#6B21A8">4. Primerisasi</text>
              </g>

              {/* TAHAP 5: SINTASE ALPHA(1->4) */}
              <g 
                onClick={() => setFlowStep(5)} 
                className="cursor-pointer"
              >
                <circle cx="640" cy="120" r="38" fill={flowStep === 5 ? '#DCFCE7' : '#FFFFFF'} stroke={flowStep === 5 ? '#16A34A' : '#94A3B8'} strokeWidth={flowStep === 5 ? 3 : 1.5} />
                <text x="640" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532D">Rantai Linier</text>
                <text x="640" y="130" textAnchor="middle" fontSize="8" fill="#166534">α(1→4)</text>
                <text x="640" y="175" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803D">5. Pemanjangan</text>
              </g>

              {/* TAHAP 6: BRANCHING ALPHA(1->6) */}
              <g 
                onClick={() => setFlowStep(6)} 
                className="cursor-pointer"
              >
                <circle cx="770" cy="120" r="42" fill={flowStep === 6 ? '#FEF08A' : '#FFFFFF'} stroke={flowStep === 6 ? '#CA8A04' : '#94A3B8'} strokeWidth={flowStep === 6 ? 3 : 1.5} />
                <text x="770" y="112" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713F12">Glikogen</text>
                <text x="770" y="126" textAnchor="middle" fontSize="8" fill="#854D0E">Bercabang α(1→6)</text>
                <text x="770" y="180" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#A16207">6. Titik Cabang</text>
              </g>
            </svg>
          </div>

          {/* Penjelasan Langkah Alur Terpilih */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
            <span className="font-bold text-amber-950 uppercase text-[10px] tracking-wider block">
              Sorotan Langkah {flowStep}:
            </span>
            <p className="text-stone-800 leading-relaxed">
              {flowStep === 1 && 'Fosforilasi Glukosa: Memerangkap heksosa dengan 1 ATP. G6P berada pada titik persimpangan metabolik.'}
              {flowStep === 2 && 'Isomerisasi Fosfoglukomutase: Menggeser fosfat ke posisi C1 anomerik untuk persiapan reaksi aktivasi nukleotida.'}
              {flowStep === 3 && 'Aktivasi UGPase: Glukosa-1-fosfat bergabung dengan UTP membentuk UDP-glukosa. Hidrolisis pirofosfat (PPi) mendorong reaksi endergonik ke depan.'}
              {flowStep === 4 && 'Autokatalisis Glikogenin: Sintase membutuhkan primer awal. Glikogenin merangkai ~8 glukosa awal pada residu Tyr-194 miliknya.'}
              {flowStep === 5 && 'Pemanjangan Glikogen Sintase: Menambahkan unit glukosil ke ujung nonreduksi rantai dengan ikatan α(1→4) glikosidik.'}
              {flowStep === 6 && 'Pembentukan Cabang (Branching Enzyme): Memindahkan segmen 6-7 residu membentuk ikatan α(1→6), melipatgandakan kelarutan dan ujung nonreduksi.'}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAMPILAN 2: INSPEKSI ATOM & IKATAN 3D (DENGAN 2D FALLBACK) */}
      {/* ========================================================= */}
      {activeSubView === 'STRUCTURE_INSPECT' && (
        <div className="space-y-4">
          
          {/* Bar Kontrol Fokus Inspeksi */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E5E2D9] shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'C1_C6' as const, label: 'Karbon C1 & C6' },
                { id: 'ALPHA_1_4' as const, label: 'Ikatan α(1→4) Linier' },
                { id: 'ALPHA_1_6' as const, label: 'Titik Cabang α(1→6)' },
                { id: 'LINEAR_VS_BRANCHED' as const, label: 'Linier vs Bercabang' },
                { id: 'NON_REDUCING_ENDS' as const, label: 'Banyaknya Ujung Nonreduksi' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFocus(item.id);
                    setSelectedElementInfo(item.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    focus === item.id
                      ? 'bg-stone-900 text-amber-200 shadow-2xs'
                      : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                  id={`focus-btn-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Toggle 3D vs Fallback 2D */}
            <button
              type="button"
              onClick={() => setUseFallback2D(!useFallback2D)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Ganti antara visual 3D dan diagram vektor 2D"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{useFallback2D ? 'Ganti ke Tampilan 3D' : 'Ganti ke Diagram 2D Vektor'}</span>
            </button>
          </div>

          {/* Area Canvas 3D & Panel Penjelasan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* Visual Canvas (~65%) */}
            <div className="lg:col-span-8 bg-[#111315] rounded-2xl border border-stone-800 overflow-hidden shadow-md relative min-h-[420px] flex flex-col justify-between">
              
              {/* Banner Atas Canvas */}
              <div className="px-4 py-2.5 bg-[#181A1D] border-b border-stone-800 text-xs text-stone-300 flex items-center justify-between">
                <span className="font-bold text-amber-300">
                  {focus === 'C1_C6' && 'Inspeksi Karbon Anomerik (C1) dan Karbon Percabangan (C6)'}
                  {focus === 'ALPHA_1_4' && 'Inspeksi Ikatan Linear α(1→4) Glukosa'}
                  {focus === 'ALPHA_1_6' && 'Inspeksi Percabangan α(1→6) Glikogen'}
                  {focus === 'LINEAR_VS_BRANCHED' && 'Komparasi Struktur Rantai Linier vs Polimer Bercabang'}
                  {focus === 'NON_REDUCING_ENDS' && 'Visualisasi Multi-Titik Ujung Nonreduksi Aktif'}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {useFallback2D ? 'Mode 2D Vektor' : 'Mode 3D WebGL (Putar & Zoom)'}
                </span>
              </div>

              {/* Konten: 3D Scene atau Fallback 2D */}
              <div className="w-full h-[360px] relative">
                {!useFallback2D ? (
                  <Canvas
                    camera={{ position: [0, 0.5, 6.5], fov: 45 }}
                    onCreated={({ gl }) => {
                      gl.setClearColor('#111315');
                    }}
                  >
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 8, 5]} intensity={1.8} />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} />
                    
                    <InspectableMoleculeScene
                      focus={focus}
                      onSelectElement={(el) => setSelectedElementInfo(el)}
                    />
                    
                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={2.5}
                      maxDistance={12}
                    />
                  </Canvas>
                ) : (
                  /* Fallback Diagram 2D Vektor Interaktif (Tidak akan pernah hitam kosong) */
                  <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-stone-900 text-stone-200">
                    <svg viewBox="0 0 400 240" className="w-full max-w-sm h-52">
                      {focus === 'C1_C6' && (
                        <g>
                          {/* Poligon Cincin Glukosa */}
                          <polygon points="200,60 270,90 270,160 200,190 130,160 130,90" fill="#27272A" stroke="#71717A" strokeWidth="2" />
                          <circle cx="270" cy="90" r="14" fill="#3B82F6" />
                          <text x="270" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">C1</text>
                          <circle cx="130" cy="50" r="14" fill="#10B981" />
                          <text x="130" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">C6</text>
                          <line x1="130" y1="90" x2="130" y2="50" stroke="#10B981" strokeWidth="3" />
                          <text x="200" y="130" textAnchor="middle" fill="#E4E4E7" fontSize="12" fontWeight="bold">Glukopiranosa</text>
                        </g>
                      )}

                      {focus === 'ALPHA_1_4' && (
                        <g>
                          <circle cx="120" cy="120" r="35" fill="#D97706" />
                          <text x="120" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">Glukosa A</text>
                          <circle cx="280" cy="120" r="35" fill="#D97706" />
                          <text x="280" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">Glukosa B</text>
                          <line x1="155" y1="120" x2="245" y2="120" stroke="#DC2626" strokeWidth="6" />
                          <rect x="165" y="105" width="70" height="24" rx="6" fill="#991B1B" />
                          <text x="200" y="121" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">α(1→4)</text>
                        </g>
                      )}

                      {focus === 'ALPHA_1_6' && (
                        <g>
                          <rect x="50" y="140" width="300" height="24" rx="8" fill="#F59E0B" />
                          <text x="200" y="156" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">Rantai Utama α(1→4)</text>
                          <line x1="200" y1="140" x2="200" y2="70" stroke="#10B981" strokeWidth="6" />
                          <rect x="170" y="90" width="60" height="20" rx="4" fill="#065F46" />
                          <text x="200" y="104" textAnchor="middle" fill="#A7F3D0" fontSize="9" fontWeight="bold">α(1→6)</text>
                          <circle cx="200" cy="50" r="22" fill="#34D399" />
                          <text x="200" y="54" textAnchor="middle" fill="#064E3B" fontSize="9" fontWeight="bold">Cabang</text>
                        </g>
                      )}

                      {(focus === 'LINEAR_VS_BRANCHED' || focus === 'NON_REDUCING_ENDS') && (
                        <g>
                          <circle cx="200" cy="120" r="25" fill="#8B5CF6" />
                          <text x="200" y="124" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">Glikogenin</text>
                          {/* Cabang-cabang dengan bintang ujung */}
                          {[-80, -40, 40, 80].map((dx, i) => (
                            <g key={i}>
                              <line x1="200" y1="120" x2={200 + dx} y2={60 + (i % 2) * 80} stroke="#FBBF24" strokeWidth="3" />
                              <circle cx={200 + dx} cy={60 + (i % 2) * 80} r="10" fill="#F59E0B" />
                              <circle cx={200 + dx} cy={60 + (i % 2) * 80} r="5" fill="#FFFFFF" />
                            </g>
                          ))}
                        </g>
                      )}
                    </svg>
                    <span className="text-[11px] text-stone-400 mt-2">Diagram Vektor 2D Presisi Ilmiah</span>
                  </div>
                )}
              </div>

              {/* Petunjuk Interaksi di Bawah Canvas */}
              <div className="px-4 py-2 bg-[#181A1D] border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Klik tombol fokus di atas untuk menyorot ikatan target.</span>
                <span className="text-amber-400 font-mono">Ketuk objek untuk detail sains</span>
              </div>
            </div>

            {/* Panel Penjelasan Ilmiah Struktural (~35%) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E5E2D9] p-5 shadow-2xs space-y-4">
              <div className="border-b border-[#E5E2D9] pb-3">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Analisis Representasi Struktural
                </span>
                <h4 className="text-sm font-serif font-bold text-stone-900 mt-1">
                  {currentInfo.title}
                </h4>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">
                {currentInfo.content}
              </p>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl text-xs space-y-1">
                <span className="font-bold block text-[11px]">Rangkuman Kaidah Ilmiah:</span>
                <p className="text-[11px] font-medium leading-relaxed">{currentInfo.keyRule}</p>
              </div>

              {/* Pertanyaan Refleksi Representasi Singkat */}
              <div className="p-3 bg-[#FAF8F5] border border-[#E5E2D9] rounded-xl text-xs space-y-1">
                <span className="font-bold text-stone-800 block text-[11px]">Refleksi Kelompok:</span>
                <p className="text-stone-600 text-[11px]">
                  Mengapa ikatan $\alpha(1\rightarrow 6)$ menyebabkan struktur glikogen berbentuk butiran bulat (granula) dan bukan serat kaku seperti selulosa $\beta(1\rightarrow 4)$?
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modul Deteksi Kesalahan Interaktif */}
      <InteractiveErrorDetection />

      {/* Navigasi Bawah */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-bold text-stone-700 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Bagian C: Misi Glikogen</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          id="btn-next-to-section-e"
        >
          <span>Lanjut ke Bagian E: Pertanyaan Analisis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
