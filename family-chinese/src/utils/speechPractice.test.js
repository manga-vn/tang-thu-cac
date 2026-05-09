import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeSpeechText, scoreSpeechMatch, getScoreFeedback } from './speechPractice.js'

test('normalizeSpeechText lowercases text and removes tone marks and punctuation', () => {
  assert.equal(normalizeSpeechText('Wǒ yào shuǐ!'), 'wo yao shui')
  assert.equal(normalizeSpeechText('我要水。'), '我要水')
})

test('scoreSpeechMatch gives high scores for exact chinese or pinyin matches', () => {
  assert.equal(scoreSpeechMatch('我要水', { chinese: '我要水。', pinyin: 'wǒ yào shuǐ' }), 100)
  assert.equal(scoreSpeechMatch('wo yao shui', { chinese: '我要水。', pinyin: 'wǒ yào shuǐ' }), 100)
})

test('scoreSpeechMatch gives partial credit for close speech', () => {
  const score = scoreSpeechMatch('yao shui', { chinese: '我要水。', pinyin: 'wǒ yào shuǐ' })
  assert.ok(score >= 60 && score < 100)
})

test('scoreSpeechMatch gives low scores for unrelated speech', () => {
  assert.equal(scoreSpeechMatch('ni hao', { chinese: '我要水。', pinyin: 'wǒ yào shuǐ' }), 0)
})

test('getScoreFeedback maps scores to simple learner-facing feedback', () => {
  assert.equal(getScoreFeedback(90).label, 'Rất tốt')
  assert.equal(getScoreFeedback(70).label, 'Đạt phản xạ')
  assert.equal(getScoreFeedback(45).label, 'Thử lại')
})
