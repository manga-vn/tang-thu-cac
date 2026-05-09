import { useMemo, useState } from 'react'
import ProfilePicker from './components/ProfilePicker'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import DailyLessons from './components/DailyLessons'
import WordForm from './components/WordForm'
import WordList from './components/WordList'
import Flashcard from './components/Flashcard'
import { useVocabulary } from './hooks/useVocabulary'
import { useProgress } from './hooks/useProgress'
import { getCurrentProfile, clearProfile } from './utils/storage'
import { getCurrentStudyDay, getUnlockedVocabulary } from './utils/studyAccess'

const PROFILES_MAP = {
  cha:  { id: 'cha',  label: 'Cha',   emoji: '👨', isAdmin: true  },
  con1: { id: 'con1', label: 'Con 1', emoji: '👦', isAdmin: false },
  con2: { id: 'con2', label: 'Con 2', emoji: '👧', isAdmin: false },
}

export default function App() {
  const [profile, setProfile] = useState(() => {
    const saved = getCurrentProfile()
    return saved ? (PROFILES_MAP[saved] || null) : null
  })

  const [tab, setTab] = useState('dashboard')

  const { vocabulary, addWord, deleteWord, allTags } = useVocabulary()
  const { markWord, getWordStatus, getTodayReviewed, getSummary } = useProgress(profile?.id || 'cha')
  const studyDay = getCurrentStudyDay()
  const unlockedVocabulary = useMemo(() => getUnlockedVocabulary(vocabulary, studyDay), [vocabulary, studyDay])
  const unlockedTags = useMemo(
    () => [...new Set(unlockedVocabulary.flatMap((word) => word.tags || []))].sort(),
    [unlockedVocabulary],
  )

  if (!profile) {
    return <ProfilePicker onSelect={setProfile} />
  }

  function handleSwitchProfile() {
    clearProfile()
    setProfile(null)
    setTab('dashboard')
  }

  function handleAddWord(form) {
    addWord(form, profile.id)
  }

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-gray-50">
      <main className="flex-1 overflow-y-auto">
        {tab === 'dashboard' && (
          <Dashboard
            profile={profile}
            vocabulary={unlockedVocabulary}
            studyDay={studyDay}
            getTodayReviewed={getTodayReviewed}
            getSummary={getSummary}
            onTab={setTab}
            onSwitchProfile={handleSwitchProfile}
          />
        )}
        {tab === 'flashcard' && (
          <Flashcard
            vocabulary={unlockedVocabulary}
            getWordStatus={getWordStatus}
            markWord={markWord}
            profile={profile}
          />
        )}
        {tab === 'lessons' && (
          <DailyLessons />
        )}
        {tab === 'wordlist' && (
          <WordList
            vocabulary={unlockedVocabulary}
            allTags={unlockedTags}
            onDelete={deleteWord}
            isAdmin={profile.isAdmin}
            getWordStatus={getWordStatus}
          />
        )}
        {tab === 'addword' && profile.isAdmin && (
          <WordForm
            onAdd={handleAddWord}
            existingTags={allTags}
            vocabulary={vocabulary}
          />
        )}
      </main>

      <Navigation
        currentTab={tab}
        onTab={setTab}
        isAdmin={profile.isAdmin}
      />
    </div>
  )
}
