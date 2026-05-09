import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createFamilyProfile,
  DEFAULT_FAMILY_PROFILES,
  getFamilyProfiles,
  removeFamilyProfile,
  renameFamilyProfile,
  setFamilyProfiles,
} from './familyProfiles.js'

function createMemoryStorage() {
  const memory = new Map()
  return {
    getItem: (key) => memory.get(key) || null,
    setItem: (key, value) => memory.set(key, value),
  }
}

test('family profiles default to a configurable family instead of fixed three members', () => {
  const profiles = getFamilyProfiles(createMemoryStorage())

  assert.equal(profiles.length, DEFAULT_FAMILY_PROFILES.length)
  assert.equal(profiles[0].isAdmin, true)
  assert.equal(profiles[0].label, 'Bố')
})

test('family profiles can be saved and renamed', () => {
  const storage = createMemoryStorage()
  const saved = setFamilyProfiles(renameFamilyProfile(DEFAULT_FAMILY_PROFILES, 'con1', 'Vũ'), storage)
  const loaded = getFamilyProfiles(storage)

  assert.equal(saved.find((profile) => profile.id === 'con1').label, 'Vũ')
  assert.equal(loaded.find((profile) => profile.id === 'con1').label, 'Vũ')
})

test('family profiles can add and remove non-admin members', () => {
  const newProfile = createFamilyProfile('Bà', 4)
  const profiles = [...DEFAULT_FAMILY_PROFILES, newProfile]
  const removed = removeFamilyProfile(profiles, newProfile.id)

  assert.equal(profiles.length, 4)
  assert.equal(removed.length, 3)
  assert.equal(removeFamilyProfile(profiles, 'cha').length, 4)
})
