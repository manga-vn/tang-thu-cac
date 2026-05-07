import { Metadata } from 'next'
import ChineseLearningHome from '@/components/chinese-learning/ChineseLearningHome'

export const metadata: Metadata = {
  title: 'Tiếng Trung Mỗi Ngày – Gác Truyện',
  description: 'Học qua gia đình, bữa ăn, bạn bè và những cuộc trò chuyện thật.',
}

export default function HocTiengTrungPage() {
  return <ChineseLearningHome />
}
