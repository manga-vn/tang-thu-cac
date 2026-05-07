import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CHINESE_LESSONS, getChineseLessonBySlug } from '@/data/chineseLessons'
import ChineseLessonDetail from '@/components/chinese-learning/ChineseLessonDetail'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CHINESE_LESSONS.map(lesson => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lesson = getChineseLessonBySlug(slug)
  if (!lesson) return { title: 'Không tìm thấy bài học' }
  return {
    title: `${lesson.title} – Tiếng Trung Mỗi Ngày`,
    description: lesson.sceneDescription,
  }
}

export default async function ChineseLessonPage({ params }: Props) {
  const { slug } = await params
  const lesson = getChineseLessonBySlug(slug)
  if (!lesson) notFound()
  return <ChineseLessonDetail lesson={lesson} />
}
