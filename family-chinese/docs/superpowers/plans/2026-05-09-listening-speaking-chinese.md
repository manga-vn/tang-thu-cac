# Listening Speaking Chinese Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add daily listening, speaking, and reflex lessons with seeded content, audio playback, microphone practice, and roadmap goals.

**Architecture:** Add focused data and speech helper modules, then compose a new React lesson screen from them. Existing flashcard and word list keep working from a seeded vocabulary list.

**Tech Stack:** React 19, Vite, Tailwind CSS utilities, browser SpeechSynthesis, browser SpeechRecognition, Node test runner.

---

### Task 1: Test Data And Speech Logic

**Files:**
- Modify: `package.json`
- Create: `src/data/dailyLessons.test.js`
- Create: `src/utils/speechPractice.test.js`

- [ ] Add a `test` script using Node's built-in test runner.
- [ ] Add failing tests proving the seeded lesson data has at least 60 vocabulary items, pinyin for every item, and explicit no-character-memorization outcomes.
- [ ] Add failing tests proving speech scoring returns high, partial, and low scores for expected matches.

### Task 2: Implement Data And Speech Logic

**Files:**
- Create: `src/data/dailyLessons.js`
- Create: `src/utils/speechPractice.js`
- Modify: `src/utils/storage.js`

- [ ] Add five daily stages and 60+ listening/speaking items.
- [ ] Export seeded vocabulary derived from lesson items.
- [ ] Update vocabulary storage so existing user words are preserved and default seed words appear when storage is empty.
- [ ] Implement speech normalization, scoring, feedback labels, and browser support detection helpers.

### Task 3: Add Daily Lesson UI

**Files:**
- Create: `src/components/DailyLessons.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/Navigation.jsx`
- Modify: `src/components/Dashboard.jsx`

- [ ] Add a "Một ngày" tab.
- [ ] Add lesson stage selection, active phrase card, word/cue list, roadmap, and minimum outcomes.
- [ ] Add audio buttons for word and sentence.
- [ ] Add microphone practice and score result display.
- [ ] Make Chinese characters optional under a disclosure.
- [ ] Add a dashboard entry point for the new lesson screen.

### Task 4: Verify

**Files:**
- All touched source files.

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start the Vite dev server and inspect the app in browser.

