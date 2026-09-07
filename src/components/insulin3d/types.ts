/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Insulin3DStage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type InspectableObject =
  | 'GLUT4'
  | 'RECEPTOR'
  | 'INSULIN'
  | 'GLUCOSE'
  | 'MEMBRANE'
  | 'VESICLE'
  | 'SIGNAL'
  | null;

export interface StageInfo {
  stage: Insulin3DStage;
  title: string;
  subtitle: string;
  narrativeText: string;
  activeObjects: string[];
  bloodGlucoseEffect: string;
  scientificDetail: string;
  analogyDetail: string;
}

export const STAGE_INFOS: Record<Insulin3DStage, StageInfo> = {
  1: {
    stage: 1,
    title: 'Kadar Glukosa Darah Meningkat',
    subtitle: 'Kondisi pasca makan (Postprandial) di ruang ekstraseluler',
    narrativeText: 'Kadar glukosa dalam darah meningkat.',
    activeObjects: ['Glukosa (Banyak di darah)', 'Membran Sel', 'Vesikel GLUT4 (Di sitosol)'],
    bloodGlucoseEffect: 'Tinggi (~140-180 mg/dL pascamakan). Glukosa menumpuk di luar sel karena membran lipid tidak dapat ditembus secara bebas.',
    scientificDetail:
      'Setelah penyerapan karbohidrat dari saluran cerna, konsentrasi D-glukosa dalam plasma darah meningkat. Membran plasma sel otot dan sel adiposa bersifat hidrofobik dan impermeabel terhadap molekul polar seperti glukosa, sehingga glukosa memerlukan transporter khusus untuk masuk.',
    analogyDetail:
      'Ibarat banyak orang (glukosa) yang berkumpul di luar gerbang stasiun, namun pintu masuk utama belum dibuka sehingga mereka belum bisa masuk ke peron (sel).'
  },
  2: {
    stage: 2,
    title: 'Insulin Mendekati Sel Target',
    subtitle: 'Hormon peptida beredar menuju sel otot rangka atau sel lemak',
    narrativeText: 'Insulin menuju sel otot atau sel lemak.',
    activeObjects: ['Insulin (Molekul sinyal)', 'Ruang Ekstraseluler', 'Reseptor Permukaan Sel'],
    bloodGlucoseEffect: 'Masih tinggi. Insulin mulai berdifusi mendekati reseptor pada membran sel target (otot rangka atau adiposit).',
    scientificDetail:
      'Peningkatan glukosa darah merangsang sel beta pankreas melepaskan insulin ke aliran darah. Insulin mengalir melalui kapiler hingga mencapai cairan interstisial di sekitar sel target spesifik (otot rangka dan jaringan adiposa).',
    analogyDetail:
      'Ibarat kurir pembawa kunci (insulin) yang baru saja tiba di depan gerbang rumah, bersiap menuju lubang kunci di dinding luar.'
  },
  3: {
    stage: 3,
    title: 'Insulin Berikatan dengan Reseptor',
    subtitle: 'Kompleks Hormon-Reseptor di Permukaan Membran',
    narrativeText: 'Insulin berikatan dengan reseptor pada permukaan sel.',
    activeObjects: ['Insulin', 'Reseptor Insulin (Domain α ekstraseluler)'],
    bloodGlucoseEffect: 'Belum berubah secara langsung. Ikatan ini menginisiasi kaskade sinyal kimiawi intraseluler.',
    scientificDetail:
      'Insulin berikatan dengan subunit alfa ekstraseluler dari reseptor tirosin kinase insulin. Insulin HANYA menempel di permukaan luar dan TIDAK ikut masuk ke dalam sel melalui transporter glukosa.',
    analogyDetail:
      'Anak kunci (insulin) dimasukkan ke dalam lubang kunci (reseptor di pintu luar). Kuncinya tetap berada di luar dan tidak masuk ke dalam kamar.'
  },
  4: {
    stage: 4,
    title: 'Sinyal Intraseluler Diaktifkan',
    subtitle: 'Autofosforilasi Domain Tirosin Kinase & Kaskade Sinyal',
    narrativeText: 'Reseptor yang aktif meneruskan sinyal ke dalam sel.',
    activeObjects: ['Reseptor Terfosforilasi (Subunit β)', 'Jalur Sinyal Intraseluler (IRS/Akt)'],
    bloodGlucoseEffect: 'Fase transmisi sinyal. Perintah seluler dikirimkan ke cadangan transporter di dalam sitoplasma.',
    scientificDetail:
      'Pengikatan insulin memicu autofosforilasi residu tirosin pada subunit beta reseptor intraseluler. Reseptor aktif memfosforilasi substrat seperti IRS-1 yang memicu kaskade PI3K-Akt. (Visualisasi pulsa cahaya ini adalah representasi konseptual penyederhanaan).',
    analogyDetail:
      'Ketika bel ditekan di pintu depan, kabel listrik mengalirkan sinyal ke ruang dalam rumah agar petugas gudang bersiap membuka pintu darurat.'
  },
  5: {
    stage: 5,
    title: 'Vesikel GLUT4 Bergerak Menuju Membran',
    subtitle: 'Translokasi Vesikel Penyimpan GLUT4 (GSVs)',
    narrativeText: 'Sinyal insulin mengarahkan vesikel GLUT4 menuju membran.',
    activeObjects: ['Vesikel GLUT4', 'Sitoskeleton / Jalur Transportasi Sel'],
    bloodGlucoseEffect: 'Persiapan akhir. Pintu masuk glukosa sedang diberangkatkan dari sitoplasma ke perbatasan sel.',
    scientificDetail:
      'Aktivasi protein kinase B (Akt/PKB) melepaskan hambatan pada vesikel penyimpan GLUT4 (GSVs). Vesikel bergerak di sepanjang sitoskeleton menuju membran plasma sel.',
    analogyDetail:
      'Petugas gudang mendorong troli berisi daun pintu portabel (vesikel GLUT4) dari gudang penyimpanan dalam menuju kusen pintu luar.'
  },
  6: {
    stage: 6,
    title: 'GLUT4 Dipasang pada Membran Sel',
    subtitle: 'Fusi Vesikel & Integrasi Transporter pada Membran Plasma',
    narrativeText: 'GLUT4 dipasang pada membran dan membentuk jalur masuk glukosa.',
    activeObjects: ['Protein GLUT4 Transmembran', 'Membran Plasma Sel Target'],
    bloodGlucoseEffect: 'Kanal difusi terbuka! Membran sel kini memiliki pori permeabel untuk molekul glukosa.',
    scientificDetail:
      'Vesikel berfusi dengan membran plasma melalui bantuan protein SNARE. Protein transporter GLUT4 kini terintegrasi secara stabil pada bilayer lipid, membentuk saluran difusi terfasilitasi dua arah yang spesifik untuk D-glukosa.',
    analogyDetail:
      'Daun pintu (GLUT4) berhasil dipasang pas pada kusen gerbang stasiun, siap menerima aliran penumpang yang sedang mengantre di luar.'
  },
  7: {
    stage: 7,
    title: 'Glukosa Masuk Melalui GLUT4',
    subtitle: 'Difusi Terfasilitasi Menurunkan Kadar Glukosa Darah',
    narrativeText: 'Glukosa masuk melalui GLUT4 sehingga glukosa darah menurun.',
    activeObjects: ['Glukosa (Masuk ke sitosol)', 'GLUT4 Saluran Aktif', 'Glukosa Darah (Berkurang)'],
    bloodGlucoseEffect: 'Glukosa darah turun kembali menuju rentang normal basal (~70-99 mg/dL) karena glukosa berpindah ke dalam sel otot/lemak.',
    scientificDetail:
      'Glukosa berdifusi menuruni gradien konsentrasi dari cairan ekstraseluler ke sitoplasma melalui kanal protein GLUT4 tanpa memerlukan energi langsung (difusi terfasilitasi). Di dalam sel otot, glukosa segera difosforilasi menjadi Glukosa-6-Fosfat untuk glikolisis atau sintesis glikogen.',
    analogyDetail:
      'Para penumpang (glukosa) tertib mengalir masuk ke dalam stasiun (sel) melewati pintu putar (GLUT4). Halaman stasiun di luar yang semula penuh sesak kini menjadi lengang dan normal kembali.'
  }
};

