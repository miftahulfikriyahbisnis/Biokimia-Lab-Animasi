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
  RefreshCw,
  Eye,
  Maximize2,
  X,
  ZoomIn
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

  // State Interaktif Bagian 2: Klasifikasi Kimia & Modal Struktur
  const [b2Matches, setB2Matches] = useState<{ [hormone: string]: string }>({});
  const [b2Checked, setB2Checked] = useState<boolean>(false);
  const [structureModal, setStructureModal] = useState<{
    num: number;
    imageLabel: string;
    name: string;
    target: string;
    imageSrc: string;
    badge: string;
    hint: string;
    structureDesc: string;
    solubility: string;
    receptorLocation: string;
    molecularReason: string;
    classificationDisplay: string;
  } | null>(null);

  // Data 4 Gambar Struktur Referensi untuk Kuis Bagian 2
  const b2StructureItems = [
    {
      num: 1,
      imageLabel: 'Gambar 1: Struktur Insulin',
      name: 'Insulin',
      target: 'peptida/protein',
      imageSrc: '/images/structures/struktur-insulin.svg',
      badge: 'Rantai Polipeptida & Jembatan Disulfida (-S-S-)',
      hint: 'Amati 2 untaian asam amino (rantai A & B) yang dihubungkan ikatan disulfida kovalen.',
      structureDesc: 'Tersusun atas rantai A (21 asam amino) dan rantai B (30 asam amino) yang dihubungkan secara kovalen oleh 2 jembatan disulfida interchain dan 1 jembatan disulfida intrachain pada rantai A.',
      solubility: 'Hidrofilik (Larut air)',
      receptorLocation: 'Permukaan membran sel target (Reseptor Tirosin Kinase)',
      molecularReason: 'Rantai polipeptida memiliki banyak gugus peptida polar (-CO-NH-) dan residu asam amino hidrofilik bermuatan sehingga tidak dapat menembus bilayer lipid hidrofobik membran secara langsung.',
      classificationDisplay: 'Peptida / Protein (Hidrofilik)'
    },
    {
      num: 2,
      imageLabel: 'Gambar 2: Struktur Kortisol',
      name: 'Kortisol',
      target: 'steroid',
      imageSrc: '/images/structures/struktur-kortisol.svg',
      badge: 'Inti Steroid 4-Cincin Karbon',
      hint: 'Amati kerangka 4 cincin karbon menyatu (siklopentanoperhidrofenantren) khas turunan kolesterol.',
      structureDesc: 'Merupakan hormon glukokortikoid turunan kolesterol dengan kerangka dasar 4 cincin hidrokarbon (tiga cincin 6-karbon dan satu cincin 5-karbon) dengan gugus fungsi keto (=O) dan hidroksil (-OH).',
      solubility: 'Lipofilik (Larut lemak / lipid)',
      receptorLocation: 'Intraseluler (Sitoplasma lalu bertranslokasi ke inti sel)',
      molecularReason: 'Kerangka hidrokarbon nonpolar yang dominan memungkinkan molekul kortisol berdifusi bebas menembus inti hidrofobik membran sel target tanpa memerlukan transporter membran.',
      classificationDisplay: 'Steroid (Lipofilik)'
    },
    {
      num: 3,
      imageLabel: 'Gambar 3: Struktur Adrenalin',
      name: 'Adrenalin',
      target: 'turunan asam amino hidrofilik',
      imageSrc: '/images/structures/struktur-adrenalin.svg',
      badge: 'Cincin Katekol + Rantai Samping Amina',
      hint: 'Amati cincin benzenadiol (katekol) dengan rantai samping amina polar (-CH(OH)CH2NHCH3).',
      structureDesc: 'Hormon katekolamin berukuran kecil yang disintesis dari asam amino tirosin melalui jalur L-DOPA dan dopamin, mempertahankan cincin benzenadiol serta gugus etanolamina polar.',
      solubility: 'Hidrofilik (Larut air)',
      receptorLocation: 'Permukaan membran sel (Reseptor Adrenergik terkopel protein G / GPCR)',
      molecularReason: 'Dua gugus hidroksil bebas (-OH) pada cincin benzena serta rantai samping amina sekunder polar membuat molekul mudah terhidrasi dalam air, sehingga tidak dapat menembus bilayer lipid dan harus berikatan dengan reseptor membran sel.',
      classificationDisplay: 'Turunan Asam Amino Hidrofilik'
    },
    {
      num: 4,
      imageLabel: 'Gambar 4: Struktur Tirosin (Tiroksin / T4)',
      name: 'Tiroksin (T4)',
      target: 'turunan asam amino lipofilik',
      imageSrc: '/images/structures/struktur-tirosin.svg',
      badge: 'Dua Cincin Aromatik + 4 Atom Iodium (I)',
      hint: 'Amati molekul turunan asam amino tirosin dengan 2 cincin aromatik dan 4 atom Iodium (I) nonpolar.',
      structureDesc: 'Hormon tiroid (3,5,3\',5\'-tetraiodotironin) yang disintesis dari asam amino tirosin pada folikel kelenjar tiroid dengan penyatuan dua cincin teriodinasi.',
      solubility: 'Lipofilik (Larut lipid / lemak)',
      receptorLocation: 'Intraseluler / Inti sel (Thyroid Hormone Receptor / TR)',
      molecularReason: 'Meskipun berasal dari asam amino tirosin, keberadaan 4 atom iodium (I) yang berukuran besar dan elektronegativitas rendah, bersama dua cincin fenil aromatik nonpolar, mendominasi sifat molekul sehingga menjadikannya sangat lipofilik dan mampu melintasi membran sel menuju inti sel.',
      classificationDisplay: 'Turunan Asam Amino Lipofilik'
    }
  ];

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

            {/* Interaktif Klasifikasi (Pencocokan Cepat) dengan Referensi Gambar Struktur */}
            <div className="p-5 rounded-2xl bg-[#F5F2EA] border border-[#E5E2D9] space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-[#3E3E3E] block">
                    Latihan Interaktif: Pasangkan Hormon dengan Klasifikasinya Berdasarkan Struktur Kimia
                  </span>
                  <p className="text-[11px] text-[#706B5C] mt-0.5">
                    Gunakan referensi 4 gambar struktur di bawah ini untuk menganalisis sifat kelarutan dan mengklasifikasikan masing-masing hormon (peptida, steroid, lipofilik, atau hidrofilik). Klik gambar untuk memperbesar detail ikatan kimia.
                  </p>
                </div>
                {b2Checked && (
                  <button
                    onClick={() => { setB2Matches({}); setB2Checked(false); }}
                    className="text-xs text-[#6B705C] hover:underline flex items-center gap-1 cursor-pointer shrink-0 self-start sm:self-auto"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Latihan
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {b2StructureItems.map(item => (
                  <div key={item.name} className="p-3.5 bg-white rounded-xl border border-[#E5E2D9] space-y-2.5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Label Gambar & Nama Hormon */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B705C] bg-[#F4F1EA] px-2 py-0.5 rounded-md">
                          {item.imageLabel.split(':')[0]}
                        </span>
                        <span className="text-[11px] text-[#3E3E3E] font-bold truncate">
                          {item.name}
                        </span>
                      </div>

                      {/* Frame Gambar Struktur yang Langsung Dilihat Mahasiswa */}
                      <div 
                        onClick={() => setStructureModal(item)}
                        className="group relative w-full h-36 bg-[#FDFCF9] rounded-lg border border-[#E5E2D9] p-2 flex items-center justify-center cursor-pointer hover:border-[#6B705C] hover:shadow-xs transition-all overflow-hidden"
                        title="Klik untuk memperbesar struktur molekul"
                      >
                        <img 
                          src={item.imageSrc} 
                          alt={item.imageLabel} 
                          className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-[#3E3E3E] font-medium">
                          <Maximize2 className="w-3.5 h-3.5 text-[#6B705C]" />
                          <span>Perbesar Detail</span>
                        </div>
                      </div>

                      {/* Header Nama & Badge Karakteristik */}
                      <div>
                        <span className="text-[11px] font-semibold text-[#5A554A] block">
                          {item.imageLabel}
                        </span>
                        <p className="text-[10.5px] text-[#706B5C] mt-0.5 line-clamp-2" title={item.hint}>
                          <strong>Ciri Kunci:</strong> {item.hint}
                        </p>
                      </div>
                    </div>

                    {/* Selector Jawaban & Feedback */}
                    <div className="space-y-2 pt-1 border-t border-[#F0EDE6]">
                      <div>
                        <label className="text-[10.5px] font-semibold text-[#5A554A] block mb-1">
                          Klasifikasi & Sifat:
                        </label>
                        <select
                          value={b2Matches[item.name] || ''}
                          onChange={e => setB2Matches({ ...b2Matches, [item.name]: e.target.value })}
                          className="w-full text-xs p-1.5 rounded-lg border border-[#E5E2D9] bg-[#FDFCF9] text-[#3E3E3E] focus:outline-none focus:border-[#6B705C]"
                        >
                          <option value="">Pilih Klasifikasi...</option>
                          <option value="peptida/protein">Peptida / Protein (Hidrofilik)</option>
                          <option value="steroid">Steroid (Lipofilik)</option>
                          <option value="turunan asam amino hidrofilik">Turunan AA Hidrofilik</option>
                          <option value="turunan asam amino lipofilik">Turunan AA Lipofilik</option>
                        </select>
                      </div>

                      {b2Checked && (
                        <div className={`p-2 rounded-lg text-[11px] leading-snug space-y-1 ${
                          b2Matches[item.name] === item.target 
                            ? 'bg-[#E8EDE0] text-[#424838] border border-[#C3CDB4]' 
                            : 'bg-[#FFE8D6] text-[#A53F2B] border border-[#F2C9B8]'
                        }`}>
                          <div className="flex items-center gap-1 font-semibold">
                            {b2Matches[item.name] === item.target ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B705C] shrink-0" />
                                <span>✓ Tepat! ({item.classificationDisplay})</span>
                              </>
                            ) : (
                              <span>✗ Harusnya: {item.classificationDisplay}</span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#555] pt-0.5 border-t border-black/10 leading-relaxed">
                            <strong>Analisis:</strong> {item.molecularReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {!b2Checked && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => setB2Checked(true)}
                    className="px-4 py-2 rounded-xl bg-[#6B705C] text-white text-xs font-semibold hover:bg-[#585D4B] transition-colors cursor-pointer shadow-xs"
                  >
                    Periksa Jawaban Klasifikasi
                  </button>
                  <span className="text-[11px] text-[#706B5C]">
                    Perhatikan gambar struktur untuk mengenali sifat hidrofilik vs lipofiliknya
                  </span>
                </div>
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
                      <strong>Penegasan Penting:</strong> “Sel beta di dalam Pulau Langerhans pankreas membuat dan melepaskan insulin.” Hormon ini merespons peningkatan glukosa darah pascamakan.
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

            {/* Kotak Penjelasan Singkat Sumbu Hormon & Feedback (Koreksi 1) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F9F7F1] border border-[#E5E2D9] text-left space-y-2 text-xs sm:text-sm text-[#3E3E3E] leading-relaxed shadow-xs">
              <p>
                Sumbu hormon adalah jalur beberapa organ yang saling memberi perintah untuk menghasilkan hormon.
              </p>
              <p>
                Feedback adalah cara tubuh mengatur proses tersebut. Feedback negatif mengurangi proses ketika hasilnya sudah cukup, sedangkan feedback positif memperkuat proses sampai tujuan tertentu tercapai.
              </p>
              <p className="text-[#585D4B] font-medium">
                Feedback positif maupun negatif dapat terjadi dengan sumbu atau tanpa sumbu.
              </p>
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

            {/* Animasi & Diagram Sumbu Tiroid (Koreksi 2 & 3) */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E2D9] space-y-4 text-left shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#6B705C] uppercase tracking-wider block">
                  Regulasi Sumbu Tiroid (HPT Axis)
                </span>
                <span className="text-[11px] font-semibold text-[#6B705C] bg-[#F4F1EA] px-2.5 py-0.5 rounded-full border border-[#E5E2D9]">
                  Contoh feedback negatif yang memakai sumbu hormon.
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#706B5C] leading-relaxed">
                Amati alur rangsangan ke depan (panah biasa) dan alur umpan balik penghambatan (garis putus-putus berujung T-bar) dari T3 dan T4 ke organ pengendali.
              </p>

              {/* Diagram Vektor Sumbu Tiroid & Feedback Negatif */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E5E2D9] overflow-x-auto">
                <svg viewBox="0 0 540 375" className="w-full max-w-lg mx-auto select-none min-w-[340px]">
                  <defs>
                    {/* Marker panah biasa untuk stimulasi ke depan */}
                    <marker
                      id="arrow-stim-b5"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#6B705C" />
                    </marker>
                  </defs>

                  {/* JALUR FEEDBACK NEGATIF (GARIS PUTUS-PUTUS DENGAN UJUNG PENGHAMBAT T-BAR) */}
                  {/* Dari sisi kiri Box T3/T4 (x=240, y=262) ke x=80, lalu ke atas */}
                  <path
                    d="M 240 262 L 75 262 L 75 52 L 235 52"
                    fill="none"
                    stroke="#A53F2B"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  {/* Ujung T-bar pada Hipotalamus (x=235, y=52) */}
                  <line x1="235" y1="42" x2="235" y2="62" stroke="#A53F2B" strokeWidth="4" strokeLinecap="round" />

                  {/* Cabang feedback ke Hipofisis Anterior (y=122) */}
                  <path
                    d="M 75 122 L 235 122"
                    fill="none"
                    stroke="#A53F2B"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  {/* Ujung T-bar pada Hipofisis anterior (x=235, y=122) */}
                  <line x1="235" y1="112" x2="235" y2="132" stroke="#A53F2B" strokeWidth="4" strokeLinecap="round" />

                  {/* Badge Label Feedback pada Garis Putus-putus */}
                  <rect x="12" y="165" width="126" height="48" rx="8" fill="#FFE8D6" stroke="#DDBEA9" strokeWidth="1" />
                  <text x="75" y="184" fontSize="9.5" fontWeight="bold" fill="#A53F2B" textAnchor="middle">
                    Feedback Negatif
                  </text>
                  <text x="75" y="198" fontSize="8" fontWeight="600" fill="#A53F2B" textAnchor="middle">
                    T3/T4 (─| Penghambat)
                  </text>

                  {/* ALUR STIMULASI KE DEPAN (PANAH BIASA) */}

                  {/* 1. Hipotalamus */}
                  <g transform="translate(240, 32)">
                    <rect x="0" y="0" width="195" height="40" rx="10" fill="#FFFFFF" stroke="#6B705C" strokeWidth="2" />
                    <text x="97" y="25" fontSize="12" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">
                      Hipotalamus
                    </text>
                  </g>

                  {/* Panah Biasa 1: melepaskan TRH */}
                  <line x1="337" y1="72" x2="337" y2="102" stroke="#6B705C" strokeWidth="2" markerEnd="url(#arrow-stim-b5)" />
                  <text x="347" y="90" fontSize="10.5" fontWeight="bold" fill="#6B705C">
                    ↓ melepaskan TRH
                  </text>

                  {/* 2. Hipofisis anterior */}
                  <g transform="translate(240, 102)">
                    <rect x="0" y="0" width="195" height="40" rx="10" fill="#FFFFFF" stroke="#6B705C" strokeWidth="2" />
                    <text x="97" y="25" fontSize="12" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">
                      Hipofisis anterior
                    </text>
                  </g>

                  {/* Panah Biasa 2: melepaskan TSH */}
                  <line x1="337" y1="142" x2="337" y2="172" stroke="#6B705C" strokeWidth="2" markerEnd="url(#arrow-stim-b5)" />
                  <text x="347" y="160" fontSize="10.5" fontWeight="bold" fill="#6B705C">
                    ↓ melepaskan TSH
                  </text>

                  {/* 3. Kelenjar tiroid */}
                  <g transform="translate(240, 172)">
                    <rect x="0" y="0" width="195" height="40" rx="10" fill="#FFFFFF" stroke="#6B705C" strokeWidth="2" />
                    <text x="97" y="25" fontSize="12" fontWeight="bold" fill="#3E3E3E" textAnchor="middle">
                      Kelenjar tiroid
                    </text>
                  </g>

                  {/* Panah Biasa 3: menghasilkan T3 dan T4 */}
                  <line x1="337" y1="212" x2="337" y2="242" stroke="#6B705C" strokeWidth="2" markerEnd="url(#arrow-stim-b5)" />
                  <text x="347" y="230" fontSize="10.5" fontWeight="bold" fill="#6B705C">
                    ↓ menghasilkan T3 dan T4
                  </text>

                  {/* 4. T3 dan T4 */}
                  <g transform="translate(240, 242)">
                    <rect x="0" y="0" width="195" height="40" rx="10" fill="#6B705C" stroke="#585D4B" strokeWidth="2" />
                    <text x="97" y="25" fontSize="12" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                      T3 dan T4
                    </text>
                  </g>

                  {/* Panah Biasa 4: bekerja pada sel-sel tubuh */}
                  <line x1="337" y1="282" x2="337" y2="312" stroke="#6B705C" strokeWidth="2" markerEnd="url(#arrow-stim-b5)" />
                  <text x="347" y="300" fontSize="10" fontWeight="600" fill="#706B5C">
                    ↓ bekerja pada sel-sel tubuh
                  </text>

                  {/* 5. Sel-sel Tubuh */}
                  <g transform="translate(240, 312)">
                    <rect x="0" y="0" width="195" height="38" rx="10" fill="#F5F2EA" stroke="#E5E2D9" strokeWidth="1.5" />
                    <text x="97" y="24" fontSize="11" fontWeight="bold" fill="#5A554A" textAnchor="middle">
                      Sel-sel Tubuh
                    </text>
                  </g>
                </svg>
              </div>

              {/* Makna Kedua Jalur Feedback & Keterangan Tambahan */}
              <div className="p-4 bg-[#FAF8F2] rounded-2xl border border-[#E5E2D9] space-y-2 text-xs">
                <span className="font-bold text-[#A53F2B] block text-xs sm:text-sm">
                  Feedback negatif: T3/T4 mengurangi pelepasan TRH dan TSH.
                </span>
                <p className="text-[#3E3E3E] font-medium">Makna kedua jalur penghambatan:</p>
                <ul className="text-[#706B5C] space-y-1 list-disc list-inside">
                  <li><strong>T3/T4 menghambat hipotalamus</strong> sehingga pelepasan TRH berkurang.</li>
                  <li><strong>T3/T4 menghambat hipofisis anterior</strong> sehingga pelepasan TSH berkurang.</li>
                </ul>
                <div className="pt-2 border-t border-[#E5E2D9] text-[11px] text-[#706B5C] italic">
                  Panah kembali ke hipofisis berarti T3/T4 mengurangi TSH, bukan berarti hipofisis menghasilkan TRH.
                </div>
              </div>
            </div>

            {/* Bagian Insulin: Contoh Feedback Negatif Tanpa Sumbu (Koreksi 4) */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E2D9] space-y-4 text-left shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#6B705C] uppercase tracking-wider block">
                  Regulasi Hormon Insulin (Pankreas)
                </span>
                <span className="text-[11px] font-semibold text-[#6B705C] bg-[#F4F1EA] px-2.5 py-0.5 rounded-full border border-[#E5E2D9]">
                  Contoh feedback negatif tanpa sumbu hipotalamus–hipofisis.
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F2] rounded-2xl border border-[#E5E2D9] text-xs sm:text-sm font-serif italic text-[#3E3E3E]">
                “Sel beta di dalam Pulau Langerhans pankreas membuat dan melepaskan insulin.”
              </div>

              {/* Ilustrasi Pembesaran Sederhana */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#706B5C] uppercase tracking-wider block">
                  Ilustrasi Pembesaran:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-3 bg-[#FDFCF9] rounded-xl border border-[#E5E2D9] flex flex-col items-center justify-center space-y-1">
                    <span className="text-[10px] text-[#706B5C] uppercase">Organ</span>
                    <span className="font-bold text-[#3E3E3E]">Pankreas</span>
                  </div>
                  <div className="p-3 bg-[#FDFCF9] rounded-xl border border-[#E5E2D9] flex flex-col items-center justify-center space-y-1">
                    <span className="text-[10px] text-[#CB997E] font-semibold">→ diperbesar menjadi</span>
                    <span className="font-bold text-[#3E3E3E]">Pulau Langerhans</span>
                  </div>
                  <div className="p-3 bg-[#FDFCF9] rounded-xl border border-[#E5E2D9] flex flex-col items-center justify-center space-y-1">
                    <span className="text-[10px] text-[#CB997E] font-semibold">→ diperbesar menjadi</span>
                    <span className="font-bold text-[#3E3E3E]">Sel Beta</span>
                  </div>
                  <div className="p-3 bg-[#E8EDE0] rounded-xl border border-[#C3CDB4] flex flex-col items-center justify-center space-y-1">
                    <span className="text-[10px] text-[#585D4B] font-semibold">→ sel beta melepaskan</span>
                    <span className="font-bold text-[#424838]">Insulin ke Darah</span>
                  </div>
                </div>
              </div>

              {/* Penjelasan Singkat Mekanisme Langsung */}
              <div className="p-4 bg-[#F5F2EA] rounded-2xl border border-[#E5E2D9] text-xs text-[#3E3E3E] leading-relaxed">
                <p>
                  Ketika glukosa darah naik, sel beta pankreas mendeteksinya secara langsung dan melepaskan insulin. Setelah glukosa darah turun mendekati normal, pelepasan insulin dikurangi. Karena sel beta dapat mendeteksi glukosa secara langsung, insulin tidak memerlukan rangkaian hipotalamus–hipofisis.
                </p>
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
                    Hipotalamus —TRH→ Hipofisis Anterior —TSH→ Kelenjar Tiroid —T3 dan T4→ Sel Target
                  </div>
                  <p className="text-xs text-[#706B5C] leading-relaxed">
                    Kadar T3 dan T4 yang tinggi menghambat sekresi TRH pada hipotalamus dan TSH pada hipofisis anterior melalui feedback negatif.
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

      {/* Modal Detail Struktur Kimia Hormon untuk Pembelajaran Mahasiswa */}
      {structureModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setStructureModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full border border-[#E5E2D9] shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E5E2D9] pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B705C] bg-[#F4F1EA] px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {structureModal.imageLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3E3E3E]">
                  Struktur Kimia & Klasifikasi: {structureModal.name}
                </h3>
              </div>
              <button
                onClick={() => setStructureModal(null)}
                className="p-1.5 rounded-full hover:bg-[#F5F2EA] text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gambar Struktur Beresolusi Penuh */}
            <div className="bg-[#FAF8F2] rounded-xl border border-[#E5E2D9] p-4 flex items-center justify-center">
              <img 
                src={structureModal.imageSrc} 
                alt={structureModal.imageLabel} 
                className="max-h-[280px] w-auto object-contain mx-auto transition-all"
              />
            </div>

            {/* Analisis Molekuler Mendalam */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#FDFCF9] rounded-xl border border-[#E5E2D9] space-y-1.5">
                <span className="font-bold text-[#3E3E3E] block text-[11.5px]">Karakteristik Kerangka Kimia</span>
                <p className="text-[#706B5C] leading-relaxed">{structureModal.structureDesc}</p>
              </div>
              <div className="p-3.5 bg-[#FDFCF9] rounded-xl border border-[#E5E2D9] space-y-1.5">
                <span className="font-bold text-[#3E3E3E] block text-[11.5px]">Sifat Kelarutan & Reseptor</span>
                <p className="text-[#706B5C]"><strong>Kelarutan:</strong> {structureModal.solubility}</p>
                <p className="text-[#706B5C]"><strong>Lokasi Reseptor:</strong> {structureModal.receptorLocation}</p>
                <p className="text-[#6B705C] font-semibold pt-1">Klasifikasi: {structureModal.classificationDisplay}</p>
              </div>
            </div>

            <div className="p-3.5 bg-[#E8EDE0]/70 rounded-xl border border-[#C3CDB4] text-xs space-y-1">
              <span className="font-bold text-[#424838] block text-[11.5px]">Mengapa Berpengaruh pada Sifat Lipofilik / Hidrofilik?</span>
              <p className="text-[#585D4B] leading-relaxed">{structureModal.molecularReason}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E5E2D9]">
              <span className="text-[11px] text-[#706B5C] italic">
                Pelajari ikatan kovalen, cincin, dan atom pengganti untuk menentukan respons reseptornya.
              </span>
              <button
                onClick={() => setStructureModal(null)}
                className="px-5 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Tutup & Lanjutkan Kuis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
