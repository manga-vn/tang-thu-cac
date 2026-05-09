const FAMILY_PROFILES_KEY = 'fc_family_profiles'

const profileStyles = [
  { emoji: '👨', color: 'bg-red-600', hover: 'hover:bg-red-700' },
  { emoji: '👩', color: 'bg-pink-500', hover: 'hover:bg-pink-600' },
  { emoji: '👦', color: 'bg-amber-500', hover: 'hover:bg-amber-600' },
  { emoji: '👧', color: 'bg-rose-400', hover: 'hover:bg-rose-500' },
  { emoji: '🧑', color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
  { emoji: '👴', color: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
  { emoji: '👵', color: 'bg-violet-600', hover: 'hover:bg-violet-700' },
]

export const DEFAULT_FAMILY_PROFILES = [
  { id: 'cha', label: 'Bố', ...profileStyles[0], isAdmin: true },
  { id: 'me', label: 'Mẹ', ...profileStyles[1], isAdmin: false },
  { id: 'con1', label: 'Con 1', ...profileStyles[2], isAdmin: false },
]

function getStorage(storage) {
  return storage || globalThis.localStorage
}

function normalizeProfiles(profiles) {
  const source = Array.isArray(profiles) && profiles.length > 0 ? profiles : DEFAULT_FAMILY_PROFILES

  return source.map((profile, index) => ({
    ...profileStyles[index % profileStyles.length],
    ...profile,
    label: profile.label?.trim() || `Thành viên ${index + 1}`,
    isAdmin: index === 0 ? true : Boolean(profile.isAdmin),
  }))
}

export function getFamilyProfiles(storage) {
  try {
    const saved = JSON.parse(getStorage(storage)?.getItem(FAMILY_PROFILES_KEY))
    return normalizeProfiles(saved)
  } catch {
    return DEFAULT_FAMILY_PROFILES
  }
}

export function setFamilyProfiles(profiles, storage) {
  const normalized = normalizeProfiles(profiles)
  getStorage(storage)?.setItem(FAMILY_PROFILES_KEY, JSON.stringify(normalized))
  return normalized
}

export function createFamilyProfile(label, index = DEFAULT_FAMILY_PROFILES.length) {
  const style = profileStyles[index % profileStyles.length]
  return {
    id: `member-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    label: label?.trim() || `Thành viên ${index + 1}`,
    ...style,
    isAdmin: false,
  }
}

export function renameFamilyProfile(profiles, profileId, label) {
  return normalizeProfiles(
    profiles.map((profile) => (profile.id === profileId ? { ...profile, label } : profile)),
  )
}

export function removeFamilyProfile(profiles, profileId) {
  const remaining = profiles.filter((profile) => profile.id !== profileId || profile.isAdmin)
  return normalizeProfiles(remaining.length > 0 ? remaining : profiles)
}
