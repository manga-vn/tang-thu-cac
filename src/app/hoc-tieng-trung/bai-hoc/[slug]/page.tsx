import { Metadata } from 'next'
import { getLessonBySlug, LESSONS } from '@/components/hoctientrung/lessonData'
import LessonDetail from '@/components/hoctientrung/LessonDetail'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return LESSONS.map(l => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)
  if (!lesson) return { title: 'Không tìm thấy bài học' }
  return {
    title: `Ngày ${lesson.day}: ${lesson.title} – Học Tiếng Trung`,
    description: lesson.goal,
  }
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params
  return <LessonDetail slug={slug} />
}
