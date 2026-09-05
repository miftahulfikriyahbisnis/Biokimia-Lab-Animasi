/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { 
  createNewProfile, 
  deleteProfileById, 
  getAllProfiles,
  setActiveProfileId 
} from '../utils/storage';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  Trash2, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface StudentAuthViewProps {
  onAuthSuccess?: (profile: StudentProfile) => void;
  onSelectProfile?: (profile: StudentProfile) => void;
  profiles?: StudentProfile[];
  onRefreshProfiles?: () => void;
}

export const StudentAuthView: React.FC<StudentAuthViewProps> = ({
  profiles: initialProfiles,
  onAuthSuccess,
  onSelectProfile,
  onRefreshProfiles
}) => {
  const [profileList, setProfileList] = useState<StudentProfile[]>(() => {
    if (initialProfiles && Array.isArray(initialProfiles)) return initialProfiles;
    return getAllProfiles();
  });

  const [isCreating, setIsCreating] = useState<boolean>(() => (profileList?.length ?? 0) === 0);
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [profileToDelete, setProfileToDelete] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (initialProfiles && Array.isArray(initialProfiles)) {
      setProfileList(initialProfiles);
      if (initialProfiles.length === 0) setIsCreating(true);
    } else {
      const all = getAllProfiles();
      setProfileList(all);
      if (all.length === 0) setIsCreating(true);
    }
  }, [initialProfiles]);

  const refreshList = () => {
    const updated = getAllProfiles();
    setProfileList(updated);
    if (onRefreshProfiles) onRefreshProfiles();
    return updated;
  };

  const handleSelect = (p: StudentProfile) => {
    setActiveProfileId(p.id);
    if (onAuthSuccess) {
      onAuthSuccess(p);
    } else if (onSelectProfile) {
      onSelectProfile(p);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nim.trim() || !studentClass.trim()) {
      setErrorMsg('Mohon lengkapi Nama Mahasiswa, NIM, dan Kelas.');
      return;
    }

    const newProf = createNewProfile(name, nim, studentClass);
    refreshList();
    handleSelect(newProf);
  };

  const handleConfirmDelete = () => {
    if (profileToDelete) {
      deleteProfileById(profileToDelete.id);
      setProfileToDelete(null);
      const remaining = refreshList();
      if ((remaining?.length ?? 0) <= 0) {
        setIsCreating(true);
      }
    }
  };

  const currentProfiles = profileList || [];

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col justify-center items-center px-4 py-10 selection:bg-[#CB997E]/30">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#E5E2D9] shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Header Identitas Aplikasi */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F2EA] text-[#6B705C] text-xs font-semibold border border-[#E5E2D9]">
            <GraduationCap className="w-4 h-4 text-[#CB997E]" />
            Pendidikan Kimia • Biokimia Interaktif
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E] tracking-tight">
            Selamat Datang di BIOCHEMIA
          </h1>
          <p className="text-sm sm:text-base text-[#706B5C] max-w-lg mx-auto">
            Belajar Molekul Kehidupan melalui Materi, Animasi, dan Analisis
          </p>
        </div>

        {/* Tab / Switcher antara Profil Tersimpan dan Buat Baru */}
        {currentProfiles.length > 0 && (
          <div className="flex bg-[#F5F2EA] p-1 rounded-2xl border border-[#E5E2D9]">
            <button
              onClick={() => { setIsCreating(false); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                !isCreating 
                  ? 'bg-white text-[#3E3E3E] shadow-xs' 
                  : 'text-[#706B5C] hover:text-[#3E3E3E]'
              }`}
            >
              Pilih Profil Tersedia ({currentProfiles.length})
            </button>
            <button
              onClick={() => { setIsCreating(true); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isCreating 
                  ? 'bg-white text-[#3E3E3E] shadow-xs' 
                  : 'text-[#706B5C] hover:text-[#3E3E3E]'
              }`}
            >
              + Buat Profil Baru
            </button>
          </div>
        )}

        {/* Form Pembuatan Profil Baru */}
        {isCreating ? (
          <form onSubmit={handleCreate} className="space-y-4">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-[#FFE8D6] text-[#A53F2B] rounded-2xl text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-[#3E3E3E]">Nama Lengkap Mahasiswa</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Siti Rahmawati"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FDFCF9] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#6B705C] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3E3E3E]">NIM</label>
                <input
                  type="text"
                  value={nim}
                  onChange={e => setNim(e.target.value)}
                  placeholder="Contoh: 2103015001"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFCF9] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#6B705C] transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3E3E3E]">Kelas / Rombel</label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={e => setStudentClass(e.target.value)}
                  placeholder="Contoh: Pendidikan Kimia A"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFCF9] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#6B705C] transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white font-semibold text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>Masuk dan Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Daftar Profil yang Pernah Digunakan */
          <div className="space-y-3">
            <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
              {currentProfiles.map(p => (
                <div
                  key={p.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-[#E5E2D9] hover:border-[#6B705C] bg-[#FDFCF9] hover:bg-white transition-all gap-3 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#3E3E3E] truncate">{p.name}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F5F2EA] text-[#706B5C] font-mono">
                        {p.nim}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#706B5C] mt-1">
                      <span>Kelas: {p.studentClass}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#A5A58D]" />
                        {p.lastActive || 'Baru'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs mt-2">
                      <span className="text-[#6B705C] font-medium">
                        Progres Modul Hormon: {p.insulinAnimationCompleted ? '100%' : p.hormoneGeneralCompleted ? '50%' : '15%'}
                      </span>
                      {(p.highestScore || 0) > 0 && (
                        <span className="flex items-center gap-1 text-[#CB997E] font-semibold">
                          <Award className="w-3 h-3" />
                          Skor Post-Test: {p.highestScore}/100
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleSelect(p)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Lanjutkan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setProfileToDelete(p)}
                      className="p-1.5 rounded-xl text-[#A5A58D] hover:text-[#A53F2B] hover:bg-[#FFE8D6] transition-colors cursor-pointer"
                      title="Hapus profil ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => { setIsCreating(true); setErrorMsg(''); }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B705C] hover:text-[#585D4B] py-1 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Gunakan profil lain atau buat baru</span>
              </button>
            </div>
          </div>
        )}

        {/* Catatan Privasi & Penyimpanan Lokal */}
        <div className="pt-4 border-t border-[#E5E2D9] flex items-start gap-2.5 text-left text-xs text-[#706B5C]">
          <ShieldCheck className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] sm:text-xs">
            <strong>Penyimpanan Lokal:</strong> Profil, progres belajar, dan riwayat nilai tersimpan secara lokal pada peramban (browser) dan perangkat ini. Sistem ini tidak memerlukan kata sandi maupun koneksi akun luar.
          </p>
        </div>

      </div>

      {/* Modal Konfirmasi Hapus Profil */}
      {profileToDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#E5E2D9] shadow-lg space-y-4 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE8D6] text-[#A53F2B] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#3E3E3E]">Hapus Profil Mahasiswa?</h3>
            <p className="text-xs text-[#706B5C]">
              Apakah Anda yakin ingin menghapus profil <strong>{profileToDelete.name}</strong> ({profileToDelete.nim})? Seluruh riwayat progres dan post-test akan terhapus dari peramban ini.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setProfileToDelete(null)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#F5F2EA] text-[#706B5C] hover:bg-[#E5E2D9] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#A53F2B] text-white hover:bg-[#8A3322] transition-colors cursor-pointer shadow-xs"
              >
                Hapus Profil
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
