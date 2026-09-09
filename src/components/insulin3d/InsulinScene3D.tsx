/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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

// Posisi dan target kamera tetap (fixed vantage point) dengan jarak yang disesuaikan
// Kamera dimundurkan lagi ~10% dari posisi sebelumnya untuk memberikan framing visual yang lebih lega dan nyaman
const FIXED_CAMERA_POSITION: [number, number, number] = [0, 6.80, 12.35];
const FIXED_CAMERA_TARGET: [number, number, number] = [0, -0.2, 0];

/**
 * Komponen penyesuaian kamera presisi:
 * - Mengatur ukuran renderer dan aspek rasio kamera.
 * - Mengunci posisi dan jarak kamera selama seluruh tahapan animasi.
 * - Melakukan penyesuaian framing SATU KALI saat awal agar objek mengisi ~75% viewport tanpa terpotong.
 * - Tidak mengubah jarak kamera atau zoom saat tahap animasi berganti.
 */
const CameraResizeHandler: React.FC<{
  onPositionReady?: (pos: [number, number, number]) => void;
}> = ({ onPositionReady }) => {
  const { camera, gl } = useThree();
  const initialFramedRef = useRef(false);

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

    // Framing satu kali saat inisialisasi awal (terkunci seterusnya)
    if (!initialFramedRef.current) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width > 0 && height > 0) {
        const aspect = width / height;
        // Jika rasio layar sempit / mobile portrait (< 1.15), sesuaikan jarak mundur proporsional sekali saat awal
        const distanceFactor = aspect < 1.15 ? Math.min(1.35, 1.15 / aspect) : 1.0;
        const targetY = FIXED_CAMERA_TARGET[1];
        const targetZ = FIXED_CAMERA_TARGET[2];
        const newY = targetY + (FIXED_CAMERA_POSITION[1] - targetY) * distanceFactor;
        const newZ = targetZ + (FIXED_CAMERA_POSITION[2] - targetZ) * distanceFactor;

        camera.position.set(FIXED_CAMERA_POSITION[0], newY, newZ);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
        }
        if (onPositionReady) {
          onPositionReady([FIXED_CAMERA_POSITION[0], newY, newZ]);
        }
        initialFramedRef.current = true;
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [gl, camera, onPositionReady]);

  // Nonaktifkan seluruh event wheel dan pinch gesture di canvas agar tidak memicu zoom browser/scene
  useEffect(() => {
    const domElement = gl.domElement;
    const preventWheelZoom = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    domElement.addEventListener('wheel', preventWheelZoom, { passive: false });
    domElement.addEventListener('touchmove', preventPinchZoom, { passive: false });

    return () => {
      domElement.removeEventListener('wheel', preventWheelZoom);
      domElement.removeEventListener('touchmove', preventPinchZoom);
    };
  }, [gl]);

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
  const currentCameraPosRef = useRef<[number, number, number]>(FIXED_CAMERA_POSITION);

  // Tombol Reset Kamera mengembalikan orientasi putaran ke sudut pandang tetap awal tanpa mengubah zoom
  useEffect(() => {
    if (cameraResetTrigger > 0 && controlsRef.current) {
      controlsRef.current.target.set(
        FIXED_CAMERA_TARGET[0],
        FIXED_CAMERA_TARGET[1],
        FIXED_CAMERA_TARGET[2]
      );
      controlsRef.current.object.position.set(
        currentCameraPosRef.current[0],
        currentCameraPosRef.current[1],
        currentCameraPosRef.current[2]
      );
      controlsRef.current.update();
    }
  }, [cameraResetTrigger]);

  return (
    <div className="w-full h-full relative overflow-hidden block select-none">
      <Canvas
        className="!w-full !h-full !block"
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        camera={{ position: FIXED_CAMERA_POSITION, fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onPointerDown={(e) => {
          // Klik di area kosong membatalkan pemilihan objek
          if (e.target === e.currentTarget) {
            onSelectObject(null);
          }
        }}
      >
        <CameraResizeHandler
          onPositionReady={(pos) => {
            currentCameraPosRef.current = pos;
          }}
        />

        {/* 
          Kontrol Orbit:
          - enableZoom = false (seluruh zoom dinonaktifkan: scroll wheel, touchpad, pinch-to-zoom)
          - enablePan = false (target kamera terkunci stabil di pusat membran)
          - enableRotate = true (pengguna tetap leluasa memutar sudut pandang)
          - enableDamping = true (putaran halus dan presisi)
        */}
        <OrbitControls
          ref={controlsRef}
          target={FIXED_CAMERA_TARGET}
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.06}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 8}
        />

        {/* Pencahayaan Lembut Alami */}
        <ambientLight intensity={1.15} />
        <directionalLight position={[6, 9, 6]} intensity={1.35} castShadow={false} />
        <directionalLight position={[-6, -6, -4]} intensity={0.55} />
        <pointLight position={[-2.4, 1.4, 2.5]} intensity={1.0} color="#F59E0B" distance={7} />
        <pointLight position={[2.2, -0.4, 2.5]} intensity={0.9} color="#10B981" distance={7} />

        {/* Lingkungan & Anotasi Ruang */}
        <Environment3D showLabels={showLabels} />

        {/* Objek Simulasi Utama: Posisi dan skala tetap, bebas dari auto-fit/auto-zoom */}
        <group position={[0, -0.2, 0]}>
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
      </Canvas>
    </div>
  );
};
