// ============================================================
// toneDetector.ts — Microphone pitch analysis only
// TTS (speak Chinese) has moved to audio.ts
// ============================================================

export type ToneResult = {
  detected: 1 | 2 | 3 | 4 | 0   // 0 = không xác định
  confidence: number              // 0-1
  pitchContour: number[]          // đường cao độ theo thời gian (Hz)
  label: string
}

// ─── Autocorrelation pitch detection (YIN-lite) ───────────────
function detectPitch(buffer: Float32Array, sampleRate: number): number {
  const SIZE = buffer.length
  const MAX_SAMPLES = Math.floor(SIZE / 2)
  let best = -1
  let bestCorr = 0
  let rms = 0

  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i]
  rms = Math.sqrt(rms / SIZE)
  if (rms < 0.005) return -1   // too quiet

  for (let offset = 20; offset < MAX_SAMPLES; offset++) {
    let corr = 0
    for (let i = 0; i < MAX_SAMPLES; i++) {
      corr += buffer[i] * buffer[i + offset]
    }
    corr = corr / MAX_SAMPLES
    if (corr > bestCorr) { bestCorr = corr; best = offset }
  }
  if (bestCorr > 0.01 && best > 0) return sampleRate / best
  return -1
}

// ─── Classify tone from pitch contour ────────────────────────
function classifyTone(pitches: number[]): ToneResult {
  const valid = pitches.filter(p => p > 0)
  if (valid.length < 3) {
    return { detected: 0, confidence: 0, pitchContour: pitches, label: 'Không rõ' }
  }

  const first  = valid.slice(0, Math.floor(valid.length * 0.25))
  const last   = valid.slice(Math.floor(valid.length * 0.75))
  const middle = valid.slice(Math.floor(valid.length * 0.35), Math.floor(valid.length * 0.65))

  const avgFirst  = first.reduce((a, b) => a + b, 0) / first.length
  const avgLast   = last.reduce((a, b) => a + b, 0) / last.length
  const avgMiddle = middle.length ? middle.reduce((a, b) => a + b, 0) / middle.length : (avgFirst + avgLast) / 2
  const avgAll    = valid.reduce((a, b) => a + b, 0) / valid.length

  const rise  = avgLast - avgFirst
  const dip   = Math.min(...valid) - avgAll
  const range = Math.max(...valid) - Math.min(...valid)

  let detected: 1 | 2 | 3 | 4 = 1
  let confidence = 0.5

  if (Math.abs(rise) < range * 0.2 && range < avgAll * 0.15) {
    detected = 1; confidence = 0.75
  } else if (rise > range * 0.3) {
    detected = 2; confidence = 0.7 + Math.min(0.2, rise / avgAll)
  } else if (dip < -range * 0.2 && avgFirst > avgMiddle && avgLast > avgMiddle) {
    detected = 3; confidence = 0.65
  } else if (rise < -range * 0.3) {
    detected = 4; confidence = 0.7 + Math.min(0.2, -rise / avgAll)
  } else {
    confidence = 0.4
  }

  const labels = {
    1: 'Thanh 1 — Ngang (ˉ)',
    2: 'Thanh 2 — Sắc (ˊ)',
    3: 'Thanh 3 — Hỏi (ˇ)',
    4: 'Thanh 4 — Nặng (ˋ)',
  } as const
  return { detected, confidence: Math.min(1, confidence), pitchContour: valid, label: labels[detected] }
}

// ─── Public: record microphone and analyze tone ───────────────
export async function recordAndAnalyzeTone(durationMs = 2000): Promise<ToneResult> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const audioCtx = new AudioContext()
  const analyser = audioCtx.createAnalyser()
  analyser.fftSize = 2048
  const source = audioCtx.createMediaStreamSource(stream)
  source.connect(analyser)

  const sampleRate = audioCtx.sampleRate
  const buffer = new Float32Array(analyser.fftSize)
  const pitches: number[] = []

  const interval = setInterval(() => {
    analyser.getFloatTimeDomainData(buffer)
    pitches.push(detectPitch(buffer, sampleRate))
  }, 50)

  await new Promise(r => setTimeout(r, durationMs))

  clearInterval(interval)
  source.disconnect()
  stream.getTracks().forEach(t => t.stop())
  await audioCtx.close()

  return classifyTone(pitches)
}

// ─── Support check (tts + microphone) ────────────────────────
export function checkSupport(): { tts: boolean; microphone: boolean } {
  return {
    tts: typeof window !== 'undefined' && 'speechSynthesis' in window,
    microphone:
      typeof window !== 'undefined' &&
      'AudioContext' in window &&
      !!navigator.mediaDevices?.getUserMedia,
  }
}
