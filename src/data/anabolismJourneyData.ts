/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AnabolismStepData {
  id: string;
  stepNumber: number;
  module: 'CONCEPT' | 'GLYCOGENESIS' | 'GLUCONEOGENESIS' | 'LIPOGENESIS' | 'AMINO_ACIDS' | 'INTEGRATION';
  moduleTitle: string;
  title: string;
  location: string;
  substrate: string;
  product: string;
  reactionEquation: string;
  enzyme: string;
  cofactors: string;
  energyInput: string;
  energyOutput: string;
  carbonCountBefore: number;
  carbonCountAfter: number;
  bondType: string;
  explanation: string;
  biologicalFunction: string;
  cumulativeCounters: {
    atp: number;
    utp: number;
    gtp: number;
    nadph: number;
    productCount: string;
  };
  animationState: {
    cameraTarget: [number, number, number];
    cameraPosition: [number, number, number];
    activeSubstrateType: 'GLUCOSE' | 'G6P' | 'G1P' | 'UDP_GLUCOSE' | 'GLYCOGEN_PRIMER' | 'GLYCOGEN_CHAIN' | 'GLYCOGEN_BRANCH' | 'PYRUVATE' | 'OXALOACETATE' | 'MALATE' | 'PEP' | 'F16BP' | 'CITRATE' | 'ACETYL_COA' | 'MALONYL_COA' | 'PALMITATE' | 'TAG' | 'AMINO_ACID' | 'MAP';
    compartment: 'CYTOSOL' | 'MITOCHONDRIA' | 'ER_LUMEN' | 'ADIPOCYTE' | 'MULTI';
    carbonCount: number;
    highlightPhosphate?: boolean;
    highlightBranch?: boolean;
    highlightNonReducingEnd?: boolean;
    cofactorAction?: 'USE_ATP' | 'USE_UTP' | 'USE_GTP' | 'USE_NADPH' | 'USE_NADH' | 'TRANSFER_AMINO' | 'RELEASE_CO2' | 'RELEASE_PI' | 'CITRATE_SHUTTLE';
  };
}

