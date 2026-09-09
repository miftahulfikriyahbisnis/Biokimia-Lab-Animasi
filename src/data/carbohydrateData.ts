/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Data Komprehensif Modul Karbohidrat: Dasar, Pencernaan, Katabolisme, Anabolisme, dan Integrasi

export interface CarbTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
}

export interface SubstrateChangeDetail {
  before: string;
  process: string;
  after: string;
  enzyme?: string;
  equation?: string;
}

export interface DigestionStage {
  step: number;
  organ: string;
  title: string;
  subtitle: string;
  mechanism: string;
  scientificExplanation: string;
  simpleExplanation: string;
  enzymes: string[];
  substrates: string[];
  products: string[];
  locationDetail: string;
  whatIsHappening?: string;
  importantMessage?: string;
  bondCleaved?: string;
  substrateChange?: SubstrateChangeDetail;
}

export interface BrushBorderEnzymeInfo {
  name: string;
  substrate: string;
  products: string;
  reactionEquation: string;
  substrateFormula: string;
  productFormula: string;
  physiologicalRole: string;
}

export interface GlycolysisStep {
  stepNumber: number;
  name: string;
  substrate: string;
  product: string;
  enzyme: string;
  cofactor?: string;
  phase: 'INVESTASI' | 'PEMBAYARAN';
  carbonCount: number;
  atpChange: -1 | 0 | 1 | 2; // per 1 molekul glukosa awal (-1 di tahap 1 & 3, +2 di tahap 7 & 10 karena 2 molekul triosa)
  nadhChange: 0 | 2; // +2 di tahap 6
  reactionType: string;
  location: string;
  chemicalExplanation: string;
  substrateFormula: string;
  productFormula: string;
}

export interface KrebsStep {
  stepNumber: number;
  name: string;
  substrate: string;
  product: string;
  enzyme: string;
  carbonCount: number;
  carbonColorNote: string;
  co2Released: boolean;
  nadhProduced: boolean;
  fadh2Produced: boolean;
  gtpProduced: boolean;
  whyItHappens: string;
  chemicalDetail: string;
}

export interface ETCComplexInfo {
  id: string;
  name: string;
  location: string;
  electronSource?: string;
  electronDestination: string;
  protonPumped: number; // Jumlah H⁺ per 2e⁻
  description: string;
  inhibitorExamples?: string;
}

export interface AnabolismPathwayInfo {
  id: 'glycogenesis' | 'gluconeogenesis' | 'cori_cycle' | 'lipogenesis' | 'metabolic_map';
  title: string;
  location: string;
  hormonalControl: string;
  precursors: string[];
  products: string[];
  keyEnzymes: string[];
  energyCostOrYield: string;
  summary: string;
}

// 1. MATERI DASAR KARBOHIDRAT
export const CARB_THEORY_DATA = {
  definition: {
    title: 'Pengertian Metabolisme Karbohidrat',
    content: 'Metabolisme karbohidrat mencakup keseluruhan rangkaian reaksi biokimiawi terkoordinasi yang bertanggung jawab atas pembentukan (anabolisme), pemecahan (katabolisme), dan interkonversi karbohidrat dalam sel organisme hidup untuk menjamin ketersediaan energi seluler (ATP) dan senyawa antara biosintesis.'
  },
  catabolismVsAnabolism: [
    {
      aspect: 'Tujuan Reaksi',
      catabolism: 'Memecah molekul bahan bakar organik kompleks menjadi molekul sederhana (katabolisme)',
      anabolism: 'Menyusun molekul biomolekul kompleks dari prekursor sederhana (anabolisme)'
    },
    {
      aspect: 'Bioenergetika',
      catabolism: 'Eksergonik (menghasilkan energi bebas yang disimpan sebagai ATP, NADH, FADH₂)',
      anabolism: 'Endergonik (memerlukan pasokan energi bebas yang disediakan oleh hidrolisis ATP dan donor elektron NADPH)'
    },
    {
      aspect: 'Pola Jalur',
      catabolism: 'Konvergen: Berbagai molekul bahan bakar (karbohidrat, lipid, protein) bermuara ke senyawa antara yang sama (misal Asetil-KoA)',
      anabolism: 'Divergen / Konstruktif: Sejumlah kecil prekursor sederhana dibangun menjadi beragam molekul kompleks (glikogen, asam lemak, asam nukleat)'
    },
    {
      aspect: 'Contoh Reaksi Utama',
      catabolism: 'Glikolisis, Dekarboksilasi Oksidatif, Siklus Krebs, Rantai Transpor Elektron',
      anabolism: 'Glikogenesis, Glukoneogenesis, Lipogenesis dari karbohidrat, Jalur Pentosa Fosfat'
    }
  ],
  carbohydrateTypes: [
    {
      name: 'Pati (Amilum)',
      category: 'Polisakarida Simpanan Tumbuhan',
      composition: 'Polimer glukosa terdiri atas amilosa (ikatan linear α-1,4) dan amilopektin (ikatan bercabang α-1,6). Merupakan sumber karbohidrat makanan utama manusia (nasi, jagung, kentang).'
    },
    {
      name: 'Glikogen',
      category: 'Polisakarida Simpanan Hewan & Manusia',
      composition: 'Polimer glukosa dengan percabangan α-1,6 yang sangat padat (setiap 8–12 residu ikatan α-1,4). Disimpan di hati dan otot rangka.'
    },
    {
      name: 'Selulosa',
      category: 'Polisakarida Struktural Tumbuhan',
      composition: 'Polimer glukosa dengan ikatan linear β-1,4 glikosidik. TIDAK DAPAT dicerna oleh enzim saluran pencernaan manusia karena manusia tidak memiliki enzim selulase, berfungsi sebagai serat pangan (dietary fiber).'
    },
    {
      name: 'Sukrosa',
      category: 'Disakarida',
      composition: 'Gula meja (tebu/bit), tersusun dari glukosa dan fruktosa yang dihubungkan ikatan α-1,β-2 glikosidik.'
    },
    {
      name: 'Laktosa',
      category: 'Disakarida',
      composition: 'Gula susu, tersusun dari galaktosa dan glukosa dengan ikatan β-1,4 glikosidik. Dihidrolisis oleh enzim laktase di brush border usus.'
    },
    {
      name: 'Fruktosa & Galaktosa',
      category: 'Monosakarida',
      composition: 'Fruktosa (ketoheksosa) ditemukan pada buah dan madu; Galaktosa (aldoheksosa) diperoleh dari hidrolisis laktosa susu. Keduanya dimetabolisme di hati.'
    }
  ],
  majorLocations: [
    {
      organ: 'Saluran Pencernaan & Usus Halus',
      role: 'Pencernaan enzimatik makromolekul pati menjadi disakarida dan monosakarida bebas, serta absorpsi melalui enterosit.'
    },
    {
      organ: 'Hati (Hepatosit)',
      role: 'Pusat regulasi glukosa darah utama; melakukan glikolisis, glikogenesis, glikogenolisis, glukoneogenesis, jalur pentosa fosfat, dan lipogenesis.'
    },
    {
      organ: 'Otot Rangka (Myosit)',
      role: 'Pengguna glukosa terbesar saat aktivitas fisik; menyimpan glikogen otot untuk digunakan sendiri (tidak melepaskan glukosa bebas ke darah).'
    },
    {
      organ: 'Otak & Jaringan Saraf',
      role: 'Konsumen glukosa terus-menerus (~120 g glukosa/hari) secara obligat aerobik; bergantung pada difusi terfasilitasi GLUT3 independen-insulin.'
    },
    {
      organ: 'Eritrosit (Sel Darah Merah)',
      role: 'Tidak memiliki mitokondria, sehingga sepenuhnya bergantung pada glikolisis anaerobik untuk menghasilkan 2 ATP dan laktat.'
    }
  ],
  physiologicalStates: [
    {
      state: 'Kondisi Setelah Makan (Fed State)',
      hormone: 'Insulin Tinggi, Glukagon Rendah',
      effect: 'Glukosa darah meningkat. Sel mengambil glukosa; stimulasi glikolisis dan glikogenesis (penyimpanan glikogen di hati dan otot); jika kapasitas glikogen jenuh, kelebihan glukosa dialihkan ke lipogenesis.'
    },
    {
      state: 'Kondisi Puasa (Fasting State)',
      hormone: 'Glukagon Tinggi, Insulin Rendah',
      effect: 'Glukosa darah menurun. Hati melakukan glikogenolisis (pemecahan glikogen hati) dan glukoneogenesis (pembentukan glukosa dari laktat, gliserol, dan asam amino) untuk mempertahankan euglikemia.'
    },
    {
      state: 'Aktivitas Fisik / Olahraga Intens',
      hormone: 'Epinefrin & AMP Tinggi, Ca²⁺ Seluler Meningkat',
      effect: 'Glikogen otot dipecah cepat melalui stimulasi glikogen fosforilase; glikolisis berjalan dengan laju tinggi; saat laju melebihi kapasitas oksidatif mitokondria, piruvat direduksi menjadi laktat.'
    },
    {
      state: 'Kelebihan Kalori Berkepanjangan',
      hormone: 'Insulin Stabil Tinggi Berkelanjutan',
      effect: 'Cadangan glikogen mencapai kapasitas maksimum. Kelebihan glukosa diubah melalui sitrat shuttle menjadi asetil-KoA sitosol, disintesis menjadi asam lemak dan trigliserida di jaringan adiposa.'
    }
  ]
};

