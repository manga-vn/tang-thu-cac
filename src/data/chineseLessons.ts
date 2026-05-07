import { LESSONS_QC, Lesson } from './LESSONS_QC'

export type ChineseLesson = Lesson & {
  id: number
  day: number
  moduleLabel: string
}

export const MODULE_LABELS: Record<Lesson['module'], string> = {
  A: 'Buổi sáng trong gia đình',
  B: 'Bữa ăn gia đình',
  C: 'Hỏi thăm trong ngày',
  D: 'Khách đến nhà',
  E: 'Nhóm nhỏ / Hàng xóm / Bạn bè',
}

export const MODULE_CARDS = [
  { module: 'A', title: MODULE_LABELS.A, copy: 'Những câu nói đầu ngày, gọi nhau dậy, chuẩn bị đi học và đi làm.' },
  { module: 'B', title: MODULE_LABELS.B, copy: 'Câu chuyện quanh mâm cơm, mời ăn, khen món ngon và quan tâm nhau.' },
  { module: 'C', title: MODULE_LABELS.C, copy: 'Hỏi thăm sức khỏe, công việc, học tập và những chuyện nhỏ trong ngày.' },
  { module: 'D', title: MODULE_LABELS.D, copy: 'Đón khách, giới thiệu người thân, mời vào nhà và tiễn khách tự nhiên.' },
  { module: 'E', title: MODULE_LABELS.E, copy: 'Nói chuyện với hàng xóm, bạn bè, nhóm nhỏ và cộng đồng quanh mình.' },
] as const

export const CHINESE_LESSONS: ChineseLesson[] = LESSONS_QC.map((lesson, index) => ({
  ...lesson,
  id: lesson.id ?? index + 1,
  day: lesson.id ?? index + 1,
  moduleLabel: lesson.moduleLabel ?? MODULE_LABELS[lesson.module],
}))

export function getChineseLessonBySlug(slug: string) {
  return CHINESE_LESSONS.find(lesson => lesson.slug === slug)
}

export function getFirstChineseLesson() {
  return CHINESE_LESSONS[0]
}

export function getSentenceText(line: string) {
  const match = line.match(/[“"']([^“”"']+)[”"']/)
  return match?.[1] ?? line
}

export function getSpeakerText(line: string) {
  const [speaker] = line.split(/[：:]/)
  return speaker?.trim() || 'Người nói'
}

export function parseVocabulary(raw: string) {
  const match = raw.match(/^(.+?)\s*\((.+)\)$/)
  return {
    chinese: match?.[1]?.trim() ?? raw,
    pinyin: match?.[2]?.trim() ?? '',
  }
}

export function getReadySentences(lesson: ChineseLesson) {
  if (lesson.readyToUseSentences?.length) return lesson.readyToUseSentences
  const sentences = [
    lesson.keyPhrase,
    ...(lesson.keyDialoguePoints ?? []).map(getSentenceText),
  ].filter((sentence): sentence is string => Boolean(sentence))

  return [...new Set(sentences)].slice(0, 5).map(sentence => ({
    chinese: sentence,
    pinyin: '',
    vietnamese: 'Câu có thể dùng ngay trong tình huống đời sống.',
    useCase: lesson.sceneDescription,
  }))
}

export function getDialogueLines(lesson: ChineseLesson) {
  if (lesson.dialogue?.length) return lesson.dialogue
  return (lesson.keyDialoguePoints ?? []).map(line => ({
    speaker: getSpeakerText(line),
    chinese: getSentenceText(line),
    pinyin: '',
    vietnamese: line,
    toneNote: '',
  }))
}

export function getVocabularyItems(lesson: ChineseLesson) {
  if (lesson.vocabulary?.length) return lesson.vocabulary
  return (lesson.focusVocabulary ?? []).map(item => {
    const parsed = parseVocabulary(item)
    return {
      chinese: parsed.chinese,
      pinyin: parsed.pinyin,
      vietnameseMeaning: 'Từ/cụm từ trọng tâm trong bài',
      usageNote: `Gặp trong bối cảnh: ${lesson.title}`,
    }
  })
}

export function getPronunciationItems(lesson: ChineseLesson) {
  if (lesson.pronunciationPractice?.length) return lesson.pronunciationPractice
  return getReadySentences(lesson).slice(0, 3).map(sentence => ({
    targetChinese: sentence.chinese,
    pinyin: sentence.pinyin,
    vietnamese: sentence.vietnamese,
    focusPoint: 'Nghe trước, sau đó nói chậm từng cụm rồi ghép lại tự nhiên.',
    commonMistake: 'Dễ nói đều đều như đọc chữ. Hãy để câu có cảm xúc theo đúng bối cảnh.',
    practiceInstruction: 'Bấm nghe, nghe chậm, rồi nói lại 3 lần.',
  }))
}

export function getRoleplayPrompts(lesson: ChineseLesson) {
  if (lesson.roleplayPractice) return lesson.roleplayPractice
  return {
    setup: `Bạn đang ở tình huống: ${lesson.sceneDescription}`,
    prompts: getReadySentences(lesson).slice(0, 4).map(sentence => ({
      instruction: sentence.useCase,
      suggestedAnswer: sentence.chinese,
    })),
  }
}

export function getQuizItems(lesson: ChineseLesson) {
  if (lesson.quiz?.length) return lesson.quiz
  const ready = getReadySentences(lesson)
  const answer = ready[0]?.chinese ?? lesson.keyPhrase ?? lesson.title
  return [
    {
      question: `Câu trọng tâm của bài "${lesson.title}" là gì?`,
      options: [answer, ...ready.slice(1, 4).map(item => item.chinese)].slice(0, 4),
      answer: 0,
    },
  ]
}
