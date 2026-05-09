# Listening Speaking Chinese Design

## Goal
Turn the app into a practical listening, speaking, and reflex-training Chinese app for daily family use. The learner should not be required to memorize Chinese characters.

## Scope
- Add a daily lesson surface organized by daily situations: morning, noon, afternoon, evening, and outside.
- Seed the app with short daily-life phrases and words.
- Make pinyin and Vietnamese meaning primary.
- Keep Chinese characters as optional reference.
- Add audio playback for words and short phrases.
- Add microphone practice with basic browser-based pronunciation scoring.
- Add short-term and long-term roadmap goals focused on listening, speaking, and reflex.

## Learning Rules
- Each item has pinyin, Vietnamese meaning, audio, and an optional Chinese text field.
- Each lesson has minimum outcomes: listen, repeat, react, and no character memorization requirement.
- Short-term goal: 30 days of core household and outside-life reflex phrases.
- Long-term goal: 3 to 6 months of daily-life listening and speaking confidence.

## Technical Approach
- Use browser SpeechSynthesis for audio playback.
- Use browser SpeechRecognition or webkitSpeechRecognition when available.
- Score recognized speech against the Chinese target, with pinyin fallback for engines that return romanized text.
- Preserve existing vocabulary, flashcard, progress, and localStorage behavior.

