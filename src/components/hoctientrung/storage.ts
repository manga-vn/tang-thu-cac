// ============================================================
// storage.ts — Vocabulary & Progress localStorage helpers
// Hỗ trợ 2 scope: 'family' (3 cha con) và 'public' (per nickname)
// ============================================================

export interface Word {
  id: string
  chinese: string
  pinyin: string
  meaning: string
  example?: string
  tags: string[]
  addedBy: string
  addedAt: string
  source?: string   // e.g. "Vòng Xuyến Điệp – Chương 3"
  tone?: number     // 1=ngang, 2=sắc, 3=hỏi, 4=nặng, 0=nhẹ
}

export interface ProgressEntry {
  status: 'remembered' | 'not_yet'
  reviewedAt: string
  // SRS fields (SM-2)
  interval?: number
  repetitions?: number
  easeFactor?: number
  nextReview?: string
  lastQuality?: number
}

export type ProgressMap = Record<string, ProgressEntry> // wordId → entry

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

// --- Vocabulary ---
function vocabKey(scope: string) { return `fc_vocab_${scope}` }

export function getVocabulary(scope: string): Word[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(vocabKey(scope)) || '[]') } catch { return [] }
}

export function saveVocabulary(scope: string, list: Word[]): void {
  localStorage.setItem(vocabKey(scope), JSON.stringify(list))
}

export function addWordToScope(scope: string, word: Omit<Word, 'id' | 'addedAt'>): Word {
  const newWord: Word = { ...word, id: generateId(), addedAt: todayStr() }
  const list = [newWord, ...getVocabulary(scope)]
  saveVocabulary(scope, list)
  return newWord
}

export function deleteWordFromScope(scope: string, id: string): void {
  saveVocabulary(scope, getVocabulary(scope).filter(w => w.id !== id))
}

// --- Progress ---
function progressKey(scope: string, userId: string) { return `fc_progress_${scope}_${userId}` }

export function getProgress(scope: string, userId: string): ProgressMap {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(progressKey(scope, userId)) || '{}') } catch { return {} }
}

export function saveProgress(scope: string, userId: string, map: ProgressMap): void {
  localStorage.setItem(progressKey(scope, userId), JSON.stringify(map))
}

export function markWord(scope: string, userId: string, wordId: string, status: 'remembered' | 'not_yet'): void {
  const map = getProgress(scope, userId)
  map[wordId] = { status, reviewedAt: todayStr() }
  saveProgress(scope, userId, map)
}

// --- Active scope for "Lưu từ" in reading page ---
export function getActiveScope(): { scope: string; userId: string } | null {
  if (typeof window === 'undefined') return null
  const familyProfile = localStorage.getItem('fc_family_profile')
  if (familyProfile) return { scope: 'family', userId: familyProfile }
  const nickname = localStorage.getItem('fc_public_nickname')
  if (nickname) return { scope: `public_${nickname}`, userId: nickname }
  return null
}

// --- Family profile ---
export function getFamilyProfile(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('fc_family_profile')
}
export function setFamilyProfile(id: string): void {
  localStorage.setItem('fc_family_profile', id)
}
export function clearFamilyProfile(): void {
  localStorage.removeItem('fc_family_profile')
}

// --- Public nickname ---
export function getPublicNickname(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('fc_public_nickname')
}
export function setPublicNickname(name: string): void {
  localStorage.setItem('fc_public_nickname', name)
}

// --- Lesson Progress ---
export interface LessonProgress {
  started: boolean
  completedDrills: string[]           // drill IDs đã hoàn thành
  speakRepeatCounts: Record<string, number> // drillId → số lần lặp
  quizScore?: number
  completed: boolean
  completedAt?: string
}

function defaultLessonProgress(): LessonProgress {
  return { started: false, completedDrills: [], speakRepeatCounts: {}, completed: false }
}

function lessonProgressKey(lessonId: string, userId: string) {
  return `lp_${lessonId}_${userId}`
}

export function getLessonProgress(lessonId: string, userId: string): LessonProgress {
  if (typeof window === 'undefined') return defaultLessonProgress()
  try {
    return JSON.parse(localStorage.getItem(lessonProgressKey(lessonId, userId)) || 'null') || defaultLessonProgress()
  } catch { return defaultLessonProgress() }
}

export function saveLessonProgress(lessonId: string, userId: string, progress: LessonProgress): void {
  localStorage.setItem(lessonProgressKey(lessonId, userId), JSON.stringify(progress))
}

export function markDrillDone(lessonId: string, userId: string, drillId: string, repeatCount: number): void {
  const p = getLessonProgress(lessonId, userId)
  p.started = true
  if (!p.completedDrills.includes(drillId)) p.completedDrills.push(drillId)
  p.speakRepeatCounts[drillId] = Math.max(p.speakRepeatCounts[drillId] || 0, repeatCount)
  saveLessonProgress(lessonId, userId, p)
}

export function markLessonComplete(lessonId: string, userId: string, quizScore?: number): void {
  const p = getLessonProgress(lessonId, userId)
  p.completed = true
  p.completedAt = todayStr()
  if (quizScore !== undefined) p.quizScore = quizScore
  saveLessonProgress(lessonId, userId, p)
}

export function getAllLessonProgress(userId: string): Record<string, LessonProgress> {
  if (typeof window === 'undefined') return {}
  const result: Record<string, LessonProgress> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(`lp_`) && key.endsWith(`_${userId}`)) {
      const lessonId = key.slice(3, -(userId.length + 1))
      try { result[lessonId] = JSON.parse(localStorage.getItem(key) || '{}') } catch {}
    }
  }
  return result
}