export const ANABOLISM_JOURNEY_STEPS: AnabolismStepData[] = [
  // ==========================================
  // MODUL 1: KONSEP ANABOLISME
  // ==========================================
  {
    id: 'anab-1',
    stepNumber: 1,
    module: 'CONCEPT',
    moduleTitle: 'Modul 1: Konsep Anabolisme',
    title: 'Prinsip Dasar Reaksi Biosintesis Endergonik',
    location: 'Sitosol & Mitokondria Sel Seluruh Tubuh',
    substrate: 'Molekul Sederhana (Glukosa, Piruvat, Asam Amino, Gliserol)',
    product: 'Makromolekul Kompleks (Glikogen, Trigliserida, Protein)',
    reactionEquation: 'Prekursor Sederhana + ATP / UTP / GTP + NADPH → Makromolekul Kompleks + ADP + NADP⁺',
    enzyme: 'Sistem Enzim Biosintetik Anabolik Terkoordinasi',
    cofactors: 'ATP, UTP, GTP, NADPH, Biotin, Mg²⁺',
    energyInput: 'Endergonik (Membutuhkan input energi dan daya reduksi)',
    energyOutput: 'Tersimpan dalam ikatan kimia makromolekul',
    carbonCountBefore: 3,
    carbonCountAfter: 6,
    bondType: 'Kovalen (Glikosidik, Ester, Peptida)',
    explanation: 'Anabolisme adalah rangkaian reaksi metabolik yang membangun molekul kompleks dari molekul yang lebih sederhana dan bersifat endergonik (memerlukan energi).',
    biologicalFunction: 'Menyimpan energi berlebih sebagai glikogen (jangka pendek) dan lemak (jangka panjang), serta mensintesis kerangka struktural sel.',
    cumulativeCounters: {
      atp: 0,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: 'Kerangka Dasar Siap'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.5, 7.5],
      activeSubstrateType: 'GLUCOSE',
      compartment: 'CYTOSOL',
      carbonCount: 6
    }
  },

  // ==========================================
  // MODUL 2: GLIKOGENESIS (TAHAP 1–6 + REGULASI)
  // ==========================================
  {
    id: 'anab-2',
    stepNumber: 2,
    module: 'GLYCOGENESIS',
    moduleTitle: 'Modul 2: Glikogenesis',
    title: 'Tahap 1: Fosforilasi Glukosa Bebas Menjadi G6P',
    location: 'Sitosol Sel Hati & Otot Rangka',
    substrate: 'Glukosa + ATP',
    product: 'Glukosa-6-fosfat + ADP',
    reactionEquation: 'Glukosa + ATP → Glukosa-6-fosfat + ADP',
    enzyme: 'Glukokinase (Hati) / Heksokinase (Otot Rangka)',
    cofactors: 'Mg²⁺',
    energyInput: '1 ATP',
    energyOutput: '0 ATP',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Fosfoester pada C6',
    explanation: 'Gugus fosfat dari ATP berpindah ke gugus hidroksil karbon 6 glukosa. Menjebak glukosa di dalam sel dan mengawali jalur anabolik.',
    biologicalFunction: 'Aktivasi metabolik awal glukosa intraseluler sehingga tidak dapat berdifusi balik menembus transporter GLUT.',
    cumulativeCounters: {
      atp: 1,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: '1 Glukosa-6-fosfat'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'G6P',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightPhosphate: true,
      cofactorAction: 'USE_ATP'
    }
  },
  {
    id: 'anab-3',
    stepNumber: 3,
    module: 'GLYCOGENESIS',
    moduleTitle: 'Modul 2: Glikogenesis',
    title: 'Tahap 2: Isomerisasi Reversibel G6P Menjadi G1P',
    location: 'Sitosol Sel Hati & Otot Rangka',
    substrate: 'Glukosa-6-fosfat',
    product: 'Glukosa-1-fosfat',
    reactionEquation: 'Glukosa-6-fosfat ⇌ Glukosa-1-fosfat',
    enzyme: 'Fosfoglukomutase',
    cofactors: 'Glukosa-1,6-bisfosfat (Intermediat enzim berfosforilasi), Mg²⁺',
    energyInput: '0',
    energyOutput: '0',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Fosfoester pada C1',
    explanation: 'Gugus fosfat berpindah secara intramolekuler dari karbon 6 menuju karbon 1 melalui perantara enzim berfosforilasi. Rantai 6C tetap utuh.',
    biologicalFunction: 'Mengubah struktur glukosa menjadi isomer G1P yang kompatibel dengan enzim pembentuk nukleotida gula.',
    cumulativeCounters: {
      atp: 1,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: '1 Glukosa-1-fosfat'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'G1P',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightPhosphate: true
    }
  },
  {
    id: 'anab-4',
    stepNumber: 4,
    module: 'GLYCOGENESIS',
    moduleTitle: 'Modul 2: Glikogenesis',
    title: 'Tahap 3: Aktivasi Glukosa Menjadi UDP-Glukosa',
    location: 'Sitosol Sel Hati & Otot Rangka',
    substrate: 'Glukosa-1-fosfat + UTP',
    product: 'UDP-glukosa + 2 Pi (via hidrolisis PPi)',
    reactionEquation: 'Glukosa-1-fosfat + UTP → UDP-glukosa + PPi (dilanjutkan PPi + H₂O → 2 Pi)',
    enzyme: 'UDP-glukosa pirofosforilase & Pirofosfatase anorganik',
    cofactors: 'Mg²⁺',
    energyInput: '1 UTP (setara 1 ATP)',
    energyOutput: 'Energi pendorong termodinamika dari hidrolisis PPi',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Fosfoanhidrida-Nukleotida',
    explanation: 'Gugus uridilil dari UTP ditransfer ke G1P membentuk UDP-glukosa. Hidrolisis pirofosfat (PPi) oleh pirofosfatase anorganik mendorong reaksi ke arah pembentukan produk.',
    biologicalFunction: 'Menghasilkan UDP-glukosa yang merupakan donor glukosil aktif berenergi tinggi untuk polimerisasi glikogen.',
    cumulativeCounters: {
      atp: 1,
      utp: 1,
      gtp: 0,
      nadph: 0,
      productCount: '1 UDP-Glukosa Aktif'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'UDP_GLUCOSE',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      cofactorAction: 'USE_UTP'
    }
  },
  {
    id: 'anab-5',
    stepNumber: 5,
    module: 'GLYCOGENESIS',
    moduleTitle: 'Modul 2: Glikogenesis',
    title: 'Tahap 4: Pembentukan Primer Oleh Protein Glikogenin',
    location: 'Sitosol Sel Hati & Otot Rangka',
    substrate: 'UDP-glukosa + Protein Glikogenin',
    product: 'Primer Glikogen (Oligosakarida ~8 Glukosa terikat Glikogenin) + UDP',
    reactionEquation: 'UDP-glukosa + Glikogenin → Primer Glikogen-Glikogenin + UDP',
    enzyme: 'Glikogenin (Aktivitas glukosiltransferase autokatalitik)',
    cofactors: 'Mn²⁺',
    energyInput: '0 langsung (menggunakan energi ikatan UDP-glukosa)',
    energyOutput: '1 UDP dilepaskan',
    carbonCountBefore: 6,
    carbonCountAfter: 48,
    bondType: 'O-glikosidik pada residu Tirosin-194 glikogenin',
    explanation: 'Glikogen sintase tidak mampu memulai sintesis rantai baru tanpa primer. Protein glikogenin mengikat unit glukosa awal secara autokatalitik membentuk rantai pendek primer.',
    biologicalFunction: 'Menyediakan primer obligat dan bertindak sebagai jangkar inti struktur granula glikogen seluler.',
    cumulativeCounters: {
      atp: 1,
      utp: 1,
      gtp: 0,
      nadph: 0,
      productCount: 'Primer Glikogenin Inti'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.4, 7.2],
      activeSubstrateType: 'GLYCOGEN_PRIMER',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightNonReducingEnd: true
    }
  },
  {
    id: 'anab-6',
    stepNumber: 6,
    module: 'GLYCOGENESIS',
    moduleTitle: 'Modul 2: Glikogenesis',
    title: 'Tahap 5: Pemanjangan Rantai Linier α(1→4)',
    location: 'Sitosol Sel Hati & Otot Rangka',
    substrate: 'UDP-glukosa + Rantai Glikogen(n)',
    product: 'Rantai Glikogen(n+1) + UDP',
    reactionEquation: 'UDP-glukosa + Glikogen(n) → UDP + Glikogen(n+1)',
    enzyme: 'Glikogen Sintase',
    cofactors: 'Glukosa-6-fosfat (Aktivator allosterik pada otot/hati)',
    energyInput: 'Menggunakan donor UDP-glukosa aktif',
    energyOutput: 'UDP dilepaskan',
    carbonCountBefore: 48,
    carbonCountAfter: 54,
    bondType: 'Ikatan α(1→4) Glikosidik',
    explanation: 'Glikogen sintase mentransfer unit glukosa dari UDP-glukosa ke gugus hidroksil karbon 4 di ujung non-pereduksi rantai glikogen yang sedang tumbuh.',
    biologicalFunction: 'Membangun tulang punggung rantai linier amilosa glikogen untuk memadatkan ribuan unit glukosa.',
    cumulativeCounters: {
      atp: 1,
      utp: 1,
      gtp: 0,
      nadph: 0,
      productCount: 'Polimer Linier α(1→4)'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.4, 7.2],
      activeSubstrateType: 'GLYCOGEN_CHAIN',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightNonReducingEnd: true
    }
  },
  {
    id: 'anab-7',
    stepNumber: 7,
    module: 'GLYCOGENESIS',
    moduleTitle: 'Modul 2: Glikogenesis',
    title: 'Tahap 6: Pembentukan Cabang Ikatan α(1→6)',
    location: 'Sitosol Sel Hati & Otot Rangka',
    substrate: 'Segmen Terminal Rantai Glikogen (Panjang ≥ 11 Glukosa)',
    product: 'Glikogen Bercabang Multi-Ujung Non-Pereduksi',
    reactionEquation: 'Segmen 6–8 residu glukosa dipindahkan ke posisi internal C6 rantai yang sama/berdekatan',
    enzyme: 'Branching Enzyme (Amylo-(1,4→1,6)-transglycosylase)',
    cofactors: 'None',
    energyInput: '0 (Reaksi transglikosilasi)',
    energyOutput: '0',
    carbonCountBefore: 66,
    carbonCountAfter: 66,
    bondType: 'Ikatan α(1→6) Glikosidik pada Titik Cabang',
    explanation: 'Enzim pembuat cabang memotong segmen terminal 6–8 residu dan menyambungkannya kembali melalui ikatan α(1→6). Glikogen menjadi pohon bercabang kompak.',
    biologicalFunction: 'Meningkatkan kelarutan glikogen dan menciptakan banyak ujung non-pereduksi untuk laju sintesis maupun pemecahan energi yang sangat cepat.',
    cumulativeCounters: {
      atp: 1,
      utp: 1,
      gtp: 0,
      nadph: 0,
      productCount: 'Partikel Glikogen Bercabang'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.4, 7.5],
      activeSubstrateType: 'GLYCOGEN_BRANCH',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightBranch: true,
      highlightNonReducingEnd: true
    }
  },
  {
    id: 'anab-8',
    stepNumber: 8,
    module: 'GLYCOGENESIS',
    moduleTitle: 'Modul 2: Glikogenesis',
    title: 'Ringkasan Biaya Energi & Regulasi Hormonal Glikogenesis',
    location: 'Sitosol Hati (Glukosa Darah) vs Otot (Kontraksi Lokal)',
    substrate: 'Glukosa Bebas + 1 ATP + 1 UTP',
    product: 'Residu Glikogen Terinkorporasi + ADP + UDP + 2 Pi',
    reactionEquation: 'Glukosa + ATP + UTP + H₂O → Glikogen(n+1) + ADP + UDP + 2 Pi',
    enzyme: 'Regulasi Alosterik & Fosforilasi Reversibel (Insulin vs Glukagon / Epinefrin)',
    cofactors: 'PP-1 (Protein Fosfatase 1), PKA, Kalsium-Kalmodulin',
    energyInput: '2 Ikatan Fosfat Berenergi Tinggi (1 ATP + 1 UTP)',
    energyOutput: '0 ATP (Jalur Anabolik Murni)',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Polimer Glikogen Kompleks',
    explanation: 'Insulin mengaktifkan Protein Fosfatase-1 (PP-1) yang mendefosforilasi dan mengaktifkan Glikogen Sintase. Glukagon (pada hati) dan Epinefrin (pada otot) menghentikan glikogenesis.',
    biologicalFunction: 'Otot tidak melepaskan glukosa bebas ke darah karena tidak memiliki glukosa-6-fosfatase; glikogen otot murni dipakai untuk kontraksi jaringan.',
    cumulativeCounters: {
      atp: 1,
      utp: 1,
      gtp: 0,
      nadph: 0,
      productCount: 'Glikogen Stabil Sitosol'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.5, 7.5],
      activeSubstrateType: 'GLYCOGEN_BRANCH',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightBranch: true
    }
  },

  // ==========================================
  // MODUL 3: GLUKONEOGENESIS (3 REAKSI BYPASS + CORI)
  // ==========================================
  {
    id: 'anab-9',
    stepNumber: 9,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Pintu Masuk Prekursor Non-Karbohidrat',
    location: 'Hati & Korteks Ginjal (Kondisi Puasa / Hipoglikemia)',
    substrate: 'Laktat, Gliserol, Asam Amino Glukogenik (Alanin, Glutamat)',
    product: 'Piruvat & Dihidroksiaseton Fosfat (DHAP)',
    reactionEquation: '1. Laktat + NAD⁺ → Piruvat + NADH | 2. Gliserol + ATP + NAD⁺ → DHAP + ADP + NADH',
    enzyme: 'Laktat Dehidrogenase (LDH), Gliserol Kinase, G3PDH',
    cofactors: 'NAD⁺, Mg²⁺',
    energyInput: '1 ATP (pada jalur gliserol)',
    energyOutput: 'NADH pereduksi',
    carbonCountBefore: 3,
    carbonCountAfter: 3,
    bondType: 'Keto-Asam & Triosa Fosfat',
    explanation: 'Glukoneogenesis membentuk glukosa baru dari prekursor non-karbohidrat. Asam lemak rantai genap TIDAK DAPAT menghasilkan glukosa bersih pada manusia.',
    biologicalFunction: 'Menjaga ketersediaan glukosa darah vital untuk otak dan eritrosit saat asupan karbohidrat nol atau puasa berkepanjangan.',
    cumulativeCounters: {
      atp: 0,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: '2 Molekul Piruvat Prekursor'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'PYRUVATE',
      compartment: 'MITOCHONDRIA',
      carbonCount: 3
    }
  },
  {
    id: 'anab-10',
    stepNumber: 10,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Bypass 1A (Mitokondria): Karboksilasi Piruvat Menjadi OAA',
    location: 'Matriks Mitokondria Sel Hati',
    substrate: '2 Piruvat + 2 CO₂ + 2 ATP + 2 H₂O',
    product: '2 Oksaloasetat + 2 ADP + 2 Pi',
    reactionEquation: '2 Piruvat + 2 CO₂ + 2 ATP + 2 H₂O → 2 Oksaloasetat + 2 ADP + 2 Pi',
    enzyme: 'Piruvat Karboksilase',
    cofactors: 'Biotin (Vitamin B7), Mg²⁺, Asetil-KoA (Aktivator Alosterik Mutlak)',
    energyInput: '2 ATP',
    energyOutput: '0 ATP',
    carbonCountBefore: 3,
    carbonCountAfter: 4,
    bondType: 'Karboksilasi (Pembentukan ikatan C-C baru)',
    explanation: 'Bypass pertama dari reaksi ireversibel Piruvat Kinase. Piruvat karboksilase memfiksasi CO₂ ke piruvat (3C) membentuk oksaloasetat (4C) di dalam matriks mitokondria.',
    biologicalFunction: 'Mengawali pembentukan kerangka 4-karbon berenergi tinggi yang siap dikonversi menjadi fosfoenolpiruvat.',
    cumulativeCounters: {
      atp: 2,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: '2 Oksaloasetat (4C)'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'OXALOACETATE',
      compartment: 'MITOCHONDRIA',
      carbonCount: 4,
      cofactorAction: 'USE_ATP'
    }
  },
  {
    id: 'anab-11',
    stepNumber: 11,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Transpor Malat Shuttle Menembus Membran Mitokondria',
    location: 'Matriks Mitokondria → Membran Dalam → Sitosol',
    substrate: '2 Oksaloasetat (Matriks) + 2 NADH',
    product: '2 Oksaloasetat (Sitosol) + 2 NADH',
    reactionEquation: 'Oksaloasetat + NADH → Malat (Mitokondria) → Transporter Malat-αKG → Malat + NAD⁺ → OAA + NADH (Sitosol)',
    enzyme: 'Malat Dehidrogenase Mitokondrial & Sitosolik',
    cofactors: 'NADH / NAD⁺',
    energyInput: '0 langsung (Shuttle redoks)',
    energyOutput: 'NADH dipindahkan ke sitosol untuk tahap gliseraldehida-3-P',
    carbonCountBefore: 4,
    carbonCountAfter: 4,
    bondType: 'Interkonversi Hidroksil-Keto',
    explanation: 'Oksaloasetat TIDAK BISA bebas menembus membran dalam mitokondria. OAA direduksi menjadi malat, melintasi membran via transporter khusus, lalu dioksidasi kembali menjadi OAA di sitosol.',
    biologicalFunction: 'Menyeberangkan kerangka karbon 4C sekaligus mentransfer ekuivalen pereduksi NADH yang sangat dibutuhkan glukoneogenesis di sitosol.',
    cumulativeCounters: {
      atp: 2,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: '2 OAA di Sitosol'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.3, 7.0],
      activeSubstrateType: 'MALATE',
      compartment: 'CYTOSOL',
      carbonCount: 4,
      cofactorAction: 'CITRATE_SHUTTLE'
    }
  },
  {
    id: 'anab-12',
    stepNumber: 12,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Bypass 1B (Sitosol): Dekarboksilasi OAA Menjadi PEP',
    location: 'Sitosol Sel Hati & Ginjal',
    substrate: '2 Oksaloasetat + 2 GTP',
    product: '2 Fosfoenolpiruvat (PEP) + 2 GDP + 2 CO₂',
    reactionEquation: '2 Oksaloasetat + 2 GTP → 2 Fosfoenolpiruvat + 2 GDP + 2 CO₂',
    enzyme: 'Phosphoenolpyruvate carboxykinase (PEPCK)',
    cofactors: 'Mg²⁺, Mn²⁺',
    energyInput: '2 GTP (Setara 2 ATP)',
    energyOutput: '2 CO₂ dilepaskan',
    carbonCountBefore: 4,
    carbonCountAfter: 3,
    bondType: 'Enol-Fosfat Berenergi Sangat Tinggi',
    explanation: 'PEPCK melepaskan kembali molekul CO₂ yang sebelumnya ditambahkan dan memfosforilasi enol menggunakan gugus fosfat dari GTP. Terbentuk 2 molekul PEP (3C).',
    biologicalFunction: 'Menuntaskan bypass ireversibel pertama dan menghasilkan molekul PEP berenergi bebas sangat tinggi untuk mendorong arah balik glikolisis.',
    cumulativeCounters: {
      atp: 2,
      utp: 0,
      gtp: 2,
      nadph: 0,
      productCount: '2 Fosfoenolpiruvat (PEP)'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'PEP',
      compartment: 'CYTOSOL',
      carbonCount: 3,
      highlightPhosphate: true,
      cofactorAction: 'USE_GTP'
    }
  },
  {
    id: 'anab-13',
    stepNumber: 13,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Tahap Reversibel Terbalik Menuju Fruktosa-1,6-Bisfosfat',
    location: 'Sitosol Sel Hati & Ginjal',
    substrate: '2 PEP + 2 ATP + 2 NADH + 2 H₂O',
    product: '1 Fruktosa-1,6-bisfosfat + 2 ADP + 2 NAD⁺ + 2 Pi',
    reactionEquation: '2 PEP → 2 2-PG → 2 3-PG → 2 1,3-BPG → 2 G3P ⇌ G3P + DHAP → Fruktosa-1,6-bisfosfat',
    enzyme: 'Enolase, Fosfogliserat Mutase, Fosfogliserat Kinase, G3PDH, Triosa Fosfat Isomerase, Aldolase',
    cofactors: 'Mg²⁺, NADH',
    energyInput: '2 ATP + 2 NADH',
    energyOutput: '2 Pi dilepaskan',
    carbonCountBefore: 3,
    carbonCountAfter: 6,
    bondType: 'Kondensasi Aldol (3C + 3C → 6C)',
    explanation: 'Enzim-enzim reversibel glikolisis membalikkan alur: PEP dihidrasi jadi 2-PG, 3-PG, difosforilasi (2 ATP) jadi 1,3-BPG, direduksi (2 NADH) jadi G3P/DHAP, lalu dikondensasi aldolase menjadi F-1,6-BP (6C).',
    biologicalFunction: 'Menggabungkan dua molekul triosa 3C menjadi satu kerangka heksosa 6C berfosfat ganda.',
    cumulativeCounters: {
      atp: 4,
      utp: 0,
      gtp: 2,
      nadph: 0,
      productCount: '1 Fruktosa-1,6-bisfosfat'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'F16BP',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightPhosphate: true,
      cofactorAction: 'USE_NADH'
    }
  },
  {
    id: 'anab-14',
    stepNumber: 14,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Bypass 2: Hidrolisis Fruktosa-1,6-Bisfosfat Menjadi F6P',
    location: 'Sitosol Sel Hati & Ginjal',
    substrate: 'Fruktosa-1,6-bisfosfat + H₂O',
    product: 'Fruktosa-6-fosfat + Pi',
    reactionEquation: 'Fruktosa-1,6-bisfosfat + H₂O → Fruktosa-6-fosfat + Pi',
    enzyme: 'Fruktosa-1,6-bisfosfatase (FBPase-1)',
    cofactors: 'Mg²⁺ (Dihambat kuat oleh F-2,6-BP dan AMP)',
    energyInput: '0 (Bukan sintesis ATP, melainkan pelepasan fosfat anorganik hidrolisis)',
    energyOutput: '1 Pi dilepaskan',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Pelepasan Ikatan Fosfoester C1',
    explanation: 'Bypass kedua dari reaksi ireversibel PFK-1. Enzim FBPase-1 menghidrolisis gugus fosfat pada karbon 1 melepaskan Pi bebas. Reaksi ini TIDAK menghasilkan ATP.',
    biologicalFunction: 'Titik kontrol alosterik utama glukoneogenesis; dihambat saat sel kaya energi AMP/F26BP dan dipacu saat glukagon tinggi.',
    cumulativeCounters: {
      atp: 4,
      utp: 0,
      gtp: 2,
      nadph: 0,
      productCount: '1 Fruktosa-6-fosfat'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'G6P',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightPhosphate: true,
      cofactorAction: 'RELEASE_PI'
    }
  },
  {
    id: 'anab-15',
    stepNumber: 15,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Tahap Isomerisasi F6P Menjadi Glukosa-6-Fosfat',
    location: 'Sitosol Sel Hati & Ginjal',
    substrate: 'Fruktosa-6-fosfat',
    product: 'Glukosa-6-fosfat',
    reactionEquation: 'Fruktosa-6-fosfat ⇌ Glukosa-6-fosfat',
    enzyme: 'Fosfoglukoisomerase',
    cofactors: 'Mg²⁺',
    energyInput: '0',
    energyOutput: '0',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Isomerisasi Aldosa-Ketosa',
    explanation: 'Cincin furanosa fruktosa-6-fosfat diisomerisasi kembali menjadi cincin piranosa aldosa glukosa-6-fosfat melalui reaksi kesetimbangan.',
    biologicalFunction: 'Mempersiapkan substrat heksosa fosfat untuk tahap akhir pelepasan glukosa di lumen retikulum endoplasma.',
    cumulativeCounters: {
      atp: 4,
      utp: 0,
      gtp: 2,
      nadph: 0,
      productCount: '1 Glukosa-6-fosfat'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'G6P',
      compartment: 'CYTOSOL',
      carbonCount: 6,
      highlightPhosphate: true
    }
  },
  {
    id: 'anab-16',
    stepNumber: 16,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Bypass 3 (Lumen RE): Pelepasan Glukosa Bebas ke Darah',
    location: 'Lumen Retikulum Endoplasma Sel Hati & Ginjal',
    substrate: 'Glukosa-6-fosfat + H₂O',
    product: 'D-Glukosa Bebas + Pi',
    reactionEquation: 'Glukosa-6-fosfat + H₂O → Glukosa + Pi',
    enzyme: 'Glukosa-6-fosfatase (Kompleks membran transporter T1, T2, T3)',
    cofactors: 'Mg²⁺, Protein Pengikat Kalsium',
    energyInput: '0',
    energyOutput: '1 Pi dilepaskan',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Hidrolisis Ester Fosfat C6',
    explanation: 'G6P ditranspor ke lumen RE oleh transporter T1, di mana Glukosa-6-fosfatase memotong gugus fosfat. Glukosa bebas keluar ke sitosol lalu ke darah melalui GLUT2. Otot rangka TIDAK memiliki enzim ini.',
    biologicalFunction: 'Membebaskan molekul glukosa netral ke dalam sirkulasi darah sistemik untuk mengatasi hipoglikemia.',
    cumulativeCounters: {
      atp: 4,
      utp: 0,
      gtp: 2,
      nadph: 0,
      productCount: '1 Glukosa Bebas Netral'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.3, 7.0],
      activeSubstrateType: 'GLUCOSE',
      compartment: 'ER_LUMEN',
      carbonCount: 6,
      cofactorAction: 'RELEASE_PI'
    }
  },
  {
    id: 'anab-17',
    stepNumber: 17,
    module: 'GLUCONEOGENESIS',
    moduleTitle: 'Modul 3: Glukoneogenesis',
    title: 'Neraca Energi Bersih Glukoneogenesis & Siklus Cori',
    location: 'Sirkulasi Darah Organ: Otot Rangka ↔ Darah ↔ Hati',
    substrate: '2 Piruvat + 4 ATP + 2 GTP + 2 NADH + 6 H₂O',
    product: '1 Glukosa + 4 ADP + 2 GDP + 6 Pi + 2 NAD⁺ + 2 H⁺',
    reactionEquation: '2 Laktat (Otot) → Darah → 2 Laktat (Hati) + 6 Ikatan Fosfat ~P → 1 Glukosa → Darah → Otot',
    enzyme: 'Siklus Cori Terintegrasi & Poros Hormonal Glukagon / Insulin / Kortisol',
    cofactors: 'Regulasi Multihormonal',
    energyInput: 'Setara 6 Ikatan Fosfat Berenergi Tinggi (4 ATP + 2 GTP) + 2 NADH',
    energyOutput: 'Mencegah Asidosis Laktat Fatal di Jaringan Tepi',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Sirkulasi Metabolik Interorgan',
    explanation: 'Siklus Cori TIDAK menghasilkan keuntungan energi bagi hati; hati justru mengorbankan 6 ikatan fosfat berenergi tinggi untuk meregenerasi glukosa dari laktat otot.',
    biologicalFunction: 'Mendaur ulang produk limbah metabolisme anaerobik dan mencegah penumpukan asam laktat berbahaya.',
    cumulativeCounters: {
      atp: 4,
      utp: 0,
      gtp: 2,
      nadph: 0,
      productCount: 'Resintesis 1 Glukosa Selesai'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.5, 7.5],
      activeSubstrateType: 'GLUCOSE',
      compartment: 'MULTI',
      carbonCount: 6
    }
  },

  // ==========================================
  // MODUL 4: LIPOGENESIS (DARI SURPLUS KARBOHIDRAT)
  // ==========================================
  {
    id: 'anab-18',
    stepNumber: 18,
    module: 'LIPOGENESIS',
    moduleTitle: 'Modul 4: Lipogenesis',
    title: 'Surplus Glukosa & Citrate Shuttle Menembus Mitokondria',
    location: 'Mitokondria → Membran Dalam → Sitosol Sel Hati & Adiposit',
    substrate: 'Asetil-KoA + Oksaloasetat + ATP + CoA-SH',
    product: 'Asetil-KoA (Sitosol) + Oksaloasetat + ADP + Pi',
    reactionEquation: '1. Asetil-KoA + OAA → Sitrat (Mitokondria) | 2. Sitrat + CoA-SH + ATP → Asetil-KoA + OAA + ADP + Pi (Sitosol)',
    enzyme: 'Sitrat Sintase & ATP-Citrate Lyase',
    cofactors: 'Mg²⁺, CoA-SH',
    energyInput: '1 ATP',
    energyOutput: 'Asetil-KoA tersedia di sitosol',
    carbonCountBefore: 2,
    carbonCountAfter: 2,
    bondType: 'Ikatan Tioester Asetil-KoA',
    explanation: 'Asetil-KoA mitokondria TIDAK DAPAT langsung menembus membran dalam. Bersama OAA, ia berkondensasi menjadi sitrat, keluar ke sitosol, lalu dipecah oleh ATP-citrate lyase.',
    biologicalFunction: 'Menyediakan bahan baku karbon 2C di sitosol untuk sintesis asam lemak ketika pasokan glukosa dan ATP sel melimpah.',
    cumulativeCounters: {
      atp: 1,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: 'Asetil-KoA Sitosolik'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'ACETYL_COA',
      compartment: 'CYTOSOL',
      carbonCount: 2,
      cofactorAction: 'CITRATE_SHUTTLE'
    }
  },
  {
    id: 'anab-19',
    stepNumber: 19,
    module: 'LIPOGENESIS',
    moduleTitle: 'Modul 4: Lipogenesis',
    title: 'Tahap Komitmen ACC: Karboksilasi Menjadi Malonil-KoA',
    location: 'Sitosol Sel Hati & Jaringan Adiposa',
    substrate: 'Asetil-KoA + HCO₃⁻ + ATP',
    product: 'Malonil-KoA + ADP + Pi',
    reactionEquation: 'Asetil-KoA + HCO₃⁻ + ATP → Malonil-KoA + ADP + Pi',
    enzyme: 'Asetil-KoA Karboksilase (ACC)',
    cofactors: 'Biotin (Vitamin B7), Mg²⁺, Sitrat (Aktivator polimerisasi ACC)',
    energyInput: '1 ATP',
    energyOutput: '0 ATP',
    carbonCountBefore: 2,
    carbonCountAfter: 3,
    bondType: 'Karboksilasi Tioester (3C)',
    explanation: 'Enzim ACC mengikat CO₂ dari bikarbonat ke asetil-KoA menghasilkan malonil-KoA (3C). Ini adalah tahap komitmen yang tidak dapat berbalik (rate-limiting step).',
    biologicalFunction: 'Mengaktifkan donor 2-karbon (malonil-KoA) dan secara bersamaan menghambat CPT-I untuk mencegah pemecahan asam lemak simultan.',
    cumulativeCounters: {
      atp: 2,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: 'Malonil-KoA Donor'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'MALONYL_COA',
      compartment: 'CYTOSOL',
      carbonCount: 3,
      cofactorAction: 'USE_ATP'
    }
  },
  {
    id: 'anab-20',
    stepNumber: 20,
    module: 'LIPOGENESIS',
    moduleTitle: 'Modul 4: Lipogenesis',
    title: 'Siklus Berulang Kompleks Fatty Acid Synthase (FAS)',
    location: 'Sitosol Sel Hati & Adiposit',
    substrate: '1 Asetil-KoA + 7 Malonil-KoA + 14 NADPH + 14 H⁺',
    product: 'Asam Palmitat (16C) + 7 CO₂ + 8 CoA-SH + 14 NADP⁺ + 6 H₂O',
    reactionEquation: '8 Asetil-KoA + 7 ATP + 14 NADPH + 14 H⁺ → Palmitat (16C) + 8 CoA + 7 ADP + 7 Pi + 14 NADP⁺ + 6 H₂O',
    enzyme: 'Kompleks Multienzim Fatty Acid Synthase (FAS)',
    cofactors: 'NADPH (dari Jalur Pentosa Fosfat & Enzim Malat), Fosfopantetein (ACP)',
    energyInput: '7 ATP (via pembentukan malonil) + 14 NADPH',
    energyOutput: 'Palmitat 16-karbon jenuh',
    carbonCountBefore: 3,
    carbonCountAfter: 16,
    bondType: 'Kondensasi, Reduksi, Dehidrasi, Reduksi Berulang (7 Putaran)',
    explanation: 'Setiap putaran FAS memanjangkan rantai asam lemak sebanyak 2 karbon melalui 4 reaksi teratur: kondensasi, reduksi oleh NADPH, dehidrasi, dan reduksi kedua oleh NADPH hingga 16C.',
    biologicalFunction: 'Mengonversi kelebihan karbohidrat menjadi rantai hidrokarbon asam lemak kaya energi.',
    cumulativeCounters: {
      atp: 8,
      utp: 0,
      gtp: 0,
      nadph: 14,
      productCount: '1 Asam Palmitat (16C)'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.3, 7.2],
      activeSubstrateType: 'PALMITATE',
      compartment: 'CYTOSOL',
      carbonCount: 16,
      cofactorAction: 'USE_NADPH'
    }
  },
  {
    id: 'anab-21',
    stepNumber: 21,
    module: 'LIPOGENESIS',
    moduleTitle: 'Modul 4: Lipogenesis',
    title: 'Esterifikasi Membentuk Triasilgliserol (Trigliserida)',
    location: 'Retikulum Endoplasma Sel Hati & Adiposit',
    substrate: 'Gliserol-3-Fosfat + 3 Asil-KoA (Asam Lemak Aktif)',
    product: 'Triasilgliserol (TAG) + 3 CoA-SH + Pi',
    reactionEquation: 'Gliserol-3-fosfat + 3 Asil-KoA → Triasilgliserol + 3 CoA-SH + Pi',
    enzyme: 'Gliserol-3-fosfat Asiltransferase (GPAT), AGPAT, DGAT',
    cofactors: 'Mg²⁺, CoA-SH',
    energyInput: '3 ATP (untuk aktivasi asil-KoA sintetase)',
    energyOutput: 'Trigliserida netral hidrofobik',
    carbonCountBefore: 16,
    carbonCountAfter: 51,
    bondType: '3 Ikatan Ester pada Kerangka Gliserol',
    explanation: 'Asam lemak tidak otomatis menjadi lemak cadangan. Tiga rantai asil-KoA diesterifikasi bertahap ke kerangka gliserol-3-fosfat membentuk triasilgliserol netral.',
    biologicalFunction: 'Bentuk simpanan energi jangka panjang paling efisien dalam droplet lemak sel adiposa.',
    cumulativeCounters: {
      atp: 11,
      utp: 0,
      gtp: 0,
      nadph: 14,
      productCount: '1 Triasilgliserol (TAG)'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.4, 7.5],
      activeSubstrateType: 'TAG',
      compartment: 'ADIPOCYTE',
      carbonCount: 16
    }
  },
  {
    id: 'anab-22',
    stepNumber: 22,
    module: 'LIPOGENESIS',
    moduleTitle: 'Modul 4: Lipogenesis',
    title: 'Regulasi Insulin & Pencegahan Oksidasi Bersamaan',
    location: 'Hati & Jaringan Adiposa',
    substrate: 'Insulin Darah Tinggi Pasca-Makan',
    product: 'Lipogenesis Aktif & Penghambatan β-Oksidasi',
    reactionEquation: 'Insulin ↑ → Aktivitas ACC ↑ → Malonil-KoA ↑ → CPT-I Dihambat → β-Oksidasi Non-aktif',
    enzyme: 'Poros Insulin / Protein Fosfatase / CPT-I (Karnitin Palmitoiltransferase I)',
    cofactors: 'Regulasi Hormonal Allosterik Terpadu',
    energyInput: '0',
    energyOutput: 'Pencegahan futile cycle (siklus sia-sia)',
    carbonCountBefore: 51,
    carbonCountAfter: 51,
    bondType: 'Regulasi Fisiologis Reseptor',
    explanation: 'Insulin menstimulasi masuknya glukosa via GLUT4, aktivasi PDH, dan defosforilasi ACC. Malonil-KoA yang terbentuk menghambat enzim CPT-I sehingga asam lemak tidak masuk ke mitokondria untuk dioksidasi.',
    biologicalFunction: 'Menjamin efisiensi anabolik total di mana sintesis dan degradasi lemak tidak berlangsung serentak.',
    cumulativeCounters: {
      atp: 11,
      utp: 0,
      gtp: 0,
      nadph: 14,
      productCount: 'Cadangan Adiposit Stabil'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.5, 7.5],
      activeSubstrateType: 'TAG',
      compartment: 'ADIPOCYTE',
      carbonCount: 16
    }
  },

  // ==========================================
  // MODUL 5: SINTESIS ASAM AMINO NONESENSIAL
  // ==========================================
  {
    id: 'anab-23',
    stepNumber: 23,
    module: 'AMINO_ACIDS',
    moduleTitle: 'Modul 5: Sintesis Asam Amino',
    title: 'Transaminasi Piruvat Menjadi Alanin',
    location: 'Sitosol Seluruh Jaringan (Terutama Hati & Otot)',
    substrate: 'Piruvat (3C) + Glutamat (Donor Amino)',
    product: 'L-Alanin (3C) + α-Ketoglutarat',
    reactionEquation: 'Piruvat + Glutamat ⇌ Alanin + α-Ketoglutarat',
    enzyme: 'Alanin Aminotransferase (ALT / SGPT)',
    cofactors: 'Piridoksal Fosfat (PLP / Vitamin B6)',
    energyInput: '0 (Reaksi reversibel transaminasi)',
    energyOutput: '0',
    carbonCountBefore: 3,
    carbonCountAfter: 3,
    bondType: 'Ikatan C-N Gugus Amino α',
    explanation: 'Gugus amino (-NH₂) dari asam glutamat ditransfer langsung ke kerangka karbon alfa piruvat oleh enzim ALT dengan kofaktor vitamin B6 membentuk asam amino alanin.',
    biologicalFunction: 'Mensintesis asam amino nonesensial alanin dan mendaur ulang nitrogen otot ke hati via Siklus Glukosa-Alanin.',
    cumulativeCounters: {
      atp: 0,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: 'L-Alanin'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'AMINO_ACID',
      compartment: 'CYTOSOL',
      carbonCount: 3,
      cofactorAction: 'TRANSFER_AMINO'
    }
  },
  {
    id: 'anab-24',
    stepNumber: 24,
    module: 'AMINO_ACIDS',
    moduleTitle: 'Modul 5: Sintesis Asam Amino',
    title: 'Transaminasi Oksaloasetat Menjadi Aspartat',
    location: 'Matriks Mitokondria & Sitosol Sel Hati & Ginjal',
    substrate: 'Oksaloasetat (4C) + Glutamat',
    product: 'L-Aspartat (4C) + α-Ketoglutarat',
    reactionEquation: 'Oksaloasetat + Glutamat ⇌ Aspartat + α-Ketoglutarat',
    enzyme: 'Aspartat Aminotransferase (AST / SGOT)',
    cofactors: 'Piridoksal Fosfat (PLP / Vitamin B6)',
    energyInput: '0',
    energyOutput: '0',
    carbonCountBefore: 4,
    carbonCountAfter: 4,
    bondType: 'Ikatan C-N Asam Dikarboksilat',
    explanation: 'Enzim AST mentransfer gugus amino dari glutamat ke oksaloasetat menghasilkan asam amino aspartat. Nitrogen berasal dari donor glutamat, bukan muncul secara tiba-tiba.',
    biologicalFunction: 'Menyediakan aspartat untuk sintesis protein, shuttle malat-aspartat, dan donor nitrogen pada Siklus Urea.',
    cumulativeCounters: {
      atp: 0,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: 'L-Aspartat'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'AMINO_ACID',
      compartment: 'CYTOSOL',
      carbonCount: 4,
      cofactorAction: 'TRANSFER_AMINO'
    }
  },
  {
    id: 'anab-25',
    stepNumber: 25,
    module: 'AMINO_ACIDS',
    moduleTitle: 'Modul 5: Sintesis Asam Amino',
    title: 'Aminasi Reduktif α-Ketoglutarat Menjadi Glutamat',
    location: 'Matriks Mitokondria Sel Hati',
    substrate: 'α-Ketoglutarat (5C) + NH₄⁺ + NADPH + H⁺',
    product: 'L-Glutamat + NADP⁺ + H₂O',
    reactionEquation: 'α-Ketoglutarat + NH₄⁺ + NADPH + H⁺ ⇌ L-Glutamat + NADP⁺ + H₂O',
    enzyme: 'Glutamat Dehidrogenase (GDH)',
    cofactors: 'NADPH / NADH',
    energyInput: '1 NADPH (daya reduksi biosintesis)',
    energyOutput: '0 ATP',
    carbonCountBefore: 5,
    carbonCountAfter: 5,
    bondType: 'Ikatan C-N Asam Amino Universal',
    explanation: 'Ion amonium bebas diikatkan ke kerangka alfa-ketoglutarat (intermediat siklus Krebs) dengan bantuan pereduksi NADPH menghasilkan asam glutamat.',
    biologicalFunction: 'Pintu gerbang penangkapan nitrogen anorganik utama dalam metabolisme asam amino tubuh manusia.',
    cumulativeCounters: {
      atp: 0,
      utp: 0,
      gtp: 0,
      nadph: 1,
      productCount: 'L-Glutamat'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'AMINO_ACID',
      compartment: 'MITOCHONDRIA',
      carbonCount: 5,
      cofactorAction: 'USE_NADPH'
    }
  },
  {
    id: 'anab-26',
    stepNumber: 26,
    module: 'AMINO_ACIDS',
    moduleTitle: 'Modul 5: Sintesis Asam Amino',
    title: 'Biosintesis Serin dari 3-Fosfogliserat Glikolisis',
    location: 'Sitosol Sel Seluruh Tubuh',
    substrate: '3-Fosfogliserat (Glikolisis) + NAD⁺ + Glutamat',
    product: 'L-Serin + NADH + α-Ketoglutarat + Pi',
    reactionEquation: '3-Fosfogliserat → 3-Fosfohidroksipiruvat → 3-Fosfoserin → L-Serin + Pi',
    enzyme: 'Fosfogliserat Dehidrogenase, Fosfoserin Aminotransferase, Fosfoserin Fosfatase',
    cofactors: 'NAD⁺, PLP (B6), Mg²⁺',
    energyInput: '0 Langsung',
    energyOutput: '1 Pi dilepaskan',
    carbonCountBefore: 3,
    carbonCountAfter: 3,
    bondType: 'O-Fosfat Hidrolisis & Transaminasi',
    explanation: 'Intermediat glikolisis 3-fosfogliserat dioksidasi, menerima gugus amino dari glutamat, lalu gugus fosfatnya dihidrolisis menghasilkan asam amino serin.',
    biologicalFunction: 'Prekursor penting sintesis glisin, sistein, fosfolipid membran sfingolipid, dan donor unit satu-karbon folat.',
    cumulativeCounters: {
      atp: 0,
      utp: 0,
      gtp: 0,
      nadph: 1,
      productCount: 'L-Serin'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 1.2, 6.8],
      activeSubstrateType: 'AMINO_ACID',
      compartment: 'CYTOSOL',
      carbonCount: 3,
      cofactorAction: 'TRANSFER_AMINO'
    }
  },

  // ==========================================
  // MODUL 6: HUBUNGAN ANTARJALUR & PETA INTEGRASI
  // ==========================================
  {
    id: 'anab-27',
    stepNumber: 27,
    module: 'INTEGRATION',
    moduleTitle: 'Peta Integrasi Anabolisme',
    title: 'Persimpangan Metabolik: Glukosa-6-Fosfat Sebagai Pusat Jalur',
    location: 'Sitosol & Mitokondria Antar-Organ',
    substrate: 'Glukosa-6-Fosfat (G6P)',
    product: 'Glikogen / Piruvat / NADPH / Asam Lemak / Asam Amino',
    reactionEquation: 'G6P ↔ G1P (Glikogenesis) | G6P ↔ F6P (Glikolisis / Lipogenesis) | G6P → 6PG (Pentosa Fosfat)',
    enzyme: 'Sistem Terkoordinasi: Glikogen Sintase, PFK-1, G6PDH, Glukosa-6-Fosfatase',
    cofactors: 'ATP, UTP, GTP, NADPH, Asetil-KoA',
    energyInput: 'Tergantung status energi (Kenyang vs Puasa)',
    energyOutput: 'Keseimbangan hemostasis metabolik tubuh manusia',
    carbonCountBefore: 6,
    carbonCountAfter: 6,
    bondType: 'Jejaring Metabolik Terpadu',
    explanation: 'G6P berada di persimpangan utama metabolisme karbohidrat: dapat menuju glikogenesis untuk simpanan glikogen, glikolisis untuk ATP, jalur pentosa fosfat untuk daya reduksi NADPH, atau glukoneogenesis saat puasa.',
    biologicalFunction: 'Memastikan distribusi karbon dan energi disesuaikan secara dinamis dengan kebutuhan fisiologis seluruh jaringan tubuh manusia.',
    cumulativeCounters: {
      atp: 0,
      utp: 0,
      gtp: 0,
      nadph: 0,
      productCount: 'Peta Integrasi Utuh'
    },
    animationState: {
      cameraTarget: [0, 0, 0],
      cameraPosition: [0, 2.0, 8.5],
      activeSubstrateType: 'MAP',
      compartment: 'MULTI',
      carbonCount: 6
    }
  }
];

export const ANABOLISM_MODULE_NAV_SECTIONS = [
  { module: 'CONCEPT' as const, label: '1. Konsep Anabolisme', startStep: 1, endStep: 1 },
  { module: 'GLYCOGENESIS' as const, label: '2. Glikogenesis (Glikogen)', startStep: 2, endStep: 8 },
  { module: 'GLUCONEOGENESIS' as const, label: '3. Glukoneogenesis (3 Bypass)', startStep: 9, endStep: 17 },
  { module: 'LIPOGENESIS' as const, label: '4. Lipogenesis (Asam Lemak & TAG)', startStep: 18, endStep: 22 },
  { module: 'AMINO_ACIDS' as const, label: '5. Sintesis Asam Amino', startStep: 23, endStep: 26 },
  { module: 'INTEGRATION' as const, label: '6. Peta Integrasi Antarjalur', startStep: 27, endStep: 27 }
];
