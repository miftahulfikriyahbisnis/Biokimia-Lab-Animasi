/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { PostTestRecord, StudentProfile } from '../types';
import { CARB_POST_TEST_QUESTIONS } from '../data/carbohydrateQuestions';

export function generateCarbohydratePdfReport(
  name: string,
  nim: string,
  score: number,
  correctCount: number,
  totalQuestions: number,
  userAnswers: { [questionId: string]: number }
) {
  const details = CARB_POST_TEST_QUESTIONS.map(q => {
    const userIdx = userAnswers[q.id];
    const userOption = userIdx !== undefined && q.options[userIdx] ? q.options[userIdx] : null;
    const userText = userOption ? `${userOption.key}. ${userOption.text}` : 'Tidak dijawab';
    const correctOption = q.options.find(o => o.key === q.correctAnswer);
    const correctText = correctOption ? `${correctOption.key}. ${correctOption.text}` : q.correctAnswer;
    const isCorrect = userIdx !== undefined && ['A', 'B', 'C', 'D'][userIdx] === q.correctAnswer;
    return {
      questionId: q.id,
      question: q.question,
      userAnswer: userText,
      correctAnswer: correctText,
      isCorrect,
      explanation: q.explanation,
      topic: q.topic
    };
  });

  const category = score >= 85 ? 'Sangat Baik' : score >= 70 ? 'Baik' : score >= 55 ? 'Cukup' : 'Perlu Belajar Kembali';

  const mockProfile: StudentProfile = {
    id: nim,
    name,
    nim,
    studentClass: 'Pendidikan Kimia',
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    hormoneGeneralCompleted: true,
    insulinAnimationCompleted: true,
    lastStudiedSection: 'POST_TEST',
    postTestHistory: [],
    highestScore: score
  };

  const record: PostTestRecord = {
    id: `carb-rec-${Date.now()}`,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    score,
    totalQuestions,
    correctCount,
    incorrectCount: totalQuestions - correctCount,
    durationSeconds: 0,
    category,
    details
  };

  exportCarbohydratePostTestToPDF(mockProfile, record);
}

