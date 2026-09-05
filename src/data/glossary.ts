/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlossaryItem } from '../types';

export const GLOSSARY_DATA: GlossaryItem[] = [
  {
    term: 'Hormon Peptida/Protein',
    definition: 'Hormon yang tersusun dari rantai asam amino yang disatukan oleh ikatan peptida. Bersifat polar/hidrofilik dan tidak dapat menembus bilayer lipid membran sel.',
    category: 'Struktur'
  },
  {
    term: 'Ikatan Peptida (-CO-NH-)',
    definition: 'Ikatan kovalen amida yang terbentuk antara gugus karboksil (-COOH) dari satu asam amino dan gugus amina (-NH₂) dari asam amino lainnya dengan melepaskan molekul air.',
    category: 'Struktur'
  },
  {
    term: 'Ikatan Disulfida (-S-S-)',
    definition: 'Ikatan kovalen antara dua atom belerang dari residu asam amino sistein yang terbentuk melalui reaksi oksidasi gugus tiol (-SH). Insulin memiliki 2 ikatan disulfida antarrantai dan 1 ikatan intrarantai A.',
    category: 'Struktur'
  },
  {
    term: 'Rantai A dan Rantai B',
    definition: 'Dua rantai polipeptida pembentuk molekul insulin aktif. Rantai A terdiri atas 21 asam amino, sedangkan Rantai B terdiri atas 30 asam amino (total 51 residu).',
    category: 'Struktur'
  },
  {
    term: 'Preproinsulin',
    definition: 'Polipeptida prekursor awal pembentukan insulin, tersusun atas signal peptide, rantai B, C-peptide, dan rantai A.',
    category: 'Struktur'
  },
  {
    term: 'Proinsulin',
    definition: 'Bentuk antara setelah signal peptide dipotong oleh signal peptidase di Retikulum Endoplasma; rantai B dan rantai A masih dihubungkan oleh C-peptide.',
    category: 'Struktur'
  },
  {
    term: 'C-Peptide (Connecting Peptide)',
    definition: 'Rantai penghubung antara Rantai B dan Rantai A pada proinsulin yang dipotong secara proteolitik saat pematangan insulin dalam granula sekretorik.',
    category: 'Struktur'
  },
  {
    term: 'Hidrofilik (Suka Air)',
    definition: 'Sifat molekul yang mudah berinteraksi dan larut dalam air karena adanya gugus polar atau bermuatan. Insulin bersifat hidrofilik sehingga tidak dapat menembus inti hidrofobik membran sel.',
    category: 'Struktur'
  },
  {
    term: 'Reseptor Tirosin Kinase (RTK) α₂β₂',
    definition: 'Reseptor membran permukaan berupa heterotetramer prabentuk yang terdiri atas 2 subunit α di ekstraseluler dan 2 subunit β transmembran/intraseluler dengan aktivitas enzim kinase.',
    category: 'Reseptor'
  },
  {
    term: 'Ikatan Nonkovalen Reversibel',
    definition: 'Interaksi molekuler yang tidak melibatkan pemakaian bersama pasangan elektron (seperti ikatan hidrogen, interaksi elektrostatik, gaya van der Waals, dan interaksi hidrofobik). Memungkinkan ligan insulin menempel dan lepas kembali.',
    category: 'Reseptor'
  },
  {
    term: 'Eksositosis',
    definition: 'Proses pengeluaran molekul dari dalam sel melalui fusi membran vesikel sekretorik dengan membran plasma. Merupakan perpindahan fisik, bukan reaksi kimia yang mengubah struktur insulin.',
    category: 'Fisiologi'
  },
  {
    term: 'Fosforilasi',
    definition: 'Reaksi pemindahan gugus fosforil (-PO₃²⁻) dari molekul donor berenergi tinggi (seperti ATP) ke atom oksigen dari residu asam amino (seperti tirosin) pada protein target.',
    category: 'Reaksi'
  },
  {
    term: 'Adenosin Trifosfat (ATP)',
    definition: 'Nukleotida berenergi tinggi yang bertindak sebagai donor gugus fosforil terminal dalam reaksi kinase intraseluler, menghasilkan ADP sebagai produk samping.',
    category: 'Reaksi'
  },
  {
    term: 'Defosforilasi',
    definition: 'Reaksi pemutusan gugus fosfat dari protein terfosforilasi menggunakan air (hidrolisis ester fosfat) yang dikatalisis oleh enzim fosfatase, menghasilkan fosfat anorganik (Pᵢ).',
    category: 'Reaksi'
  },
  {
    term: 'Protein Tirosin Fosfatase (PTPase)',
    definition: 'Enzim yang mengkatalisis pelepasan gugus fosfat dari residu fosfotirosin pada reseptor dan protein sinyal, mematikan kaskade pesan biologis.',
    category: 'Reaksi'
  },
  {
    term: 'Degradasi Insulin (IDE)',
    definition: 'Penghancuran enzimatik molekul insulin aktif melalui hidrolisis ikatan peptida menjadi oligopeptida kecil dan asam amino bebas oleh Insulin-Degrading Enzyme.',
    category: 'Reaksi'
  },
  {
    term: 'Feedback Negatif',
    definition: 'Mekanisme kendali homeostasis di mana hasil dari suatu proses (turunnya glukosa darah) menghambat stimulus awal (rangsang sekresi insulin dari sel beta pankreas).',
    category: 'Fisiologi'
  }
];
