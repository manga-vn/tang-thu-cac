'use client'

import { useState, useMemo } from 'react'
import { Word, ProgressMap, markWord, todayStr } from './storage'

interface Props {
  vocabulary: Word[]
  progress: ProgressMap
  scope: string
  userId: string
  onProgressUpdate: () => void
  profileLabel: string
}

export default function Flashcard({ vocabulary, progress, scope, userId, onProgressUpdate, profileLabel }: Props) {
  const deck = useMemo(() => {
    const unseen    = vocabulary.filter(w => !progress[w.id])
    const notYet    = vocabulary.filter(w => progress[w.id]?.status === 'not_yet')
    const remembered = vocabulary.filter(w => progress[w.id]?.status === 'remembered')
    return [...unseen, ...notYet, ...remembered]
  }, [vocabulary, progress])

  const [index, setIndex]  = useState(0)
  const [flipped, setFlip] = useState(false)
  const [done, setDone]    = useState(false)
  const [stats, setStats]  = useState({ remembered: 0, notYet: 0 })

  if (vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-amber-800/60">Chưa có từ nào để ôn.</p>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-amber-950 mb-2">Xong rồi!</h2>
        <p className="text-amber-800/60 mb-8">Bài ôn của {profileLabel}</p>
        <div className="flex gap-8 mb-8">
          <StatBig value={stats.remembered} label="Nhớ rồi" color="text-green-600" />
          <StatBig value={stats.notYet}     label="Chưa nhớ" color="text-amber-500" />
        </div>
        <button onClick={() => { setIndex(0); setFlip(false); setDone(false); setStats({ remembered: 0, notYet: 0 }) }}
          className="bg-amber-700 text-white font-semibold rounded-xl px-8 py-3 hover:bg-amber-800 transition-colors">
          Ôn lại từ đầu
        </button>
      </div>
    )
  }

  const word  = deck[index]
  const total = deck.length
  const pct   = Math.round((index / total) * 100)
  const currentStatus = progress[word.id]?.status

  function handleMark(status: 'remembered' | 'not_yet') {
    markWord(scope, userId, word.id, status)
    onProgressUpdate()
    setStats(s => ({ ...s, [status === 'remembered' ? 'remembered' : 'notYet']: s[status === 'remembered' ? 'remembered' : 'notYet'] + 1 }))
    if (index + 1 >= total) setDone(true)
    else { setIndex(i => i + 1); setFlip(false) }
  }

  function handleSkip() {
    if (index + 1 >= total) setDone(true)
    else { setIndex(i => i + 1); setFlip(false) }
  }

  return (
    <div className="flex flex-col min-h-[70vh]">
      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between text-xs text-amber-800/50 mb-1.5">
          <span>{index + 1} / {total}</span>
          <span>{profileLabel} đang ôn</span>
        </div>
        <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
          <div className="h-full bg-amber-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <div className="w-full max-w-sm" style={{ perspective: '1000px' }}>
          <div
            onClick={() => setFlip(f => !f)}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.45s ease', transform: flipped ? 'rotateY(180deg)' : 'none', height: 260, position: 'relative', cursor: 'pointer' }}
          >
            {/* Front */}
            <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
              className="bg-[#FFFDF8] rounded-3xl shadow border border-[#E5E0D8] flex flex-col items-center justify-center p-8">
              <p className="text-6xl font-bold text-amber-950">{word.chinese}</p>
              {!flipped && <p className="text-sm text-amber-800/30 mt-4">Nhấn để xem nghĩa</p>}
            </div>
            {/* Back */}
            <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}
              className="bg-amber-700 rounded-3xl shadow flex flex-col items-center justify-center p-8 text-white">
              <p className="text-2xl font-semibold mb-1">{word.meaning}</p>
              <p className="text-lg opacity-80 mb-2">{word.pinyin}</p>
              {word.example && <p className="text-xs opacity-60 italic mt-3 border-t border-white/20 pt-3">{word.example}</p>}
              {word.source && <p className="text-xs opacity-40 mt-2">📖 {word.source}</p>}
            </div>
          </div>
        </div>

        {currentStatus && (
          <div className={`mt-3 text-xs px-3 py-1 rounded-full ${currentStatus === 'remembered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {currentStatus === 'remembered' ? '✓ Đã nhớ trước đó' : '↻ Chưa nhớ trước đó'}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="px-6 pb-6">
        {flipped ? (
          <div className="flex gap-3">
            <button onClick={() => handleMark('not_yet')}
              className="flex-1 bg-amber-50 border-2 border-amber-300 text-amber-800 font-semibold rounded-2xl py-4 active:scale-95 transition-all">
              😅 Chưa nhớ
            </button>
            <button onClick={() => handleMark('remembered')}
              className="flex-1 bg-green-50 border-2 border-green-400 text-green-800 font-semibold rounded-2xl py-4 active:scale-95 transition-all">
              ✓ Nhớ rồi!
            </button>
          </div>
        ) : (
          <button onClick={() => setFlip(true)}
            className="w-full bg-amber-800 text-white font-semibold rounded-2xl py-4 hover:bg-amber-900 transition-colors">
            Lật thẻ →
          </button>
        )}
        <button onClick={handleSkip} className="w-full mt-2 text-amber-800/40 text-sm py-2 hover:text-amber-800/60">
          Bỏ qua
        </button>
      </div>
    </div>
  )
}

function StatBig({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-4xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-amber-800/60 mt-1">{label}</div>
    </div>
  )
}