// 2. PERJALANAN DARI SESUAP NASI HINGGA MONOSAKARIDA DI ALIRAN DARAH (7 TAHAP)
export const RICE_JOURNEY_STAGES: DigestionStage[] = [
  {
    step: 1,
    organ: 'Mulut (Cavum Oris)',
    title: 'Tahap 1: Mulut — Nasi Menjadi Partikel Kecil',
    subtitle: 'Pengunyahan mekanik, pembasahan saliva, pembentukan bolus, dan hidrolisis awal ptialin',
    locationDetail: 'Rongga Mulut (Cavum Oris & Glandula Saliva)',
    substrates: ['Nasi butiran besar (Pati Amilosa & Amilopektin)'],
    enzymes: ['Amilase Saliva (Ptialin)', 'Musin Saliva'],
    bondCleaved: 'Sebagian kecil ikatan α-1,4 internal',
    products: ['Partikel nasi kecil', 'Bolus makanan', 'Maltosa', 'Maltotriosa', 'Dekstrin', 'Sisa pati'],
    whatIsHappening: 'Sendok meletakkan butiran nasi di lidah. Rahang bawah membuka dan menutup mengunyah 3–4 kali hingga nasi terpecah menjadi partikel kecil. Saliva membasahi dan musin merekatkannya menjadi bolus licin. Amilase saliva mulai memotong beberapa ikatan α-1,4 internal pati.',
    importantMessage: 'Pencernaan dimulai di mulut secara mekanik (gigi & lidah) dan enzimatik (amilase saliva). Pati dipotong menjadi partikel kecil, bolus, dan fragmen pendek (maltosa, maltotriosa, dekstrin). Belum terbentuk glukosa siap serap.',
    mechanism: 'Mastikasi memecah matriks butiran pati menjadi partikel kecil. Ptialin (endoglukosidase) menghidrolisis ikatan α-1,4 internal secara acak.',
    scientificExplanation: 'Persamaan: Pati + H₂O —amilase saliva→ maltosa + maltotriosa + dekstrin + sisa pati. Musin saliva membentuk mantel hidrasi memadatkannya menjadi bolus.',
    simpleExplanation: 'Gigi mengunyah nasi besar jadi butiran kecil, air liur membasahinya jadi bolus licin, dan enzim ptialin mulai menggunting rantai pati panjang jadi potongan lebih pendek.',
    substrateChange: {
      before: 'Nasi dengan butiran besar dan rantai pati panjang (amilosa & amilopektin).',
      process: 'Pengunyahan mekanis oleh gigi, pelumasan musin saliva menjadi bolus, dan hidrolisis awal ikatan α-1,4 internal oleh amilase saliva.',
      after: 'Partikel kecil, bolus makanan licin, maltosa, maltotriosa, dekstrin, dan sisa pati.',
      enzyme: 'Amilase Saliva (Ptialin)'
    }
  },
  {
    step: 2,
    organ: 'Esofagus (Kerongkongan)',
    title: 'Tahap 2: Esofagus — Peristaltik',
    subtitle: 'Penutupan epiglotis dan gelombang kontraksi terkoordinasi mendorong bolus ke lambung',
    locationDetail: 'Lumen Esofagus (~25 cm dari Faring ke Kardia Lambung)',
    substrates: ['Bolus Makanan Licin'],
    enzymes: ['(Tidak ada sekresi enzim baru)'],
    bondCleaved: 'Tidak ada pemutusan ikatan kimia',
    products: ['Bolus tiba di lambung'],
    whatIsHappening: 'Lidah mendorong bolus menuju faring. Epiglotis menutup jalan napas menuju trakea. Bolus memasuki lumen esofagus. Dinding esofagus di belakang bolus berkontraksi menyempit sementara dinding di depannya berelaksasi, mendorong bolus meluncur mengikuti kurva esofagus melewati sfingter esofagus bawah (LES) menuju lambung.',
    importantMessage: 'Esofagus murni bertindak sebagai saluran transpor mekanik melalui gelombang peristaltik otot sirkular dan longitudinal. Tidak ada pemecahan kimiawi karbohidrat baru di sini.',
    mechanism: 'Refleks menelan memicu gelombang kontraksi peristaltik primer yang merambat dengan laju 2–4 cm/detik mendorong bolus ke lambung.',
    scientificExplanation: 'Mukosa esofagus mensekresikan lendir musin untuk pelumasan dinding sel tanpa enzim digestif. Sfingter kardia berelaksasi menerima bolus masuk.',
    simpleExplanation: 'Kerongkongan meremas berurutan seperti gelombang mendorong gumpalan bolus aman menuju lambung, sementara katup epiglotis menutup saluran napas.',
    substrateChange: {
      before: 'Bolus makanan berada di orofaring dan pintu masuk esofagus.',
      process: 'Lidah mendorong bolus, epiglotis menutup laring, dinding esofagus menyempit di belakang bolus dan berelaksasi di depannya (gelombang peristaltik) mendorong bolus.',
      after: 'Bolus meluncur melewati sfingter esofagus bawah yang terbuka dan masuk dengan aman ke dalam lambung.',
      enzyme: 'Tidak ada enzim baru (Transpor mekanik peristaltik)'
    }
  },
  {
    step: 3,
    organ: 'Lambung (Gaster)',
    title: 'Tahap 3: Lambung — Bolus Menjadi Kimus',
    subtitle: 'Pencampuran motilitas lambung, pengasaman HCl, dan inaktivasi amilase saliva',
    locationDetail: 'Lumen Lambung (HCl pekat, pH 1.5–2.0)',
    substrates: ['Bolus padat/lunak', 'Fragmen makanan', 'Amilase saliva aktif sesaat'],
    enzymes: ['Amilase saliva (didenaturasi & diinaktivasi oleh HCl)'],
    bondCleaved: 'Tidak ada pemotongan ikatan glikosidik baru',
    products: ['Kimus semi-cair (Chyme)', 'Amilase saliva inaktif'],
    whatIsHappening: 'Bolus tiba di lambung. Dinding lambung berkontraksi ritmis bolak-balik (retropulsi) menggiling bolus menjadi partikel mikro dan mencampurnya dengan cairan asam lambung (HCl pekat, pH 1.5–2.0). Campuran berubah wujud menjadi kimus semi-cair kekuningan. Keasaman ekstrem mendenaturasi active site amilase saliva sehingga status enzim menjadi inaktif.',
    importantMessage: 'Lambung mengubah bolus menjadi kimus secara fisik melalui penggilingan mekanik. Kondisi asam ekstrem menghentikan aktivitas amilase saliva. Pati belum dipecah menjadi glukosa di lambung.',
    mechanism: 'Peristalsis antrum gaster menggiling makanan menjadi emulsi chyme. Protonasi residu histidin/asam amino active site oleh ion H⁺ merusak konformasi 3D amilase.',
    scientificExplanation: 'Di lambung, konsentrasi HCl (pH ~2.0) mendenaturasi ptialin saliva secara ireversibel. Pemecahan karbohidrat terhenti sementara sampai mencapai duodenum.',
    simpleExplanation: 'Lambung mengaduk dan meremas bolus makanan bersama cairan asam kuat hingga menjadi bubur semi-cair (kimus). Asam lambung mematikan kerja enzim air liur.',
    substrateChange: {
      before: 'Bolus padat/lunak dengan fragmen makanan dan enzim amilase saliva aktif sesaat.',
      process: 'Dinding lambung berkontraksi bolak-balik (retropulsi), mencampurkan bolus dengan cairan asam lambung (pH turun ke ~2.0) dan mendenaturasi enzim.',
      after: 'Kimus semi-cair (chyme); amilase saliva inaktif total; struktur rantai pati tetap tersimpan aman menanti usus halus.',
      enzyme: 'Amilase Saliva terinaktivasi'
    }
  },
  {
    step: 4,
    organ: 'Duodenum & Saluran Pankreas',
    title: 'Tahap 4: Duodenum — Amilase Pankreas Masuk',
    subtitle: 'Pengosongan berkala pilorus, netralisasi bikarbonat, dan semprotan amilase pankreas',
    locationDetail: 'Lumen Duodenum Usus Halus (pH 7.5–8.0)',
    substrates: ['Kimus asam lambung', 'Sisa pati dan dekstrin'],
    enzymes: ['Amilase Pankreas (disekresikan bersama NaHCO₃)'],
    bondCleaved: 'Persiapan hidrolisis ikatan α-1,4',
    products: ['Kimus ternetralkan dengan amilase pankreas aktif'],
    whatIsHappening: 'Sfingter pilorus membuka berkala, mengalirkan kimus sedikit demi sedikit ke lumen duodenum yang berbentuk lengkung C. Saluran pankreas disorot: cairan bikarbonat (NaHCO₃) bersama amilase pankreas mengalir deras melalui duktus pankreatikus masuk ke duodenum menetralkan asam lambung (pH naik ke 7.5–8.0) dan bercampur merata dengan sisa pati.',
    importantMessage: 'Pankreas berada di luar lambung dan menyalurkan amilase pankreas serta natrium bikarbonat langsung ke lumen duodenum. Bikarbonat menaikkan pH agar amilase pankreas dapat bekerja optimal.',
    mechanism: 'Hormon sekretin merangsang sekresi bikarbonat saluran empedu/pankreas; kolesistokinin (CCK) merangsang eksositosis zimogen/amilase dari sel asinar pankreas.',
    scientificExplanation: 'Netralisasi asam oleh bikarbonat menciptakan pH alkali (~7.8) yang mengaktifkan amilase pankreas untuk memutus rantai pati dengan afinitas katalitik tinggi.',
    simpleExplanation: 'Pilorus membuka melepas bubur kimus ke usus 12 jari (duodenum). Pankreas menyemprotkan cairan penetral asam dan enzim amilase pankreas segar untuk mencerna pati.',
    substrateChange: {
      before: 'Kimus asam di antrum lambung dan enzim amilase tersimpan di sel asinar pankreas.',
      process: 'Pilorus membuka mengalirkan kimus ke duodenum; saluran pankreas mengalirkan cairan bikarbonat penetral asam dan amilase pankreas ke lumen.',
      after: 'Kimus ternetralkan pada pH optimum (~7.8); amilase pankreas membaur homogen dengan sisa pati siap memotong ikatan.',
      enzyme: 'Amilase Pankreas (disekresikan bersama Bikarbonat)'
    }
  },
  {
    step: 5,
    organ: 'Lumen Usus Halus',
    title: 'Tahap 5: Pemecahan Pati oleh Amilase Pankreas',
    subtitle: 'Fokus Utama Biokimia: Pemutusan ikatan α-1,4 internal menghasilkan oligosakarida',
    locationDetail: 'Lumen Usus Halus (Duodenum & Jejunum proksimal)',
    substrates: ['Rantai Amilosa panjang', 'Rantai Amilopektin bercabang (ikatan α-1,4 & cabang α-1,6)'],
    enzymes: ['Amilase Pankreas + H₂O'],
    bondCleaved: 'Ikatan α-1,4 glikosidik internal (ikatan cabang α-1,6 TIDAK diputus)',
    products: ['Maltosa (2 unit glukosa)', 'Maltotriosa (3 unit glukosa)', 'Oligosakarida pendek', 'α-Limit Dextrin (bercabang α-1,6)'],
    whatIsHappening: 'Amilase pankreas mengikat bagian tengah rantai pati. Bersama molekul air (H₂O), enzim memutus ikatan α-1,4 internal secara masif. Enzim bergerak ke ikatan berikutnya memotong rantai panjang menjadi banyak fragmen pendek: maltosa, maltotriosa, dan oligosakarida. Karena enzim TIDAK dapat memutus titik cabang α-1,6, bagian percabangan tersisa sebagai α-limit dextrin.',
    importantMessage: 'Amilase pankreas tidak langsung menghasilkan seluruhnya glukosa! Produk akhirnya adalah campuran maltosa (2 unit), maltotriosa (3 unit), oligosakarida, dan α-limit dextrin bercabang. Belum seluruhnya menjadi glukosa bebas.',
    mechanism: 'Persamaan reaksi: Pati + H₂O —amilase pankreas→ Maltosa + Maltotriosa + Oligosakarida + α-Limit Dextrin. Enzim adalah endo-glukosidase spesifik α-1,4.',
    scientificExplanation: 'Amilase pankreas tidak memiliki kemampuan hidrolisis pada ikatan α-1,6 maupun ikatan α-1,4 yang berdekatan dengan cabang, menghasilkan α-limit dextrin spesifik.',
    simpleExplanation: 'Enzim amilase pankreas memotong rantai pati panjang menjadi potongan pendek: maltosa (2 gula), maltotriosa (3 gula), dan potongan bercabang (α-limit dekstrin).',
    substrateChange: {
      before: 'Satu molekul polimer pati besar dan panjang dengan ikatan rantai utama α-1,4 dan cabang α-1,6.',
      process: 'Amilase pankreas mengikat ikatan α-1,4 internal, memasukkan molekul H₂O dan memutus ikatan glikosidik secara berulang tanpa memutus cabang α-1,6.',
      after: 'Maltosa (2 unit glukosa), maltotriosa (3 unit glukosa), oligosakarida pendek, dan α-limit dextrin bercabang.',
      enzyme: 'Amilase Pankreas + H₂O'
    }
  },
  {
    step: 6,
    organ: 'Permukaan Usus Halus (Brush Border)',
    title: 'Tahap 6: Enzim Usus — Menjadi Monosakarida',
    subtitle: 'Maltase dan sukrase-isomaltase memutus ikatan akhir menjadi monomer glukosa bebas',
    locationDetail: 'Permukaan Usus Halus (Brush Border / Mikrovili Enterosit)',
    substrates: ['Maltosa (2 unit glukosa)', 'Maltotriosa (3 unit glukosa)', 'α-Limit Dextrin (bercabang α-1,6)'],
    enzymes: ['Maltase-Glukoamilase', 'Sukrase-Isomaltase (α-Dekstrinase)'],
    bondCleaved: 'Ikatan α-1,4 pada maltosa/maltotriosa dan ikatan cabang α-1,6 pada α-limit dextrin',
    products: ['Monosakarida Glukosa Bebas (Monomer C₆H₁₂O₆)'],
    whatIsHappening: 'Di permukaan usus halus: (1) Maltosa (2 glukosa) masuk ke maltase, ikatan diputus bersama H₂O menghasilkan 2 glukosa terpisah. (2) Maltotriosa (3 glukosa) diputus bertahap menghasilkan 3 glukosa terpisah. (3) α-Limit dextrin bercabang didekati oleh sukrase-isomaltase yang secara spesifik memutus ikatan cabang α-1,6, lalu rantai lurus dihidrolisis hingga seluruhnya menjadi glukosa bebas terpisah.',
    importantMessage: 'Pencernaan enzimatik karbohidrat diselesaikan di permukaan usus halus oleh enzim brush border. Semua disakarida dan oligosakarida kini telah terurai sempurna menjadi monosakarida glukosa bebas.',
    mechanism: 'Maltase-glukoamilase memutus ikatan α-1,4 ekso-hidrolitik. Sukrase-isomaltase memiliki aktivitas oligo-1,6-glukosidase spesifik memotong cabang α-1,6.',
    scientificExplanation: 'Maltosa + H₂O —maltase→ 2 D-Glukosa; Isomaltosa/α-Dextrin + H₂O —isomaltase→ Glukosa. Menghasilkan monosakarida murni siap diangkut.',
    simpleExplanation: 'Enzim di dinding usus memotong ikatan terakhir: maltosa menjadi 2 glukosa terpisah, maltotriosa menjadi 3 glukosa, dan cabang dekstrin diputus hingga seluruhnya jadi glukosa bebas.',
    substrateChange: {
      before: 'Maltosa (2 glukosa menyatu), maltotriosa (3 glukosa menyatu), dan α-limit dekstrin dengan ikatan cabang α-1,6.',
      process: 'Maltase memutus ikatan α-1,4 pada maltosa & maltotriosa; sukrase-isomaltase memutus ikatan cabang α-1,6 pada α-limit dextrin bersama molekul H₂O.',
      after: 'Molekul-molekul monosakarida glukosa bebas yang terpisah sempurna (monomer glukosa C₆H₁₂O₆).',
      enzyme: 'Maltase & Sukrase-Isomaltase (α-Dekstrinase)'
    }
  },
  {
    step: 7,
    organ: 'Dinding Usus & Kapiler Darah',
    title: 'Tahap 7: Glukosa Masuk ke Aliran Darah',
    subtitle: 'Transpor melintasi dinding usus masuk ke kapiler darah dan sirkulasi sistemik',
    locationDetail: 'Dinding Usus Halus menuju Kapiler Vena Porta Hepatika',
    substrates: ['Monosakarida Glukosa Bebas di Lumen Usus'],
    enzymes: ['Transporter Membran (SGLT1 & GLUT2)'],
    bondCleaved: 'Tidak ada (proses absorpsi & transpor membran)',
    products: ['Glukosa dalam sirkulasi aliran darah kapiler'],
    whatIsHappening: 'Molekul glukosa bebas di lumen usus bergerak melintasi lapisan dinding usus halus. Glukosa memasuki kapiler darah mesenterika dan ikut mengalir deras bersama eritrosit (sel darah merah) menuju vena porta hepatika. Jumlah glukosa di lumen berangsur berkurang, sementara glukosa dalam sirkulasi darah bertambah pesat.',
    importantMessage: 'Pencernaan selesai! Glukosa kini berada di aliran darah dan dibawa menuju hati serta jaringan seluler seluruh tubuh untuk menjalani katabolisme (glikolisis, siklus Krebs, dan rantai transpor elektron) guna menghasilkan energi ATP!',
    mechanism: 'Glukosa ditranspor aktif sekunder melintasi membran apikal melalui simporter SGLT1 (Na⁺/glukosa) lalu berdifusi terfasilitasi melintasi membran basolateral via GLUT2 menuju kapiler darah.',
    scientificExplanation: 'Darah dari kapiler usus mengalirkan glukosa ke vena porta menuju hepatosit hati untuk regulasi euglikemia, glikogenesis, atau distribusi ke sirkulasi sistemik.',
    simpleExplanation: 'Glukosa menembus dinding usus dan masuk ke pembuluh darah kapiler. Darah membawa glukosa ke seluruh tubuh untuk dibakar menjadi energi tenaga (ATP).',
    substrateChange: {
      before: 'Monosakarida glukosa bebas menumpuk di sisi lumen usus halus.',
      process: 'Glukosa melintasi lapisan dinding usus halus menuju jaringan interstisial dan menembus endotel kapiler darah.',
      after: 'Glukosa mengalir lancar di dalam sirkulasi aliran darah kapiler siap digunakan untuk respirasi seluler penghasil ATP.',
      enzyme: 'Transporter membran epitel usus'
    }
  }
];

