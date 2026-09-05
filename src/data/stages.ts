/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScreenId, StageMeta, StageNumber } from '../types';

export const STAGES_DATA: StageMeta[] = [
  {
    number: 1,
    id: 'STAGE_1',
    title: 'Asal Insulin',
    subtitle: 'Pankreas → Pulau Langerhans → Sel Beta → Insulin',
    summary: 'Insulin diproduksi oleh sel beta pada pulau Langerhans di pankreas.'
  },
  {
    number: 2,
    id: 'STAGE_2',
    title: 'Jenis atau Klasifikasi Insulin',
    subtitle: 'Sifat Kimia, Kelarutan, Lokasi Reseptor, dan Fungsi Biologis',
    summary: 'Hormon peptida larut air yang bekerja melalui reseptor membran sel untuk mengatur metabolisme.'
  },
  {
    number: 3,
    id: 'STAGE_3',
    title: 'Pembentukan Insulin',
    subtitle: 'Preproinsulin → Proinsulin → Insulin + C-peptide',
    summary: 'Pelepasan signal peptide dan pemisahan C-peptide melalui hidrolisis enzimatik.'
  },
  {
    number: 4,
    id: 'STAGE_4',
    title: 'Struktur Insulin Matang',
    subtitle: 'Rantai A (21 AA), Rantai B (30 AA), dan 3 Ikatan Disulfida',
    summary: 'Insulin matang terdiri atas 51 asam amino dan mempunyai tiga ikatan disulfida.'
  },
  {
    number: 5,
    id: 'STAGE_5',
    title: 'Penyimpanan dan Pelepasan Insulin',
    subtitle: 'Granula Sekretorik Sel Beta & Eksositosis',
    summary: 'Insulin disimpan dalam granula dan dilepaskan melalui eksositosis.'
  },
  {
    number: 6,
    id: 'STAGE_6',
    title: 'Pengikatan Insulin pada Reseptor',
    subtitle: 'Insulin + Reseptor ⇌ Kompleks Insulin–Reseptor',
    summary: 'Insulin menempel pada bagian luar reseptor di membran sel dan tidak masuk ke dalam sel.'
  },
  {
    number: 7,
    id: 'STAGE_7',
    title: 'Fosforilasi Reseptor & Kerja Insulin',
    subtitle: 'Reseptor Aktif → Translokasi GLUT4 → Glukosa Masuk',
    summary: 'Fosforilasi mengaktifkan reseptor untuk meneruskan sinyal, memicu translokasi GLUT4 ke membran, dan memfasilitasi masuknya glukosa.'
  },
  {
    number: 8,
    id: 'STAGE_8',
    title: 'Penghentian Sinyal (Defosforilasi)',
    subtitle: 'IR–Tyr–OPO₃²⁻ + H₂O —protein tirosin fosfatase→ IR–Tyr–OH + Pi',
    summary: 'Enzim fosfatase melepaskan gugus fosfat melalui hidrolisis, menghentikan sinyal baru dan secara bertahap mengembalikan sel ke kondisi basal.'
  },
  {
    number: 9,
    id: 'STAGE_9',
    title: 'Rangkuman Perjalanan Kimia Insulin',
    subtitle: 'Ringkasan Rangkaian Peristiwa Kimia & Fisiologis Insulin',
    summary: 'Ikhtisar lengkap perjalanan insulin dari asal organ, pembentukan, struktur, reseptor, aksi GLUT4, hingga penghentian sinyal.'
  }
];

export function getStageByNumber(num: StageNumber): StageMeta {
  return STAGES_DATA.find(s => s.number === num) || STAGES_DATA[0];
}

export function getStageById(id: ScreenId): StageMeta | undefined {
  return STAGES_DATA.find(s => s.id === id);
}
