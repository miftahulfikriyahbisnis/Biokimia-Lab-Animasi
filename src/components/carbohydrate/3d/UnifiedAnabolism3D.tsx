/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { AnabolismStepData } from '../../../data/anabolismJourneyData';
import { 
  CarbonSphere, 
  OxygenSphere, 
  NitrogenSphere,
  PhosphateToken, 
  AminoGroupToken,
  CofactorToken, 
  CO2Molecule, 
  HPlusParticle, 
  CarbonChainMolecule,
  BranchedGlycogenParticle3D,
  TriacylglycerolMolecule3D,
  AminoAcidMolecule3D
} from './MolecularTokens3D';

interface UnifiedAnabolism3DProps {
  currentStepData: AnabolismStepData;
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

  React.useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...targetLookAt);
      controlsRef.current.object.position.set(...targetPosition);
      controlsRef.current.update();
    }
  }, [resetCameraCount]);

  useFrame((state, delta) => {
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

// 2. Lingkungan Kompartemen Sel Anabolisme (Sitosol, Mitokondria, Lumen RE, Adiposit)
function AnabolismEnvironment({ compartment }: { compartment: string }) {
  return (
    <group>
      {/* 2A. Sitosol (Latar Belakang Hangat Transparan) */}
      <mesh position={[-2.5, 0, -1]} receiveShadow>
        <planeGeometry args={[7, 8]} />
        <meshStandardMaterial
          color="#FEF3C7"
          roughness={0.9}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* 2B. Mitokondria (Membran Ganda & Matriks) di Sisi Kanan/Tengah */}
      <group position={[2.8, 0, -0.6]}>
        {/* Membran Luar */}
        <mesh>
          <capsuleGeometry args={[1.5, 3.2, 16, 16]} />
          <meshStandardMaterial
            color="#059669"
            roughness={0.4}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Membran Dalam & Matriks */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[1.3, 2.9, 16, 16]} />
          <meshStandardMaterial
            color="#D97706"
            roughness={0.6}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <Html position={[0, 2.3, 0]} center distanceFactor={8}>
          <div className="px-2 py-0.5 rounded-lg bg-emerald-950/90 text-emerald-200 border border-emerald-500 text-[10px] font-bold shadow-xs select-none pointer-events-none">
            Mitokondria (Matriks & Membran)
          </div>
        </Html>
      </group>

      {/* 2C. Retikulum Endoplasma (Lumen RE) di Area Bawah Kiri */}
      <group position={[-2.8, -2.4, -0.5]}>
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[1.6, 0.22, 12, 24, Math.PI]} />
          <meshStandardMaterial
            color="#0284C7"
            roughness={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>
        <Html position={[0, 0.3, 0]} center distanceFactor={8}>
          <div className="px-2 py-0.5 rounded-lg bg-sky-950/90 text-sky-200 border border-sky-500 text-[9px] font-bold shadow-xs select-none pointer-events-none">
            Lumen Retikulum Endoplasma (RE)
          </div>
        </Html>
      </group>

      {/* Label Kompartemen Sitosol */}
      <Html position={[-3.5, 2.7, 0]} center distanceFactor={8}>
        <div className="px-2.5 py-1 rounded-xl bg-amber-100/90 text-amber-900 border border-amber-300 text-[11px] font-bold tracking-wide shadow-xs select-none pointer-events-none">
          Sitosol Sel
        </div>
      </Html>
    </group>
  );
}

