/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// 1. Bola Karbon Tunggal (Dark Grey)
export const CarbonSphere: React.FC<{
  position?: [number, number, number];
  size?: number;
  label?: string;
  color?: string;
}> = ({ position = [0, 0, 0], size = 0.22, label, color = '#262626' }) => {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {label && (
        <Html position={[0, size + 0.12, 0]} center distanceFactor={8}>
          <span className="px-1 py-0.2 rounded bg-stone-900/90 text-stone-200 text-[9px] font-mono font-bold select-none pointer-events-none border border-stone-700">
            {label}
          </span>
        </Html>
      )}
    </group>
  );
};

// 2. Bola Oksigen (Red)
export const OxygenSphere: React.FC<{
  position?: [number, number, number];
  size?: number;
}> = ({ position = [0, 0, 0], size = 0.18 }) => {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[size, 20, 20]} />
      <meshStandardMaterial
        color="#DC2626"
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
};

// 2b. Bola Nitrogen (Blue)
export const NitrogenSphere: React.FC<{
  position?: [number, number, number];
  size?: number;
  label?: string;
}> = ({ position = [0, 0, 0], size = 0.2, label }) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial
          color="#2563EB"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {label && (
        <Html position={[0, size + 0.1, 0]} center distanceFactor={8}>
          <span className="px-1 py-0.2 rounded bg-blue-950 text-blue-200 text-[9px] font-mono font-bold select-none pointer-events-none border border-blue-500">
            {label}
          </span>
        </Html>
      )}
    </group>
  );
};

// 2c. Gugus Amino Penanda Biru (-NH2)
export const AminoGroupToken: React.FC<{
  position?: [number, number, number];
  pulse?: boolean;
}> = ({ position = [0, 0, 0], pulse = false }) => {
  return (
    <group position={position}>
      <NitrogenSphere size={0.18} />
      <Html position={[0, 0.22, 0]} center distanceFactor={8}>
        <div className={`px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold text-[9px] shadow-sm border border-blue-300 select-none pointer-events-none ${pulse ? 'animate-bounce' : ''}`}>
          —NH₂
        </div>
      </Html>
    </group>
  );
};

// 3. Token Fosfat (Orange Spheres dengan Label 'P')
export const PhosphateToken: React.FC<{
  position?: [number, number, number];
  size?: number;
}> = ({ position = [0, 0, 0], size = 0.24 }) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color="#EA580C"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {/* 4 oksigen kecil mengelilingi fosfat tetrahedral */}
      <mesh position={[size * 0.5, size * 0.5, 0]}>
        <sphereGeometry args={[size * 0.35, 12, 12]} />
        <meshStandardMaterial color="#EF4444" />
      </mesh>
      <mesh position={[-size * 0.5, -size * 0.5, 0]}>
        <sphereGeometry args={[size * 0.35, 12, 12]} />
        <meshStandardMaterial color="#EF4444" />
      </mesh>
      <Html position={[0, 0, size + 0.05]} center distanceFactor={8}>
        <div className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shadow-md border border-amber-300 select-none pointer-events-none">
          P
        </div>
      </Html>
    </group>
  );
};

