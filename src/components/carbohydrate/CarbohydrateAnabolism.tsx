/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Hammer, 
  Sparkles, 
  Layers, 
  Info, 
  HelpCircle,
  Activity,
  Zap,
  Repeat
} from 'lucide-react';
import { 
  GLUCONEOGENESIS_BYPASS_REACTIONS, 
  CORI_CYCLE_DATA, 
  LIPOGENESIS_FROM_CARBS_DATA, 
  METABOLIC_CROSSROADS,
  ANABOLISM_ENERGY_TABLE,
  JIGSAW_CASE_STUDIES,
  CARB_SLIDE_TEASERS
} from '../../data/carbohydrateData';
import { Glycogenesis3D } from './3d/Glycogenesis3D';
import { MetabolicMap3D } from './3d/MetabolicMap3D';
import { CarbSceneControls } from './3d/CarbSceneControls';

interface CarbohydrateAnabolismProps {
  onBackToHome: () => void;
  onCompleteAndNext: () => void;
  isCompleted?: boolean;
}

export const CarbohydrateAnabolism: React.FC<CarbohydrateAnabolismProps> = ({
  onBackToHome,
  onCompleteAndNext,
  isCompleted = false
}) => {
  const [activeTab, setActiveTab] = useState<
    'GLYCOGENESIS' | 'GLUCONEOGENESIS' | 'CORI_CYCLE' | 'LIPOGENESIS' | 'METABOLIC_MAP' | 'ENERGY_BALANCE' | 'JIGSAW'
  >('GLYCOGENESIS');

  // Kontrol Scene 3D
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [isEasyMode, setIsEasyMode] = useState(false);

  // Sub-state
  const [glycogenGrowth, setGlycogenGrowth] = useState(3);
  const [selectedCrossroadNode, setSelectedCrossroadNode] = useState<string | null>('Glukosa-6-Fosfat (G6P)');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [selectedJigsawId, setSelectedJigsawId] = useState(1);
  const [showJigsawKey, setShowJigsawKey] = useState(false);

  const tabs = [
    { id: 'GLYCOGENESIS' as const, name: '1. Glikogenesis (Glikogen)' },
    { id: 'GLUCONEOGENESIS' as const, name: '2. Glukoneogenesis (3 Bypass)' },
    { id: 'CORI_CYCLE' as const, name: '3. Siklus Cori' },
    { id: 'LIPOGENESIS' as const, name: '4. Lipogenesis dari Karbohidrat' },
    { id: 'METABOLIC_MAP' as const, name: '5. Peta Integrasi Antarjalur' },
    { id: 'ENERGY_BALANCE' as const, name: '6. Neraca Biaya Energi' },
    { id: 'JIGSAW' as const, name: '7. 8 Kasus Jigsaw (Kelompok Ahli)' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Bar Atas */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:text-[#3E3E3E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Karbohidrat</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
          <Hammer className="w-3.5 h-3.5 text-blue-600" />
          <span>Tahap 4: Peta Anabolisme Karbohidrat</span>
        </div>
      </div>

      {/* Header Judul */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E3E3E]">
          Biosintesis & Penyimpanan Cadangan Energi Karbohidrat
        </h1>
        <p className="text-xs sm:text-sm text-[#706B5C] max-w-3xl leading-relaxed">
          Pelajari bagaimana tubuh merakit glikogen polimer, membuat glukosa baru dari substrat non-karbohidrat (glukoneogenesis), mendaur ulang laktat melalui Siklus Cori, serta mengalihkan surplus karbohidrat menjadi lemak cadangan (lipogenesis).
        </p>
      </div>

      {/* Tab Navigasi 5 Topik Anabolisme */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#6B705C] text-white border-[#6B705C] shadow-xs'
                : 'bg-white text-[#706B5C] border-[#E5E2D9] hover:bg-[#F5F2EA]'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* BANNER REFLEKSI ANABOLISME DARI SLIDE KULIAH */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-cyan-50/60 border border-emerald-200/80 rounded-3xl p-4 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <h4 className="font-serif font-bold text-xs sm:text-sm text-emerald-950">
            Diskusi Kilat: Kenapa Tubuh Harus "Menabung" Kelebihan Makanan?
          </h4>
        </div>
        <p className="text-xs text-[#706B5C] leading-relaxed">
          Secara evolusioner dan fisiologis, tubuh manusia tidak dirancang untuk membuang kelebihan energi. Melalui anabolisme (glikogenesis dan lipogenesis), surplus karbohidrat diubah menjadi polimer glikogen (energi siap pakai cepat) dan trigliserida (energi densitas tinggi jangka panjang) untuk bertahan dari periode kelaparan (*fasting*) atau mendukung aktivitas fisik berat (*bulking / carbo-loading*).
        </p>
      </div>

      {/* KONDISIONAL RENDER SESUAI TAB */}
      {activeTab === 'ENERGY_BALANCE' ? (
        /* TAB 6: TABEL NERACA BIAYA ENERGI ANABOLISME */
        <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-6 shadow-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                Neraca Biaya Energi Jalur Anabolisme Karbohidrat
              </h3>
              <p className="text-xs text-[#A5A58D]">
                Anabolisme bersifat endergonik (membutuhkan input ATP/GTP dan ekuivalen pereduksi NADPH)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#706B5C] border-b border-[#E5E2D9]">
                  <th className="p-3 font-bold">Jalur Anabolisme</th>
                  <th className="p-3 font-bold">Konsumsi ATP / GTP / UTP</th>
                  <th className="p-3 font-bold">Konsumsi NADH</th>
                  <th className="p-3 font-bold">Konsumsi NADPH (Pereduksi)</th>
                  <th className="p-3 font-bold">Catatan Biokimiawi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9]/70">
                {ANABOLISM_ENERGY_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-[#FAF8F5]/50">
                    <td className="p-3 font-bold text-[#3E3E3E]">{row.pathway}</td>
                    <td className="p-3 text-red-700 font-mono font-semibold">{row.atpGtpCost}</td>
                    <td className="p-3 text-purple-700 font-mono font-semibold">{row.nadhCost}</td>
                    <td className="p-3 text-cyan-700 font-mono font-bold">{row.nadphCost}</td>
                    <td className="p-3 text-[#706B5C] leading-snug">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-[#706B5C] leading-relaxed space-y-1">
            <span className="font-bold text-amber-950 block text-xs">
              💡 Peran Khusus NADPH vs NADH:
            </span>
            <p>
              <strong>NADH</strong> digunakan di mitokondria terutama untuk <em>katabolisme</em> (menghasilkan ATP di rantai transpor elektron). Sebaliknya, <strong>NADPH</strong> (dihasilkan oleh Jalur Pentosa Fosfat / PPP) berperan sebagai "mata uang pereduksi" khusus untuk <em>anabolisme biosintetik</em>, seperti reduksi rantai karbon oleh Fatty Acid Synthase (FASN) pada lipogenesis.
            </p>
          </div>
        </div>
      ) : activeTab === 'JIGSAW' ? (
        /* TAB 7: 8 STUDI KASUS JIGSAW (KELOMPOK AHLI) LENGKAP */
        <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#6B705C]" />
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                  8 Studi Kasus Pembelajaran Jigsaw (Kelompok Ahli)
                </h3>
                <p className="text-xs text-[#A5A58D]">
                  Pilih salah satu dari 8 kelompok studi kasus untuk menelaah skenario, tugas, pertanyaan pemandu, dan solusi biokimia
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700">
              Kasus {selectedJigsawId} dari 8
            </span>
          </div>

          {/* Tab Pemilih 8 Kelompok Jigsaw */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {JIGSAW_CASE_STUDIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedJigsawId(c.id);
                  setShowJigsawKey(false);
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedJigsawId === c.id
                    ? 'bg-[#6B705C] text-white border-[#6B705C] shadow-xs'
                    : 'bg-[#FAF8F5] text-[#706B5C] border-[#E5E2D9] hover:bg-white'
                }`}
              >
                <span className="text-[10px] font-bold block opacity-80">{c.groupName}</span>
                <span className="font-serif font-bold text-xs block truncate">{c.topic}</span>
              </button>
            ))}
          </div>

          {/* Kartu Detail Kasus Jigsaw yang Dipilih */}
          {(() => {
            const currentCase = JIGSAW_CASE_STUDIES.find(c => c.id === selectedJigsawId) || JIGSAW_CASE_STUDIES[0];
            return (
              <div className="p-5 rounded-3xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-800">
                      {currentCase.groupName} — Topik: {currentCase.topic}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#3E3E3E] mt-0.5">
                      Skenario Kasus Klinis & Fisiologis
                    </h4>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E5E2D9] text-[#3E3E3E] leading-relaxed">
                  {currentCase.scenario}
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-950 block text-[11px]">
                    📋 Tugas Utama Mahasiswa / Tim:
                  </span>
                  <p className="text-amber-900 leading-snug">
                    {currentCase.studentTask}
                  </p>
                </div>

                {/* Pertanyaan Pemandu (Scaffolding Questions) */}
                <div className="space-y-2">
                  <span className="font-bold text-[#3E3E3E] block text-[11px]">
                    ❓ Pertanyaan Pemandu Diskusi (Scaffolding Questions):
                  </span>
                  <div className="space-y-1.5">
                    {currentCase.scaffoldingQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-white border border-[#E5E2D9] text-[#706B5C]">
                        <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center font-bold text-[10px] text-[#3E3E3E] shrink-0">
                          {idx + 1}
                        </span>
                        <span className="leading-snug pt-0.5">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Kunci Biokimia / Intisari */}
                <div className="pt-2 border-t border-[#E5E2D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <button
                    onClick={() => setShowJigsawKey(!showJigsawKey)}
                    className="px-4 py-2 rounded-xl bg-[#6B705C] hover:bg-[#585D4B] text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    {showJigsawKey ? 'Sembunyikan Kunci Biokimia' : 'Buka Kunci Biokimia & Intisari Ilmiah'}
                  </button>

                  <span className="text-[10px] text-[#A5A58D]">
                    Gunakan kunci ini setelah berdiskusi bersama kelompok ahli Anda.
                  </span>
                </div>

                {showJigsawKey && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs space-y-1.5 animate-fadeIn">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Kunci Jawaban Biokimiawi & Integrasi Metabolik:
                    </span>
                    <p className="text-emerald-900 leading-relaxed text-[11px]">
                      {currentCase.keyBiochemicalTakeaway}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        /* GRID STANDAR: 3D Visualizer + Panel Reaksi */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: 3D Scene */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E2D9] p-4 flex flex-col shadow-xs space-y-3 min-h-[500px]">
          
          <CarbSceneControls
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onReplay={() => setGlycogenGrowth(1)}
            currentStep={activeTab === 'GLYCOGENESIS' ? glycogenGrowth : 1}
            totalSteps={activeTab === 'GLYCOGENESIS' ? 4 : 1}
            onPrevStep={() => {
              if (activeTab === 'GLYCOGENESIS') setGlycogenGrowth(Math.max(1, glycogenGrowth - 1));
            }}
            onNextStep={() => {
              if (activeTab === 'GLYCOGENESIS') setGlycogenGrowth(Math.min(4, glycogenGrowth + 1));
            }}
            speed={speed}
            onChangeSpeed={(s) => setSpeed(s)}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels(!showLabels)}
            onResetCamera={() => {}}
            isEasyMode={isEasyMode}
            onToggleEasyMode={() => setIsEasyMode(!isEasyMode)}
            captionTitle={
              activeTab === 'GLYCOGENESIS' ? `Pertumbuhan Glikogen (Lapisan ${glycogenGrowth}/4)` :
              activeTab === 'GLUCONEOGENESIS' ? 'Glukoneogenesis: 3 Reaksi Bypass' :
              activeTab === 'CORI_CYCLE' ? 'Siklus Cori (Otot ↔ Darah ↔ Hati)' :
              activeTab === 'LIPOGENESIS' ? 'Lipogenesis: Citrate Shuttle ke Adiposit' :
              'Peta Persimpangan Jalur Metabolik'
            }
          />

          {/* Canvas 3D */}
          <div className="flex-1 w-full rounded-2xl bg-[#FAF8F5] overflow-hidden relative border border-[#E5E2D9]/60 min-h-[380px]">
            {activeTab === 'GLYCOGENESIS' ? (
              <Glycogenesis3D
                growthLevel={glycogenGrowth}
                isPlaying={isPlaying}
                speed={speed}
                showLabels={showLabels}
              />
            ) : (
              <MetabolicMap3D
                activePathway={
                  activeTab === 'CORI_CYCLE' ? 'cori_cycle' :
                  activeTab === 'LIPOGENESIS' ? 'lipogenesis' :
                  activeTab === 'GLUCONEOGENESIS' ? 'gluconeogenesis' : 'metabolic_map'
                }
                selectedNode={selectedCrossroadNode}
                onSelectNode={(name) => setSelectedCrossroadNode(name)}
                isPlaying={isPlaying}
                speed={speed}
                showLabels={showLabels}
              />
            )}
          </div>
        </div>

        {/* Kolom Kanan: Detail Ilmiah Reaksi Anabolik */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-5 space-y-4 shadow-xs">
            
            {/* KONTEN TAB: GLIKOGENESIS */}
            {activeTab === 'GLYCOGENESIS' && (
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  Sintesis Polimer Cadangan
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                  Glikogenesis (Pembentukan Granula Glikogen)
                </h3>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                  <div>
                    <span className="text-[#A5A58D] block">Primer Protein Awal:</span>
                    <span className="font-bold text-purple-900">Glycogenin</span>
                    <p className="text-[#706B5C] text-[10.5px]">Melakukan autoglikosilasi hingga ~8 unit glukosa pertama.</p>
                  </div>
                  <div className="border-t border-[#E5E2D9] pt-1">
                    <span className="text-[#A5A58D] block">Perpanjangan Linear (Ikatan α-1,4):</span>
                    <span className="font-bold text-amber-800">Glycogen Synthase (diaktifkan insulin)</span>
                  </div>
                  <div className="border-t border-[#E5E2D9] pt-1">
                    <span className="text-[#A5A58D] block">Pembentukan Percabangan (Ikatan α-1,6):</span>
                    <span className="font-bold text-orange-800">Branching Enzyme (Percabangan setiap 8-12 unit glukosa)</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-900 block text-[10.5px]">
                    Perbedaan Regulasi Penting: Hati vs Otot
                  </span>
                  <p className="text-amber-800 text-[10.5px] leading-snug">
                    • <strong>Hati:</strong> Memiliki enzim <em>Glucose-6-Phosphatase</em>, sehingga glikogen hati bisa dihidrolisis menjadi glukosa bebas untuk menjaga kestabilan glukosa darah seluruh tubuh.<br />
                    • <strong>Otot Rangka:</strong> TIDAK memiliki <em>Glucose-6-Phosphatase</em>. Glikogen otot murni hanya digunakan untuk energi kontraksi sel otot itu sendiri.
                  </p>
                </div>
              </div>
            )}

            {/* KONTEN TAB: GLUKONEOGENESIS */}
            {activeTab === 'GLUCONEOGENESIS' && (
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Sintesis Glukosa De Novo
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                  Glukoneogenesis & 3 Reaksi Bypass
                </h3>

                <p className="text-[#706B5C] text-[11px] leading-relaxed">
                  Glukoneogenesis bukan sekadar kebalikan glikolisis. Ada 3 reaksi ireversibel glikolisis yang harus dilewati menggunakan enzim-enzim khusus:
                </p>

                <div className="space-y-2">
                  {GLUCONEOGENESIS_BYPASS_REACTIONS.map((b) => (
                    <div key={b.bypassNumber} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-0.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#3E3E3E] text-[11px]">Bypass {b.bypassNumber}</span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {b.location}
                        </span>
                      </div>
                      <div className="text-[10.5px]">
                        <span className="text-[#A5A58D]">Enzim: </span>
                        <span className="font-bold text-cyan-800">{b.gluconeogenicEnzymes.join(' & ')}</span>
                      </div>
                      <p className="text-[#706B5C] text-[10px]">{b.reactionDescription}</p>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[10.5px] text-red-900">
                  ⚠️ <strong>Biaya Energi Tinggi:</strong> Sintesis 1 glukosa dari 2 piruvat membutuhkan <strong>4 ATP + 2 GTP (total 6 ekuivalen ATP) + 2 NADH</strong>!
                </div>
              </div>
            )}

            {/* KONTEN TAB: SIKLUS CORI */}
            {activeTab === 'CORI_CYCLE' && (
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-bold text-pink-800 uppercase tracking-wider block">
                  Penyelamatan Metabolik Antar-Organ
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                  {CORI_CYCLE_DATA.title}
                </h3>

                <p className="text-[#706B5C] text-[11px] leading-relaxed">
                  {CORI_CYCLE_DATA.description}
                </p>

                <div className="space-y-2">
                  {CORI_CYCLE_DATA.stages.map((st, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] text-[11px]">
                      <span className="font-bold text-[#3E3E3E]">{st.organ}: </span>
                      <span className="text-[#706B5C]">{st.process}</span>
                      <span className="block font-mono text-[10px] text-emerald-800 mt-0.5">{st.energyCost}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-[10.5px] text-purple-900">
                  🛡️ <strong>Manfaat Klinis:</strong> {CORI_CYCLE_DATA.clinicalSignificance}
                </div>
              </div>
            )}

            {/* KONTEN TAB: LIPOGENESIS DARI KARBOHIDRAT */}
            {activeTab === 'LIPOGENESIS' && (
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-bold text-yellow-800 uppercase tracking-wider block">
                  Konversi Surplus Karbohidrat Menjadi Lemak
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                  {LIPOGENESIS_FROM_CARBS_DATA.title}
                </h3>

                <p className="text-[#706B5C] text-[11px] leading-relaxed">
                  {LIPOGENESIS_FROM_CARBS_DATA.description}
                </p>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-1.5">
                  <span className="font-bold text-[#3E3E3E] block text-[11px]">
                    Mekanisme Citrate Shuttle:
                  </span>
                  <p className="text-[#706B5C] text-[10.5px] leading-relaxed">
                    {LIPOGENESIS_FROM_CARBS_DATA.citrateShuttleMechanism}
                  </p>
                  <div className="border-t border-[#E5E2D9] pt-1">
                    <span className="text-[#A5A58D] block">Enzim Kunci:</span>
                    <span className="font-bold text-amber-800">{LIPOGENESIS_FROM_CARBS_DATA.keyEnzymes.join(', ')}</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[10.5px] text-amber-900">
                  💡 <strong>Asal Gliserol:</strong> Karbohidrat juga menyumbang tulang punggung gliserol untuk trigliserida melalui reduksi zat antara glikolisis <em>Dihidroksiaseton fosfat (DHAP)</em>.
                </div>
              </div>
            )}

            {/* KONTEN TAB: METABOLIC MAP */}
            {activeTab === 'METABOLIC_MAP' && (
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-bold text-[#6B705C] uppercase tracking-wider block">
                  Peta Integrasi Antarjalur
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E3E3E]">
                  Persimpangan Metabolik Kunci
                </h3>

                <p className="text-[#706B5C] text-[11px] leading-relaxed">
                  Pilih salah satu node persimpangan untuk melihat ke mana molekul tersebut dapat diarahkan:
                </p>

                <div className="space-y-1.5">
                  {METABOLIC_CROSSROADS.map((node) => (
                    <button
                      key={node.name}
                      onClick={() => setSelectedCrossroadNode(node.name)}
                      className={`w-full text-left p-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        selectedCrossroadNode === node.name
                          ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                          : 'bg-[#FAF8F5] border-[#E5E2D9] text-[#706B5C] hover:bg-[#F5F2EA]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: node.color }} />
                        <span>{node.name}</span>
                      </div>
                      <span className="text-[10px] text-[#A5A58D] font-normal">{node.fates.length} Jalur</span>
                    </button>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[10.5px] text-red-900">
                  ⛔ <strong>Prinsip Biokimiawi Mutlak:</strong> Asetil-KoA pada mamalia <strong>TIDAK DAPAT</strong> diubah kembali menjadi glukosa/piruvat karena reaksi PDC bersifat ireversibel satu arah!
                </div>
              </div>
            )}
          </div>

          {/* Kuis Interaktif Singkat Anabolisme */}
          <div className="bg-white rounded-3xl border border-[#E5E2D9] p-4 text-xs space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#3E3E3E] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                Refleksi Anabolisme
              </span>
              <button
                onClick={() => setShowQuiz(!showQuiz)}
                className="text-[11px] font-semibold text-[#6B705C] hover:underline cursor-pointer"
              >
                {showQuiz ? 'Tutup' : 'Uji Pemahaman'}
              </button>
            </div>

            {showQuiz && (
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E2D9] space-y-2">
                <p className="text-[#3E3E3E] font-medium text-[11px]">
                  Mengapa glikogen otot TIDAK DAPAT melepaskan glukosa bebas ke dalam sirkulasi darah saat tubuh puasa?
                </p>
                <div className="space-y-1">
                  {[
                    { id: '1', text: 'Otot kekurangan enzim Glukosa-6-Fosfatase' },
                    { id: '2', text: 'Glikogen otot memiliki struktur ikatan yang berbeda dari hati' }
                  ].map((ans) => (
                    <button
                      key={ans.id}
                      onClick={() => setQuizAnswer(ans.id)}
                      className={`w-full text-left p-1.5 rounded-lg border text-[10.5px] font-semibold transition-all ${
                        quizAnswer === ans.id
                          ? ans.id === '1'
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                            : 'bg-red-100 border-red-300 text-red-900'
                          : 'bg-white border-[#E5E2D9] text-[#706B5C]'
                      }`}
                    >
                      {ans.text}
                    </button>
                  ))}
                </div>
                {quizAnswer && (
                  <p className={`text-[10px] p-2 rounded-lg ${
                    quizAnswer === '1' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                  }`}>
                    {quizAnswer === '1'
                      ? '✅ Benar! Sel otot tidak memiliki Glukosa-6-Fosfatase sehingga G6P langsung diarahkan ke glikolisis untuk kontraksi otot itu sendiri.'
                      : '❌ Kurang tepat. Jawaban yang tepat adalah ketiadaan enzim Glucose-6-Phosphatase di otot.'}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}

      {/* Footer Navigasi Lanjut */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#706B5C] hover:bg-[#F5F2EA] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={onCompleteAndNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6B705C] hover:bg-[#585D4B] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Tandai Selesai & Lanjut: Integrasi Fisiologis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