// 3. Objek Utama Reaksi Berdasarkan Modul & Langkah
function ActiveAnabolismScene({ 
  stepData, 
  isPlaying, 
  speed, 
  showLabels 
}: { 
  stepData: AnabolismStepData; 
  isPlaying: boolean; 
  speed: number; 
  showLabels: boolean; 
}) {
  const { module, stepNumber, animationState } = stepData;
  const { activeSubstrateType, highlightPhosphate, highlightBranch, highlightNonReducingEnd, cofactorAction } = animationState;

  return (
    <group>
      {/* ========================================================= */}
      {/* MODUL 1: KONSEP ANABOLISME                                */}
      {/* ========================================================= */}
      {module === 'CONCEPT' && (
        <Float speed={isPlaying ? 2 * speed : 0} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={[0, 0, 0]}>
            {/* Molekul Sederhana di Kiri: Piruvat (3C) & Glukosa (6C) */}
            <group position={[-2.4, 0.4, 0]}>
              <CarbonChainMolecule numCarbons={3} oxygenIndices={[0]} label="Prekursor Sederhana (3C)" />
            </group>

            {/* Simbol Reaksi Anabolik & Energi Endergonik */}
            <group position={[0, 0.4, 0]}>
              <mesh rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
                <meshStandardMaterial color="#6B705C" />
              </mesh>
              <mesh position={[0.7, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.16, 0.3, 12]} />
                <meshStandardMaterial color="#6B705C" />
              </mesh>
              <group position={[0, 0.8, 0]}>
                <CofactorToken type="ATP" pulse={isPlaying} />
              </group>
              <group position={[0, -0.8, 0]}>
                <CofactorToken type="NADPH" pulse={isPlaying} />
              </group>
              {showLabels && (
                <Html position={[0, -1.4, 0]} center distanceFactor={8}>
                  <div className="px-2.5 py-1 rounded-xl bg-amber-950/90 text-amber-200 border border-amber-500 text-[10px] font-bold shadow-md whitespace-nowrap select-none pointer-events-none text-center">
                    Reaksi Endergonik<br />(Membutuhkan Energi & Daya Reduksi)
                  </div>
                </Html>
              )}
            </group>

            {/* Makromolekul Kompleks di Kanan: Polimer Glukosa Terhubung */}
            <group position={[2.6, 0.4, 0]}>
              <CarbonChainMolecule numCarbons={6} phosphateIndices={[5]} label="Makromolekul Kompleks (6C)" />
            </group>
          </group>
        </Float>
      )}

      {/* ========================================================= */}
      {/* MODUL 2: GLIKOGENESIS (TAHAP 2 HINGGA 8)                 */}
      {/* ========================================================= */}
      {module === 'GLYCOGENESIS' && (
        <group position={[-0.4, 0, 0]}>
          {/* Tahap 2: Glukosa + ATP -> G6P */}
          {stepNumber === 2 && (
            <group>
              <CarbonChainMolecule
                numCarbons={6}
                phosphateIndices={[5]}
                label={showLabels ? "Glukosa-6-Fosfat (G6P)" : undefined}
              />
              <group position={[-1.6, 1.4, 0]}>
                <CofactorToken type="ATP" pulse={isPlaying} />
              </group>
              <group position={[1.6, 1.4, 0]}>
                <CofactorToken type="ADP" />
              </group>
            </group>
          )}

          {/* Tahap 3: Isomerisasi G6P -> G1P */}
          {stepNumber === 3 && (
            <group>
              <CarbonChainMolecule
                numCarbons={6}
                phosphateIndices={[0]}
                label={showLabels ? "Glukosa-1-Fosfat (G1P)" : undefined}
              />
              {showLabels && (
                <Html position={[0, -1.2, 0]} center distanceFactor={8}>
                  <div className="px-2 py-0.5 rounded-lg bg-stone-900/90 text-emerald-300 border border-emerald-500 text-[10px] font-bold select-none pointer-events-none">
                    Fosfat Berpindah: C6 ➔ C1 (Fosfoglukomutase)
                  </div>
                </Html>
              )}
            </group>
          )}

          {/* Tahap 4: Aktivasi G1P + UTP -> UDP-Glukosa + PPi */}
          {stepNumber === 4 && (
            <group>
              <CarbonChainMolecule
                numCarbons={6}
                phosphateIndices={[0]}
                label={showLabels ? "UDP-Glukosa (Donor Glukosil Aktif)" : undefined}
              />
              <group position={[1.4, 0.4, 0]}>
                <CofactorToken type="UDP" pulse={isPlaying} />
              </group>
              <group position={[-1.6, 1.4, 0]}>
                <CofactorToken type="UTP" />
              </group>
              <group position={[1.6, -1.4, 0]}>
                <PhosphateToken position={[0, 0, 0]} size={0.2} />
              </group>
            </group>
          )}

          {/* Tahap 5: Pembentukan Primer Oleh Glikogenin */}
          {stepNumber === 5 && (
            <group position={[0, 0, 0]}>
              <BranchedGlycogenParticle3D
                growthLevel={1}
                highlightNonReducingEnd={true}
                showLabels={showLabels}
              />
              <group position={[-2.2, 1.2, 0]}>
                <CarbonChainMolecule numCarbons={6} label="UDP-Glukosa" />
              </group>
            </group>
          )}

          {/* Tahap 6: Pemanjangan Rantai Linier α(1->4) */}
          {stepNumber === 6 && (
            <group position={[0, 0, 0]}>
              <BranchedGlycogenParticle3D
                growthLevel={2}
                highlightNonReducingEnd={true}
                showLabels={showLabels}
              />
              <group position={[2.2, 1.5, 0]}>
                <CofactorToken type="UDP" pulse={isPlaying} />
              </group>
            </group>
          )}

          {/* Tahap 7 & 8: Pembentukan Cabang α(1->6) & Regulasi Glikogenesis */}
          {(stepNumber === 7 || stepNumber === 8) && (
            <group position={[0, 0, 0]}>
              <BranchedGlycogenParticle3D
                growthLevel={3}
                highlightBranch={true}
                highlightNonReducingEnd={true}
                showLabels={showLabels}
              />
              {stepNumber === 8 && showLabels && (
                <Html position={[0, -1.8, 0]} center distanceFactor={8}>
                  <div className="px-3 py-1.5 rounded-2xl bg-emerald-950/95 text-emerald-200 border border-emerald-500 text-[10px] font-bold shadow-lg text-center select-none pointer-events-none">
                    Insulin (+) Mengaktifkan Glikogen Sintase via PP-1<br />
                    Glukagon (-) & Epinefrin (-) Menghambat Glikogenesis
                  </div>
                </Html>
              )}
            </group>
          )}
        </group>
      )}

      {/* ========================================================= */}
      {/* MODUL 3: GLUKONEOGENESIS (TAHAP 9 HINGGA 17)             */}
      {/* ========================================================= */}
      {module === 'GLUCONEOGENESIS' && (
        <group>
          {/* Tahap 9: Pintu Masuk Prekursor Non-Karbohidrat */}
          {stepNumber === 9 && (
            <group position={[0, 0, 0]}>
              {/* 1. Laktat -> Piruvat */}
              <group position={[-2.4, 1.2, 0]}>
                <CarbonChainMolecule numCarbons={3} oxygenIndices={[0]} label="Laktat ➔ Piruvat (via LDH)" />
              </group>
              {/* 2. Gliserol -> DHAP */}
              <group position={[-2.4, -1.2, 0]}>
                <CarbonChainMolecule numCarbons={3} phosphateIndices={[2]} label="Gliserol ➔ DHAP" />
              </group>
              {/* 3. Asam Amino Glukogenik */}
              <group position={[2.2, 0, 0]}>
                <AminoAcidMolecule3D name="Alanin (Asam Amino)" numCarbons={3} />
              </group>
            </group>
          )}

          {/* Tahap 10: Bypass 1A (Mitokondria) Piruvat -> OAA */}
          {stepNumber === 10 && (
            <group position={[2.4, 0, 0]}>
              <CarbonChainMolecule
                numCarbons={4}
                oxygenIndices={[0, 3]}
                label={showLabels ? "2 Oksaloasetat (4C)" : undefined}
              />
              <group position={[-1.2, 1.2, 0]}>
                <CO2Molecule position={[0, 0, 0]} />
              </group>
              <group position={[1.2, 1.2, 0]}>
                <CofactorToken type="ATP" pulse={isPlaying} />
              </group>
            </group>
          )}

          {/* Tahap 11: Malat Shuttle Mitokondria -> Sitosol */}
          {stepNumber === 11 && (
            <group position={[0.5, 0, 0]}>
              {/* OAA Matriks */}
              <group position={[1.8, 0.6, 0]}>
                <CarbonChainMolecule numCarbons={4} oxygenIndices={[0]} label="Malat (Mitokondria)" />
              </group>
              {/* Panah Transporter Membran Dalam */}
              <group position={[0, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.06, 0.06, 1.8, 8]} />
                  <meshStandardMaterial color="#10B981" />
                </mesh>
                {showLabels && (
                  <Html position={[0, 0.4, 0]} center distanceFactor={8}>
                    <div className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 text-[9px] font-bold select-none pointer-events-none whitespace-nowrap">
                      Transporter Malat-αKG Membran Dalam
                    </div>
                  </Html>
                )}
              </group>
              {/* OAA Sitosol */}
              <group position={[-1.8, -0.6, 0]}>
                <CarbonChainMolecule numCarbons={4} oxygenIndices={[0]} label="Oksaloasetat (Sitosol)" />
              </group>
            </group>
          )}

          {/* Tahap 12: Bypass 1B (Sitosol) OAA + GTP -> PEP + CO2 */}
          {stepNumber === 12 && (
            <group position={[-1.2, 0, 0]}>
              <CarbonChainMolecule
                numCarbons={3}
                phosphateIndices={[1]}
                label={showLabels ? "Fosfoenolpiruvat (PEP)" : undefined}
              />
              <group position={[-1.4, 1.2, 0]}>
                <CofactorToken type="GTP" pulse={isPlaying} />
              </group>
              <group position={[1.4, 1.2, 0]}>
                <CO2Molecule position={[0, 0, 0]} />
              </group>
            </group>
          )}

          {/* Tahap 13: Reversible Steps -> F-1,6-BP */}
          {stepNumber === 13 && (
            <group position={[-1.2, 0, 0]}>
              <CarbonChainMolecule
                numCarbons={6}
                phosphateIndices={[0, 5]}
                label={showLabels ? "Fruktosa-1,6-Bisfosfat (6C)" : undefined}
              />
              <group position={[-1.6, 1.4, 0]}>
                <CofactorToken type="ATP" />
              </group>
              <group position={[1.6, 1.4, 0]}>
                <CofactorToken type="NADH" />
              </group>
            </group>
          )}

          {/* Tahap 14 & 15: Bypass 2 FBPase-1 -> F6P -> G6P */}
          {(stepNumber === 14 || stepNumber === 15) && (
            <group position={[-1.2, 0, 0]}>
              <CarbonChainMolecule
                numCarbons={6}
                phosphateIndices={[5]}
                label={showLabels ? (stepNumber === 14 ? "Fruktosa-6-Fosfat (F6P)" : "Glukosa-6-Fosfat (G6P)") : undefined}
              />
              {stepNumber === 14 && (
                <group position={[1.5, 1.2, 0]}>
                  <PhosphateToken position={[0, 0, 0]} />
                </group>
              )}
            </group>
          )}

          {/* Tahap 16: Bypass 3 (Lumen RE) G6Pase -> Glukosa Bebas */}
          {stepNumber === 16 && (
            <group position={[-2.4, -1.2, 0]}>
              <CarbonChainMolecule
                numCarbons={6}
                label={showLabels ? "D-Glukosa Bebas (Lumen RE ➔ Darah)" : undefined}
              />
              <group position={[1.6, 0.8, 0]}>
                <PhosphateToken position={[0, 0, 0]} />
              </group>
              {showLabels && (
                <Html position={[0, -1.2, 0]} center distanceFactor={8}>
                  <div className="px-2 py-0.5 rounded bg-sky-950 text-sky-200 border border-sky-400 text-[9px] font-bold select-none pointer-events-none">
                    Hati & Ginjal memiliki G6Pase (Otot Rangka TIDAK memiliki G6Pase)
                  </div>
                </Html>
              )}
            </group>
          )}

          {/* Tahap 17: Siklus Cori & Neraca Bersih */}
          {stepNumber === 17 && (
            <group position={[0, 0, 0]}>
              {/* Otot di Kiri */}
              <group position={[-2.6, 0, 0]}>
                <CarbonChainMolecule numCarbons={3} label="Laktat (Otot Rangka)" />
              </group>
              {/* Sirkulasi Darah */}
              <group position={[0, 0.8, 0]}>
                <mesh rotation={[0, 0, -Math.PI / 2]}>
                  <cylinderGeometry args={[0.04, 0.04, 2.2, 8]} />
                  <meshStandardMaterial color="#EF4444" />
                </mesh>
                {showLabels && (
                  <Html position={[0, 0.35, 0]} center distanceFactor={8}>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-200 text-[9px] font-mono font-bold border border-red-500 whitespace-nowrap">
                      Sirkulasi Darah
                    </span>
                  </Html>
                )}
              </group>
              {/* Hati di Kanan */}
              <group position={[2.6, 0, 0]}>
                <CarbonChainMolecule numCarbons={6} label="Glukosa Baru (Hati)" />
              </group>
            </group>
          )}
        </group>
      )}

      {/* ========================================================= */}
      {/* MODUL 4: LIPOGENESIS (TAHAP 18 HINGGA 22)                 */}
      {/* ========================================================= */}
      {module === 'LIPOGENESIS' && (
        <group>
          {/* Tahap 18: Citrate Shuttle ke Sitosol */}
          {stepNumber === 18 && (
            <group position={[0, 0, 0]}>
              <group position={[2.2, 0.5, 0]}>
                <CarbonChainMolecule numCarbons={6} label="Sitrat (Mitokondria)" />
              </group>
              <group position={[-2.0, -0.5, 0]}>
                <CarbonChainMolecule numCarbons={2} hasCoA={true} label="Asetil-KoA (Sitosol)" />
              </group>
              <group position={[-0.2, 1.2, 0]}>
                <CofactorToken type="ATP" pulse={isPlaying} />
              </group>
            </group>
          )}

          {/* Tahap 19: Tahap Komitmen ACC -> Malonil-KoA */}
          {stepNumber === 19 && (
            <group position={[-1.2, 0, 0]}>
              <CarbonChainMolecule
                numCarbons={3}
                hasCoA={true}
                label={showLabels ? "Malonil-KoA (3C, Tahap Komitmen ACC)" : undefined}
              />
              <group position={[-1.6, 1.4, 0]}>
                <CofactorToken type="ATP" pulse={isPlaying} />
              </group>
              <group position={[1.4, 1.4, 0]}>
                <CO2Molecule position={[0, 0, 0]} />
              </group>
            </group>
          )}

          {/* Tahap 20: Fatty Acid Synthase Complex -> Palmitat 16C */}
          {stepNumber === 20 && (
            <group position={[0, 0, 0]}>
              <group position={[-1.5, 0, 0]}>
                <CarbonChainMolecule
                  numCarbons={8}
                  label={showLabels ? "Rantai Asil Memanjang (FASN)" : undefined}
                />
              </group>
              <group position={[1.8, 1.2, 0]}>
                <CofactorToken type="NADPH" pulse={isPlaying} />
              </group>
              <group position={[1.8, -1.2, 0]}>
                <CofactorToken type="NADP+" />
              </group>
              {showLabels && (
                <Html position={[0, 1.5, 0]} center distanceFactor={8}>
                  <div className="px-2.5 py-1 rounded-xl bg-purple-950/90 text-purple-200 border border-purple-500 text-[10px] font-bold shadow-md whitespace-nowrap select-none pointer-events-none">
                    7 Siklus FAS: Kondensasi ➔ Reduksi ➔ Dehidrasi ➔ Reduksi (14 NADPH)
                  </div>
                </Html>
              )}
            </group>
          )}

          {/* Tahap 21 & 22: Triasilgliserol (TAG) & Regulasi Adiposit */}
          {(stepNumber === 21 || stepNumber === 22) && (
            <group position={[0, 0, 0]}>
              <TriacylglycerolMolecule3D
                label={showLabels ? "Triasilgliserol (TAG - Simpanan Lemak Adiposit)" : undefined}
              />
              {stepNumber === 22 && showLabels && (
                <Html position={[0, -1.8, 0]} center distanceFactor={8}>
                  <div className="px-3 py-1.5 rounded-2xl bg-amber-950/95 text-amber-200 border border-amber-500 text-[10px] font-bold shadow-lg text-center select-none pointer-events-none">
                    Insulin (+) Mengaktifkan Lipogenesis & ACC<br />
                    Malonil-KoA Menghambat CPT-I (Mencegah β-Oksidasi Bersamaan)
                  </div>
                </Html>
              )}
            </group>
          )}
        </group>
      )}

      {/* ========================================================= */}
      {/* MODUL 5: SINTESIS ASAM AMINO (TAHAP 23 HINGGA 26)         */}
      {/* ========================================================= */}
      {module === 'AMINO_ACIDS' && (
        <group position={[0, 0, 0]}>
          {/* Tahap 23: Piruvat + Glutamat -> Alanin + α-KG */}
          {stepNumber === 23 && (
            <group>
              <group position={[-2.2, 0, 0]}>
                <CarbonChainMolecule numCarbons={3} oxygenIndices={[0]} label="Piruvat (3C)" />
              </group>
              <group position={[0, 0.6, 0]}>
                <AminoGroupToken pulse={isPlaying} />
              </group>
              <group position={[2.2, 0, 0]}>
                <AminoAcidMolecule3D name="L-Alanin (3C)" numCarbons={3} />
              </group>
            </group>
          )}

          {/* Tahap 24: OAA + Glutamat -> Aspartat + α-KG */}
          {stepNumber === 24 && (
            <group>
              <group position={[-2.2, 0, 0]}>
                <CarbonChainMolecule numCarbons={4} oxygenIndices={[0]} label="Oksaloasetat (4C)" />
              </group>
              <group position={[0, 0.6, 0]}>
                <AminoGroupToken pulse={isPlaying} />
              </group>
              <group position={[2.2, 0, 0]}>
                <AminoAcidMolecule3D name="L-Aspartat (4C)" numCarbons={4} />
              </group>
            </group>
          )}

          {/* Tahap 25: α-Ketoglutarat + NH4+ + NADPH -> Glutamat */}
          {stepNumber === 25 && (
            <group>
              <group position={[-2.2, 0, 0]}>
                <CarbonChainMolecule numCarbons={5} oxygenIndices={[0]} label="α-Ketoglutarat (5C)" />
              </group>
              <group position={[0, 1.2, 0]}>
                <CofactorToken type="NADPH" pulse={isPlaying} />
              </group>
              <group position={[2.2, 0, 0]}>
                <AminoAcidMolecule3D name="L-Glutamat (Universal Nitrogen Donor)" numCarbons={5} />
              </group>
            </group>
          )}

          {/* Tahap 26: 3-PG -> Serin */}
          {stepNumber === 26 && (
            <group>
              <group position={[-2.2, 0, 0]}>
                <CarbonChainMolecule numCarbons={3} phosphateIndices={[2]} label="3-Fosfogliserat (Glikolisis)" />
              </group>
              <group position={[0, 0.6, 0]}>
                <AminoGroupToken pulse={isPlaying} />
              </group>
              <group position={[2.2, 0, 0]}>
                <AminoAcidMolecule3D name="L-Serin (3C)" numCarbons={3} />
              </group>
            </group>
          )}
        </group>
      )}

      {/* ========================================================= */}
      {/* MODUL 6: PETA INTEGRASI ANABOLISME (METABOLIC CROSSROADS) */}
      {/* ========================================================= */}
      {module === 'INTEGRATION' && (
        <group position={[0, 0, 0]}>
          {/* Node Tengah: Glukosa-6-Fosfat */}
          <group position={[0, 0, 0]}>
            <CarbonChainMolecule
              numCarbons={6}
              phosphateIndices={[5]}
              label={showLabels ? "Glukosa-6-Fosfat (Persimpangan Utama)" : undefined}
            />
          </group>

          {/* Cabang 1: Ke Atas -> Glikogenesis (Glikogen) */}
          <group position={[0, 2.2, 0]}>
            <mesh rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
              <meshStandardMaterial color="#CA8A04" />
            </mesh>
            <Html position={[0, 0.8, 0]} center distanceFactor={8}>
              <div className="px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-500 text-[9px] font-bold whitespace-nowrap">
                ➔ Glikogenesis (Glikogen Cadangan)
              </div>
            </Html>
          </group>

          {/* Cabang 2: Ke Kiri Bawah -> Glikolisis & Lipogenesis */}
          <group position={[-2.5, -1.6, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
              <meshStandardMaterial color="#059669" />
            </mesh>
            <Html position={[-0.8, -0.6, 0]} center distanceFactor={8}>
              <div className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-500 text-[9px] font-bold whitespace-nowrap">
                ➔ Glikolisis ➔ Piruvat ➔ Lipogenesis (Lemak)
              </div>
            </Html>
          </group>

          {/* Cabang 3: Ke Kanan Bawah -> Jalur Pentosa Fosfat (NADPH) */}
          <group position={[2.5, -1.6, 0]}>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
              <meshStandardMaterial color="#7C3AED" />
            </mesh>
            <Html position={[0.8, -0.6, 0]} center distanceFactor={8}>
              <div className="px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-500 text-[9px] font-bold whitespace-nowrap">
                ➔ Pentosa Fosfat (NADPH untuk Anabolisme)
              </div>
            </Html>
          </group>
        </group>
      )}
    </group>
  );
}

export const UnifiedAnabolism3D: React.FC<UnifiedAnabolism3DProps> = ({
  currentStepData,
  isPlaying,
  speed,
  showLabels,
  resetCameraCount
}) => {
  const { animationState } = currentStepData;

  return (
    <div className="w-full h-full bg-[#111315] relative select-none">
      <Canvas
        camera={{ position: [0, 1.5, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        <color attach="background" args={['#111315']} />

        {/* Pencahayaan Lembut & Berarah */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-6, -4, -2]} intensity={0.5} color="#38BDF8" />
        <pointLight position={[6, 4, 2]} intensity={0.5} color="#F59E0B" />

        {/* Controller Kamera Halus */}
        <CameraRig
          targetPosition={animationState.cameraPosition}
          targetLookAt={animationState.cameraTarget}
          resetCameraCount={resetCameraCount}
        />

        {/* Lingkungan Kompartemen Sel */}
        <AnabolismEnvironment compartment={animationState.compartment} />

        {/* Objek Reaksi Molekuler Aktif */}
        <ActiveAnabolismScene
          stepData={currentStepData}
          isPlaying={isPlaying}
          speed={speed}
          showLabels={showLabels}
        />
      </Canvas>
    </div>
  );
};
