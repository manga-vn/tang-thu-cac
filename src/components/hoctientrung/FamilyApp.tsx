'use client'

import { useState, useEffect } from 'react'
import {
  getVocabulary, addWordToScope, deleteWordFromScope,
  getProgress, markWord as markWordFn, ProgressMap,
  getFamilyProfile, setFamilyProfile, clearFamilyProfile, Word, todayStr
} from './storage'
import { reviewSM2, isDue, defaultSRS, qualityFromSimple, SRSData } from './srs'
import { HSK1 } from './hskData'
import Flashcard from './Flashcard'
import WordList from './WordList'
import WordForm from './WordForm'
import ListeningMode from './ListeningMode'
import SpeakingMode from './SpeakingMode'

const SCOPE = 'family'
const PROFILES = [
  { id: 'cha',  label: 'Cha',   emoji: '👨', isAdmin: true  },
  { id: 'con1', label: 'Con 1', emoji: '👦', isAdmin: false },
  { id: 'con2', label: 'Con 2', emoji: '👧', isAdmin: false },
] as const
type ProfileId = 'cha' | 'con1' | 'con2'
type Tab = 'dashboard' | 'flashcard' | 'listen' | 'speak' | 'wordlist' | 'addword'

function hsk1AsWords(): Word[] {
  return HSK1.map((w, i) => ({
    id: `hsk1_${i}`,
    chinese: w.chinese, pinyin: w.pinyin, meaning: w.meaning,
    example: '', tags: w.tags, addedBy: 'hsk1', addedAt: '2026-01-01',
    tone: w.tone,
  } as Word & { tone: number }))
}

