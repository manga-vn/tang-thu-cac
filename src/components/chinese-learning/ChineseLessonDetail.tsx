import Link from 'next/link'
import {
  ChineseLesson,
  getDialogueLines,
  getPronunciationItems,
  getReadySentences,
  getRoleplayPrompts,
  getVocabularyItems,
} from '@/data/chineseLessons'
import {
  DailyPracticeCard,
  DialogueBubble,
  NativeTipCard,
  PolitenessVariantCard,
  PronunciationPracticeCard,
  QuizCard,
  ReadySentenceCard,
  RoleplayPracticeCard,
  VocabularyCard,
} from './LessonCards'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#E5E0D8] bg-white/70 p-5 shadow-sm">
      <h2 className="text-lg font-bold text-amber-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function getCharacters(lesson: ChineseLesson) {
  if (lesson.characters?.length) return lesson.characters
  const speakers = [...new Set(getDialogueLines(lesson).map(line => line.speaker))]
  return speakers.slice(0, 5).map((speaker, index) => ({
    name: speaker,
    nameVi: speaker,
    emoji: ['👩', '👨', '👧', '👦', '👵'][index] ?? '🙂',
  }))
}

function getNativeTips(lesson: ChineseLesson) {
  if (lesson.nativeStyleTips?.length) return lesson.nativeStyleTips
  return [
    `Ưu tiên dùng câu trong đúng cảnh: ${lesson.sceneDescription}`,
    `Câu trọng tâm "${lesson.keyPhrase ?? lesson.title}" nên được nói tự nhiên, có cảm xúc, không đọc như đang tra từ điển.`,
    `Với người thân và nhóm nhỏ, câu ngắn thường tự nhiên hơn câu quá trang trọng.`,
  ]
}

function getPolitenessVariants(lesson: ChineseLesson) {
  if (lesson.politenessVariants?.length) return lesson.politenessVariants
  const keyPhrase = lesson.keyPhrase ?? getReadySentences(lesson)[0]?.chinese ?? lesson.title
  return [
    {
      context: 'Thân mật',
      example: keyPhrase,
      note: 'Dùng với người thân, bạn bè hoặc người quen trong bối cảnh gần gũi.',
    },
    {
      context: 'Lịch sự hơn',
      example: `请问，${keyPhrase}`,
      note: 'Thêm 请问 khi cần mềm và lịch sự hơn với người chưa thân.',
    },
  ]
}

export default function ChineseLessonDetail({ lesson }: { lesson: ChineseLesson }) {
  const dialogue = getDialogueLines(lesson)
  const vocabulary = getVocabularyItems(lesson)
  const readySentences = getReadySentences(lesson)
  const pronunciation = getPronunciationItems(lesson)
  const roleplay = getRoleplayPrompts(lesson)
  const characters = getCharacters(lesson)

  return (
    <div className="bg-[#F8F5EF]">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <Link href="/hoc-tieng-trung" className="text-sm font-medium text-amber-800/60 hover:text-amber-900">
          ← Tiếng Trung Mỗi Ngày
        </Link>

        <header className="mt-5 rounded-3xl bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 p-5 text-white sm:p-7">
          <p className="text-sm font-semibold text-amber-200">Ngày {lesson.day} · {lesson.moduleLabel}</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-4xl">{lesson.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-amber-100/85 sm:text-base">{lesson.sceneDescription}</p>
        </header>

        <div className="mt-6 grid gap-5">
          <Section title="1. Scene / bối cảnh">
            <p className="text-sm leading-relaxed text-amber-900/75">{lesson.sceneDescription}</p>
          </Section>

          <Section title="2. Characters / nhân vật">
            <div className="grid gap-3 sm:grid-cols-2">
              {characters.map(character => (
                <div key={`${character.name}-${character.nameVi}`} className="flex items-center gap-3 rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-3">
                  <span className="text-2xl">{character.emoji}</span>
                  <div>
                    <p className="font-bold text-amber-950">{character.name}</p>
                    <p className="text-sm text-amber-800/60">{character.nameVi}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Dialogue / hội thoại">
            <div className="space-y-3">
              {dialogue.map((line, index) => (
                <DialogueBubble key={`${line.speaker}-${line.chinese}-${index}`} line={line} index={index} />
              ))}
            </div>
          </Section>

          <Section title="4. Vocabulary / từ vựng trong ngữ cảnh">
            <div className="grid gap-3 sm:grid-cols-2">
              {vocabulary.map(item => (
                <VocabularyCard key={`${item.chinese}-${item.pinyin}`} item={item} />
              ))}
            </div>
          </Section>

          <Section title="5. Ready-to-use sentences / câu dùng được ngay">
            <div className="grid gap-3">
              {readySentences.map(sentence => (
                <ReadySentenceCard key={sentence.chinese} sentence={sentence} />
              ))}
            </div>
          </Section>

          <Section title="6. Native style tips / cách nói tự nhiên">
            <div className="grid gap-3">
              {getNativeTips(lesson).map(tip => (
                <NativeTipCard key={tip} tip={tip} />
              ))}
            </div>
          </Section>

          <Section title="7. Politeness variants / thân mật - lịch sự">
            <div className="grid gap-3 sm:grid-cols-2">
              {getPolitenessVariants(lesson).map(item => (
                <PolitenessVariantCard key={`${item.context}-${item.example}`} {...item} />
              ))}
            </div>
          </Section>

          <Section title="8. Pronunciation practice / luyện phát âm">
            <div className="grid gap-3">
              {pronunciation.map(item => (
                <PronunciationPracticeCard key={item.targetChinese} item={item} />
              ))}
            </div>
          </Section>

          <Section title="9. Roleplay practice / đóng vai">
            <p className="mb-3 text-sm leading-relaxed text-amber-900/70">{roleplay.setup}</p>
            <div className="grid gap-3">
              {roleplay.prompts.map(prompt => (
                <RoleplayPracticeCard key={`${prompt.instruction}-${prompt.suggestedAnswer}`} prompt={prompt} />
              ))}
            </div>
          </Section>

          <Section title="10. Daily practice task / nhiệm vụ trong ngày">
            <DailyPracticeCard lesson={lesson} />
          </Section>

          <Section title="11. Review prompt / ôn tập">
            <p className="text-sm leading-relaxed text-amber-900/75">
              {lesson.reviewPrompt ?? `Trước khi ngủ, hãy nói lại câu bạn thấy dùng được nhất trong bài "${lesson.title}" 3 lần.`}
            </p>
          </Section>

          <Section title="12. Quiz">
            <QuizCard lesson={lesson} />
          </Section>
        </div>
      </main>
    </div>
  )
}
