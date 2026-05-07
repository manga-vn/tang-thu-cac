'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Lesson, DialogueLine, SpeakingDrill, QuizItem,
  ROLE_LABELS, getLessonBySlug,
} from './lessonData'
import { recordAndAnalyzeTone, checkSupport } from './toneDetector'
import { playChineseAudio, preloadVoices } from './audio'
import {
  getActiveScope, getLessonProgress, markDrillDone,
  markLessonComplete, LessonProgress,
} from './storage'

// ─────────────────────────────────────────────────────
// Types & helpers
// ─────────────────────────────────────────────────────
type Section = 'context' | 'core' | 'patterns' | 'dialogue' | 'vocab' | 'drills' | 'mission' | 'quiz'
const SECTIONS: { id: Section; label: string; emoji: string }[] = [
  { id: 'context',  label: 'Bối cảnh', emoji: '🎬' },
  { id: 'core',     label: 'Câu lõi',  emoji: '⭐' },
  { id: 'patterns', label: 'Mẫu câu',  emoji: '📐' },
  { id: 'dialogue', label: 'Hội thoại',emoji: '💬' },
  { id: 'vocab',    label: 'Từ vựng',  emoji: '📖' },
  { id: 'drills',   label: 'Luyện nói',emoji: '🎤' },
  { id: 'mission',  label: 'Nhiệm vụ', emoji: '🎯' },
  { id: 'quiz',     label: 'Kiểm tra', emoji: '✅' },
]

const ROLE_COLORS: Record<DialogueLine['role'], string> = {
  father: 'bg-blue-50 border-blue-200',
  mother:  'bg-pink-50 border-pink-200',
  child:   'bg-amber-50 border-amber-200',
  older_sibling: 'bg-purple-50 border-purple-200',
  younger_sibling: 'bg-green-50 border-green-200',
  speakerA: 'bg-gray-50 border-gray-200',
  speakerB: 'bg-slate-50 border-slate-200',
}

