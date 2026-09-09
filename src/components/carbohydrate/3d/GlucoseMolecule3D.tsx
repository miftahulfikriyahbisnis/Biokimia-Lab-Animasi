/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  RotateCw, 
  Eye, 
  EyeOff, 
  Layers, 
  Check, 
  Tag, 
  Atom, 
  Maximize2 
} from 'lucide-react';

export interface GlucoseMolecule3DProps {
  showLabels?: boolean;
  isStraightChain?: boolean;
  onSelectCarbon?: (carbonNumber: number | null) => void;
  selectedCarbon?: number | null;
}

// =========================================================================
// MOLECULAR GRAPH ARCHITECTURE (BETA-D-GLUCOPYRANOSE - CID 64689 / PDB BGC)
// Formula: C₆H₁₂O₆ (24 atom: 6 C, 6 O, 12 H)
// Cincin Piranosa: 5 Karbon (C1 s.d. C5) + 1 Oksigen Eter (O5)
// Karbon ke-6 (C6) berada di luar cincin sebagai gugus -CH₂OH
// Konformasi Kursi ⁴C₁ stabil: Seluruh gugus -OH dan -CH₂OH di posisi ekuatorial
// =========================================================================

export interface MoleculeAtom {
  id: string;
  element: 'C' | 'O' | 'H';
  name: string;
  shortLabel: string;
  position: [number, number, number];
  carbonNumber?: number; // 1 s.d. 6
  role: string;
  isHydroxyl?: boolean;
  isRingOxygen?: boolean;
  isCarbonyl?: boolean;
}

export interface MoleculeBond {
  from: string;
  to: string;
  order: 1 | 2;
}