export function exportCarbohydratePostTestToPDF(profile: StudentProfile, record: PostTestRecord) {
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
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(`BIOCHEMIA — Laporan Evaluasi Post-Test Karbohidrat (${profile.name} - ${profile.nim})`, margin, y);
      y += 8;
      doc.setTextColor(40, 40, 40);
    }
  };

  // Header Utama
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(107, 112, 92); // #6B705C
  doc.text('BIOCHEMIA — Biokimia Interaktif', margin, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Laporan Hasil Evaluasi: Eksplorasi Metabolisme Karbohidrat', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Pencernaan Pati, Glikolisis, Siklus Krebs, ETC, Glikogenesis, Glukoneogenesis & Integrasi', margin, y);
  y += 6;

  // Garis Pembatas
  doc.setDrawColor(200, 195, 185);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Kotak Identitas Mahasiswa & Hasil Tes
  doc.setFillColor(245, 242, 234); // #F5F2EA
  doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'F');

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);

  const col1X = margin + 5;
  const col2X = margin + 65;
  const col3X = margin + 125;
  let rowY = y + 7;

  doc.setFont('helvetica', 'bold');
  doc.text('Nama Mahasiswa:', col1X, rowY);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.name, col1X, rowY + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Nomor Induk Mahasiswa (NIM):', col1X, rowY + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.nim, col1X, rowY + 17);

  doc.setFont('helvetica', 'bold');
  doc.text('Program Studi / Kelas:', col2X, rowY);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.studentClass, col2X, rowY + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Tanggal & Waktu Ujian:', col2X, rowY + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(record.date, col2X, rowY + 17);

  // Nilai Akhir
  doc.setFont('helvetica', 'bold');
  doc.text('Skor Post-Test:', col3X, rowY);
  doc.setFontSize(20);
  doc.setTextColor(107, 112, 92);
  doc.text(`${record.score} / 100`, col3X, rowY + 8);

  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(`Predikat: ${record.category}`, col3X, rowY + 14);
  doc.text(`Benar: ${record.correctCount} / ${record.totalQuestions} soal`, col3X, rowY + 19);

  y += 44;

  // Analisis Per Submateri
  checkPageBreak(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('Analisis Penguasaan Konsep Karbohidrat:', margin, y);
  y += 6;

  // Hitung per submateri
  const topicStats: { [topic: string]: { total: number; correct: number } } = {};
  record.details.forEach(item => {
    if (!topicStats[item.topic]) {
      topicStats[item.topic] = { total: 0, correct: 0 };
    }
    topicStats[item.topic].total += 1;
    if (item.isCorrect) topicStats[item.topic].correct += 1;
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  Object.entries(topicStats).forEach(([top, stat]) => {
    checkPageBreak(7);
    const pct = Math.round((stat.correct / stat.total) * 100);
    const statusText = pct >= 80 ? 'Sangat Menguasai' : pct >= 60 ? 'Cukup Menguasai' : 'Perlu Pendalaman';
    doc.setTextColor(60, 60, 60);
    doc.text(`• ${top}`, margin + 3, y);
    doc.text(`${stat.correct}/${stat.total} Benar (${pct}%) — ${statusText}`, margin + 85, y);
    y += 5.5;
  });

  y += 4;

  // Lembar Evaluasi Soal & Pembahasan
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('Lembar Evaluasi Soal & Pembahasan Ilmiah:', margin, y);
  y += 7;

  record.details.forEach((item, idx) => {
    // Estimasi tinggi teks soal + pembahasan
    const qLines = doc.splitTextToSize(`Soal ${idx + 1}: ${item.question}`, contentWidth - 6);
    const expLines = doc.splitTextToSize(`Pembahasan Ilmiah: ${item.explanation}`, contentWidth - 6);
    const blockHeight = 12 + qLines.length * 4 + expLines.length * 3.8 + 12;

    checkPageBreak(blockHeight);

    // Kotak Soal
    doc.setFillColor(item.isCorrect ? 245 : 254, item.isCorrect ? 249 : 242, item.isCorrect ? 245 : 242);
    doc.setDrawColor(item.isCorrect ? 180 : 230, item.isCorrect ? 210 : 180, item.isCorrect ? 180 : 180);
    doc.roundedRect(margin, y, contentWidth, blockHeight - 3, 2, 2, 'FD');

    let textY = y + 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(item.isCorrect ? 46 : 185, item.isCorrect ? 125 : 28, item.isCorrect ? 50 : 28);
    doc.text(`[${item.isCorrect ? 'BENAR' : 'SALAH'}] Topik: ${item.topic}`, margin + 4, textY);
    textY += 4.5;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    qLines.forEach((line: string) => {
      doc.text(line, margin + 4, textY);
      textY += 3.8;
    });
    textY += 1.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(item.isCorrect ? 46 : 185, item.isCorrect ? 125 : 28, item.isCorrect ? 50 : 28);
    doc.text(`Jawaban Mahasiswa: ${item.userAnswer}`, margin + 4, textY);
    doc.setTextColor(40, 40, 40);
    doc.text(`Kunci Jawaban Tepat: ${item.correctAnswer}`, margin + 70, textY);
    textY += 4.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.8);
    doc.setTextColor(80, 80, 80);
    expLines.forEach((line: string) => {
      doc.text(line, margin + 4, textY);
      textY += 3.5;
    });

    y += blockHeight;
  });

  // Footer / Pengesahan Akhir
  checkPageBreak(25);
  y += 5;
  doc.setDrawColor(200, 195, 185);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Dokumen ini diunduh secara otomatis melalui Portal Pembelajaran Biokimia (BIOCHEMIA).', margin, y);
  doc.text('Digunakan sebagai portofolio evaluasi mandiri dan bukti pemahaman materi metabolisme karbohidrat.', margin, y + 4);

  // Download berkas
  const cleanName = profile.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  const cleanNIM = profile.nim.replace(/\s+/g, '_');
  doc.save(`BIOCHEMIA_Laporan_Karbohidrat_${cleanName}_${cleanNIM}.pdf`);
}
