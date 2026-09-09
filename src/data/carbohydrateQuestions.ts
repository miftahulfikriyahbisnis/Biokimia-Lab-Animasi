/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CarbPostTestQuestion {
  id: string;
  topic: 
    | 'Pencernaan & Absorpsi'
    | 'Glikolisis'
    | 'Piruvat, DO & Siklus Krebs'
    | 'Rantai Transpor Elektron & ATP'
    | 'Glikogenesis & Glukoneogenesis'
    | 'Lipogenesis & Integrasi Metabolisme'
    | 'Perhitungan Total ATP';
  cognitiveLevel: 'Pemahaman' | 'Aplikasi' | 'Analisis/HOTS';
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const CARB_POST_TEST_QUESTIONS: CarbPostTestQuestion[] = [
  // 1. Pencernaan & Absorpsi (4 Soal)
  {
    id: 'carb-q1',
    topic: 'Pencernaan & Absorpsi',
    cognitiveLevel: 'Pemahaman',
    question: 'Seorang mahasiswa sarapan sepiring nasi putih. Di dalam rongga mulut, enzim amilase saliva mulai bekerja menghidrolisis pati nasi. Produk utama dari pencernaan enzimatik di mulut tersebut adalah...',
    options: [
      { key: 'A', text: 'Semua pati langsung diubah menjadi D-glukosa bebas' },
      { key: 'B', text: 'Campuran maltosa, maltotriosa, dan α-dekstrin batas' },
      { key: 'C', text: 'Molekul fruktosa dan galaktosa berenergi tinggi' },
      { key: 'D', text: 'Glukosa-6-fosfat dan piruvat' }
    ],
    correctAnswer: 'B',
    explanation: 'Amilase saliva adalah endoglukosidase yang menghidrolisis ikatan glikosidik α-1,4 internal secara acak, menghasilkan disakarida maltosa, trisakarida maltotriosa, dan oligosakarida bercabang (α-dekstrin). Amilase saliva tidak memecah ikatan cabang α-1,6 dan tidak langsung mengubah seluruh pati menjadi glukosa bebas di mulut.'
  },
  {
    id: 'carb-q2',
    topic: 'Pencernaan & Absorpsi',
    cognitiveLevel: 'Aplikasi',
    question: 'Mengapa aktivitas pencernaan pati oleh amilase saliva terhenti sesaat setelah bolus makanan memasuki lambung?',
    options: [
      { key: 'A', text: 'Semua substrat pati telah habis terhidrolisis di kerongkongan' },
      { key: 'B', text: 'Pepsinogen secara spesifik mendegradasi molekul maltosa' },
      { key: 'C', text: 'pH asam lambung yang sangat rendah (HCl) mendenaturasi dan menginaktivasi protein amilase saliva' },
      { key: 'D', text: 'Asam lambung mengubah pati menjadi selulosa yang tidak dapat dihidrolisis' }
    ],
    correctAnswer: 'C',
    explanation: 'Amilase saliva memiliki rentang pH optimum mendekati netral (6.8–7.0). Saat makanan bercampur dengan asam klorida (HCl) pekat lambung yang memiliki pH 1.5–2.0, struktur konformasi tiga dimensi enzim amilase terdenaturasi dan aktivitas katalitiknya berhenti total.'
  },
  {
    id: 'carb-q3',
    topic: 'Pencernaan & Absorpsi',
    cognitiveLevel: 'Analisis/HOTS',
    question: 'Seorang pasien mengalami mutasi genetik non-fungsional pada transporter SGLT1 di membran apikal enterosit usus halusnya. Gejala dan mekanisme fisiologis yang paling tepat terjadi pada pasien tersebut adalah...',
    options: [
      { key: 'A', text: 'Penyerapan fruktosa terganggu, sedangkan glukosa dan galaktosa diserap normal' },
      { key: 'B', text: 'Glukosa dan galaktosa menumpuk di lumen usus, menarik air secara osmotik dan difermentasi bakteri menyebabkan diare berat' },
      { key: 'C', text: 'Glukosa langsung masuk ke kapiler darah tanpa melalui sel enterosit' },
      { key: 'D', text: 'Transporter GLUT2 di sisi basolateral menggantikan fungsi SGLT1 dengan mengangkut Na⁺' }
    ],
    correctAnswer: 'B',
    explanation: 'SGLT1 (Sodium-Glucose Cotransporter 1) secara spesifik bertanggung jawab atas penyerapan aktif glukosa dan galaktosa melintasi membran apikal enterosit. Jika SGLT1 tidak berfungsi (Glucose-Galactose Malabsorption), glukosa dan galaktosa tetap tertahan di lumen usus, menciptakan beban osmotik tinggi yang menarik air (diare osmotik) serta menjadi substrat fermentasi bakteri usus yang menghasilkan gas dan kram.'
  },
  {
    id: 'carb-q4',
    topic: 'Pencernaan & Absorpsi',
    cognitiveLevel: 'Aplikasi',
    question: 'Setelah minum segelas susu sapi, seseorang dengan defisiensi enzim laktase di brush border usus mengalami kembung dan kram perut. Secara biokimiawi, reaksi hidrolisis yang gagal terjadi adalah pemecahan laktosa menjadi...',
    options: [
      { key: 'A', text: 'Dua molekul D-glukosa' },
      { key: 'B', text: 'D-glukosa dan D-fruktosa' },
      { key: 'C', text: 'D-galaktosa dan D-glukosa' },
      { key: 'D', text: 'D-galaktosa dan D-fruktosa' }
    ],
    correctAnswer: 'C',
    explanation: 'Laktosa adalah disakarida yang terdiri dari unit D-galaktosa dan D-glukosa yang dihubungkan oleh ikatan β-1,4 glikosidik. Enzim laktase (β-galaktosidase) pada mikrovili usus berfungsi menghidrolisis ikatan ini menjadi galaktosa dan glukosa. Defisiensi enzim ini menyebabkan intoleransi laktosa.'
  },

  // 2. Glikolisis (4 Soal)
  {
    id: 'carb-q5',
    topic: 'Glikolisis',
    cognitiveLevel: 'Pemahaman',
    question: 'Pada fase investasi energi glikolisis (tahap 1 hingga 5), berapa molekul ATP yang dikonsumsi untuk setiap molekul glukosa yang masuk?',
    options: [
      { key: 'A', text: '1 molekul ATP' },
      { key: 'B', text: '2 molekul ATP' },
      { key: 'C', text: '4 molekul ATP' },
      { key: 'D', text: '0 molekul ATP (glikolisis tidak memerlukan ATP)' }
    ],
    correctAnswer: 'B',
    explanation: 'Fase investasi glikolisis mengonsumsi 2 molekul ATP: (1) pada tahap 1 dikatalisis heksokinase/glukokinase (glukosa → G6P), dan (2) pada tahap 3 dikatalisis fosfofruktokinase-1 / PFK-1 (F6P → F1,6BP).'
  },
  {
    id: 'carb-q6',
    topic: 'Glikolisis',
    cognitiveLevel: 'Aplikasi',
    question: 'Enzim Phosphofructokinase-1 (PFK-1) dikenal sebagai enzim pengatur utama (committed step) pada glikolisis. Manakah kombinasi efektor alosterik berikut yang paling tepat dalam mengatur laju PFK-1?',
    options: [
      { key: 'A', text: 'Dihambat oleh kadar ATP dan sitrat yang tinggi; diaktifkan oleh AMP dan fruktosa-2,6-bisfosfat' },
      { key: 'B', text: 'Diaktifkan oleh ATP tinggi; dihambat oleh kadar glukosa darah rendah' },
      { key: 'C', text: 'Dihambat oleh AMP; diaktifkan oleh sitrat matriks' },
      { key: 'D', text: 'Tidak dipengaruhi oleh muatan energi seluler (energy charge)' }
    ],
    correctAnswer: 'A',
    explanation: 'PFK-1 dihambat secara alosterik oleh indikator kelimpahan energi tinggi seluler seperti ATP konsentrasi tinggi dan sitrat (produk Siklus Krebs). Sebaliknya, PFK-1 distimulasi kuat oleh sinyal kekurangan energi (AMP) dan aktivator alosterik paling poten dalam sel hati yaitu fruktosa-2,6-bisfosfat (F2,6BP).'
  },
  {
    id: 'carb-q7',
    topic: 'Glikolisis',
    cognitiveLevel: 'Analisis/HOTS',
    question: 'Pada tahap ke-6 glikolisis, gliseraldehida-3-fosfat (G3P) dioksidasi oleh enzim GAPDH menjadi 1,3-bisfosfogliserat (1,3-BPG). Racun arsenat (AsO₄³⁻) dapat bersaing dengan fosfat anorganik (Pi) pada enzim ini membentuk 1-arseno-3-fosfogliserat yang spontan terhidrolisis menjadi 3-fosfogliserat tanpa melalui enzim PGK. Dampak biokimiawi dari keracunan arsenat pada glikolisis adalah...',
    options: [
      { key: 'A', text: 'Glikolisis berhenti total dan tidak ada piruvat yang terbentuk' },
      { key: 'B', text: 'Glikolisis tetap menghasilkan piruvat, tetapi hasil bersih ATP glikolisis menjadi 0' },
      { key: 'C', text: 'Hasil bersih ATP glikolisis meningkat menjadi 4 ATP' },
      { key: 'D', text: 'NADH tidak dapat terbentuk pada tahap GAPDH' }
    ],
    correctAnswer: 'B',
    explanation: 'Arsenat mem-bypass reaksi pembentukan ATP pada tahap 7 (fosfogliserat kinase). Akibatnya, 2 ATP yang biasanya dihasilkan pada tahap 7 tidak terbentuk. Dua ATP yang dihasilkan pada tahap 10 (piruvat kinase) hanya impas dengan 2 ATP yang diinvestasikan pada fase awal, sehingga rendemen bersih ATP glikolisis menjadi 0 ATP per glukosa.'
  },
  {
    id: 'carb-q8',
    topic: 'Glikolisis',
    cognitiveLevel: 'Pemahaman',
    question: 'Hasil bersih (net yield) yang diperoleh dari pemecahan satu molekul D-glukosa melalui jalur glikolisis lengkap di sitoplasma sel adalah...',
    options: [
      { key: 'A', text: '2 Piruvat, 4 ATP bersih, 2 FADH₂, dan 2 CO₂' },
      { key: 'B', text: '2 Piruvat, 2 ATP bersih, 2 NADH, dan 2 H₂O' },
      { key: 'C', text: '1 Piruvat, 2 ATP bersih, 1 NADH, dan 1 H₂O' },
      { key: 'D', text: '2 Asetil-KoA, 2 ATP bersih, dan 2 NADH' }
    ],
    correctAnswer: 'B',
    explanation: 'Glikolisis memecah 1 molekul glukosa (6C) menghasilkan 2 molekul piruvat (3C), 2 molekul NADH tereduksi, 2 molekul H₂O, serta 2 ATP bersih (4 ATP diproduksi bruto dikurangi 2 ATP yang diinvestasikan di awal).'
  },

  // 3. Nasib Piruvat, DO, & Siklus Krebs (3 Soal)
  {
    id: 'carb-q9',
    topic: 'Piruvat, DO & Siklus Krebs',
    cognitiveLevel: 'Aplikasi',
    question: 'Seorang atlet melakukan lari cepat (sprint 100 meter) di mana kebutuhan ATP otot melebihi kecepatan suplai oksigen kapiler. Dalam kondisi anaerobik ini, piruvat diubah menjadi laktat oleh enzim laktat dehidrogenase. Tujuan utama dari reaksi ini adalah...',
    options: [
      { key: 'A', text: 'Menghasilkan 30 molekul ATP secara langsung di sitoplasma' },
      { key: 'B', text: 'Meregenerasi molekul NAD⁺ dari NADH agar glikolisis dapat terus berjalan menghasilkan ATP' },
      { key: 'C', text: 'Menghilangkan keasaman sitosol dengan menyerap ion H⁺' },
      { key: 'D', text: 'Memicu pelepasan oksigen dari mioglobin' }
    ],
    correctAnswer: 'B',
    explanation: 'Reaksi reduksi piruvat menjadi laktat menggunakan NADH dan mengoksidasinya kembali menjadi NAD⁺. Ketersediaan NAD⁺ mutlak diperlukan oleh enzim GAPDH (tahap 6 glikolisis). Tanpa regenerasi NAD⁺ dalam kondisi anaerobik, glikolisis akan berhenti dan produksi ATP seluler terhenti.'
  },
  {
    id: 'carb-q10',
    topic: 'Piruvat, DO & Siklus Krebs',
    cognitiveLevel: 'Pemahaman',
    question: 'Sebelum memasuki Siklus Krebs, piruvat mengalami dekarboksilasi oksidatif di dalam matriks mitokondria. Untuk SETIAP SATU molekul glukosa awal, produk yang dihasilkan dari tahap ini adalah...',
    options: [
      { key: 'A', text: '1 Asetil-KoA, 1 CO₂, dan 1 NADH' },
      { key: 'B', text: '2 Asetil-KoA, 2 CO₂, dan 2 NADH' },
      { key: 'C', text: '2 Asetil-KoA, 4 CO₂, dan 2 FADH₂' },
      { key: 'D', text: '2 Sitrat, 2 ATP, dan 2 NADH' }
    ],
    correctAnswer: 'B',
    explanation: 'Satu glukosa menghasilkan 2 molekul piruvat. Setiap piruvat (3C) melepaskan 1 CO₂ (1C) dan menghasilkan 1 NADH serta 1 Asetil-KoA (2C). Jadi per 1 molekul glukosa awal, reaksi dekarboksilasi oksidatif menghasilkan 2 Asetil-KoA, 2 CO₂, dan 2 NADH.'
  },
  {
    id: 'carb-q11',
    topic: 'Piruvat, DO & Siklus Krebs',
    cognitiveLevel: 'Analisis/HOTS',
    question: 'Dalam pelacakan atom karbon radioaktif pada Siklus Krebs, 2 atom karbon dari Asetil-KoA berkondensasi dengan 4 atom karbon dari Oksaloasetat membentuk Sitrat (6C). Fakta biokimiawi yang benar mengenai pelepasan 2 molekul CO₂ pada putaran pertama siklus tersebut adalah...',
    options: [
      { key: 'A', text: 'Kedua molekul CO₂ yang lepas langsung berasal dari 2 karbon Asetil-KoA yang baru masuk' },
      { key: 'B', text: 'Kedua molekul CO₂ yang lepas pada putaran pertama berasal dari kerangka karbon Oksaloasetat, bukan dari Asetil-KoA yang baru masuk' },
      { key: 'C', text: 'Siklus Krebs tidak pernah melepaskan gas CO₂' },
      { key: 'D', text: 'Semua karbon diubah menjadi glukosa baru di dalam matriks' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan stereokimia aconitase dan isocitrate dehydrogenase, pada putaran pertama Siklus Krebs, dua atom karbon yang didekarboksilasi dan lepas sebagai gas CO₂ berasal dari kerangka karbon oksaloasetat yang sudah ada sebelumnya, bukan langsung dari 2 karbon gugus asetil yang baru saja bergabung.'
  },

  // 4. Rantai Transpor Elektron & ATP (3 Soal)
  {
    id: 'carb-q12',
    topic: 'Rantai Transpor Elektron & ATP',
    cognitiveLevel: 'Pemahaman',
    question: 'Pada rantai transpor elektron di membran dalam mitokondria, manakah kompleks protein membran berikut yang TIDAK MEMOMPA PROTON (H⁺) ke ruang antarmembran?',
    options: [
      { key: 'A', text: 'Kompleks I (NADH:Ubiquinone Oxidoreductase)' },
      { key: 'B', text: 'Kompleks II (Suksinat Dehidrogenase)' },
      { key: 'C', text: 'Kompleks III (Sitokrom bc₁ Complex)' },
      { key: 'D', text: 'Kompleks IV (Sitokrom c Oksidase)' }
    ],
    correctAnswer: 'B',
    explanation: 'Kompleks II (Suksinat Dehidrogenase) hanya mentransfer elektron dari FADH₂ ke Koenzim Q. Perubahan energi bebas standar reaksi ini terlalu kecil untuk menggerakkan translokasi proton melintasi membran. Kompleks yang memompa proton adalah Kompleks I (4H⁺), Kompleks III (4H⁺), dan Kompleks IV (2H⁺).'
  },
  {
    id: 'carb-q13',
    topic: 'Rantai Transpor Elektron & ATP',
    cognitiveLevel: 'Aplikasi',
    question: 'Gas sianida (CN⁻) merupakan racun pernapasan seluler yang sangat mematikan karena berikatan kuat dengan atom besi heme pada Kompleks IV (Sitokrom c Oksidase). Dampak molekuler langsung dari inhibisi ini adalah...',
    options: [
      { key: 'A', text: 'Elektron tidak dapat ditransfer ke molekul oksigen (O₂), gradien proton runtuh, dan sintesis ATP berhenti total' },
      { key: 'B', text: 'Kompleks I bekerja lebih cepat memproduksi ATP tanpa oksigen' },
      { key: 'C', text: 'Oksigen tereduksi menjadi gas hidrogen beracun di sitoplasma' },
      { key: 'D', text: 'ATP synthase berputar ke arah sebaliknya memproduksi glukosa' }
    ],
    correctAnswer: 'A',
    explanation: 'Kompleks IV mengatalisis transfer elektron terakhir ke molekul O₂ (akseptor elektron terminal) membentuk H₂O. Jika dihambat oleh sianida, seluruh rantai transpor elektron terhambat mundur, pemompaan proton terhenti, gradien elektrokimiawi proton hilang, dan ATP synthase tidak dapat memproduksi ATP.'
  },
  {
    id: 'carb-q14',
    topic: 'Rantai Transpor Elektron & ATP',
    cognitiveLevel: 'Analisis/HOTS',
    question: 'Berdasarkan teori kemiosmotik Mitchell dan rasio P/O modern yang diterima secara luas saat ini, oksidasi 1 molekul NADH matriks menghasilkan ~2.5 ATP, sedangkan 1 molekul FADH₂ menghasilkan ~1.5 ATP. Perbedaan rendemen ATP ini disebabkan oleh...',
    options: [
      { key: 'A', text: 'FADH₂ memiliki massa molekul yang lebih kecil daripada NADH' },
      { key: 'B', text: 'Elektron dari NADH masuk di Kompleks I sehingga memompa 10 H⁺, sedangkan elektron dari FADH₂ masuk di Kompleks II sehingga hanya memompa 6 H⁺' },
      { key: 'C', text: 'FADH₂ langsung mendegradasi molekul ATP synthase di membran' },
      { key: 'D', text: 'NADH disintesis di sitoplasma sedangkan FADH₂ disintesis di luar sel' }
    ],
    correctAnswer: 'B',
    explanation: 'Elektron dari NADH memasuki rantai melalui Kompleks I, mengalir melalui Kompleks III dan IV sehingga total memompa 10 proton (4 + 4 + 2) ke ruang antarmembran. Elektron dari FADH₂ masuk di Kompleks II (yang tidak memompa proton), sehingga hanya mengalir melalui Kompleks III dan IV (total 6 proton dipompa: 4 + 2). Dengan kebutuhan ~4 H⁺ per 1 ATP yang disintesis dan ditranspor, 10/4 = 2.5 ATP dan 6/4 = 1.5 ATP.'
  },

  // 5. Glikogenesis & Glukoneogenesis (3 Soal)
  {
    id: 'carb-q15',
    topic: 'Glikogenesis & Glukoneogenesis',
    cognitiveLevel: 'Pemahaman',
    question: 'Pada proses glikogenesis (sintesis glikogen), enzim apakah yang bertanggung jawab membentuk ikatan percabangan α-1,6 glikosidik?',
    options: [
      { key: 'A', text: 'Glycogen Synthase' },
      { key: 'B', text: 'Glukokinase' },
      { key: 'C', text: 'Branching Enzyme (Amylo-(1,4→1,6)-transglycosylase)' },
      { key: 'D', text: 'Glycogenin' }
    ],
    correctAnswer: 'C',
    explanation: 'Glycogen synthase hanya dapat memperpanjang rantai linear dengan ikatan α-1,4 glikosidik. Untuk membentuk struktur percabangan padat setiap 8–12 residu, Branching enzyme memotong oligomer ~7 residu dari rantai linear dan memindahkannya ke rantai lain dengan ikatan α-1,6.'
  },
  {
    id: 'carb-q16',
    topic: 'Glikogenesis & Glukoneogenesis',
    cognitiveLevel: 'Aplikasi',
    question: 'Mengapa glikogen otot rangka TIDAK DAPAT digunakan secara langsung untuk meningkatkan kadar glukosa darah saat kondisi hipoglikemia?',
    options: [
      { key: 'A', text: 'Otot rangka tidak memiliki enzim fosfofruktokinase' },
      { key: 'B', text: 'Otot rangka tidak memiliki enzim Glucose-6-Phosphatase, sehingga glukosa-6-fosfat tidak dapat diubah menjadi glukosa bebas yang bisa keluar melintasi membran sel' },
      { key: 'C', text: 'Otot rangka tidak memiliki cadangan glikogen sama sekali' },
      { key: 'D', text: 'Glikogen otot hanya tersusun dari molekul galaktosa' }
    ],
    correctAnswer: 'B',
    explanation: 'Hati memiliki enzim glukosa-6-fosfatase di retikulum endoplasmanya, sehingga dapat mendefosforilasi G6P menjadi glukosa bebas untuk dilepas ke darah. Sebaliknya, sel otot rangka tidak mengekspresikan enzim ini, sehingga glikogen otot sepenuhnya diperuntukkan bagi penyediaan energi glikolisis internal otot itu sendiri.'
  },
  {
    id: 'carb-q17',
    topic: 'Glikogenesis & Glukoneogenesis',
    cognitiveLevel: 'Analisis/HOTS',
    question: 'Glukoneogenesis bukan sekadar pembalikan sederhana dari 10 reaksi glikolisis. Tiga reaksi glikolisis yang bersifat sangat eksergonik (irreversible) harus dilewati (bypass) oleh enzim glukoneogenesis spesifik. Manakah pasangan enzim bypass glukoneogenesis berikut yang benar?',
    options: [
      { key: 'A', text: 'Bypass Piruvat Kinase menggunakan Pyruvate Carboxylase dan Phosphoenolpyruvate Carboxykinase (PEPCK)' },
      { key: 'B', text: 'Bypass Heksokinase menggunakan enzim Glikogen Fosforilase' },
      { key: 'C', text: 'Bypass PFK-1 menggunakan enzim Fosfoglukoisomerase' },
      { key: 'D', text: 'Bypass Enolase menggunakan enzim Piruvat Dehidrogenase' }
    ],
    correctAnswer: 'A',
    explanation: 'Tiga bypass glukoneogenesis adalah: (1) Reaksi piruvat kinase dilewati oleh kombinasi Pyruvate Carboxylase (piruvat → OAA) dan PEPCK (OAA → PEP); (2) Reaksi PFK-1 dilewati oleh Fructose-1,6-bisphosphatase; (3) Reaksi heksokinase dilewati oleh Glucose-6-phosphatase.'
  },

  // 6. Lipogenesis & Integrasi Metabolisme (2 Soal)
  {
    id: 'carb-q18',
    topic: 'Lipogenesis & Integrasi Metabolisme',
    cognitiveLevel: 'Aplikasi',
    question: 'Seseorang yang mengonsumsi makanan tinggi karbohidrat secara berlebihan akan mengalami konversi kelebihan glukosa menjadi cadangan lemak (trigliserida). Jalur awal pemindahan gugus asetil dari mitokondria ke sitoplasma untuk sintesis asam lemak melibatkan...',
    options: [
      { key: 'A', text: 'Asetil-KoA langsung berdifusi bebas melintasi membran mitokondria' },
      { key: 'B', text: 'Kondensasi Asetil-KoA dengan OAA menjadi sitrat, sitrat keluar via tricarboxylate carrier, lalu dipecah kembali di sitosol oleh ATP-Citrate Lyase' },
      { key: 'C', text: 'Glukosa langsung diubah menjadi asam palmitat di lumen usus' },
      { key: 'D', text: 'Asetil-KoA diubah menjadi laktat terlebih dahulu di ruang antarmembran' }
    ],
    correctAnswer: 'B',
    explanation: 'Membran dalam mitokondria impermeabel terhadap Asetil-KoA. Oleh karena itu, Asetil-KoA berkondensasi dengan oksaloasetat membentuk sitrat di dalam matriks. Sitrat keluar ke sitoplasma melalui transporter sitrat (sitrat shuttle), kemudian enzim sitosolik ATP-citrate lyase memecah sitrat kembali menjadi Asetil-KoA dan OAA dengan biaya 1 ATP.'
  },
  {
    id: 'carb-q19',
    topic: 'Lipogenesis & Integrasi Metabolisme',
    cognitiveLevel: 'Analisis/HOTS',
    question: 'Pada manusia, mengapa molekul Asetil-KoA (misalnya dari pemecahan asam lemak atau oksidasi piruvat) TIDAK DAPAT digunakan untuk sintesis glukosa bersih (glukoneogenesis neto)?',
    options: [
      { key: 'A', text: 'Asetil-KoA tidak memiliki atom karbon' },
      { key: 'B', text: 'Reaksi Piruvat Dehidrogenase bersifat irreversible secara fisiologis, dan dalam Siklus Krebs 2 atom karbon dilepaskan sebagai CO₂ sebelum Oksaloasetat terbentuk kembali' },
      { key: 'C', text: 'Asetil-KoA secara langsung merusak enzim piruvat karboksilase di hati' },
      { key: 'D', text: 'Manusia tidak memiliki mitokondria di sel hati' }
    ],
    correctAnswer: 'B',
    explanation: 'Reaksi piruvat → asetil-KoA oleh PDC bersifat irreversible sehingga asetil-KoA tidak dapat diubah kembali menjadi piruvat. Ketika asetil-KoA (2C) masuk Siklus Krebs, 2 atom karbon dilepaskan sebagai 2 CO₂ sebelum mencapai oksaloasetat. Karena manusia tidak memiliki enzim siklus glioksilat (isocitrate lyase dan malate synthase), tidak ada rendemen karbon bersih untuk glukoneogenesis.'
  },

  // 7. Perhitungan Total ATP (1 Soal)
  {
    id: 'carb-q20',
    topic: 'Perhitungan Total ATP',
    cognitiveLevel: 'Aplikasi',
    question: 'Berdasarkan jalur oksidasi sempurna 1 molekul glukosa (Glikolisis, Dekarboksilasi Oksidatif, Siklus Krebs, dan Fosforilasi Oksidatif) dengan menggunakan Malate-Aspartate Shuttle di sel hepatosit hati, perkiraan rendemen ATP bersih yang dihasilkan adalah...',
    options: [
      { key: 'A', text: '2 ATP' },
      { key: 'B', text: '12 ATP' },
      { key: 'C', text: 'Sekitar 32 ATP' },
      { key: 'D', text: '100 ATP' }
    ],
    correctAnswer: 'C',
    explanation: 'Perhitungannya: (1) Glikolisis: 2 ATP bersih + 2 NADH sitosol (2 × 2.5 = 5 ATP via malate-aspartate shuttle) = 7 ATP; (2) Dekarboksilasi Oksidatif: 2 NADH matriks (2 × 2.5) = 5 ATP; (3) Siklus Krebs: 2 GTP/ATP + 6 NADH (6 × 2.5 = 15 ATP) + 2 FADH₂ (2 × 1.5 = 3 ATP) = 20 ATP. Total keseluruhan = 7 + 5 + 20 = 32 ATP per molekul glukosa.'
  }
];

export interface LegacyCarbQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const CARBOHYDRATE_POST_TEST_QUESTIONS: LegacyCarbQuestion[] = CARB_POST_TEST_QUESTIONS.map((q) => ({
  id: q.id,
  category: q.topic,
  question: q.question,
  options: q.options.map(o => o.text),
  correctAnswer: ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer),
  explanation: q.explanation
}));