export const BRUSH_BORDER_ENZYMES: BrushBorderEnzymeInfo[] = [
  {
    name: 'Maltase (α-Glukosidase)',
    substrate: 'Maltosa (α-D-glukopiranosil-(1→4)-D-glukopiranosa)',
    products: '2 molekul D-Glukosa',
    reactionEquation: 'Maltosa + H₂O → 2 D-Glukosa',
    substrateFormula: 'C₁₂H₂₂O₁₁',
    productFormula: '2 × C₆H₁₂O₆',
    physiologicalRole: 'Menyelesaikan pencernaan amilosa dari nasi menjadi monosakarida glukosa murni yang siap diserap.'
  },
  {
    name: 'Isomaltase (α-Dekstrinase)',
    substrate: 'α-Dekstrin batas & Isomaltosa (ikatan cabang α-1,6)',
    products: 'Maltosa dan D-Glukosa',
    reactionEquation: 'Isomaltosa + H₂O → 2 D-Glukosa',
    substrateFormula: 'C₁₂H₂₂O₁₁ (cabang α-1,6)',
    productFormula: '2 × C₆H₁₂O₆',
    physiologicalRole: 'Memutus ikatan titik percabangan amilopektin nasi yang tidak dapat dipotong oleh enzim amilase.'
  },
  {
    name: 'Sukrase',
    substrate: 'Sukrosa (gula pasir)',
    products: 'D-Glukosa + D-Fruktosa',
    reactionEquation: 'Sukrosa + H₂O → D-Glukosa + D-Fruktosa',
    substrateFormula: 'C₁₂H₂₂O₁₁',
    productFormula: 'C₆H₁₂O₆ (glukosa) + C₆H₁₂O₆ (fruktosa)',
    physiologicalRole: 'Menghidrolisis gula meja menjadi glukosa dan fruktosa untuk penyerapan membran usus.'
  },
  {
    name: 'Laktase (β-Galaktosidase)',
    substrate: 'Laktosa (gula susu)',
    products: 'D-Galaktosa + D-Glukosa',
    reactionEquation: 'Laktosa + H₂O → D-Galaktosa + D-Glukosa',
    substrateFormula: 'C₁₂H₂₂O₁₁',
    productFormula: 'C₆H₁₂O₆ (galaktosa) + C₆H₁₂O₆ (glukosa)',
    physiologicalRole: 'Menghidrolisis laktosa susu. Defisiensi enzim ini menyebabkan sindrom intoleransi laktosa.'
  }
];

// 3. GLIKOLISIS — 10 TAHAP LENGKAP
export const GLYCOLYSIS_STEPS: GlycolysisStep[] = [
  {
    stepNumber: 1,
    name: 'Fosforilasi Glukosa',
    substrate: 'D-Glukosa',
    product: 'Glukosa-6-Fosfat (G6P)',
    enzyme: 'Hexokinase (jaringan tepi) / Glucokinase (hati & pankreas)',
    cofactor: 'Mg²⁺',
    phase: 'INVESTASI',
    carbonCount: 6,
    atpChange: -1,
    nadhChange: 0,
    reactionType: 'Transfer Gugus Fosforil (Irreversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Gugus fosfat berenergi tinggi dari ATP ditransfer ke atom C-6 glukosa. Penambahan muatan negatif mengunci glukosa di dalam sel agar tidak keluar melalui membran.',
    substrateFormula: 'C₆H₁₂O₆',
    productFormula: 'C₆H₁₁O₉P²⁻'
  },
  {
    stepNumber: 2,
    name: 'Isomerisasi Glukosa-6-Fosfat',
    substrate: 'Glukosa-6-Fosfat (G6P)',
    product: 'Fruktosa-6-Fosfat (F6P)',
    enzyme: 'Phosphoglucose Isomerase (PGI)',
    cofactor: 'Mg²⁺',
    phase: 'INVESTASI',
    carbonCount: 6,
    atpChange: 0,
    nadhChange: 0,
    reactionType: 'Isomerisasi Aldosa-Ketosa (Reversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Konversi cincin piranosa (glukosa aldosa) menjadi furanosa (fruktosa ketosa), memindahkan gugus karbonil dari C-1 ke C-2 untuk persiapan fosforilasi kedua.',
    substrateFormula: 'C₆H₁₁O₉P²⁻',
    productFormula: 'C₆H₁₁O₉P²⁻'
  },
  {
    stepNumber: 3,
    name: 'Fosforilasi Fruktosa-6-Fosfat (Tahap Penentu Laju)',
    substrate: 'Fruktosa-6-Fosfat (F6P)',
    product: 'Fruktosa-1,6-Bisfosfat (F1,6BP)',
    enzyme: 'Phosphofructokinase-1 (PFK-1)',
    cofactor: 'Mg²⁺',
    phase: 'INVESTASI',
    carbonCount: 6,
    atpChange: -1,
    nadhChange: 0,
    reactionType: 'Transfer Gugus Fosforil (Irreversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'PFK-1 mentransfer fosfat dari ATP kedua ke atom C-1 fruktosa. Ini adalah tahap penentu laju (rate-limiting committed step) yang diregulasi ketat oleh ATP (-), AMP (+), dan fruktosa-2,6-bisfosfat (+).',
    substrateFormula: 'C₆H₁₁O₉P²⁻',
    productFormula: 'C₆H₁₀O₁₂P₂⁴⁻'
  },
  {
    stepNumber: 4,
    name: 'Pembelahan Fruktosa-1,6-Bisfosfat',
    substrate: 'Fruktosa-1,6-Bisfosfat (F1,6BP)',
    product: 'Gliseraldehida-3-Fosfat (G3P) + Dihidroksiaseton Fosfat (DHAP)',
    enzyme: 'Aldolase (Fructose-1,6-bisphosphate aldolase)',
    phase: 'INVESTASI',
    carbonCount: 6, // membelah menjadi 2 x 3C
    atpChange: 0,
    nadhChange: 0,
    reactionType: 'Kondensasi / Pembelahan Aldol (Reversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Molekul heksosa 6-karbon dipotong di antara C-3 dan C-4 menjadi dua molekul triosa fosfat 3-karbon yang berbeda: satu aldosa (G3P) dan satu ketosa (DHAP).',
    substrateFormula: 'C₆H₁₀O₁₂P₂⁴⁻',
    productFormula: 'C₃H₅O₆P²⁻ + C₃H₅O₆P²⁻'
  },
  {
    stepNumber: 5,
    name: 'Isomerisasi Triosa Fosfat',
    substrate: 'Dihidroksiaseton Fosfat (DHAP)',
    product: 'Gliseraldehida-3-Fosfat (G3P)',
    enzyme: 'Triose Phosphate Isomerase (TPI)',
    phase: 'INVESTASI',
    carbonCount: 3,
    atpChange: 0,
    nadhChange: 0,
    reactionType: 'Isomerisasi Triosa (Reversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Hanya G3P yang dapat langsung diproses pada tahap berikutnya. TPI mengubah DHAP menjadi G3P secara reversibel, sehingga dari 1 molekul glukosa awal kini dihasilkan 2 molekul G3P.',
    substrateFormula: 'C₃H₅O₆P²⁻',
    productFormula: 'C₃H₅O₆P²⁻'
  },
  {
    stepNumber: 6,
    name: 'Oksidasi & Fosforilasi G3P (Mulai Fase Pembayaran)',
    substrate: 'Gliseraldehida-3-Fosfat (G3P) [2 molekul]',
    product: '1,3-Bisfosfogliserat (1,3-BPG) [2 molekul]',
    enzyme: 'Glyceraldehyde-3-Phosphate Dehydrogenase (GAPDH)',
    cofactor: 'NAD⁺, Pi',
    phase: 'PEMBAYARAN',
    carbonCount: 3,
    atpChange: 0,
    nadhChange: 2, // 2 NADH terbentuk per glukosa
    reactionType: 'Oksidasi dan Fosforilasi Substrat (Reversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Gugus aldehida G3P dioksidasi menghasilkan gugus karboksilat berenergi tinggi, melepaskan 2e⁻ + H⁺ ke NAD⁺ membentuk NADH. Fosfat anorganik (Pi) diikat tanpa memakai ATP.',
    substrateFormula: '2 × C₃H₅O₆P²⁻',
    productFormula: '2 × C₃H₄O₈P₂⁴⁻'
  },
  {
    stepNumber: 7,
    name: 'Fosforilasi Tingkat Substrat Pertama (Hasil ATP)',
    substrate: '1,3-Bisfosfogliserat (1,3-BPG) [2 molekul]',
    product: '3-Fosfogliserat (3-PG) [2 molekul]',
    enzyme: 'Phosphoglycerate Kinase (PGK)',
    cofactor: 'Mg²⁺, ADP',
    phase: 'PEMBAYARAN',
    carbonCount: 3,
    atpChange: 2, // 2 ATP terbentuk per glukosa
    nadhChange: 0,
    reactionType: 'Fosforilasi Tingkat Substrat (Reversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Gugus fosfat berenergi tinggi pada posisi C-1 dari 1,3-BPG ditransfer ke molekul ADP, menghasilkan 2 ATP. Pada tahap ini, 2 ATP yang diinvestasikan di tahap 1 & 3 telah terbayar impas (break-even).',
    substrateFormula: '2 × C₃H₄O₈P₂⁴⁻',
    productFormula: '2 × C₃H₄O₇P²⁻'
  },
  {
    stepNumber: 8,
    name: 'Pergeseran Gugus Fosfat',
    substrate: '3-Fosfogliserat (3-PG) [2 molekul]',
    product: '2-Fosfogliserat (2-PG) [2 molekul]',
    enzyme: 'Phosphoglycerate Mutase (PGM)',
    cofactor: 'Mg²⁺',
    phase: 'PEMBAYARAN',
    carbonCount: 3,
    atpChange: 0,
    nadhChange: 0,
    reactionType: 'Pergeseran Gugus / Mutase (Reversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Enzim memindahkan gugus fosfat dari posisi C-3 ke posisi C-2 melalui zat antara 2,3-bisfosfogliserat untuk mempersiapkan reaksi dehidrasi selanjutnya.',
    substrateFormula: '2 × C₃H₄O₇P²⁻',
    productFormula: '2 × C₃H₄O₇P²⁻'
  },
  {
    stepNumber: 9,
    name: 'Dehidrasi 2-Fosfogliserat (Pelepasan Air)',
    substrate: '2-Fosfogliserat (2-PG) [2 molekul]',
    product: 'Phosphoenolpyruvate (PEP) [2 molekul]',
    enzyme: 'Enolase',
    cofactor: 'Mg²⁺',
    phase: 'PEMBAYARAN',
    carbonCount: 3,
    atpChange: 0,
    nadhChange: 0,
    reactionType: 'Dehidrasi / Eliminasi H₂O (Reversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Pelepasan satu molekul H₂O per triosa menciptakan ikatan enol fosfat yang memiliki potensi transfer gugus fosfat sangat tinggi (ΔG°′ = -61.9 kJ/mol). Menghasilkan 2 H₂O.',
    substrateFormula: '2 × C₃H₄O₇P²⁻',
    productFormula: '2 × C₃H₂O₆P²⁻ + 2 H₂O'
  },
  {
    stepNumber: 10,
    name: 'Fosforilasi Tingkat Substrat Kedua (Pembentukan Piruvat)',
    substrate: 'Phosphoenolpyruvate (PEP) [2 molekul]',
    product: 'Piruvat [2 molekul]',
    enzyme: 'Pyruvate Kinase (PK)',
    cofactor: 'Mg²⁺, K⁺, ADP',
    phase: 'PEMBAYARAN',
    carbonCount: 3,
    atpChange: 2, // 2 ATP terbentuk per glukosa
    nadhChange: 0,
    reactionType: 'Fosforilasi Tingkat Substrat (Irreversible)',
    location: 'Sitoplasma',
    chemicalExplanation: 'Gugus fosfat dari PEP ditransfer ke ADP, menghasilkan 2 ATP dan 2 molekul piruvat stabil. Tahap ini bersifat sangat eksergonik dan tidak dapat berbalik.',
    substrateFormula: '2 × C₃H₂O₆P²⁻',
    productFormula: '2 × C₃H₃O₃⁻ + 2 ATP'
  }
];

