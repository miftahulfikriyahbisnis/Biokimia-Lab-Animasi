/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PostTestQuestion {
  id: string;
  question: string;
  options: { id: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: 'pemahaman' | 'aplikasi' | 'hots' | 'interpretasi' | 'analisis';
  topic: string;
}

export const POST_TEST_BANK: PostTestQuestion[] = [
  // 15 Soal Acuan dari Spesifikasi (SOAL 1 - 15)
  {
    id: 'Q1',
    question: 'Suatu hormon tidak dapat melewati lapisan lipid membran dan menimbulkan perubahan aktivitas protein dalam waktu relatif singkat. Kesimpulan yang paling tepat adalah …',
    options: [
      { id: 'A', text: 'Hormon selalu berikatan langsung dengan DNA' },
      { id: 'B', text: 'Hormon kemungkinan berikatan dengan reseptor membran' },
      { id: 'C', text: 'Hormon pasti merupakan hormon steroid' },
      { id: 'D', text: 'Hormon disimpan di dalam inti sel' }
    ],
    correctAnswer: 'B',
    explanation: 'Hormon hidrofilik tidak dapat menembus bilayer lipid membran, sehingga berikatan dengan reseptor permukaan membran dan memicu kaskade sinyal yang mengubah aktivitas protein secara cepat.',
    category: 'hots',
    topic: 'Mekanisme Kerja Hormon'
  },
  {
    id: 'Q2',
    question: 'Peneliti menemukan suatu hormon yang berasal dari kolesterol dan reseptornya berada di dalam sel. Hormon tersebut paling mungkin termasuk …',
    options: [
      { id: 'A', text: 'Hormon peptida' },
      { id: 'B', text: 'Katekolamin' },
      { id: 'C', text: 'Hormon steroid' },
      { id: 'D', text: 'Protein transporter' }
    ],
    correctAnswer: 'C',
    explanation: 'Hormon steroid disintesis dari kolesterol, bersifat lipofilik, mudah menembus membran sel, dan berikatan dengan reseptor intraseluler (sitoplasma atau inti sel).',
    category: 'aplikasi',
    topic: 'Klasifikasi Kimia Hormon'
  },
  {
    id: 'Q3',
    question: 'Sel X dan sel Y menerima aliran darah yang mengandung hormon sama. Hanya sel X memberikan respons. Penjelasan yang paling tepat adalah …',
    options: [
      { id: 'A', text: 'Sel Y tidak memiliki membran' },
      { id: 'B', text: 'Sel X mempunyai reseptor yang sesuai' },
      { id: 'C', text: 'Hormon berubah menjadi enzim di sel X' },
      { id: 'D', text: 'Sel Y tidak mengandung air' }
    ],
    correctAnswer: 'B',
    explanation: 'Hormon diedarkan ke seluruh tubuh melalui sirkulasi darah, namun hanya sel target yang mengekspresikan reseptor spesifik yang dapat mengenali dan merespons hormon tersebut.',
    category: 'pemahaman',
    topic: 'Pengertian dan Sel Target Hormon'
  },
  {
    id: 'Q4',
    question: 'Konsentrasi T3 dan T4 dalam darah meningkat. Pada sistem feedback negatif yang normal, perubahan yang paling mungkin terjadi adalah …',
    options: [
      { id: 'A', text: 'Sekresi TRH dan TSH meningkat' },
      { id: 'B', text: 'Sekresi TRH dan TSH menurun' },
      { id: 'C', text: 'Hipofisis menghasilkan lebih banyak insulin' },
      { id: 'D', text: 'Tiroid menghasilkan ACTH' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada mekanisme umpan balik negatif, peningkatan kadar hormon akhir (T3 dan T4) akan menghambat hipotalamus (mengurangi TRH) dan hipofisis anterior (mengurangi TSH) untuk menjaga homeostasis.',
    category: 'aplikasi',
    topic: 'Feedback Negatif'
  },
  {
    id: 'Q5',
    question: 'Suatu molekul hormon tersusun atas rantai asam amino, larut dalam air, dan tidak melewati membran secara bebas. Hormon tersebut paling mungkin bekerja melalui …',
    options: [
      { id: 'A', text: 'Reseptor pada membran sel' },
      { id: 'B', text: 'Reseptor yang hanya berada pada DNA' },
      { id: 'C', text: 'Pelarutan membran sel' },
      { id: 'D', text: 'Pengubahan hormon menjadi kolesterol' }
    ],
    correctAnswer: 'A',
    explanation: 'Hormon peptida/protein bersifat hidrofilik dan bermuatan sehingga tidak dapat menembus inti lipid membran sel, melainkan berikatan dengan domain ekstraseluler reseptor membran.',
    category: 'aplikasi',
    topic: 'Klasifikasi Kimia Hormon'
  },
  {
    id: 'Q6',
    question: 'Pada proses pembentukan insulin, signal peptide berhasil dipisahkan tetapi C-peptide belum dipotong. Molekul yang terbentuk adalah …',
    options: [
      { id: 'A', text: 'Insulin matang' },
      { id: 'B', text: 'Proinsulin' },
      { id: 'C', text: 'Glukagon' },
      { id: 'D', text: 'Reseptor insulin' }
    ],
    correctAnswer: 'B',
    explanation: 'Preproinsulin mengalami pemotongan peptida sinyal di retikulum endoplasma menghasilkan proinsulin. C-peptide baru akan dipotong kemudian oleh enzim pemroses di vesikel sekretori.',
    category: 'interpretasi',
    topic: 'Pembentukan Insulin'
  },
  {
    id: 'Q7',
    question: 'C-peptide dipisahkan dari proinsulin. Pernyataan yang paling tepat adalah …',
    options: [
      { id: 'A', text: 'C-peptide berubah menjadi rantai A' },
      { id: 'B', text: 'C-peptide berubah menjadi rantai B' },
      { id: 'C', text: 'Rantai A dan B sudah ada dan tetap dihubungkan oleh ikatan disulfida' },
      { id: 'D', text: 'Seluruh ikatan disulfida harus diputus' }
    ],
    correctAnswer: 'C',
    explanation: 'C-peptide merupakan sekuens penghubung sementara. Rantai A dan Rantai B sudah terbentuk di dalam molekul proinsulin dan tetap terikat kokoh melalui ikatan disulfida saat C-peptide dilepaskan.',
    category: 'pemahaman',
    topic: 'Pembentukan Insulin'
  },
  {
    id: 'Q8',
    question: 'Dua gugus tiol sistein mengalami oksidasi dalam pembentukan insulin. Produk yang terbentuk adalah …',
    options: [
      { id: 'A', text: 'Ikatan glikosidik' },
      { id: 'B', text: 'Ikatan disulfida' },
      { id: 'C', text: 'Ikatan fosfodiester' },
      { id: 'D', text: 'Ikatan hidrogen permanen' }
    ],
    correctAnswer: 'B',
    explanation: 'Oksidasi dua gugus tiol (-SH) dari residu sistein menghasilkan ikatan kovalen disulfida (-S-S-) yang menstabilkan konformasi tiga dimensi insulin matang.',
    category: 'interpretasi',
    topic: 'Struktur Insulin'
  },
  {
    id: 'Q9',
    question: 'Setelah insulin berikatan dengan reseptor, ATP berubah menjadi ADP. Penjelasan terbaik adalah …',
    options: [
      { id: 'A', text: 'Seluruh ATP menempel pada insulin' },
      { id: 'B', text: 'ATP memberikan gugus fosforil terminal kepada reseptor' },
      { id: 'C', text: 'ADP memberikan dua gugus fosfat kepada glukosa' },
      { id: 'D', text: 'Insulin mengubah ATP menjadi glukosa' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada autofosforilasi reseptor insulin, domain tirosin kinase menggunakan ATP sebagai donor fosfat, mentransfer gugus fosforil gamma terminal ke residu tirosin dan melepaskan ADP.',
    category: 'hots',
    topic: 'Fosforilasi Reseptor'
  },
  {
    id: 'Q10',
    question: 'Reseptor insulin telah terfosforilasi, tetapi perpindahan GLUT4 menuju membran dihambat. Akibat langsung yang paling mungkin terjadi adalah …',
    options: [
      { id: 'A', text: 'Pengambilan glukosa oleh sel otot tidak meningkat secara optimal' },
      { id: 'B', text: 'Insulin berubah menjadi hormon steroid' },
      { id: 'C', text: 'Glukosa dapat melewati membran tanpa transporter dalam jumlah besar' },
      { id: 'D', text: 'C-peptide kembali menyatu dengan insulin' }
    ],
    correctAnswer: 'A',
    explanation: 'Glukosa memerlukan transporter GLUT4 untuk masuk ke dalam sel otot dan adiposa. Jika translokasi GLUT4 terhambat, kapasitas pengambilan glukosa tidak dapat meningkat secara optimal.',
    category: 'hots',
    topic: 'Translokasi GLUT4'
  },
  {
    id: 'Q11',
    question: 'Jumlah GLUT4 pada membran sel otot meningkat. Peristiwa yang paling tepat adalah …',
    options: [
      { id: 'A', text: 'Glukosa diubah menjadi protein saat melewati GLUT4' },
      { id: 'B', text: 'Glukosa masuk melalui difusi terfasilitasi' },
      { id: 'C', text: 'GLUT4 memecah glukosa menjadi karbon dioksida' },
      { id: 'D', text: 'ATP mengikat glukosa secara permanen pada GLUT4' }
    ],
    correctAnswer: 'B',
    explanation: 'GLUT4 adalah protein transporter uniport pasif yang memfasilitasi difusi glukosa menuruni gradien konsentrasi tanpa mengubah struktur kimia molekul glukosa.',
    category: 'aplikasi',
    topic: 'Translokasi GLUT4'
  },
  {
    id: 'Q12',
    question: 'Enzim protein tirosin fosfatase bekerja pada reseptor insulin terfosforilasi. Produk langsung reaksinya adalah …',
    options: [
      { id: 'A', text: 'Reseptor–Tyr–OH dan fosfat anorganik' },
      { id: 'B', text: 'Insulin dan ATP' },
      { id: 'C', text: 'Glukosa dan ADP' },
      { id: 'D', text: 'Proinsulin dan C-peptide' }
    ],
    correctAnswer: 'A',
    explanation: 'Protein tirosin fosfatase mengkatalisis hidrolisis ikatan fosfoester pada residu tirosin dengan bantuan molekul air, menghasilkan reseptor bebas fosfat (IR-Tyr-OH) dan fosfat anorganik bebas (Pi).',
    category: 'pemahaman',
    topic: 'Defosforilasi dan Penghentian Sinyal'
  },
  {
    id: 'Q13',
    question: 'Bandingkan keadaan sebelum dan setelah defosforilasi reseptor insulin. Pernyataan yang tepat adalah …',
    options: [
      { id: 'A', text: 'Sebelum defosforilasi sinyal berlangsung; setelah defosforilasi sinyal melemah' },
      { id: 'B', text: 'Sebelum defosforilasi insulin tidak ada; setelahnya insulin terbentuk' },
      { id: 'C', text: 'Defosforilasi meningkatkan jumlah fosfat pada reseptor' },
      { id: 'D', text: 'Kedua keadaan menghasilkan respons yang sama' }
    ],
    correctAnswer: 'A',
    explanation: 'Keberadaan gugus fosforil pada tirosin mempertahankan konformasi aktif reseptor untuk meneruskan sinyal; setelah defosforilasi, sinyal terhenti dan respons sel berangsur kembali ke kondisi basal.',
    category: 'analisis',
    topic: 'Defosforilasi dan Penghentian Sinyal'
  },
  {
    id: 'Q14',
    question: 'Hormon A larut dalam air dan mempunyai reseptor membran. Hormon B larut dalam lipid dan mempunyai reseptor intraseluler. Perbedaan mekanismenya yang paling tepat adalah …',
    options: [
      { id: 'A', text: 'Hormon A menggunakan transduksi sinyal membran, sedangkan hormon B dapat memengaruhi ekspresi gen' },
      { id: 'B', text: 'Hormon A selalu masuk ke inti, sedangkan hormon B tidak dapat melewati membran' },
      { id: 'C', text: 'Kedua hormon harus menggunakan cAMP' },
      { id: 'D', text: 'Kedua hormon hanya bekerja melalui reseptor tirosin kinase' }
    ],
    correctAnswer: 'A',
    explanation: 'Hormon hidrofilik (A) berikatan pada membran dan memicu jalur transduksi sinyal intraseluler, sedangkan hormon lipofilik (B) menembus membran dan berikatan dengan reseptor inti/sitoplasma untuk mengatur transkripsi gen.',
    category: 'analisis',
    topic: 'Mekanisme Kerja Hormon'
  },
  {
    id: 'Q15',
    question: 'Suatu respons hormonal semakin kuat hingga proses persalinan selesai. Mekanisme pengendalian ini merupakan …',
    options: [
      { id: 'A', text: 'Feedback negatif' },
      { id: 'B', text: 'Feedback positif' },
      { id: 'C', text: 'Difusi sederhana' },
      { id: 'D', text: 'Hidrolisis protein' }
    ],
    correctAnswer: 'B',
    explanation: 'Feedback positif memperkuat rangsangan awal secara kumulatif (contoh: sekresi oksitosin saat kontraksi rahim pada persalinan) hingga titik akhir biologis tercapai.',
    category: 'aplikasi',
    topic: 'Feedback Positif'
  },

  // 17 Soal Tambahan Berkualitas Tinggi untuk Melengkapi Bank Soal (Total 32)
  {
    id: 'Q16',
    question: 'Organel sel beta pankreas tempat pemotongan peptida sinyal dari preproinsulin menjadi proinsulin adalah …',
    options: [
      { id: 'A', text: 'Retikulum endoplasma' },
      { id: 'B', text: 'Mitokondria' },
      { id: 'C', text: 'Lisosom' },
      { id: 'D', text: 'Nukleolus' }
    ],
    correctAnswer: 'A',
    explanation: 'Pemotongan peptida sinyal pada preproinsulin berlangsung di retikulum endoplasma sesaat setelah rantai polipeptida disintesis.',
    category: 'pemahaman',
    topic: 'Pembentukan Insulin'
  },
  {
    id: 'Q17',
    question: 'Berapa jumlah rantai peptida dan ikatan disulfida yang menyusun molekul insulin matang?',
    options: [
      { id: 'A', text: '1 rantai peptida dan 2 ikatan disulfida' },
      { id: 'B', text: '2 rantai peptida (A dan B) serta 3 ikatan disulfida' },
      { id: 'C', text: '3 rantai peptida (A, B, dan C) serta 1 ikatan disulfida' },
      { id: 'D', text: '4 rantai peptida serta 6 ikatan disulfida' }
    ],
    correctAnswer: 'B',
    explanation: 'Insulin matang terdiri dari 2 rantai: Rantai A (21 AA) dan Rantai B (30 AA), yang dihubungkan oleh 2 ikatan disulfida antarrantai dan 1 ikatan disulfida intrarantai A.',
    category: 'pemahaman',
    topic: 'Struktur Insulin'
  },
  {
    id: 'Q18',
    question: 'Pernyataan yang BENAR mengenai kelenjar endokrin dan hormon yang dihasilkannya adalah …',
    options: [
      { id: 'A', text: 'Kelenjar tiroid menghasilkan glukagon' },
      { id: 'B', text: 'Sel beta pankreas menghasilkan hormon insulin' },
      { id: 'C', text: 'Kelenjar adrenal hanya menghasilkan insulin' },
      { id: 'D', text: 'Hipofisis anterior memproduksi eritropoietin' }
    ],
    correctAnswer: 'B',
    explanation: 'Insulin disintesis dan disekresikan secara spesifik oleh sel beta pada pulau Langerhans di pankreas.',
    category: 'pemahaman',
    topic: 'Sumber Hormon'
  },
  {
    id: 'Q19',
    question: 'Manakah di bawah ini yang merupakan contoh hormon turunan asam amino tirosin yang bersifat hidrofilik?',
    options: [
      { id: 'A', text: 'Adrenalin (Epinefrin)' },
      { id: 'B', text: 'Kortisol' },
      { id: 'C', text: 'Tiroksin (T4)' },
      { id: 'D', text: 'Testosteron' }
    ],
    correctAnswer: 'A',
    explanation: 'Adrenalin adalah katekolamin turunan tirosin yang bersifat hidrofilik dan berikatan dengan reseptor membran. Sebaliknya, T3/T4 adalah turunan tirosin beriodium yang bersifat lipofilik.',
    category: 'aplikasi',
    topic: 'Klasifikasi Kimia Hormon'
  },
  {
    id: 'Q20',
    question: 'Pada sumbu Hipotalamus–Hipofisis–Tiroid, hormon apakah yang disekresikan oleh hipotalamus untuk merangsang hipofisis?',
    options: [
      { id: 'A', text: 'TRH (Thyrotropin-Releasing Hormone)' },
      { id: 'B', text: 'TSH (Thyroid-Stimulating Hormone)' },
      { id: 'C', text: 'ACTH (Adrenocorticotropic Hormone)' },
      { id: 'D', text: 'GnRH (Gonadotropin-Releasing Hormone)' }
    ],
    correctAnswer: 'A',
    explanation: 'Hipotalamus melepaskan TRH yang memicu hipofisis anterior mensekresikan TSH, yang kemudian merangsang tiroid menghasilkan T3 dan T4.',
    category: 'pemahaman',
    topic: 'Sumbu Hipotalamus–Hipofisis'
  },
  {
    id: 'Q21',
    question: 'Apakah produksi dan pelepasan hormon insulin dikendalikan secara langsung oleh sumbu Hipotalamus–Hipofisis?',
    options: [
      { id: 'A', text: 'Ya, melalui hormon TSH dari hipofisis' },
      { id: 'B', text: 'Ya, melalui pelepasan CRH dari hipotalamus' },
      { id: 'C', text: 'Tidak, insulin dilepaskan langsung oleh sel beta merespons kadar nutrien dan glukosa darah' },
      { id: 'D', text: 'Ya, melalui sekresi ACTH langsung ke pankreas' }
    ],
    correctAnswer: 'C',
    explanation: 'Sekresi insulin tidak melalui sumbu hipotalamus-hipofisis, melainkan diatur langsung oleh sel beta pulau Langerhans pankreas yang merespons perubahan konsentrasi glukosa darah.',
    category: 'analisis',
    topic: 'Sumbu Hipotalamus–Hipofisis'
  },
  {
    id: 'Q22',
    question: 'Jenis reseptor yang digunakan oleh hormon insulin pada membran sel target adalah …',
    options: [
      { id: 'A', text: 'Receptor Tyrosine Kinase (RTK)' },
      { id: 'B', text: 'G-Protein Coupled Receptor (GPCR)' },
      { id: 'C', text: 'Kanal ion berpintu ligan' },
      { id: 'D', text: 'Reseptor hormon steroid intraseluler' }
    ],
    correctAnswer: 'A',
    explanation: 'Reseptor insulin merupakan reseptor tirosin kinase tetramerik (2 subunit alfa di luar sel dan 2 subunit beta yang memiliki domain tirosin kinase di dalam sel).',
    category: 'pemahaman',
    topic: 'Reseptor Insulin'
  },
  {
    id: 'Q23',
    question: 'Manakah pernyataan yang BENAR mengenai letak ikatan insulin saat bekerja?',
    options: [
      { id: 'A', text: 'Insulin masuk ke dalam sitoplasma sel dan mengubah DNA' },
      { id: 'B', text: 'Insulin tetap berada di luar sel dan berikatan pada domain ekstraseluler reseptor' },
      { id: 'C', text: 'Insulin masuk ke inti sel sebagai faktor transkripsi' },
      { id: 'D', text: 'Insulin menembus bilayer lipid untuk mengikat GLUT4 secara langsung' }
    ],
    correctAnswer: 'B',
    explanation: 'Sebagai hormon peptida hidrofilik, insulin tidak perlu masuk ke dalam sel target; insulin berikatan pada bagian luar (subunit alfa ekstraseluler) dari reseptor membran.',
    category: 'pemahaman',
    topic: 'Reseptor Insulin'
  },
  {
    id: 'Q24',
    question: 'Berapakah jumlah asam amino total yang menyusun molekul insulin manusia matang?',
    options: [
      { id: 'A', text: '21 asam amino' },
      { id: 'B', text: '30 asam amino' },
      { id: 'C', text: '51 asam amino' },
      { id: 'D', text: '110 asam amino' }
    ],
    correctAnswer: 'C',
    explanation: 'Insulin matang tersusun atas 51 asam amino: Rantai A terdiri atas 21 residu dan Rantai B terdiri atas 30 residu.',
    category: 'pemahaman',
    topic: 'Struktur Insulin'
  },
  {
    id: 'Q25',
    question: 'Di dalam vesikel granula sekretori sel beta pankreas, molekul insulin sebagian besar disimpan dalam bentuk …',
    options: [
      { id: 'A', text: 'Heksamer stabil terkoordinasi ion Zn²⁺' },
      { id: 'B', text: 'Monomer terlarut bebas tanpa ion logam' },
      { id: 'C', text: 'Polimer rantai panjang tidak berujung' },
      { id: 'D', text: 'Gas terlarut di sitosol' }
    ],
    correctAnswer: 'A',
    explanation: 'Dalam konsentrasi tinggi di vesikel sekretori dengan keberadaan ion seng (Zn²⁺), insulin membentuk heksamer yang sangat stabil dan kompak untuk disimpan.',
    category: 'pemahaman',
    topic: 'Penyimpanan Insulin'
  },
  {
    id: 'Q26',
    question: 'Molekul apakah yang bertindak sebagai pereaksi pembantu pemutusan ikatan ester fosfat dalam reaksi defosforilasi reseptor?',
    options: [
      { id: 'A', text: 'ATP' },
      { id: 'B', text: 'Air (H₂O)' },
      { id: 'C', text: 'Glukosa' },
      { id: 'D', text: 'C-peptide' }
    ],
    correctAnswer: 'B',
    explanation: 'Reaksi defosforilasi oleh protein tirosin fosfatase merupakan reaksi hidrolisis yang mutlak memerlukan molekul air (H₂O) untuk memutus ikatan fosfoester.',
    category: 'interpretasi',
    topic: 'Defosforilasi dan Penghentian Sinyal'
  },
  {
    id: 'Q27',
    question: 'Peristiwa perpindahan transporter GLUT4 dari vesikel sitosol menuju membran sel merupakan contoh proses …',
    options: [
      { id: 'A', text: 'Translokasi vesikel (transportasi intraseluler)' },
      { id: 'B', text: 'Reaksi pembentukan senyawa baru secara sintetis' },
      { id: 'C', text: 'Degradasi polipeptida oleh lisosom' },
      { id: 'D', text: 'Oksidasi ikatan peptida' }
    ],
    correctAnswer: 'A',
    explanation: 'Perpindahan GLUT4 adalah proses translokasi/transportasi vesikuler intraseluler, bukan reaksi kimia pembentukan senyawa baru.',
    category: 'pemahaman',
    topic: 'Translokasi GLUT4'
  },
  {
    id: 'Q28',
    question: 'Ketika kadar glukosa darah telah kembali ke batas normal, apa yang terjadi pada GLUT4 di membran sel?',
    options: [
      { id: 'A', text: 'Seluruh GLUT4 langsung hancur seketika' },
      { id: 'B', text: 'GLUT4 secara bertahap ditarik kembali ke dalam sel melalui endositosis' },
      { id: 'C', text: 'GLUT4 berubah menjadi reseptor insulin' },
      { id: 'D', text: 'GLUT4 dilepaskan keluar sel ke aliran darah' }
    ],
    correctAnswer: 'B',
    explanation: 'Setelah defosforilasi dan penghentian sinyal, GLUT4 tidak dihancurkan melainkan ditarik kembali secara bertahap ke dalam vesikel intraseluler untuk digunakan kembali saat sinyal berikutnya tiba.',
    category: 'aplikasi',
    topic: 'Defosforilasi dan Penghentian Sinyal'
  },
  {
    id: 'Q29',
    question: 'Manakah dari organ berikut yang menghasilkan hormon Eritropoietin (EPO) untuk merangsang pembentukan sel darah merah?',
    options: [
      { id: 'A', text: 'Pankreas' },
      { id: 'B', text: 'Ginjal' },
      { id: 'C', text: 'Kelenjar Paratiroid' },
      { id: 'D', text: 'Ovarium' }
    ],
    correctAnswer: 'B',
    explanation: 'Ginjal menghasilkan hormon eritropoietin (EPO) yang merangsang sumsum tulang memproduksi eritrosit ketika kadar oksigen jaringan menurun.',
    category: 'pemahaman',
    topic: 'Sumber Hormon'
  },
  {
    id: 'Q30',
    question: 'Salah satu contoh regulasi hormon melalui mekanisme feedback positif yang berlangsung saat masa reproduksi wanita adalah …',
    options: [
      { id: 'A', text: 'Lonjakan LH (Luteinizing Hormone) menjelang ovulasi' },
      { id: 'B', text: 'Penurunan sekresi insulin saat puasa' },
      { id: 'C', text: 'Penurunan sekresi TSH saat T3/T4 tinggi' },
      { id: 'D', text: 'Pelepasan glukagon saat hipoglikemia' }
    ],
    correctAnswer: 'A',
    explanation: 'Kadar estrogen yang tinggi sebelum ovulasi memicu feedback positif sementara yang menyebabkan lonjakan sekresi LH dari hipofisis anterior untuk memicu ovulasi.',
    category: 'aplikasi',
    topic: 'Feedback Positif'
  },
  {
    id: 'Q31',
    question: 'Kelenjar paratiroid menghasilkan hormon PTH (Parathyroid Hormone). Fungsi utama hormon ini berkaitan dengan regulasi …',
    options: [
      { id: 'A', text: 'Keseimbangan kalsium dan fosfat dalam darah' },
      { id: 'B', text: 'Penurunan glukosa darah' },
      { id: 'C', text: 'Laju filtrasi glomerulus ginjal' },
      { id: 'D', text: 'Pigmentasi melanin pada kulit' }
    ],
    correctAnswer: 'A',
    explanation: 'PTH disekresikan oleh kelenjar paratiroid untuk meningkatkan kadar kalsium darah saat konsentrasi ion kalsium ekstraseluler menurun.',
    category: 'pemahaman',
    topic: 'Sumber Hormon'
  },
  {
    id: 'Q32',
    question: 'Pada pembentukan glikogen dari monomer glukosa di dalam sel hati dan otot yang dirangsang insulin, persamaan representasi sederhananya adalah …',
    options: [
      { id: 'A', text: 'n Glukosa → Glikogen' },
      { id: 'B', text: 'Glikogen → n Glukosa' },
      { id: 'C', text: 'Glukosa + O₂ → CO₂ + H₂O' },
      { id: 'D', text: 'Glukosa → Asam Laktat' }
    ],
    correctAnswer: 'A',
    explanation: 'Insulin merangsang penyimpanan glukosa berlebih menjadi polimer cadangan glikogen (glikogenesis), yang disederhanakan sebagai n Glukosa → Glikogen.',
    category: 'interpretasi',
    topic: 'Efek Fisiologis Insulin'
  }
];

/**
 * Mengambil 15 soal acak dari bank soal 32 soal, sekaligus mengacak pilihan jawabannya
 */
export function generateRandomTestSet(count: number = 15): PostTestQuestion[] {
  // Shuffle bank soal
  const shuffledBank = [...POST_TEST_BANK].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffledBank.slice(0, count);

  // Acak pilihan jawaban untuk setiap soal yang terpilih
  return selectedQuestions.map(q => {
    // Acak urutan teks pilihan
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    // Cari teks jawaban benar yang lama
    const correctOptionText = q.options.find(opt => opt.id === q.correctAnswer)?.text;
    
    // Berikan id baru A, B, C, D sesuai urutan acak
    const newOptions: { id: 'A' | 'B' | 'C' | 'D'; text: string }[] = shuffledOptions.map((opt, idx) => ({
      id: (['A', 'B', 'C', 'D'][idx]) as 'A' | 'B' | 'C' | 'D',
      text: opt.text
    }));

    // Tentukan kunci baru
    const newCorrectAnswer = newOptions.find(opt => opt.text === correctOptionText)?.id || 'A';

    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer
    };
  });
}
