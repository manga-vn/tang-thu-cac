'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getVocabulary, saveVocabulary, addWordToScope, deleteWordFromScope,
  getProgress, markWord as markWordInStorage, ProgressMap,
  getPublicNickname, setPublicNickname, Word, todayStr
} from './storage'
import Flashcard from './Flashcard'
import WordList from './WordList'
import WordForm from './WordForm'

type Tab = 'flashcard' | 'wordlist' | 'addword'

function getScope(nickname: string) { return `public_${nickname}` }

export default function PublicApp() {
  const [nickname, setNickname]   = useState<string | null>(null)
  const [nameInput, setNameInput] = useState('')
  const [tab, setTab]             = useState<Tab>('flashcard')
  const [vocabulary, setVoc]      = useState<Word[]>([])
  const [progress, setProgress]   = useState<ProgressMap>({})
  const [tick, setTick]           = useState(0)

  useEffect(() => {
    const saved = getPublicNickname()
    if (saved) { setNickname(saved); loadData(saved) }
  }, [])

  function loadData(name: string) {
    setVoc(getVocabulary(getScope(name)))
    setProgress(getProgress(getScope(name), name))
  }

  function handleSetNickname(e: React.FormEvent) {
    e.preventDefault()
    const name = nameInput.trim()
    if (!name) return
    setPublicNickname(name)
    setNickname(name)
    loadData(name)
  }

  function handleAdd(form: { chinese: string; pinyin: string; meaning: string; example: string; tags: string[] }) {
    if (!nickname) return
    addWordToScope(getScope(nickname), { ...form, addedBy: nickname })
    loadData(nickname)
  }

  function handleDelete(id: string) {
    if (!nickname) return
    deleteWordFromScope(getScope(nickname), id)
    loadData(nickname)
  }

  function handleProgressUpdate() {
    if (!nickname) return
    setProgress(getProgress(getScope(nickname), nickname))
    setTick(t => t + 1)
  }

  const allTags = [...new Set(vocabulary.flatMap(w => w.tags || []))].sort()

  // --- Nickname prompt ---
  if (!nickname) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="text-5xl mb-4">🀄</div>
        <h2 className="text-xl font-bold text-amber-950 mb-2">Học Tiếng Trung</h2>
        <p className="text-amber-800/60 text-sm mb-6 text-center">Nhập tên hoặc nickname của bạn để bắt đầu. Dữ liệu lưu trên trình duyệt này.</p>
        <form onSubmit={handleSetNickname} className="w-full max-w-xs flex flex-col gap-3">
          <input value={nameInput} onChange={e => setNameInput(e.target.value)}
            placeholder="Tên của bạn..." autoFocus
            className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-amber-950 bg-[#FFFDF8] focus:outline-none focus:border-amber-500 text-center" />
          <button type="submit"
            className="bg-amber-700 text-white font-semibold rounded-xl py-3 hover:bg-amber-800 transition-colors">
            Bắt đầu →
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#F8F5EF]">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-amber-950">Học Tiếng Trung</h1>
          <p className="text-xs text-amber-800/50">Xin chào, {nickname} · {vocabulary.length} từ</p>
        </div>
        <button onClick={() => { setPublicNickname(''); setNickname(null) }}
          className="text-xs text-amber-800/40 hover:text-amber-800 border border-[#E5E0D8] rounded-lg px-3 py-1.5">
          Đổi tên
        </button>
      </div>

      {/* Tab nav */}
      <div className="flex border-b border-[#E5E0D8] bg-[#FFFDF8] mx-4 rounded-xl overflow-hidden mb-4">
        {(['flashcard', 'wordlist', 'addword'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${tab === t ? 'bg-amber-700 text-white' : 'text-amber-800/60 hover:text-amber-800'}`}>
            {t === 'flashcard' ? '🃏 Ôn bài' : t === 'wordlist' ? '📖 Từ vựng' : '➕ Thêm'}
          </button>
        ))}
      </div>

      {tab === 'flashcard' && (
        <Flashcard vocabulary={vocabulary} progress={progress}
          scope={getScope(nickname)} userId={nickname}
          onProgressUpdate={handleProgressUpdate} profileLabel={nickname} />
      )}
      {tab === 'wordlist' && (
        <WordList vocabulary={vocabulary} allTags={allTags}
          onDelete={handleDelete} canDelete progress={progress} />
      )}
      {tab === 'addword' && (
        <WordForm onAdd={handleAdd} existingTags={allTags} />
      )}
    </div>
  )
}