// 4. DEKARBOKSILASI OKSIDATIF & SIKLUS KREBS
export const PYRUVATE_FATE_DATA = {
  anaerobic: {
    title: 'Kondisi Anaerobik / Olahraga Sprint Intens',
    location: 'Sitoplasma',
    enzyme: 'Lactate Dehydrogenase (LDH)',
    reaction: 'Piruvat + NADH + H⁺ ⇌ Laktat + NAD⁺',
    purpose: 'Meregenerasi molekul NAD⁺ sitoplasma agar tahap 6 glikolisis dapat terus berjalan memproduksi ATP tanpa oksigen.',
    energyYield: '2 ATP bersih per molekul glukosa',
    scientificNote: 'Laktat BUKAN zat beracun dan bukan penyebab tunggal rasa pegal otot. Laktat adalah molekul bahan bakar berharga yang dapat diangkut ke hati untuk didaur ulang menjadi glukosa (Siklus Cori) atau dioksidasi langsung oleh sel miokardium jantung.'
  },
  aerobic: {
    title: 'Kondisi Aerobik (Tersedia Oksigen)',
    location: 'Masuk ke Matriks Mitokondria',
    transporter: 'Mitochondrial Pyruvate Carrier (MPC)',
    destination: 'Dekarboksilasi Oksidatif menjadi Asetil-KoA untuk masuk Siklus Krebs'
  }
};

export const OXIDATIVE_DECARBOXYLATION_DATA = {
  title: 'Dekarboksilasi Oksidatif Piruvat',
  location: 'Matriks Mitokondria',
  enzymeComplex: 'Pyruvate Dehydrogenase Complex (PDC) — terdiri dari E1 (piruvat dehidrogenase), E2 (dihidrolipoil transasetilase), dan E3 (dihidrolipoil dehidrogenase)',
  cofactors: ['TPP (Tiamin pirofosfat)', 'Asam Lipoat', 'Koenzim A (KoA-SH)', 'FAD', 'NAD⁺'],
  perPyruvate: {
    co2: 1,
    nadh: 1,
    acetylCoA: 1
  },
  perGlucose: {
    co2: 2,
    nadh: 2,
    acetylCoA: 2
  },
  carbonTracking: 'Piruvat 3-karbon kehilangan C-1 sebagai gas CO₂. Fragmen 2-karbon (asetil) yang teroksidasi dikonjugasikan ke KoA membentuk Asetil-KoA.'
};

export const KREBS_CYCLE_STEPS: KrebsStep[] = [
  {
    stepNumber: 1,
    name: 'Kondensasi Sitrat',
    substrate: 'Oksaloasetat (4C) + Asetil-KoA (2C)',
    product: 'Sitrat (6C)',
    enzyme: 'Citrate Synthase',
    carbonCount: 6,
    carbonColorNote: '2 Karbon Asetil-KoA (Kuning) bergabung dengan 4 Karbon Oksaloasetat (Biru)',
    co2Released: false,
    nadhProduced: false,
    fadh2Produced: false,
    gtpProduced: false,
    whyItHappens: 'Menggabungkan gugus asetil 2C ke dalam kerangka 4C pembawa sehingga dapat dioksidasi secara terkendali.',
    chemicalDetail: 'Gugus metil dari asetil-KoA berkondensasi dengan gugus karbonil oksaloasetat, diikuti hidrolisis ikatan tioester KoA.'
  },
  {
    stepNumber: 2,
    name: 'Isomerisasi Menjadi Isositrat',
    substrate: 'Sitrat (6C)',
    product: 'Isositrat (6C)',
    enzyme: 'Aconitase',
    carbonCount: 6,
    carbonColorNote: 'Kerangka 6 Karbon ditata ulang',
    co2Released: false,
    nadhProduced: false,
    fadh2Produced: false,
    gtpProduced: false,
    whyItHappens: 'Gugus hidroksil (-OH) dipindahkan dari posisi tersier ke posisi sekunder agar mudah dioksidasi.',
    chemicalDetail: 'Dehidrasi sementara menghasilkan cis-akonitat, diikuti hidrasi kembali membentuk isositrat.'
  },
  {
    stepNumber: 3,
    name: 'Oksidasi & Dekarboksilasi Pertama',
    substrate: 'Isositrat (6C)',
    product: 'α-Ketoglutarat (5C) + CO₂ + NADH',
    enzyme: 'Isocitrate Dehydrogenase',
    carbonCount: 5,
    carbonColorNote: '1 Karbon dilepas sebagai CO₂ (abu-abu)',
    co2Released: true,
    nadhProduced: true,
    fadh2Produced: false,
    gtpProduced: false,
    whyItHappens: 'Ekstraksi pasangan elektron berenergi tinggi pertama dan pelepasan molekul CO₂ pertama dalam siklus.',
    chemicalDetail: 'Oksidasi isositrat membentuk oksalosuksinat yang kemudian didekarboksilasi menghasilkan α-ketoglutarat.'
  },
  {
    stepNumber: 4,
    name: 'Oksidasi & Dekarboksilasi Kedua',
    substrate: 'α-Ketoglutarat (5C) + KoA-SH',
    product: 'Suksinil-KoA (4C) + CO₂ + NADH',
    enzyme: 'α-Ketoglutarate Dehydrogenase Complex',
    carbonCount: 4,
    carbonColorNote: '1 Karbon lagi dilepas sebagai CO₂; sisa 4 Karbon terikat KoA',
    co2Released: true,
    nadhProduced: true,
    fadh2Produced: false,
    gtpProduced: false,
    whyItHappens: 'Pelepasan karbon kedua dan pembentukan ikatan tioester berenergi tinggi suksinil-KoA.',
    chemicalDetail: 'Mekanisme multienzim yang mirip PDC, menghasilkan NADH kedua dan suksinil-KoA berenergi tinggi.'
  },
  {
    stepNumber: 5,
    name: 'Fosforilasi Tingkat Substrat Siklus Krebs',
    substrate: 'Suksinil-KoA (4C) + GDP/ADP + Pi',
    product: 'Suksinat (4C) + GTP/ATP + KoA-SH',
    enzyme: 'Succinyl-CoA Synthetase (Succinate Thiokinase)',
    carbonCount: 4,
    carbonColorNote: 'Kerangka 4 Karbon Suksinat simetris',
    co2Released: false,
    nadhProduced: false,
    fadh2Produced: false,
    gtpProduced: true,
    whyItHappens: 'Energi pemecahan ikatan tioester digunakan langsung untuk mensintesis nukleotida trifosfat (GTP atau ATP).',
    chemicalDetail: 'Di sel hati/ginjal dominan menghasilkan GTP, sedangkan di otot dominan menghasilkan ATP.'
  },
  {
    stepNumber: 6,
    name: 'Oksidasi Suksinat Menjadi Fumarat',
    substrate: 'Suksinat (4C)',
    product: 'Fumarat (4C) + FADH₂',
    enzyme: 'Succinate Dehydrogenase (merupakan Kompleks II pada membran dalam mitokondria)',
    carbonCount: 4,
    carbonColorNote: 'Kerangka 4 Karbon dengan ikatan rangkap trans',
    co2Released: false,
    nadhProduced: false,
    fadh2Produced: true,
    gtpProduced: false,
    whyItHappens: 'Oksidasi ikatan tunggal C-C menjadi ikatan rangkap trans C=C, mentransfer 2 elektron ke FAD.',
    chemicalDetail: 'Enzim ini terikat langsung pada membran dalam mitokondria dan langsung terhubung dengan rantai transpor elektron.'
  },
  {
    stepNumber: 7,
    name: 'Hidrasi Fumarat',
    substrate: 'Fumarat (4C) + H₂O',
    product: 'L-Malat (4C)',
    enzyme: 'Fumarase',
    carbonCount: 4,
    carbonColorNote: 'Kerangka 4 Karbon dengan gugus -OH baru',
    co2Released: false,
    nadhProduced: false,
    fadh2Produced: false,
    gtpProduced: false,
    whyItHappens: 'Penambahan molekul air melintasi ikatan rangkap untuk membentuk gugus alkohol sekunder.',
    chemicalDetail: 'Reaksi hidrasi stereospesifik trans yang menghasilkan isomer L-malat.'
  },
  {
    stepNumber: 8,
    name: 'Regenerasi Oksaloasetat',
    substrate: 'L-Malat (4C)',
    product: 'Oksaloasetat (4C) + NADH',
    enzyme: 'Malate Dehydrogenase',
    carbonCount: 4,
    carbonColorNote: 'Oksaloasetat (4C Biru) terbentuk kembali dan siap mengikat Asetil-KoA baru',
    co2Released: false,
    nadhProduced: true,
    fadh2Produced: false,
    gtpProduced: false,
    whyItHappens: 'Mengoksidasi gugus alkohol menjadi gugus keto, meregenerasi oksaloasetat untuk menutup siklus.',
    chemicalDetail: 'Meskipun ΔG°′ positif (+29.7 kJ/mol), reaksi ditarik maju karena oksaloasetat segera dihabiskan oleh enzim sitrat sintase tahap 1.'
  }
];

