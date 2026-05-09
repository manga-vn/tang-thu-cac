import test from 'node:test'
import assert from 'node:assert/strict'
import { findChineseSuggestions, normalizeVietnameseSearch } from './wordSuggestions.js'

test('normalizeVietnameseSearch removes Vietnamese tone marks for matching', () => {
  assert.equal(normalizeVietnameseSearch('Đi học!'), 'di hoc')
  assert.equal(normalizeVietnameseSearch('nước'), 'nuoc')
})

test('findChineseSuggestions suggests school phrase from Vietnamese input', () => {
  const suggestions = findChineseSuggestions('đi học')
  assert.equal(suggestions[0].chinese, '去学校')
  assert.equal(suggestions[0].pinyin, 'qù xué xiào')
})

test('findChineseSuggestions searches seeded daily vocabulary meanings', () => {
  const suggestions = findChineseSuggestions('muốn nước')
  assert.ok(suggestions.some((item) => item.pinyin.includes('shuǐ')))
})