// 4. Token Energi & Kofaktor (ATP, ADP, UTP, UDP, GTP, GDP, NAD+, NADH, NADPH, NADP+, FAD, FADH2, CoA)
export const CofactorToken: React.FC<{
  position?: [number, number, number];
  type: 
    | 'ATP' | 'ADP' 
    | 'UTP' | 'UDP' 
    | 'GTP' | 'GDP' 
    | 'NAD+' | 'NADH' 
    | 'NADPH' | 'NADP+' 
    | 'FAD' | 'FADH2' 
    | 'CoA';
  pulse?: boolean;
}> = ({ position = [0, 0, 0], type, pulse = false }) => {
  const getStyle = () => {
    switch (type) {
      case 'ATP':
        return {
          bg: '#EAB308',
          text: 'ATP',
          sub: '3P',
          textColor: '#78350F',
          border: '#FDE047',
          tokenColor: '#EAB308'
        };
      case 'ADP':
        return {
          bg: '#D97706',
          text: 'ADP',
          sub: '2P',
          textColor: '#FFFBEB',
          border: '#FBBF24',
          tokenColor: '#D97706'
        };
      case 'UTP':
        return {
          bg: '#0284C7',
          text: 'UTP',
          sub: '3P',
          textColor: '#F0F9FF',
          border: '#38BDF8',
          tokenColor: '#0284C7'
        };
      case 'UDP':
        return {
          bg: '#0369A1',
          text: 'UDP',
          sub: '2P',
          textColor: '#E0F2FE',
          border: '#7DD3FC',
          tokenColor: '#0369A1'
        };
      case 'GTP':
        return {
          bg: '#059669',
          text: 'GTP',
          sub: '3P',
          textColor: '#ECFDF5',
          border: '#34D399',
          tokenColor: '#059669'
        };
      case 'GDP':
        return {
          bg: '#047857',
          text: 'GDP',
          sub: '2P',
          textColor: '#D1FAE5',
          border: '#6EE7B7',
          tokenColor: '#047857'
        };
      case 'NAD+':
        return {
          bg: '#9333EA',
          text: 'NAD⁺',
          sub: 'Oks',
          textColor: '#FAF5FF',
          border: '#C084FC',
          tokenColor: '#7E22CE'
        };
      case 'NADH':
        return {
          bg: '#7C3AED',
          text: 'NADH',
          sub: 'Red',
          textColor: '#FFFFFF',
          border: '#A855F7',
          tokenColor: '#6D28D9'
        };
      case 'NADPH':
        return {
          bg: '#8B5CF6',
          text: 'NADPH',
          sub: 'Biosint',
          textColor: '#FFFFFF',
          border: '#C4B5FD',
          tokenColor: '#7C3AED'
        };
      case 'NADP+':
        return {
          bg: '#6D28D9',
          text: 'NADP⁺',
          sub: 'Oks',
          textColor: '#EDE9FE',
          border: '#A78BFA',
          tokenColor: '#5B21B6'
        };
      case 'FAD':
        return {
          bg: '#2563EB',
          text: 'FAD',
          sub: 'Oks',
          textColor: '#EFF6FF',
          border: '#60A5FA',
          tokenColor: '#1D4ED8'
        };
      case 'FADH2':
        return {
          bg: '#1D4ED8',
          text: 'FADH₂',
          sub: 'Red',
          textColor: '#FFFFFF',
          border: '#93C5FD',
          tokenColor: '#1E40AF'
        };
      case 'CoA':
        return {
          bg: '#0D9488',
          text: 'CoA',
          sub: '-SH',
          textColor: '#F0FDFA',
          border: '#2DD4BF',
          tokenColor: '#0F766E'
        };
    }
  };

  const style = getStyle();

  return (
    <group position={position}>
      {/* 3D Capsule / Cylinder Puck */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.12, 24]} />
        <meshStandardMaterial
          color={style.tokenColor}
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>

      <Html position={[0, 0, 0.15]} center distanceFactor={8}>
        <div 
          className={`px-2 py-0.5 rounded-lg text-center font-bold shadow-md border flex items-center gap-1 select-none pointer-events-none ${pulse ? 'animate-bounce' : ''}`}
          style={{
            backgroundColor: style.bg,
            borderColor: style.border,
            color: style.textColor
          }}
        >
          <span className="text-[11px] font-black tracking-tight">{style.text}</span>
          <span className="text-[8px] opacity-80">{style.sub}</span>
        </div>
      </Html>
    </group>
  );
};

// 5. Molekul CO2 Lengkap (1 C abu-abu gelap terikat 2 O merah)
export const CO2Molecule: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Karbon Tengah */}
      <CarbonSphere position={[0, 0, 0]} size={0.2} />
      {/* Silinder Ikatan Rangkap Kiri */}
      <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.24, 8]} />
        <meshStandardMaterial color="#737373" />
      </mesh>
      {/* Oksigen Kiri */}
      <OxygenSphere position={[-0.34, 0, 0]} size={0.17} />

      {/* Silinder Ikatan Rangkap Kanan */}
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.24, 8]} />
        <meshStandardMaterial color="#737373" />
      </mesh>
      {/* Oksigen Kanan */}
      <OxygenSphere position={[0.34, 0, 0]} size={0.17} />

      <Html position={[0, 0.35, 0]} center distanceFactor={8}>
        <span className="px-1 py-0.5 rounded bg-rose-900/90 text-rose-100 text-[9px] font-mono font-bold select-none pointer-events-none border border-rose-600">
          CO₂
        </span>
      </Html>
    </group>
  );
};

