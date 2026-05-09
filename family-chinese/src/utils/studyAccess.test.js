import test from 'node:test'
import assert from 'node:assert/strict'
import { seededVocabulary } from '../data/dailyLessons.js'
import { getCurrentStudyDay, getStudyDayFromDates, getUnlockedVocabulary } from './studyAccess.js'

test('study day starts at 1 and advances by calendar day', () => {
  assert.equal(getStudyDayFromDates('2026-05-09', '2026-05-09'), 1)
  assert.equal(getStudyDayFromDates('2026-05-09', '2026-05-10'), 2)
  assert.equal(getStudyDayFromDates('2026-05-09', '2026-08-20'), 90)
})

test('current study day stores the first course date', () => {
  const memory = new Map()
  const storage = {
    getItem: (key) => memory.get(key) || null,
    setItem: (key, value) => memory.set(key, value),
  }

  assert.equal(getCurrentStudyDay({ todayDate: '2026-05-09', storage }), 1)
  assert.equal(getCurrentStudyDay({ todayDate: '2026-05-10', storage }), 2)
})

test('unlocked vocabulary grows cumulatively by four lesson items per day', () => {
  assert.equal(getUnlockedVocabulary(seededVocabulary, 1).length, 4)
  assert.equal(getUnlockedVocabulary(seededVocabulary, 2).length, 8)
  assert.equal(getUnlockedVocabulary(seededVocabulary, 15).length, 60)
})

test('custom words stay visible even before all seed words are unlocked', () => {
  const customWord = { id: 'custom-1', chinese: '学校', pinyin: 'xué xiào', meaning: 'trường học' }
  const unlocked = getUnlockedVocabulary([customWord, ...seededVocabulary], 1)

  assert.equal(unlocked.length, 5)
  assert.equal(unlocked[0].id, 'custom-1')
})
