const TABS = [
  { id: 'dashboard', label: 'Hôm nay', emoji: '🏠' },
  { id: 'lessons', label: 'Một ngày', emoji: '🎧' },
  { id: 'flashcard', label: 'Ôn bài', emoji: '🃏' },
  { id: 'wordlist', label: 'Từ vựng', emoji: '📖' },
  { id: 'addword', label: 'Thêm từ', emoji: '+', adminOnly: true },
]

export default function Navigation({ currentTab, onTab, isAdmin }) {
  const visible = TABS.filter(t => !t.adminOnly || isAdmin)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50">
      {visible.map(t => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors
            ${currentTab === t.id
              ? 'text-red-600'
              : 'text-gray-400 hover:text-gray-600'
            }`}
        >
          <span className="text-xl mb-0.5">{t.emoji}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
