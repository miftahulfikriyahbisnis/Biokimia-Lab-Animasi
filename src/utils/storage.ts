/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentProfile, PostTestRecord, ScreenId } from '../types';

const STORAGE_PROFILES_KEY = 'biochemia_student_profiles_v1';
const STORAGE_ACTIVE_PROFILE_KEY = 'biochemia_active_profile_id_v1';

export function normalizeProfile(p: any): StudentProfile {
  if (!p || typeof p !== 'object') {
    return {
      id: `student_${Date.now()}`,
      name: 'Mahasiswa',
      nim: '-',
      studentClass: 'Pendidikan Kimia',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toLocaleString('id-ID'),
      hormoneGeneralCompleted: false,
      insulinAnimationCompleted: false,
      lastStudiedSection: 'GENERAL_HORMONE',
      lastStageId: 'STAGE_1',
      postTestHistory: [],
      highestScore: 0
    };
  }

  return {
    ...p,
    name: p.name || 'Mahasiswa',
    nim: p.nim || '-',
    studentClass: p.studentClass || 'Pendidikan Kimia',
    createdAt: p.createdAt || new Date().toISOString(),
    lastActive: p.lastActive || new Date().toLocaleString('id-ID'),
    hormoneGeneralCompleted: Boolean(p.hormoneGeneralCompleted),
    insulinAnimationCompleted: Boolean(p.insulinAnimationCompleted),
    lastStudiedSection: p.lastStudiedSection || 'GENERAL_HORMONE',
    lastStageId: p.lastStageId || 'STAGE_1',
    postTestHistory: Array.isArray(p.postTestHistory) ? p.postTestHistory : [],
    highestScore: typeof p.highestScore === 'number' ? p.highestScore : 0
  };
}

export function getAllProfiles(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeProfile);
  } catch {
    return [];
  }
}

export function getActiveProfile(): StudentProfile | null {
  try {
    const activeId = localStorage.getItem(STORAGE_ACTIVE_PROFILE_KEY);
    if (!activeId) return null;
    const profiles = getAllProfiles();
    const found = profiles.find(p => p.id === activeId);
    return found ? normalizeProfile(found) : null;
  } catch {
    return null;
  }
}

export function setActiveProfileId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(STORAGE_ACTIVE_PROFILE_KEY, id);
    } else {
      localStorage.removeItem(STORAGE_ACTIVE_PROFILE_KEY);
    }
  } catch {
    // Ignore storage quota or disabled errors
  }
}

export function clearActiveProfile(): void {
  setActiveProfileId(null);
}

export function updateActiveProfile(updates: Partial<StudentProfile>): StudentProfile | null {
  const current = getActiveProfile();
  if (!current) return null;
  const updated: StudentProfile = {
    ...current,
    ...updates,
    lastActive: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
  };
  saveProfile(updated);
  return updated;
}

export function saveProfile(profile: StudentProfile): void {
  try {
    const profiles = getAllProfiles();
    const index = profiles.findIndex(p => p.id === profile.id);
    let updated: StudentProfile[];
    if (index >= 0) {
      updated = [...profiles];
      updated[index] = profile;
    } else {
      updated = [profile, ...profiles];
    }
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(updated));
    localStorage.setItem(STORAGE_ACTIVE_PROFILE_KEY, profile.id);
  } catch {
    // Ignore
  }
}

export function createNewProfile(name: string, nim: string, studentClass: string): StudentProfile {
  const newProfile: StudentProfile = {
    id: `student_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    nim: nim.trim(),
    studentClass: studentClass.trim(),
    createdAt: new Date().toISOString(),
    lastActive: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    hormoneGeneralCompleted: false,
    insulinAnimationCompleted: false,
    lastStudiedSection: 'GENERAL_HORMONE',
    lastStageId: 'STAGE_1',
    postTestHistory: [],
    highestScore: 0
  };

  saveProfile(newProfile);
  return newProfile;
}

export function deleteProfileById(id: string): void {
  try {
    const profiles = getAllProfiles().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    const activeId = localStorage.getItem(STORAGE_ACTIVE_PROFILE_KEY);
    if (activeId === id) {
      localStorage.removeItem(STORAGE_ACTIVE_PROFILE_KEY);
    }
  } catch {
    // Ignore
  }
}

export function updateActiveProgress(updates: {
  hormoneGeneralCompleted?: boolean;
  insulinAnimationCompleted?: boolean;
  lastStudiedSection?: 'GENERAL_HORMONE' | 'INSULIN_ANIMATION' | 'POST_TEST';
  lastStageId?: ScreenId;
}): StudentProfile | null {
  const current = getActiveProfile();
  if (!current) return null;

  const updated: StudentProfile = {
    ...current,
    ...updates,
    lastActive: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
  };

  saveProfile(updated);
  return updated;
}

export function addPostTestToActiveProfile(record: PostTestRecord): StudentProfile | null {
  const current = getActiveProfile();
  if (!current) return null;

  // Simpan maksimal 5 percobaan terakhir
  const newHistory = [record, ...current.postTestHistory].slice(0, 5);
  const newHighest = Math.max(current.highestScore, record.score);

  const updated: StudentProfile = {
    ...current,
    postTestHistory: newHistory,
    highestScore: newHighest,
    lastStudiedSection: 'POST_TEST',
    lastActive: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
  };

  saveProfile(updated);
  return updated;
}
