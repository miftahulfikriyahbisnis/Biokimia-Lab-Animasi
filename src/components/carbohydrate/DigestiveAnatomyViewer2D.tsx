/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  AlertCircle, 
  ChevronRight, 
  Info,
  Layers,
  CheckCircle2,
  HelpCircle,
  Move
} from 'lucide-react';
import { DigestionStage } from '../../data/carbohydrateData';

interface DigestiveAnatomyViewer2DProps {
  currentStep: number;
  activeStage: DigestionStage;
  isPlaying: boolean;
  speed: number;
  showLabels: boolean;
  onSelectStep?: (step: number) => void;
  onNextStep?: () => void;
  onOpenOxidative?: () => void;
}

export const DigestiveAnatomyViewer2D: React.FC<DigestiveAnatomyViewer2DProps> = ({
  currentStep,
  activeStage,
  isPlaying,
  speed,
  showLabels,
  onSelectStep,
  onNextStep,
  onOpenOxidative
}) => {
  // Zoom and Pan States
  const [zoom, setZoom] = useState<number>(1.02);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cameraMode, setCameraMode] = useState<'FULL' | 'ORGAN'>('FULL');
  const [viewMode, setViewMode] = useState<'ANIMATED' | 'BEFORE' | 'AFTER'>('ANIMATED');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showEnzymeDetail, setShowEnzymeDetail] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation cycle sub-states for realistic biological motion
  // 160 ticks = 8.0s per complete cycle at speed=1 (50ms interval)
  const [animationTick, setAnimationTick] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying || viewMode !== 'ANIMATED') return;
    const interval = setInterval(() => {
      setAnimationTick((prev) => (prev + 1) % 160);
    }, 50 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed, viewMode]);

  // Adjust zoom & pan automatically when currentStep changes
  // Framing dijaga agar tubuh manusia dan organ aktif TIDAK PERNAH terpotong di layar
  useEffect(() => {
    if (cameraMode === 'FULL') {
      setZoom(1.02);
      setPan({ x: 0, y: 0 });
      return;
    }

    switch (currentStep) {
      case 1:
        // Fokus Mulut & Sendok Nasi (kepala, mulut, sendok, dan mangkuk tetap terlihat penuh)
        setZoom(1.22);
        setPan({ x: 15, y: 75 });
        break;
      case 2:
        // Fokus Leher & Esofagus
        setZoom(1.30);
        setPan({ x: 0, y: 30 });
        break;
      case 3:
        // Fokus Lambung (Gaster)
        setZoom(1.35);
        setPan({ x: -20, y: -40 });
        break;
      case 4:
      case 5:
        // Fokus Duodenum & Pankreas
        setZoom(1.40);
        setPan({ x: -10, y: -60 });
        break;
      case 6:
      case 7:
        // Fokus Usus Halus & Kapiler Darah
        setZoom(1.35);
        setPan({ x: -10, y: -90 });
        break;
      default:
        setZoom(1.02);
        setPan({ x: 0, y: 0 });
    }
  }, [currentStep, cameraMode]);

  // Zoom helpers
  const handleZoomIn = () => setZoom((z) => Math.min(3.5, Number((z + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.9, Number((z - 0.25).toFixed(2))));
  const handleResetView = () => {
    setZoom(1.02);
    setPan({ x: 0, y: 0 });
    setCameraMode('FULL');
  };

  const handleFocusOrgan = (target: 'mouth' | 'esophagus' | 'stomach' | 'duodenum' | 'intestine' | 'full') => {
    if (target === 'mouth') {
      setCameraMode('ORGAN');
      setZoom(1.22);
      setPan({ x: 15, y: 75 });
    } else if (target === 'esophagus') {
      setCameraMode('ORGAN');
      setZoom(1.30);
      setPan({ x: 0, y: 30 });
    } else if (target === 'stomach') {
      setCameraMode('ORGAN');
      setZoom(1.35);
      setPan({ x: -20, y: -40 });
    } else if (target === 'duodenum') {
      setCameraMode('ORGAN');
      setZoom(1.40);
      setPan({ x: -10, y: -60 });
    } else if (target === 'intestine') {
      setCameraMode('ORGAN');
      setZoom(1.35);
      setPan({ x: -10, y: -90 });
    } else {
      setCameraMode('FULL');
      setZoom(1.02);
      setPan({ x: 0, y: 0 });
    }
  };

  // Mouse / Pointer drag handlers for panning
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with primary mouse button or touch
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    // Bound pan range so graphic doesn't get lost
    setPan({
      x: Math.max(-300, Math.min(300, newX)),
      y: Math.max(-350, Math.min(350, newY))
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    setZoom((z) => Math.max(1.0, Math.min(3.5, Number((z + delta).toFixed(2)))));
  };

  // Smooth cubic easing helper
  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  // Anatomical human arm dimensions (profile adult)
  const SHOULDER_PIVOT = { x: 185, y: 275 };
  const UPPER_ARM_LEN = 96;
  const FOREARM_LEN = 90;

  const calculateRightArmKinematics = (wristX: number, wristY: number) => {
    const Sx = SHOULDER_PIVOT.x;
    const Sy = SHOULDER_PIVOT.y;
    const L1 = UPPER_ARM_LEN;
    const L2 = FOREARM_LEN;

    const dx = wristX - Sx;
    const dy = wristY - Sy;
    const rawDist = Math.sqrt(dx * dx + dy * dy);
    const d = Math.max(30, Math.min(L1 + L2 - 3, rawDist));

    const phi = Math.atan2(dy, dx);
    const cosAlpha = (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d);
    const alpha = Math.acos(Math.max(-0.999, Math.min(0.999, cosAlpha)));

    // Elbow bends anteriorly/ventrally
    const theta1 = phi - alpha;
    const Ex = Sx + L1 * Math.cos(theta1);
    const Ey = Sy + L1 * Math.sin(theta1);
    const theta2 = Math.atan2(wristY - Ey, wristX - Ex);

    return { Sx, Sy, Ex, Ey, Wx: wristX, Wy: wristY, theta1, theta2 };
  };

  // Natural 5-stage eating animation calculation (160 ticks = 8.0s)
  const eatProgress = (animationTick % 160) / 160;

  const RESTING_WRIST = { x: 88, y: 304 };
  const MOUTH_WRIST = { x: 98, y: 172 };

  let targetWrist = { ...RESTING_WRIST };
  let handAngleDeg = -12;
  let jawAngle = 0; // Mandible rotation around TMJ (248, 170)
  let riceOnSpoon = true;
  let riceOnTongue = false;
  let riceTransferProgress = 0;
  let chewScale = 1;
  let armOpacity = 0.98;

  if (currentStep === 1) {
    armOpacity = 0.98;
    if (eatProgress < 0.15) {
      // TAHAP 1 — MENGAMBIL NASI
      const p = eatProgress / 0.15;
      const dip = Math.sin(p * Math.PI) * 12;
      targetWrist = {
        x: RESTING_WRIST.x - Math.sin(p * Math.PI) * 4,
        y: RESTING_WRIST.y + dip
      };
      handAngleDeg = -12 + Math.sin(p * Math.PI) * 12;
      riceOnSpoon = p > 0.35;
      riceOnTongue = false;
      jawAngle = 0;
    } else if (eatProgress < 0.40) {
      // TAHAP 2 — TANGAN MENUJU MULUT
      const p = (eatProgress - 0.15) / 0.25;
      const u = easeInOutCubic(p);
      const p0 = RESTING_WRIST;
      const p1 = { x: 48, y: 242 };
      const p2 = { x: 68, y: 185 };
      const p3 = MOUTH_WRIST;
      targetWrist = {
        x: Math.pow(1 - u, 3) * p0.x + 3 * Math.pow(1 - u, 2) * u * p1.x + 3 * (1 - u) * Math.pow(u, 2) * p2.x + Math.pow(u, 3) * p3.x,
        y: Math.pow(1 - u, 3) * p0.y + 3 * Math.pow(1 - u, 2) * u * p1.y + 3 * (1 - u) * Math.pow(u, 2) * p2.y + Math.pow(u, 3) * p3.y
      };
      handAngleDeg = -12 * (1 - u) + (-4) * u;
      riceOnSpoon = true;
      riceOnTongue = false;
      if (p > 0.65) {
        const openP = (p - 0.65) / 0.35;
        jawAngle = -9.5 * easeInOutCubic(openP);
      } else {
        jawAngle = 0;
      }
    } else if (eatProgress < 0.50) {
      // TAHAP 3 — MULUT MEMBUKA
      const p = (eatProgress - 0.40) / 0.10;
      const u = easeInOutCubic(p);
      targetWrist = {
        x: MOUTH_WRIST.x + u * 6,
        y: MOUTH_WRIST.y - u * 2
      };
      handAngleDeg = -4 + u * 2;
      jawAngle = -9.5;
      riceOnSpoon = true;
      riceOnTongue = false;
    } else if (eatProgress < 0.62) {
      // TAHAP 4 — NASI MASUK (Transfer ke lidah)
      const p = (eatProgress - 0.50) / 0.12;
      targetWrist = {
        x: MOUTH_WRIST.x + 6,
        y: MOUTH_WRIST.y - 2
      };
      handAngleDeg = -2 + Math.sin(p * Math.PI) * 4;
      jawAngle = -9.5;
      riceTransferProgress = p;
      riceOnSpoon = p < 0.65;
      riceOnTongue = true;
    } else if (eatProgress < 0.76) {
      // TAHAP 5 — SENDOK KELUAR & MULUT MENUTUP
      const p = (eatProgress - 0.62) / 0.14;
      const u = easeInOutCubic(p);
      const p0 = { x: MOUTH_WRIST.x + 6, y: MOUTH_WRIST.y - 2 };
      const p1 = { x: 74, y: 195 };
      const p2 = { x: 62, y: 250 };
      const p3 = RESTING_WRIST;
      targetWrist = {
        x: Math.pow(1 - u, 3) * p0.x + 3 * Math.pow(1 - u, 2) * u * p1.x + 3 * (1 - u) * Math.pow(u, 2) * p2.x + Math.pow(u, 3) * p3.x,
        y: Math.pow(1 - u, 3) * p0.y + 3 * Math.pow(1 - u, 2) * u * p1.y + 3 * (1 - u) * Math.pow(u, 2) * p2.y + Math.pow(u, 3) * p3.y
      };
      handAngleDeg = -2 * (1 - u) + (-12) * u;
      jawAngle = -9.5 * (1 - Math.min(1, p * 1.6));
      riceOnSpoon = false;
      riceOnTongue = true;
    } else {
      // TAHAP 6 — PENGUNYAHAN (MASTIKASI)
      const p = (eatProgress - 0.76) / 0.24;
      targetWrist = RESTING_WRIST;
      handAngleDeg = -12;
      const chewCycle = Math.sin(p * 4 * Math.PI * 2);
      jawAngle = -3.2 * Math.max(0, chewCycle);
      chewScale = 1 + Math.sin(p * 4 * Math.PI * 2) * 0.1;
      riceOnSpoon = false;
      riceOnTongue = true;
    }
  } else {
    // Tahap 2-7: tubuh dalam pose istirahat tenang, lengan diredupkan agar organ pencernaan dominan
    armOpacity = 0.38;
    targetWrist = RESTING_WRIST;
    handAngleDeg = -12;
    jawAngle = 0;
    riceOnSpoon = false;
    riceOnTongue = currentStep <= 3;
  }

  const rightArm = calculateRightArmKinematics(targetWrist.x, targetWrist.y);

  // Upper arm vector & contour calculation
  const dx1 = rightArm.Ex - rightArm.Sx;
  const dy1 = rightArm.Ey - rightArm.Sy;
  const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) || 1;
  const nx1 = -dy1 / len1;
  const ny1 = dx1 / len1;

  const sOuter = { x: rightArm.Sx + nx1 * 16, y: rightArm.Sy + ny1 * 16 };
  const sInner = { x: rightArm.Sx - nx1 * 14, y: rightArm.Sy - ny1 * 14 };
  const eOuter = { x: rightArm.Ex + nx1 * 12, y: rightArm.Ey + ny1 * 12 };
  const eInner = { x: rightArm.Ex - nx1 * 11, y: rightArm.Ey - ny1 * 11 };
  const deltCtrl = {
    x: rightArm.Sx + dx1 * 0.35 + nx1 * 20,
    y: rightArm.Sy + dy1 * 0.35 + ny1 * 20
  };
  const bicCtrl = {
    x: rightArm.Sx + dx1 * 0.5 - nx1 * 16,
    y: rightArm.Sy + dy1 * 0.5 - ny1 * 16
  };

  // Forearm vector & contour calculation
  const dx2 = rightArm.Wx - rightArm.Ex;
  const dy2 = rightArm.Wy - rightArm.Ey;
  const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;
  const nx2 = -dy2 / len2;
  const ny2 = dx2 / len2;

  const wOuter = { x: rightArm.Wx + nx2 * 7, y: rightArm.Wy + ny2 * 7 };
  const wInner = { x: rightArm.Wx - nx2 * 7, y: rightArm.Wy - ny2 * 7 };
  const efOuter = { x: rightArm.Ex + nx2 * 11, y: rightArm.Ey + ny2 * 11 };
  const efInner = { x: rightArm.Ex - nx2 * 10, y: rightArm.Ey - ny2 * 10 };
  const brachCtrl = {
    x: rightArm.Ex + dx2 * 0.35 + nx2 * 15,
    y: rightArm.Ey + dy2 * 0.35 + ny2 * 15
  };
  const medCtrl = {
    x: rightArm.Ex + dx2 * 0.5 - nx2 * 9,
    y: rightArm.Ey + dy2 * 0.5 - ny2 * 9
  };

  // Stage 2: Esophagus Peristalsis Animation
  const esopProgress = (animationTick % 100) / 100;
  const esopY = 215 + esopProgress * 155; // runs from Y 215 to Y 370
  const esopX = 248 + Math.sin(esopProgress * Math.PI) * 12;

  // Stage 3: Gastric Churning & pH drop Animation
  const stomachCycle = (animationTick % 120) / 120;
  const stomachChurn = Math.sin(animationTick * 0.18) * 5;
  const stomachPH = Math.max(2.0, Number((6.8 - stomachCycle * 4.8).toFixed(1)));

  // Stage 4: Duodenum & Pancreatic Secretion
  const duodProgress = (animationTick % 100) / 100;
  const duodAngle = duodProgress * Math.PI * 0.9;
  const duodX = 252 - Math.cos(duodAngle) * 22;
  const duodY = 422 + Math.sin(duodAngle) * 38;
  const pylorusOpen = Math.sin(animationTick * 0.2) > 0.3;

  // Stage 5: Pancreatic Amylase Starch Cleavage
  const amylaseCycle = (animationTick % 120) / 120;

  // Stage 6: Brush Border Enzymes (Maltase & Sucrase-Isomaltase)
  const brushBorderCycle = (animationTick % 120) / 120;

  // Stage 7: Glucose Absorption into Bloodstream
  const bloodCycle = (animationTick % 100) / 100;
  const lumenGlucoseCount = Math.max(2, Math.round(12 - bloodCycle * 10));
  const bloodGlucoseCount = Math.min(22, Math.round(2 + bloodCycle * 18));

  return (
    <div className="space-y-3">
      {/* 1. Bar Navigasi Perbandingan Substrat & Pilihan Tampilan Kamera */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 bg-[#FAF8F5] rounded-2xl border border-[#E5E2D9]">
        {/* Toggle Mode: SEBELUM vs PROSES ANIMASI vs SESUDAH */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E2D9] shadow-2xs">
          <button
            onClick={() => setViewMode('BEFORE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'BEFORE'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA]'
            }`}
            title="Lihat bentuk awal makanan dan struktur kimia sebelum diproses"
          >
            ⏪ 1. SEBELUM (Substrat Awal)
          </button>
          <button
            onClick={() => setViewMode('ANIMATED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'ANIMATED'
                ? 'bg-[#6B705C] text-white shadow-xs'
                : 'text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA]'
            }`}
            title="Putar animasi proses mekanik dan kimiawi"
          >
            🔄 2. PROSES BERJALAN (Animasi)
          </button>
          <button
            onClick={() => setViewMode('AFTER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'AFTER'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA]'
            }`}
            title="Lihat hasil akhir perubahan fisik dan molekul produk"
          >
            ⏩ 3. SESUDAH (Hasil Produk)
          </button>
        </div>

        {/* Toggle Mode Kamera: Tubuh Penuh vs Fokus Organ */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E2D9] shadow-2xs text-xs">
          <span className="text-[#A5A58D] text-[11px] px-1.5 font-medium">Kamera:</span>
          <button
            onClick={() => {
              setCameraMode('FULL');
              setZoom(1.02);
              setPan({ x: 0, y: 0 });
            }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              cameraMode === 'FULL'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'text-[#706B5C] hover:bg-[#F5F2EA]'
            }`}
          >
            🧍 Tubuh Penuh
          </button>
          <button
            onClick={() => {
              setCameraMode('ORGAN');
              handleFocusOrgan(
                currentStep === 1 ? 'mouth' :
                currentStep === 2 ? 'esophagus' :
                currentStep === 3 ? 'stomach' :
                (currentStep === 4 || currentStep === 5) ? 'duodenum' : 'intestine'
              );
            }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              cameraMode === 'ORGAN'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-[#706B5C] hover:bg-[#F5F2EA]'
            }`}
          >
            🔍 Fokus Organ
          </button>
        </div>
      </div>

      {/* Visual Canvas Container with Zoom and Pan */}
      <div 
        ref={containerRef}
        id="digestive-2d-viewport"
        className="relative w-full h-[520px] sm:h-[580px] bg-gradient-to-b from-[#FAF7F2] to-[#F3EFEA] rounded-3xl overflow-hidden border border-[#E5E2D9] select-none flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
      >
        {/* Floating Live Status Card di Atas */}
        <div className="absolute top-3 left-3 right-3 sm:right-auto z-30 max-w-md bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-amber-200/90 shadow-md pointer-events-none">
          <div className="flex items-start gap-2.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-0.5 shrink-0 animate-pulse" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#3E3E3E] text-[11.5px]">
                  Tahap {currentStep}: {activeStage.organ}
                </span>
                <span className={`px-2 py-0.2 text-[9.5px] font-bold rounded-full uppercase tracking-wider ${
                  viewMode === 'BEFORE' ? 'bg-amber-100 text-amber-800' :
                  viewMode === 'AFTER' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {viewMode === 'BEFORE' ? 'Substrat Awal' : viewMode === 'AFTER' ? 'Hasil Produk' : 'Animasi Aktif'}
                </span>
              </div>
              <p className="text-[#706B5C] text-[10.5px] leading-snug">
                {viewMode === 'BEFORE' && activeStage.substrateChange.before}
                {viewMode === 'ANIMATED' && activeStage.whatIsHappening}
                {viewMode === 'AFTER' && activeStage.substrateChange.after}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Zoom Controls di Kanan Atas */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-[#E5E2D9] shadow-sm">
          <button
            onClick={handleZoomIn}
            title="Perbesar (Zoom In)"
            className="p-1.5 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono font-bold text-[#706B5C] w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomOut}
            title="Perkecil (Zoom Out)"
            className="p-1.5 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-[#E5E2D9] mx-1" />
          <button
            onClick={handleResetView}
            title="Reset Tampilan (Fit to screen)"
            className="p-1.5 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Drag / Pan hint overlay di Kiri Bawah */}
        <div className="absolute bottom-3 left-3 z-30 bg-black/55 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl text-[10px] flex items-center gap-1.5 pointer-events-none opacity-85">
          <Move className="w-3 h-3" />
          <span>Klik & geser untuk menggeser | Scroll untuk Zoom | Pilihan tombol kamera di atas</span>
        </div>

        {/* TRANSFORMED SVG CONTAINER */}
        <div
          id="digestive-transform-layer"
          className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <svg
            viewBox="0 0 520 720"
            className="w-full h-full max-w-[500px] max-h-[700px] filter drop-shadow-md"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBE9DB" />
                <stop offset="60%" stopColor="#F5D8C4" />
                <stop offset="100%" stopColor="#E6BFAB" />
              </linearGradient>

              <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FA9590" />
                <stop offset="50%" stopColor="#ED7B77" />
                <stop offset="100%" stopColor="#CF5753" />
              </linearGradient>

              <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BA433F" />
                <stop offset="50%" stopColor="#9E3532" />
                <stop offset="100%" stopColor="#7E2421" />
              </linearGradient>

              <linearGradient id="pancreasGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FFE57F" />
                <stop offset="50%" stopColor="#FBC02D" />
                <stop offset="100%" stopColor="#E5A617" />
              </linearGradient>

              <linearGradient id="duodenumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAB2AA" />
                <stop offset="100%" stopColor="#E8847C" />
              </linearGradient>

              <linearGradient id="intestineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5B2A6" />
                <stop offset="100%" stopColor="#E2897D" />
              </linearGradient>

              <linearGradient id="colonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E59990" />
                <stop offset="100%" stopColor="#CB7A72" />
              </linearGradient>

              {/* Ceramic Bowl Gradient */}
              <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF8F5" />
                <stop offset="50%" stopColor="#EDE6DE" />
                <stop offset="100%" stopColor="#D7CCC8" />
              </linearGradient>

              {/* Stainless Steel Spoon Gradient */}
              <linearGradient id="spoonMetalGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#ECEFF1" />
                <stop offset="35%" stopColor="#CFD8DC" />
                <stop offset="65%" stopColor="#90A4AE" />
                <stop offset="100%" stopColor="#ECEFF1" />
              </linearGradient>

              {/* Glow filter for active organ */}
              <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Radial Gradients untuk Spotlight Organ Aktif */}
              <radialGradient id="spotlightGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFA000" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#FFA000" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FFA000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotlightSky" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0288D1" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#0288D1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0288D1" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotlightRose" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E53935" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#E53935" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#E53935" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotlightEmerald" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#43A047" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#43A047" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#43A047" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ============================================================ */}
            {/* 0. LAYER: organSpotlightAura (Menyorot organ pada tahap aktif)*/}
            {/* ============================================================ */}
            <g id="organSpotlightAura" pointerEvents="none">
              {currentStep === 1 && (
                <circle cx="210" cy="180" r="85" fill="url(#spotlightGlow)" className="animate-pulse" />
              )}
              {currentStep === 2 && (
                <ellipse cx="258" cy="300" rx="45" ry="95" fill="url(#spotlightSky)" className="animate-pulse" />
              )}
              {currentStep === 3 && (
                <ellipse cx="295" cy="435" rx="75" ry="60" fill="url(#spotlightRose)" className="animate-pulse" />
              )}
              {currentStep === 4 && (
                <ellipse cx="255" cy="440" rx="65" ry="50" fill="url(#spotlightGlow)" className="animate-pulse" />
              )}
              {currentStep === 5 && (
                <ellipse cx="255" cy="450" rx="70" ry="55" fill="url(#spotlightGlow)" className="animate-pulse" />
              )}
              {currentStep === 6 && (
                <ellipse cx="260" cy="530" rx="75" ry="60" fill="url(#spotlightEmerald)" className="animate-pulse" />
              )}
              {currentStep === 7 && (
                <ellipse cx="270" cy="540" rx="80" ry="65" fill="url(#spotlightEmerald)" className="animate-pulse" />
              )}
            </g>

            {/* ============================================================ */}
            {/* 1. LAYER: bodyLayer (Dasar Anatomi Tubuh Manusia Samping)    */}
            {/* ============================================================ */}
            <g id="bodyLayer" opacity="0.96">
              {/* Torso Silhouette: Punggung, Tulang Belakang, Dada, Pinggang, Pinggul */}
              <path
                d="
                  M 235, 48
                  C 285, 52 335, 88 345, 142
                  C 350, 175 342, 205 336, 235
                  C 334, 252 338, 275 350, 292
                  C 362, 310 388, 335 402, 375
                  C 416, 415 422, 465 420, 520
                  C 418, 570 412, 620 405, 665
                  C 400, 695 395, 715 390, 720
                  L 135, 720
                  C 132, 690 128, 645 130, 595
                  C 132, 545 138, 485 142, 435
                  C 146, 385 152, 340 165, 305
                  C 175, 280 185, 260 190, 245
                  C 192, 230 190, 218 185, 208
                  L 235, 48 Z
                "
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.5"
              />

              {/* Cervical to Lumbar Spine subtle curve */}
              <path
                d="M 285, 230 C 310, 280 320, 360 305, 460 C 295, 530 300, 610 310, 710"
                fill="none"
                stroke="#D8A58D"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                opacity="0.35"
              />

              {/* Clavicle & Sternum accents */}
              <path
                d="M 185, 265 Q 240, 280 295, 268"
                fill="none"
                stroke="#D8A58D"
                strokeWidth="1.6"
                opacity="0.5"
              />
              <path
                d="M 205, 280 L 195, 360"
                fill="none"
                stroke="#D8A58D"
                strokeWidth="1.4"
                opacity="0.4"
              />

              {/* Rib cage subtle arches */}
              <path
                d="M 180, 320 Q 235, 310 290, 325"
                fill="none"
                stroke="#D8A58D"
                strokeWidth="1"
                opacity="0.3"
              />
              <path
                d="M 175, 355 Q 235, 345 295, 360"
                fill="none"
                stroke="#D8A58D"
                strokeWidth="1"
                opacity="0.3"
              />
              <path
                d="M 170, 390 Q 235, 380 300, 395"
                fill="none"
                stroke="#D8A58D"
                strokeWidth="1"
                opacity="0.25"
              />
            </g>

            {/* ============================================================ */}
            {/* 2. LAYER: digestiveSystemLayer (Organ Saluran Pencernaan 2D) */}
            {/* ============================================================ */}
            <g id="digestiveSystemLayer">
              <g id="sagittal-head-anatomy">
              {/* Profile Head Cut / Interior Cavities */}
              {/* Nasal Cavity (superior to palate) */}
              <path
                d="M 180, 105 Q 215, 95 240, 125 Q 210, 130 180, 125 Z"
                fill="#E89F96"
                stroke="#D4867D"
                strokeWidth="1"
              />

              {/* Hard & Soft Palate */}
              <path
                d="M 168, 142 C 190, 135 220, 138 238, 148 C 242, 150 242, 155 238, 156 C 220, 146 190, 143 168, 148 Z"
                fill="#F2B7A8"
                stroke="#D4867D"
                strokeWidth="1"
              />

              {/* Oral Cavity (Cavum Oris) Interior */}
              <path
                d="M 160, 147 C 185, 145 225, 150 245, 170 C 235, 185 210, 192 180, 188 C 168, 185 160, 178 158, 170 Z"
                fill="#D46A63"
                stroke="#B84F48"
                strokeWidth="1.2"
                opacity={currentStep <= 3 ? 1 : 0.85}
              />

              {/* Tongue (Muscular floor of the mouth) */}
              <path
                d="M 172, 185 C 175, 168 200, 160 228, 165 C 238, 175 232, 188 215, 192 C 195, 195 180, 192 172, 185 Z"
                fill="#C64741"
                stroke="#9E2F2A"
                strokeWidth="1.2"
              />

              {/* Salivary Glands: Parotis (near ear/ramus) and Submandibular (below tongue) */}
              {/* Glandula Parotis */}
              <g id="glandula-parotis" opacity={currentStep === 2 ? 1 : 0.75}>
                <ellipse
                  cx="272"
                  cy="175"
                  rx="14"
                  ry="18"
                  fill="#FFD54F"
                  stroke="#F57F17"
                  strokeWidth="1.2"
                />
                <circle cx="268" cy="172" r="2.5" fill="#FFE082" />
                <circle cx="274" cy="178" r="2" fill="#FFE082" />
                <circle cx="273" cy="168" r="1.5" fill="#FFE082" />
                {/* Parotid duct pointing toward mouth */}
                <path
                  d="M 258, 175 Q 235, 168 215, 165"
                  fill="none"
                  stroke="#F57F17"
                  strokeWidth="1.2"
                  strokeDasharray={currentStep === 2 ? '3 1' : 'none'}
                />
              </g>

              {/* Glandula Submandibularis & Sublingualis */}
              <g id="glandula-submandibularis" opacity={currentStep === 2 ? 1 : 0.75}>
                <ellipse
                  cx="205"
                  cy="200"
                  rx="12"
                  ry="8"
                  fill="#FFD54F"
                  stroke="#F57F17"
                  strokeWidth="1.2"
                />
                <circle cx="202" cy="199" r="2" fill="#FFE082" />
                <circle cx="209" cy="201" r="1.5" fill="#FFE082" />
              </g>

              {/* Pharynx (Funneling down into larynx and esophagus) */}
              <path
                d="M 245, 170 Q 255, 195 252, 225 L 240, 225 Q 242, 195 235, 178 Z"
                fill="#E27872"
                stroke="#BA534D"
                strokeWidth="1"
              />

              {/* Larynx & Trachea (Anterior airway - colored light blue) */}
              <g id="trachea-airway">
                <path
                  d="M 230, 228 L 226, 285 L 242, 285 L 244, 228 Z"
                  fill="#B3E5FC"
                  stroke="#0288D1"
                  strokeWidth="1.2"
                />
                {/* Trachea cartilage rings */}
                <line x1="229" y1="238" x2="243" y2="238" stroke="#0288D1" strokeWidth="1" />
                <line x1="228" y1="248" x2="242" y2="248" stroke="#0288D1" strokeWidth="1" />
                <line x1="227" y1="258" x2="242" y2="258" stroke="#0288D1" strokeWidth="1" />
                <line x1="226" y1="268" x2="242" y2="268" stroke="#0288D1" strokeWidth="1" />
                <line x1="226" y1="278" x2="242" y2="278" stroke="#0288D1" strokeWidth="1" />
              </g>

              {/* Epiglottis (Hinged flap above laryngeal aditus) */}
              {/* In Step 2 (swallowing/esophagus), it swings down to close trachea! */}
              <g id="epiglottis">
                {currentStep === 2 ? (
                  // Epiglottis closed down over trachea
                  <path
                    d="M 233, 224 C 235, 230 245, 234 246, 230 C 244, 226 238, 222 233, 224 Z"
                    fill="#C2185B"
                    stroke="#880E4F"
                    strokeWidth="1.5"
                  />
                ) : (
                  // Epiglottis upright/open for breathing
                  <path
                    d="M 234, 224 C 232, 214 235, 206 238, 206 C 240, 208 239, 216 236, 224 Z"
                    fill="#E91E63"
                    stroke="#AD1457"
                    strokeWidth="1.2"
                  />
                )}
              </g>

              {/* Esophagus Upper Entry (Posterior to trachea) */}
              <path
                d="M 245, 225 Q 252, 255 252, 285 L 262, 285 Q 262, 255 255, 225 Z"
                fill="#FF8A80"
                stroke="#D32F2F"
                strokeWidth="1.2"
              />
            </g>

            {/* ============================================================ */}
            {/* 3. THORACIC & ABDOMINAL ORGANS (Liver, Stomach, Duodenum, Pancreas) */}
            {/* ============================================================ */}
            <g id="abdominal-organs">
              {/* Esophagus (Kerongkongan) continuing through thorax to stomach */}
              <g id="esophagus-tube" filter={currentStep === 2 ? 'url(#activeGlow)' : undefined}>
                <path
                  d="M 252, 285 Q 254, 335 258, 385 L 268, 385 Q 264, 335 262, 285 Z"
                  fill={currentStep === 2 ? '#FF5252' : '#FF8A80'}
                  stroke="#D32F2F"
                  strokeWidth={currentStep === 2 ? '2' : '1.2'}
                />
                {/* Peristaltic wave indicator in Step 2 */}
                {currentStep === 2 && (
                  <ellipse
                    cx="260"
                    cy={esopY - 12}
                    rx="7"
                    ry="3"
                    fill="#D32F2F"
                    opacity="0.7"
                  />
                )}
              </g>

              {/* Large Intestine (Colon) in background of small intestine */}
              <g id="colon-organ" opacity="0.6">
                {/* Ascending, Transverse, Descending Colon */}
                <path
                  d="
                    M 165, 590 
                    C 160, 520 162, 470 170, 430
                    C 190, 420 280, 420 345, 430
                    C 355, 470 355, 530 350, 590
                  "
                  fill="none"
                  stroke="url(#colonGrad)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Small Intestine (Usus Halus / Jejunum & Ileum coils) */}
              <g id="small-intestine-coils" opacity={currentStep >= 6 ? 1 : 0.75} filter={currentStep >= 6 ? 'url(#activeGlow)' : undefined}>
                <path
                  d="
                    M 260, 480 
                    Q 230, 490 220, 515 Q 245, 535 270, 515
                    Q 295, 535 285, 560 Q 250, 570 230, 555
                    Q 215, 575 240, 595 Q 280, 600 300, 575
                    Q 320, 550 310, 520 Q 300, 490 260, 480
                  "
                  fill="url(#intestineGrad)"
                  stroke="#C9685E"
                  strokeWidth={currentStep >= 6 ? '2.5' : '2'}
                />
              </g>

              {/* Liver (Hepar) - Anatomical Right (Viewer's Left) */}
              <g id="liver-hepar" opacity={currentStep === 3 ? 0.75 : 0.95}>
                <path
                  d="
                    M 160, 365 
                    C 180, 345 255, 345 275, 360
                    C 280, 385 270, 420 255, 430
                    C 220, 440 170, 425 155, 395
                    C 152, 385 155, 372 160, 365 Z
                  "
                  fill="url(#liverGrad)"
                  stroke="#661C19"
                  strokeWidth="1.5"
                />
                {/* Gallbladder (Vesica fellea) peeking below liver */}
                <ellipse
                  cx="220"
                  cy="428"
                  rx="7"
                  ry="12"
                  fill="#43A047"
                  stroke="#1B5E20"
                  strokeWidth="1.2"
                  transform="rotate(25 220 428)"
                />
                {/* Bile duct reaching duodenum */}
                <path
                  d="M 223, 435 Q 235, 445 248, 440"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="1.5"
                />
              </g>

              {/* Stomach (Gaster) - Anatomical Left (Viewer's Right) */}
              <g 
                id="stomach-gaster" 
                filter={currentStep === 3 ? 'url(#activeGlow)' : undefined}
                className={currentStep === 3 ? 'transition-all duration-300' : ''}
              >
                <path
                  d="
                    M 258, 385 
                    C 268, 365 310, 360 335, 380
                    C 360, 400 355, 450 330, 475
                    C 305, 500 265, 480 252, 450
                    C 248, 440 250, 425 258, 420
                    C 265, 415 285, 425 295, 430
                    C 310, 425 315, 400 300, 390
                    C 285, 382 268, 385 258, 385 Z
                  "
                  fill="url(#stomachGrad)"
                  stroke="#992B27"
                  strokeWidth={currentStep === 3 ? '2.5' : '1.5'}
                />

                {/* Gastric mucosal folds (rugae) inside stomach */}
                <path
                  d="M 290, 400 Q 320, 420 310, 450"
                  fill="none"
                  stroke="#C24945"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
                <path
                  d="M 275, 415 Q 295, 435 285, 460"
                  fill="none"
                  stroke="#C24945"
                  strokeWidth="1.2"
                  opacity="0.5"
                />

                {/* Stage 3: Churning Gastric Acid effect */}
                {currentStep === 3 && (
                  <g id="gastric-acid-chyme">
                    <path
                      d={`M 270, 445 Q ${290 + stomachChurn}, 460 315, 448 Q 300, 470 280, 465 Z`}
                      fill="#FFF59D"
                      opacity="0.65"
                    />
                    <circle cx="285" cy="445" r="3" fill="#FFEE58" opacity="0.8" />
                    <circle cx="302" cy="452" r="2.5" fill="#FFEE58" opacity="0.8" />
                    <circle cx="295" cy="438" r="2" fill="#FFEE58" opacity="0.7" />
                  </g>
                )}
              </g>

              {/* Pancreas (Pankreas) - Elongated yellow gland behind stomach */}
              <g 
                id="pancreas-gland"
                filter={currentStep === 4 || currentStep === 5 ? 'url(#activeGlow)' : undefined}
              >
                {/* Pancreas Body and Tail extending to the left behind stomach */}
                <path
                  d="
                    M 252, 432
                    C 260, 426 295, 420 325, 415
                    C 330, 422 325, 430 310, 434
                    C 285, 440 262, 445 252, 442 Z
                  "
                  fill="url(#pancreasGrad)"
                  stroke="#C79100"
                  strokeWidth="1.3"
                />
                {/* Pancreatic Lobule Textures */}
                <circle cx="265" cy="433" r="1.5" fill="#FFF9C4" />
                <circle cx="280" cy="428" r="1.5" fill="#FFF9C4" />
                <circle cx="298" cy="424" r="1.5" fill="#FFF9C4" />
                <circle cx="312" cy="420" r="1.5" fill="#FFF9C4" />

                {/* Pancreatic Duct (Duktus Pankreatikus) entering Duodenum */}
                <path
                  d="M 315, 422 Q 285, 428 250, 435"
                  fill="none"
                  stroke="#E65100"
                  strokeWidth="1.5"
                  strokeDasharray={currentStep === 4 || currentStep === 5 ? '2 1' : 'none'}
                />
              </g>

              {/* Duodenum (C-shaped loop framing head of pancreas) */}
              <g 
                id="duodenum-loop"
                filter={currentStep === 4 || currentStep === 5 ? 'url(#activeGlow)' : undefined}
              >
                <path
                  d="
                    M 252, 420 
                    C 240, 418 228, 428 230, 445
                    C 232, 465 245, 475 262, 475
                  "
                  fill="none"
                  stroke="url(#duodenumGrad)"
                  strokeWidth={currentStep === 4 || currentStep === 5 ? '14' : '10'}
                  strokeLinecap="round"
                />

                {/* Pancreatic Head nestled inside C-loop */}
                <ellipse
                  cx="246"
                  cy="445"
                  rx="9"
                  ry="12"
                  fill="url(#pancreasGrad)"
                  stroke="#C79100"
                  strokeWidth="1.2"
                />

                {/* Ampulla of Vater / Papilla duodeni major */}
                <circle cx="236" cy="442" r="2.5" fill="#BF360C" />
              </g>
            </g>
            {/* End of 2. digestiveSystemLayer */}
            </g>

            {/* ============================================================ */}
            {/* 3. LAYER: headLayer (Kranium, Dahi, Hidung, Telinga Samping) */}
            {/* ============================================================ */}
            <g id="headLayer">
              {/* Cranium vault & facial profile up to subnasale */}
              <path
                d="
                  M 235, 48
                  C 185, 48 165, 75 160, 105
                  C 158, 118 152, 126 142, 136
                  C 134, 144 135, 147 142, 150
                  C 146, 152 147, 155 147, 156
                  L 165, 156
                  C 185, 156 195, 145 205, 130
                  C 220, 105 245, 95 275, 95
                  C 310, 95 335, 118 340, 155
                  C 342, 175 338, 205 336, 235
                  C 328, 218 315, 205 295, 202
                  C 275, 200 255, 205 248, 170
                  C 246, 150 250, 110 248, 85
                  C 246, 65 242, 52 235, 48 Z
                "
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.5"
              />

              {/* Nostril wing (Ala nasi) */}
              <path
                d="M 144, 145 C 147, 143 151, 145 151, 149 C 151, 152 147, 152 144, 150"
                fill="none"
                stroke="#C48B71"
                strokeWidth="1.2"
              />

              {/* Eye & Brow (Anatomical lateral view) */}
              <path
                d="M 152, 112 C 160, 108 170, 109 178, 114"
                fill="none"
                stroke="#6D4C41"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 155, 118 Q 163, 114 171, 118 Q 163, 122 155, 118 Z"
                fill="#FFFFFF"
                stroke="#8D6E63"
                strokeWidth="1"
              />
              <circle cx="163" cy="118" r="2.8" fill="#4E342E" />
              <circle cx="162" cy="117" r="0.9" fill="#FFFFFF" />

              {/* Ear (Pinna) with realistic antihelix & concha */}
              <g id="ear-lateral" transform="translate(252, 150)">
                <path
                  d="M 6, 0 C 14, 0 18, 10 18, 20 C 18, 30 14, 38 6, 38 C 2, 38 0, 34 0, 30 C 0, 20 2, 8 6, 0 Z"
                  fill="url(#skinGrad)"
                  stroke="#D8A58D"
                  strokeWidth="1.3"
                />
                <path
                  d="M 7, 7 C 12, 10 13, 18 12, 25 C 10, 28 6, 28 5, 24"
                  fill="none"
                  stroke="#C48B71"
                  strokeWidth="1.2"
                />
                <circle cx="4" cy="20" r="2.5" fill="#C48B71" opacity="0.5" />
              </g>
            </g>

            {/* ============================================================ */}
            {/* 4. LAYER: upperJawLayer (Bibir Atas, Maksila, Gigi Seri Atas)*/}
            {/* ============================================================ */}
            <g id="upperJawLayer">
              <path
                d="
                  M 147, 155 
                  C 142, 158 138, 161 140, 163 
                  C 141, 165 144, 166 148, 166 
                  L 165, 166 
                  L 165, 155 Z
                "
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.2"
              />
              <path
                d="M 140, 162 C 141, 164 144, 166 148, 166"
                fill="none"
                stroke="#D32F2F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <rect x="148" y="162" width="10" height="4.5" rx="1" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" />
              <line x1="153" y1="162" x2="153" y2="166.5" stroke="#B0BEC5" strokeWidth="0.6" />
            </g>

            {/* ============================================================ */}
            {/* 5. LAYER: lowerJawLayer (Mandibula, Dagu, Bibir & Gigi Bawah)*/}
            {/* Berotasi pada Sendi TMJ (248, 170) saat membuka mulut & kunyah */}
            {/* ============================================================ */}
            <g id="lowerJawLayer" transform={`rotate(${jawAngle}, 248, 170)`}>
              <path
                d="
                  M 148, 166
                  C 143, 167 140, 169 140, 172
                  C 140, 175 144, 177 146, 178
                  C 142, 185 141, 189 143, 193
                  C 146, 198 155, 200 175, 199
                  C 200, 198 225, 196 235, 190
                  C 244, 184 248, 178 248, 170
                  C 235, 172 215, 174 195, 174
                  C 175, 174 160, 172 158, 166 Z
                "
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.3"
              />
              <path
                d="M 140, 171 C 142, 174 146, 176 148, 176"
                fill="none"
                stroke="#D32F2F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M 144, 178 C 146, 180 148, 180 150, 179"
                fill="none"
                stroke="#C48B71"
                strokeWidth="1"
              />
              <rect x="148" y="167" width="9.5" height="4.5" rx="1" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" />
              <line x1="153" y1="167" x2="153" y2="171.5" stroke="#B0BEC5" strokeWidth="0.6" />
              <path
                d="M 175, 199 C 185, 204 198, 206 215, 204"
                fill="none"
                stroke="#D8A58D"
                strokeWidth="1"
                opacity="0.5"
              />
            </g>

            {/* ============================================================ */}
            {/* 6. LAYER: bowlArmLayer (Lengan Kiri Memegang Mangkuk Nasi)   */}
            {/* ============================================================ */}
            <g id="bowlArmLayer" opacity={armOpacity} className="transition-opacity duration-300">
              {/* Left Upper Arm */}
              <path
                d="
                  M 215, 260
                  C 202, 290 180, 335 146, 375
                  L 132, 372
                  C 165, 330 188, 285 200, 260 Z
                "
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.3"
              />

              {/* Left Forearm */}
              <path
                d="
                  M 132, 372
                  C 115, 375 100, 368 88, 360
                  L 86, 350
                  C 102, 356 120, 360 146, 375 Z
                "
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.3"
              />

              {/* Left Elbow Joint */}
              <circle cx="138" cy="374" r="9" fill="url(#skinGrad)" stroke="#D8A58D" strokeWidth="1.2" />

              {/* Ceramic Rice Bowl */}
              <g id="rice-bowl-group">
                <ellipse cx="96" cy="372" rx="28" ry="6" fill="#000000" opacity="0.12" />
                <path
                  d="
                    M 62, 322
                    C 60, 348 74, 368 90, 368
                    L 104, 368
                    C 120, 368 134, 348 132, 322 Z
                  "
                  fill="url(#ceramicGrad)"
                  stroke="#8D6E63"
                  strokeWidth="1.5"
                />
                <path
                  d="M 86, 368 L 86, 372 L 108, 372 L 108, 368 Z"
                  fill="#795548"
                  stroke="#5D4037"
                  strokeWidth="1"
                />
                <ellipse cx="97" cy="322" rx="35" ry="8" fill="#EFEBE9" stroke="#8D6E63" strokeWidth="1.2" />

                {/* Cooked Rice Dome */}
                <path
                  d="M 66, 321 C 68, 300 126, 300 128, 321 Z"
                  fill="#FFFFFF"
                  stroke="#CFD8DC"
                  strokeWidth="1"
                />
                <ellipse cx="78" cy="316" rx="3.5" ry="1.8" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(-15 78 316)" />
                <ellipse cx="88" cy="311" rx="4" ry="2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(20 88 311)" />
                <ellipse cx="98" cy="308" rx="4" ry="2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(-5 98 308)" />
                <ellipse cx="108" cy="312" rx="3.8" ry="1.9" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(30 108 312)" />
                <ellipse cx="118" cy="317" rx="3.6" ry="1.8" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(-25 118 317)" />
                <ellipse cx="84" cy="319" rx="3.8" ry="1.9" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(5 84 319)" />
                <ellipse cx="94" cy="317" rx="4.2" ry="2.1" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(-18 94 317)" />
                <ellipse cx="104" cy="318" rx="4" ry="2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.7" transform="rotate(12 104 318)" />
              </g>

              {/* Left Hand cupping bowl with 5 distinct fingers */}
              <g id="left-hand-fingers">
                <ellipse cx="86" cy="358" rx="7" ry="9" fill="url(#skinGrad)" stroke="#D8A58D" strokeWidth="1.2" />

                {/* 1. Thumb */}
                <path
                  d="M 80, 342 C 76, 332 74, 324 74, 320 C 75, 318 78, 318 79, 321 C 80, 325 82, 334 85, 343 Z"
                  fill="url(#skinGrad)"
                  stroke="#D8A58D"
                  strokeWidth="1.1"
                />
                <ellipse cx="76" cy="320" rx="2" ry="1.2" fill="#FFF8F0" stroke="#E2B79F" strokeWidth="0.6" transform="rotate(10 76 320)" />

                {/* 2. Index */}
                <path
                  d="M 78, 347 C 71, 342 66, 340 66, 345 C 66, 349 71, 353 76, 355 Z"
                  fill="url(#skinGrad)"
                  stroke="#D8A58D"
                  strokeWidth="1"
                />

                {/* 3. Middle */}
                <path
                  d="M 76, 355 C 69, 353 67, 357 69, 361 C 71, 364 77, 363 81, 361 Z"
                  fill="url(#skinGrad)"
                  stroke="#D8A58D"
                  strokeWidth="1"
                />

                {/* 4. Ring */}
                <path
                  d="M 81, 361 C 78, 365 84, 368 90, 366 C 92, 364 87, 361 83, 360 Z"
                  fill="url(#skinGrad)"
                  stroke="#D8A58D"
                  strokeWidth="1"
                />

                {/* 5. Little finger */}
                <path
                  d="M 90, 366 C 92, 370 100, 368 102, 364 C 100, 362 94, 362 90, 364 Z"
                  fill="url(#skinGrad)"
                  stroke="#D8A58D"
                  strokeWidth="1"
                />
              </g>
            </g>

            {/* ============================================================ */}
            {/* 7. LAYER: spoonUpperArmLayer (Lengan Atas Kanan & Bahu)      */}
            {/* ============================================================ */}
            <g id="spoonUpperArmLayer" opacity={armOpacity} className="transition-opacity duration-300">
              <path
                d={`M ${sOuter.x},${sOuter.y} Q ${deltCtrl.x},${deltCtrl.y} ${eOuter.x},${eOuter.y} L ${eInner.x},${eInner.y} Q ${bicCtrl.x},${bicCtrl.y} ${sInner.x},${sInner.y} Z`}
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.5"
              />
              <circle cx={rightArm.Ex} cy={rightArm.Ey} r="11" fill="url(#skinGrad)" stroke="#D8A58D" strokeWidth="1.2" />
            </g>

            {/* ============================================================ */}
            {/* 8. LAYER: spoonForearmLayer (Lengan Bawah Kanan)             */}
            {/* ============================================================ */}
            <g id="spoonForearmLayer" opacity={armOpacity} className="transition-opacity duration-300">
              <path
                d={`M ${efOuter.x},${efOuter.y} Q ${brachCtrl.x},${brachCtrl.y} ${wOuter.x},${wOuter.y} L ${wInner.x},${wInner.y} Q ${medCtrl.x},${medCtrl.y} ${efInner.x},${efInner.y} Z`}
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.5"
              />
            </g>

            {/* ============================================================ */}
            {/* 9. LAYER: spoonHandLayer (Tangan Kanan dengan 5 Jari Wajar)  */}
            {/* ============================================================ */}
            <g 
              id="spoonHandLayer" 
              opacity={armOpacity} 
              transform={`translate(${rightArm.Wx}, ${rightArm.Wy}) rotate(${handAngleDeg})`}
              className="transition-opacity duration-300"
            >
              <path
                d="M 0, -7 C 7, -8 15, -7 19, -4 L 19, 6 C 14, 8 6, 9 0, 7 Z"
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.3"
              />
              <path
                d="M 4, -6 C 8, -8 13, -8 16, -5 C 14, -3 9, -3 4, -4 Z"
                fill="#F8CBB6"
                opacity="0.6"
              />

              {/* 1. Thumb */}
              <path
                d="M 6, -5 C 9, -11 15, -12 19, -8 C 21, -6 22, -3 19, -1 C 16, -1 12, -2 8, -3 Z"
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1.1"
              />
              <ellipse cx="18" cy="-6" rx="2.2" ry="1.3" fill="#FFF8F0" stroke="#E2B79F" strokeWidth="0.6" transform="rotate(-20 18 -6)" />

              {/* 2. Index finger */}
              <path
                d="M 19, -4 C 25, -5 30, -4 34, -2 C 36, -1 36, 1 32, 2 C 28, 2 23, 1 19, -1 Z"
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1"
              />
              <ellipse cx="33" cy="-1" rx="1.8" ry="1" fill="#FFF8F0" stroke="#E2B79F" strokeWidth="0.6" />

              {/* 3. Middle finger */}
              <path
                d="M 18, 1 C 23, 2 28, 5 29, 7 C 29, 9 26, 10 23, 9 C 19, 8 16, 5 16, 3 Z"
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1"
              />
              <ellipse cx="27" cy="8" rx="1.6" ry="1" fill="#FFF8F0" stroke="#E2B79F" strokeWidth="0.6" />

              {/* 4. Ring finger */}
              <path
                d="M 15, 4 C 19, 7 23, 9 24, 11 C 23, 13 20, 13 17, 12 C 14, 10 13, 7 13, 5 Z"
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1"
              />

              {/* 5. Little finger */}
              <path
                d="M 11, 7 C 15, 9 18, 12 18, 14 C 17, 16 14, 15 12, 14 C 10, 12 9, 9 9, 8 Z"
                fill="url(#skinGrad)"
                stroke="#D8A58D"
                strokeWidth="1"
              />
            </g>

            {/* ============================================================ */}
            {/* 10. LAYER: spoonLayer (Sendok Logam Bersih & Kokoh)          */}
            {/* ============================================================ */}
            <g 
              id="spoonLayer" 
              opacity={armOpacity} 
              transform={`translate(${rightArm.Wx}, ${rightArm.Wy}) rotate(${handAngleDeg})`}
              className="transition-opacity duration-300"
            >
              <path
                d="M -24, -1.3 L 10, -2 L 32, -1.3 L 38, 0 L 32, 1.3 L 10, 2 L -24, 1.3 Z"
                fill="url(#spoonMetalGrad)"
                stroke="#90A4AE"
                strokeWidth="1"
              />
              <path
                d="M 38, 0 C 42, -8 64, -8 73, 0 C 64, 8 42, 8 38, 0 Z"
                fill="url(#spoonMetalGrad)"
                stroke="#78909C"
                strokeWidth="1.3"
              />
              <path
                d="M 43, -1 C 47, -5 59, -5 66, -1 C 60, 2 49, 2 43, -1 Z"
                fill="#FFFFFF"
                opacity="0.6"
              />
            </g>

            {/* ============================================================ */}
            {/* 11. LAYER: riceLayer (Nasi di Sendok & Perpindahan ke Lidah) */}
            {/* ============================================================ */}
            <g id="riceLayer">
              {riceOnSpoon && (
                <g 
                  id="rice-grains-on-spoon"
                  transform={`translate(${rightArm.Wx}, ${rightArm.Wy}) rotate(${handAngleDeg})`}
                  opacity={armOpacity}
                >
                  <ellipse cx="50" cy="-2" rx="4" ry="2.2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" transform="rotate(-15 50 -2)" />
                  <ellipse cx="56" cy="-4" rx="4.2" ry="2.2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" transform="rotate(10 56 -4)" />
                  <ellipse cx="62" cy="-1.5" rx="4" ry="2.1" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" transform="rotate(-20 62 -1.5)" />
                  <ellipse cx="54" cy="2" rx="3.8" ry="2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" transform="rotate(20 54 2)" />
                  <ellipse cx="60" cy="2.5" rx="4" ry="2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" transform="rotate(5 60 2.5)" />
                </g>
              )}

              {/* Dynamic Rice Transfer from spoon to mouth during Step 1 Phase 4 */}
              {currentStep === 1 && riceTransferProgress > 0 && riceTransferProgress < 1 && (
                <g id="rice-transfer-stream" opacity={1 - riceTransferProgress * 0.4}>
                  <ellipse 
                    cx={154 + riceTransferProgress * 36} 
                    cy={168 + Math.sin(riceTransferProgress * Math.PI) * 4} 
                    rx="4" 
                    ry="2.2" 
                    fill="#FFFFFF" 
                    stroke="#CFD8DC" 
                    strokeWidth="0.8" 
                  />
                  <ellipse 
                    cx={150 + riceTransferProgress * 42} 
                    cy={166 + Math.sin(riceTransferProgress * Math.PI) * 3} 
                    rx="3.8" 
                    ry="2" 
                    fill="#FFFFFF" 
                    stroke="#CFD8DC" 
                    strokeWidth="0.8" 
                  />
                </g>
              )}

              {/* Rice grains resting on dorsal tongue */}
              {riceOnTongue && (
                <g 
                  id="rice-grains-on-tongue"
                  transform={`translate(195, 172) scale(${chewScale})`}
                  style={{ transformOrigin: 'center' }}
                >
                  <ellipse cx="-8" cy="0" rx="4" ry="2.3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="0.8" transform="rotate(15 -8 0)" />
                  <ellipse cx="0" cy="-3" rx="4.5" ry="2.4" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="0.8" transform="rotate(-10 0 -3)" />
                  <ellipse cx="7" cy="1" rx="4.2" ry="2.2" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="0.8" transform="rotate(25 7 1)" />
                  <ellipse cx="-2" cy="4" rx="4" ry="2.1" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="0.8" transform="rotate(-20 -2 4)" />
                  <circle cx="-12" cy="2" r="1.5" fill="#80D8FF" opacity="0.85" />
                  <circle cx="12" cy="-1" r="1.8" fill="#80D8FF" opacity="0.85" />
                  <circle cx="3" cy="8" r="1.6" fill="#80D8FF" opacity="0.85" />
                </g>
              )}
            </g>

            {/* ============================================================ */}
            {/* 12. LAYER: molecularOverlayLayer (Enzim, Bolus, Anotasi untuk 7 Tahap) */}
            {/* ============================================================ */}
            <g id="molecularOverlayLayer">
              {/* TAHAP 1: Mulut — Nasi Menjadi Partikel Kecil */}
              {currentStep === 1 && (
                <g id="overlay-step-1">
                  {viewMode === 'BEFORE' ? (
                    // Substrat Awal: Pati Panjang & Butir Nasi Utuh
                    <g id="step-1-before" transform="translate(60, 95)">
                      <rect x="0" y="0" width="240" height="54" rx="10" fill="#FFF8E1" stroke="#FFA000" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#B71C1C" fontSize="10.5" fontWeight="bold">
                        ⏪ KONDISI SEBELUM:
                      </text>
                      <text x="12" y="32" fill="#5D4037" fontSize="9.5">
                        • Butiran nasi utuh (belum dikunyah)
                      </text>
                      <text x="12" y="46" fill="#5D4037" fontSize="9.5">
                        • Polimer pati panjang: [Glc]-[Glc]-[Glc]-[Glc] (ikatan α-1,4 utuh)
                      </text>
                      {/* Diagram Rantai Pati Awal */}
                      <g transform="translate(130, 75)">
                        <circle cx="0" cy="0" r="5" fill="#FFE082" stroke="#FF8F00" strokeWidth="1" />
                        <line x1="5" y1="0" x2="15" y2="0" stroke="#795548" strokeWidth="1.5" />
                        <circle cx="20" cy="0" r="5" fill="#FFE082" stroke="#FF8F00" strokeWidth="1" />
                        <line x1="25" y1="0" x2="35" y2="0" stroke="#795548" strokeWidth="1.5" />
                        <circle cx="40" cy="0" r="5" fill="#FFE082" stroke="#FF8F00" strokeWidth="1" />
                        <line x1="45" y1="0" x2="55" y2="0" stroke="#795548" strokeWidth="1.5" />
                        <circle cx="60" cy="0" r="5" fill="#FFE082" stroke="#FF8F00" strokeWidth="1" />
                        <text x="30" y="14" textAnchor="middle" fill="#8D6E63" fontSize="8">Polimer Pati Panjang</text>
                      </g>
                    </g>
                  ) : viewMode === 'AFTER' ? (
                    // Hasil Produk: Bolus Licin & Terbentuk Maltosa Awal
                    <g id="step-1-after" transform="translate(60, 95)">
                      <rect x="0" y="0" width="240" height="54" rx="10" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#1B5E20" fontSize="10.5" fontWeight="bold">
                        ⏩ KONDISI SESUDAH:
                      </text>
                      <text x="12" y="32" fill="#2E7D32" fontSize="9.5">
                        • Bolus halus terlumas saliva (musin)
                      </text>
                      <text x="12" y="46" fill="#2E7D32" fontSize="9.5">
                        • Amilase saliva memutus ~5% pati ➔ Maltosa awal [Glc]-[Glc]
                      </text>
                      {/* Diagram Disakarida Terpotong */}
                      <g transform="translate(140, 75)">
                        <circle cx="0" cy="0" r="5" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1" />
                        <line x1="5" y1="0" x2="15" y2="0" stroke="#2E7D32" strokeWidth="1.5" />
                        <circle cx="20" cy="0" r="5" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1" />
                        <text x="10" y="14" textAnchor="middle" fill="#1B5E20" fontSize="8" fontWeight="bold">Maltosa</text>
                      </g>
                    </g>
                  ) : (
                    // Mode Animasi Berjalan
                    <g id="step-1-animating">
                      {/* Salivary gland secretion sprays (Parotid, Submandibular, Sublingual) */}
                      <g id="saliva-spray">
                        <circle cx="250" cy="170" r="2.8" fill="#FFD54F" stroke="#FF8F00" strokeWidth="1" />
                        <circle cx="236" cy="168" r="2.5" fill="#FFD54F" stroke="#FF8F00" strokeWidth="1" />
                        <circle cx="222" cy="166" r="3" fill="#FFD54F" stroke="#FF8F00" strokeWidth="1" />
                        <circle cx="205" cy="190" r="2.6" fill="#FFD54F" stroke="#FF8F00" strokeWidth="1" />
                        <circle cx="198" cy="182" r="2.8" fill="#FFD54F" stroke="#FF8F00" strokeWidth="1" />
                      </g>

                      {/* Molecular scissors icon cutting alpha-1,4 bond on dorsal tongue */}
                      <g transform="translate(195, 172)">
                        <ellipse cx="-6" cy="0" rx="4" ry="2.2" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="0.8" />
                        <ellipse cx="6" cy="0" rx="4" ry="2.2" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="0.8" />
                        <path d="M 0, -8 L 0, 4 M -4, -6 L 4, 2 M -4, 2 L 4, -6" stroke="#D32F2F" strokeWidth="1.3" />
                      </g>

                      {/* Callout Annotation */}
                      <g transform="translate(75, 95)">
                        <rect x="0" y="0" width="200" height="30" rx="8" fill="#FFF8E1" stroke="#FFB300" strokeWidth="1.2" />
                        <text x="100" y="19" textAnchor="middle" fill="#BF360C" fontSize="10" fontWeight="bold">
                          Pengunyahan & Amilase Saliva (Ptialin)
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* TAHAP 2: Esofagus — Peristaltik */}
              {currentStep === 2 && (
                <g id="overlay-step-2">
                  {viewMode === 'BEFORE' ? (
                    <g id="step-2-before" transform="translate(60, 270)">
                      <rect x="0" y="0" width="230" height="50" rx="10" fill="#E3F2FD" stroke="#42A5F5" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#0D47A1" fontSize="10.5" fontWeight="bold">
                        ⏪ KONDISI SEBELUM:
                      </text>
                      <text x="12" y="32" fill="#1565C0" fontSize="9.5">
                        • Bolus siap ditelan di pangkal faring
                      </text>
                      <text x="12" y="44" fill="#1565C0" fontSize="9.5">
                        • Epiglotis terbuka, saluran napas (trakea) belum ditutup
                      </text>
                    </g>
                  ) : viewMode === 'AFTER' ? (
                    <g id="step-2-after" transform="translate(60, 270)">
                      <rect x="0" y="0" width="230" height="50" rx="10" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#1B5E20" fontSize="10.5" fontWeight="bold">
                        ⏩ KONDISI SESUDAH:
                      </text>
                      <text x="12" y="32" fill="#2E7D32" fontSize="9.5">
                        • Bolus aman melewati LES menuju kardia lambung
                      </text>
                      <text x="12" y="44" fill="#2E7D32" fontSize="9.5">
                        • Trakea aman (tidak tersedak), LES menutup kembali
                      </text>
                    </g>
                  ) : (
                    <g id="step-2-animating">
                      {/* Epiglottis Closed Shield indicator over trachea */}
                      <g transform="translate(160, 218)">
                        <rect x="0" y="0" width="68" height="22" rx="6" fill="#FFEBEE" stroke="#E57373" strokeWidth="1.2" />
                        <text x="34" y="15" textAnchor="middle" fill="#C62828" fontSize="8.5" fontWeight="bold">
                          Trakea Ditutup
                        </text>
                      </g>

                      {/* Descending Bolus inside curved Esophagus */}
                      <g transform={`translate(${esopX}, ${esopY})`}>
                        <ellipse cx="0" cy="0" rx="7" ry="8.5" fill="#FFF59D" stroke="#F57F17" strokeWidth="1.5" />
                        {/* Peristaltic squeeze ring above it */}
                        <ellipse cx="0" cy="-11" rx="7.5" ry="2.5" fill="none" stroke="#D32F2F" strokeWidth="1.8" />
                        {/* Receptive relaxation below it */}
                        <ellipse cx="0" cy="11" rx="8" ry="2" fill="none" stroke="#81C784" strokeWidth="1.2" strokeDasharray="3 2" />
                      </g>

                      {/* Lower Esophageal Sphincter (LES) Indicator */}
                      <g transform="translate(262, 380)">
                        <circle cx="0" cy="0" r="8" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="2 2" />
                      </g>

                      {/* Callout Annotation */}
                      <g transform="translate(80, 305)">
                        <rect x="0" y="0" width="165" height="30" rx="8" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.2" />
                        <text x="82" y="19" textAnchor="middle" fill="#0D47A1" fontSize="10" fontWeight="bold">
                          Gelombang Peristaltik Esofagus
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* TAHAP 3: Lambung — Bolus Menjadi Kimus */}
              {currentStep === 3 && (
                <g id="overlay-step-3">
                  {viewMode === 'BEFORE' ? (
                    <g id="step-3-before" transform="translate(50, 420)">
                      <rect x="0" y="0" width="220" height="52" rx="10" fill="#FFEBEE" stroke="#EF5350" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#C62828" fontSize="10.5" fontWeight="bold">
                        ⏪ KONDISI SEBELUM:
                      </text>
                      <text x="12" y="32" fill="#B71C1C" fontSize="9.5">
                        • Gumpalan bolus padat baru masuk
                      </text>
                      <text x="12" y="46" fill="#B71C1C" fontSize="9.5">
                        • Amilase saliva masih aktif sesaat di inti bolus (pH ~6.8)
                      </text>
                    </g>
                  ) : viewMode === 'AFTER' ? (
                    <g id="step-3-after" transform="translate(50, 420)">
                      <rect x="0" y="0" width="220" height="52" rx="10" fill="#FFEBEE" stroke="#EF5350" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#C62828" fontSize="10.5" fontWeight="bold">
                        ⏩ KONDISI SESUDAH:
                      </text>
                      <text x="12" y="32" fill="#B71C1C" fontSize="9.5">
                        • Terbentuk kimus (chyme) semi-cair homogen
                      </text>
                      <text x="12" y="46" fill="#B71C1C" fontSize="9.5">
                        • Asam HCl (pH 1.5–2.0) mendenaturasi amilase saliva total
                      </text>
                    </g>
                  ) : (
                    <g id="step-3-animating">
                      {/* Churning Bolus fragments dissolving into liquid chyme */}
                      <g transform={`translate(${295 + stomachChurn}, 445)`}>
                        {/* Disintegrating bolus particles */}
                        <circle cx="-12" cy="-8" r="4.5" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1" />
                        <circle cx="8" cy="-5" r="3.5" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1" />
                        <circle cx="-4" cy="10" r="3" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="0.8" />
                        <circle cx="10" cy="8" r="2.5" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="0.8" />
                        
                        {/* Inactivated Amylase Denatured Symbol */}
                        <circle cx="0" cy="0" r="14" fill="#FFEBEE" stroke="#E53935" strokeWidth="1.5" />
                        <text x="0" y="4" textAnchor="middle" fill="#C62828" fontSize="12" fontWeight="bold">
                          ✕
                        </text>
                      </g>

                      {/* Dynamic pH Indicator Badge */}
                      <g transform="translate(50, 450)">
                        <rect x="0" y="0" width="190" height="42" rx="8" fill="#FFEBEE" stroke="#EF5350" strokeWidth="1.2" />
                        <text x="95" y="17" textAnchor="middle" fill="#B71C1C" fontSize="10" fontWeight="bold">
                          Asam Lambung HCl (pH {stomachPH})
                        </text>
                        <text x="95" y="32" textAnchor="middle" fill="#C62828" fontSize="9">
                          Amilase Saliva: INAKTIF (Terdenaturasi)
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* TAHAP 4: Duodenum — Amilase Pankreas Masuk */}
              {currentStep === 4 && (
                <g id="overlay-step-4">
                  {viewMode === 'BEFORE' ? (
                    <g id="step-4-before" transform="translate(50, 415)">
                      <rect x="0" y="0" width="220" height="50" rx="10" fill="#FFF8E1" stroke="#FFA000" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#E65100" fontSize="10.5" fontWeight="bold">
                        ⏪ KONDISI SEBELUM:
                      </text>
                      <text x="12" y="32" fill="#BF360C" fontSize="9.5">
                        • Kimus sangat asam (pH 2.0) tertahan di sfingter pilorus
                      </text>
                      <text x="12" y="44" fill="#BF360C" fontSize="9.5">
                        • Enzim pankreas belum disekresikan
                      </text>
                    </g>
                  ) : viewMode === 'AFTER' ? (
                    <g id="step-4-after" transform="translate(50, 415)">
                      <rect x="0" y="0" width="220" height="50" rx="10" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#006064" fontSize="10.5" fontWeight="bold">
                        ⏩ KONDISI SESUDAH:
                      </text>
                      <text x="12" y="32" fill="#00838F" fontSize="9.5">
                        • Kimus dinetralkan oleh bikarbonat (pH naik ke ~7.8)
                      </text>
                      <text x="12" y="44" fill="#00838F" fontSize="9.5">
                        • Amilase pankreas aktif siap menghidrolisis sisa pati
                      </text>
                    </g>
                  ) : (
                    <g id="step-4-animating">
                      {/* Pyloric sphincter intermittent squirt */}
                      <g transform="translate(252, 420)">
                        <circle cx="0" cy="0" r={pylorusOpen ? 6 : 3} fill="#FFF9C4" stroke="#F57F17" strokeWidth="1.2" />
                      </g>

                      {/* Pancreatic Secretion Droplets (Bicarbonate + Pancreatic Amylase) along duct */}
                      <g id="pancreatic-secretion-flow">
                        <circle cx="310" cy="422" r="3" fill="#FFE082" stroke="#FF8F00" strokeWidth="1" />
                        <circle cx="290" cy="427" r="3.2" fill="#FFE082" stroke="#FF8F00" strokeWidth="1" />
                        <circle cx="270" cy="432" r="3.5" fill="#FFE082" stroke="#FF8F00" strokeWidth="1.2" />
                        <circle cx="250" cy="436" r="3.8" fill="#FFE082" stroke="#FF8F00" strokeWidth="1.2" />
                        {/* Bicarbonate neutralizer sparks at Ampulla of Vater */}
                        <circle cx="238" cy="442" r="3" fill="#80DEEA" stroke="#00838F" strokeWidth="1.2" />
                        <circle cx="242" cy="452" r="3" fill="#80DEEA" stroke="#00838F" strokeWidth="1.2" />
                      </g>

                      {/* Traveling chyme in duodenum loop */}
                      <circle cx={duodX} cy={duodY} r="5" fill="#FFF9C4" stroke="#F57F17" strokeWidth="1.5" />

                      {/* Duodenum Callout */}
                      <g transform="translate(50, 425)">
                        <rect x="0" y="0" width="180" height="42" rx="8" fill="#FFFDE7" stroke="#FDD835" strokeWidth="1.2" />
                        <text x="90" y="17" textAnchor="middle" fill="#F57F17" fontSize="10" fontWeight="bold">
                          Sekresi Duktus Pankreatikus
                        </text>
                        <text x="90" y="32" textAnchor="middle" fill="#E65100" fontSize="9">
                          Amilase Pankreas + Bikarbonat (pH 7.8)
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* TAHAP 5: Pemecahan Pati oleh Amilase Pankreas */}
              {currentStep === 5 && (
                <g id="overlay-step-5">
                  {viewMode === 'BEFORE' ? (
                    <g id="step-5-before" transform="translate(45, 415)">
                      <rect x="0" y="0" width="225" height="50" rx="10" fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#E65100" fontSize="10.5" fontWeight="bold">
                        ⏪ KONDISI SEBELUM:
                      </text>
                      <text x="12" y="32" fill="#BF360C" fontSize="9.5">
                        • Sisa rantai panjang pati & dekstrin polimer
                      </text>
                      <text x="12" y="44" fill="#BF360C" fontSize="9.5">
                        • Belum terpecah menjadi disakarida sederhana
                      </text>
                    </g>
                  ) : viewMode === 'AFTER' ? (
                    <g id="step-5-after" transform="translate(45, 415)">
                      <rect x="0" y="0" width="225" height="50" rx="10" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#1B5E20" fontSize="10.5" fontWeight="bold">
                        ⏩ KONDISI SESUDAH:
                      </text>
                      <text x="12" y="32" fill="#2E7D32" fontSize="9.5">
                        • Rantai pati terpotong jadi maltosa, maltotriosa
                      </text>
                      <text x="12" y="44" fill="#2E7D32" fontSize="9.5">
                        • Terbentuk α-limit dekstrin dari cabang amilopektin
                      </text>
                    </g>
                  ) : (
                    <g id="step-5-animating">
                      {/* Duodenal hotspot & Starch cleavage active zone */}
                      <circle cx="242" cy="450" r="22" fill="#FFE082" opacity="0.3" stroke="#FFA000" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="242" cy="450" r="7" fill="#FF8F00" />
                      {/* Cleaving sparks */}
                      <path d="M 235, 443 L 249, 457 M 249, 443 L 235, 457" stroke="#D32F2F" strokeWidth="1.8" />

                      {/* Substrate Callout */}
                      <g transform="translate(45, 425)">
                        <rect x="0" y="0" width="185" height="42" rx="8" fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.2" />
                        <text x="92" y="17" textAnchor="middle" fill="#E65100" fontSize="10" fontWeight="bold">
                          Hidrolisis Ikatan α-1,4 Internal
                        </text>
                        <text x="92" y="32" textAnchor="middle" fill="#BF360C" fontSize="9">
                          Maltosa, Maltotriosa & α-Limit Dextrin
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* TAHAP 6: Enzim Usus — Menjadi Monosakarida */}
              {currentStep === 6 && (
                <g id="overlay-step-6">
                  {viewMode === 'BEFORE' ? (
                    <g id="step-6-before" transform="translate(45, 490)">
                      <rect x="0" y="0" width="225" height="50" rx="10" fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#E65100" fontSize="10.5" fontWeight="bold">
                        ⏪ KONDISI SEBELUM:
                      </text>
                      <text x="12" y="32" fill="#BF360C" fontSize="9.5">
                        • Oligosakarida & disakarida (maltosa, isomaltosa)
                      </text>
                      <text x="12" y="44" fill="#BF360C" fontSize="9.5">
                        • Belum bisa diserap karena bukan monomer tunggal
                      </text>
                    </g>
                  ) : viewMode === 'AFTER' ? (
                    <g id="step-6-after" transform="translate(45, 490)">
                      <rect x="0" y="0" width="225" height="50" rx="10" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#1B5E20" fontSize="10.5" fontWeight="bold">
                        ⏩ KONDISI SESUDAH:
                      </text>
                      <text x="12" y="32" fill="#2E7D32" fontSize="9.5">
                        • 100% tuntas menjadi monomer glukosa bebas
                      </text>
                      <text x="12" y="44" fill="#2E7D32" fontSize="9.5">
                        • Monosakarida siap diangkut melintasi membran enterosit
                      </text>
                    </g>
                  ) : (
                    <g id="step-6-animating">
                      {/* Small intestine brush border hotspot */}
                      <g transform="translate(260, 520)">
                        <ellipse cx="0" cy="0" rx="30" ry="18" fill="#E8F5E9" opacity="0.4" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="3 2" />
                        {/* Free glucose monomer sparkles */}
                        <circle cx="-16" cy="-4" r="4" fill="#81C784" stroke="#2E7D32" strokeWidth="1" />
                        <circle cx="0" cy="5" r="4" fill="#81C784" stroke="#2E7D32" strokeWidth="1" />
                        <circle cx="16" cy="-3" r="4" fill="#81C784" stroke="#2E7D32" strokeWidth="1" />
                        <text x="-16" y="-1" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">G</text>
                        <text x="0" y="8" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">G</text>
                        <text x="16" y="0" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">G</text>
                      </g>

                      {/* Brush Border Callout */}
                      <g transform="translate(45, 500)">
                        <rect x="0" y="0" width="185" height="42" rx="8" fill="#E8F5E9" stroke="#81C784" strokeWidth="1.2" />
                        <text x="92" y="17" textAnchor="middle" fill="#1B5E20" fontSize="10" fontWeight="bold">
                          Enzim Brush Border Usus Halus
                        </text>
                        <text x="92" y="32" textAnchor="middle" fill="#2E7D32" fontSize="9">
                          Maltase & Sukrase-Isomaltase ➔ Glukosa Bebas
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* TAHAP 7: Glukosa Masuk ke Aliran Darah */}
              {currentStep === 7 && (
                <g id="overlay-step-7">
                  {viewMode === 'BEFORE' ? (
                    <g id="step-7-before" transform="translate(45, 500)">
                      <rect x="0" y="0" width="225" height="50" rx="10" fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#E65100" fontSize="10.5" fontWeight="bold">
                        ⏪ KONDISI SEBELUM:
                      </text>
                      <text x="12" y="32" fill="#BF360C" fontSize="9.5">
                        • Glukosa berada di rongga usus halus (lumen)
                      </text>
                      <text x="12" y="44" fill="#BF360C" fontSize="9.5">
                        • Belum melintasi enterosit menuju sirkulasi darah
                      </text>
                    </g>
                  ) : viewMode === 'AFTER' ? (
                    <g id="step-7-after" transform="translate(45, 500)">
                      <rect x="0" y="0" width="225" height="50" rx="10" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
                      <text x="12" y="18" fill="#1B5E20" fontSize="10.5" fontWeight="bold">
                        ⏩ KONDISI SESUDAH:
                      </text>
                      <text x="12" y="32" fill="#2E7D32" fontSize="9.5">
                        • Glukosa diangkut SGLT1/GLUT2 ke kapiler mesenterika
                      </text>
                      <text x="12" y="44" fill="#2E7D32" fontSize="9.5">
                        • Mengalir ke vena porta hepatika menuju sel tubuh & ATP
                      </text>
                    </g>
                  ) : (
                    <g id="step-7-animating">
                      {/* Intestinal wall & Mesenteric Capillary Blood Flow */}
                      <g transform="translate(270, 530)">
                        {/* Capillary Blood Vessel */}
                        <path d="M -15, -25 Q 0, 0 15, 25" fill="none" stroke="#E53935" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
                        {/* Fast erythrocytes in bloodstream */}
                        <circle cx="-10" cy="-18" r="3.5" fill="#B71C1C" />
                        <circle cx="0" cy="0" r="3.5" fill="#B71C1C" />
                        <circle cx="10" cy="18" r="3.5" fill="#B71C1C" />

                        {/* Absorbed Glucose entering bloodstream */}
                        <circle cx="-5" cy="-8" r="3.2" fill="#81C784" stroke="#2E7D32" strokeWidth="1" />
                        <circle cx="5" cy="8" r="3.2" fill="#81C784" stroke="#2E7D32" strokeWidth="1" />
                        <text x="-5" y="-6" textAnchor="middle" fill="#FFFFFF" fontSize="4" fontWeight="bold">G</text>
                        <text x="5" y="10" textAnchor="middle" fill="#FFFFFF" fontSize="4" fontWeight="bold">G</text>
                      </g>

                      {/* Bloodstream Absorption Callout */}
                      <g transform="translate(45, 510)">
                        <rect x="0" y="0" width="190" height="42" rx="8" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.2" />
                        <text x="95" y="17" textAnchor="middle" fill="#1B5E20" fontSize="10" fontWeight="bold">
                          Absorpsi ke Kapiler Darah
                        </text>
                        <text x="95" y="32" textAnchor="middle" fill="#2E7D32" fontSize="9">
                          Transpor SGLT1/GLUT2 ke Vena Porta
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

            {/* Organ Identification Text Labels (if showLabels is ON) */}
            {showLabels && (
              <g id="anatomy-labels" fontSize="9.5" fontWeight="600" fill="#4E342E" pointerEvents="none">
                {/* Oral Cavity */}
                <text x="130" y="165" textAnchor="end">Rongga Mulut</text>
                <line x1="133" y1="162" x2="160" y2="160" stroke="#795548" strokeWidth="0.8" />

                {/* Salivary Glands */}
                <text x="310" y="172" textAnchor="start">Kelenjar Saliva</text>
                <line x1="306" y1="170" x2="286" y2="175" stroke="#795548" strokeWidth="0.8" />

                {/* Pharynx & Epiglottis */}
                <text x="190" y="222" textAnchor="end">Epiglotis</text>
                <line x1="193" y1="220" x2="230" y2="222" stroke="#795548" strokeWidth="0.8" />

                {/* Esophagus */}
                <text x="300" y="325" textAnchor="start">Esofagus</text>
                <line x1="296" y1="322" x2="265" y2="325" stroke="#795548" strokeWidth="0.8" />

                {/* Liver */}
                <text x="135" y="380" textAnchor="end">Hati (Hepar)</text>
                <line x1="138" y1="378" x2="165" y2="385" stroke="#795548" strokeWidth="0.8" />

                {/* Stomach */}
                <text x="375" y="420" textAnchor="start">Lambung (Gaster)</text>
                <line x1="371" y1="418" x2="340" y2="425" stroke="#795548" strokeWidth="0.8" />

                {/* Pancreas */}
                <text x="365" y="445" textAnchor="start">Pankreas</text>
                <line x1="361" y1="442" x2="318" y2="430" stroke="#795548" strokeWidth="0.8" />

                {/* Duodenum */}
                <text x="180" y="465" textAnchor="end">Duodenum</text>
                <line x1="183" y1="462" x2="230" y2="455" stroke="#795548" strokeWidth="0.8" />

                {/* Small Intestine */}
                <text x="170" y="560" textAnchor="end">Usus Halus</text>
                <line x1="173" y1="557" x2="225" y2="550" stroke="#795548" strokeWidth="0.8" />
              </g>
            )}
            {/* End of 12. molecularOverlayLayer */}
            </g>
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PANEL UTAMA: PERUBAHAN YANG TERJADI (SEBELUM | PROSES | SESUDAH)          */}
      {/* Wajib ditampilkan untuk setiap tahap (Tahap 1 - 7)                        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border-2 border-amber-300 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <div>
              <span className="text-[10.5px] font-bold text-amber-800 uppercase tracking-wider block">
                Perubahan yang Terjadi — Tahap {activeStage.step} dari 7
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#3E3E3E]">
                {activeStage.title}
              </h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            {activeStage.organ}
          </span>
        </div>

        {/* 3-KOLOM: SEBELUM | PROSES | SESUDAH */}
        {activeStage.substrateChange && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Kolom 1: SEBELUM (Kondisi Awal Substrat) */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50/90 to-amber-50/40 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                  1. Kondisi Awal (Sebelum)
                </span>
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {activeStage.substrateChange.before}
              </p>
            </div>

            {/* Kolom 2: PROSES (Gerakan, Reaksi Kimia & Enzim) */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-cyan-50/90 to-cyan-50/40 border border-cyan-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
                  <span className="text-[11px] font-bold text-cyan-900 uppercase tracking-wider">
                    2. Gerakan / Proses / Enzim
                  </span>
                </div>
                {activeStage.substrateChange.enzyme && (
                  <span className="text-[10px] font-bold bg-cyan-200/80 text-cyan-950 px-2 py-0.5 rounded-full">
                    {activeStage.substrateChange.enzyme}
                  </span>
                )}
              </div>
              <p className="text-xs text-cyan-950 font-medium leading-relaxed">
                {activeStage.substrateChange.process}
              </p>
              {activeStage.substrateChange.equation && (
                <div className="p-2 rounded-xl bg-white/90 border border-cyan-300/80 text-center font-mono font-bold text-[11px] text-cyan-950">
                  {activeStage.substrateChange.equation}
                </div>
              )}
              {activeStage.bondCleaved && (
                <div className="text-[10.5px] text-cyan-900">
                  <span className="font-bold">Pemutusan:</span> {activeStage.bondCleaved}
                </div>
              )}
            </div>

            {/* Kolom 3: SESUDAH (Kondisi Akhir & Produk yang Dihasilkan) */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-50/90 to-emerald-50/40 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                  3. Kondisi Akhir (Sesudah)
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                {activeStage.substrateChange.after}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* STRUCTURED EXPLANATION PANEL (Data Lengkap Saluran Cerna)                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E2D9] pb-3">
          <h4 className="font-serif font-bold text-sm text-[#3E3E3E]">
            Data Fisiologis & Biokimiawi
          </h4>
          <span className="text-[11px] text-[#706B5C]">
            Lokasi: <strong>{activeStage.locationDetail}</strong>
          </span>
        </div>

        {/* 6 Structured Data Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {/* 1. Lokasi */}
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-[#A5A58D] text-[10px] uppercase tracking-wider block">
              📍 Lokasi Saluran Cerna
            </span>
            <p className="font-semibold text-[#3E3E3E] text-xs">
              {activeStage.locationDetail}
            </p>
          </div>

          {/* 2. Substrat */}
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-1">
            <span className="font-bold text-amber-900 text-[10px] uppercase tracking-wider block">
              🌾 Substrat Makanan
            </span>
            <p className="font-semibold text-amber-950 text-xs">
              {activeStage.substrates.join(', ')}
            </p>
          </div>

          {/* 3. Enzim */}
          <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-200/60 space-y-1">
            <span className="font-bold text-cyan-900 text-[10px] uppercase tracking-wider block">
              🧪 Enzim / Cairan
            </span>
            <p className="font-semibold text-cyan-950 text-xs">
              {activeStage.enzymes.join(', ')}
            </p>
          </div>

          {/* 4. Ikatan yang Diputus */}
          <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
            <span className="font-bold text-rose-900 text-[10px] uppercase tracking-wider block">
              ✂️ Ikatan yang Diputus
            </span>
            <p className="font-semibold text-rose-950 text-xs">
              {activeStage.bondCleaved || 'Tidak ada pemutusan ikatan glikosidik'}
            </p>
          </div>

          {/* 5. Produk */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
            <span className="font-bold text-emerald-900 text-[10px] uppercase tracking-wider block">
              📦 Produk Tahap Ini
            </span>
            <p className="font-semibold text-emerald-950 text-xs">
              {activeStage.products.join(', ')}
            </p>
          </div>

          {/* 6. Apa yang Terjadi */}
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1">
            <span className="font-bold text-[#A5A58D] text-[10px] uppercase tracking-wider block">
              👁️ Perjalanan Makanan
            </span>
            <p className="text-[#706B5C] text-[11px] leading-snug">
              {activeStage.whatIsHappening}
            </p>
          </div>
        </div>

        {/* Pesan Penting Card */}
        {activeStage.importantMessage && (
          <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300/80 text-xs text-amber-950 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block text-[11px]">Pesan Penting:</span>
              <p className="leading-relaxed text-[11px]">{activeStage.importantMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* STAGE 7: CONCEPT BRIDGE & NEXT ACTION (Jembatan ke Glukosa & Katabolisme)  */}
      {/* ========================================================================= */}
      {currentStep === 7 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-400 p-6 space-y-5 shadow-md">
          <div className="flex items-center gap-3 text-emerald-800">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center font-bold text-base">
              🩸
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                Pencernaan Sempurna & Siap Diproses Sel
              </span>
              <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                Glukosa Telah Masuk ke Aliran Darah!
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#706B5C] leading-relaxed">
            Setelah diserap melalui transporter membran enterosit (SGLT1 dan GLUT2), glukosa dialirkan melalui vena porta menuju hati dan sirkulasi sistemik tubuh. Kadar glukosa darah kini meningkat, memicu pankreas untuk mensekresikan hormon insulin dan memulai jalur pemanfaatan energi.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
            <span className="text-xs font-bold text-emerald-950 block">
              Nasib Glukosa Bebas di Tubuh:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
                <span className="font-bold text-emerald-900 block text-[11px]">1. Oksidasi Energi</span>
                <span className="text-[10.5px] text-emerald-700">Glikolisis, Siklus Krebs, Fosforilasi Oksidatif (ATP)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
                <span className="font-bold text-emerald-900 block text-[11px]">2. Penyimpanan</span>
                <span className="text-[10.5px] text-emerald-700">Glikogenesis (Glikogen Hati & Otot)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
                <span className="font-bold text-emerald-900 block text-[11px]">3. Sintesis Lemak</span>
                <span className="text-[10.5px] text-emerald-700">Lipogenesis jika asupan kalori berlebih</span>
              </div>
            </div>
          </div>

          {/* Action Button to Start Oxidative Glucose Catabolism */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onOpenOxidative}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Mulai Pemecahan Oksidatif Glukosa Menjadi ATP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
