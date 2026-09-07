/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId =
  | 'HOME'
  | 'INSTRUCTIONS'
  | 'STAGE_1'
  | 'STAGE_2'
  | 'STAGE_3'
  | 'STAGE_4'
  | 'STAGE_5'
  | 'STAGE_6'
  | 'STAGE_7'
  | 'STAGE_8'
  | 'STAGE_9'
  | 'SUMMARY';

export type AppView = 
  | 'PORTAL_AUTH'       // Login/pemilihan profil
  | 'STUDENT_AUTH'      // Alias login profil
  | 'PORTAL_HOME'       // Beranda portal biokimia (7 modul)
  | 'HORMONE_MAP'       // Peta pembelajaran modul hormon (Tahap 1, 2, 3)
  | 'GENERAL_HORMONE'   // Tahap 1: Materi umum hormon (7 bagian)
  | 'STAGE_1_GENERAL_HORMONE'
  | 'INSULIN_ANIMATION' // Tahap 2: Animasi spesifik insulin (9 tahap yang sudah ada)
  | 'STAGE_2_INSULIN_ANIMATION'
  | 'POST_TEST'         // Tahap 3: Post-test hormon & insulin
  | 'STAGE_3_POST_TEST'
  | 'STUDENT_PROGRESS'; // Riwayat & progres belajar

export interface PostTestDetailItem {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  topic: string;
}

export interface PostTestRecord {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  durationSeconds: number;
  category: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Belajar Kembali';
  details: PostTestDetailItem[];
}

export interface StudentProfile {
  id: string;
  name: string;
  nim: string;
  studentClass: string;
  createdAt: string;
  lastActive: string;
  // Progres Modul Hormon
  hormoneGeneralCompleted: boolean;
  insulinAnimationCompleted: boolean;
  lastStudiedSection: 'GENERAL_HORMONE' | 'INSULIN_ANIMATION' | 'POST_TEST';
  lastStageId?: ScreenId;
  // Riwayat Post-Test
  postTestHistory: PostTestRecord[];
  highestScore: number;
}

export type StageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface StageMeta {
  number: StageNumber;
  id: ScreenId;
  title: string;
  subtitle: string;
  summary: string;
}

export interface Reaction {
  id: string;
  name: string;
  equation: string;
  reactants: string[];
  products: string[];
  enzyme?: string;
  reactionType: string;
  changedBondOrGroup: string;
  usesWater: boolean;
  producesWater: boolean;
  usesATP: boolean;
  biologicalMeaning: string;
  simplificationNote?: string;
  sourceIds: string[];
  isPhysicalMovement?: boolean;
}

export interface Source {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  relevance: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
  category: 'Struktur' | 'Reseptor' | 'Reaksi' | 'Fisiologi';
}
