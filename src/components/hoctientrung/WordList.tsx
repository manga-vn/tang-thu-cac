'use client'

import { useState, useMemo } from 'react'
import { Word, ProgressMap } from './storage'
import PronunciationButton from './PronunciationButton'

interface Props {
  vocabulary: Word[]
  allTags: string[]
  onDelete?: (id: string) => void
  canDelete?: boolean
  progress: ProgressMap
}

export default function WordList({ vocabulary, allTags, onDelete, canDelete = false, progress }: Props) {
  const [query, setQuery]      = useState('')
  const [activeTag, setTag]    = useState('')
  const [showMeaning, setShow] = useState(true)
  const [confirmId, setConfirm] = useState<string | null>(null)

  const q = query.toLowerCase()
  const filtered = vocabulary.filter(w => {
    const matchQ = !q || [w.chinese, w.pinyin, w.meaning, w.example].some(f => f?.toLowerCase().includes(q))
    const matchT = !activeTag || w.tags?.includes(activeTag)
    return matchQ && matchT
  })

  function handleDelete(id: string) {
    if (confirmId === id) { onDelete?.(id); setConfirm(null) }
    else { setConfirm(id); setTimeout(() => setConfirm(null), 3000) }
  }

  return (
    <div className="p-4 pb-28">
      <div className="flex items-center justify-between pt-2 mb-4">
        <h2 className="text-lg font-bold text-amber-950">📖 Từ vựng ({vocabulary.length})</h2>
        <button onClick={() => setShow(s => !s)}
          className="text-xs text-amber-800/50 border border-[#E5E0D8] rounded-lg px-3 py-1.5 hover:text-amber-800">
          {showMeaning ? 'Ẩn nghĩa' : 'Hiện nghĩa'}
        </button>
      </div>

      <input value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Tìm chữ Trung, pinyin, nghĩa..."
        className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm bg-[#FFFDF8] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 mb-3 text-amber-950" />

      {allTags.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
          <TagBtn label="Tất cả" active={!activeTag} onClick={() => setTag('')} />
          {allTags.map(t => <TagBtn key={t} label={t} active={activeTag === t} onClick={() => setTag(activeTag === t ? '' : t)} />)}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-amber-800/40 text-sm">Không tìm thấy từ nào.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map(w => {
            const status = progress[w.id]?.status
            return (
              <div key={w.id} className="bg-[#FFFDF8] rounded-xl px-4 py-3 border border-[#E5E0D8] flex items-start gap-3">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${status === 'remembered' ? 'bg-green-400' : status === 'not_yet' ? 'bg-amber-400' : 'bg-gray-200'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xl font-bold text-amber-950">{w.chinese}</span>
                    <span className="text-sm text-amber-800/50">{w.pinyin}</span>
                    <PronunciationButton text={w.chinese} size="sm" />
                  </div>
                  {showMeaning && <p className="text-sm text-amber-800/80 mt-0.5">{w.meaning}</p>}
                  {showMeaning && w.example && <p className="text-xs text-amber-800/40 mt-1 italic">{w.example}</p>}
                  {showMeaning && w.source && <p className="text-xs text-amber-800/30 mt-1">📖 {w.source}</p>}
                  {w.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {w.tags.map(t => <span key={t} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{t}</span>)}
                    </div>
                  )}
                </div>
                {canDelete && onDelete && (
                  <button onClick={() => handleDelete(w.id)}
                    className={`flex-shrink-0 text-xs px-2 py-1 rounded-lg transition-colors ${confirmId === w.id ? 'bg-red-600 text-white' : 'text-amber-800/20 hover:text-red-400'}`}>
                    {confirmId === w.id ? 'Xác nhận' : '✕'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TagBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex-shrink-0 px-3 py-1 rounded-full text-xs border transition-colors whitespace-nowrap ${active ? 'bg-amber-700 text-white border-amber-700' : 'bg-[#FFFDF8] text-amber-800/60 border-[#E5E0D8] hover:border-amber-400'}`}>
      {label}
    </button>
  )
}
