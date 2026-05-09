import { useMemo, useState } from 'react'
import { dailyLessonStages, getDailyStudyPlan, getItemPracticeGoals, learningRoadmap } from '../data/dailyLessons'
import {
  getScoreFeedback,
  getSpeechRecognitionConstructor,
  scoreSpeechMatch,
  speakChinese,
} from '../utils/speechPractice'

const feedbackTone = {
  green: 'bg-green-50 border-green-200 text-green-700',
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
}

const lessonTypeLabel = {
  new: 'Mới',
  review: 'Ôn',
  expansion: 'Mở rộng',
  travel: 'Du lịch',
}

const viewTabs = [
  { id: 'today', label: 'Hôm nay' },
  { id: 'practice', label: 'Luyện câu' },
  { id: 'roadmap', label: 'Lộ trình' },
]

export default function DailyLessons({ onBack }) {
  const dailyPlan = useMemo(() => getDailyStudyPlan(), [])
  const [view, setView] = useState('today')
  const [planDayIndex, setPlanDayIndex] = useState(0)
  const [stageId, setStageId] = useState(dailyLessonStages[0].id)
  const [itemIndex, setItemIndex] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [practice, setPractice] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)

  const stage = useMemo(
    () => dailyLessonStages.find((item) => item.id === stageId) || dailyLessonStages[0],
    [stageId],
  )
  const practiceItems = activeLesson?.items || stage.items
  const current = practiceItems[itemIndex] || practiceItems[0]
  const currentGoals = getItemPracticeGoals(current)
  const selectedDay = dailyPlan[planDayIndex]
  const progress = Math.round(((itemIndex + 1) / practiceItems.length) * 100)

  function startSelectedDay() {
    setStageId(selectedDay.stageId)
    setActiveLesson(selectedDay)
    setItemIndex(0)
    setPractice(null)
    setView('practice')
  }

  function movePlanDay(direction) {
    setPlanDayIndex((index) => Math.max(0, Math.min(dailyPlan.length - 1, index + direction)))
  }

  function chooseStage(nextStageId) {
    setStageId(nextStageId)
    setActiveLesson(null)
    setItemIndex(0)
    setPractice(null)
    setView('practice')
  }

  function chooseItem(index) {
    setItemIndex(index)
    setPractice(null)
  }

  function nextItem() {
    setItemIndex((index) => (index + 1) % practiceItems.length)
    setPractice(null)
  }

  function startPractice() {
    const Recognition = getSpeechRecognitionConstructor()
    if (!Recognition) {
      setPractice({
        score: 0,
        transcript: '',
        feedback: {
          label: 'Trình duyệt chưa hỗ trợ',
          message: 'Có thể dùng Chrome/Edge để bật nhận diện giọng nói.',
          tone: 'amber',
        },
      })
      return
    }

    const recognition = new Recognition()
    recognition.lang = 'zh-CN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setPractice(null)
    }

    recognition.onerror = () => {
      setPractice({
        score: 0,
        transcript: '',
        feedback: {
          label: 'Chưa nghe rõ',
          message: 'Kiểm tra quyền micro rồi thử đọc lại chậm hơn.',
          tone: 'amber',
        },
      })
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || ''
      const score = scoreSpeechMatch(transcript, {
        chinese: current.phrase,
        pinyin: current.phrasePinyin,
      })
      setPractice({ score, transcript, feedback: getScoreFeedback(score) })
    }

    recognition.onend = () => setIsListening(false)
    recognition.start()
  }

  return (
    <div className="p-4 pb-28">
      <header className="pt-2 mb-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 active:scale-95"
          >
            ← Hôm nay
          </button>
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
            Ngày {selectedDay.day}/{dailyPlan.length}
          </span>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mt-4">Một ngày tiếng Trung</h2>
        <p className="text-sm text-gray-500 mt-1">Pinyin và audio là chính. Chữ Hán chỉ để tham khảo.</p>
      </header>

      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-gray-100 p-1 mb-4">
        {viewTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`rounded-xl py-2 text-xs font-bold transition-colors ${
              view === tab.id ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === 'today' && (
        <section className="bg-red-600 rounded-3xl p-5 text-white shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-white/70">Bài 30 phút hôm nay</p>
              <h3 className="text-2xl font-black mt-1">{selectedDay.title}</h3>
              <p className="text-sm text-white/85 mt-2">{selectedDay.focus}</p>
            </div>
            <span className="bg-white/15 text-xs font-bold rounded-full px-3 py-1">
              {selectedDay.day}/{dailyPlan.length}
            </span>
          </div>

          <div className="grid gap-2 mt-4">
            {selectedDay.items.map((item, index) => (
              <div key={item.id} className="rounded-2xl bg-white/10 border border-white/10 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black text-lg">{item.phrasePinyin}</p>
                    <p className="text-sm text-white/80">{item.phraseMeaning}</p>
                  </div>
                  <span className="text-xs font-bold text-white/70">
                    {lessonTypeLabel[selectedDay.type] || 'Mới'} {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white/10 border border-white/10 p-3 mt-4">
            <h4 className="font-bold text-sm mb-2">Đạt tối thiểu trong ngày</h4>
            <div className="grid gap-1">
              {selectedDay.minimumGoals.map((goal) => (
                <div key={goal} className="text-xs text-white/80">✓ {goal}</div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr_auto] gap-2 mt-4">
            <button
              onClick={() => movePlanDay(-1)}
              disabled={planDayIndex === 0}
              className="rounded-2xl bg-white/10 px-4 py-3 font-bold disabled:opacity-40 active:scale-95"
            >
              Trước
            </button>
            <button
              onClick={startSelectedDay}
              className="rounded-2xl bg-white text-red-600 px-4 py-3 font-black active:scale-95"
            >
              Học bài hôm nay
            </button>
            <button
              onClick={() => movePlanDay(1)}
              disabled={planDayIndex === dailyPlan.length - 1}
              className="rounded-2xl bg-white/10 px-4 py-3 font-bold disabled:opacity-40 active:scale-95"
            >
              Sau
            </button>
          </div>
        </section>
      )}

      {view === 'practice' && (
        <div className="grid gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {dailyLessonStages.map((item) => (
              <button
                key={item.id}
                onClick={() => chooseStage(item.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  item.id === stage.id
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-gray-400">{activeLesson?.focus || stage.focus}</p>
                <h3 className="text-xl font-black text-gray-900 mt-1">{activeLesson?.title || stage.title}</h3>
              </div>
              <span className="text-xs font-semibold text-red-600 bg-red-50 rounded-full px-3 py-1">
                {itemIndex + 1}/{practiceItems.length}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-gray-100 shadow-lg p-5">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase">Tình huống</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{current.cue}</p>
            </div>

            <div className="mt-5 bg-gray-50 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-3xl font-black text-gray-900">{current.phrasePinyin}</p>
                  <p className="text-base text-gray-500 mt-1">{current.phraseMeaning}</p>
                </div>
                <AudioButtons text={current.phrase} />
              </div>
              <details className="mt-3 text-sm text-gray-500">
                <summary className="cursor-pointer">Xem chữ Hán nếu muốn</summary>
                <p className="text-2xl font-bold text-gray-800 mt-2">{current.phrase}</p>
              </details>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <h4 className="font-black text-amber-900 mb-2">Sau câu này cần làm được</h4>
              <div className="grid gap-2">
                {currentGoals.map((goal) => (
                  <div key={goal} className="flex gap-2 text-sm text-amber-800">
                    <span className="font-black">✓</span>
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-3">
                <p className="text-xs font-bold text-red-700 mb-2">Nghe từ đơn</p>
                <AudioButtons text={current.chinese} compact />
              </div>
              <button
                onClick={startPractice}
                disabled={isListening}
                className="bg-gray-900 text-white rounded-2xl py-3 font-bold active:scale-95 disabled:opacity-60"
              >
                {isListening ? 'Đang nghe...' : 'Nói lại'}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto] gap-3 items-center bg-red-50 rounded-2xl p-4">
              <div>
                <p className="text-2xl font-black text-gray-900">{current.pinyin}</p>
                <p className="text-sm text-gray-600">{current.meaning}</p>
              </div>
              <p className="text-3xl font-black text-red-600">{current.chinese}</p>
            </div>

            {practice && (
              <div className={`mt-4 rounded-2xl border p-4 ${feedbackTone[practice.feedback.tone]}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{practice.feedback.label}</p>
                  <span className="font-black">{practice.score} điểm</span>
                </div>
                {practice.transcript && (
                  <p className="text-xs mt-2 opacity-80">Máy nghe được: {practice.transcript}</p>
                )}
                <p className="text-sm mt-2">{practice.feedback.message}</p>
              </div>
            )}

            <div className="grid grid-cols-[1fr_auto] gap-3 mt-4">
              <button
                onClick={nextItem}
                className="bg-red-600 hover:bg-red-700 text-white rounded-2xl py-3 font-bold active:scale-95"
              >
                Câu tiếp theo
              </button>
              <button
                onClick={() => setView('today')}
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-500 active:scale-95"
              >
                Bài hôm nay
              </button>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-bold text-gray-800 mb-3">Các câu trong bài</h3>
            <div className="grid grid-cols-2 gap-2">
              {practiceItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => chooseItem(index)}
                  className={`text-left rounded-xl border px-3 py-3 transition-colors ${
                    index === itemIndex
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <p className="font-bold text-gray-900 truncate">{item.phrasePinyin}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.phraseMeaning}</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {view === 'roadmap' && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-black text-gray-900 mb-3">Lộ trình 3 tháng</h3>
          <p className="text-sm text-gray-500 mb-4">
            Mỗi ngày 30 phút: 4 mẫu ngắn, nghe audio, nói lại, rồi phản xạ theo tình huống tiếng Việt.
          </p>
          <div className="grid gap-3">
            {learningRoadmap.map((step) => (
              <div key={step.title} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                <h4 className="font-bold text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{step.target}</p>
                <div className="grid gap-1 mt-2">
                  {step.outcomes.map((goal) => (
                    <div key={goal} className="text-xs text-gray-500">✓ {goal}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function AudioButtons({ text, compact = false }) {
  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'min-w-[112px]'}`}>
      <button
        onClick={() => speakChinese(text)}
        className="rounded-full bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 active:scale-95"
        aria-label="Nghe bình thường"
      >
        🔊 Thường
      </button>
      <button
        onClick={() => speakChinese(text, { mode: 'slow' })}
        className="rounded-full bg-amber-100 px-3 py-2 text-xs font-bold text-amber-700 active:scale-95"
        aria-label="Nghe chậm"
      >
        ⏱ Chậm
      </button>
    </div>
  )
}
