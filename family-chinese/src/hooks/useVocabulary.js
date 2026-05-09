import { useState, useCallback } from 'react'
import { getVocabulary, setVocabulary, generateId, todayStr } from '../utils/storage'

export function useVocabulary() {
  const [vocabulary, setVoc] = useState(() => getVocabulary())

  const save = useCallback((list) => {
    setVocabulary(list)
    setVoc(list)
  }, [])

  const addWord = useCallback((word, addedBy = 'cha') => {
    const newWord = {
      id: generateId(),
      chinese: word.chinese.trim(),
      pinyin:  word.pinyin?.trim() || '',
      meaning: word.meaning.trim(),
      example: word.example?.trim() || '',
      tags:    word.tags || [],
      addedBy,
      addedAt: todayStr(),
    }
    save([newWord, ...getVocabulary()])
    return newWord
  }, [save])

  const deleteWord = useCallback((id) => {
    save(getVocabulary().filter(w => w.id !== id))
  }, [save])

  const updateWord = useCallback((id, updates) => {
    save(getVocabulary().map(w => w.id === id ? { ...w, ...updates } : w))
  }, [save])

  const searchWords = useCallback((query, tag = '') => {
    const q = query.toLowerCase()
    return vocabulary.filter(w => {
      const matchQ = !q || [w.chinese, w.pinyin, w.meaning, w.example]
        .some(f => f?.toLowerCase().includes(q))
      const matchTag = !tag || w.tags?.includes(tag)
      return matchQ && matchTag
    })
  }, [vocabulary])

  const allTags = [...new Set(vocabulary.flatMap(w => w.tags || []))].sort()

  return { vocabulary, addWord, deleteWord, updateWord, searchWords, allTags }
}