// 6. Partikel H+ (Proton)
export const HPlusParticle: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.6}
        />
      </mesh>
      <Html position={[0, 0.16, 0]} center distanceFactor={8}>
        <span className="text-[9px] font-bold text-sky-400 font-mono select-none pointer-events-none">
          H⁺
        </span>
      </Html>
    </group>
  );
};

// 7. Partikel Elektron Bercahaya
export const ElectronParticle: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#FDE047"
          emissive="#FACC15"
          emissiveIntensity={1.2}
        />
      </mesh>
      <Html position={[0, 0.14, 0]} center distanceFactor={8}>
        <span className="text-[8px] font-mono font-bold text-yellow-300 select-none pointer-events-none">
          2e⁻
        </span>
      </Html>
    </group>
  );
};

// 8. Rantai Molekul Karbon Terhubung (6C, 3C, 2C, 4C, dll.)
export const CarbonChainMolecule: React.FC<{
  numCarbons: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  phosphateIndices?: number[]; // index karbon yang mengikat fosfat (misal [0, 5])
  oxygenIndices?: number[];    // karbon yang mengikat oksigen (misal [0] untuk piruvat)
  hasCoA?: boolean;            // apakah terikat CoA (misal asetil-CoA)
  label?: string;
  isSplitSecondHalf?: boolean; // untuk 3C kedua hasil pembelahan aldolase
  customColor?: string;
}> = ({
  numCarbons,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  phosphateIndices = [],
  oxygenIndices = [],
  hasCoA = false,
  label,
  isSplitSecondHalf = false,
  customColor = '#262626'
}) => {
  const spacing = 0.44;
  const startX = -((numCarbons - 1) * spacing) / 2;

  return (
    <group position={position} rotation={rotation}>
      {/* Karbon-karbon terhubung */}
      {Array.from({ length: numCarbons }).map((_, idx) => {
        const x = startX + idx * spacing;
        // Zig-zag alami rantai karbon
        const y = (idx % 2 === 0 ? 0.08 : -0.08);

        return (
          <group key={idx} position={[x, y, 0]}>
            <CarbonSphere color={customColor} />

            {/* Silinder Ikatan ke karbon berikutnya */}
            {idx < numCarbons - 1 && (
              <mesh position={[spacing / 2, (idx % 2 === 0 ? -0.08 : 0.08), 0]} rotation={[0, 0, (idx % 2 === 0 ? -0.32 : 0.32)]}>
                <cylinderGeometry args={[0.045, 0.045, spacing * 1.05, 8]} />
                <meshStandardMaterial color="#525252" />
              </mesh>
            )}

            {/* Oksigen yang terikat pada karbon tertentu */}
            {oxygenIndices.includes(idx) && (
              <group position={[0, 0.32, 0]}>
                <mesh position={[0, -0.12, 0]}>
                  <cylinderGeometry args={[0.035, 0.035, 0.2, 6]} />
                  <meshStandardMaterial color="#737373" />
                </mesh>
                <OxygenSphere position={[0, 0, 0]} size={0.16} />
              </group>
            )}

            {/* Fosfat yang terikat pada karbon tertentu */}
            {phosphateIndices.includes(idx) && (
              <group position={[0, (idx % 2 === 0 ? 0.44 : -0.44), 0]}>
                <mesh position={[0, (idx % 2 === 0 ? -0.2 : 0.2), 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.26, 8]} />
                  <meshStandardMaterial color="#D97706" />
                </mesh>
                <PhosphateToken />
              </group>
            )}
          </group>
        );
      })}

      {/* Label Gugus CoA jika terikat */}
      {hasCoA && (
        <group position={[startX + (numCarbons - 1) * spacing + 0.48, 0, 0]}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
            <meshStandardMaterial color="#0F766E" />
          </mesh>
          <CofactorToken type="CoA" />
        </group>
      )}

      {/* Badge Nama Molekul Aktif */}
      {label && (
        <Html position={[0, numCarbons > 3 ? 0.75 : 0.65, 0]} center distanceFactor={8}>
          <div className="px-2 py-0.5 rounded-lg bg-stone-900/90 text-amber-200 text-[11px] font-bold shadow-md border border-stone-700 whitespace-nowrap select-none pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

// 9. Partikel Glikogen Bercabang (Glycogenin Core + Ikatan α-1,4 & Percabangan α-1,6)
export const BranchedGlycogenParticle3D: React.FC<{
  position?: [number, number, number];
  growthLevel?: number; // 1 to 4
  highlightBranch?: boolean;
  highlightNonReducingEnd?: boolean;
  showLabels?: boolean;
}> = ({
  position = [0, 0, 0],
  growthLevel = 3,
  highlightBranch = false,
  highlightNonReducingEnd = false,
  showLabels = true
}) => {
  return (
    <group position={position}>
      {/* Inti Protein Glikogenin (Dimer Pusat) */}
      <mesh castShadow>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial
          color="#9333EA"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      {showLabels && (
        <Html position={[0, 0, 0.65]} center distanceFactor={8}>
          <span className="px-1.5 py-0.5 rounded bg-purple-900/90 text-purple-200 text-[9px] font-bold border border-purple-500 whitespace-nowrap select-none pointer-events-none">
            Glycogenin (Primer Inti)
          </span>
        </Html>
      )}

      {/* Rantai-rantai Glukosa Radial (Tier 1: Ikatan α-1,4) */}
      {[0, 1, 2, 3].map((armIdx) => {
        const angle = (armIdx * Math.PI) / 2;
        const armLength = 1.2;
        const endX = Math.cos(angle) * armLength;
        const endY = Math.sin(angle) * armLength;

        return (
          <group key={armIdx}>
            {/* Rantai α-1,4 utama */}
            <line>
              <bufferGeometry
                attach="geometry"
                onUpdate={(self) => {
                  const pts = [
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(endX, endY, 0)
                  ];
                  self.setFromPoints(pts);
                }}
              />
              <lineBasicMaterial attach="material" color="#CA8A04" linewidth={3} />
            </line>

            {/* Manik-manik Glukosa pada Rantai Utama */}
            {[0.4, 0.75, 1.1].map((step, sIdx) => (
              <mesh key={sIdx} position={[Math.cos(angle) * step, Math.sin(angle) * step, 0]}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial color="#EAB308" roughness={0.3} />
              </mesh>
            ))}

            {/* Titik Cabang α-1,6 (Branching Point) jika level >= 2 */}
            {growthLevel >= 2 && (
              <group position={[endX * 0.65, endY * 0.65, 0]}>
                {/* Cabang tegak lurus */}
                <mesh position={[Math.cos(angle + 0.6) * 0.5, Math.sin(angle + 0.6) * 0.5, 0.2]}>
                  <sphereGeometry args={[highlightBranch ? 0.18 : 0.13, 16, 16]} />
                  <meshStandardMaterial
                    color={highlightBranch ? '#F97316' : '#F59E0B'}
                    emissive={highlightBranch ? '#EA580C' : '#000000'}
                    emissiveIntensity={highlightBranch ? 0.6 : 0}
                  />
                </mesh>
                <mesh position={[Math.cos(angle + 0.6) * 0.85, Math.sin(angle + 0.6) * 0.85, 0.3]}>
                  <sphereGeometry args={[0.13, 16, 16]} />
                  <meshStandardMaterial color="#EAB308" />
                </mesh>
              </group>
            )}

            {/* Ujung Non-Pereduksi (Lokasi Penambahan Glukosa oleh Glikogen Sintase) */}
            {growthLevel >= 3 && (
              <group position={[endX, endY, 0]}>
                <mesh>
                  <sphereGeometry args={[highlightNonReducingEnd ? 0.19 : 0.15, 18, 18]} />
                  <meshStandardMaterial
                    color={highlightNonReducingEnd ? '#10B981' : '#EAB308'}
                    emissive={highlightNonReducingEnd ? '#059669' : '#000000'}
                    emissiveIntensity={highlightNonReducingEnd ? 0.8 : 0}
                  />
                </mesh>
                {highlightNonReducingEnd && showLabels && armIdx === 0 && (
                  <Html position={[0.3, 0.3, 0]} center distanceFactor={8}>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[8px] font-bold border border-emerald-500 whitespace-nowrap select-none pointer-events-none">
                      Ujung Nonpereduksi (Target Penambahan Glukosil)
                    </span>
                  </Html>
                )}
              </group>
            )}
          </group>
        );
      })}

      {/* Indikator Label Ikatan α-1,4 vs α-1,6 */}
      {showLabels && highlightBranch && (
        <Html position={[0.8, -0.6, 0.4]} center distanceFactor={8}>
          <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[8px] font-mono font-bold border border-amber-500 select-none pointer-events-none">
            Ikatan Cabang α(1→6)
          </span>
        </Html>
      )}
    </group>
  );
};

// 10. Molekul Triasilgliserol (Trigliserida: 1 Gliserol + 3 Rantai Asil Asam Lemak)
export const TriacylglycerolMolecule3D: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  label?: string;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], label = 'Triasilgliserol (TAG)' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Tulang Punggung Gliserol (3 Karbon Vertikal) */}
      {[-0.35, 0, 0.35].map((y, idx) => (
        <group key={idx} position={[-0.8, y, 0]}>
          <CarbonSphere size={0.16} color="#404040" />
          {/* Ikatan vertikal antar-karbon gliserol */}
          {idx < 2 && (
            <mesh position={[0, 0.175, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.35, 8]} />
              <meshStandardMaterial color="#525252" />
            </mesh>
          )}

          {/* Ikatan Ester Oksigen */}
          <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.22, 6]} />
            <meshStandardMaterial color="#737373" />
          </mesh>
          <OxygenSphere position={[0.3, 0, 0]} size={0.13} />

          {/* Rantai Asil Asam Lemak Zig-Zag Memanjang ke Kanan (16 Karbon Rantai) */}
          <group position={[0.45, 0, 0]}>
            {Array.from({ length: 8 }).map((_, cIdx) => (
              <group key={cIdx} position={[cIdx * 0.22, (cIdx % 2 === 0 ? 0.05 : -0.05), 0]}>
                <CarbonSphere size={0.11} color="#262626" />
                {cIdx < 7 && (
                  <mesh position={[0.11, (cIdx % 2 === 0 ? -0.05 : 0.05), 0]} rotation={[0, 0, (cIdx % 2 === 0 ? -0.4 : 0.4)]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.24, 6]} />
                    <meshStandardMaterial color="#525252" />
                  </mesh>
                )}
              </group>
            ))}
          </group>
        </group>
      ))}

      {/* Label Gliserol Backbone */}
      <Html position={[-0.8, -0.65, 0]} center distanceFactor={8}>
        <span className="px-1 py-0.2 rounded bg-stone-900/90 text-stone-300 text-[8px] font-mono border border-stone-700 select-none pointer-events-none">
          Kerangka Gliserol
        </span>
      </Html>

      {/* Label Keseluruhan */}
      {label && (
        <Html position={[0.5, 0.7, 0]} center distanceFactor={8}>
          <div className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 text-[10px] font-bold border border-emerald-600 shadow-md select-none pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

// 11. Molekul Asam Amino (Kerangka Karbon + Gugus Karboksil -COOH + Gugus Amino -NH2)
export const AminoAcidMolecule3D: React.FC<{
  position?: [number, number, number];
  name: string;
  numCarbons: number;
  hasAminoDonor?: boolean;
}> = ({ position = [0, 0, 0], name, numCarbons, hasAminoDonor = false }) => {
  return (
    <group position={position}>
      {/* Rantai Karbon Dasar */}
      <CarbonChainMolecule
        numCarbons={numCarbons}
        oxygenIndices={[0]}
        label={name}
      />

      {/* Gugus Amino (-NH2) yang menempel pada C alfa */}
      <group position={[-((numCarbons - 1) * 0.44) / 2 + 0.44, -0.45, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.25, 6]} />
          <meshStandardMaterial color="#1D4ED8" />
        </mesh>
        <AminoGroupToken pulse={hasAminoDonor} />
      </group>
    </group>
  );
};