// Data koordinat 3D terpusat (Center of Geometry = [0, 0, 0])
// Diambil dari data kristalografi & komputasi ideal PDB ligand BGC (Beta-D-Glucose)
const BETA_D_GLUCOSE_ATOMS: MoleculeAtom[] = [
  // 6 Karbon (5 di dalam cincin + 1 ekstrasiklik C-6)
  { 
    id: 'C1', 
    element: 'C', 
    name: 'Karbon C-1 (Anomerik)', 
    shortLabel: 'C1', 
    position: [-0.788, 1.470, 0.275], 
    carbonNumber: 1, 
    role: 'Karbon Anomerik (hemiasetal); penentu anomer β (OH ekuatorial atas) dan situs ikatan glikosidik' 
  },
  { 
    id: 'C2', 
    element: 'C', 
    name: 'Karbon Kiral C-2', 
    shortLabel: 'C2', 
    position: [-1.693, 0.339, -0.222], 
    carbonNumber: 2, 
    role: 'Karbon kiral pembawa gugus -OH ekuatorial; isomerisasi menjadi fruktosa pada glikolisis' 
  },
  { 
    id: 'C3', 
    element: 'C', 
    name: 'Karbon Kiral C-3', 
    shortLabel: 'C3', 
    position: [-1.126, -1.003, 0.250], 
    carbonNumber: 3, 
    role: 'Karbon kiral dengan orientasi gugus -OH khas D-glukosa (sisi berlawanan dari C2/C4)' 
  },
  { 
    id: 'C4', 
    element: 'C', 
    name: 'Karbon Kiral C-4', 
    shortLabel: 'C4', 
    position: [0.312, -1.144, -0.259], 
    carbonNumber: 4, 
    role: 'Karbon kiral penyedia gugus -OH untuk pembentukan polimer amilosa/glikogen (ikatan α-1,4)' 
  },
  { 
    id: 'C5', 
    element: 'C', 
    name: 'Karbon Kiral C-5', 
    shortLabel: 'C5', 
    position: [1.140, 0.044, 0.238], 
    carbonNumber: 5, 
    role: 'Karbon kiral penutup cincin piranosa bersama O-5; penentu seri stereokimia D-glukosa' 
  },
  { 
    id: 'C6', 
    element: 'C', 
    name: 'Karbon Ekstrasiklik C-6', 
    shortLabel: 'C6', 
    position: [2.563, -0.058, -0.316], 
    carbonNumber: 6, 
    role: 'Karbon ke-6 di luar cincin (-CH₂OH); tempat fosforilasi pertama oleh Heksokinase membentuk G6P' 
  },

  // 6 Oksigen (1 Oksigen Eter Cincin + 5 Gugus Hidroksil)
  { 
    id: 'O5', 
    element: 'O', 
    name: 'Oksigen Cincin (O-5)', 
    shortLabel: 'O5', 
    position: [0.541, 1.261, -0.209], 
    isRingOxygen: true, 
    role: 'Oksigen eter intramolekuler yang menutup cincin 6 anggota piranosa antara C-1 dan C-5' 
  },
  { 
    id: 'O1', 
    element: 'O', 
    name: 'Oksigen Hidroksil O-1', 
    shortLabel: 'O1', 
    position: [-1.280, 2.721, -0.208], 
    isHydroxyl: true, 
    role: 'Oksigen dari gugus -OH anomerik pada C-1 (konfigurasi ekuatorial β)' 
  },
  { 
    id: 'O2', 
    element: 'O', 
    name: 'Oksigen Hidroksil O-2', 
    shortLabel: 'O2', 
    position: [-3.009, 0.514, 0.308], 
    isHydroxyl: true, 
    role: 'Oksigen dari gugus -OH pada C-2' 
  },
  { 
    id: 'O3', 
    element: 'O', 
    name: 'Oksigen Hidroksil O-3', 
    shortLabel: 'O3', 
    position: [-1.923, -2.069, -0.270], 
    isHydroxyl: true, 
    role: 'Oksigen dari gugus -OH pada C-3' 
  },
  { 
    id: 'O4', 
    element: 'O', 
    name: 'Oksigen Hidroksil O-4', 
    shortLabel: 'O4', 
    position: [0.877, -2.360, 0.235], 
    isHydroxyl: true, 
    role: 'Oksigen dari gugus -OH pada C-4' 
  },
  { 
    id: 'O6', 
    element: 'O', 
    name: 'Oksigen Hidroksil O-6', 
    shortLabel: 'O6', 
    position: [3.366, 0.984, 0.241], 
    isHydroxyl: true, 
    role: 'Oksigen dari gugus alkohol primer -OH pada C-6' 
  },

  // 12 Hidrogen Lengkap
  { id: 'H1', element: 'H', name: 'Hidrogen H-C1', shortLabel: 'H', position: [-0.781, 1.478, 1.365], role: 'Hidrogen aksial terikat pada C-1' },
  { id: 'HO1', element: 'H', name: 'Hidrogen H-O1', shortLabel: 'H', position: [-0.754, 3.484, 0.068], isHydroxyl: true, role: 'Hidrogen dari gugus hidroksil -OH pada C-1' },
  { id: 'H2', element: 'H', name: 'Hidrogen H-C2', shortLabel: 'H', position: [-1.733, 0.356, -1.311], role: 'Hidrogen aksial terikat pada C-2' },
  { id: 'HO2', element: 'H', name: 'Hidrogen H-O2', shortLabel: 'H', position: [-3.430, 1.345, 0.049], isHydroxyl: true, role: 'Hidrogen dari gugus hidroksil -OH pada C-2' },
  { id: 'H3', element: 'H', name: 'Hidrogen H-C3', shortLabel: 'H', position: [-1.132, -1.039, 1.339], role: 'Hidrogen aksial terikat pada C-3' },
  { id: 'HO3', element: 'H', name: 'Hidrogen H-O3', shortLabel: 'H', position: [-2.849, -2.038, 0.007], isHydroxyl: true, role: 'Hidrogen dari gugus hidroksil -OH pada C-3' },
  { id: 'H4', element: 'H', name: 'Hidrogen H-C4', shortLabel: 'H', position: [0.313, -1.157, -1.349], role: 'Hidrogen aksial terikat pada C-4' },
  { id: 'HO4', element: 'H', name: 'Hidrogen H-O4', shortLabel: 'H', position: [0.399, -3.155, -0.038], isHydroxyl: true, role: 'Hidrogen dari gugus hidroksil -OH pada C-4' },
  { id: 'H5', element: 'H', name: 'Hidrogen H-C5', shortLabel: 'H', position: [1.172, 0.033, 1.328], role: 'Hidrogen aksial terikat pada C-5' },
  { id: 'H6a', element: 'H', name: 'Hidrogen H-C6 (a)', shortLabel: 'H', position: [2.988, -1.026, -0.050], role: 'Hidrogen pertama pada gugus -CH₂OH' },
  { id: 'H6b', element: 'H', name: 'Hidrogen H-C6 (b)', shortLabel: 'H', position: [2.538, 0.042, -1.401], role: 'Hidrogen kedua pada gugus -CH₂OH' },
  { id: 'HO6', element: 'H', name: 'Hidrogen H-O6', shortLabel: 'H', position: [4.283, 0.981, -0.066], isHydroxyl: true, role: 'Hidrogen dari gugus hidroksil -OH terminal pada C-6' },
];

