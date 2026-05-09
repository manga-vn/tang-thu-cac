const punctuationPattern = /[.,!?;:'"()[\]{}，。！？；：“”‘’、]/g

export function normalizeSpeechText(text = '') {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(punctuationPattern, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function tokenScore(spoken, target) {
  const spokenTokens = normalizeSpeechText(spoken).split(' ').filter(Boolean)
  const targetTokens = normalizeSpeechText(target).split(' ').filter(Boolean)

  if (!spokenTokens.length || !targetTokens.length) return 0
  const matched = targetTokens.filter((token) => spokenTokens.includes(token)).length
  return Math.round((matched / targetTokens.length) * 100)
}

export function scoreSpeechMatch(spokenText, target) {
  const spoken = normalizeSpeechText(spokenText)
  const chinese = normalizeSpeechText(target.chinese)
  const pinyin = normalizeSpeechText(target.pinyin)

  if (!spoken) return 0
  if (spoken === chinese || spoken === pinyin) return 100
  if (chinese && (spoken.includes(chinese) || chinese.includes(spoken))) return spoken.length >= chinese.length ? 100 : 70
  if (pinyin && (spoken.includes(pinyin) || pinyin.includes(spoken))) return spoken.length >= pinyin.length ? 100 : 70

  return Math.max(tokenScore(spoken, pinyin), tokenScore(spoken, chinese))
}

export function getScoreFeedback(score) {
  if (score >= 85) {
    return { label: 'Rất tốt', tone: 'green', message: 'Nghe rõ và khớp tốt với câu mẫu.' }
  }
  if (score >= 70) {
    return { label: 'Đạt phản xạ', tone: 'blue', message: 'Gần đúng rồi, đọc chậm và rõ hơn một chút.' }
  }
  return { label: 'Thử lại', tone: 'amber', message: 'Nghe mẫu thêm một lần rồi nói lại.' }
}

export function getSpeechRecognitionConstructor() {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

export function canUseSpeechRecognition() {
  return Boolean(getSpeechRecognitionConstructor())
}

export function speakChinese(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis || !text) return false

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.rate = 0.82
  utterance.pitch = 1
  window.speechSynthesis.speak(utterance)
  return true
}
