/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudentProfile } from '../types';
import { exportPostTestToPDF } from '../utils/pdfExport';
import { 
  X, 
  Award, 
  Clock, 
  CheckCircle2, 
  Download, 
  Calendar, 
  BookOpen, 
  BarChart2,
  FileText
} from 'lucide-react';

interface StudentProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
}

export const StudentProgressModal: React.FC<StudentProgressModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E5E2D9] shadow-xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150 text-left">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] text-[#6B705C] flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                Progres Belajar & Riwayat Evaluasi
              </h3>
              <p className="text-xs text-[#706B5C]">
                {profile.name} • NIM: {profile.nim} • {profile.studentClass}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#706B5C] hover:text-[#3E3E3E] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ringkasan Modul Hormon */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#706B5C] uppercase tracking-wider block">
            Status Modul Hormon
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-1">
              <span className="text-[11px] text-[#706B5C]">Tahap 1: Materi Umum</span>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                {profile.hormoneGeneralCompleted ? (
                  <span className="text-[#6B705C] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                  </span>
                ) : (
                  <span className="text-[#A5A58D]">Belum Selesai</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-1">
              <span className="text-[11px] text-[#706B5C]">Tahap 2: Animasi Insulin</span>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                {profile.insulinAnimationCompleted ? (
                  <span className="text-[#6B705C] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                  </span>
                ) : (
                  <span className="text-[#A5A58D]">Belum Selesai</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-1">
              <span className="text-[11px] text-[#706B5C]">Skor Tertinggi Post-Test</span>
              <div className="text-sm font-bold text-[#CB997E] flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{profile.highestScore} / 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Maksimal 5 Post-Test Terakhir */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-[#706B5C] uppercase tracking-wider block">
            Riwayat 5 Percobaan Post-Test Terakhir
          </span>

          {profile.postTestHistory && profile.postTestHistory.length > 0 ? (
            <div className="space-y-2.5">
              {profile.postTestHistory.map((rec, i) => (
                <div
                  key={rec.id || i}
                  className="p-4 rounded-2xl border border-[#E5E2D9] bg-[#FDFCF9] hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#3E3E3E]">
                        Skor: {rec.score}/100
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8EDE0] text-[#585D4B]">
                        {rec.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#706B5C]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#A5A58D]" />
                        {rec.date}
                      </span>
                      <span>•</span>
                      <span>Benar: {rec.correctCount} / {rec.totalQuestions}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => exportPostTestToPDF(profile, rec)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs self-end sm:self-center"
                    title="Unduh Laporan PDF Percobaan Ini"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#A5A58D] bg-[#FAF8F2] rounded-2xl border border-[#E5E2D9]">
              Belum ada riwayat pengerjaan post-test. Selesaikan Tahap 1 & 2 untuk memulai post-test!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#E5E2D9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#706B5C] text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