// 24 Ikatan Kimia Deterministik β-D-Glukopiranosa
const BETA_D_GLUCOSE_BONDS: MoleculeBond[] = [
  // 1. Cincin Piranosa (5 Karbon + 1 Oksigen)
  { from: 'C1', to: 'C2', order: 1 },
  { from: 'C2', to: 'C3', order: 1 },
  { from: 'C3', to: 'C4', order: 1 },
  { from: 'C4', to: 'C5', order: 1 },
  { from: 'C5', to: 'O5', order: 1 },
  { from: 'O5', to: 'C1', order: 1 },

  // 2. Gugus Ekstrasiklik C-6 (-CH₂OH)
  { from: 'C5', to: 'C6', order: 1 },
  { from: 'C6', to: 'O6', order: 1 },
  { from: 'C6', to: 'H6a', order: 1 },
  { from: 'C6', to: 'H6b', order: 1 },
  { from: 'O6', to: 'HO6', order: 1 },

  // 3. Gugus Hidroksil & Hidrogen pada Atom Cincin
  { from: 'C1', to: 'O1', order: 1 },
  { from: 'O1', to: 'HO1', order: 1 },
  { from: 'C1', to: 'H1', order: 1 },

  { from: 'C2', to: 'O2', order: 1 },
  { from: 'O2', to: 'HO2', order: 1 },
  { from: 'C2', to: 'H2', order: 1 },

  { from: 'C3', to: 'O3', order: 1 },
  { from: 'O3', to: 'HO3', order: 1 },
  { from: 'C3', to: 'H3', order: 1 },

  { from: 'C4', to: 'O4', order: 1 },
  { from: 'O4', to: 'HO4', order: 1 },
  { from: 'C4', to: 'H4', order: 1 },

  { from: 'C5', to: 'H5', order: 1 },
];

// Model Rantai Terbuka Fischer D-Glukosa (Zigzag 3D Stabil)
const FISCHER_GLUCOSE_ATOMS: MoleculeAtom[] = [
  { id: 'C1', element: 'C', name: 'Karbon C-1 (Aldehida)', shortLabel: 'C1', position: [2.5, 0.45, 0], carbonNumber: 1, role: 'Karbon Karbonil Aldehida (-CH=O)', isCarbonyl: true },
  { id: 'C2', element: 'C', name: 'Karbon Kiral C-2', shortLabel: 'C2', position: [1.5, -0.45, 0], carbonNumber: 2, role: 'Karbon kiral C-2 (OH sisi kanan pada Fischer)' },
  { id: 'C3', element: 'C', name: 'Karbon Kiral C-3', shortLabel: 'C3', position: [0.5, 0.45, 0], carbonNumber: 3, role: 'Karbon kiral C-3 (OH sisi kiri pada Fischer)' },
  { id: 'C4', element: 'C', name: 'Karbon Kiral C-4', shortLabel: 'C4', position: [-0.5, -0.45, 0], carbonNumber: 4, role: 'Karbon kiral C-4 (OH sisi kanan)' },
  { id: 'C5', element: 'C', name: 'Karbon Kiral C-5', shortLabel: 'C5', position: [-1.5, 0.45, 0], carbonNumber: 5, role: 'Karbon kiral C-5 penentu seri D-glukosa' },
  { id: 'C6', element: 'C', name: 'Karbon Ujung C-6', shortLabel: 'C6', position: [-2.5, -0.45, 0], carbonNumber: 6, role: 'Gugus alkohol primer terminal (-CH₂OH)' },

  { id: 'O1', element: 'O', name: 'Oksigen Karbonil O-1 (=O)', shortLabel: 'O1', position: [3.45, 1.25, 0], role: 'Oksigen ikatan rangkap karbonil aldehida (=O)', isCarbonyl: true },
  { id: 'O2', element: 'O', name: 'Oksigen Hidroksil O-2', shortLabel: 'O2', position: [1.5, -1.25, 1.1], isHydroxyl: true, role: 'Gugus -OH pada C-2' },
  { id: 'O3', element: 'O', name: 'Oksigen Hidroksil O-3', shortLabel: 'O3', position: [0.5, 1.25, -1.1], isHydroxyl: true, role: 'Gugus -OH pada C-3' },
  { id: 'O4', element: 'O', name: 'Oksigen Hidroksil O-4', shortLabel: 'O4', position: [-0.5, -1.25, 1.1], isHydroxyl: true, role: 'Gugus -OH pada C-4' },
  { id: 'O5', element: 'O', name: 'Oksigen Hidroksil O-5', shortLabel: 'O5', position: [-1.5, 1.25, 1.1], isHydroxyl: true, role: 'Gugus -OH pada C-5 yang menyerang C1 saat siklisasi' },
  { id: 'O6', element: 'O', name: 'Oksigen Hidroksil O-6', shortLabel: 'O6', position: [-3.6, 0.35, 0.3], isHydroxyl: true, role: 'Gugus -OH terminal pada C-6' },

  { id: 'H1', element: 'H', name: 'Hidrogen H-C1', shortLabel: 'H', position: [2.6, 0.35, -1.1], role: 'Hidrogen aldehida pada C-1' },
  { id: 'H2', element: 'H', name: 'Hidrogen H-C2', shortLabel: 'H', position: [1.5, -0.6, -1.1], role: 'Hidrogen kiral C-2' },
  { id: 'HO2', element: 'H', name: 'Hidrogen H-O2', shortLabel: 'H', position: [2.2, -1.8, 1.2], isHydroxyl: true, role: 'Hidrogen hidroksil pada C-2' },
  { id: 'H3', element: 'H', name: 'Hidrogen H-C3', shortLabel: 'H', position: [0.5, 0.6, 1.1], role: 'Hidrogen kiral C-3' },
  { id: 'HO3', element: 'H', name: 'Hidrogen H-O3', shortLabel: 'H', position: [-0.2, 1.8, -1.2], isHydroxyl: true, role: 'Hidrogen hidroksil pada C-3' },
  { id: 'H4', element: 'H', name: 'Hidrogen H-C4', shortLabel: 'H', position: [-0.5, -0.6, -1.1], role: 'Hidrogen kiral C-4' },
  { id: 'HO4', element: 'H', name: 'Hidrogen H-O4', shortLabel: 'H', position: [0.2, -1.8, 1.2], isHydroxyl: true, role: 'Hidrogen hidroksil pada C-4' },
  { id: 'H5', element: 'H', name: 'Hidrogen H-C5', shortLabel: 'H', position: [-1.5, 0.6, -1.1], role: 'Hidrogen kiral C-5' },
  { id: 'HO5', element: 'H', name: 'Hidrogen H-O5', shortLabel: 'H', position: [-0.9, 1.9, 1.1], isHydroxyl: true, role: 'Hidrogen hidroksil pada C-5' },
  { id: 'H6a', element: 'H', name: 'Hidrogen H-C6 (a)', shortLabel: 'H', position: [-2.6, -1.4, -0.4], role: 'Hidrogen pertama C-6' },
  { id: 'H6b', element: 'H', name: 'Hidrogen H-C6 (b)', shortLabel: 'H', position: [-2.5, -0.5, -1.1], role: 'Hidrogen kedua C-6' },
  { id: 'HO6', element: 'H', name: 'Hidrogen H-O6', shortLabel: 'H', position: [-4.2, 0.1, 0.9], isHydroxyl: true, role: 'Hidrogen hidroksil terminal C-6' },
];