export interface ObjectDetail {
  title: string;
  badge: string;
  color: string;
  description: string;
  keyFact: string;
}

export const OBJECT_DETAILS: Record<Exclude<InspectableObject, null>, ObjectDetail> = {
  GLUT4: {
    title: 'GLUT4 – Glucose Transporter Type 4',
    badge: 'Transporter Glukosa Spesifik',
    color: '#1D3557',
    description:
      'Glucose Transporter Type 4 atau GLUT4 adalah protein khusus yang berfungsi sebagai pintu untuk memasukkan glukosa dari aliran darah ke dalam sel, terutama sel otot rangka dan sel lemak. Insulin tidak membawa glukosa secara langsung. Insulin memberi sinyal agar lebih banyak GLUT4 ditempatkan pada membran sel.',
    keyFact: 'Saat insulin menurun, GLUT4 diinternalisasi kembali ke dalam vesikel melalui endositosis.'
  },
  RECEPTOR: {
    title: 'Reseptor Insulin (Insulin Receptor)',
    badge: 'Reseptor Tirosin Kinase Transmembran',
    color: '#8E24AA',
    description:
      'Reseptor heterotetramer (α₂β₂) di membran sel. Subunit alfa berada di luar untuk mengikat insulin, sedangkan subunit beta menembus membran dan memiliki aktivitas tirosin kinase di dalam sitoplasma.',
    keyFact: 'Ikatan insulin memicu autofosforilasi residu tirosin pada subunit beta di dalam sitosol.'
  },
  INSULIN: {
    title: 'Hormon Insulin',
    badge: 'Hormon Peptida Pengatur Glukosa',
    color: '#0284C7',
    description:
      'Hormon peptida 51 asam amino yang disintesis oleh sel beta pulau Langerhans pankreas. Berfungsi sebagai molekul pembawa sinyal (ligan) yang memberitahu sel tubuh bahwa pasokan nutrisi sedang melimpah.',
    keyFact: 'Insulin TIDAK mengangkut glukosa masuk ke dalam sel dan TIDAK masuk melalui GLUT4.'
  },
  GLUCOSE: {
    title: 'Molekul Glukosa (D-Glukosa)',
    badge: 'Monosakarida Sumber Energi',
    color: '#E5A910',
    description:
      'Bahan bakar metabolik utama bagi sebagian besar sel tubuh. Bersifat polar dan hidrofilik sehingga tidak dapat menembus bilayer fosfolipid tanpa protein pembawa seperti GLUT4.',
    keyFact: 'Masuknya glukosa ke sel otot dan lemak terjadi melalui difusi terfasilitasi tanpa merusak struktur glukosa.'
  },
  MEMBRANE: {
    title: 'Membran Plasma Sel Target',
    badge: 'Lapisan Ganda Fosfolipid (Bilayer)',
    color: '#64748B',
    description:
      'Bilayer semi-permeabel yang memisahkan ruang ekstraseluler dari sitoplasma sel otot rangka atau sel adiposit. Memiliki fluiditas tinggi yang memungkinkan integrasi protein transmembran.',
    keyFact: 'Translokasi vesikel memungkinkan GLUT4 menyatu ke dalam bilayer ini secara dinamis.'
  },
  VESICLE: {
    title: 'Vesikel Penyimpan GLUT4 (GSVs)',
    badge: 'Organel Transport Intraseluler',
    color: '#0D9488',
    description:
      'Kantong membran kecil di dalam sitoplasma yang menyimpan protein GLUT4 dalam keadaan inaktif ketika kadar insulin darah rendah.',
    keyFact: 'Saat stimulasi insulin aktif, vesikel bergerak mendekati membran sel dan berfusi dengannya.'
  },
  SIGNAL: {
    title: 'Kaskade Sinyal Intraseluler',
    badge: 'Penyederhanaan Jalur Biokimia',
    color: '#F59E0B',
    description:
      'Rangkaian pengiriman sinyal dari reseptor terfosforilasi menuju vesikel di dalam sel (jalur IRS-1 → PI3K → PDK1 → Akt/PKB). Digambarkan secara konseptual sebagai pulsa cahaya.',
    keyFact: 'Jalur sinyal intraseluler di sini merupakan penyederhanaan proses pensinyalan yang kompleks.'
  }
};
