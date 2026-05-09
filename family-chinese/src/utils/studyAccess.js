import { getDailyStudyPlan } from '../data/dailyLessons.js'

const COURSE_START_KEY = 'fc_course_start_date'

function parseLocalDate(dateText) {
  const [year, month, day] = dateText.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

export function clampStudyDay(day, totalDays = 90) {
  if (!Number.isFinite(day)) return 1
  return Math.max(1, Math.min(totalDays, Math.floor(day)))
}

export function getStudyDayFromDates(startDate, todayDate, totalDays = 90) {
  const diffMs = parseLocalDate(todayDate) - parseLocalDate(startDate)
  const diffDays = Math.floor(diffMs / 86_400_000)
  return clampStudyDay(diffDays + 1, totalDays)
}

export function getCurrentStudyDay({ todayDate, storage } = {}) {
  const today = todayDate || new Date().toISOString().slice(0, 10)
  const store = storage || globalThis.localStorage
  let startDate = today

  try {
    const savedStart = store?.getItem(COURSE_START_KEY)
    if (savedStart) {
      startDate = savedStart
    } else {
      store?.setItem(COURSE_START_KEY, today)
    }
  } catch {
    startDate = today
  }

  return getStudyDayFromDates(startDate, today)
}

export function getUnlockedVocabulary(vocabulary, studyDay = 1) {
  const plan = getDailyStudyPlan()
  const unlockedSeedIds = new Set(
    plan
      .slice(0, clampStudyDay(studyDay, plan.length))
      .flatMap((day) => day.items.map((item) => item.id)),
  )

  return vocabulary.filter((word) => !word.id?.startsWith('seed-') || unlockedSeedIds.has(word.id))
}
