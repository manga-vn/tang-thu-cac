'use client'

import { useState, useCallback } from 'react'
import { playChineseAudio } from './audio'

type Status = 'idle' | 'playing' | 'error'

export type PronunciationButtonSize = 'sm' | 'md'

interface Props {
  text: string
  size?: PronunciationButtonSize
}

export default function PronunciationButton({ text, size = 'md' }: Props) {
  const [status, setStatus] = useState<Status>('idle')

  const handleClick = useCallback(async () => {
    if (!text || status === 'playing') return
    setStatus('playing')
    try {
      await playChineseAudio(text, {
        onEnd:   () => setStatus('idle'),
        onError: () => setStatus('error'),
      })
    } catch {
      setStatus('error')
    }
  }, [text, status])

  if (!text) return null

  const isSm      = size === 'sm'
  const isPlaying = status === 'playing'
  const isError    = status === 'error'

  if (isSm) {
    return (
      <button
        onClick={handleClick}
        disabled={isPlaying}
        title="Nghe phat am"
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors ${
          isPlaying ? 'bg-amber-200 text-amber-800' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
        }`}
      >
        {isPlaying ? '...' : isError ? '!' : '🔊'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPlaying}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
        isPlaying ? 'bg-amber-500 text-white' : isError ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
      }`}
    >
      {isPlaying ? 'Dang phat...' : isError ? 'Khong phat duoc' : '🔊 Nghe'}
    </button>
  )
}
