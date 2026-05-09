import { seededVocabulary } from '../data/dailyLessons.js'

const extraSuggestions = [
  {
    id: 'extra-go-school',
    chinese: '去学校',
    pinyin: 'qù xué xiào',
    meaning: 'đi học / đi tới trường',
    example: '我去学校。',
    examplePinyin: 'wǒ qù xué xiào',
    exampleMeaning: 'Con đi học.',
    tags: ['nghe-noi', 'ra ngoài'],
  },
  {
    id: 'extra-go-home',
    chinese: '回家',
    pinyin: 'huí jiā',
    meaning: 'về nhà',
    example: '我回家。',
    examplePinyin: 'wǒ huí jiā',
    exampleMeaning: 'Con về nhà.',
    tags: ['nghe-noi', 'ra ngoài'],
  },
  {
    id: 'extra-go-play',
    chinese: '去玩',
    pinyin: 'qù wán',
    meaning: 'đi chơi',
    example: '我想去玩。',
    examplePinyin: 'wǒ xiǎng qù wán',
    exampleMeaning: 'Con muốn đi chơi.',
    tags: ['nghe-noi', 'ra ngoài'],
  },
  {
    id: 'extra-go-eat',
    chinese: '去吃饭',
    pinyin: 'qù chī fàn',
    meaning: 'đi ăn cơm / đi ăn',
    example: '我们去吃饭。',
    examplePinyin: 'wǒ men qù chī fàn',
    exampleMeaning: 'Mình đi ăn cơm.',
    tags: ['nghe-noi', 'buổi trưa'],
  },
]

export function normalizeVietnameseSearch(text = '') {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^\p{Letter}\p{Number}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function toSuggestion(word) {
  return {
    id: word.id,
    chinese: word.phrase || word.chinese,
    pinyin: word.phrasePinyin || word.pinyin,
    meaning: word.phraseMeaning || word.meaning,
    example: word.phrase || word.example || word.chinese,
    examplePinyin: word.phrasePinyin || word.examplePinyin || word.pinyin,
    exampleMeaning: word.phraseMeaning || word.exampleMeaning || word.meaning,
    tags: word.tags || [],
  }
}

function scoreSuggestion(query, suggestion) {
  const haystack = normalizeVietnameseSearch([
    suggestion.meaning,
    suggestion.exampleMeaning,
    suggestion.tags?.join(' '),
  ].filter(Boolean).join(' '))

  if (!query || !haystack) return 0
  if (haystack === query) return 100
  if (haystack.startsWith(query)) return 90
  if (haystack.includes(query)) return 75

  const queryTokens = query.split(' ').filter(Boolean)
  if (!queryTokens.length) return 0
  const matched = queryTokens.filter((token) => haystack.includes(token)).length
  return Math.round((matched / queryTokens.length) * 60)
}

export function findChineseSuggestions(query, vocabulary = [], limit = 6) {
  const normalizedQuery = normalizeVietnameseSearch(query)
  if (normalizedQuery.length < 2) return []

  const seen = new Set()
  const source = [...extraSuggestions, ...seededVocabulary, ...vocabulary].map(toSuggestion)

  return source
    .map((suggestion) => ({ ...suggestion, score: scoreSuggestion(normalizedQuery, suggestion) }))
    .filter((suggestion) => suggestion.score > 0 && suggestion.chinese && suggestion.pinyin)
    .filter((suggestion) => {
      const key = `${suggestion.chinese}-${suggestion.pinyin}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
