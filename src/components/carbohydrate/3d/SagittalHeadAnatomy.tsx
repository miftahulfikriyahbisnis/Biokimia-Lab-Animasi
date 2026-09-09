/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SagittalHeadAnatomyProps {
  currentStep: number;
  isPlaying: boolean;
  speed: number;
}

export const SagittalHeadAnatomy: React.FC<SagittalHeadAnatomyProps> = ({
  currentStep,
  isPlaying,
  speed
}) => {
  // References for animating groups and components
  const lowerJawRef = useRef<THREE.Group>(null);
  const tongueRef = useRef<THREE.Group>(null);
  const epiglottisRef = useRef<THREE.Group>(null);
  const spoonRef = useRef<THREE.Group>(null);
  const riceClusterRef = useRef<THREE.Group>(null);
  const bolusRef = useRef<THREE.Mesh>(null);
  const salivaStreamRef = useRef<THREE.Points>(null);
  const starchChainRef = useRef<THREE.Group>(null);
  const amylaseRef = useRef<THREE.Group>(null);
  const gastricJuiceRef = useRef<THREE.Mesh>(null);
  const pancreaticEnzymeRef = useRef<THREE.Group>(null);
  const peristalsisRingRef = useRef<THREE.Mesh>(null);

  // Time accumulator for consistent animations
  const animTime = useRef(0);

  // 1. STATIONARY UPPER HEAD & CRANIUM SHAPE (Facing Left)
  const upperHeadGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Start at posterior neck
    shape.moveTo(0.55, 0.4);
    shape.lineTo(0.50, 1.2);
    // Occiput & crown
    shape.bezierCurveTo(0.65, 1.75, 0.60, 2.25, 0.05, 2.45);
    // Forehead & glabella
    shape.bezierCurveTo(-0.75, 2.45, -1.45, 2.30, -1.72, 2.05);
    // Bridge of nose to nose tip
    shape.lineTo(-1.85, 1.95);
    shape.lineTo(-2.15, 1.80);
    // Base of nose / nostril
    shape.lineTo(-1.85, 1.68);
    // Upper lip
    shape.bezierCurveTo(-1.88, 1.63, -1.82, 1.58, -1.78, 1.56);
    // Inner upper lip to alveolar border
    shape.lineTo(-1.62, 1.55);
    shape.lineTo(-1.50, 1.52);
    // Hard palate (bony roof of oral cavity)
    shape.bezierCurveTo(-1.35, 1.68, -0.90, 1.70, -0.65, 1.66);
    // Soft palate & uvula
    shape.bezierCurveTo(-0.58, 1.62, -0.52, 1.50, -0.50, 1.38);
    // Posterior wall of pharynx
    shape.bezierCurveTo(-0.35, 1.45, -0.28, 1.75, -0.26, 1.95);
    shape.lineTo(-0.25, 0.85);
    // Back to posterior neck
    shape.lineTo(0.55, 0.4);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03
    });
  }, []);

  // 2. LOWER JAW SHAPE (MANDIBLE, LOWER LIP, CHIN)
  // Designed in local coordinates relative to the TMJ hinge point [-0.35, 1.65, 0]
  const lowerJawGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Condyle of mandible at local origin [0, 0]
    shape.moveTo(0, 0);
    // Mandibular notch down to coronoid process
    shape.lineTo(-0.22, -0.14);
    // Anterior ramus down to alveolar ridge of lower teeth
    shape.lineTo(-0.50, -0.28);
    shape.lineTo(-0.95, -0.22);
    shape.lineTo(-1.22, -0.22);
    // Inner lower lip
    shape.lineTo(-1.32, -0.20);
    // Vermilion border of lower lip
    shape.bezierCurveTo(-1.42, -0.22, -1.45, -0.28, -1.42, -0.32);
    // Mentolabial groove to chin
    shape.lineTo(-1.38, -0.40);
    shape.bezierCurveTo(-1.46, -0.48, -1.45, -0.55, -1.40, -0.58);
    // Base of mandible body
    shape.bezierCurveTo(-0.90, -0.60, -0.55, -0.62, -0.15, -0.65);
    // Angle of mandible up the posterior ramus back to condyle
    shape.lineTo(-0.10, -0.60);
    shape.lineTo(0, 0);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03
    });
  }, []);

  // 3. TONGUE GEOMETRY
  const tongueGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.45, 1.38); // tip of tongue
    shape.bezierCurveTo(-1.25, 1.55, -0.90, 1.52, -0.65, 1.40); // dorsum
    shape.bezierCurveTo(-0.55, 1.35, -0.52, 1.25, -0.55, 1.15); // root
    shape.bezierCurveTo(-0.75, 1.10, -1.15, 1.15, -1.40, 1.25); // base
    shape.lineTo(-1.45, 1.38);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    });
  }, []);

  // 4. EPIGLOTTIS GEOMETRY (Anchored flap)
  const epiglottisGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // anchor base at [-0.46, 0.90]
    shape.bezierCurveTo(-0.02, 0.08, -0.04, 0.18, 0.02, 0.24);
    shape.bezierCurveTo(0.06, 0.20, 0.05, 0.08, 0.03, 0);
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.01,
      bevelThickness: 0.01
    });
  }, []);

  // 5. TRACHEA (Anterior Saluran Pernapasan - Biru Muda dengan Cincin Kartilago)
  const tracheaRings = useMemo(() => {
    const rings = [];
    for (let y = 0.80; y >= -0.25; y -= 0.11) {
      rings.push(y);
    }
    return rings;
  }, []);

  // 6. STOMACH GEOMETRY (J-Shaped Anatomical Pouch)
  const stomachGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Cardia junction at [-0.28, -1.35]
    shape.moveTo(-0.28, -1.35);
    // Fundus bulging upward and left
    shape.bezierCurveTo(-0.25, -1.22, -0.05, -1.20, -0.02, -1.32);
    // Greater curvature (left border, sweeping down and around)
    shape.bezierCurveTo(0.02, -1.65, -0.05, -2.15, -0.25, -2.25);
    // Inferior curve to pyloric antrum
    shape.bezierCurveTo(-0.45, -2.30, -0.65, -2.10, -0.55, -1.95);
    // Pylorus towards duodenum
    shape.lineTo(-0.35, -1.90);
    // Lesser curvature (inner concave curve)
    shape.bezierCurveTo(-0.30, -1.75, -0.32, -1.50, -0.32, -1.38);
    shape.lineTo(-0.28, -1.35);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03
    });
  }, []);

  // 7. DUODENUM C-LOOP & PANCREAS
  const duodenumGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, -1.90, 0),
      new THREE.Vector3(-0.10, -1.92, 0),
      new THREE.Vector3(0.12, -2.05, 0),
      new THREE.Vector3(0.15, -2.25, 0),
      new THREE.Vector3(-0.05, -2.40, 0),
      new THREE.Vector3(-0.30, -2.45, 0)
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.08, 12, false);
  }, []);

  // 8. RICE PARTICLES (cluster of distinct ivory grains)
  const riceParticles = useMemo(() => {
    const pts = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      const u = (Math.random() - 0.5) * 0.22;
      const v = (Math.random() - 0.5) * 0.12 + 0.05;
      const w = (Math.random() - 0.5) * 0.10;
      pts.push([u, v, w]);
    }
    return pts;
  }, []);

  // 9. SALIVA DROPLETS (particle cloud)
  const salivaParticles = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = -1.1 + (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 1.45 + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = 0.05 + (Math.random() - 0.5) * 0.1;
    }
    return positions;
  }, []);

  // 10. STARCH MOLECULE CHAIN (Tahap 2: Starch Cleavage Animation)
  const starchMonomers = useMemo(() => {
    const list = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        offset: (i - 5.5) * 0.14
      });
    }
    return list;
  }, []);

  // Frame Loop for Animations
  useFrame((_, delta) => {
    if (!isPlaying) return;
    animTime.current += delta * speed;
    const t = animTime.current;

    // TAHAP 1: NASI MASUK KE MULUT
    // 1. Rahang membuka (TMJ rotasi -18° s.d -24°)
    // 2. Sendok masuk meletakkan nasi ke lidah
    // 3. Sendok keluar
    // 4. Rahang menutup
    // 5. Mengunyah 3-4 siklus halus
    if (currentStep === 1) {
      const cycle = (t * 0.4) % 1; // 0 to 1 loop over ~2.5s
      if (lowerJawRef.current) {
        if (cycle < 0.25) {
          // Opening mouth
          const progress = cycle / 0.25;
          lowerJawRef.current.rotation.z = THREE.MathUtils.lerp(0, -0.38, progress); // ~22 degrees
        } else if (cycle < 0.55) {
          // Mouth remains open while spoon deposits rice
          lowerJawRef.current.rotation.z = -0.38;
        } else if (cycle < 0.70) {
          // Closing mouth
          const progress = (cycle - 0.55) / 0.15;
          lowerJawRef.current.rotation.z = THREE.MathUtils.lerp(-0.38, 0, progress);
        } else {
          // Chewing phase (3-4 gentle oscillations)
          const chewPhase = ((cycle - 0.70) / 0.30) * Math.PI * 8;
          lowerJawRef.current.rotation.z = -Math.abs(Math.sin(chewPhase)) * 0.12;
        }
      }

      // Spoon movement: enters from left, deposits, retracts
      if (spoonRef.current) {
        if (cycle < 0.20) {
          // Spoon waiting outside
          spoonRef.current.position.set(-2.8, 1.70, 0.12);
        } else if (cycle < 0.40) {
          // Spoon gliding smoothly into mouth past lips
          const p = (cycle - 0.20) / 0.20;
          const x = THREE.MathUtils.lerp(-2.8, -1.32, p);
          const y = THREE.MathUtils.lerp(1.70, 1.45, p);
          spoonRef.current.position.set(x, y, 0.12);
        } else if (cycle < 0.55) {
          // Spoon inside mouth over tongue
          spoonRef.current.position.set(-1.32, 1.45, 0.12);
        } else if (cycle < 0.75) {
          // Spoon retracting back outside
          const p = (cycle - 0.55) / 0.20;
          const x = THREE.MathUtils.lerp(-1.32, -2.8, p);
          const y = THREE.MathUtils.lerp(1.45, 1.70, p);
          spoonRef.current.position.set(x, y, 0.12);
        } else {
          spoonRef.current.position.set(-2.8, 1.70, 0.12);
        }
      }

      // Rice cluster follows spoon during entry, stays on tongue when deposited
      if (riceClusterRef.current) {
        if (cycle < 0.48) {
          // Follows spoon
          riceClusterRef.current.position.copy(spoonRef.current?.position || new THREE.Vector3(-2.8, 1.7, 0));
        } else {
          // Rests securely on the tongue
          riceClusterRef.current.position.set(-1.18, 1.42, 0.12);
        }
      }
    } else {
      // In steps other than 1, mouth rests closed
      if (lowerJawRef.current) {
        lowerJawRef.current.rotation.z = 0;
      }
      if (spoonRef.current) {
        spoonRef.current.position.set(-3.5, 1.70, 0.12);
      }
    }

    // TAHAP 2: PENCERNAAN AWAL DI MULUT (AMILASE SALIVA)
    // Amilase memotong rantai pati menjadi maltosa & dekstrin
    if (currentStep === 2) {
      if (starchChainRef.current) {
        // Gentle undulating movement of the starch polymer
        starchChainRef.current.position.y = 1.45 + Math.sin(t * 2) * 0.02;
      }
      if (amylaseRef.current) {
        // Amylase enzyme approaches the chain and snips
        const snipProgress = (Math.sin(t * 3) + 1) / 2;
        amylaseRef.current.position.y = 1.55 - snipProgress * 0.08;
      }
      if (salivaStreamRef.current) {
        salivaStreamRef.current.rotation.z = Math.sin(t * 2) * 0.05;
      }
    }

    // TAHAP 3: PEMBENTUKAN BOLUS
    // Partikel nasi menyatu menjadi bolus lunak dan didorong lidah ke belakang
    if (currentStep === 3) {
      if (bolusRef.current) {
        bolusRef.current.visible = true;
        const pushPhase = (Math.sin(t * 1.5) + 1) / 2;
        // Moves from mid-tongue towards oropharynx
        bolusRef.current.position.x = THREE.MathUtils.lerp(-1.15, -0.65, pushPhase);
        bolusRef.current.position.y = THREE.MathUtils.lerp(1.42, 1.30, pushPhase);
        bolusRef.current.position.z = 0.12;
      }
    }

    // TAHAP 4: PROSES MENELAN (EPIGLOTIS MENUTUP TRAKEA)
    // 1. Bolus bergerak dari lidah ke orofaring
    // 2. Epiglotis berotasi ke bawah (~55 derajat) menutup trakea (biru muda)
    // 3. Bolus masuk esofagus (merah muda), aman dari trakea
    // 4. Epiglotis terbuka kembali
    if (currentStep === 4) {
      const swallowCycle = (t * 0.6) % 1; // 0 to 1 over ~1.7s
      if (bolusRef.current) {
        bolusRef.current.visible = true;
        if (swallowCycle < 0.35) {
          // Bolus entering oropharynx
          const p = swallowCycle / 0.35;
          bolusRef.current.position.set(
            THREE.MathUtils.lerp(-0.70, -0.38, p),
            THREE.MathUtils.lerp(1.35, 1.05, p),
            0.12
          );
        } else if (swallowCycle < 0.75) {
          // Bolus entering posterior esophagus past the closed epiglottis
          const p = (swallowCycle - 0.35) / 0.40;
          bolusRef.current.position.set(
            THREE.MathUtils.lerp(-0.38, -0.28, p),
            THREE.MathUtils.lerp(1.05, 0.50, p),
            0.12
          );
        } else {
          // Bolus traveling down upper esophagus
          const p = (swallowCycle - 0.75) / 0.25;
          bolusRef.current.position.set(
            -0.28,
            THREE.MathUtils.lerp(0.50, 0.15, p),
            0.12
          );
        }
      }

      // Epiglottis rotation: tight closure over trachea inlet during bolus pass
      if (epiglottisRef.current) {
        if (swallowCycle > 0.20 && swallowCycle < 0.70) {
          // Closed position covering trachea
          const closeP = swallowCycle < 0.35 ? (swallowCycle - 0.20) / 0.15 : 1;
          const openP = swallowCycle > 0.55 ? 1 - (swallowCycle - 0.55) / 0.15 : 1;
          const blend = Math.min(closeP, openP);
          epiglottisRef.current.rotation.z = THREE.MathUtils.lerp(0, -0.95, blend); // ~55°
        } else {
          epiglottisRef.current.rotation.z = 0; // open / upright
        }
      }
    } else if (currentStep !== 4 && epiglottisRef.current) {
      epiglottisRef.current.rotation.z = 0;
    }

    // TAHAP 5: PERISTALTIK ESOFAGUS
    // Bolus meluncur turun di dalam esofagus dengan gelombang kontraksi otot
    if (currentStep === 5) {
      const pCycle = (t * 0.4) % 1; // over ~2.5s
      const bolusY = THREE.MathUtils.lerp(0.80, -1.30, pCycle);
      if (bolusRef.current) {
        bolusRef.current.visible = true;
        bolusRef.current.position.set(-0.28, bolusY, 0.12);
      }
      if (peristalsisRingRef.current) {
        // Contraction ring traveling just above the bolus
        peristalsisRingRef.current.position.set(-0.28, Math.min(0.85, bolusY + 0.12), 0.12);
        peristalsisRingRef.current.scale.set(0.9, 0.6, 0.9);
      }
    }

    // TAHAP 6: LAMBUNG (CHURNING & ASAM INAKTIVASI)
    if (currentStep === 6) {
      if (bolusRef.current) {
        bolusRef.current.visible = true;
        // Churning inside stomach cavity
        bolusRef.current.position.set(
          -0.25 + Math.sin(t * 2) * 0.15,
          -1.75 + Math.cos(t * 2.5) * 0.12,
          0.12
        );
        // Bolus gradually disintegrates in acid
        const scale = 0.8 + Math.sin(t * 3) * 0.1;
        bolusRef.current.scale.set(scale, scale, scale);
      }
      if (gastricJuiceRef.current) {
        // Acid wave undulation
        gastricJuiceRef.current.position.y = -1.85 + Math.sin(t * 3) * 0.03;
      }
    }

    // TAHAP 7: USUS HALUS (DUODENUM & AMILASE PANKREAS)
    if (currentStep === 7) {
      if (pancreaticEnzymeRef.current) {
        // Pancreatic amylase droplets flow from pancreatic duct into duodenum
        const dCycle = (t * 1.5) % 1;
        pancreaticEnzymeRef.current.position.set(
          THREE.MathUtils.lerp(0.05, -0.15, dCycle),
          THREE.MathUtils.lerp(-2.0, -2.15, dCycle),
          0.14
        );
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      
      {/* 1. STATIONARY CRANIUM & UPPER PROFILE */}
      <mesh geometry={upperHeadGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#F2C7AB"
          roughness={0.45}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Skull bone backing / braincase subtle tone */}
      <mesh position={[-0.20, 1.80, -0.02]}>
        <circleGeometry args={[0.65, 32]} />
        <meshStandardMaterial color="#E8BA9A" roughness={0.6} />
      </mesh>

      {/* Upper Teeth in Maxilla */}
      <group position={[-1.40, 1.52, 0.05]}>
        {[-0.14, -0.07, 0, 0.07].map((offset, i) => (
          <mesh key={i} position={[offset, 0, 0]}>
            <boxGeometry args={[0.055, 0.08, 0.14]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* 2. LOWER JAW GROUP (Movable Mandible, Lower Lip, Chin, Lower Teeth) */}
      {/* Hinge point placed strictly at the Temporomandibular Joint (TMJ) [-0.35, 1.65, 0] */}
      <group ref={lowerJawRef} position={[-0.35, 1.65, 0]}>
        <mesh geometry={lowerJawGeometry}>
          <meshStandardMaterial
            color="#EBBFA3"
            roughness={0.45}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Lower Teeth attached firmly to lower jaw */}
        <group position={[-1.12, -0.18, 0.05]}>
          {[-0.12, -0.06, 0, 0.06].map((offset, i) => (
            <mesh key={i} position={[offset, 0, 0]}>
              <boxGeometry args={[0.05, 0.075, 0.14]} />
              <meshStandardMaterial color="#FFFFFA" roughness={0.2} metalness={0.1} />
            </mesh>
          ))}
        </group>

        {/* TMJ Hinge Joint visual indicator */}
        <mesh position={[0, 0, 0.12]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#D4A373" roughness={0.3} />
        </mesh>
      </group>

      {/* 3. TONGUE (Muscular Organ in Oral Cavity) */}
      <group ref={tongueRef}>
        <mesh geometry={tongueGeometry} position={[0, 0, 0.03]}>
          <meshStandardMaterial
            color="#E11D48"
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* 4. SALIVARY GLAND (Glandula Submandibularis & Parotis) */}
      <group position={[-0.75, 1.15, 0.08]}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.6} transparent opacity={0.85} />
        </mesh>
      </group>

      {/* 5. EPIGLOTTIS (Katup Elastis Penutup Trakea) */}
      {/* Anchored at [-0.46, 0.90, 0.10] */}
      <group ref={epiglottisRef} position={[-0.46, 0.90, 0.10]}>
        <mesh geometry={epiglottisGeometry}>
          <meshStandardMaterial
            color="#FB923C"
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* 6. TRACHEA (Anterior Airway - Light Blue with Cartilage Rings) */}
      {/* Positioned anterior to esophagus, clearly blocked during swallowing */}
      <group position={[-0.52, 0.25, 0.08]}>
        {/* Trachea Tube */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 1.15, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            roughness={0.35}
            metalness={0.1}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Distinctive C-shaped Cartilage Rings (#E0F2FE) */}
        {tracheaRings.map((yPos, i) => (
          <mesh key={i} position={[0, yPos - 0.25, 0]}>
            <torusGeometry args={[0.085, 0.015, 8, 24]} />
            <meshStandardMaterial color="#E0F2FE" roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 7. ESOPHAGUS (Posterior Food Tube - Pink / Muscular Lumen) */}
      {/* Extends from pharynx [y=0.85] down to stomach [y=-1.35] */}
      <group position={[-0.28, -0.25, 0.08]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 2.20, 24]} />
          <meshStandardMaterial
            color="#FB7185"
            roughness={0.4}
            metalness={0.05}
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* Muscular lumen liner */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 2.22, 24]} />
          <meshStandardMaterial
            color="#FDA4AF"
            roughness={0.5}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Peristalsis Muscular Ring for Step 5 */}
      {currentStep === 5 && (
        <mesh ref={peristalsisRingRef} position={[-0.28, 0, 0.12]}>
          <torusGeometry args={[0.10, 0.025, 12, 24]} />
          <meshStandardMaterial color="#E11D48" roughness={0.3} />
        </mesh>
      )}

      {/* 8. STOMACH (J-Shaped Anatomical Pouch) */}
      <group position={[0, 0, 0]}>
        <mesh geometry={stomachGeometry} position={[0, 0, 0.02]}>
          <meshStandardMaterial
            color="#E11D48"
            roughness={0.4}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Acid pool inside stomach in Step 6 */}
        {currentStep === 6 && (
          <mesh ref={gastricJuiceRef} position={[-0.28, -1.85, 0.14]}>
            <circleGeometry args={[0.28, 24]} />
            <meshStandardMaterial
              color="#A3E635"
              roughness={0.2}
              transparent
              opacity={0.65}
            />
          </mesh>
        )}
      </group>

      {/* 9. DUODENUM C-LOOP */}
      <mesh geometry={duodenumGeometry} position={[0, 0, 0.05]}>
        <meshStandardMaterial
          color="#FB923C"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* PANCREAS (Nestled in Duodenum C-Loop) */}
      <group position={[0.02, -2.15, 0.08]}>
        <mesh>
          <capsuleGeometry args={[0.09, 0.45, 16, 16]} />
          <meshStandardMaterial
            color="#F59E0B"
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
        {/* Pancreatic Duct (Duktus Pankreatikus) */}
        <mesh position={[-0.12, 0.02, 0.05]}>
          <cylinderGeometry args={[0.018, 0.018, 0.28, 12]} />
          <meshStandardMaterial color="#FDE68A" roughness={0.3} />
        </mesh>
      </group>

      {/* 10. SPOON OF RICE (Tahap 1) */}
      <group ref={spoonRef} position={[-2.8, 1.70, 0.12]}>
        {/* Spoon Handle */}
        <mesh position={[-0.45, 0.05, 0]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.70, 0.04, 0.03]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Spoon Bowl */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.1]}>
          <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.85} roughness={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* RICE PARTICLES CLUSTER (Tahap 1) */}
      {currentStep === 1 && (
        <group ref={riceClusterRef} position={[-2.8, 1.70, 0.12]}>
          {riceParticles.map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]}>
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}

      {/* 11. BOLUS MAKANAN (Tahap 3, 4, 5, 6) */}
      <mesh
        ref={bolusRef}
        visible={currentStep >= 3 && currentStep <= 6}
        position={[-1.15, 1.42, 0.12]}
      >
        <sphereGeometry args={[0.095, 24, 24]} />
        <meshStandardMaterial
          color="#F59E0B"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* 12. MOLECULAR STARCH DIGESTION ANIMATION (Tahap 2) */}
      {currentStep === 2 && (
        <group position={[-1.0, 1.48, 0.14]}>
          {/* Saliva Mist */}
          <points ref={salivaStreamRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[salivaParticles, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#38BDF8"
              size={0.04}
              transparent
              opacity={0.7}
            />
          </points>

          {/* Starch Chain (connected glucose rings with alpha-1,4 links) */}
          <group ref={starchChainRef} position={[0, 0, 0]}>
            {starchMonomers.map((m) => (
              <group key={m.id} position={[m.offset, 0, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.035, 0.035, 0.02, 6]} />
                  <meshStandardMaterial color="#FDE68A" roughness={0.3} />
                </mesh>
                {/* Connecting bond */}
                {m.id < starchMonomers.length - 1 && (
                  <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
                    <meshStandardMaterial color="#D97706" roughness={0.3} />
                  </mesh>
                )}
              </group>
            ))}
          </group>

          {/* Salivary Amylase Enzyme (Active protein cleft) */}
          <group ref={amylaseRef} position={[0, 0.15, 0]}>
            <mesh>
              <sphereGeometry args={[0.065, 16, 16, 0, Math.PI * 1.6]} />
              <meshStandardMaterial color="#EA580C" roughness={0.3} metalness={0.1} />
            </mesh>
          </group>
        </group>
      )}

      {/* 13. PANCREATIC AMYLASE ENZYME SECRETION (Tahap 7) */}
      {currentStep === 7 && (
        <group ref={pancreaticEnzymeRef} position={[0.05, -2.0, 0.14]}>
          {[0, 0.06, -0.06].map((offset, i) => (
            <mesh key={i} position={[offset, 0, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshStandardMaterial color="#EA580C" roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}

    </group>
  );
};
