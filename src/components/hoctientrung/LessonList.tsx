'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LESSONS, PHASE_LABELS, LessonPhase } from './lessonData'
import { getAllLessonProgress, LessonProgress } from './storage'
import { getActiveScope } from './storage'

const PHASE_ORDER: LessonPhase[] = [
  'family-life', 'daily-communication', 'real-world', 'self-expression', 'review',
]

export default function LessonList() {
  const [allProgress, setAllProgress] = useState<Record<string, LessonProgress>>({})
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const scope = getActiveScope()
    if (scope) {
      setUserId(scope.userId)
      setAllProgress(getAllLessonProgress(scope.userId))
    }
  }, [])

  const completedCount = Object.values(allProgress).filter(p => p.completed).length
  const startedCount = Object.values(allProgress).filter(p => p.started && !p.completed).length

  // Group by phase
  const byPhase = PHASE_ORDER.map(phase => ({
    phase,
    lessons: LESSONS.filter(l => l.phase === phase),
  })).filter(g => g.lessons.length > 0)

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#F8F5EF] pb-24">
      {/* Header */}
      <div className="bg-[#FFFDF8] border-b border-[#E5E0D8] px-4 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/hoc-tieng-trung" className="text-amber-800/50 hover:text-amber-800 text-sm">← Quay lại</Link>
        </div>
        <h1 className="text-xl font-bold text-amber-950">📚 Bài học tiếng Trung</h1>
        <p className="text-sm text-amber-800/60 mt-1">Học theo tình huống thực tế — ưu tiên nghe và nói</p>

        {/* Progress summary */}
        {userId && (
          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-green-50 border border-green-200 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{completedCount}</div>
              <div className="text-xs text-green-700/70">Hoàn thành</div>
            </div>
            <div className="flex-1 bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold text-amber-700">{startedCount}</div>
              <div className="text-xs text-amber-700/70">Đang học</div>
            </div>
            <div className="flex-1 bg-[#F8F5EF] border border-[#E5E0D8] rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold text-amber-950">{LESSONS.length - completedCount - startedCount}</div>
              <div className="text-xs text-amber-800/50">Chưa bắt đầu</div>
            </div>
          </div>
        )}
      </div>

      {/* Lessons by phase */}
      <div className="px-4 pt-4 flex flex-col gap-6">
        {byPhase.map(({ phase, lessons }) => (
          <div key={phase}>
            <h2 className="text-xs font-semibold text-amber-800/50 uppercase tracking-widest mb-3">
              {PHASE_LABELS[phase]}
            </h2>
            <div className="flex flex-col gap-2">
              {lessons.map(lesson => {
                const progress = allProgress[lesson.id]
                const isDone = progress?.completed
                const isStarted = progress?.started && !isDone
                const drillsDone = progress?.completedDrills?.length || 0
                const totalDrills = lesson.speakingDrills.length

                return (
                  <Link key={lesson.id} href={`/hoc-tieng-trung/bai-hoc/${lesson.slug}`}>
                    <div className={`bg-[#FFFDF8] border rounded-2xl p-4 flex items-center gap-4 transition-all active:scale-95 hover:border-amber-300 ${isDone ? 'border-green-300' : 'border-[#E5E0D8]'}`}>
                      {/* Day badge */}
                      <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 ${isDone ? 'bg-green-100' : isStarted ? 'bg-amber-100' : 'bg-[#F8F5EF]'}`}>
                        {isDone
                          ? <span className="text-xl">✅</span>
                          : <><span className="text-xs text-amber-800/50 font-medium">Ngày</span><span className="text-lg font-bold text-amber-950">{lesson.day}</span></>
                        }
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-amber-950 text-sm">{lesson.title}</div>
                        <div className="text-xs text-amber-800/60 mt-0.5 line-clamp-1">{lesson.goal}</div>
                        {isStarted && (
                          <div className="mt-1.5">
                            <div className="h-1 bg-amber-100 rounded-full w-full">
                              <div
                                className="h-full bg-amber-500 rounded-full transition-all"
                                style={{ width: `${totalDrills > 0 ? (drillsDone / totalDrills) * 100 : 0}%` }}
                              />
                            </div>
                            <p className="text-xs text-amber-700/60 mt-0.5">{drillsDone}/{totalDrills} luyện nói</p>
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <span className="text-amber-800/30 text-lg shrink-0">›</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
