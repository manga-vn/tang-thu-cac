'use client'

import { useState, useEffect } from 'react'
import {
  getVocabulary, addWordToScope, deleteWordFromScope,
  getProgress, markWord as markWordFn, ProgressMap,
  getFamilyProfile, setFamilyProfile, clearFamilyProfile, Word, todayStr
} from './storage'
import Flashcard from './Flashcard'
import WordList from './WordList'
import WordForm from './WordForm'

const SCOPE = 'family'

const PROFILES = [
  { id: 'cha',  label: 'Cha',   emoji: '👨', isAdmin: true  },
  { id: 'con1', label: 'Con 1', emoji: '👦', isAdmin: false },
  { id: 'con2', label: 'Con 2', emoji: '👧', isAdmin: false },
] as const

type ProfileId = 'cha' | 'con1' | 'con2'
type Tab = 'dashboard' | 'flashcard' | 'wordlist' | 'addword'

export default function FamilyApp() {
  const [profileId, setProfileId] = useState<ProfileId | null>(null)
  const [tab, setTab]             = useState<Tab>('dashboard')
  const [vocabulary, setVoc]      = useState<Word[]>([])
  const [progress, setProgress]   = useState<ProgressMap>({})

  useEffect(() => {
    const saved = getFamilyProfile() as ProfileId | null
    if (saved) { setProfileId(saved); loadData(saved) }
  }, [])

  function loadData(pid: ProfileId) {
    setVoc(getVocabulary(SCOPE))
    setProgress(getProgress(SCOPE, pid))
  }

  function handleSelectProfile(pid: ProfileId) {
    setFamilyProfile(pid)
    setProfileId(pid)
    loadData(pid)
  }

  function handleSwitchProfile() {
    clearFamilyProfile()
    setProfileId(null)
    setTab('dashboard')
  }

  function handleProgressUpdate() {
    if (!profileId) return
    setProgress(getProgress(SCOPE, profileId))
  }

  function handleAdd(form: { chinese: string; pinyin: string; meaning: string; example: string; tags: string[] }) {
    if (!profileId) return
    addWordToScope(SCOPE, { ...form, addedBy: profileId })
    setVoc(getVocabulary(SCOPE))
  }

  function handleDelete(id: string) {
    deleteWordFromScope(SCOPE, id)
    setVoc(getVocabulary(SCOPE))
  }

  const profile = PROFILES.find(p => p.id === profileId)
  const allTags = [...new Set(vocabulary.flatMap(w => w.tags || []))].sort()

  // --- Profile picker ---
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

  // --- Family stats ---
  function getFamilyStats() {
    return PROFILES.map(p => {
      const prog = getProgress(SCOPE, p.id)
      const today = todayStr()
      const todayReviewed = Object.values(prog).filter(e => e.reviewedAt === today)
      return { ...p, count: todayReviewed.length, remembered: todayReviewed.filter(e => e.status === 'remembered').length }
    })
  }

  // --- Dashboard ---
  const Dashboard = () => {
    const stats = getFamilyStats()
    const myProg = progress
    const myRemembered = Object.values(myProg).filter(e => e.status === 'remembered').length
    const myNotYet = Object.values(myProg).filter(e => e.status === 'not_yet').length
    const myUnseen = vocabulary.length - myRemembered - myNotYet
    const recent = vocabulary.slice(0, 5)

    return (
      <div className="flex flex-col gap-4 p-4 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-lg font-bold text-amber-950">{profile?.emoji} Xin chào, {profile?.label}!</h2>
            <p className="text-xs text-amber-800/50">{todayStr()}</p>
          </div>
          <button onClick={handleSwitchProfile}
            className="text-xs text-amber-800/50 border border-[#E5E0D8] rounded-lg px-3 py-1.5 hover:text-amber-800">
            Đổi người
          </button>
        </div>

        {/* My progress */}
        <div className="bg-amber-700 rounded-2xl p-5 text-white shadow">
          <p className="text-sm opacity-75 mb-3">Tiến độ của tôi</p>
          <div className="flex gap-4 mb-4">
            {[['✓', myRemembered, 'Nhớ rồi'], ['↻', myNotYet, 'Chưa nhớ'], ['○', myUnseen, 'Chưa ôn']].map(([icon, val, label]) => (
              <div key={String(label)} className="flex-1 text-center">
                <div className="text-2xl font-bold">{val}</div>
                <div className="text-xs opacity-70">{label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setTab('flashcard')}
            className="w-full bg-white text-amber-700 font-semibold rounded-xl py-2.5 text-sm hover:bg-amber-50 transition-colors">
            Bắt đầu ôn bài →
          </button>
        </div>

        {/* Family today */}
        <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#E5E0D8]">
          <h3 className="font-semibold text-amber-900 mb-3 text-sm">Gia đình hôm nay</h3>
          {stats.map(u => (
            <div key={u.id} className="flex items-center gap-3 py-2 border-b border-[#E5E0D8] last:border-0">
              <span className="text-2xl">{u.emoji}</span>
              <span className="flex-1 text-sm text-amber-950">{u.label}</span>
              <span className={`text-xs font-semibold ${u.count > 0 ? 'text-green-600' : 'text-amber-800/30'}`}>
                {u.count > 0 ? `✓ ${u.count} từ` : 'Chưa ôn'}
              </span>
            </div>
          ))}
        </div>

        {/* Recent words */}
        {recent.length > 0 && (
          <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#E5E0D8]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-amber-900 text-sm">Từ mới nhất</h3>
              <button onClick={() => setTab('wordlist')} className="text-xs text-amber-600 hover:text-amber-800">Xem tất cả →</button>
            </div>
            {recent.map(w => (
              <div key={w.id} className="flex justify-between py-2 border-b border-[#E5E0D8] last:border-0">
                <div>
                  <span className="font-bold text-amber-950">{w.chinese}</span>
                  <span className="text-xs text-amber-800/50 ml-2">{w.pinyin}</span>
                </div>
                <span className="text-sm text-amber-800/70">{w.meaning}</span>
              </div>
            ))}
          </div>
        )}

        {vocabulary.length === 0 && (
          <div className="text-center py-10 text-amber-800/40">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-sm">Chưa có từ nào.</p>
            {profile?.isAdmin && (
              <button onClick={() => setTab('addword')} className="mt-3 text-amber-700 text-sm font-medium">
                Thêm từ đầu tiên →
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  const TABS: { id: Tab; label: string; emoji: string; adminOnly?: boolean }[] = [
    { id: 'dashboard', label: 'Hôm nay', emoji: '🏠' },
    { id: 'flashcard', label: 'Ôn bài',  emoji: '🃏' },
    { id: 'wordlist',  label: 'Từ vựng', emoji: '📖' },
    { id: 'addword',   label: 'Thêm từ', emoji: '➕', adminOnly: true },
  ]
  const visibleTabs = TABS.filter(t => !t.adminOnly || profile?.isAdmin)

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#F8F5EF]">
      {tab === 'dashboard' && <Dashboard />}
      {tab === 'flashcard' && (
        <Flashcard vocabulary={vocabulary} progress={progress}
          scope={SCOPE} userId={profileId}
          onProgressUpdate={handleProgressUpdate}
          profileLabel={profile?.label || profileId} />
      )}
      {tab === 'wordlist' && (
        <WordList vocabulary={vocabulary} allTags={allTags}
          onDelete={handleDelete} canDelete={profile?.isAdmin} progress={progress} />
      )}
      {tab === 'addword' && profile?.isAdmin && (
        <WordForm onAdd={handleAdd} existingTags={allTags} />
      )}

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFDF8] border-t border-[#E5E0D8] flex z-50 max-w-lg mx-auto">
        {visibleTabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${tab === t.id ? 'text-amber-700' : 'text-amber-800/40 hover:text-amber-800/70'}`}>
            <span className="text-xl mb-0.5">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