const FISCHER_GLUCOSE_BONDS: MoleculeBond[] = [
  { from: 'C1', to: 'C2', order: 1 },
  { from: 'C2', to: 'C3', order: 1 },
  { from: 'C3', to: 'C4', order: 1 },
  { from: 'C4', to: 'C5', order: 1 },
  { from: 'C5', to: 'C6', order: 1 },

  { from: 'C1', to: 'O1', order: 2 }, // Ikatan rangkap karbonil C=O
  { from: 'C1', to: 'H1', order: 1 },

  { from: 'C2', to: 'O2', order: 1 },
  { from: 'O2', to: 'HO2', order: 1 },
  { from: 'C2', to: 'H2', order: 1 },

  { from: 'C3', to: 'O3', order: 1 },
  { from: 'O3', to: 'HO3', order: 1 },
  { from: 'C3', to: 'H3', order: 1 },

  { from: 'C4', to: 'O4', order: 1 },
  { from: 'O4', to: 'HO4', order: 1 },
  { from: 'C4', to: 'H4', order: 1 },

  { from: 'C5', to: 'O5', order: 1 },
  { from: 'O5', to: 'HO5', order: 1 },
  { from: 'C5', to: 'H5', order: 1 },

  { from: 'C6', to: 'O6', order: 1 },
  { from: 'O6', to: 'HO6', order: 1 },
  { from: 'C6', to: 'H6a', order: 1 },
  { from: 'C6', to: 'H6b', order: 1 },
];

// =========================================================================
// KOMPONEN IKATAN KIMIA (Bond3D)
// Dihitung dengan quaternion persis dari vektor (0,1,0) ke arah vektor atom A -> B.
// Panjang silinder = jarak pusat kedua atom. Ujung silinder tertanam di dalam bola.
// =========================================================================
interface Bond3DProps {
  start: [number, number, number];
  end: [number, number, number];
  order?: 1 | 2;
  radius?: number;
  color?: string;
  isSpaceFilling?: boolean;
}

