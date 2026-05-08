import Link from 'next/link'
import { CHINESE_LESSONS, MODULE_CARDS, getFirstChineseLesson, getReadySentences } from '@/data/chineseLessons'
import { ChineseLessonCard, ReadySentenceCard } from './LessonCards'

export default function ChineseLearningHome() {
  const todayLesson = getFirstChineseLesson()
  const todaySentences = todayLesson ? getReadySentences(todayLesson) : []

  return (
    <div className="bg-[#F8F5EF]">
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-amber-200/80">Gác Truyện học tiếng Trung</p>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">Tiếng Trung Mỗi Ngày</h1>
            <p className="mt-4 text-base leading-relaxed text-amber-100/85 sm:text-lg">
              Học qua gia đình, bữa ăn, bạn bè và những cuộc trò chuyện thật.
            </p>
            {todayLesson && (
              <Link
                href={`/hoc-tieng-trung/${todayLesson.slug}`}
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-amber-950 shadow-lg transition-colors hover:bg-amber-50"
              >
                Bắt đầu với bài hôm nay
              </Link>
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <section className="rounded-3xl border border-[#E5E0D8] bg-[#FFFDF8] p-5 sm:p-7">
          <h2 className="text-2xl font-bold text-amber-950">Học từ nơi gần nhất</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-amber-900/70">
            Bắt đầu từ gia đình, nhóm nhỏ, cộng đồng nhỏ, rồi mới ra ngoài xã hội. Mỗi bài học đặt bạn vào một
            cảnh đời sống thật để câu tiếng Trung có chỗ dùng ngay, không học rời rạc như bảng từ điển.
          </p>
        </section>

        <section className="mt-5 rounded-3xl border border-amber-200 bg-amber-50/70 p-5 sm:p-7">
          <h2 className="text-2xl font-bold text-amber-950">Học tiếng Trung từ những cảnh đời sống nhỏ</h2>
          <div className="mt-3 grid gap-4 text-sm leading-relaxed text-amber-900/75 md:grid-cols-3">
            <p>
              Nhiều app học ngoại ngữ khiến việc học bị rời rạc: nhớ vài từ, vài câu đơn lẻ, nhưng đến lúc nói trong nhà hay trong bữa ăn lại không biết đặt câu vào đâu.
            </p>
            <p>
              Gác Truyện thiết kế bài học quanh bối cảnh gia đình, nhóm nhỏ và sinh hoạt hằng ngày: buổi sáng, bữa cơm, khách đến chơi, hỏi thăm người thân.
            </p>
            <p>
              Mỗi bài có hội thoại, từ vựng tách riêng, câu dùng ngay, phát âm, roleplay và một bài tập nhỏ để bạn học mà như không học, rồi dùng được ngay.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-amber-950">Các mạch học chính</h2>
              <p className="mt-1 text-sm text-amber-800/60">Đi từ nhà ra cộng đồng, từng vòng giao tiếp một.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODULE_CARDS.map(card => (
              <div key={card.module} className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4">
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Module {card.module}</span>
                <h3 className="mt-3 font-bold text-amber-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-amber-900/65">{card.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {todayLesson && (
          <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Bài học hôm nay</p>
              <h2 className="mt-2 text-2xl font-bold text-amber-950">{todayLesson.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-amber-900/70">{todayLesson.sceneDescription}</p>
              <Link
                href={`/hoc-tieng-trung/${todayLesson.slug}`}
                className="mt-5 inline-flex rounded-full bg-amber-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-amber-900"
              >
                Vào bài học
              </Link>
            </div>
            <div>
              <h2 className="mb-3 text-xl font-bold text-amber-950">Câu dùng hôm nay</h2>
              <div className="grid gap-3">
                {todaySentences.slice(0, 3).map(sentence => (
                  <ReadySentenceCard key={sentence.chinese} sentence={sentence} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-amber-950">Danh sách bài học</h2>
            <p className="mt-1 text-sm text-amber-800/60">{CHINESE_LESSONS.length} bài học đã sẵn sàng.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CHINESE_LESSONS.map(lesson => (
              <ChineseLessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
