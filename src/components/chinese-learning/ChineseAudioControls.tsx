'use client'

import { useMemo, useState } from 'react'
import { playChineseAudio } from '@/components/hoctientrung/audio'

type SpeechRecognitionResultLike = {
  readonly length: number
  item(index: number): { readonly transcript: string }
  [index: number]: { readonly transcript: string }
}

type SpeechRecognitionEventLike = Event & {
  results: SpeechRecognitionResultLike[]
}

type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor
  webkitSpeechRecognition?: SpeechRecognitionConstructor
}

interface Props {
  text: string
  compact?: boolean
  withSpeechCheck?: boolean
}

function normalizeSpeech(input: string) {
  return input.replace(/[，。！？!?.,\s]/g, '').toLowerCase()
}

export default function ChineseAudioControls({ text, compact = false, withSpeechCheck = false }: Props) {
  const [status, setStatus] = useState<'idle' | 'playing' | 'error'>('idle')
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [speechSupported, setSpeechSupported] = useState<boolean | null>(null)

  const scoreLabel = useMemo(() => {
    if (!transcript) return ''
    const target = normalizeSpeech(text)
    const spoken = normalizeSpeech(transcript)
    return spoken && (target.includes(spoken) || spoken.includes(target.slice(0, Math.min(4, target.length))))
      ? 'Khá ổn'
      : 'Thử lại chậm hơn'
  }, [text, transcript])

  async function handlePlay(slow = false) {
    if (!text || status === 'playing') return
    setStatus('playing')
    try {
      await playChineseAudio(text, {
        slow,
        onEnd: () => setStatus('idle'),
        onError: () => setStatus('error'),
      })
    } catch {
      setStatus('error')
    }
  }

  function handleSpeak() {
    const speechWindow = window as SpeechWindow
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition
    if (!Recognition) {
      setSpeechSupported(false)
      return
    }

    setSpeechSupported(true)
    setTranscript('')
    setListening(true)
    const recognition = new Recognition()
    recognition.lang = 'zh-CN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = event => {
      const result = event.results[0]?.[0]?.transcript ?? event.results[0]?.item(0)?.transcript ?? ''
      setTranscript(result)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognition.start()
  }

  const buttonBase = compact
    ? 'rounded-full px-3 py-1.5 text-xs'
    : 'rounded-xl px-3.5 py-2 text-sm'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => handlePlay(false)}
        disabled={status === 'playing'}
        className={`${buttonBase} bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200 transition-colors disabled:opacity-60`}
      >
        {status === 'playing' ? 'Đang nghe...' : 'Nghe'}
      </button>
      <button
        type="button"
        onClick={() => handlePlay(true)}
        disabled={status === 'playing'}
        className={`${buttonBase} bg-[#FFFDF8] border border-[#E5E0D8] text-amber-800 hover:border-amber-300 transition-colors disabled:opacity-60`}
      >
        Nghe chậm
      </button>
      {withSpeechCheck && (
        <button
          type="button"
          onClick={handleSpeak}
          disabled={listening}
          className={`${buttonBase} bg-amber-800 text-white font-semibold hover:bg-amber-900 transition-colors disabled:opacity-60`}
        >
          {listening ? 'Đang nghe...' : 'Nói thử'}
        </button>
      )}
      {status === 'error' && <span className="text-xs text-red-600">Không phát được âm thanh.</span>}
      {speechSupported === false && (
        <p className="w-full text-xs text-amber-800/60">
          Trình duyệt này chưa hỗ trợ kiểm tra giọng nói. Bạn vẫn có thể nghe và tự luyện nói.
        </p>
      )}
      {transcript && (
        <p className="w-full text-xs text-amber-800/70">
          Bạn nói: <span className="font-semibold text-amber-950">{transcript}</span> · {scoreLabel}
        </p>
      )}
    </div>
  )
}
