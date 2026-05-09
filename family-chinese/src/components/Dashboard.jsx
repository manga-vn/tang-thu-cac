import { todayStr } from '../utils/storage'

export default function Dashboard({
  profile,
  profiles,
  vocabulary,
  studyDay,
  getTodayReviewed,
  getSummary,
  getSummaryForUser,
  onTab,
  onSwitchProfile,
}) {
  const today = todayStr()
  const recent = vocabulary.slice(0, 5)
  const summary = getSummary(vocabulary)
  const total = vocabulary.length
  const myScore = calculateScore(summary, total)

  // Per-user today stats
  const userStats = profiles.map(p => {
    const reviewed = getTodayReviewed(p.id)
    const userSummary = getSummaryForUser(p.id, vocabulary)
    const remembered = reviewed.filter(r => r.status === 'remembered').length
    return {
      ...p,
      reviewedCount: reviewed.length,
      remembered,
      score: calculateScore(userSummary, total),
      summary: userSummary,
    }
  })

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">

      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {profile.emoji} Xin chào, {profile.label}!
          </h2>
          <p className="text-xs text-gray-400">{today}</p>
        </div>
        <button
          onClick={onSwitchProfile}
          className="text-xs text-gray-400 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          Đổi người
        </button>
      </div>

      {/* My progress today */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 text-white shadow">
        <p className="text-sm opacity-80 mb-3">Tiến độ của tôi hôm nay - ngày {studyDay}</p>
        <div className="flex gap-4">
          <Stat value={summary.remembered} label="Nhớ rồi" />
          <Stat value={summary.notYet}     label="Chưa nhớ" />
          <Stat value={summary.unseen}     label="Chưa ôn" />
        </div>
        <div className="mt-4 rounded-2xl bg-white/15 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white/80">Điểm tiến độ</span>
            <span className="text-2xl font-black">{myScore}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white" style={{ width: `${myScore}%` }} />
          </div>
        </div>
        <button
          onClick={() => onTab('lessons')}
          className="mt-4 w-full bg-white text-red-600 font-semibold rounded-xl py-2.5 text-sm hover:bg-red-50 transition-colors"
        >
          Học bài hôm nay →
        </button>
      </div>

      {/* Listening speaking lesson */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-red-500 uppercase">Nghe - nói - phản xạ</p>
            <h3 className="font-bold text-gray-800 mt-1">Học theo một ngày thật</h3>
            <p className="text-sm text-gray-500 mt-1">
              Pinyin, audio câu ngắn, đọc lại bằng micro. Không bắt nhớ mặt chữ.
            </p>
          </div>
          <span className="text-3xl">🎧</span>
        </div>
        <button
          onClick={() => onTab('lessons')}
          className="mt-4 w-full bg-gray-900 text-white font-semibold rounded-xl py-2.5 text-sm hover:bg-gray-800 transition-colors"
        >
          Vào bài nghe nói
        </button>
      </div>

      {/* Family status */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 text-sm">Gia đình hôm nay</h3>
          <button onClick={onSwitchProfile} className="text-xs font-semibold text-red-500">
            Sửa thành viên
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {userStats.map(u => (
            <div key={u.id} className="flex items-center gap-3">
              <span className="text-2xl">{u.emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{u.label}</span>
                  <span className="text-xs font-semibold text-gray-500">
                    {u.score} điểm
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-gray-400">
                  <span>{u.reviewedCount > 0 ? `✓ ${u.reviewedCount} từ hôm nay` : 'Chưa ôn hôm nay'}</span>
                  <span>{u.summary.remembered}/{total} nhớ</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full transition-all"
                    style={{ width: `${u.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent words */}
      {recent.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">Từ mới nhất</h3>
            <button onClick={() => onTab('wordlist')} className="text-xs text-red-500 hover:text-red-700">
              Xem từ đã mở →
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recent.map(w => (
              <div key={w.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <span className="text-base font-semibold text-gray-800 mr-2">{w.chinese}</span>
                  <span className="text-xs text-gray-400">{w.pinyin}</span>
                </div>
                <span className="text-sm text-gray-500">{w.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {total === 0 && (
        <div className="text-center py-10 text-gray-400">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-sm">Chưa có từ nào.</p>
          {profile.isAdmin && (
            <button onClick={() => onTab('addword')} className="mt-3 text-red-600 text-sm font-medium">
              Thêm từ đầu tiên →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function calculateScore(summary, total) {
  if (!total) return 0
  return Math.round(((summary.remembered + summary.notYet * 0.35) / total) * 100)
}

function Stat({ value, label }) {
  return (
    <div className="flex-1 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  )
}
