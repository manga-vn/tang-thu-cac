'use client'

import { useState, useEffect, useCallback } from 'react'
import { Word } from './storage'
import { speakChinese, recordAndAnalyzeTone, ToneResult, checkSupport } from './toneDetector'

interface Props {
  vocabulary: Word[]
  onComplete: (score: { correct: number; total: number }) => void
}

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5) }

type Phase = 'ready' | 'listen' | 'recording' | 'result'

const TONE_NAMES: Record<number, string> = {
  1: 'Thanh 1 — Ngang (ˉ) cao đều',
  2: 'Thanh 2 — Sắc (ˊ) lên cao',
  3: 'Thanh 3 — Hỏi (ˇ) xuống rồi lên',
  4: 'Thanh 4 — Nặng (ˋ) xuống mạnh',
  0: 'Nhẹ (không có thanh)',
}

const TONE_COLORS: Record<number, string> = {
  1: 'text-blue-600', 2: 'text-green-600', 3: 'text-purple-600', 4: 'text-red-600', 0: 'text-gray-500'
}

const CONTOUR_PATHS: Record<number, string> = {
  1: 'M 10 20 L 90 20',                            // ngang
  2: 'M 10 50 L 90 10',                            // lên
  3: 'M 10 25 Q 50 70 90 25',                      // xuống rồi lên
  4: 'M 10 10 L 90 55',                            // xuống
  0: 'M 10 35 L 90 35',
}

export default function SpeakingMode({ vocabulary, onComplete }: Props) {
  const [deck, setDeck]         = useState<Word[]>([])
  const [index, setIndex]       = useState(0)
  const [phase, setPhase]       = useState<Phase>('ready')
  const [result, setResult]     = useState<ToneResult | null>(null)
  const [score, setScore]       = useState(0)
  const [done, setDone]         = useState(false)
  const [micError, setMicError] = useState(false)
  const { tts, microphone }     = checkSupport()

  useEffect(() => {
    if (vocabulary.length > 0) setDeck(shuffle(vocabulary).slice(0, 8))
  }, [vocabulary])

  const current = deck[index]

  async function handleRecord() {
    if (!microphone) { setMicError(true); return }
    setPhase('recording')
    try {
      const r = await recordAndAnalyzeTone(2000)
      setResult(r)
      setPhase('result')
      const expectedTone = current.tone || 0
      // Count as correct if detected tone matches expected AND confidence > 0.55
      const isCorrect = r.detected === expectedTone && r.confidence >= 0.55
      if (isCorrect) setScore(s => s + 1)
    } catch {
      setMicError(true)
      setPhase('ready')
    }
  }

  function handleNext() {
    if (index + 1 >= deck.length) {
      setDone(true)
      onComplete({ correct: score, total: deck.length })
    } else {
      setIndex(i => i + 1)
      setPhase('ready')
      setResult(null)
    }
  }

  function playCurrentWord() {
    if (current) { speakChinese(current.chinese, 0.75); setPhase('listen') }
    setTimeout(() => setPhase('ready'), 1500)
  }

  if (done || !current) return (
    <div className="flex flex-col items-center py-20 text-center px-6">
      <div className="text-6xl mb-4">{score >= deck.length * 0.7 ? '🎤' : '💪'}</div>
      <h2 className="text-2xl font-bold text-amber-950 mb-2">Kết quả phát âm</h2>
      <p className="text-5xl font-bold text-amber-700 mb-1">{score}/{deck.length}</p>
      <p className="text-amber-800/60 mb-8">
        {score >= deck.length * 0.7 ? 'Phát âm rất tốt!' : 'Tiếp tục luyện, thanh điệu cần thêm thời gian!'}
      </p>
      <button onClick={() => { setIndex(0); setPhase('ready'); setResult(null); setScore(0); setDone(false); setDeck(shuffle(vocabulary).slice(0, 8)) }}
        className="bg-amber-700 text-white font-semibold rounded-xl px-8 py-3 hover:bg-amber-800">
        Thử lại
      </button>
    </div>
  )

  const expectedTone = current.tone || 0
  const isCorrect = result && result.detected === expectedTone && result.confidence >= 0.55

  return (
    <div className="flex flex-col min-h-[70vh] p-4 pb-8">
      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-amber-800/50 mb-1.5">
          <span>Từ {index + 1} / {deck.length}</span>
          <span>✓ {score} đúng</span>
        </div>
        <div className="h-1.5 bg-amber-100 rounded-full">
          <div className="h-full bg-amber-600 rounded-full transition-all" style={{ width: `${(index / deck.length) * 100}%` }} />
        </div>
      </div>

      {/* Word card */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#E5E0D8] p-8 text-center mb-6 shadow-sm">
        <p className="text-6xl font-bold text-amber-950 mb-2">{current.chinese}</p>
        <p className="text-lg text-amber-800/60">{current.pinyin}</p>
        <p className="text-sm text-amber-800/50 mt-1">{current.meaning}</p>
        <div className="mt-3 inline-block bg-amber-100 rounded-full px-3 py-1">
          <span className={`text-xs font-semibold ${TONE_COLORS[expectedTone]}`}>{TONE_NAMES[expectedTone]}</span>
        </div>

        {/* Tone contour diagram */}
        <div className="mt-4 flex justify-center">
          <svg width="100" height="60" viewBox="0 0 100 60">
            <path d={CONTOUR_PATHS[expectedTone]} stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Mic error */}
      {micError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 text-center mb-4">
          Không thể truy cập microphone. Hãy cấp quyền trong trình duyệt.
        </div>
      )}

      {/* Result */}
      {phase === 'result' && result && (
        <div className={`rounded-2xl p-4 mb-4 text-center border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-lg font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '✓ Đúng thanh!' : '✗ Sai thanh'}
          </p>
          <p className="text-sm text-amber-800/70">
            Phát hiện: <span className={`font-semibold ${TONE_COLORS[result.detected]}`}>{result.label}</span>
          </p>
          <p className="text-xs text-amber-800/40 mt-1">Độ chắc: {Math.round(result.confidence * 100)}%</p>
          {!isCorrect && (
            <p className="text-xs text-amber-800/60 mt-2">
              Cần: <span className={`font-semibold ${TONE_COLORS[expectedTone]}`}>{TONE_NAMES[expectedTone]}</span>
            </p>
          )}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-auto">
        {phase !== 'result' ? (
          <>
            <button onClick={playCurrentWord}
              className="w-full border-2 border-amber-200 bg-amber-50 text-amber-800 font-medium rounded-2xl py-3 text-sm hover:bg-amber-100 transition-colors">
              {phase === 'listen' ? '🔊 Đang phát...' : '🔊 Nghe mẫu trước'}
            </button>
            <button onClick={handleRecord} disabled={phase === 'recording' || phase === 'listen'}
              className={`w-full font-semibold rounded-2xl py-4 text-base transition-all active:scale-95 ${
                phase === 'recording'
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-amber-700 text-white hover:bg-amber-800'
              }`}>
              {phase === 'recording' ? '🎤 Đang ghi âm... (2 giây)' : '🎤 Đọc to từ này'}
            </button>
          </>
        ) : (
          <button onClick={handleNext}
            className="w-full bg-amber-700 text-white font-semibold rounded-2xl py-4 text-base hover:bg-amber-800 transition-colors">
            Từ tiếp theo →
          </button>
        )}
      </div>
    </div>
  )
}
