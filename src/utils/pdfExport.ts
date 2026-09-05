/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { PostTestRecord, StudentProfile } from '../types';

export function exportPostTestToPDF(profile: StudentProfile, record: PostTestRecord) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      // Header mini di halaman baru
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(`BIOCHEMIA — Laporan Post-Test Modul Hormon (${profile.name} - ${profile.nim})`, margin, y);
      y += 8;
      doc.setTextColor(40, 40, 40);
    }
  };

  // 1. Header Utama Dokumen
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(107, 112, 92); // #6B705C
  doc.text('BIOCHEMIA — Biokimia Interaktif', margin, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Laporan Post-Test Modul Hormon', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Portal Pembelajaran Biokimia untuk Mahasiswa Pendidikan Kimia', margin, y);
  y += 6;

  // Garis Pembatas
  doc.setDrawColor(200, 195, 185);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // 2. Identitas Mahasiswa & Ringkasan Hasil
  checkPageBreak(35);
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text('IDENTITAS MAHASISWA', margin + 4, y + 6);
  doc.text('HASIL EVALUASI', margin + contentWidth / 2 + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  
  // Kolom Kiri
  doc.text(`Nama: ${profile.name}`, margin + 4, y + 13);
  doc.text(`NIM: ${profile.nim}`, margin + 4, y + 19);
  doc.text(`Kelas: ${profile.studentClass}`, margin + 4, y + 25);
  doc.text(`Waktu Tes: ${record.date}`, margin + 4, y + 31);

  // Kolom Kanan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(107, 112, 92);
  doc.text(`Nilai Akhir: ${record.score} / 100 (${record.category})`, margin + contentWidth / 2 + 4, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(`Benar: ${record.correctCount} soal | Salah: ${record.incorrectCount} soal`, margin + contentWidth / 2 + 4, y + 19);
  doc.text(`Total Soal: ${record.totalQuestions} soal pilihan ganda`, margin + contentWidth / 2 + 4, y + 25);
  const minutes = Math.floor(record.durationSeconds / 60);
  const seconds = record.durationSeconds % 60;
  doc.text(`Durasi Pengerjaan: ${minutes} menit ${seconds} detik`, margin + contentWidth / 2 + 4, y + 31);

  y += 40;

  // 3. Topik yang Perlu Dipelajari Kembali (Rekomendasi)
  const incorrectTopics = Array.from(
    new Set(record.details.filter(d => !d.isCorrect).map(d => d.topic))
  );

  if (incorrectTopics.length > 0) {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(165, 63, 43); // Merah bata
    doc.text('REKOMENDASI PEMBELAJARAN (TOPIK YANG PERLU DIPELAJARI KEMBALI):', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const recText = incorrectTopics.join(' • ');
    const splitRec = doc.splitTextToSize(`Berdasarkan jawaban yang belum tepat, disarankan meninjau kembali: ${recText}`, contentWidth);
    doc.text(splitRec, margin, y);
    y += splitRec.length * 4.5 + 4;
  } else {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(76, 120, 76);
    doc.text('REKOMENDASI PEMBELAJARAN:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    doc.text('Sangat Luar Biasa! Anda menjawab seluruh pertanyaan dengan tepat dan memahami konsep modul ini secara utuh.', margin, y);
    y += 8;
  }

  // 4. Rincian Setiap Soal
  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('RINCIAN SOAL DAN ANALISIS JAWABAN', margin, y);
  y += 6;

  record.details.forEach((item, index) => {
    // Estimasi tinggi blok soal
    const questionLines = doc.splitTextToSize(`Soal ${index + 1}: ${item.question}`, contentWidth - 4);
    const explLines = doc.splitTextToSize(`Pembahasan: ${item.explanation}`, contentWidth - 6);
    const estimatedHeight = questionLines.length * 4.5 + explLines.length * 4 + 22;

    checkPageBreak(estimatedHeight);

    // Kotak Soal
    doc.setFillColor(item.isCorrect ? 250 : 255, item.isCorrect ? 252 : 248, item.isCorrect ? 250 : 248);
    doc.setDrawColor(item.isCorrect ? 210 : 230, item.isCorrect ? 225 : 210, item.isCorrect ? 210 : 205);
    doc.roundedRect(margin, y, contentWidth, estimatedHeight - 3, 2, 2, 'FD');

    let itemY = y + 5;
    
    // Pertanyaan
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text(questionLines, margin + 3, itemY);
    itemY += questionLines.length * 4.5 + 2;

    // Jawaban Mahasiswa & Kunci
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    
    // Status
    if (item.isCorrect) {
      doc.setTextColor(60, 120, 60);
      doc.text(`[BENAR] Jawaban Anda: (${item.userAnswer})`, margin + 3, itemY);
    } else {
      doc.setTextColor(180, 50, 40);
      doc.text(`[SALAH] Jawaban Anda: (${item.userAnswer}) | Kunci Jawaban yang Benar: (${item.correctAnswer})`, margin + 3, itemY);
    }
    itemY += 5;

    // Pembahasan
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(90, 90, 90);
    doc.text(explLines, margin + 3, itemY);

    y += estimatedHeight + 2;
  });

  // 5. Pernyataan Penutup Dokumen
  checkPageBreak(20);
  y += 4;
  doc.setDrawColor(200, 195, 185);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  const disclaimer = 'Dokumen ini merupakan laporan hasil latihan pembelajaran dan bukan transkrip nilai resmi. Dihasilkan secara otomatis oleh sistem BIOCHEMIA — Biokimia Interaktif.';
  const splitDisc = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(splitDisc, margin, y);

  // Penamaan file yang rapi: PostTest_Hormon_[Nama]_[NIM]_[Tanggal].pdf
  const sanitizedName = profile.name.replace(/[^a-zA-Z0-9]/g, '_');
  const sanitizedNim = profile.nim.replace(/[^a-zA-Z0-9]/g, '_');
  const todayStr = new Date().toISOString().split('T')[0];
  const fileName = `PostTest_Hormon_${sanitizedName}_${sanitizedNim}_${todayStr}.pdf`;

  doc.save(fileName);
}