// ─────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────
export default function LessonDetail({ slug }: { slug: string }) {
  const lesson = getLessonBySlug(slug)
  const [activeSection, setActiveSection] = useState<Section>('context')
  const [showPinyin, setShowPinyin] = useState(true)
  const [progress, setProgress] = useState<LessonProgress | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const { tts } = checkSupport()

  useEffect(() => {
    preloadVoices() // warm up TTS voice list for mobile
    const scope = getActiveScope()
    if (scope && lesson) {
      setUserId(scope.userId)
      setProgress(getLessonProgress(lesson.id, scope.userId))
    }
  }, [lesson])

  const refreshProgress = useCallback(() => {
    if (lesson && userId) setProgress(getLessonProgress(lesson.id, userId))
  }, [lesson, userId])

  if (!lesson) return (
    <div className="flex flex-col items-center py-24 text-center px-6">
      <div className="text-4xl mb-3">😕</div>
      <p className="text-amber-800/60">Không tìm thấy bài học này.</p>
      <Link href="/hoc-tieng-trung/bai-hoc" className="mt-4 text-amber-700 underline text-sm">← Danh sách bài học</Link>
    </div>
  )

  const currentIdx = SECTIONS.findIndex(s => s.id === activeSection)
  const canGoNext = currentIdx < SECTIONS.length - 1
  const canGoPrev = currentIdx > 0

  const completedDrills = progress?.completedDrills || []
  const drillsDoneCount = completedDrills.length
  const allDrillsDone = drillsDoneCount >= lesson.speakingDrills.length

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#F8F5EF] pb-32">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/hoc-tieng-trung/bai-hoc" className="text-amber-800/50 hover:text-amber-800 text-sm">← Bài học</Link>
          <div className="text-center">
            <p className="text-xs font-bold text-amber-800">Ngày {lesson.day} — {lesson.title}</p>
          </div>
          <button
            onClick={() => setShowPinyin(p => !p)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${showPinyin ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
          >
            {showPinyin ? 'Ẩn pinyin' : 'Hiện pinyin'}
          </button>
        </div>

        {/* Section nav scroll */}
        <div className="flex overflow-x-auto gap-1 px-3 pb-2 scrollbar-none">
          {SECTIONS.map((s, i) => {
            const isCurrent = s.id === activeSection
            const isDone = i < currentIdx
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-1 shrink-0 px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${isCurrent ? 'bg-amber-700 text-white' : isDone ? 'bg-green-100 text-green-700' : 'bg-[#F8F5EF] text-amber-800/50'}`}>
                {isDone && !isCurrent ? '✓' : s.emoji} {s.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Section content */}
      <div className="px-4 py-5">
        {activeSection === 'context'  && <SectionContext lesson={lesson} />}
        {activeSection === 'core'     && <SectionCore lesson={lesson} showPinyin={showPinyin} tts={tts} />}
        {activeSection === 'patterns' && <SectionPatterns lesson={lesson} showPinyin={showPinyin} tts={tts} />}
        {activeSection === 'dialogue' && <SectionDialogue lesson={lesson} showPinyin={showPinyin} tts={tts} />}
        {activeSection === 'vocab'    && <SectionVocab lesson={lesson} tts={tts} />}
        {activeSection === 'drills'   && (
          <SectionDrills lesson={lesson} showPinyin={showPinyin} tts={tts}
            userId={userId} completedDrills={completedDrills}
            onDrillDone={(drillId, count) => {
              if (lesson && userId) { markDrillDone(lesson.id, userId, drillId, count); refreshProgress() }
            }} />
        )}
        {activeSection === 'mission'  && <SectionMission lesson={lesson} />}
        {activeSection === 'quiz'     && (
          <SectionQuiz lesson={lesson}
            onComplete={(score) => {
              if (lesson && userId) { markLessonComplete(lesson.id, userId, score); refreshProgress() }
            }} />
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#FFFDF8] border-t border-[#E5E0D8] px-4 py-3 flex gap-3 z-50">
        <button onClick={() => canGoPrev && setActiveSection(SECTIONS[currentIdx - 1].id)}
          disabled={!canGoPrev}
          className="flex-1 py-3 rounded-2xl border border-[#E5E0D8] text-amber-800/60 font-medium text-sm disabled:opacity-30 hover:bg-amber-50 transition-colors">
          ← Trước
        </button>
        {canGoNext ? (
          <button onClick={() => setActiveSection(SECTIONS[currentIdx + 1].id)}
            className="flex-[2] py-3 rounded-2xl bg-amber-700 text-white font-semibold text-sm hover:bg-amber-800 transition-colors">
            Tiếp theo →
          </button>
        ) : (
          <button
            disabled={!allDrillsDone}
            className={`flex-[2] py-3 rounded-2xl font-semibold text-sm transition-colors ${progress?.completed ? 'bg-green-600 text-white' : allDrillsDone ? 'bg-amber-700 text-white hover:bg-amber-800' : 'bg-gray-200 text-gray-400'}`}>
            {progress?.completed ? '✅ Đã hoàn thành' : '🎯 Hoàn thành bài học'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Bối cảnh
// ─────────────────────────────────────────────────────
function SectionContext({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-amber-700 text-white rounded-3xl p-6">
        <p className="text-xs font-semibold opacity-70 mb-1 uppercase tracking-widest">Ngày {lesson.day}</p>
        <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
        <p className="text-sm opacity-90 leading-relaxed">{lesson.goal}</p>
      </div>

      <div className="bg-[#FFFDF8] border border-[#E5E0D8] rounded-3xl p-5">
        <p className="text-xs font-semibold text-amber-800/50 mb-2 uppercase tracking-widest">🎬 Tình huống</p>
        <p className="text-amber-950 leading-relaxed text-sm">{lesson.situation}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-blue-700 mb-1">💡 Sau bài này bạn sẽ có thể:</p>
        <p className="text-sm text-blue-800">{lesson.goal}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Câu lõi
// ─────────────────────────────────────────────────────
function SectionCore({ lesson, showPinyin, tts }: { lesson: Lesson; showPinyin: boolean; tts: boolean }) {
  const [playing, setPlaying] = useState(false)
  const cs = lesson.coreSentence

  function play(slow = false) {
    setPlaying(true)
    playChineseAudio(cs.ttsText, {
      slow,
      onEnd:  () => setPlaying(false),
      onError: () => setPlaying(false),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-amber-800/60 text-center">Đây là câu quan trọng nhất của bài. Hãy nghe thật nhiều lần.</p>

      <div className="bg-[#FFFDF8] border-2 border-amber-300 rounded-3xl p-8 text-center shadow-sm">
        <p className="text-5xl font-bold text-amber-950 mb-3">{cs.hanzi}</p>
        {showPinyin && <p className="text-xl text-amber-700 mb-2">{cs.pinyin}</p>}
        <p className="text-base text-amber-800/70">{cs.vi}</p>
      </div>

      {tts && (
        <div className="flex gap-3">
          <button onClick={() => play()} disabled={playing}
            className={`flex-1 py-4 rounded-2xl font-semibold text-sm transition-all ${playing ? 'bg-amber-500 text-white' : 'bg-amber-700 text-white hover:bg-amber-800'}`}>
            {playing ? '🔊 Đang phát...' : '🔊 Nghe câu mẫu'}
          </button>
          <button onClick={() => play(true)} disabled={playing}
            className="flex-1 py-4 rounded-2xl font-semibold text-sm bg-amber-50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 transition-all">
            🐢 Nghe chậm
          </button>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-amber-800 mb-2">🎯 Hãy thử đọc theo:</p>
        <p className="text-sm text-amber-800/70">Nghe câu mẫu, sau đó đọc to theo. Lặp lại ít nhất 3 lần. Không cần hoàn hảo ngay lần đầu!</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Mẫu câu
// ─────────────────────────────────────────────────────
function SectionPatterns({ lesson, showPinyin, tts }: { lesson: Lesson; showPinyin: boolean; tts: boolean }) {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-amber-800/60">Học cấu trúc câu — hiểu mẫu để tự tạo câu mới.</p>
      {lesson.sentencePatterns.map((sp, i) => (
        <div key={sp.id} className="bg-[#FFFDF8] border border-[#E5E0D8] rounded-2xl overflow-hidden">
          <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            className="w-full px-4 py-4 flex items-center justify-between text-left">
            <div>
              <p className="font-semibold text-amber-950 text-sm">{sp.title}</p>
              <p className="text-xs text-amber-800/50 mt-0.5 font-mono">{sp.pattern}</p>
            </div>
            <span className={`text-amber-800/40 transition-transform ${openIdx === i ? 'rotate-90' : ''}`}>›</span>
          </button>

          {openIdx === i && (
            <div className="px-4 pb-4 border-t border-[#E5E0D8]">
              <p className="text-sm text-amber-800/70 mt-3 mb-4">{sp.explanation}</p>
              <div className="flex flex-col gap-2">
                {sp.examples.map(ex => (
                  <div key={ex.id} className="bg-amber-50 rounded-xl p-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="font-bold text-amber-950">{ex.hanzi}</p>
                      {showPinyin && <p className="text-xs text-amber-700">{ex.pinyin}</p>}
                      <p className="text-xs text-amber-800/60">{ex.vi}</p>
                    </div>
                    {tts && (
                      <button onClick={() => playChineseAudio(ex.ttsText)}
                        className="shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 hover:bg-amber-200 transition-colors">
                        🔊
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Hội thoại
// ─────────────────────────────────────────────────────
function SectionDialogue({ lesson, showPinyin, tts }: { lesson: Lesson; showPinyin: boolean; tts: boolean }) {
  const [rolePlay, setRolePlay] = useState<DialogueLine['role'] | null>(null)
  const roles = [...new Set(lesson.dialogue.map(l => l.role))]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-amber-800/60">Đọc hội thoại và luyện theo từng vai.</p>
        <button onClick={() => setRolePlay(null)}
          className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${!rolePlay ? 'bg-amber-700 text-white border-amber-700' : 'bg-[#F8F5EF] border-[#E5E0D8] text-amber-800/60'}`}>
          Xem hết
        </button>
      </div>

      {/* Role picker */}
      <div className="flex gap-2 flex-wrap">
        {roles.map(role => (
          <button key={role} onClick={() => setRolePlay(role === rolePlay ? null : role)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${rolePlay === role ? 'bg-amber-700 text-white border-amber-700' : 'bg-[#FFFDF8] border-[#E5E0D8] text-amber-800/70 hover:border-amber-400'}`}>
            Đóng vai {ROLE_LABELS[role]}
          </button>
        ))}
      </div>

      {rolePlay && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
          💡 Bạn đang đóng vai <strong>{ROLE_LABELS[rolePlay]}</strong>. Phần thoại của bạn được tô đậm — hãy đọc to!
        </div>
      )}

      {/* Dialogue lines */}
      <div className="flex flex-col gap-3">
        {lesson.dialogue.map(line => {
          const isMyRole = rolePlay === line.role
          const isHidden = rolePlay && !isMyRole
          return (
            <div key={line.id} className={`rounded-2xl border p-4 transition-opacity ${ROLE_COLORS[line.role]} ${isHidden ? 'opacity-40' : ''} ${isMyRole ? 'ring-2 ring-amber-400' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-800/60 uppercase">{ROLE_LABELS[line.role]}</span>
                {tts && !isHidden && (
                  <button onClick={() => playChineseAudio(line.ttsText)}
                    className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center text-sm hover:bg-white transition-colors">
                    🔊
                  </button>
                )}
              </div>
              <p className={`font-bold text-amber-950 text-base ${isHidden ? 'blur-sm' : ''}`}>{line.hanzi}</p>
              {showPinyin && !isHidden && <p className="text-xs text-amber-700 mt-0.5">{line.pinyin}</p>}
              {!isHidden && <p className="text-xs text-amber-800/60 mt-1">{line.vi}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Từ vựng
// ─────────────────────────────────────────────────────
function SectionVocab({ lesson, tts }: { lesson: Lesson; tts: boolean }) {
  const [flipped, setFlipped] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-amber-800/60">Bấm vào từ để xem chi tiết. Bấm 🔊 để nghe phát âm.</p>
      <div className="grid grid-cols-2 gap-2">
        {lesson.vocabulary.map(v => (
          <button key={v.id} onClick={() => setFlipped(flipped === v.id ? null : v.id)}
            className={`bg-[#FFFDF8] border rounded-2xl p-4 text-left transition-all active:scale-95 ${flipped === v.id ? 'border-amber-400 bg-amber-50' : 'border-[#E5E0D8] hover:border-amber-300'}`}>
            <p className="text-2xl font-bold text-amber-950 mb-1">{v.hanzi}</p>
            <p className="text-xs text-amber-700">{v.pinyin}</p>
            {flipped === v.id && (
              <>
                <p className="text-xs text-amber-800/70 mt-1">{v.vi}</p>
                {tts && (
                  <button onClick={e => { e.stopPropagation(); playChineseAudio(v.ttsText) }}
                    className="mt-2 text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-2 py-1 rounded-lg transition-colors">
                    🔊 Nghe
                  </button>
                )}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Luyện nói
// ─────────────────────────────────────────────────────
function SectionDrills({
  lesson, showPinyin, tts, userId, completedDrills, onDrillDone
}: {
  lesson: Lesson; showPinyin: boolean; tts: boolean
  userId: string | null; completedDrills: string[]
  onDrillDone: (drillId: string, count: number) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-amber-800/60">
        Nghe câu mẫu, đọc to nhiều lần, rồi bấm <strong>"Tôi nói được!"</strong> để đánh dấu hoàn thành.
      </p>
      {lesson.speakingDrills.map((drill, i) => (
        <DrillCard key={drill.id} drill={drill} index={i}
          isDone={completedDrills.includes(drill.id)}
          showPinyin={showPinyin} tts={tts}
          onDone={(count) => onDrillDone(drill.id, count)} />
      ))}
    </div>
  )
}

function DrillCard({
  drill, index, isDone, showPinyin, tts, onDone
}: {
  drill: SpeakingDrill; index: number; isDone: boolean
  showPinyin: boolean; tts: boolean; onDone: (count: number) => void
}) {
  const [repeatCount, setRepeatCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [recording, setRecording] = useState(false)
  const [micError, setMicError] = useState(false)
  const { microphone } = checkSupport()
  const met = repeatCount >= drill.repeatTarget

  function play() {
    setPlaying(true)
    playChineseAudio(drill.sentence.ttsText, {
      onEnd:  () => setPlaying(false),
      onError: () => setPlaying(false),
    })
  }

  function handleRepeat() {
    const newCount = repeatCount + 1
    setRepeatCount(newCount)
    play()
  }

  async function handleRecord() {
    if (!microphone) { setMicError(true); return }
    setRecording(true)
    try {
      await recordAndAnalyzeTone(2000)
      const newCount = repeatCount + 1
      setRepeatCount(newCount)
    } catch { setMicError(true) }
    setRecording(false)
  }

  return (
    <div className={`bg-[#FFFDF8] border-2 rounded-3xl p-5 transition-all ${isDone ? 'border-green-300 bg-green-50' : 'border-[#E5E0D8]'}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isDone ? 'bg-green-200 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {isDone ? '✓' : index + 1}
        </span>
        <p className="text-sm text-amber-800/70 flex-1">{drill.instruction}</p>
      </div>

      {/* Sentence card */}
      <div className="bg-amber-50 rounded-2xl p-4 mb-4 text-center">
        <p className="text-3xl font-bold text-amber-950 mb-1">{drill.sentence.hanzi}</p>
        {showPinyin && <p className="text-sm text-amber-700">{drill.sentence.pinyin}</p>}
        <p className="text-xs text-amber-800/60 mt-1">{drill.sentence.vi}</p>
      </div>

      {/* Repeat counter */}
      <div className="flex gap-2 mb-3">
        {Array.from({ length: drill.repeatTarget }).map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < repeatCount ? 'bg-amber-600' : 'bg-amber-100'}`} />
        ))}
      </div>
      <p className="text-xs text-amber-800/50 text-center mb-4">
        {repeatCount >= drill.repeatTarget ? '🎉 Đủ lần rồi!' : `Đã lặp ${repeatCount}/${drill.repeatTarget} lần`}
      </p>

      {micError && <p className="text-xs text-red-600 text-center mb-3">Không truy cập được mic. Hãy dùng nút "Đọc + đếm" thay thế.</p>}

      {/* Action buttons */}
      {!isDone ? (
        <div className="flex flex-col gap-2">
          {tts && (
            <button onClick={play} disabled={playing}
              className={`w-full py-3 rounded-2xl text-sm font-medium border-2 border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-all ${playing ? 'opacity-60' : ''}`}>
              {playing ? '🔊 Đang phát...' : '🔊 Nghe câu mẫu'}
            </button>
          )}

          {drill.usesMic && microphone ? (
            <button onClick={handleRecord} disabled={recording}
              className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all ${recording ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-700 text-white hover:bg-amber-800'}`}>
              {recording ? '🎤 Đang ghi âm... (2s)' : '🎤 Ghi âm và đếm lần'}
            </button>
          ) : (
            <button onClick={handleRepeat}
              className="w-full py-3 rounded-2xl text-sm font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-all">
              👄 Đọc to + đếm lần
            </button>
          )}

          <button onClick={() => onDone(Math.max(repeatCount, 1))} disabled={!met}
            className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${met ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400'}`}>
            {met ? '✅ Tôi nói được!' : `Cần thêm ${drill.repeatTarget - repeatCount} lần nữa`}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-green-700 font-semibold text-sm">✅ Hoàn thành drill này!</p>
          <button onClick={() => onDone(repeatCount)}
            className="mt-2 text-xs text-green-600/70 underline">Luyện lại</button>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Nhiệm vụ hôm nay
// ─────────────────────────────────────────────────────
function SectionMission({ lesson }: { lesson: Lesson }) {
  const [done, setDone] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-amber-700 text-white rounded-3xl p-6">
        <p className="text-xs font-semibold opacity-70 mb-1 uppercase tracking-widest">🎯 Nhiệm vụ hôm nay</p>
        <h3 className="text-xl font-bold mb-3">{lesson.dailyMission.title}</h3>
        <p className="text-sm opacity-90 leading-relaxed">{lesson.dailyMission.instruction}</p>
      </div>

      <div className="bg-[#FFFDF8] border border-[#E5E0D8] rounded-2xl p-5">
        <p className="text-sm text-amber-800/70 mb-4">
          Nhiệm vụ này <strong>không cần hoàn hảo</strong>. Chỉ cần thử một lần là thành công!
        </p>
        <button onClick={() => setDone(d => !d)}
          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${done ? 'bg-green-100 border-2 border-green-400 text-green-700' : 'bg-amber-700 text-white hover:bg-amber-800'}`}>
          {done ? '✅ Tôi đã làm được nhiệm vụ này!' : 'Đánh dấu đã thực hiện'}
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Section: Quiz
// ─────────────────────────────────────────────────────
function SectionQuiz({ lesson, onComplete }: { lesson: Lesson; onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function handleAnswer(qId: string, answer: string) {
    if (submitted) return
    setAnswers(a => ({ ...a, [qId]: answer }))
  }

  function handleSubmit() {
    if (Object.keys(answers).length < lesson.quiz.length) return
    setSubmitted(true)
    const correct = lesson.quiz.filter(q => answers[q.id] === q.answer).length
    onComplete(correct)
  }

  const score = lesson.quiz.filter(q => answers[q.id] === q.answer).length

  if (submitted) return (
    <div className="flex flex-col items-center py-8 text-center gap-4">
      <div className="text-6xl">{score === lesson.quiz.length ? '🎉' : score >= lesson.quiz.length / 2 ? '👍' : '💪'}</div>
      <h3 className="text-2xl font-bold text-amber-950">Kết quả</h3>
      <p className="text-5xl font-bold text-amber-700">{score}/{lesson.quiz.length}</p>
      <p className="text-amber-800/60 text-sm">
        {score === lesson.quiz.length ? 'Xuất sắc! Bạn nắm vững bài này rồi!' : 'Tiếp tục cố gắng, bạn làm tốt lắm!'}
      </p>
      <Link href="/hoc-tieng-trung/bai-hoc"
        className="mt-4 bg-amber-700 text-white font-semibold rounded-xl px-8 py-3 hover:bg-amber-800 transition-colors text-sm">
        Xem bài học khác →
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-amber-800/60">Kiểm tra nhanh — chọn đáp án đúng.</p>
      {lesson.quiz.map((q, i) => (
        <QuizCard key={q.id} q={q} index={i} selected={answers[q.id]} onAnswer={(a) => handleAnswer(q.id, a)} />
      ))}
      <button onClick={handleSubmit}
        disabled={Object.keys(answers).length < lesson.quiz.length}
        className="w-full py-4 rounded-2xl bg-amber-700 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-800 transition-colors">
        Nộp bài ({Object.keys(answers).length}/{lesson.quiz.length})
      </button>
    </div>
  )
}

function QuizCard({ q, index, selected, onAnswer }: {
  q: QuizItem; index: number; selected: string | undefined; onAnswer: (a: string) => void
}) {
  return (
    <div className="bg-[#FFFDF8] border border-[#E5E0D8] rounded-2xl p-4">
      <p className="text-sm font-semibold text-amber-950 mb-3">
        <span className="text-amber-600">{index + 1}. </span>{q.question}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {q.options?.map(opt => (
          <button key={opt} onClick={() => onAnswer(opt)}
            className={`py-3 px-3 rounded-xl text-sm font-medium border-2 transition-all active:scale-95 ${selected === opt ? 'bg-amber-700 text-white border-amber-700' : 'bg-[#F8F5EF] border-[#E5E0D8] text-amber-950 hover:border-amber-400'}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
