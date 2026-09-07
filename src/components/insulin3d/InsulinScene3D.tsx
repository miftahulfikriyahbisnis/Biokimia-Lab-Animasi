/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Bounds, useBounds } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Insulin3DStage, InspectableObject } from './types';
import { CellMembrane3D } from './CellMembrane3D';
import { InsulinReceptor3D } from './InsulinReceptor3D';
import { GLUT4Vesicle3D } from './GLUT4Vesicle3D';
import { GlucoseParticles3D } from './GlucoseParticles3D';
import { InsulinParticles3D } from './InsulinParticles3D';
import { SignalPathway3D } from './SignalPathway3D';
import { Environment3D } from './Environment3D';

interface InsulinScene3DProps {
  stage: Insulin3DStage;
  speed: number;
  showLabels: boolean;
  cameraResetTrigger: number;
  onSelectObject: (obj: InspectableObject) => void;
  selectedObject: InspectableObject;
}

interface CameraBoundsControllerProps {
  sceneGroupRef: React.RefObject<THREE.Group>;
  cameraResetTrigger: number;
  controlsRef: React.RefObject<OrbitControlsImpl>;
}

/**
 * Controller di dalam Bounds untuk mengelola kalkulasi bounding box,
 * framing optimal 70–80%, serta reset kamera ke posisi dekat.
 */
