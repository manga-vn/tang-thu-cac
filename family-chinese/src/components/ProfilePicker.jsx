import { setCurrentProfile } from '../utils/storage'

const PROFILES = [
  { id: 'cha',   label: 'Cha',   emoji: '👨', color: 'bg-red-600',    hover: 'hover:bg-red-700',    isAdmin: true  },
  { id: 'con1',  label: 'Con 1', emoji: '👦', color: 'bg-amber-500',  hover: 'hover:bg-amber-600',  isAdmin: false },
  { id: 'con2',  label: 'Con 2', emoji: '👧', color: 'bg-rose-400',   hover: 'hover:bg-rose-500',   isAdmin: false },
]

export default function ProfilePicker({ onSelect }) {
  function handleSelect(profile) {
    setCurrentProfile(profile.id)
    onSelect(profile)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-amber-50 px-6">
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🀄</div>
        <h1 className="text-3xl font-bold text-red-800 mb-2">Ba Cha Con Học Tiếng Trung</h1>
        <p className="text-gray-500">Ai đang học hôm nay?</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {PROFILES.map(p => (
          <button
            key={p.id}
            onClick={() => handleSelect(p)}
            className={`${p.color} ${p.hover} text-white rounded-2xl py-5 px-6 flex items-center gap-4 text-left transition-all shadow-md active:scale-95`}
          >
            <span className="text-4xl">{p.emoji}</span>
            <div>
              <div className="text-xl font-bold">{p.label}</div>
              {p.isAdmin && (
                <div className="text-xs opacity-80">Có thể nhập từ mới</div>
              )}
            </div>
            <span className="ml-auto text-2xl opacity-60">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export { PROFILES }
