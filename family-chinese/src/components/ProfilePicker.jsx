import { useState } from 'react'
import { setCurrentProfile } from '../utils/storage'
import {
  createFamilyProfile,
  getFamilyProfiles,
  removeFamilyProfile,
  renameFamilyProfile,
  setFamilyProfiles,
} from '../utils/familyProfiles'

export default function ProfilePicker({ onSelect, onProfilesChange }) {
  const [profiles, setProfilesState] = useState(() => getFamilyProfiles())
  const [newName, setNewName] = useState('')

  function saveProfiles(nextProfiles) {
    const saved = setFamilyProfiles(nextProfiles)
    setProfilesState(saved)
    onProfilesChange?.(saved)
  }

  function handleSelect(profile) {
    setCurrentProfile(profile.id)
    onSelect(profile)
  }

  function handleRename(profileId, label) {
    saveProfiles(renameFamilyProfile(profiles, profileId, label))
  }

  function handleAddMember() {
    const profile = createFamilyProfile(newName, profiles.length)
    saveProfiles([...profiles, profile])
    setNewName('')
  }

  function handleRemove(profileId) {
    saveProfiles(removeFamilyProfile(profiles, profileId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-sm flex-col">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl font-black text-red-600 shadow">
            中
          </div>
          <h1 className="text-3xl font-bold text-red-800 mb-2">Gia đình học tiếng Trung</h1>
          <p className="text-gray-500">Chọn người học hoặc chỉnh thành viên gia đình.</p>
        </div>

        <div className="flex flex-col gap-3">
          {profiles.map((profile) => (
            <div key={profile.id} className="rounded-2xl bg-white p-3 shadow-sm border border-white">
              <button
                onClick={() => handleSelect(profile)}
                className={`${profile.color} ${profile.hover} w-full text-white rounded-xl py-4 px-4 flex items-center gap-3 text-left transition-all active:scale-95`}
              >
                <span className="text-3xl">{profile.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-bold truncate">{profile.label}</div>
                  <div className="text-xs opacity-80">
                    {profile.isAdmin ? 'Quản lý từ và thành viên' : 'Theo dõi tiến độ riêng'}
                  </div>
                </div>
                <span className="text-2xl opacity-60">›</span>
              </button>

              <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
                <input
                  value={profile.label}
                  onChange={(event) => handleRename(profile.id, event.target.value)}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none focus:border-red-300"
                  aria-label={`Đổi tên ${profile.label}`}
                />
                {!profile.isAdmin && profiles.length > 1 && (
                  <button
                    onClick={() => handleRemove(profile.id)}
                    className="rounded-xl border border-gray-100 px-3 py-2 text-xs font-bold text-gray-400 active:scale-95"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
          <p className="mb-2 text-sm font-bold text-gray-700">Thêm thành viên</p>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Ví dụ: Ông, Bà, Vũ..."
              className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-red-300"
            />
            <button
              onClick={handleAddMember}
              className="rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white active:scale-95"
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
