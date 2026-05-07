'use client'

import { useState, useEffect, useCallback } from 'react'
import { Word } from './storage'
import { checkSupport } from './toneDetector'
import { playChineseAudio, preloadVoices } from './audio'

interface Props {
  vocabulary: Word[]
  onComplete: (score: { correct: number; total: number }) => void
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildQuestion(word: Word, allWords: Word[]) {
  // 3 wrong options + 1 correct
  const others = shuffle(allWords.filter(w => w.id !== word.id)).slice(0, 3)
  const options = shuffle([word, ...others])
  return { word, options }
}

export default function ListeningMode({ vocabulary, onComplete }: Props) {
  const [deck, setDeck]           = useState<Word[]>([])
  const [index, setIndex]         = useState(0)
  const [selected, setSelected]   = useState<string | null>(null)
  const [score, setScore]         = useState(0)
  const [done, setDone]           = useState(false)
  const [playing, setPlaying]     = useState(false)
  const { tts }                   = checkSupport()

  useEffect(() => {
    if (vocabulary.length >= 4) setDeck(shuffle(vocabulary).slice(0, 10))
    preloadVoices() // Kick off voice loading early so getVoices() is ready when user taps Play
  }, [vocabulary])

  const current = deck[index] ? buildQuestion(deck[index], vocabulary) : null

  const playWord = useCallback(() => {
    if (!current) return
    setPlaying(true)
    playChineseAudio(current.word.chinese, {
      onEnd:  () => setPlaying(false),
      onError: () => setPlaying(false),
    })
  }, [current])

  // No auto-play — user must press the button (auto-play breaks on tab switch + blocked without user gesture)

  function handleSelect(wordId: string) {
    if (selected) return
    setSelected(wordId)
    const isCorrect = wordId === current?.word.id
    if (isCorrect) setScore(s => s + 1)
    setTimeout(() => {
      if (index + 1 >= deck.length) {
        setDone(true)
        onComplete({ correct: isCorrect ? score + 1 : score, total: deck.length })
      } else {
        setIndex(i => i + 1)
        setSelected(null)
      }
    }, 1000)
  }

  if (!tts) return (
    <div className="flex flex-col items-center py-16 text-center px-6">
      <div className="text-4xl mb-3">🔇</div>
      <p className="text-amber-800/60 text-sm">Trình duyệt của bạn không hỗ trợ phát âm tự động.<br />Hãy thử Chrome hoặc Edge.</p>
    </div>
  )

  if (vocabulary.length < 4) return (
    <div className="flex flex-col items-center py-16 text-center px-6">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-amber-800/60 text-sm">Cần ít nhất 4 từ trong từ điển để chơi chế độ này.</p>
    </div>
  )

  if (done || !current) return (
    <div className="flex flex-col items-center py-20 text-center px-6">
      <div className="text-6xl mb-4">{score >= deck.length * 0.8 ? '🎉' : '📚'}</div>
      <h2 className="text-2xl font-bold text-amber-950 mb-2">Kết quả</h2>
      <p className="text-5xl font-bold text-amber-700 mb-1">{score}/{deck.length}</p>
      <p className="text-amber-800/60 mb-8">
        {score >= deck.length * 0.8 ? 'Xuất sắc! Tai nghe rất tốt.' : 'Hãy nghe nhiều hơn và thử lại!'}
      </p>
      <button onClick={() => { setIndex(0); setSelected(null); setScore(0); setDone(false); setDeck(shuffle(vocabulary).slice(0, 10)) }}
        className="bg-amber-700 text-white font-semibold rounded-xl px-8 py-3 hover:bg-amber-800 transition-colors">
        Thử lại
      </button>
    </div>
  )

  const total = deck.length

  return (
    <div className="flex flex-col min-h-[70vh] p-4 pb-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-amber-800/50 mb-1.5">
          <span>Câu {index + 1} / {total}</span>
          <span>✓ {score} đúng</span>
        </div>
        <div className="h-1.5 bg-amber-100 rounded-full">
          <div className="h-full bg-amber-600 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center">
        <p className="text-amber-800/60 text-sm mb-6">Nhấn ▶ để nghe, rồi chọn nghĩa đúng</p>

        {/* Play button */}
        <button onClick={playWord}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-lg mb-8 transition-all active:scale-95 ${playing ? 'bg-amber-600 scale-105' : 'bg-amber-700 hover:bg-amber-800'} text-white`}>
          <span className="text-4xl mb-1">{playing ? '🔊' : '▶'}</span>
          <span className="text-xs opacity-80">{playing ? 'Đang phát...' : 'Nghe'}</span>
        </button>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {current.options.map(opt => {
            let style = 'bg-[#FFFDF8] border-[#E5E0D8] text-amber-950'
            if (selected) {
              if (opt.id === current.word.id) style = 'bg-green-50 border-green-400 text-green-800'
              else if (opt.id === selected) style = 'bg-red-50 border-red-400 text-red-700'
              else style = 'bg-gray-50 border-gray-200 text-gray-400'
            }
            return (
              <button key={opt.id} onClick={() => handleSelect(opt.id)} disabled={!!selected}
                className={`border-2 rounded-2xl p-4 text-sm font-medium text-center transition-all active:scale-95 ${style}`}>
                {opt.meaning}
              </button>
            )
          })}
        </div>

        {/* Reveal after answer */}
        {selected && (
          <div className="mt-6 text-center">
            <p className="text-3xl font-bold text-amber-950">{current.word.chinese}</p>
            <p className="text-amber-800/60">{current.word.pinyin}</p>
          </div>
        )}
      </div>
    </div>
  )
}
