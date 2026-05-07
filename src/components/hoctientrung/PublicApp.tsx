'use client'

import { useState, useEffect } from 'react'
import {
  getVocabulary, addWordToScope, deleteWordFromScope,
  getProgress, ProgressMap,
  getPublicNickname, setPublicNickname, Word
} from './storage'
import { isDue } from './srs'
import { HSK1 } from './hskData'
import Flashcard from './Flashcard'
import WordList from './WordList'
import WordForm from './WordForm'
import ListeningMode from './ListeningMode'
import SpeakingMode from './SpeakingMode'

type Tab = 'flashcard' | 'listen' | 'speak' | 'wordlist' | 'addword'

function getScope(nickname: string) { return `public_${nickname}` }

function hsk1AsWords(): Word[] {
  return HSK1.map((w, i) => ({
    id: `hsk1_${i}`,
    chinese: w.chinese, pinyin: w.pinyin, meaning: w.meaning,
    example: '', tags: w.tags, addedBy: 'hsk1', addedAt: '2026-01-01',
  } as Word))
}

export default function PublicApp() {
  const [nickname, setNickname]   = useState<string | null>(null)
  const [nameInput, setNameInput] = useState('')
  const [tab, setTab]             = useState<Tab>('flashcard')
  const [vocabulary, setVoc]      = useState<Word[]>([])
  const [progress, setProgress]   = useState<ProgressMap>({})

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
    if (nickname) setProgress(getProgress(getScope(nickname), nickname))
  }

  const allTags  = [...new Set(vocabulary.flatMap(w => w.tags || []))].sort()
  const activeVoc = vocabulary.length >= 4 ? vocabulary : hsk1AsWords()
  const dueWords  = activeVoc.filter(w => isDue(progress[w.id] as any))

  // Nickname prompt
  if (!nickname) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="text-5xl mb-4">🀄</div>
        <h2 className="text-xl font-bold text-amber-950 mb-2">Học Tiếng Trung</h2>
        <p className="text-amber-800/60 text-sm mb-6 text-center max-w-xs">
          Nhập tên của bạn để bắt đầu. Dữ liệu lưu trong trình duyệt này, miễn phí, không cần tài khoản.
        </p>
        <form onSubmit={handleSetNickname} className="w-full max-w-xs flex flex-col gap-3">
          <input value={nameInput} onChange={e => setNameInput(e.target.value)}
            placeholder="Tên của bạn..." autoFocus
            className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 text-amber-950 bg-[#FFFDF8] focus:outline-none focus:border-amber-500 text-center" />
          <button type="submit"
            className="bg-amber-700 text-white font-semibold rounded-xl py-3 hover:bg-amber-800 transition-colors">
            Bắt đầu →
          </button>
        </form>
        <p className="text-xs text-amber-800/30 mt-4">Hoặc dùng ngay với 150 từ HSK 1 có sẵn</p>
      </div>
    )
  }

  const TABS: { id: Tab; emoji: string; label: string }[] = [
    { id: 'flashcard', emoji: '🃏', label: 'Ôn SRS' },
    { id: 'listen',    emoji: '🎧', label: 'Nghe' },
    { id: 'speak',     emoji: '🎤', label: 'Nói' },
    { id: 'wordlist',  emoji: '📖', label: 'Từ vựng' },
    { id: 'addword',   emoji: '➕', label: 'Thêm' },
  ]

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#F8F5EF]">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div>
          <h1 className="text-base font-bold text-amber-950">🀄 Học Tiếng Trung</h1>
          <p className="text-xs text-amber-800/50">
            {nickname} · {vocabulary.length} từ của tôi
            {dueWords.length > 0 && <span className="text-amber-600 font-semibold"> · {dueWords.length} từ đến hạn</span>}
          </p>
        </div>
        <button onClick={() => { setPublicNickname(''); setNickname(null) }}
          className="text-xs text-amber-800/40 hover:text-amber-800 border border-[#E5E0D8] rounded-lg px-3 py-1.5">
          Đổi tên
        </button>
      </div>

      {/* Tab nav */}
      <div className="flex bg-[#FFFDF8] border-b border-[#E5E0D8]">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 flex flex-col items-center py-2.5 text-xs font-medium transition-colors ${tab === t.id ? 'text-amber-700 border-b-2 border-amber-700' : 'text-amber-800/40 hover:text-amber-800/70'}`}>
            <span className="text-lg mb-0.5">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'flashcard' && (
        <Flashcard
          vocabulary={dueWords.length > 0 ? dueWords : activeVoc}
          progress={progress}
          scope={getScope(nickname)}
          userId={nickname}
          onProgressUpdate={handleProgressUpdate}
          profileLabel={nickname} />
      )}
      {tab === 'listen' && (
        <ListeningMode
          vocabulary={activeVoc}
          onComplete={(s) => console.log('listen', s)} />
      )}
      {tab === 'speak' && (
        <SpeakingMode
          vocabulary={activeVoc}
          onComplete={(s) => console.log('speak', s)} />
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
