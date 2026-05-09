import { useState, useMemo } from 'react'
import { speakChinese } from '../utils/speechPractice'

export default function Flashcard({ vocabulary, getWordStatus, markWord, profile }) {
  // Only show unseen + not_yet words first, then remembered
  const deck = useMemo(() => {
    const unseen   = vocabulary.filter(w => getWordStatus(w.id) === 'unseen')
    const notYet   = vocabulary.filter(w => getWordStatus(w.id) === 'not_yet')
    const remembered = vocabulary.filter(w => getWordStatus(w.id) === 'remembered')
    return [...unseen, ...notYet, ...remembered]
  }, [vocabulary, getWordStatus])

  const [index, setIndex]   = useState(0)
  const [flipped, setFlip]  = useState(false)
  const [done, setDone]     = useState(false)
  const [sessionStats, setStats] = useState({ remembered: 0, notYet: 0 })

  if (vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-500">Chưa có từ nào để ôn.</p>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 pb-24">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Xong rồi!</h2>
        <p className="text-gray-500 mb-6">Bài ôn hôm nay của {profile.label}</p>
        <div className="flex gap-6 mb-8">
          <StatBig value={sessionStats.remembered} label="Nhớ rồi" color="text-green-600" />
          <StatBig value={sessionStats.notYet}     label="Chưa nhớ" color="text-amber-500" />
        </div>
        <button
          onClick={() => { setIndex(0); setFlip(false); setDone(false); setStats({ remembered: 0, notYet: 0 }) }}
          className="bg-red-600 text-white font-semibold rounded-xl px-8 py-3 hover:bg-red-700 transition-colors"
        >
          Ôn lại từ đầu
        </button>
      </div>
    )
  }

  const word = deck[index]
  const total = deck.length
  const progress = Math.round((index / total) * 100)

  function handleMark(status) {
    markWord(word.id, status)
    setStats(s => ({ ...s, [status === 'remembered' ? 'remembered' : 'notYet']: s[status === 'remembered' ? 'remembered' : 'notYet'] + 1 }))
    if (index + 1 >= total) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setFlip(false)
    }
  }

  function handleSpeak(e, text) {
    e.stopPropagation()
    speakChinese(text)
  }

  const currentStatus = getWordStatus(word.id)

  return (
    <div className="flex flex-col min-h-screen pb-28">
      {/* Progress bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>{index + 1} / {total}</span>
          <span>{profile.label} đang ôn</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <div
          className="card-flip w-full max-w-sm cursor-pointer"
          style={{ height: 280 }}
          onClick={() => setFlip(f => !f)}
        >
          <div className={`card-inner ${flipped ? 'flipped' : ''}`} style={{ height: 280 }}>
            {/* Front */}
            <div className="card-front bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <p className="text-6xl font-bold text-gray-800 mb-2">{word.chinese}</p>
              <button
                onClick={(e) => handleSpeak(e, word.chinese)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 border border-red-100 active:scale-95"
                aria-label="Nghe phát âm"
              >
                🔊 Phát âm
              </button>
              {!flipped && <p className="text-sm text-gray-300 mt-4">Nhấn để xem nghĩa</p>}
            </div>

            {/* Back */}
            <div className="card-back bg-red-600 rounded-3xl shadow-lg p-8 text-white">
              <p className="text-2xl font-semibold mb-1">{word.meaning}</p>
              <p className="text-lg opacity-80 mb-2">{word.pinyin}</p>
              {word.example && (
                <p className="text-sm opacity-70 italic mt-3 border-t border-white/20 pt-3">{word.example}</p>
              )}
              <button
                onClick={(e) => handleSpeak(e, word.example || word.chinese)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white border border-white/20 active:scale-95"
                aria-label="Nghe câu mẫu"
              >
                🔊 Nghe mẫu
              </button>
            </div>
          </div>
        </div>

        {/* Status badge */}
        {currentStatus !== 'unseen' && (
          <div className={`mt-3 text-xs px-3 py-1 rounded-full ${
            currentStatus === 'remembered' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
          }`}>
            {currentStatus === 'remembered' ? '✓ Đã nhớ trước đó' : '↻ Chưa nhớ trước đó'}
          </div>
        )}

        {/* Tags */}
        {word.tags?.length > 0 && (
          <div className="flex gap-1 mt-3 flex-wrap justify-center">
            {word.tags.map(t => (
              <span key={t} className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons — only show after flip */}
      <div className="px-6 pb-4">
        {flipped ? (
          <div className="flex gap-3">
            <button
              onClick={() => handleMark('not_yet')}
              className="flex-1 bg-amber-50 border-2 border-amber-300 text-amber-700 font-semibold rounded-2xl py-4 text-base active:scale-95 transition-all"
            >
              😅 Chưa nhớ
            </button>
            <button
              onClick={() => handleMark('remembered')}
              className="flex-1 bg-green-50 border-2 border-green-400 text-green-700 font-semibold rounded-2xl py-4 text-base active:scale-95 transition-all"
            >
              ✓ Nhớ rồi!
            </button>
          </div>
        ) : (
          <button
            onClick={() => setFlip(true)}
            className="w-full bg-gray-800 text-white font-semibold rounded-2xl py-4 text-base hover:bg-gray-700 active:scale-95 transition-all"
          >
            Lật thẻ →
          </button>
        )}

        {/* Skip */}
        <button
          onClick={() => { if (index + 1 >= total) setDone(true); else { setIndex(i => i + 1); setFlip(false) } }}
          className="w-full mt-2 text-gray-400 text-sm py-2 hover:text-gray-600"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  )
}

function StatBig({ value, label, color }) {
  return (
    <div className="text-center">
      <div className={`text-4xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}
