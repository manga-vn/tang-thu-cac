import { seededVocabulary } from '../data/dailyLessons'

// ============================================================
// storage.js — localStorage helpers
// ============================================================

const KEYS = {
  VOCABULARY: 'fc_vocabulary',
  PROGRESS:   'fc_progress',
  PROFILE:    'fc_profile',
}

// --- Vocabulary ---
export function getVocabulary() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEYS.VOCABULARY))
    if (!saved || saved.length === 0) return seededVocabulary
    const savedIds = new Set(saved.map((word) => word.id))
    return [...seededVocabulary.filter((word) => !savedIds.has(word.id)), ...saved]
  } catch { return [] }
}

export function setVocabulary(list) {
  localStorage.setItem(KEYS.VOCABULARY, JSON.stringify(list))
}

// --- Progress ---
// Shape: { [userId]: { [wordId]: { status, reviewedAt } } }
export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.PROGRESS)) || {}
  } catch { return {} }
}

export function setProgress(data) {
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(data))
}

// --- Current Profile ---
export function getCurrentProfile() {
  return localStorage.getItem(KEYS.PROFILE) || null
}

export function setCurrentProfile(profileId) {
  localStorage.setItem(KEYS.PROFILE, profileId)
}

export function clearProfile() {
  localStorage.removeItem(KEYS.PROFILE)
}

// --- Helpers ---
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10)
}