// 5. RANTAI TRANSPOR ELEKTRON (ETC) & FOSFORILASI OKSIDATIF
export const ETC_COMPLEXES: ETCComplexInfo[] = [
  {
    id: 'CI',
    name: 'Kompleks I: NADH:Ubiquinone Oxidoreductase',
    location: 'Membran Dalam Mitokondria',
    electronSource: 'NADH matriks (dioksidasi menjadi NAD⁺)',
    electronDestination: 'Koenzim Q (Ubiquinone → Ubiquinol)',
    protonPumped: 4,
    description: 'Menerima 2 elektron dari NADH melalui FMN dan gugus Fe-S, lalu memompa 4 proton (H⁺) dari matriks ke ruang antarmembran.'
  },
  {
    id: 'CII',
    name: 'Kompleks II: Suksinat Dehidrogenase',
    location: 'Membran Dalam Mitokondria',
    electronSource: 'FADH₂ (terikat pada suksinat dehidrogenase)',
    electronDestination: 'Koenzim Q (Ubiquinone)',
    protonPumped: 0,
    description: 'PENTING: Kompleks II TIDAK MEMOMPA PROTON sama sekali karena perubahan energi bebas terlalu kecil. Elektron dialirkan langsung ke CoQ.'
  },
  {
    id: 'CoQ',
    name: 'Koenzim Q (Ubiquinone / Ubiquinol)',
    location: 'Lapisan Lipid Membran Dalam',
    electronSource: 'Kompleks I dan Kompleks II',
    electronDestination: 'Kompleks III',
    protonPumped: 0,
    description: 'Pembawa elektron lipid larut kecil yang berdifusi bebas di dalam inti hidrofobik membran.'
  },
  {
    id: 'CIII',
    name: 'Kompleks III: Sitokrom bc₁ Complex',
    location: 'Membran Dalam Mitokondria',
    electronSource: 'Ubiquinol (CoQH₂)',
    electronDestination: 'Sitokrom c',
    protonPumped: 4,
    description: 'Melalui siklus Q, Kompleks III memompa 4 proton ke ruang antarmembran dan mentransfer elektron satu per satu ke sitokrom c.'
  },
  {
    id: 'CytC',
    name: 'Sitokrom c',
    location: 'Ruang Antarmembran (Permukaan Luar Membran Dalam)',
    electronSource: 'Kompleks III',
    electronDestination: 'Kompleks IV',
    protonPumped: 0,
    description: 'Hemeprotein kecil perifer yang mentransfer elektron dari Kompleks III ke Kompleks IV.'
  },
  {
    id: 'CIV',
    name: 'Kompleks IV: Sitokrom c Oksidase',
    location: 'Membran Dalam Mitokondria',
    electronSource: 'Sitokrom c',
    electronDestination: 'Molekul Oksigen (O₂)',
    protonPumped: 2,
    description: 'Mentransfer 4 elektron ke molekul O₂ bersama 4H⁺ matriks untuk membentuk 2 molekul H₂O (akseptor elektron terakhir), dan memompa 2H⁺ ke ruang antarmembran.'
  },
  {
    id: 'ATP_Synthase',
    name: 'ATP Synthase (Kompleks V / F₀F₁-ATPase)',
    location: 'Membran Dalam Mitokondria',
    electronSource: '-',
    electronDestination: '-',
    protonPumped: 0,
    description: 'Motor rotasi nano: Aliran balik proton dari ruang antarmembran bergradien elektrokimia tinggi kembali ke matriks memutar rotor c-ring subunit F₀, menyebabkan perubahan konformasi subunit katalitik F₁ untuk mengikat ADP + Pi menjadi ATP.'
  }
];

// 6. TOTAL ATP RENDEMEN PER GLUKOSA
export const ATP_BALANCE_DATA = {
  modernYieldPerCarrier: {
    nadh: '2.5 ATP per NADH',
    fadh2: '1.5 ATP per FADH₂'
  },
  breakdown: [
    {
      pathway: 'Glikolisis Sitoplasma',
      directATP: '2 ATP bersih (fosforilasi tingkat substrat)',
      reducedCoenzymes: '2 NADH sitoplasma',
      malateAspartateATP: '2 ATP + (2 × 2.5) = 7 ATP',
      glycerolPhosphateATP: '2 ATP + (2 × 1.5) = 5 ATP'
    },
    {
      pathway: 'Dekarboksilasi Oksidatif (2 Piruvat)',
      directATP: '0 ATP',
      reducedCoenzymes: '2 NADH matriks',
      malateAspartateATP: '2 × 2.5 = 5 ATP',
      glycerolPhosphateATP: '2 × 2.5 = 5 ATP'
    },
    {
      pathway: 'Siklus Krebs (2 Putaran)',
      directATP: '2 GTP / ATP',
      reducedCoenzymes: '6 NADH matriks + 2 FADH₂',
      malateAspartateATP: '2 + (6 × 2.5) + (2 × 1.5) = 20 ATP',
      glycerolPhosphateATP: '2 + (6 × 2.5) + (2 × 1.5) = 20 ATP'
    }
  ],
  totals: {
    malateAspartateShuttle: {
      name: 'Malate-Aspartate Shuttle (Hati, Ginjal, Jantung)',
      totalATP: 32,
      note: 'NADH sitosol ditransfer tanpa kehilangan potensial redoks, menghasilkan ~32 ATP per glukosa.'
    },
    glycerolPhosphateShuttle: {
      name: 'Glycerol-3-Phosphate Shuttle (Otot Rangka & Otak)',
      totalATP: 30,
      note: 'Elektron NADH sitosol diserahkan ke FAD mitokondria, menghasilkan ~30 ATP per glukosa.'
    }
  }
};

// 7. ANABOLISME KARBOHIDRAT
export const ANABOLISM_PATHWAYS: AnabolismPathwayInfo[] = [
  {
    id: 'glycogenesis',
    title: 'Glikogenesis: Pembentukan Cadangan Glikogen',
    location: 'Sitoplasma Sel Hati dan Sel Otot Rangka',
    hormonalControl: 'Distimulasi kuat oleh INSULIN (mengaktifkan protein fosfatase-1 yang mendefosforilasi dan mengaktifkan glycogen synthase)',
    precursors: ['D-Glukosa Bebas', 'UTP (Uridin Trifosfat)', 'Primer Protein Glikogenin'],
    products: ['Granula Glikogen Bercabang Padat'],
    keyEnzymes: [
      'Heksokinase / Glukokinase (Glukosa → G6P)',
      'Fosfoglukomutase (G6P ⇌ G1P)',
      'UDP-Glukosa Pirofosforilase (G1P + UTP → UDP-Glukosa)',
      'Glycogenin (membentuk primer rantai 8 glukosa awal)',
      'Glycogen Synthase (memperpanjang ikatan α-1,4 glikosidik)',
      'Branching Enzyme (membentuk cabang ikatan α-1,6 setiap 8–12 residu)'
    ],
    energyCostOrYield: 'Memerlukan 1 ATP (untuk fosforilasi) + 1 UTP per molekul glukosa yang disimpan',
    summary: 'Glukosa disimpan sebagai glikogen untuk meminimalkan tekanan osmotik di dalam sel. Jika 400 mM glukosa disimpan sebagai molekul bebas, sel akan membengkak dan lisis karena air tersedot masuk.'
  },
  {
    id: 'gluconeogenesis',
    title: 'Glukoneogenesis: Pembentukan Glukosa Baru',
    location: 'Terutama di Hati (~90%) dan Korteks Ginjal (~10%)',
    hormonalControl: 'Distimulasi oleh GLUKAGON dan KORTISOL; ditekan oleh INSULIN',
    precursors: ['Laktat (dari eritrosit & otot)', 'Gliserol (dari lipolisis trigliserida)', 'Asam Amino Glukogenik (Alanin)', 'Piruvat'],
    products: ['D-Glukosa Bebas untuk Mempertahankan Kadar Glukosa Darah'],
    keyEnzymes: [
      'Bypass 1: Pyruvate Carboxylase (Piruvat → OAA di mitokondria, butuh ATP & biotin) & PEPCK (OAA → PEP, butuh GTP)',
      'Bypass 2: Fructose-1,6-Bisphosphatase (F1,6BP → F6P)',
      'Bypass 3: Glucose-6-Phosphatase (G6P → Glukosa bebas di retikulum endoplasma hati)'
    ],
    energyCostOrYield: 'Biaya energi tinggi: 4 ATP + 2 GTP + 2 NADH per 1 molekul glukosa baru',
    summary: 'Glukoneogenesis BUKAN kebalikan sederhana dari glikolisis. Tiga reaksi glikolisis yang bersifat irreversible (heksokinase, PFK-1, piruvat kinase) dilewati melalui enzim bypass khusus.'
  },
  {
    id: 'cori_cycle',
    title: 'Siklus Cori: Daur Ulang Laktat Antarorgan (Otot ↔ Hati)',
    location: 'Sirkulasi Darah menghubungkan Otot Rangka dan Hepatosit Hati',
    hormonalControl: 'Dominan saat aktivitas anaerobik otot dan pemulihan (recovery)',
    precursors: ['Laktat dari otot rangka'],
    products: ['Glukosa yang dikembalikan ke otot melalui darah'],
    keyEnzymes: ['Laktat Dehidrogenase Otot (Piruvat → Laktat)', 'Laktat Dehidrogenase Hati (Laktat → Piruvat)', 'Enzim Glukoneogenesis Hati'],
    energyCostOrYield: 'Otot menghasilkan 2 ATP; Hati membakar 6 ikatan fosfat berenergi tinggi (4 ATP + 2 GTP). Defisit bersih: -4 ATP untuk tubuh.',
    summary: 'Siklus Cori mendistribusikan beban metabolik dari otot yang kekurangan oksigen ke hati, mencegah asidosis laktat berat dan mendaur ulang kerangka karbon.'
  },
  {
    id: 'lipogenesis',
    title: 'Lipogenesis dari Karbohidrat: Glukosa Menjadi Lemak',
    location: 'Sitoplasma Sel Hati dan Sel Adiposa',
    hormonalControl: 'Diinduksi oleh INSULIN tinggi dalam kondisi surplus kalori karbohidrat',
    precursors: ['Asetil-KoA (dari glikolisis & piruvat)', 'NADPH (dari Jalur Pentosa Fosfat)', 'Gliserol-3-Fosfat (dari DHAP glikolisis)'],
    products: ['Trigliserida (Triasilgliserol) disimpan di droplet jaringan adiposa'],
    keyEnzymes: [
      'Citrate Shuttle (Sitrat keluar mitokondria via tricarboxylate transporter)',
      'ATP-Citrate Lyase (Sitrat sitosol + ATP + KoA → Asetil-KoA + OAA)',
      'Acetyl-CoA Carboxylase / ACC (Asetil-KoA → Malonil-KoA, tahap penentu laju)',
      'Fatty Acid Synthase / FAS (kompleks multienzim pemanjang rantai asam palmitat)',
      'Glycerol-3-Phosphate Dehydrogenase (DHAP → Gliserol-3-P)'
    ],
    energyCostOrYield: 'Memerlukan banyak ATP dan NADPH untuk mereduksi ikatan karbon',
    summary: 'Ketika kapasitas penyimpanan glikogen telah jenuh, kelebihan karbon karbohidrat diubah menjadi lemak cadangan energi jangka panjang.'
  },
  {
    id: 'metabolic_map',
    title: 'Peta Integrasi Antarjalur Metabolisme',
    location: 'Sistemik (Sitosol, Mitokondria, dan Sirkulasi Darah)',
    hormonalControl: 'Keseimbangan dinamis Rasio Insulin : Glukagon',
    precursors: ['Glukosa', 'Asam Lemak', 'Asam Amino'],
    products: ['Keseimbangan Energi Tubuh'],
    keyEnzymes: ['Enzim-enzim persimpangan metabolik'],
    energyCostOrYield: 'Homeostasis dinamis',
    summary: 'Titik persimpangan utama: Glukosa-6-Fosfat, Piruvat, dan Asetil-KoA menentukan ke mana arah molekul dialirkan bergantung pada kebutuhan energi saat itu.'
  }
];

