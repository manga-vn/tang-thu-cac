// ============================================================
// SM-2 Spaced Repetition System
// https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
// ============================================================

export interface SRSData {
  interval: number       // Days until next review
  repetitions: number   // Number of successful reviews
  easeFactor: number    // Difficulty multiplier (min 1.3)
  nextReview: string    // ISO date string (YYYY-MM-DD)
  lastQuality: number   // Last quality score 0-5
}

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5
// 5 = perfect recall
// 4 = correct with slight hesitation
// 3 = correct but significant difficulty
// 2 = incorrect, easy to recall when shown
// 1 = incorrect, hard to recall
// 0 = complete blackout

export function defaultSRS(): SRSData {
  return { interval: 1, repetitions: 0, easeFactor: 2.5, nextReview: today(), lastQuality: 0 }
}

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function reviewSM2(card: SRSData, quality: ReviewQuality): SRSData {
  let { interval, repetitions, easeFactor } = card

  // Update ease factor
  const newEF = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

  if (quality < 3) {
    // Failed — reset
    interval = 1
    repetitions = 0
  } else {
    // Passed
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * newEF)
    repetitions += 1
  }

  const next = new Date()
  next.setDate(next.getDate() + interval)

  return {
    interval,
    repetitions,
    easeFactor: newEF,
    nextReview: next.toISOString().slice(0, 10),
    lastQuality: quality,
  }
}

// Convert "nhớ rồi / chưa nhớ" to quality scores
export function qualityFromSimple(remembered: boolean): ReviewQuality {
  return remembered ? 4 : 1
}

// Cards due today or overdue
export function isDue(srs: SRSData | undefined): boolean {
  if (!srs) return true
  return srs.nextReview <= today()
}

export function daysUntilDue(srs: SRSData | undefined): number {
  if (!srs) return 0
  const diff = new Date(srs.nextReview).getTime() - new Date(today()).getTime()
  return Math.ceil(diff / 86400000)
}
