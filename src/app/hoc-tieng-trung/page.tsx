import { Metadata } from 'next'
import FamilyChineseClientLoader from '@/components/family-chinese/FamilyChineseClientLoader'

export const metadata: Metadata = {
  title: 'Tiếng Trung Mỗi Ngày – Gác Truyện',
  description: 'Học qua gia đình, bữa ăn, bạn bè và những cuộc trò chuyện thật.',
}

export default function HocTiengTrungPage() {
  return <FamilyChineseClientLoader />
}