// Titik Intermediat Persimpangan Metabolik
export const METABOLIC_CROSSROADS = [
  {
    name: 'Glukosa-6-Fosfat (G6P)',
    color: '#F59E0B',
    fates: [
      'Glikolisis → menghasilkan piruvat dan ATP saat sel butuh energi.',
      'Glikogenesis → disimpan menjadi glikogen saat sel surplus energi dan insulin tinggi.',
      'Jalur Pentosa Fosfat (HMP Shunt) → menghasilkan NADPH untuk biosintesis reduktif dan Ribosa-5-P untuk asam nukleat.',
      'Defosforilasi di Hati via Glukosa-6-Fosfatase → melepaskan glukosa bebas ke sirkulasi darah saat puasa.'
    ]
  },
  {
    name: 'Piruvat (3C)',
    color: '#10B981',
    fates: [
      'Dekarboksilasi Oksidatif → menjadi Asetil-KoA di matriks mitokondria (aerob).',
      'Reduksi menjadi Laktat → di sitoplasma saat oksigen terbatas (anaerob) untuk regenerasi NAD⁺.',
      'Karboksilasi menjadi Oksaloasetat → oleh piruvat karboksilase untuk glukoneogenesis atau anaplerosis Siklus Krebs.',
      'Transaminasi menjadi Alanin → reversibel dengan glutamat via enzim alanin aminotransferase (ALT).'
    ]
  },
  {
    name: 'Asetil-KoA (2C)',
    color: '#EAB308',
    fates: [
      'Siklus Krebs → dioksidasi sempurna menghasilkan CO₂, NADH, FADH₂, dan GTP.',
      'Lipogenesis → disintesis menjadi asam lemak dan trigliserida di sitoplasma via sitrat shuttle.',
      'Ketogenesis → diubah menjadi badan keton di hati saat puasa berkepanjangan.',
      'CATATAN ILMIAH: Pada manusia, Asetil-KoA TIDAK DAPAT menghasilkan sintesis glukosa bersih karena reaksi piruvat dehidrogenase bersifat irreversible dan mamalia tidak memiliki siklus glioksilat.'
    ]
  },
  {
    name: 'Dihidroksiaseton Fosfat (DHAP)',
    color: '#06B6D4',
    fates: [
      'Isomerisasi menjadi G3P → melanjutkan glikolisis.',
      'Reduksi menjadi Gliserol-3-Fosfat → membentuk tulang punggung gliserol untuk sintesis trigliserida (menghubungkan metabolisme karbohidrat dengan lipid).'
    ]
  },
  {
    name: 'Oksaloasetat (4C)',
    color: '#3B82F6',
    fates: [
      'Bergabung dengan Asetil-KoA → membentuk sitrat dalam Siklus Krebs.',
      'Diubah menjadi PEP via PEPCK → untuk glukoneogenesis.',
      'Transaminasi menjadi Aspartat → untuk sintesis nukleotida dan shuttle malat-aspartat.'
    ]
  }
];

// Reaksi Bypass Glukoneogenesis
export interface GluconeogenesisBypass {
  bypassNumber: 1 | 2 | 3;
  name: string;
  location: string;
  gluconeogenicEnzymes: string[];
  glycolyticEnzymeBypassed: string;
  reactionDescription: string;
}

export const GLUCONEOGENESIS_BYPASS_REACTIONS: GluconeogenesisBypass[] = [
  {
    bypassNumber: 1,
    name: 'Piruvat ke Fosfoenolpiruvat (PEP)',
    location: 'Mitokondria & Sitoplasma',
    gluconeogenicEnzymes: ['Pyruvate Carboxylase (PC)', 'PEP Carboxykinase (PEPCK)'],
    glycolyticEnzymeBypassed: 'Pyruvate Kinase',
    reactionDescription: 'Piruvat dikarboksilasi di mitokondria menjadi oksaloasetat (butuh ATP & Biotin), direduksi jadi malat untuk keluar ke sitosol, lalu dioksidasi kembali jadi OAA dan didekarboksilasi oleh PEPCK menjadi PEP (butuh GTP).'
  },
  {
    bypassNumber: 2,
    name: 'Fruktosa-1,6-Bisfosfat ke Fruktosa-6-Fosfat',
    location: 'Sitoplasma',
    gluconeogenicEnzymes: ['Fructose-1,6-Bisphosphatase-1 (FBPase-1)'],
    glycolyticEnzymeBypassed: 'Phosphofructokinase-1 (PFK-1)',
    reactionDescription: 'Hidrolisis ester fosfat pada C-1 menghasilkan F6P dan Pi anorganik tanpa menghasilkan ATP. Titik regulasi alosterik utama oleh F-2,6-BP dan AMP.'
  },
  {
    bypassNumber: 3,
    name: 'Glukosa-6-Fosfat ke D-Glukosa Bebas',
    location: 'Lumen Retikulum Endoplasma (Hepatosit & Ginjal)',
    gluconeogenicEnzymes: ['Glucose-6-Phosphatase'],
    glycolyticEnzymeBypassed: 'Hexokinase / Glucokinase',
    reactionDescription: 'G6P ditranspor ke lumen RE oleh G6P-transporter, lalu dihidrolisis menjadi glukosa bebas dan Pi. Glukosa dilepas ke sirkulasi darah via GLUT2 untuk menjaga kadar gula darah.'
  }
];

// Data Siklus Cori Antarorgan
export const CORI_CYCLE_DATA = {
  title: 'Siklus Cori (Daur Ulang Laktat Otot ↔ Hati)',
  description: 'Daur ulang laktat hasil glikolisis anaerobik otot rangka ke hati untuk disintesis kembali menjadi glukosa darah melalui glukoneogenesis.',
  stages: [
    {
      organ: 'Otot Rangka',
      process: 'Glikolisis anaerobik memecah glukosa menjadi 2 laktat untuk menghasilkan ATP kilat.',
      energyCost: '+2 ATP dihasilkan untuk kerja kontraksi otot'
    },
    {
      organ: 'Sirkulasi Darah',
      process: 'Laktat diangkut dari sel otot ke vena porta hepatika melalui monocarboxylate transporter (MCT).',
      energyCost: 'Transport pasif terfasilitasi'
    },
    {
      organ: 'Hati (Hepatosit)',
      process: 'LDH hati mengoksidasi laktat menjadi piruvat, lalu glukoneogenesis mengubah 2 piruvat menjadi glukosa bebas.',
      energyCost: '-6 Ekuivalen ATP (4 ATP + 2 GTP) dikonsumsi oleh hati'
    },
    {
      organ: 'Sirkulasi Darah Balik',
      process: 'Glukosa baru dikembalikan melalui sirkulasi sistemik ke otot rangka untuk cadangan energi.',
      energyCost: 'Menjaga homeostasis glukosa tanpa penurunan pH sistemik'
    }
  ],
  clinicalSignificance: 'Mencegah asidosis laktat berbahaya selama olahraga sprint anaerobik dan memindahkan beban biaya energi pemulihan ke organ hati.'
};

// Data Lipogenesis dari Karbohidrat
export const LIPOGENESIS_FROM_CARBS_DATA = {
  title: 'Lipogenesis: Sintesis Lemak dari Karbohidrat',
  description: 'Saat asupan karbohidrat melampaui kapasitas simpan glikogen tubuh, kelebihan glukosa dikonversi menjadi asam lemak dan trigliserida untuk disimpan di jaringan adiposa.',
  citrateShuttleMechanism: 'Asetil-KoA terbentuk di matriks mitokondria namun tidak memiliki transporter untuk menembus membran dalam. Oleh karena itu, Asetil-KoA berkondensasi dengan oksaloasetat membentuk Sitrat. Sitrat keluar mitokondria via tricarboxylate transporter ke sitoplasma, lalu dipecah oleh ATP-Citrate Lyase menjadi Asetil-KoA sitosol dan Oksaloasetat.',
  keyEnzymes: [
    'ATP-Citrate Lyase',
    'Acetyl-CoA Carboxylase (ACC - diaktivasi insulin)',
    'Fatty Acid Synthase (FAS)',
    'Glycerol-3-Phosphate Dehydrogenase'
  ]
};

// Kondisi Fisiologis Sistemik
export interface PhysiologicalCondition {
  id: string;
  name: string;
  badge: string;
  hormoneDominance: string;
  glucoseStatus: string;
  insulinGlucagonRatio?: string;
  activePathways: {
    pathway: string;
    organ: string;
    mechanism: string;
  }[];
  inhibitedPathways: string[];
  summary: string;
}

export const PHYSIOLOGICAL_CONDITIONS: PhysiologicalCondition[] = [
  {
    id: 'fed',
    name: 'Kondisi Kenyang (Postprandial)',
    badge: 'Insulin Tinggi / Glukagon Rendah',
    hormoneDominance: 'Insulin Tinggi',
    glucoseStatus: 'Kadar Glukosa Darah Meningkat (>140 mg/dL)',
    insulinGlucagonRatio: 'Tinggi (↑ Rasio Insulin : Glukagon)',
    activePathways: [
      { pathway: 'Glikolisis', organ: 'Hati & Otot', mechanism: 'Membakar glukosa darah berlebih untuk produksi energi seluler dan asetil-KoA.' },
      { pathway: 'Glikogenesis', organ: 'Hati & Otot Rangka', mechanism: 'Mengaktifkan glycogen synthase untuk mengisi cadangan glikogen hingga kapasitas optimal.' },
      { pathway: 'Lipogenesis', organ: 'Hati & Jaringan Adiposa', mechanism: 'Kelebihan karbon glukosa diubah menjadi asam lemak via sitrat shuttle dan disimpan sebagai trigliserida.' },
      { pathway: 'Jalur Pentosa Fosfat', organ: 'Hati & Adiposa', mechanism: 'Menyediakan NADPH untuk biosintesis asam lemak dan ribosa-5-P.' }
    ],
    inhibitedPathways: ['Glukoneogenesis Hati', 'Glikogenolisis', 'Lipolisis Trigliserida', 'Ketogenesis'],
    summary: 'Tubuh berada dalam kondisi anabolik penyimpanan. Seluruh jaringan diinstruksikan memanfaatkan glukosa sebagai bahan bakar utama dan menimbun kelebihannya sebagai glikogen serta lemak.'
  },
  {
    id: 'fasting',
    name: 'Kondisi Puasa Ringan (Postabsorptif 8–12 Jam)',
    badge: 'Glukagon Tinggi / Insulin Rendah',
    hormoneDominance: 'Glukagon Tinggi',
    glucoseStatus: 'Kadar Glukosa Darah Menurun (~70-90 mg/dL)',
    insulinGlucagonRatio: 'Rendah (↓ Rasio Insulin : Glukagon)',
    activePathways: [
      { pathway: 'Glikogenolisis Hati', organ: 'Hepatosit Hati', mechanism: 'Memecah glikogen hati via glycogen phosphorylase untuk melepas glukosa bebas ke darah.' },
      { pathway: 'Glukoneogenesis Dini', organ: 'Hati', mechanism: 'Mulai memproduksi glukosa baru dari laktat dan gliserol.' },
      { pathway: 'Lipolisis Jaringan Lemak', organ: 'Adiposa', mechanism: 'Trigliserida dipecah menjadi asam lemak bebas untuk bahan bakar otot dan jantung, menghemat glukosa.' }
    ],
    inhibitedPathways: ['Glikogenesis', 'Lipogenesis', 'Glikolisis Otot & Hati'],
    summary: 'Hati berperan sebagai penyuplai utama glukosa untuk organ yang bergantung mutlak pada glukosa seperti otak dan eritrosit dengan memecah glikogen hati.'
  },
  {
    id: 'exercise',
    name: 'Olahraga / Aktivitas Fisik Intens',
    badge: 'Adrenalin & Epinefrin Tinggi',
    hormoneDominance: 'Epinefrin & Glukagon',
    glucoseStatus: 'Permintaan Glukosa Otot Sangat Tinggi',
    insulinGlucagonRatio: 'Epinefrin & AMP Seluler Sangat Tinggi',
    activePathways: [
      { pathway: 'Glikolisis Cepat & Anaerob', organ: 'Otot Rangka', mechanism: 'AMP alosterik mengaktifkan PFK-1 untuk ledakan energi kilat menghasilkan ATP dan laktat.' },
      { pathway: 'Glikogenolisis Otot', organ: 'Otot Rangka', mechanism: 'Memecah glikogen intraseluler otot langsung untuk kebutuhan energi kontraksi miofibril.' },
      { pathway: 'Siklus Cori', organ: 'Otot ↔ Hati', mechanism: 'Laktat otot dialirkan ke hati untuk didaur ulang menjadi glukosa baru.' }
    ],
    inhibitedPathways: ['Glikogenesis', 'Lipogenesis', 'Sintesis Protein'],
    summary: 'Otot memprioritaskan pemecahan glukosa dan glikogen cadangannya secara maksimal, didukung translokasi GLUT4 ke membran secara independen dari insulin berkat aktivasi protein kinase AMPK.'
  }
];

// Karakteristik Organ Khusus
export interface OrganSpecificRole {
  organ: string;
  fuelPreference: string;
  transporter: string;
  notes: string;
}

