import Link from 'next/link'
import {
  ChineseLesson,
  getDialogueLines,
  getPronunciationItems,
  getReadySentences,
  getRoleplayPrompts,
  getVocabularyItems,
  getQuizItems,
} from '@/data/chineseLessons'
import ChineseAudioControls from './ChineseAudioControls'

export function ChineseLessonCard({ lesson }: { lesson: ChineseLesson }) {
  return (
    <Link
      href={`/hoc-tieng-trung/${lesson.slug}`}
      className="block rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4 shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          Ngày {lesson.day}
        </span>
        <span className="text-xs text-amber-800/50">{lesson.moduleLabel}</span>
      </div>
      <h3 className="text-base font-bold text-amber-950">{lesson.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-amber-800/65">{lesson.sceneDescription}</p>
    </Link>
  )
}

export function DialogueBubble({ line, index }: { line: ReturnType<typeof getDialogueLines>[number]; index: number }) {
  const isEven = index % 2 === 0
  return (
    <div className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[92%] rounded-2xl border p-4 ${isEven ? 'bg-[#FFFDF8] border-[#E5E0D8]' : 'bg-amber-50 border-amber-200'}`}>
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{line.speaker}</p>
          <ChineseAudioControls text={line.chinese} compact />
        </div>
        <p className="text-xl font-bold text-amber-950">{line.chinese}</p>
        {line.pinyin && <p className="mt-1 text-sm text-amber-800/70">{line.pinyin}</p>}
        <p className="mt-2 text-sm leading-relaxed text-amber-900/70">{line.vietnamese}</p>
        {line.toneNote && <p className="mt-2 rounded-xl bg-white/70 p-2 text-xs text-amber-800/65">{line.toneNote}</p>}
      </div>
    </div>
  )
}

export function VocabularyCard({ item }: { item: ReturnType<typeof getVocabularyItems>[number] }) {
  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-bold text-amber-950">{item.chinese}</p>
          {item.pinyin && <p className="text-sm text-amber-800/65">{item.pinyin}</p>}
        </div>
        <ChineseAudioControls text={item.chinese} compact />
      </div>
      <p className="mt-3 text-sm font-semibold text-amber-900">{item.vietnameseMeaning}</p>
      {'exampleSentenceChinese' in item && item.exampleSentenceChinese && (
        <p className="mt-2 text-sm text-amber-800/70">{item.exampleSentenceChinese}</p>
      )}
      {item.usageNote && <p className="mt-2 text-xs leading-relaxed text-amber-800/60">{item.usageNote}</p>}
    </div>
  )
}

export function ReadySentenceCard({ sentence }: { sentence: ReturnType<typeof getReadySentences>[number] }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-amber-950">{sentence.chinese}</p>
          {sentence.pinyin && <p className="text-sm text-amber-800/65">{sentence.pinyin}</p>}
        </div>
        <ChineseAudioControls text={sentence.chinese} compact />
      </div>
      <p className="mt-2 text-sm text-amber-900/75">{sentence.vietnamese}</p>
      <p className="mt-2 text-xs text-amber-800/60">{sentence.useCase}</p>
    </div>
  )
}

export function NativeTipCard({ tip }: { tip: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4 text-sm leading-relaxed text-amber-900/75">
      {tip}
    </div>
  )
}

export function PolitenessVariantCard({ context, example, note }: { context: string; example: string; note: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{context}</p>
      <p className="mt-2 text-lg font-bold text-amber-950">{example}</p>
      <p className="mt-2 text-sm leading-relaxed text-amber-800/70">{note}</p>
    </div>
  )
}

export function PronunciationPracticeCard({ item }: { item: ReturnType<typeof getPronunciationItems>[number] }) {
  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4">
      <p className="text-lg font-bold text-amber-950">{item.targetChinese}</p>
      {item.pinyin && <p className="mt-1 text-sm text-amber-800/65">{item.pinyin}</p>}
      <p className="mt-2 text-sm text-amber-900/70">{item.vietnamese}</p>
      <div className="mt-3">
        <ChineseAudioControls text={item.targetChinese} withSpeechCheck />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-amber-800/65">{item.focusPoint}</p>
      <p className="mt-2 text-xs leading-relaxed text-amber-800/50">{item.practiceInstruction}</p>
    </div>
  )
}

export function RoleplayPracticeCard({ prompt }: { prompt: ReturnType<typeof getRoleplayPrompts>['prompts'][number] }) {
  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4">
      <p className="text-sm leading-relaxed text-amber-900/75">{prompt.instruction}</p>
      <div className="mt-3 rounded-xl bg-amber-50 p-3">
        <p className="text-xs font-semibold text-amber-700">Gợi ý trả lời</p>
        <p className="mt-1 text-base font-bold text-amber-950">{prompt.suggestedAnswer}</p>
        <div className="mt-2">
          <ChineseAudioControls text={prompt.suggestedAnswer} compact />
        </div>
      </div>
    </div>
  )
}

export function DailyPracticeCard({ lesson }: { lesson: ChineseLesson }) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Nhiệm vụ trong ngày</p>
      <p className="mt-2 text-sm leading-relaxed text-amber-900/75">
        {lesson.dailyPracticeTask ?? `Hôm nay hãy chọn một câu trong bài "${lesson.title}" và dùng ít nhất 3 lần trong bối cảnh thật.`}
      </p>
    </div>
  )
}

export function QuizCard({ lesson }: { lesson: ChineseLesson }) {
  const quiz = getQuizItems(lesson)
  return (
    <div className="space-y-3">
      {quiz.map((item, index) => (
        <div key={`${item.question}-${index}`} className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4">
          <p className="font-semibold text-amber-950">{item.question}</p>
          <div className="mt-3 grid gap-2">
            {item.options.map((option, optionIndex) => (
              <div
                key={option}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  optionIndex === item.answer
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-[#E5E0D8] bg-white text-amber-800/70'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
