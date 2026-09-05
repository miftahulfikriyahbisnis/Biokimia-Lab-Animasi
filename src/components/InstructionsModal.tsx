/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  RotateCcw, 
  MousePointer, 
  HelpCircle,
  X,
  CheckCircle2
} from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onStart
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="modal-instructions"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E5E2D9] shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          id="btn-close-instructions"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#A5A58D] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] transition-colors"
          aria-label="Tutup Petunjuk"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#6B705C] text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold text-[#3E3E3E]">
              Petunjuk Singkat Penggunaan
            </h2>
            <p className="text-xs text-[#706B5C]">
              Navigasi dan interaksi animasi pembelajaran
            </p>
          </div>
        </div>

        {/* Instructions List as specified by user */}
        <div className="space-y-3.5 text-sm text-[#3E3E3E]">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9]">
            <div className="p-2 rounded-xl bg-[#6B705C]/10 text-[#6B705C] shrink-0 mt-0.5">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <strong className="block text-[#3E3E3E] font-medium">Tekan Putar</strong>
              <span className="text-xs text-[#706B5C]">Untuk menjalankan animasi tahapan kimia secara otomatis.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9]">
            <div className="p-2 rounded-xl bg-[#CB997E]/10 text-[#CB997E] shrink-0 mt-0.5">
              <Pause className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-[#3E3E3E] font-medium">Tekan Jeda</strong>
              <span className="text-xs text-[#706B5C]">Jika ingin membaca persamaan kimia dan keterangan reaksi lebih cermat.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9]">
            <div className="p-2 rounded-xl bg-[#6B705C]/10 text-[#6B705C] shrink-0 mt-0.5">
              <ChevronRight className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-[#3E3E3E] font-medium">Gunakan Sebelumnya dan Selanjutnya</strong>
              <span className="text-xs text-[#706B5C]">Untuk berpindah antar tahap animasi 1 sampai 9 secara berurutan.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9]">
            <div className="p-2 rounded-xl bg-[#CB997E]/10 text-[#CB997E] shrink-0 mt-0.5">
              <MousePointer className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-[#3E3E3E] font-medium">Klik Molekul atau Istilah</strong>
              <span className="text-xs text-[#706B5C]">Untuk membaca penjelasan gugus kimia, residu sistein, atau struktur terkait.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FDFCF9] border border-[#E5E2D9]">
            <div className="p-2 rounded-xl bg-[#6B705C]/10 text-[#6B705C] shrink-0 mt-0.5">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-[#3E3E3E] font-medium">Gunakan Ulangi</strong>
              <span className="text-xs text-[#706B5C]">Untuk melihat kembali reaksi kimia dan animasi tahap yang sedang dibuka.</span>
            </div>
          </div>
        </div>

        {/* Action Button: Mulai */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            id="btn-instructions-start"
            onClick={() => {
              onClose();
              onStart();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#6B705C] text-white font-medium text-sm hover:bg-[#585D4B] shadow-md transition-all active:scale-95"
          >
            <span>Mulai</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
