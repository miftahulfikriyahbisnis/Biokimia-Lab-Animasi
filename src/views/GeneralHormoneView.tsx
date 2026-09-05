/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  Info, 
  Layers, 
  Activity,
  GitCommit,
  Flame,
  Droplets,
  Heart,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface GeneralHormoneViewProps {
  onCompleteTahap1?: () => void;
  onCompleteStage?: () => void;
  onProceedToInsulinAnimation?: () => void;
  onBackToMap: () => void;
}

export const GeneralHormoneView: React.FC<GeneralHormoneViewProps> = ({
  onCompleteTahap1,
  onCompleteStage,
  onProceedToInsulinAnimation,
  onBackToMap
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const handleProceedToInsulin = () => {
    if (onProceedToInsulinAnimation) {
      onProceedToInsulinAnimation();
    } else if (onCompleteTahap1) {
      onCompleteTahap1();
    } else if (onCompleteStage) {
      onCompleteStage();
    }
  };
  
  // State Interaktif Bagian 1: Kuis Mengapa tidak semua sel merespons
  const [b1Answer, setB1Answer] = useState<string | null>(null);

  // State Interaktif Bagian 2: Klasifikasi Kimia
  const [b2Matches, setB2Matches] = useState<{ [hormone: string]: string }>({});
  const [b2Checked, setB2Checked] = useState<boolean>(false);

  // State Interaktif Bagian 3: Organ Endokrin Terpilih
  const [selectedOrgan, setSelectedOrgan] = useState<string>('pankreas');

  // State Interaktif Bagian 4: Tab Mekanisme Hidrofilik vs Lipofilik
  const [mechTab, setMechTab] = useState<'hidrofilik' | 'lipofilik'>('hidrofilik');

  // State Interaktif Bagian 7: Tab Sumbu
  const [axisTab, setAxisTab] = useState<'tiroid' | 'adrenal' | 'gonad'>('tiroid');

  // Navigasi Section
  const handleNextSection = () => {
    if (activeSection < 8) {
      setActiveSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 1) {
      setActiveSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sectionsList = [
    { num: 1, title: 'Apa Itu Hormon?' },
    { num: 2, title: 'Sifat Kimiawi Hormon' },
    { num: 3, title: 'Sumber Kelenjar Endokrin' },
    { num: 4, title: 'Mekanisme Kerja Seluler' },
    { num: 5, title: 'Feedback Negatif' },
    { num: 6, title: 'Feedback Positif' },
    { num: 7, title: 'Sumbu Hipotalamus–Hipofisis' },
    { num: 8, title: 'Transisi ke Insulin' }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Stepper Bar 7 Bagian + Transisi */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E5E2D9] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMap}
              className="text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Peta</span>
            </button>
            <span className="text-xs text-[#E5E2D9]">|</span>
            <span className="text-xs font-bold text-[#6B705C] uppercase tracking-wider">
              Tahap 1: Materi Umum Hormon
            </span>
          </div>
          <span className="text-xs font-medium text-[#706B5C]">
            Bagian {activeSection} dari 8
          </span>
        </div>

        {/* Horizontal Mini Tabs */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
          {sectionsList.map(s => (
            <button
              key={s.num}
              onClick={() => setActiveSection(s.num)}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all truncate text-center cursor-pointer ${
                activeSection === s.num
                  ? 'bg-[#6B705C] text-white shadow-xs'
                  : activeSection > s.num
                  ? 'bg-[#E8EDE0] text-[#585D4B]'
                  : 'bg-[#F5F2EA] text-[#706B5C] hover:text-[#3E3E3E]'
              }`}
              title={s.title}
            >
              {s.num}. {s.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Konten 7 Bagian + 1 Transisi */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E2D9] shadow-xs space-y-8 min-h-[480px]">
        
        {/* ========================================================= */}
        {/* BAGIAN 1: APA ITU HORMON? */}
        {/* ========================================================= */}
        {activeSection === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                Bagian 1 dari 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Apa Itu Hormon?
              </h2>
            </div>

            {/* Definisi Utama Berbingkai Rapi */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] text-[#3E3E3E] text-base sm:text-lg font-serif leading-relaxed italic">
              “Hormon adalah molekul sinyal kimia yang dihasilkan oleh sel atau kelenjar endokrin. Hormon diedarkan menuju sel target dan bekerja hanya pada sel yang memiliki reseptor yang sesuai.”
            </div>

            {/* Alur Konsep Kunci */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#706B5C] uppercase tracking-wider">
                Konsep Kunci Perjalanan Hormon:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] font-medium flex flex-col items-center justify-center">
                  <span className="font-bold text-[#6B705C]">1. Sumber</span>
                  <span>Kelenjar Endokrin</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] font-medium flex flex-col items-center justify-center">
                  <span className="font-bold text-[#6B705C]">2. Pelepasan</span>
                  <span>Sekresi ke Vaskular</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] font-medium flex flex-col items-center justify-center">
                  <span className="font-bold text-[#6B705C]">3. Sirkulasi</span>
                  <span>Diedarkan Darah</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] font-medium flex flex-col items-center justify-center">
                  <span className="font-bold text-[#6B705C]">4. Pengikatan</span>
                  <span>Reseptor Spesifik</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#E8EDE0] border border-[#C3CDB4] font-medium flex flex-col items-center justify-center">
                  <span className="font-bold text-[#585D4B]">5. Respons</span>
                  <span>Perubahan Fungsi Sel</span>
                </div>
              </div>
            </div>

            {/* Tiga Fungsi Utama Hormon */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-[#706B5C] uppercase tracking-wider">
                Tiga Fungsi Fisiologis Utama Hormon:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-[#E5E2D9] bg-white space-y-1 text-left">
                  <span className="text-xs font-bold text-[#6B705C] block">1. Metabolisme & Pertumbuhan</span>
                  <p className="text-xs text-[#706B5C] leading-relaxed">
                    Mengatur laju reaksi biokimia, penggunaan substrat glukosa/lipid, dan proliferasi jaringan tubuh.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-[#E5E2D9] bg-white space-y-1 text-left">
                  <span className="text-xs font-bold text-[#6B705C] block">2. Reproduksi & Perkembangan</span>
                  <p className="text-xs text-[#706B5C] leading-relaxed">
                    Mengkoordinasikan siklus reproduktif, maturasi organ seksual, dan diferensiasi sel.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-[#E5E2D9] bg-white space-y-1 text-left">
                  <span className="text-xs font-bold text-[#6B705C] block">3. Homeostasis Tubuh</span>
                  <p className="text-xs text-[#706B5C] leading-relaxed">
                    Menjaga kestabilan lingkungan internal (kadar ion, volume cairan tubuh, pH, dan glukosa darah).
                  </p>
                </div>
              </div>
            </div>

            {/* Pertanyaan Interaktif */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] space-y-4 text-left">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#CB997E]" />
                <h4 className="font-bold text-sm text-[#3E3E3E]">
                  Pertanyaan Reflektif Interaktif:
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#3E3E3E]">
                “Mengapa tidak semua sel memberikan respons terhadap hormon yang sama?”
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'A', text: 'A. Karena hormon hanya melewati organ tertentu' },
                  { id: 'B', text: 'B. Karena hanya sel dengan reseptor yang sesuai dapat merespons' },
                  { id: 'C', text: 'C. Karena semua hormon hanya bekerja di pankreas' },
                  { id: 'D', text: 'D. Karena hormon selalu masuk ke inti sel' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setB1Answer(opt.id)}
                    className={`p-3 rounded-xl text-xs text-left transition-all border cursor-pointer ${
                      b1Answer === opt.id
                        ? opt.id === 'B'
                          ? 'bg-[#E8EDE0] border-[#6B705C] text-[#585D4B] font-bold'
                          : 'bg-[#FFE8D6] border-[#A53F2B] text-[#A53F2B] font-semibold'
                        : 'bg-white border-[#E5E2D9] text-[#706B5C] hover:border-[#6B705C]'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {b1Answer && (
                <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                  b1Answer === 'B' 
                    ? 'bg-[#E8EDE0] text-[#585D4B] border border-[#C3CDB4]' 
                    : 'bg-[#FFE8D6] text-[#A53F2B] border border-[#E5E2D9]'
                }`}>
                  {b1Answer === 'B' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0" />
                      <span><strong>Umpan Balik:</strong> Benar. Sel hanya dapat merespons hormon apabila mempunyai reseptor yang sesuai.</span>
                    </div>
                  ) : (
                    <span><strong>Kurang Tepat:</strong> Pikirkan kembali peran reseptor spesifik pada permukaan membran atau di dalam sel target. Coba pilih opsi B!</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BAGIAN 2: JENIS HORMON BERDASARKAN SIFAT KIMIA */}
        {/* ========================================================= */}
        {activeSection === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                Bagian 2 dari 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Jenis Hormon Berdasarkan Sifat Kimia
              </h2>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Sifat kimiawi menentukan kelarutan hormon, lokalisasi reseptor, dan jalur mekanismenya.
              </p>
            </div>

            {/* Tiga Kelompok Utama */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-2xl border border-[#E5E2D9] bg-[#FAF8F2] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
                  1. Hormon Peptida / Protein
                </span>
                <p className="text-xs text-[#706B5C]"><strong>Struktur:</strong> Tersusun atas rantai asam amino.</p>
                <p className="text-xs text-[#706B5C]"><strong>Sifat:</strong> Umumnya hidrofilik dan tidak dapat melewati lapisan lipid membran secara bebas.</p>
                <p className="text-xs text-[#706B5C]"><strong>Reseptor:</strong> Berada pada membran sel.</p>
                <p className="text-xs text-[#6B705C] font-medium"><strong>Contoh:</strong> Insulin, glukagon, oksitosin, dan growth hormone.</p>
              </div>

              <div className="p-5 rounded-2xl border border-[#E5E2D9] bg-[#FAF8F2] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                  2. Hormon Steroid
                </span>
                <p className="text-xs text-[#706B5C]"><strong>Struktur:</strong> Merupakan turunan kolesterol.</p>
                <p className="text-xs text-[#706B5C]"><strong>Sifat:</strong> Lipofilik dan dapat melewati membran sel.</p>
                <p className="text-xs text-[#706B5C]"><strong>Reseptor:</strong> Berada di sitoplasma atau inti sel.</p>
                <p className="text-xs text-[#CB997E] font-medium"><strong>Contoh:</strong> Kortisol, testosteron, estrogen, dan progesteron.</p>
              </div>

              <div className="p-5 rounded-2xl border border-[#E5E2D9] bg-[#FAF8F2] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5A58D]">
                  3. Hormon Turunan Asam Amino
                </span>
                <p className="text-xs text-[#706B5C]"><strong>Struktur:</strong> Dibentuk dari satu atau beberapa asam amino tertentu.</p>
                <p className="text-xs text-[#706B5C]"><strong>Sifat Ganda:</strong> Kelompok ini memiliki sifat yang berbeda.</p>
                <p className="text-xs text-[#706B5C]"><strong>Contoh Hidrofilik:</strong> Adrenalin dan noradrenalin (turunan tirosin, reseptor membran).</p>
                <p className="text-xs text-[#706B5C]"><strong>Contoh Lipofilik:</strong> T3 dan T4 (turunan tirosin beriodium, reseptor intraseluler).</p>
              </div>
            </div>

            {/* Tabel Perbandingan Sifat */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2D9] rounded-2xl overflow-hidden">
                <thead className="bg-[#F5F2EA] text-[#3E3E3E] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2D9]">Kelompok Hormon</th>
                    <th className="p-3 border border-[#E5E2D9]">Penyusun Awal</th>
                    <th className="p-3 border border-[#E5E2D9]">Kelarutan</th>
                    <th className="p-3 border border-[#E5E2D9]">Lokasi Reseptor</th>
                    <th className="p-3 border border-[#E5E2D9]">Contoh Representatif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2D9] text-[#706B5C]">
                  <tr>
                    <td className="p-3 font-semibold text-[#3E3E3E]">Peptida / Protein</td>
                    <td className="p-3">Asam amino</td>
                    <td className="p-3">Hidrofilik (larut air)</td>
                    <td className="p-3">Permukaan membran sel</td>
                    <td className="p-3 font-medium text-[#6B705C]">Insulin, Glukagon</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#3E3E3E]">Steroid</td>
                    <td className="p-3">Kolesterol</td>
                    <td className="p-3">Lipofilik (larut lipid)</td>
                    <td className="p-3">Intraseluler (sitoplasma/inti)</td>
                    <td className="p-3 font-medium text-[#CB997E]">Kortisol, Testosteron</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#3E3E3E]">Turunan Asam Amino</td>
                    <td className="p-3">Asam amino tertentu (mis. Tirosin)</td>
                    <td className="p-3">Dapat hidrofilik atau lipofilik</td>
                    <td className="p-3">Bergantung pada sifat hormonnya</td>
                    <td className="p-3 font-medium">Adrenalin (hidrofilik), T3/T4 (lipofilik)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Interaktif Klasifikasi (Pencocokan Cepat) */}
            <div className="p-5 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3E3E3E]">
                  Latihan Interaktif: Pasangkan Hormon dengan Klasifikasinya
                </span>
                {b2Checked && (
                  <button
                    onClick={() => { setB2Matches({}); setB2Checked(false); }}
                    className="text-xs text-[#6B705C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'Insulin', target: 'peptida/protein' },
                  { name: 'Kortisol', target: 'steroid' },
                  { name: 'Adrenalin', target: 'turunan asam amino hidrofilik' },
                  { name: 'Tiroksin (T4)', target: 'turunan asam amino lipofilik' }
                ].map(item => (
                  <div key={item.name} className="p-3 bg-white rounded-xl border border-[#E5E2D9] space-y-2">
                    <span className="font-bold text-xs text-[#3E3E3E] block">{item.name}</span>
                    <select
                      value={b2Matches[item.name] || ''}
                      onChange={e => setB2Matches({ ...b2Matches, [item.name]: e.target.value })}
                      className="w-full text-xs p-1.5 rounded-lg border border-[#E5E2D9] bg-[#FDFCF9] focus:outline-none"
                    >
                      <option value="">Pilih Klasifikasi...</option>
                      <option value="peptida/protein">Peptida / Protein</option>
                      <option value="steroid">Steroid</option>
                      <option value="turunan asam amino hidrofilik">Turunan AA Hidrofilik</option>
                      <option value="turunan asam amino lipofilik">Turunan AA Lipofilik</option>
                    </select>

                    {b2Checked && (
                      <span className={`text-[11px] font-semibold block ${
                        b2Matches[item.name] === item.target ? 'text-[#6B705C]' : 'text-[#A53F2B]'
                      }`}>
                        {b2Matches[item.name] === item.target ? '✓ Tepat' : `✗ Harusnya: ${item.target}`}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {!b2Checked && (
                <button
                  onClick={() => setB2Checked(true)}
                  className="px-4 py-2 rounded-xl bg-[#6B705C] text-white text-xs font-semibold hover:bg-[#585D4B] transition-colors cursor-pointer"
                >
                  Periksa Pasangan Klasifikasi
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BAGIAN 3: HORMON BERDASARKAN SUMBER */}
        {/* ========================================================= */}
        {activeSection === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                Bagian 3 dari 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Hormon Berdasarkan Sumber (Kelenjar Endokrin)
              </h2>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Setiap hormon mempunyai organ sumber penghasil, sel target, dan reseptor tertentu.
              </p>
            </div>

            {/* Peta Kelenjar Endokrin Interaktif */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left items-start">
              
              {/* Kolom Daftar Kelenjar yang Bisa Dipilih */}
              <div className="lg:col-span-1 space-y-1.5">
                <span className="text-xs font-bold text-[#706B5C] uppercase tracking-wider block mb-2">
                  Pilih Kelenjar Endokrin:
                </span>
                {[
                  { id: 'pankreas', name: 'Pankreas', badge: 'Sumber Insulin' },
                  { id: 'hipotalamus', name: 'Hipotalamus', badge: 'CRH & TRH' },
                  { id: 'hipofisis', name: 'Hipofisis Anterior', badge: 'GH, ACTH, TSH' },
                  { id: 'tiroid', name: 'Kelenjar Tiroid', badge: 'T3 & T4' },
                  { id: 'paratiroid', name: 'Kelenjar Paratiroid', badge: 'PTH' },
                  { id: 'adrenal', name: 'Kelenjar Adrenal', badge: 'Adrenalin & Kortisol' },
                  { id: 'ginjal', name: 'Ginjal', badge: 'EPO (Eritropoietin)' },
                  { id: 'gonad', name: 'Gonad (Ovarium/Testis)', badge: 'Estrogen, Progesteron, Testosteron' }
                ].map(org => (
                  <button
                    key={org.id}
                    onClick={() => setSelectedOrgan(org.id)}
                    className={`w-full p-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all border cursor-pointer ${
                      selectedOrgan === org.id
                        ? 'bg-[#6B705C] text-white border-[#6B705C] shadow-xs'
                        : 'bg-[#FDFCF9] text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
                    }`}
                  >
                    <span>{org.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      selectedOrgan === org.id ? 'bg-white/20 text-white' : 'bg-[#E5E2D9] text-[#706B5C]'
                    }`}>
                      {org.badge}
                    </span>
                  </button>
                ))}
              </div>

              {/* Kolom Tampilan Detail Organ & Hormon yang Dihasilkan */}
              <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-4">
                {selectedOrgan === 'pankreas' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#6B705C] text-white flex items-center justify-center font-bold text-sm">
                        PAN
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Pankreas (Pulau Langerhans)</h3>
                        <span className="text-xs text-[#CB997E] font-semibold">Organ Utama Regulasi Glukosa Darah</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E5E2D9] space-y-2">
                      <span className="text-xs font-bold text-[#6B705C]">Hormon yang Dihasilkan:</span>
                      <ul className="text-xs text-[#706B5C] space-y-1 list-disc list-inside">
                        <li><strong>Insulin:</strong> Diproduksi secara eksklusif oleh <strong>sel beta</strong> pada pulau Langerhans di pankreas.</li>
                        <li><strong>Glukagon:</strong> Diproduksi oleh sel alfa pulau Langerhans sebagai counter-regulatory hormon insulin.</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#E8EDE0] text-[#585D4B] text-xs leading-relaxed border border-[#C3CDB4]">
                      <strong>Penegasan Penting:</strong> “Insulin diproduksi oleh sel beta pada pulau Langerhans di pankreas.” Hormon ini merespons peningkatan glukosa darah pascamakan.
                    </div>
                  </div>
                )}

                {selectedOrgan === 'hipotalamus' && (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Hipotalamus (Pusat Kendali Neuroendokrin)</h3>
                    <p className="text-xs text-[#706B5C]">
                      Berada di dasar otak, menghubungkan sistem saraf dengan sistem endokrin melalui pelepasan hormon releasing:
                    </p>
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs space-y-2">
                      <p><strong>CRH (Corticotropin-Releasing Hormone):</strong> Merangsang hipofisis melepas ACTH.</p>
                      <p><strong>TRH (Thyrotropin-Releasing Hormone):</strong> Merangsang hipofisis melepas TSH.</p>
                      <p><strong>GnRH (Gonadotropin-Releasing Hormone):</strong> Merangsang pelepasan LH dan FSH.</p>
                    </div>
                  </div>
                )}

                {selectedOrgan === 'hipofisis' && (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Hipofisis Anterior (Master Gland)</h3>
                    <p className="text-xs text-[#706B5C]">
                      Menerima stimulasi hormon releasing dari hipotalamus dan mensekresikan hormon tropik ke peredaran darah:
                    </p>
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs space-y-2">
                      <p><strong>GH (Growth Hormone):</strong> Mengatur pertumbuhan tulang dan sintesis protein.</p>
                      <p><strong>ACTH:</strong> Merangsang korteks adrenal mensekresikan kortisol.</p>
                      <p><strong>TSH:</strong> Merangsang kelenjar tiroid menghasilkan T3 dan T4.</p>
                      <p><strong>LH & FSH:</strong> Mengatur fungsi gonad dalam spermatogenesis dan ovulasi.</p>
                    </div>
                  </div>
                )}

                {selectedOrgan === 'tiroid' && (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Kelenjar Tiroid</h3>
                    <p className="text-xs text-[#706B5C]">
                      Terletak di leher bagian depan, menghasilkan hormon metabolisme utama:
                    </p>
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs space-y-2">
                      <p><strong>T3 (Triiodotironin) & T4 (Tiroksin):</strong> Turunan tirosin beriodium yang bersifat lipofilik, mengatur laju metabolisme basal seluruh sel tubuh.</p>
                      <p><strong>Kalsitonin:</strong> Berperan dalam menurunkan kadar kalsium darah.</p>
                    </div>
                  </div>
                )}

                {selectedOrgan === 'paratiroid' && (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Kelenjar Paratiroid</h3>
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs space-y-2">
                      <p><strong>PTH (Parathyroid Hormone):</strong> Meningkatkan kadar kalsium darah melalui resorpsi tulang, reabsorpsi di tubulus ginjal, dan aktivasi vitamin D.</p>
                    </div>
                  </div>
                )}

                {selectedOrgan === 'adrenal' && (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Kelenjar Adrenal</h3>
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs space-y-2">
                      <p><strong>Medula Adrenal:</strong> Menghasilkan <em>Adrenalin (Epinefrin)</em> dan <em>Noradrenalin</em> (respons fight-or-flight cepat, hidrofilik).</p>
                      <p><strong>Korteks Adrenal:</strong> Menghasilkan <em>Kortisol</em> (glukokortikoid respons stres lambat, steroid lipofilik) dan <em>Aldosteron</em>.</p>
                    </div>
                  </div>
                )}

                {selectedOrgan === 'ginjal' && (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Ginjal</h3>
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs space-y-2">
                      <p><strong>Eritropoietin (EPO):</strong> Hormon glikoprotein yang merangsang eritropoiesis (pembentukan sel darah merah) di sumsum tulang ketika oksigen jaringan menurun.</p>
                    </div>
                  </div>
                )}

                {selectedOrgan === 'gonad' && (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">Gonad (Ovarium & Testis)</h3>
                    <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs space-y-2">
                      <p><strong>Ovarium:</strong> Menghasilkan hormon steroid <em>Estrogen</em> dan <em>Progesteron</em>.</p>
                      <p><strong>Testis:</strong> Menghasilkan hormon steroid androgen <em>Testosteron</em>.</p>
                    </div>
                  </div>
                )}

                {/* Tekankan */}
                <div className="pt-2 text-xs text-[#706B5C] border-t border-[#E5E2D9]">
                  “Setiap hormon mempunyai sumber penghasil, sel target, dan reseptor tertentu.”
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BAGIAN 4: MEKANISME KERJA HORMON */}
        {/* ========================================================= */}
        {activeSection === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                Bagian 4 dari 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Mekanisme Kerja Hormon
              </h2>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Perbandingan mendalam antara dua jalur transduksi: hormon hidrofilik dan hormon lipofilik.
              </p>
            </div>

            {/* Toggle Jalur */}
            <div className="flex bg-[#F5F2EA] p-1 rounded-2xl border border-[#E5E2D9] max-w-md mx-auto">
              <button
                onClick={() => setMechTab('hidrofilik')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mechTab === 'hidrofilik' ? 'bg-white text-[#6B705C] shadow-xs' : 'text-[#706B5C]'
                }`}
              >
                A. Hormon Hidrofilik
              </button>
              <button
                onClick={() => setMechTab('lipofilik')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mechTab === 'lipofilik' ? 'bg-white text-[#CB997E] shadow-xs' : 'text-[#706B5C]'
                }`}
              >
                B. Hormon Lipofilik
              </button>
            </div>

            {/* Tampilan Jalur Terpilih */}
            {mechTab === 'hidrofilik' ? (
              <div className="p-6 rounded-3xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6B705C] uppercase tracking-wider">
                  <Droplets className="w-4 h-4" />
                  <span>Jalur Hormon Hidrofilik (Reseptor Membran)</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs sm:text-sm text-[#3E3E3E] leading-relaxed">
                  “Hormon hidrofilik tidak dapat melewati bagian hidrofobik membran secara bebas. Oleh karena itu, hormon berikatan dengan reseptor pada permukaan sel.”
                </div>

                {/* Urutan Alur */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#706B5C]">Urutan Kaskade:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9]">Hormon di luar sel</div>
                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9]">Berikatan reseptor membran</div>
                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9]">Sinyal diteruskan ke dalam sel</div>
                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9]">Aktivitas protein berubah</div>
                    <div className="p-3 bg-[#E8EDE0] rounded-xl border border-[#C3CDB4] font-bold text-[#585D4B]">Respons sel cepat</div>
                  </div>
                </div>

                <div className="text-xs text-[#706B5C] space-y-1.5 pt-2">
                  <p><strong>Contoh Utama:</strong></p>
                  <p>• <strong>Insulin:</strong> Bekerja melalui reseptor tirosin kinase (RTK) pada membran sel.</p>
                  <p>• <strong>Adrenalin:</strong> Bekerja melalui reseptor membran dan perantara second messenger.</p>
                  <p className="text-[11px] text-[#A5A58D] italic pt-1">
                    *Catatan Kimiawi Penting: Tidak semua hormon hidrofilik menggunakan cAMP. Jalur transduksi bervariasi bergantung jenis reseptor membran.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-[#CB997E] uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>Jalur Hormon Lipofilik (Reseptor Intraseluler)</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9] text-xs sm:text-sm text-[#3E3E3E] leading-relaxed">
                  “Hormon lipofilik dapat menembus bilayer lipid membran secara langsung dan berikatan dengan reseptor di sitosol atau inti sel, memodulasi transkripsi gen.”
                </div>

                {/* Urutan Alur */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#706B5C]">Urutan Kaskade:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9]">Hormon menembus membran</div>
                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9]">Ikatan reseptor intraseluler</div>
                    <div className="p-3 bg-white rounded-xl border border-[#E5E2D9]">Memengaruhi ekspresi gen</div>
                    <div className="p-3 bg-[#FFE8D6] rounded-xl border border-[#E5E2D9] font-bold text-[#A53F2B]">Sintesis protein & fungsi sel</div>
                  </div>
                </div>

                <div className="text-xs text-[#706B5C] space-y-1 pt-2">
                  <p><strong>Contoh:</strong> Kortisol, testosteron, estrogen, dan hormon tiroid (T3/T4).</p>
                </div>
              </div>
            )}

            {/* Tabel Perbedaan Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
              <div className="p-4 rounded-2xl border border-[#E5E2D9] bg-white space-y-2">
                <span className="text-xs font-bold text-[#6B705C] block">Ciri Hormon Hidrofilik:</span>
                <ul className="text-xs text-[#706B5C] space-y-1 list-disc list-inside">
                  <li>Reseptor pada membran permukaan sel</li>
                  <li>Tidak melewati membran secara bebas</li>
                  <li>Respons umumnya lebih cepat (detik hingga menit)</li>
                  <li>Banyak memodifikasi protein yang sudah tersedia di sel</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-[#E5E2D9] bg-white space-y-2">
                <span className="text-xs font-bold text-[#CB997E] block">Ciri Hormon Lipofilik:</span>
                <ul className="text-xs text-[#706B5C] space-y-1 list-disc list-inside">
                  <li>Reseptor intraseluler (sitoplasma atau inti)</li>
                  <li>Dapat melewati membran lipid bilayer</li>
                  <li>Banyak memengaruhi transkripsi dan translasi gen baru</li>
                  <li>Respons umumnya lebih lambat (jam hingga hari) namun bertahan lama</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BAGIAN 5: FEEDBACK NEGATIF */}
        {/* ========================================================= */}
        {activeSection === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                Bagian 5 dari 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Feedback Negatif (Umpan Balik Negatif)
              </h2>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Mekanisme pertahanan homeostasis tubuh yang paling umum dalam sistem endokrin.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] text-[#3E3E3E] text-base font-serif leading-relaxed italic text-left">
              “Feedback negatif mengurangi respons awal ketika kondisi tubuh mulai kembali normal. Mekanisme ini membantu mempertahankan homeostasis.”
            </div>

            {/* Alur Feedback Negatif */}
            <div className="space-y-2 text-left">
              <span className="text-xs font-bold text-[#706B5C] uppercase tracking-wider">Alur Umum:</span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">1. Perubahan Kondisi Tubuh</div>
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">2. Hormon Dilepaskan</div>
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">3. Kondisi Diperbaiki</div>
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">4. Rangsangan Berkurang</div>
                <div className="p-3 rounded-xl bg-[#E8EDE0] border border-[#C3CDB4] font-bold text-[#585D4B]">5. Sekresi Hormon Berkurang</div>
              </div>
            </div>

            {/* Contoh Nyata Sumbu Tiroid */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E2D9] space-y-4 text-left">
              <span className="text-xs font-bold text-[#6B705C] uppercase tracking-wider block">
                Contoh: Regulasi Sumbu Tiroid
              </span>
              <p className="text-xs sm:text-sm text-[#706B5C] leading-relaxed">
                Peningkatan konsentrasi T3 dan T4 di dalam sirkulasi darah memberikan umpan balik penghambatan kepada hipofisis anterior dan hipotalamus sehingga sekresi TSH dan TRH berkurang.
              </p>

              {/* Skema Simbol Stimulasi vs Inhibisi */}
              <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] flex flex-col items-center justify-center space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-white rounded-lg border border-[#E5E2D9] font-bold">TRH</span>
                  <span className="text-[#6B705C] font-bold">── stimulasi (→) ──&gt;</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-[#E5E2D9] font-bold">TSH</span>
                  <span className="text-[#6B705C] font-bold">── stimulasi (→) ──&gt;</span>
                  <span className="px-3 py-1 bg-[#6B705C] text-white rounded-lg font-bold">T3 / T4</span>
                </div>
                
                <div className="flex items-center gap-2 text-[#A53F2B] font-bold pt-1">
                  <span>T3/T4 Tinggi</span>
                  <span className="border-t-2 border-[#A53F2B] w-8"></span>
                  <span className="px-2 py-0.5 bg-[#FFE8D6] rounded-md border border-[#DDBEA9]">
                    ─| Penghambatan (Inhibisi) ke TRH & TSH
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BAGIAN 6: FEEDBACK POSITIF */}
        {/* ========================================================= */}
        {activeSection === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                Bagian 6 dari 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Feedback Positif (Umpan Balik Positif)
              </h2>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Mekanisme penguatan sinyal hingga pencapaian titik akhir fisiologis tertentu.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] text-[#3E3E3E] text-base font-serif leading-relaxed italic text-left">
              “Feedback positif memperkuat respons awal sampai suatu proses biologis selesai.”
            </div>

            {/* Alur Feedback Positif */}
            <div className="space-y-2 text-left">
              <span className="text-xs font-bold text-[#706B5C] uppercase tracking-wider">Alur Siklus:</span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">1. Rangsangan Awal</div>
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">2. Hormon Dilepaskan</div>
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">3. Respons Memperkuat Rangsangan</div>
                <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">4. Hormon Semakin Meningkat</div>
                <div className="p-3 rounded-xl bg-[#FFE8D6] border border-[#E5E2D9] font-bold text-[#A53F2B]">5. Titik Akhir Tercapai</div>
              </div>
            </div>

            {/* Dua Contoh Nyata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-5 rounded-2xl border border-[#E5E2D9] bg-white space-y-2">
                <span className="text-xs font-bold text-[#CB997E] uppercase tracking-wider block">
                  Contoh 1: Oksitosin saat Persalinan
                </span>
                <p className="text-xs text-[#706B5C] leading-relaxed">
                  Peregangan serviks merangsang pelepasan hormon oksitosin dari hipofisis posterior. Oksitosin memicu kontraksi uterus yang lebih kuat, yang selanjutnya meregangkan serviks lebih lebar lagi hingga proses kelahiran bayi selesai.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-[#E5E2D9] bg-white space-y-2">
                <span className="text-xs font-bold text-[#CB997E] uppercase tracking-wider block">
                  Contoh 2: Lonjakan LH Menjelang Ovulasi
                </span>
                <p className="text-xs text-[#706B5C] leading-relaxed">
                  Peningkatan estrogen oleh folikel de Graaf ovarium mencapai ambang batas yang memicu pelepasan masif hormon LH (LH surge) dari hipofisis anterior, yang berujung pada pecahnya folikel dan ovulasi.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] text-xs text-[#3E3E3E] text-left leading-relaxed">
              <strong>Penegasan:</strong> “Feedback positif tidak berlangsung tanpa batas. Proses berhenti setelah peristiwa biologisnya selesai (misalnya setelah bayi lahir atau ovulasi terjadi).”
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BAGIAN 7: SUMBU HIPOTALAMUS–HIPOFISIS–ORGAN TARGET */}
        {/* ========================================================= */}
        {activeSection === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CB997E]">
                Bagian 7 dari 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Sumbu Hipotalamus–Hipofisis–Organ Target
              </h2>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Hierarki regulasi hormonal klasik melalui sistem kelenjar bertingkat.
              </p>
            </div>

            {/* Konsep Umum Hierarki */}
            <div className="p-4 bg-[#FAF8F2] rounded-2xl border border-[#E5E2D9] text-xs sm:text-sm text-center font-medium text-[#3E3E3E]">
              Hipotalamus (Hormon Pelepas) → Hipofisis Anterior (Hormon Tropik) → Organ Target → Hormon Akhir
            </div>

            {/* Pilihan 3 Sumbu */}
            <div className="flex bg-[#F5F2EA] p-1 rounded-2xl border border-[#E5E2D9] max-w-lg mx-auto">
              <button
                onClick={() => setAxisTab('tiroid')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  axisTab === 'tiroid' ? 'bg-white text-[#6B705C] shadow-xs' : 'text-[#706B5C]'
                }`}
              >
                1. Sumbu Tiroid
              </button>
              <button
                onClick={() => setAxisTab('adrenal')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  axisTab === 'adrenal' ? 'bg-white text-[#6B705C] shadow-xs' : 'text-[#706B5C]'
                }`}
              >
                2. Sumbu Adrenal
              </button>
              <button
                onClick={() => setAxisTab('gonad')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  axisTab === 'gonad' ? 'bg-white text-[#6B705C] shadow-xs' : 'text-[#706B5C]'
                }`}
              >
                3. Sumbu Gonad
              </button>
            </div>

            {/* Detail Sumbu Terpilih */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E2D9] space-y-4 text-left">
              {axisTab === 'tiroid' && (
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-base text-[#3E3E3E]">Sumbu Tiroid (HPT Axis)</h3>
                  <div className="p-3.5 bg-[#FAF8F2] rounded-xl text-xs font-mono text-center">
                    Hipotalamus —TRH→ Hipofisis —TSH→ Tiroid —T3/T4→ Sel Target
                  </div>
                  <p className="text-xs text-[#706B5C] leading-relaxed">
                    T3 dan T4 yang beredar bebas di darah akan memberikan feedback negatif balik ke hipofisis dan hipotalamus untuk menekan pelepasan TSH dan TRH lebih lanjut.
                  </p>
                </div>
              )}

              {axisTab === 'adrenal' && (
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-base text-[#3E3E3E]">Sumbu Adrenal (HPA Axis)</h3>
                  <div className="p-3.5 bg-[#FAF8F2] rounded-xl text-xs font-mono text-center">
                    Hipotalamus —CRH→ Hipofisis —ACTH→ Korteks Adrenal —Kortisol→ Sel Target
                  </div>
                  <p className="text-xs text-[#706B5C] leading-relaxed">
                    Kadar kortisol yang tinggi menghambat sekresi CRH pada hipotalamus dan ACTH pada hipofisis anterior melalui feedback negatif.
                  </p>
                </div>
              )}

              {axisTab === 'gonad' && (
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-base text-[#3E3E3E]">Sumbu Gonad (HPG Axis)</h3>
                  <div className="p-3.5 bg-[#FAF8F2] rounded-xl text-xs font-mono text-center">
                    Hipotalamus —GnRH→ Hipofisis —LH/FSH→ Gonad —Hormon Seks→ Sel Target
                  </div>
                  <p className="text-xs text-[#706B5C] leading-relaxed">
                    Testosteron atau estrogen memberikan feedback negatif ke hipofisis dan hipotalamus untuk mengatur keseimbangan fungsi reproduktif.
                  </p>
                </div>
              )}
            </div>

            {/* PENEGASAN KRUSIAL INSULIN */}
            <div className="p-5 rounded-2xl bg-[#FFE8D6] border border-[#DDBEA9] text-[#A53F2B] text-xs sm:text-sm text-left leading-relaxed">
              <strong>Penegasan Penting untuk Biokimia Insulin:</strong><br />
              Jangan menyatakan bahwa insulin harus melalui sumbu hipotalamus–hipofisis. Insulin <strong>diproduksi langsung oleh sel beta pankreas</strong> sebagai respons fisiologis terhadap perubahan konsentrasi nutrien dan glukosa dalam darah, tanpa perantara hormon tropik hipofisis!
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BAGIAN 8: TRANSISI MENUJU HORMON INSULIN */}
        {/* ========================================================= */}
        {activeSection === 8 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
                Transisi Modul Hormon
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
                Sekarang Mari Mengkaji Satu Hormon Secara Mendalam
              </h2>
              <p className="text-xs sm:text-sm text-[#706B5C]">
                Setelah memahami prinsip umum, mari menelusuri perjalanan kimiawi hormon insulin dari tingkat genetik hingga defosforilasi reseptor.
              </p>
            </div>

            {/* Kartu Profil Insulin Lengkap */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F2] border border-[#E5E2D9] max-w-xl mx-auto space-y-4 text-left">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E5E2D9]">
                <div className="w-12 h-12 rounded-2xl bg-[#6B705C] text-white flex items-center justify-center font-serif font-bold text-base shadow-xs">
                  INS
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#3E3E3E]">Hormon Insulin</h3>
                  <span className="text-xs font-semibold text-[#CB997E]">Regulator Homeostasis Glukosa Darah</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#3E3E3E]">
                <div className="flex justify-between py-1 border-b border-[#E5E2D9]/60">
                  <span className="text-[#706B5C]">Sumber:</span>
                  <span className="font-semibold text-right">Sel beta pulau Langerhans, pankreas</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5E2D9]/60">
                  <span className="text-[#706B5C]">Jenis Kimia:</span>
                  <span className="font-semibold text-right">Hormon peptida / protein</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5E2D9]/60">
                  <span className="text-[#706B5C]">Kelarutan:</span>
                  <span className="font-semibold text-right">Hidrofilik (larut air)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5E2D9]/60">
                  <span className="text-[#706B5C]">Lokasi Reseptor:</span>
                  <span className="font-semibold text-right">Membran sel permukaan</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5E2D9]/60">
                  <span className="text-[#706B5C]">Jenis Reseptor:</span>
                  <span className="font-semibold text-right">Reseptor Tirosin Kinase (RTK)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#706B5C]">Fungsi Utama:</span>
                  <span className="font-semibold text-right max-w-xs">
                    Mengatur metabolisme dan membantu menjaga homeostasis glukosa darah
                  </span>
                </div>
              </div>

              {/* Tombol Mulai Perjalanan Insulin */}
              <div className="pt-4">
                <button
                  onClick={handleProceedToInsulin}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <span>Mulai Perjalanan Insulin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Navigasi Bawah Previous / Next */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevSection}
          disabled={activeSection === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors border ${
            activeSection === 1 
              ? 'opacity-40 cursor-not-allowed bg-white border-[#E5E2D9] text-[#A5A58D]' 
              : 'bg-white hover:bg-[#F5F2EA] border-[#E5E2D9] text-[#706B5C] cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Sebelumnya</span>
        </button>

        {activeSection < 8 ? (
          <button
            onClick={handleNextSection}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <span>Selanjutnya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleProceedToInsulin}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <span>Buka Animasi Insulin (Tahap 2)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};
