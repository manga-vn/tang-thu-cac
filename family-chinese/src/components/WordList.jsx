import { useState } from 'react'
import { speakChinese } from '../utils/speechPractice'

export default function WordList({ vocabulary, allTags, onDelete, isAdmin, getWordStatus }) {
  const [query, setQuery]     = useState('')
  const [activeTag, setTag]   = useState('')
  const [showMeaning, setShow] = useState(true)
  const [confirmId, setConfirm] = useState(null)

  const q = query.toLowerCase()
  const filtered = vocabulary.filter(w => {
    const matchQ = !q || [w.chinese, w.pinyin, w.meaning, w.example].some(f => f?.toLowerCase().includes(q))
    const matchT = !activeTag || w.tags?.includes(activeTag)
    return matchQ && matchT
  })

  function handleDelete(id) {
    if (confirmId === id) {
      onDelete(id)
      setConfirm(null)
    } else {
      setConfirm(id)
      setTimeout(() => setConfirm(null), 3000)
    }
  }

  return (
    <div className="p-4 pb-28">
      <div className="flex items-center justify-between pt-2 mb-4">
        <h2 className="text-lg font-bold text-gray-800">📖 Từ vựng ({vocabulary.length})</h2>
        <button
          onClick={() => setShow(s => !s)}
          className="text-xs text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:text-gray-600"
        >
          {showMeaning ? 'Ẩn nghĩa' : 'Hiện nghĩa'}
        </button>
      </div>

      {/* Search */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Tìm chữ Trung, pinyin, nghĩa..."
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 mb-3"
      />

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
          <TagBtn label="Tất cả" active={!activeTag} onClick={() => setTag('')} />
          {allTags.map(t => (
            <TagBtn key={t} label={t} active={activeTag === t} onClick={() => setTag(activeTag === t ? '' : t)} />
          ))}
        </div>
      )}

      {/* Word list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">Không tìm thấy từ nào.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map(w => {
            const status = getWordStatus(w.id)
            return (
              <div key={w.id} className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm flex items-start gap-3">
                {/* Status dot */}
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  status === 'remembered' ? 'bg-green-400' :
                  status === 'not_yet'    ? 'bg-amber-400' : 'bg-gray-200'
                }`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xl font-bold text-gray-800">{w.chinese}</span>
                    <span className="text-sm text-gray-400">{w.pinyin}</span>
                  </div>
                  {showMeaning && (
                    <p className="text-sm text-gray-600 mt-0.5">{w.meaning}</p>
                  )}
                  {showMeaning && w.example && (
                    <p className="text-xs text-gray-400 mt-1 italic">{w.example}</p>
                  )}
                  {w.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {w.tags.map(t => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => speakChinese(w.example || w.phrase || w.chinese)}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center active:scale-95"
                  aria-label={`Nghe phát âm ${w.pinyin || w.chinese}`}
                >
                  🔊
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(w.id)}
                    className={`flex-shrink-0 text-xs px-2 py-1 rounded-lg transition-colors ${
                      confirmId === w.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-red-400'
                    }`}
                  >
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

function TagBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3 py-1 rounded-full text-xs border transition-colors whitespace-nowrap
        ${active ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-500 border-gray-200 hover:border-red-300'}`}
    >
      {label}
    </button>
  )
}
