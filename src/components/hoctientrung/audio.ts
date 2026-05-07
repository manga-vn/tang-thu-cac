// ============================================================
// audio.ts — Mobile-safe Chinese TTS engine
// Tested targets: iPhone Safari, iPhone Chrome, Android Chrome,
//                 Android Samsung Internet
//
// Key constraints:
//   iOS Safari   → synth.speak() MUST be in synchronous call stack
//                  of user gesture. Any await before speak() breaks it.
//   Android      → synth.cancel() needs ~80ms settle before speak().
//                  speak() from setTimeout IS OK (user already gestured).
//   Samsung Int. → onend may never fire → watchdog timer required.
//   All mobile   → getVoices() returns [] on first call.
//                  Must preloadVoices() on mount (not in gesture).
// ============================================================

export type PlayChineseAudioOptions = {
  slow?: boolean               // 0.5 rate instead of 0.85
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: string) => void
}

// ─── Internal state ───────────────────────────────────────────

let _cachedVoices: SpeechSynthesisVoice[] = []
let _voicesLoaded = false

function _isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

function _findZhVoice(): SpeechSynthesisVoice | null {
  // Prefer cached, fall back to live call (e.g. first gesture before preload)
  const voices =
    _cachedVoices.length > 0
      ? _cachedVoices
      : typeof window !== 'undefined' && window.speechSynthesis
        ? window.speechSynthesis.getVoices()
        : []

  return (
    voices.find(v =>
      v.lang === 'zh-CN' ||
      v.lang === 'zh_CN' ||
      v.lang.startsWith('zh') ||
      v.lang.startsWith('cmn') ||
      v.name.toLowerCase().includes('chinese') ||
      v.name.toLowerCase().includes('mandarin') ||
      v.name.toLowerCase().includes('putonghua') ||
      v.name.toLowerCase().includes('普通话') ||
      v.name.toLowerCase().includes('中文')
    ) ?? null
  )
}

// Build utterance — pure synchronous, no side effects
function _makeUtter(text: string, rate: number): SpeechSynthesisUtterance {
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = rate
  utter.pitch = 1
  const zhVoice = _findZhVoice()
  if (zhVoice) {
    utter.voice = zhVoice
    utter.lang = zhVoice.lang
  } else {
    utter.lang = 'zh-CN'
  }
  return utter
}

// ─── Public API ───────────────────────────────────────────────

/**
 * Call this on component mount (not inside a click handler).
 * Kicks off async voice loading so _cachedVoices is ready
 * by the time the user taps a speak button.
 */
export function preloadVoices(): void {
  if (_voicesLoaded || typeof window === 'undefined' || !window.speechSynthesis) return
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) {
    _cachedVoices = voices
    _voicesLoaded = true
    return
  }
  // Android/Chrome: voices arrive asynchronously via voiceschanged
  window.speechSynthesis.addEventListener(
    'voiceschanged',
    () => {
      _cachedVoices = window.speechSynthesis.getVoices()
      _voicesLoaded = true
    },
    { once: true }
  )
}

/** Returns true if Web Speech API exists in this browser */
export function checkTTSSupport(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Play Chinese text via TTS.
 *
 * ⚠️ Must be called directly (synchronously) from a user gesture
 * handler on iOS. Do NOT call from useEffect or setTimeout — iOS
 * Safari will silently ignore it.
 *
 * On Android the speak() call is delayed 80ms after cancel()
 * to avoid the cancel-race bug in Android WebView / Chrome.
 */
export async function playChineseAudio(
  text: string,
  options: PlayChineseAudioOptions = {}
): Promise<void> {
  const { slow = false, onStart, onEnd, onError } = options

  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onError?.('speechSynthesis not supported')
    return
  }

  const synth = window.speechSynthesis
  const rate = slow ? 0.5 : 0.85

  // Watchdog duration: estimate speech length + buffer
  // Chinese syllable ≈ 300–500ms at normal rate; add 2s buffer
  const watchdogMs = Math.max(3000, text.length * 450 + 2000)

  // ── iOS PATH ─────────────────────────────────────────────
  // speak() must stay in the synchronous call stack of the
  // user gesture. No await allowed before synth.speak().
  if (_isIOS()) {
    synth.cancel()

    return new Promise<void>(resolve => {
      const utter = _makeUtter(text, rate)

      let settled = false
      const done = () => {
        if (settled) return
        settled = true
        clearTimeout(watchdog)
        onEnd?.()
        resolve()
      }

      utter.onstart = () => onStart?.()
      utter.onend = () => done()
      utter.onerror = e => {
        // 'interrupted' / 'canceled' are normal (another speak() was called)
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          onError?.(e.error)
        }
        done()
      }

      // Watchdog: Samsung Safari may never fire onend
      const watchdog = setTimeout(done, watchdogMs)

      synth.speak(utter) // ← synchronous, in same call stack as gesture ✓
    })
  }

  // ── Android / Desktop PATH ───────────────────────────────
  // Cancel first, then wait for the TTS engine to reset.
  synth.cancel()
  if (synth.paused) synth.resume()
  await new Promise(r => setTimeout(r, 80))

  return new Promise<void>(resolve => {
    const utter = _makeUtter(text, rate)

    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      clearTimeout(watchdog)
      onEnd?.()
      resolve()
    }

    utter.onstart = () => onStart?.()
    utter.onend = () => done()
    utter.onerror = e => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        onError?.(e.error)
      }
      done()
    }

    const watchdog = setTimeout(done, watchdogMs)
    synth.speak(utter)
  })
}

/** Stop any currently playing speech immediately. */
export function stopChineseAudio(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}
