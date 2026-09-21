/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ReferenceAssetViewerProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: React.ReactNode;
  aspectRatio?: string;
  minHeight?: string;
}

/**
 * Komponen viewer untuk memuat aset gambar referensi yang diunggah pengguna.
 * Sesuai aturan wajib:
 * - Gunakan file gambar yang diunggah sebagai aset visual.
 * - Tambahkan komentar: // USER-PROVIDED REFERENCE ASSET — DO NOT REPLACE
 * - Jika file tidak dapat dibaca, jangan membuat gambar pengganti.
 * - Tampilkan placeholder persis: “Gambar referensi belum berhasil dimuat.”
 */
export const ReferenceAssetViewer: React.FC<ReferenceAssetViewerProps> = ({
  src,
  alt,
  className = '',
  overlay,
  aspectRatio = '16/9',
  minHeight = '240px'
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  return (
    <div 
      className={`relative w-full rounded-2xl overflow-hidden border border-stone-200 bg-[#FAF8F5] ${className}`}
      style={{ minHeight }}
    >
      {/* USER-PROVIDED REFERENCE ASSET — DO NOT REPLACE */}
      {!hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (currentSrc.endsWith('.png')) {
              setCurrentSrc(currentSrc.replace(/\.png$/, '.svg'));
            } else {
              setHasError(true);
            }
          }}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute'
          }`}
          style={{ aspectRatio }}
        />
      ) : null}

      {/* Fallback jika file belum diunggah atau tidak dapat dibaca */}
      {hasError && (
        <div 
          className="w-full flex flex-col items-center justify-center p-6 text-center bg-stone-100/90 border border-dashed border-stone-300 rounded-xl"
          style={{ minHeight }}
        >
          <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-2.5 text-stone-500">
            <ImageOff className="w-6 h-6" />
          </div>
          <p className="font-bold text-stone-800 text-xs sm:text-sm">
            Gambar referensi belum berhasil dimuat.
          </p>
          <p className="text-[11px] text-stone-500 font-mono mt-1">
            Lokasi file: {src}
          </p>
          <p className="text-[10px] text-stone-400 mt-2 max-w-sm leading-relaxed">
            Pastikan file aset referensi asli telah diunggah dengan nama di atas. Sistem tidak menggambar ilustrasi buatan pengganti.
          </p>
        </div>
      )}

      {/* Overlay interaktif (hotspot, indikator, animasi aliran) di atas gambar referensi */}
      {overlay && (
        <div className="absolute inset-0 pointer-events-auto">
          {overlay}
        </div>
      )}
    </div>
  );
};
