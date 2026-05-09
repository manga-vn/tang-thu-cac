import { useState, useCallback } from 'react'
import { getProgress, setProgress, todayStr } from '../utils/storage'

export function useProgress(userId) {
  const [progress, setP] = useState(() => getProgress())

  const save = useCallback((data) => {
    setProgress(data)
    setP(data)
  }, [])

  // Mark a word for the current user
  const markWord = useCallback((wordId, status) => {
    const current = getProgress()
    const updated = {
      ...current,
      [userId]: {
        ...(current[userId] || {}),
        [wordId]: { status, reviewedAt: todayStr() },
      },
    }
    save(updated)
  }, [userId, save])

  // Get status of one word for current user
  const getWordStatus = useCallback((wordId) => {
    return progress[userId]?.[wordId]?.status || 'unseen'
  }, [progress, userId])

  // All words reviewed today by a given user
  const getTodayReviewed = useCallback((uid) => {
    const today = todayStr()
    const userProgress = progress[uid] || {}
    return Object.entries(userProgress)
      .filter(([, v]) => v.reviewedAt === today)
      .map(([wordId, v]) => ({ wordId, ...v }))
  }, [progress])

  const getSummaryForUser = useCallback((uid, vocabulary) => {
    let remembered = 0, notYet = 0, unseen = 0
    vocabulary.forEach(w => {
      const s = (progress[uid] || {})[w.id]?.status
      if (s === 'remembered') remembered++
      else if (s === 'not_yet') notYet++
      else unseen++
    })
    return { remembered, notYet, unseen }
  }, [progress])

  // Summary: { remembered, notYet, unseen } for current user across all words
  const getSummary = useCallback((vocabulary) => {
    return getSummaryForUser(userId, vocabulary)
  }, [getSummaryForUser, userId])

  return { progress, markWord, getWordStatus, getTodayReviewed, getSummary, getSummaryForUser }
}
