import { Metadata } from 'next'
import LessonList from '@/components/hoctientrung/LessonList'

export const metadata: Metadata = {
  title: 'Bài học tiếng Trung – Gác Truyện',
  description: 'Học tiếng Trung giao tiếp theo tình huống thực tế. 10 bài đầu tiên dành cho gia đình.',
}

export default function BaiHocPage() {
  return <LessonList />
}