const Bond3D: React.FC<Bond3DProps> = ({
  start,
  end,
  order = 1,
  radius = 0.055,
  color = '#94A3B8',
  isSpaceFilling = false
}) => {
  // Dalam representasi space-filling, ikatan kimia dibuat kecil/tersamar
  const effectiveRadius = isSpaceFilling ? 0.02 : radius;

  const p1 = useMemo(() => new THREE.Vector3(...start), [start[0], start[1], start[2]]);
  const p2 = useMemo(() => new THREE.Vector3(...end), [end[0], end[1], end[2]]);

  const { midpoint, distance, quaternion, perpOffset } = useMemo(() => {
    const v = new THREE.Vector3().subVectors(p2, p1);
    const dist = v.length();
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const dir = v.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(up, dir);

    // Vektor tegak lurus untuk ikatan rangkap dua
    let perp = new THREE.Vector3(0, 0, 1).cross(dir);
    if (perp.lengthSq() < 0.001) {
      perp = new THREE.Vector3(1, 0, 0).cross(dir);
    }
    perp.normalize().multiplyScalar(0.06);

    return { midpoint: mid, distance: dist, quaternion: q, perpOffset: perp };
  }, [p1, p2]);

  if (order === 2 && !isSpaceFilling) {
    const posA = midpoint.clone().add(perpOffset);
    const posB = midpoint.clone().sub(perpOffset);

    return (
      <group>
        <mesh position={posA} quaternion={quaternion}>
          <cylinderGeometry args={[effectiveRadius * 0.75, effectiveRadius * 0.75, distance, 16]} />
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
        </mesh>
        <mesh position={posB} quaternion={quaternion}>
          <cylinderGeometry args={[effectiveRadius * 0.75, effectiveRadius * 0.75, distance, 16]} />
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[effectiveRadius, effectiveRadius, distance, 16]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
    </mesh>
  );
};

// =========================================================================
// KOMPONEN ATOM 3D (Atom3D)
// Pewarnaan CPK standar:
// Karbon = Charcoal / Hitam grafit (#22252A / #1F2937)
// Oksigen = Merah (#DC2626)
// Hidrogen = Putih mutiara (#F8FAFC)
// Representasi Ball & Stick vs Space Filling
// =========================================================================
interface Atom3DProps {
  atom: MoleculeAtom;
  isSelected: boolean;
  isHydroxylHighlighted: boolean;
  showCarbonNumber: boolean;
  isSpaceFilling: boolean;
  onSelect: (atom: MoleculeAtom) => void;
}

const Atom3D: React.FC<Atom3DProps> = ({
  atom,
  isSelected,
  isHydroxylHighlighted,
  showCarbonNumber,
  isSpaceFilling,
  onSelect
}) => {
  const [hovered, setHovered] = useState(false);

  // Radius bola deterministik sesuai jenis atom & mode representasi
  const sphereRadius = useMemo(() => {
    if (isSpaceFilling) {
      // Skala Van der Waals relatif
      if (atom.element === 'C') return 0.62;
      if (atom.element === 'O') return 0.55;
      return 0.42; // H
    }
    // Ball & Stick
    if (atom.element === 'C') return 0.26;
    if (atom.element === 'O') return 0.23;
    return 0.15; // H
  }, [atom.element, isSpaceFilling]);

  // Pewarnaan CPK
  const { baseColor, emissiveColor, roughness, metalness } = useMemo(() => {
    if (isSelected) {
      return {
        baseColor: '#F59E0B', // Emas Amber saat dipilih
        emissiveColor: '#B45309',
        roughness: 0.15,
        metalness: 0.3
      };
    }

    if (isHydroxylHighlighted && atom.isHydroxyl) {
      // Sorotan khas untuk gugus -OH
      if (atom.element === 'O') {
        return {
          baseColor: '#0D9488', // Teal cerah untuk Oksigen -OH
          emissiveColor: '#0F766E',
          roughness: 0.15,
          metalness: 0.25
        };
      }
      return {
        baseColor: '#CCFBF1', // Mint putih untuk Hidrogen -OH
        emissiveColor: '#14B8A6',
        roughness: 0.2,
        metalness: 0.1
      };
    }

    if (atom.element === 'C') {
      return {
        baseColor: '#262626', // Karbon: abu-abu tua / hitam CPK
        emissiveColor: '#0A0A0A',
        roughness: 0.2,
        metalness: 0.25
      };
    }

    if (atom.element === 'O') {
      return {
        baseColor: '#DC2626', // Oksigen: merah CPK
        emissiveColor: '#7F1D1D',
        roughness: 0.15,
        metalness: 0.15
      };
    }

    // Hidrogen
    return {
      baseColor: '#F8FAFC', // Hidrogen: putih CPK
      emissiveColor: '#64748B',
      roughness: 0.22,
      metalness: 0.1
    };
  }, [atom.element, atom.isHydroxyl, isSelected, isHydroxylHighlighted]);

  return (
    <group position={atom.position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(atom);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        scale={isSelected ? 1.25 : hovered ? 1.12 : 1.0}
      >
        <sphereGeometry args={[sphereRadius, 32, 32]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.35 : 0.12}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>

      {/* Label Kecil Nomor Karbon (C1–C6) Saja, Tanpa Kotak Teks Besar Melayang */}
      {showCarbonNumber && atom.element === 'C' && atom.carbonNumber && (
        <Html 
          distanceFactor={7.5} 
          position={[0, sphereRadius + 0.18, 0]} 
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-tight transition-all shadow-xs ${
              isSelected
                ? 'bg-amber-500 text-white ring-2 ring-white scale-110 shadow-md'
                : 'bg-stone-900/85 text-amber-300 border border-amber-400/40 backdrop-blur-xs'
            }`}
          >
            C{atom.carbonNumber}
          </div>
        </Html>
      )}

      {/* Indikator Oksigen Cincin O5 jika diaktifkan */}
      {showCarbonNumber && atom.id === 'O5' && (
        <Html 
          distanceFactor={7.5} 
          position={[0, sphereRadius + 0.18, 0]} 
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div className="px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono bg-red-950/85 text-red-200 border border-red-400/40 backdrop-blur-xs shadow-xs">
            O5
          </div>
        </Html>
      )}
    </group>
  );
};

// =========================================================================
// PARENT GROUP MOLECULE INNER (GlucoseMolecule3D)
// Seluruh molekul berada dalam satu parent group, berputar dan bergerak
// sebagai satu kesatuan utuh deterministik.
// =========================================================================
interface MoleculeGroupInnerProps {
  isStraightChain: boolean;
  selectedAtomId: string | null;
  onSelectAtom: (atom: MoleculeAtom) => void;
  hideHydrogen: boolean;
  showCarbonNumbers: boolean;
  highlightHydroxyls: boolean;
  isSpaceFilling: boolean;
  isAutoRotate: boolean;
}

const MoleculeGroupInner: React.FC<MoleculeGroupInnerProps> = ({
  isStraightChain,
  selectedAtomId,
  onSelectAtom,
  hideHydrogen,
  showCarbonNumbers,
  highlightHydroxyls,
  isSpaceFilling,
  isAutoRotate
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Animasi rotasi satu kesatuan molekul (rigid body rotation)
  useFrame((_, delta) => {
    if (groupRef.current && isAutoRotate) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const allAtoms = isStraightChain ? FISCHER_GLUCOSE_ATOMS : BETA_D_GLUCOSE_ATOMS;
  const allBonds = isStraightChain ? FISCHER_GLUCOSE_BONDS : BETA_D_GLUCOSE_BONDS;

  // Filter atom jika opsi sembunyikan hidrogen aktif
  const visibleAtoms = useMemo(() => {
    if (hideHydrogen) {
      return allAtoms.filter(a => a.element !== 'H');
    }
    return allAtoms;
  }, [allAtoms, hideHydrogen]);

  // Peta atom untuk resolusi cepat koordinat ikatan
  const atomMap = useMemo(() => {
    const map = new Map<string, MoleculeAtom>();
    allAtoms.forEach(a => map.set(a.id, a));
    return map;
  }, [allAtoms]);

  // Filter ikatan jika hidrogen disembunyikan
  const visibleBonds = useMemo(() => {
    return allBonds.filter(bond => {
      const a1 = atomMap.get(bond.from);
      const a2 = atomMap.get(bond.to);
      if (!a1 || !a2) return false;
      if (hideHydrogen && (a1.element === 'H' || a2.element === 'H')) {
        return false;
      }
      return true;
    });
  }, [allBonds, atomMap, hideHydrogen]);

  return (
    <group ref={groupRef} name="GlucoseMolecule3D">
      {/* 1. Rendisi Seluruh Ikatan Kimia (Silinder Deterministik) */}
      {visibleBonds.map((bond, idx) => {
        const a1 = atomMap.get(bond.from);
        const a2 = atomMap.get(bond.to);
        if (!a1 || !a2) return null;

        return (
          <Bond3D
            key={`bond-${bond.from}-${bond.to}-${idx}`}
            start={a1.position}
            end={a2.position}
            order={bond.order}
            radius={0.055}
            color="#94A3B8"
            isSpaceFilling={isSpaceFilling}
          />
        );
      })}

      {/* 2. Rendisi Seluruh Bola Atom CPK */}
      {visibleAtoms.map((atom) => {
        const isSelected = atom.id === selectedAtomId;
        return (
          <Atom3D
            key={atom.id}
            atom={atom}
            isSelected={isSelected}
            isHydroxylHighlighted={highlightHydroxyls}
            showCarbonNumber={showCarbonNumbers}
            isSpaceFilling={isSpaceFilling}
            onSelect={onSelectAtom}
          />
        );
      })}
    </group>
  );
};

// =========================================================================
// KOMPONEN UTAMA EXPORT: GlucoseMolecule3D
// Lengkap dengan kontrol visual:
// - Ball & Stick vs Space Filling
// - Tampilkan Semua Atom vs Sembunyikan Atom H
// - Tampilkan Nomor Karbon C1–C6
// - Sorot Gugus Hidroksil (-OH)
// - Putar Molekul Otomatis
// - Reset Orientasi Kamera
// - Legenda CPK dan Ikatan di bagian bawah
// =========================================================================
export const GlucoseMolecule3D: React.FC<GlucoseMolecule3DProps> = ({
  showLabels = true,
  isStraightChain = false,
  onSelectCarbon,
  selectedCarbon = null
}) => {
  const controlsRef = useRef<any>(null);

  // State tampilan & representasi molekuler
  const [representation, setRepresentation] = useState<'BALL_AND_STICK' | 'SPACE_FILLING'>('BALL_AND_STICK');
  const [hideHydrogen, setHideHydrogen] = useState(false);
  const [showCarbonNumbers, setShowCarbonNumbers] = useState(showLabels);
  const [highlightHydroxyls, setHighlightHydroxyls] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Atom yang sedang dipilih untuk detail bawah
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(
    selectedCarbon ? `C${selectedCarbon}` : 'C1'
  );

  // Sinkronisasi dengan prop selectedCarbon dari luar (CarbohydrateTheory)
  React.useEffect(() => {
    if (selectedCarbon !== undefined && selectedCarbon !== null) {
      setSelectedAtomId(`C${selectedCarbon}`);
    }
  }, [selectedCarbon]);

  // Handler seleksi atom
  const handleSelectAtom = (atom: MoleculeAtom) => {
    setSelectedAtomId(atom.id);
    if (atom.carbonNumber && onSelectCarbon) {
      onSelectCarbon(atom.carbonNumber);
    }
  };

  // Reset kamera & orientasi
  const handleResetOrientation = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Info atom aktif saat ini
  const activeAtom = useMemo(() => {
    const list = isStraightChain ? FISCHER_GLUCOSE_ATOMS : BETA_D_GLUCOSE_ATOMS;
    return list.find(a => a.id === selectedAtomId) || list[0];
  }, [isStraightChain, selectedAtomId]);

  return (
    <div className="w-full h-full relative select-none rounded-2xl overflow-hidden flex flex-col bg-[#18181B]">
      
      {/* 1. TOOLBAR ATAS: Kontrol Representasi & Tampilan Interaktif */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Tombol Kiri: Pilihan Representasi & Toggle Atom */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
          
          {/* Pilihan Representasi: Ball & Stick vs Space Filling */}
          <div className="inline-flex rounded-xl bg-stone-900/90 p-0.5 border border-stone-700/80 shadow-xs backdrop-blur-md">
            <button
              onClick={() => setRepresentation('BALL_AND_STICK')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                representation === 'BALL_AND_STICK'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Representasi Bola & Batang (Ball and Stick)"
            >
              <Atom className="w-3 h-3" />
              <span>Ball & Stick</span>
            </button>
            <button
              onClick={() => setRepresentation('SPACE_FILLING')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                representation === 'SPACE_FILLING'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Representasi Ruang (Space Filling / CPK)"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Space Filling</span>
            </button>
          </div>

          {/* Toggle Sembunyikan / Tampilkan Hidrogen */}
          <button
            onClick={() => setHideHydrogen(!hideHydrogen)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border backdrop-blur-md transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              hideHydrogen
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                : 'bg-stone-900/85 text-stone-300 border-stone-700 hover:bg-stone-800'
            }`}
            title="Sembunyikan atau tampilkan 12 atom hidrogen"
          >
            {hideHydrogen ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            <span>{hideHydrogen ? 'H: Tersembunyi' : 'H: Tampil'}</span>
          </button>

          {/* Toggle Nomor Karbon C1–C6 */}
          <button
            onClick={() => setShowCarbonNumbers(!showCarbonNumbers)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border backdrop-blur-md transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              showCarbonNumbers
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                : 'bg-stone-900/85 text-stone-300 border-stone-700 hover:bg-stone-800'
            }`}
            title="Tampilkan label nomor karbon C1 hingga C6"
          >
            <Tag className="w-3 h-3" />
            <span>{showCarbonNumbers ? 'Nomor C: On' : 'Nomor C: Off'}</span>
          </button>

          {/* Toggle Sorot Gugus Hidroksil (-OH) */}
          <button
            onClick={() => setHighlightHydroxyls(!highlightHydroxyls)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border backdrop-blur-md transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              highlightHydroxyls
                ? 'bg-teal-500/25 text-teal-300 border-teal-400/60'
                : 'bg-stone-900/85 text-stone-300 border-stone-700 hover:bg-stone-800'
            }`}
            title="Sorot 5 gugus -OH hidroksil"
          >
            <Sparkles className="w-3 h-3" />
            <span>{highlightHydroxyls ? 'Gugus -OH: Sorot' : 'Gugus -OH'}</span>
          </button>
        </div>

        {/* Tombol Kanan: Putar, Reset, Tema */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Toggle Rotasi Otomatis */}
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-2 py-1 rounded-xl text-[11px] font-semibold border backdrop-blur-md transition-all cursor-pointer shadow-xs flex items-center gap-1 ${
              isAutoRotate
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                : 'bg-stone-900/85 text-stone-400 border-stone-700'
            }`}
            title="Aktifkan atau jeda rotasi otomatis"
          >
            <RotateCw className={`w-3 h-3 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{isAutoRotate ? 'Putar' : 'Jeda'}</span>
          </button>

          {/* Reset Orientasi */}
          <button
            onClick={handleResetOrientation}
            className="px-2 py-1 rounded-xl text-[11px] font-semibold border backdrop-blur-md bg-stone-900/85 text-stone-300 border-stone-700 hover:bg-stone-800 transition-all cursor-pointer shadow-xs"
            title="Kembalikan sudut pandang kamera ke awal"
          >
            Reset
          </button>

          {/* Toggle Gelap / Terang */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1 rounded-xl border backdrop-blur-md bg-stone-900/85 text-stone-300 border-stone-700 hover:bg-stone-800 transition-all cursor-pointer shadow-xs"
            title="Ubah pencahayaan studio"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-300" />}
          </button>
        </div>
      </div>

      {/* 2. CANVAS THREE.JS REACT-THREE-FIBER */}
      <div className="flex-1 w-full relative min-h-[300px]">
        <Canvas
          camera={{ position: [0, 0.6, 6.8], fov: 40 }}
          className="w-full h-full"
        >
          <color attach="background" args={[isDarkMode ? '#141416' : '#FAF8F5']} />
          
          {/* Pencahayaan Studio Multi-sudut */}
          <ambientLight intensity={isDarkMode ? 0.8 : 0.9} />
          <directionalLight position={[6, 8, 7]} intensity={1.4} />
          <directionalLight position={[-6, -4, -5]} intensity={0.5} />
          <pointLight position={[0, 4, 3]} intensity={0.6} color={isDarkMode ? '#FEF3C7' : '#FFFFFF'} />

          {/* Parent Group Molekul Tunggal Deterministik */}
          <MoleculeGroupInner
            isStraightChain={isStraightChain}
            selectedAtomId={selectedAtomId}
            onSelectAtom={handleSelectAtom}
            hideHydrogen={hideHydrogen}
            showCarbonNumbers={showCarbonNumbers}
            highlightHydroxyls={highlightHydroxyls}
            isSpaceFilling={representation === 'SPACE_FILLING'}
            isAutoRotate={isAutoRotate}
          />

          {/* Kontrol Orbit Kamera 360 Derajat */}
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={3.5}
            maxDistance={9.5}
            rotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* 3. BAR KETERANGAN ATOM TERPILIH (DI BAWAH CANVAS, TANPA MENUTUPI MOLEKUL) */}
      <div className="px-3.5 py-2 bg-stone-900/95 border-t border-stone-800 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-3 h-3 rounded-full shrink-0 ${
            activeAtom.element === 'C'
              ? 'bg-stone-800 ring-2 ring-amber-400'
              : activeAtom.element === 'O'
              ? 'bg-red-600 ring-2 ring-red-400'
              : 'bg-white ring-2 ring-slate-400'
          }`} />
          <span className="font-bold text-amber-400 text-[11px] shrink-0">
            {activeAtom.name}
          </span>
          <span className="text-stone-300 text-[11px] truncate">
            — {activeAtom.role}
          </span>
        </div>
        <span className="text-[10px] text-stone-400 font-mono shrink-0 hidden sm:inline">
          Posisi: [{activeAtom.position.map(n => n.toFixed(2)).join(', ')}]
        </span>
      </div>

      {/* 4. LEGENDA WARNA CPK & IKATAN (DI BAGIAN PALING BAWAH CANVAS SESUAI INSTRUKSI) */}
      <div className="px-3.5 py-2 bg-stone-950 border-t border-stone-800 text-[10.5px] text-stone-300 flex flex-wrap items-center justify-between gap-2">
        {/* Simbol CPK */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-stone-200">Legenda CPK:</span>
          
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#262626] border border-stone-500 shadow-xs" />
            <span><strong>C</strong> = Karbon (6)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] border border-red-400 shadow-xs" />
            <span><strong>O</strong> = Oksigen (6)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F8FAFC] border border-slate-300 shadow-xs" />
            <span><strong>H</strong> = Hidrogen (12)</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-400">
            <span>• <strong>Bola</strong> = Atom</span>
            <span>• <strong>Silinder</strong> = Ikatan Kovalen</span>
          </div>
        </div>

        {/* Validasi Struktur Cincin Piranosa */}
        <div className="text-[10px] text-amber-300/90 font-medium">
          {isStraightChain 
            ? '⚡ Rantai Terbuka D-Glukosa (Aldoheksosa C₁ s.d. C₆)' 
            : '✓ Cincin Piranosa: 5 Karbon (C1–C5) + 1 Oksigen (O5); C6 (-CH₂OH) di luar cincin'}
        </div>
      </div>
    </div>
  );
};