export const ORGAN_SPECIFIC_ROLES: OrganSpecificRole[] = [
  {
    organ: 'Otak (Sistem Saraf Pusat)',
    fuelPreference: 'Glukosa Bebas (120 g/hari)',
    transporter: 'GLUT1 & GLUT3 (Afinitas sangat tinggi, Km rendah, tidak tergantung insulin)',
    notes: 'Mengonsumsi ~60% glukosa tubuh saat istirahat. Otak tidak dapat membakar asam lemak karena tidak dapat menembus sawar darah otak (blood-brain barrier). Pada puasa panjang (>3 hari), otak beradaptasi membakar badan keton.'
  },
  {
    organ: 'Eritrosit (Sel Darah Merah)',
    fuelPreference: 'Glukosa secara Mutlak (Anaerobik)',
    transporter: 'GLUT1 (Insulin-independent)',
    notes: 'Eritrosit tidak memiliki mitokondria, sehingga metabolisme karbohidratnya 100% bergantung pada glikolisis anaerobik yang selalu menghasilkan laktat untuk dikirim ke Siklus Cori.'
  },
  {
    organ: 'Hepatosit (Hati)',
    fuelPreference: 'Asam Lemak, Asam Amino, Glukosa',
    transporter: 'GLUT2 (Kapasitas tinggi, Km tinggi ~15-20 mM) & Glukokinase',
    notes: 'Pusat komando glukostat tubuh: menyerap glukosa hanya saat kadar darah tinggi (postprandial) dan memproduksi glukosa bebas ke darah saat puasa berkat enzim Glucose-6-Phosphatase.'
  },
  {
    organ: 'Otot Rangka',
    fuelPreference: 'Asam Lemak saat istirahat; Glukosa saat kontraksi',
    transporter: 'GLUT4 (Direkrut ke membran oleh insulin dan kontraksi via AMPK)',
    notes: 'Menyimpan 75% glikogen seluruh tubuh (~400 g). Otot tidak memiliki enzim Glucose-6-Phosphatase, sehingga glikogen otot TIDAK BISA dilepas ke darah dan hanya digunakan untuk kontraksi otot itu sendiri.'
  },
  {
    organ: 'Jaringan Adiposa (Lemak)',
    fuelPreference: 'Asam Lemak & Glukosa',
    transporter: 'GLUT4 (Insulin-dependent)',
    notes: 'Membutuhkan glukosa untuk menghasilkan dihidroksiaseton fosfat (DHAP) yang kemudian direduksi menjadi gliserol-3-fosfat sebagai kerangka pengikat asam lemak menjadi trigliserida.'
  },
  {
    organ: 'Miokardium (Jantung)',
    fuelPreference: 'Asam Lemak (60–70%), Laktat (20%), Glukosa',
    transporter: 'GLUT4 & GLUT1',
    notes: 'Secara unik sangat menyukai laktat sebagai bahan bakar aerobik, membantu membersihkan laktat darah yang dihasilkan oleh otot rangka atau eritrosit.'
  }
];

// =========================================================================
// MATERI SPESIFIK PRESENTASI KULIAH (KATABOLISME & ANABOLISME KARBOHIDRAT)
// =========================================================================

// 1. Brain Teasers & Diskusi Reflektif Pembuka Slide
export const CARB_SLIDE_TEASERS = {
  riceVsVeggie: {
    question: 'Tapi, Kenapa ya orang yang hanya makan sayur merasa energinya lebih sedikit dibandingkan orang yang makan nasi? Padahal sama-sama mengandung karbohidrat dan glukosa.',
    nasiType: 'Pati / Amilum (Amilosa α-1,4 dan Amilopektin cabang α-1,6)',
    nasiEnzyme: 'Enzim Amilase (Saliva & Pankreas) — Manusia memiliki enzim ini sehingga pati nasi dihidrolisis menjadi glukosa bebas yang diserap menghasilkan banyak ATP.',
    sayurType: 'Selulosa (Polimer glukosa dengan ikatan β-1,4 glikosidik)',
    sayurEnzyme: 'Enzim Selulase — Manusia TIDAK memiliki enzim selulase di saluran cerna, sehingga ikatan beta tidak dapat dipecah. Selulosa lewat sebagai serat pangan (dietary fiber) tanpa melepaskan glukosa kalori.',
    takeaway: 'Perbedaan stereokimia ikatan glikosidik (alfa vs beta) menentukan apakah suatu polisakarida dapat dicerna dan dimanfaatkan sebagai sumber energi seluler.'
  },
  sprintLactate: {
    question: 'Kenapa Paha Duluan "Panas" / Pegal Saat Lari Cepat (Sprint)?',
    context: 'Saat kamu lari secepat mungkin (sprint), otot paha biasanya terasa "panas"/pegal lebih dulu dibanding kalau kamu jalan santai berjam-jam.',
    mechanism: 'Saat sprint maksimal, kebutuhan ATP intramiosit melebihi laju pasokan oksigen oleh sistem kardiovaskular. Rantai transpor elektron mitokondria melambat karena kekurangan O₂.',
    solution: 'Otot beralih ke Glikolisis Anaerobik kilat. Enzim Laktat Dehidrogenase (LDH) mereduksi piruvat menjadi Asam Laktat demi meregenerasi NAD⁺ sitosol agar glikolisis tidak mandek.',
    causeOfBurn: 'Akumulasi asam laktat terdisosiasi melepaskan ion H⁺ (proton) di dalam sarkoplasma, menurunkan pH lokal (asidosis metabolik miosit) yang mengiritasi ujung saraf nosiseptif sehingga terasa "panas" dan kaku.'
  },
  glycolysisEquations: {
    reaksiBersih: 'Glukosa + 2 NAD⁺ + 2 ADP + 2 Pi ⟶ 2 Piruvat + 2 NADH + 2 ATP + 2 H₂O + 2 H⁺',
    reaksiKotor: 'Glukosa + 2 NAD⁺ + 2 ATP + 4 ADP + 2 Pi ⟶ 2 Piruvat + 2 NADH + 2 H⁺ + 4 ATP + 2 ADP + 2 H₂O',
    penjelasan: 'Fase Investasi Energi memakai 2 ATP (tahap 1 heksokinase & tahap 3 PFK-1), sedangkan Fase Pembayaran Energi menghasilkan 4 ATP (tahap 7 fosfogliserat kinase & tahap 10 piruvat kinase), sehingga diperoleh keuntungan bersih (net yield) 2 ATP per glukosa.'
  },
  otherSugarsEntry: {
    galaktosa: {
      source: 'Hasil hidrolisis Laktosa (gula susu) oleh enzim laktase.',
      pathway: 'Galaktosa ⟶ Galaktosa-1-P ⟶ Glukosa-1-P ⟶ Glukosa-6-P (Jalur Leloir / Leloir Pathway).',
      entryPoint: 'Masuk sebagai Glukosa-6-Fosfat (G6P) pada tahap 2 glikolisis.'
    },
    fruktosa: {
      source: 'Hasil hidrolisis Sukrosa (gula tebu/meja) atau sirup jagung fruktosa tinggi (minuman manis/boba).',
      liverPathway: 'Di Hati: Fruktosa ⟶ Fruktosa-1-P (via fruktokinase, konsumsi 1 ATP). Fruktosa-1-P kemudian dipecah oleh aldolase B menjadi DHAP dan Gliseraldehida (bypass PFK-1!).',
      musclePathway: 'Di Otot & Jaringan Perifer: Fruktosa difosforilasi langsung oleh Heksokinase menjadi Fruktosa-6-P (F6P) yang masuk tahap 3 glikolisis.',
      clinicalWarning: 'Di hati, fruktosa mem-bypass titik kontrol utama PFK-1. Akibatnya, asupan fruktosa berlebih tidak diatur oleh status energi sel dan langsung dibelokkan menjadi pembentukan lemak (lipogenesis/trigliserida) pemicu fatty liver dan obesitas.'
    }
  },
  modernVsClassicAtp: {
    classic: {
      era: 'Era Klasik (1960–1980-an)',
      basis: 'Metode rasio P/O (Phosphate/Oxygen ratio) perkiraan kasar:',
      nadhYield: '1 NADH ⟶ dianggap 3 ATP (3 titik fosforilasi di Kompleks I, III, IV)',
      fadh2Yield: '1 FADH₂ ⟶ dianggap 2 ATP (bypass Kompleks I, lewat Kompleks III & IV)',
      totalYield: 'Total 36 s.d. 38 ATP per molekul glukosa'
    },
    modern: {
      era: 'Era Modern (1990-an sampai sekarang)',
      basis: 'Respirometri presisi tinggi & kristalografi struktur rotor c-ring ATP Synthase (Nicholls & Ferguson 2013; Allegretti et al., Nature 2015):',
      protonPumping: 'Kompleks I memompa 4 H⁺, Kompleks III memompa 4 H⁺, Kompleks IV memompa 2 H⁺. Total 10 H⁺ dipompa per NADH; 6 H⁺ dipompa per FADH₂.',
      cRingCost: 'ATP Synthase mamalia memiliki 8 subunit cincin-c, menghasilkan 3 ATP per 1 putaran penuh (8 ÷ 3 ≈ 2.67 H⁺, dibulatkan ~3 H⁺ per ATP). Ditambah 1 H⁺ untuk kotranspor fosfat anorganik (Pi) dan ADP ke dalam matriks via symporter fosfat.',
      perAtpCost: 'Dibutuhkan ~4 H⁺ per 1 molekul ATP yang disintesis dan diekspor.',
      nadhCalculation: '10 H⁺ ÷ 4 H⁺/ATP = 2,5 ATP per NADH',
      fadh2Calculation: '6 H⁺ ÷ 4 H⁺/ATP = 1,5 ATP per FADH₂',
      finalYield: 'Otot & Otak (Glycerol-3-P shuttle): 30 ATP/glukosa; Hati, Ginjal & Jantung (Malate-Aspartate shuttle): 32 ATP/glukosa.'
    }
  },
  septicShockEmergency: {
    title: 'Studi Kasus UGD: Hiperlaktatemia Berat pada Pasien Syok Septik',
    scenario: 'Seorang pasien datang ke IGD dalam kondisi syok septik akibat infeksi sistemik berat. Hasil analisa gas darah dan biomarker lab menunjukkan kadar asam laktat darah meningkat drastis >6 mmol/L (hiperlaktatemia & asidosis laktat). Dokter jaga menjelaskan sel-sel tubuh pasien mengalami hipoksia jaringan berat.',
    clinicalMechanism: 'Hipotensi dan disfungsi mikrosirkulasi pada syok septik menyebabkan hipoperfusi jaringan. Kurangnya O₂ menghentikan rantai transpor elektron mitokondria. Sel beralih 100% ke glikolisis anaerobik untuk mempertahankan sintesis ATP darurat, memproduksi laktat masif via Laktat Dehidrogenase.',
    emergencySignificance: 'Meskipun hanya menghasilkan 2 ATP per glukosa (jauh lebih sedikit dibanding 32 ATP aerobik), jalur anaerob adalah satu-satunya mekanisme seluler yang mampu meregenerasi NAD⁺ sitosol agar sel tidak mengalami lisis nekrotik seketika.'
  }
};

// 2. Neraca Energi Anabolisme Karbohidrat
export interface AnabolismEnergyCost {
  pathway: string;
  atpGtpCost: string;
  nadhCost: string;
  nadphCost: string;
  notes: string;
}

export const ANABOLISM_ENERGY_TABLE: AnabolismEnergyCost[] = [
  {
    pathway: 'Glikogenesis (Sintesis Glikogen)',
    atpGtpCost: '1 ATP (Heksokinase) + 1 UTP (Aktivasi Glukosa-1-P)',
    nadhCost: '—',
    nadphCost: '—',
    notes: 'Total biaya ekuivalen 2 ikatan fosfat berenergi tinggi per unit residu glukosa yang disimpan.'
  },
  {
    pathway: 'Glukoneogenesis (dari 2 Piruvat)',
    atpGtpCost: '4 ATP + 2 GTP (Total 6 fosfat berenergi tinggi)',
    nadhCost: '2 NADH (untuk reduksi 1,3-BPG ke G3P)',
    nadphCost: '—',
    notes: 'Konsumsi energi tinggi memastikan jalur glukoneogenesis tetap bersifat eksergonik (ireversibel ke arah sintesis glukosa).'
  },
  {
    pathway: 'Lipogenesis (Sintesis Asam Palmitat 16C)',
    atpGtpCost: '7 ATP (Karboksilasi Asetil-KoA menjadi Malonil-KoA oleh ACC)',
    nadhCost: '—',
    nadphCost: '14 NADPH (Penyedia elektron pereduksi untuk FASN)',
    notes: 'Dibiayai oleh Jalur Pentosa Fosfat (PPP) dan Malic Enzyme yang memproduksi NADPH berlimpah saat kenyang.'
  },
  {
    pathway: 'Sintesis Asam Amino Non-Esensial',
    atpGtpCost: 'Variatif (biasanya 1–2 ATP per molekul)',
    nadhCost: '—',
    nadphCost: 'Jarang (contoh pada reduksi pirolin-5-karboksilat menjadi prolin)',
    notes: 'Memanfaatkan kerangka karbon dari intermediat glikolisis (3-PGA, Piruvat) dan Siklus Krebs (OAA, α-Ketoglutarat).'
  }
];