const CameraBoundsController: React.FC<CameraBoundsControllerProps> = ({
  sceneGroupRef,
  cameraResetTrigger,
  controlsRef
}) => {
  const bounds = useBounds();
  const { camera, size, gl } = useThree();
  const initialCameraState = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  // Penyesuaian presisi renderer dan camera saat ukuran container / layar berubah
  useEffect(() => {
    const container = gl.domElement.parentElement;
    if (!container) return;

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width > 0 && height > 0) {
        gl.setSize(width, height);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [gl, camera]);

  // Jalankan fit camera setelah seluruh objek utama selesai dibuat
  useLayoutEffect(() => {
    const handle = requestAnimationFrame(() => {
      if (bounds) {
        bounds.refresh().fit().clip();
      }

      if (sceneGroupRef.current && camera && controlsRef.current) {
        sceneGroupRef.current.updateWorldMatrix(true, true);
        const box = new THREE.Box3().setFromObject(sceneGroupRef.current);
        if (!box.isEmpty()) {
          const center = box.getCenter(new THREE.Vector3());
          const bSize = box.getSize(new THREE.Vector3());
          const aspect = size.width / Math.max(size.height, 1);
          const pCam = camera as THREE.PerspectiveCamera;
          const fovRad = (pCam.fov * Math.PI) / 180;

          // Hitung jarak optimal agar model mengisi sekitar 75–85% canvas tanpa terpotong
          const distVertical = (bSize.y / 2) / Math.tan(fovRad / 2);
          const distHorizontal = (bSize.x / 2) / (Math.tan(fovRad / 2) * Math.max(aspect, 0.6));
          const distance = Math.max(distVertical, distHorizontal) * 1.12;

          // Sudut perspektif sekitar 30 derajat agar struktur membran dan kaskade terlihat 3D
          const elev = 0.50; // sin(30°)
          const horiz = 0.866; // cos(30°)
          const initPos = new THREE.Vector3(
            center.x,
            center.y + distance * elev,
            center.z + distance * horiz
          );

          initialCameraState.current = {
            position: initPos.clone(),
            target: center.clone()
          };

          // Posisikan target OrbitControls tepat di tengah bounding box objek model
          controlsRef.current.target.copy(center);
          controlsRef.current.object.position.copy(initPos);
          controlsRef.current.update();
        }
      }
    });

    return () => cancelAnimationFrame(handle);
  }, [bounds, camera, controlsRef, sceneGroupRef, size.width, size.height]);

  // Tombol Reset Kamera mengembalikan tampilan ke framing dekat yang baru
  useEffect(() => {
    if (cameraResetTrigger > 0) {
      if (controlsRef.current && initialCameraState.current) {
        controlsRef.current.target.copy(initialCameraState.current.target);
        controlsRef.current.object.position.copy(initialCameraState.current.position);
        controlsRef.current.update();
      }
      if (bounds) {
        bounds.refresh().fit().clip();
      }
    }
  }, [cameraResetTrigger, bounds, controlsRef]);

  return null;
};

export const InsulinScene3D: React.FC<InsulinScene3DProps> = ({
  stage,
  speed,
  showLabels,
  cameraResetTrigger,
  onSelectObject,
  selectedObject
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const sceneGroupRef = useRef<THREE.Group>(null);

  return (
    <div className="w-full h-full relative overflow-hidden block">
      <Canvas
        className="!w-full !h-full !block"
        style={{ width: '100%', height: '100%', display: 'block' }}
        camera={{ position: [0, 4.8, 8.0], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onPointerDown={(e) => {
          // Klik di area kosong membatalkan pemilihan objek
          if (e.target === e.currentTarget) {
            onSelectObject(null);
          }
        }}
      >
        {/* Kontrol Orbit: Rotasi, Geser, Zoom */}
        <OrbitControls
          ref={controlsRef}
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.06}
          minDistance={3.2}
          maxDistance={14}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 8}
        />

        {/* Pencahayaan Lembut Alami */}
        <ambientLight intensity={1.15} />
        <directionalLight position={[6, 9, 6]} intensity={1.35} castShadow={false} />
        <directionalLight position={[-6, -6, -4]} intensity={0.55} />
        <pointLight position={[-2.4, 1.4, 2.5]} intensity={1.0} color="#F59E0B" distance={7} />
        <pointLight position={[2.2, -0.4, 2.5]} intensity={0.9} color="#10B981" distance={7} />

        {/* Lingkungan & Anotasi Ruang (Di luar Bounds agar tidak mempengaruhi camera fit) */}
        <Environment3D showLabels={showLabels} />

        {/* Bounds untuk Camera Fit Otomatis Mengisi 70–80% Canvas */}
        <Bounds fit clip observe margin={1.1}>
          <CameraBoundsController
            sceneGroupRef={sceneGroupRef}
            cameraResetTrigger={cameraResetTrigger}
            controlsRef={controlsRef}
          />

          {/* Parent Group Seluruh Objek Simulasi Utama, Terpusat */}
          <group ref={sceneGroupRef} position={[0, -0.2, 0]}>
            {/* 1. Membran Sel (Bilayer Fosfolipid Semi-Transparan) */}
            <CellMembrane3D
              onSelectObject={onSelectObject}
              selectedObject={selectedObject}
            />

            {/* 2. Reseptor Insulin (Transmembran Tirosin Kinase) */}
            <InsulinReceptor3D
              stage={stage}
              showLabels={showLabels}
              onSelectObject={onSelectObject}
              selectedObject={selectedObject}
            />

            {/* 3. Vesikel GLUT4 & Transporter GLUT4 */}
            <GLUT4Vesicle3D
              stage={stage}
              speed={speed}
              showLabels={showLabels}
              onSelectObject={onSelectObject}
              selectedObject={selectedObject}
            />

            {/* 4. Hormon Peptida Insulin */}
            <InsulinParticles3D
              stage={stage}
              speed={speed}
              showLabels={showLabels}
              onSelectObject={onSelectObject}
              selectedObject={selectedObject}
            />

            {/* 5. Partikel Glukosa */}
            <GlucoseParticles3D
              stage={stage}
              speed={speed}
              showLabels={showLabels}
              onSelectObject={onSelectObject}
              selectedObject={selectedObject}
            />

            {/* 6. Jalur Sinyal Intraseluler (Tahap 4 & 5) */}
            <SignalPathway3D
              stage={stage}
              speed={speed}
              showLabels={showLabels}
              onSelectObject={onSelectObject}
              selectedObject={selectedObject}
            />
          </group>
        </Bounds>
      </Canvas>
    </div>
  );
};