export default function FamilyApp() {
  const [profileId, setProfileId] = useState<ProfileId | null>(null)
  const [tab, setTab]             = useState<Tab>('dashboard')
  const [vocabulary, setVoc]      = useState<Word[]>([])
  const [progress, setProgress]   = useState<ProgressMap>({})
  const [useHSK, setUseHSK]       = useState(false)

  useEffect(() => {
    const saved = getFamilyProfile() as ProfileId | null
    if (saved) { setProfileId(saved); loadData(saved) }
  }, [])

  function loadData(pid: ProfileId) {
    setVoc(getVocabulary(SCOPE))
    setProgress(getProgress(SCOPE, pid))
  }

  function handleSelectProfile(pid: ProfileId) {
    setFamilyProfile(pid); setProfileId(pid); loadData(pid)
  }

  function handleSwitchProfile() {
    clearFamilyProfile(); setProfileId(null); setTab('dashboard')
  }

  function handleProgressUpdate() {
    if (profileId) setProgress(getProgress(SCOPE, profileId))
  }

  function handleAdd(form: { chinese: string; pinyin: string; meaning: string; example: string; tags: string[] }) {
    if (!profileId) return
    addWordToScope(SCOPE, { ...form, addedBy: profileId })
    setVoc(getVocabulary(SCOPE))
  }

  function handleDelete(id: string) {
    deleteWordFromScope(SCOPE, id); setVoc(getVocabulary(SCOPE))
  }

  function importHSK1() {
    const existing = getVocabulary(SCOPE).map(w => w.chinese)
    HSK1.forEach((w, i) => {
      if (!existing.includes(w.chinese)) {
        addWordToScope(SCOPE, {
          chinese: w.chinese, pinyin: w.pinyin, meaning: w.meaning,
          example: '', tags: w.tags, addedBy: 'hsk1',
        })
      }
    })
    setVoc(getVocabulary(SCOPE))
  }

  const profile   = PROFILES.find(p => p.id === profileId)
  const allTags   = [...new Set(vocabulary.flatMap(w => w.tags || []))].sort()
  const activeVoc = useHSK ? hsk1AsWords() : vocabulary
  const dueWords  = activeVoc.filter(w => isDue(progress[w.id] as any))

  // Profile picker
  if (!profileId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <div className="text-5xl mb-3">🀄</div>
        <h2 className="text-2xl font-bold text-amber-950 mb-1">Ba Cha Con</h2>
        <p className="text-amber-800/60 text-sm mb-8">Ai đang học hôm nay?</p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {PROFILES.map(p => (
            <button key={p.id} onClick={() => handleSelectProfile(p.id)}
              className="bg-[#FFFDF8] border-2 border-[#E5E0D8] hover:border-amber-400 text-amber-950 rounded-2xl py-4 px-5 flex items-center gap-4 transition-all shadow-sm active:scale-95">
              <span className="text-3xl">{p.emoji}</span>
              <div className="text-left flex-1">
                <div className="font-bold">{p.label}</div>
                {p.isAdmin && <div className="text-xs text-amber-800/50">Quản lý từ vựng</div>}
              </div>
              <span className="text-amber-800/30">›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Dashboard
  const Dashboard = () => {
    const today = todayStr()
    const myRemembered = Object.values(progress).filter((e: any) => e.status === 'remembered').length
    const myNotYet = Object.values(progress).filter((e: any) => e.status === 'not_yet').length
    const myUnseen = vocabulary.length - myRemembered - myNotYet
    const familyStats = PROFILES.map(p => {
      const prog = getProgress(SCOPE, p.id)
      const todayReviewed = Object.values(prog).filter((e: any) => e.reviewedAt === today)
      return { ...p, count: todayReviewed.length }
    })

    return (
      <div className="flex flex-col gap-4 p-4 pb-28">
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-lg font-bold text-amber-950">{profile?.emoji} {profile?.label}</h2>
            <p className="text-xs text-amber-800/50">{today} · {dueWords.length} từ đến hạn ôn</p>
          </div>
          <button onClick={handleSwitchProfile}
            className="text-xs text-amber-800/50 border border-[#E5E0D8] rounded-lg px-3 py-1.5 hover:text-amber-800">
            Đổi người
          </button>
        </div>

        {/* SRS status */}
        {dueWords.length > 0 && (
          <div className="bg-amber-700 text-white rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">{dueWords.length} từ cần ôn hôm nay</p>
              <p className="text-xs opacity-75">Theo lịch SRS khoa học</p>
            </div>
            <button onClick={() => setTab('flashcard')}
              className="bg-white text-amber-700 font-bold rounded-xl px-4 py-2 text-sm hover:bg-amber-50">
              Ôn ngay →
            </button>
          </div>
        )}

        {/* My progress */}
        <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#E5E0D8]">
          <p className="text-sm font-semibold text-amber-900 mb-3">Tổng tiến độ của tôi</p>
          <div className="flex gap-3">
            {[['✓', myRemembered, 'Nhớ rồi', 'text-green-600'], ['↻', myNotYet, 'Đang học', 'text-amber-600'], ['○', myUnseen, 'Chưa ôn', 'text-gray-400']].map(([icon, val, label, color]) => (
              <div key={String(label)} className="flex-1 text-center">
                <div className={`text-2xl font-bold ${color}`}>{val}</div>
                <div className="text-xs text-amber-800/50">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice modes */}
        <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#E5E0D8]">
          <p className="text-sm font-semibold text-amber-900 mb-3">Chế độ luyện tập</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { tab: 'flashcard' as Tab, emoji: '🃏', label: 'Flashcard SRS', sub: `${dueWords.length} từ hôm nay` },
              { tab: 'listen'    as Tab, emoji: '🎧', label: 'Luyện nghe',    sub: 'Nghe → chọn nghĩa' },
              { tab: 'speak'     as Tab, emoji: '🎤', label: 'Luyện nói',     sub: 'Đọc → phân tích thanh' },
              { tab: 'wordlist'  as Tab, emoji: '📖', label: 'Từ vựng',       sub: `${vocabulary.length} từ` },
            ].map(m => (
              <button key={m.tab} onClick={() => setTab(m.tab)}
                className="bg-amber-50 hover:bg-amber-100 rounded-xl p-3 text-left transition-colors active:scale-95">
                <div className="text-2xl mb-1">{m.emoji}</div>
                <div className="text-sm font-semibold text-amber-950">{m.label}</div>
                <div className="text-xs text-amber-800/50">{m.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Family today */}
        <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#E5E0D8]">
          <h3 className="font-semibold text-amber-900 mb-3 text-sm">Gia đình hôm nay</h3>
          {familyStats.map(u => (
            <div key={u.id} className="flex items-center gap-3 py-2 border-b border-[#E5E0D8] last:border-0">
              <span className="text-2xl">{u.emoji}</span>
              <span className="flex-1 text-sm text-amber-950">{u.label}</span>
              <span className={`text-xs font-semibold ${u.count > 0 ? 'text-green-600' : 'text-amber-800/30'}`}>
                {u.count > 0 ? `✓ ${u.count} từ` : 'Chưa ôn'}
              </span>
            </div>
          ))}
        </div>

        {/* Import HSK1 */}
        {vocabulary.length === 0 && profile?.isAdmin && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
            <p className="text-sm font-semibold text-blue-800 mb-1">🎓 Bắt đầu với HSK 1</p>
            <p className="text-xs text-blue-700 mb-3">150 từ chuẩn HSK 1 — nền tảng giao tiếp cơ bản</p>
            <button onClick={importHSK1}
              className="bg-blue-600 text-white font-semibold rounded-xl px-6 py-2 text-sm hover:bg-blue-700">
              Nhập 150 từ HSK 1
            </button>
          </div>
        )}
      </div>
    )
  }

  const TABS: { id: Tab; emoji: string; label: string; adminOnly?: boolean }[] = [
    { id: 'dashboard', emoji: '🏠', label: 'Hôm nay' },
    { id: 'flashcard', emoji: '🃏', label: 'Ôn SRS' },
    { id: 'listen',    emoji: '🎧', label: 'Nghe' },
    { id: 'speak',     emoji: '🎤', label: 'Nói' },
    { id: 'addword',   emoji: '➕', label: 'Thêm', adminOnly: true },
  ]
  const visibleTabs = TABS.filter(t => !t.adminOnly || profile?.isAdmin)

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#F8F5EF]">
      {tab === 'dashboard' && <Dashboard />}
      {tab === 'flashcard' && (
        <Flashcard vocabulary={dueWords.length > 0 ? dueWords : vocabulary}
          progress={progress} scope={SCOPE} userId={profileId}
          onProgressUpdate={handleProgressUpdate}
          profileLabel={profile?.label || profileId} />
      )}
      {tab === 'listen' && (
        <ListeningMode vocabulary={vocabulary.length >= 4 ? vocabulary : hsk1AsWords()}
          onComplete={(s) => console.log('listen score', s)} />
      )}
      {tab === 'speak' && (
        <SpeakingMode vocabulary={vocabulary.length > 0 ? vocabulary : hsk1AsWords()}
          onComplete={(s) => console.log('speak score', s)} />
      )}
      {tab === 'wordlist' && (
        <WordList vocabulary={vocabulary} allTags={allTags}
          onDelete={handleDelete} canDelete={profile?.isAdmin} progress={progress} />
      )}
      {tab === 'addword' && profile?.isAdmin && (
        <WordForm onAdd={handleAdd} existingTags={allTags} />
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFDF8] border-t border-[#E5E0D8] flex z-50 max-w-lg mx-auto">
        {visibleTabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 flex flex-col items-center py-2.5 text-xs font-medium transition-colors ${tab === t.id ? 'text-amber-700' : 'text-amber-800/40 hover:text-amber-800/70'}`}>
            <span className="text-lg mb-0.5">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
