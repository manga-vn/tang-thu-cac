import { redirect } from 'next/navigation'
import { CHINESE_LESSONS, getChineseLessonBySlug } from '@/data/chineseLessons'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CHINESE_LESSONS.map(lesson => ({ slug: lesson.slug }))
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params
  const lesson = getChineseLessonBySlug(slug)
  redirect(lesson ? `/hoc-tieng-trung/${lesson.slug}` : '/hoc-tieng-trung')
}