// 3. Delapan Studi Kasus Jigsaw (8 Kasus, 8 Kelompok Ahli Sesuai Slide)
export interface JigsawCaseStudy {
  id: number;
  groupName: string;
  topic: string;
  scenario: string;
  studentTask: string;
  scaffoldingQuestions: string[];
  keyBiochemicalTakeaway: string;
}

export const JIGSAW_CASE_STUDIES: JigsawCaseStudy[] = [
  {
    id: 1,
    groupName: 'Kelompok 1',
    topic: 'Glikogenesis',
    scenario: 'Seorang atlet lari jarak jauh melakukan teknik "carbo-loading" sebelum kompetisi maraton. Ia mengonsumsi menu tinggi karbohidrat kompleks di malam hari. Tubuhnya akan menyimpan kelebihan glukosa tersebut sebagai cadangan bahan bakar siap pakai.',
    studentTask: 'Jelaskan bagaimana tubuh atlet menyimpan kelebihan glukosa dalam bentuk glikogen.',
    scaffoldingQuestions: [
      'Apa enzim utama yang memulai proses penangkapan dan penyimpanan glikogen?',
      'Mengapa glukosa tidak langsung disimpan dalam bentuk glukosa bebas di dalam sitoplasma sel?',
      'Di jaringan mana glikogen paling banyak disimpan dan apa perbedaannya?'
    ],
    keyBiochemicalTakeaway: 'Glukosa difosforilasi menjadi G6P, diisomerisasi menjadi G1P, diaktifkan oleh UTP menjadi UDP-glukosa, kemudian dipanjangkan oleh Glikogen Sintase (ikatan α-1,4) dan dicabangkan oleh Glycogen Branching Enzyme (ikatan α-1,6). Penyimpanan sebagai polimer glikogen mencegah tekanan osmotik seluler yang berlebihan.'
  },
  {
    id: 2,
    groupName: 'Kelompok 2',
    topic: 'Glikogenolisis',
    scenario: 'Seorang mahasiswa berpuasa selama 14 jam. Kadar glukosa darahnya mulai menurun ke batas bawah normal, namun otaknya tetap harus menerima pasokan energi glukosa secara terus-menerus. Tubuhnya lalu memecah simpanan glikogen hati.',
    studentTask: 'Uraikan proses glikogenolisis dan bagaimana hasilnya didistribusikan untuk melindungi organ vital.',
    scaffoldingQuestions: [
      'Apa peran enzim glikogen fosforilase pada proses ini?',
      'Mengapa hati dan otot rangka memiliki perbedaan mendasar dalam pelepasan glukosa ke aliran darah?',
      'Apa yang terjadi dengan kadar glukosa darah setelah proses glikogenolisis hati aktif?'
    ],
    keyBiochemicalTakeaway: 'Glikogen fosforilase memecah ikatan α-1,4 menghasilkan Glukosa-1-P tanpa memakai ATP (fosforolisis). Hati memiliki enzim Glucose-6-Phosphatase sehingga dapat membebaskan glukosa netral ke darah untuk konsumsi otak, sedangkan otot rangka tidak memiliki enzim tersebut sehingga glikogen otot terkunci untuk kontraksi miofibril sendiri.'
  },
  {
    id: 3,
    groupName: 'Kelompok 3',
    topic: 'Glikolisis',
    scenario: 'Seorang pasien mengalami hipoksia akut (kekurangan oksigen jaringan) akibat sesak napas berat pada pneumonia. Sel-sel parenkim tubuhnya tetap membutuhkan ATP konstan sehingga mengandalkan jalur glikolisis anaerobik.',
    studentTask: 'Jelaskan bagaimana jalur glikolisis berlangsung pada kondisi defisiensi oksigen berat.',
    scaffoldingQuestions: [
      'Apa perbedaan produk akhir glikolisis pada kondisi aerob vs anaerob?',
      'Mengapa terbentuk asam laktat dalam kondisi anaerob dan enzim apa yang mengkatalisisnya?',
      'Berapa jumlah ATP bersih yang dihasilkan dari glikolisis saja per molekul glukosa?'
    ],
    keyBiochemicalTakeaway: 'Pada kondisi aerob, piruvat masuk ke mitokondria menjadi Asetil-KoA. Pada anaerob, piruvat direduksi oleh Laktat Dehidrogenase (LDH) menjadi L-laktat dengan mengoksidasi NADH kembali menjadi NAD⁺ sitosol. Glikolisis hanya menghasilkan 2 ATP bersih per glukosa, namun berlangsung sangat cepat untuk mencegah kematian sel.'
  },
  {
    id: 4,
    groupName: 'Kelompok 4',
    topic: 'Glukoneogenesis',
    scenario: 'Seorang penderita Diabetes Melitus Tipe 1 lupa menyuntikkan insulin hariannya. Meskipun kadar glukosa dalam darahnya sangat tinggi (>300 mg/dL), sel-selnya mengalami kelaparan intraseluler ("starvation in the midst of plenty"). Hati pasien justru terus memproduksi glukosa baru tanpa henti.',
    studentTask: 'Jelaskan asal bahan baku glukoneogenesis dan alasan biokimia mengapa hati penderita diabetes tetap membuat glukosa.',
    scaffoldingQuestions: [
      'Dari mana saja bahan baku glukoneogenesis dapat diperoleh selain dari karbohidrat makanan?',
      'Apa hubungan glukoneogenesis dengan rasio hormon insulin dan glukagon yang terganggu?',
      'Mengapa hati berperan paling penting dalam homeostasis glukosa darah?'
    ],
    keyBiochemicalTakeaway: 'Ketiadaan insulin menyebabkan rasio Glukagon/Insulin melonjak tinggi. Glukagon memicu transkripsi gen enzim bypass glukoneogenesis (PEPCK, FBPase-1, G6Pase). Akibatnya, asam amino glukogenik dari pemecahan protein otot terus diubah menjadi glukosa baru di hati, memperparah hiperglikemia.'
  },
  {
    id: 5,
    groupName: 'Kelompok 5',
    topic: 'Lipogenesis',
    scenario: 'Seorang mahasiswa hobi mengonsumsi minuman boba tinggi gula dan sirup fruktosa setiap hari. Kelebihan kalori gula dalam tubuhnya tidak hanya disimpan sebagai glikogen, melainkan diubah menjadi jaringan lemak subkutan dan viseral.',
    studentTask: 'Jelaskan bagaimana kelebihan molekul glukosa dan fruktosa dapat bertransformasi menjadi timbunan asam lemak.',
    scaffoldingQuestions: [
      'Apa peran Asetil-KoA dan Citrate Shuttle dalam proses lipogenesis?',
      'Mengapa proses pembentukan lemak ini terjadi terutama di jaringan hati dan jaringan adiposa?',
      'Apa hubungan konsumsi gula berlebih harian dengan timbulnya sindrom metabolik dan obesitas?'
    ],
    keyBiochemicalTakeaway: 'Ketika simpanan glikogen jenuh, sitrat mitokondria melimpah keluar ke sitosol melalui Citrate Shuttle. Enzim ATP-Citrate Lyase (ACLY) memecah sitrat menjadi Asetil-KoA sitosol, yang dikarboksilasi menjadi Malonil-KoA oleh ACC, lalu dirakit menjadi asam palmitat oleh Fatty Acid Synthase (FASN) berbahan 14 NADPH. Asam lemak diesterifikasi dengan gliserol-3-P (dari DHAP glikolisis) menjadi trigliserida.'
  },
  {
    id: 6,
    groupName: 'Kelompok 6',
    topic: 'Lipolisis vs Lipogenesis',
    scenario: 'Seorang individu sedang menjalani program diet ketat defisit kalori dan olahraga kardio teratur. Karena tubuhnya tidak mendapatkan pasokan karbohidrat yang cukup, simpanan trigliserida dalam jaringan adiposa mulai dimobilisasi sebagai sumber energi utama.',
    studentTask: 'Bandingkan mekanisme lipogenesis (penyimpanan lemak) dengan lipolisis (pemecahan lemak).',
    scaffoldingQuestions: [
      'Bagaimana molekul trigliserida dipecah oleh lipase menjadi sumber energi bebas?',
      'Apa produk akhir lipolisis yang bisa masuk kembali ke jalur energi pembentukan ATP?',
      'Mengapa proses pemecahan lemak ini meningkat pesat pada kondisi puasa atau diet rendah karbohidrat?'
    ],
    keyBiochemicalTakeaway: 'Lipogenesis dirangsang insulin saat kenyang untuk menyimpan energi. Sebaliknya, saat defisit kalori, hormon glukagon dan epinefrin mengaktifkan Hormone-Sensitive Lipase (HSL) via cAMP untuk memecah trigliserida menjadi 3 Asam Lemak Bebas (FFA) dan 1 Gliserol. Asam lemak mengalami β-oksidasi di mitokondria menghasilkan Asetil-KoA melimpah, sedangkan gliserol masuk glukoneogenesis di hati.'
  },
  {
    id: 7,
    groupName: 'Kelompok 7',
    topic: 'Sintesis Asam Amino Non-Esensial',
    scenario: 'Seorang pasien vegetarian murni (vegan) tidak mengonsumsi daging atau protein hewani, namun tubuhnya tetap mampu memproduksi sebagian besar asam amino yang dibutuhkan untuk perbaikan jaringan selulernya.',
    studentTask: 'Jelaskan bagaimana asam amino non-esensial disintesis langsung dari zat antara (intermediat) metabolisme karbohidrat.',
    scaffoldingQuestions: [
      'Apa peran metabolit α-ketoglutarat, oksaloasetat, atau 3-fosfogliserat dalam biosintesis asam amino?',
      'Apa yang membedakan asam amino esensial dan asam amino non-esensial bagi tubuh manusia?',
      'Bagaimana reaksi transaminasi berperan dalam pertukaran gugus amino (-NH₂)?'
    ],
    keyBiochemicalTakeaway: 'Asam amino non-esensial dapat dibuat oleh tubuh manusia karena kerangka karbonnya disediakan oleh jalur glikolisis (3-PGA menjadi Serin, Sistein, Glisin; Piruvat menjadi Alanin) dan Siklus Krebs (Oksaloasetat menjadi Aspartat dan Asparagin; α-Ketoglutarat menjadi Glutamat, Glutamin, Prolin, Arginin) melalui enzim transaminase dengan koenzim piridoksal fosfat (PLP/Vitamin B6).'
  },
  {
    id: 8,
    groupName: 'Kelompok 8',
    topic: 'Katabolisme Asam Amino & Siklus Urea',
    scenario: 'Seorang pasien dengan gagal ginjal stadium lanjut mengalami kelemahan berat, mual, dan penurunan kesadaran. Pemeriksaan darah menunjukkan penumpukan kadar amonia darah (hiperamonemia) dan ureum yang sangat tinggi akibat gangguan eliminasi nitrogen sisa metabolisme protein.',
    studentTask: 'Jelaskan bagaimana tubuh manusia memproses limbah nitrogen beracun hasil katabolisme asam amino dan hubungannya dengan Siklus Urea di hati.',
    scaffoldingQuestions: [
      'Apa yang terjadi pada gugus amino (-NH₂) ketika asam amino didegradasi untuk pembentukan energi?',
      'Mengapa Siklus Urea di mitokondria dan sitosol hati mutlak penting untuk menjaga homeostasis tubuh?',
      'Bagaimana kegagalan konversi amonia menjadi urea berdampak pada fungsi otak (ensefalopati hepatik/uremik)?'
    ],
    keyBiochemicalTakeaway: 'Deaminasi asam amino melepaskan ion amonium (NH₄⁺) yang bersifat sangat neurotoksik bagi sawar otak. Hati mengikat amonia beracun tersebut bersama CO₂ dalam Siklus Urea (melibatkan enzim karbamoil fosfat sintetase-1, ornitin, sitrulin, dan arginin) membentuk urea yang bersifat larut air dan tidak beracun untuk diekskresikan melalui ginjal.'
  }
];

