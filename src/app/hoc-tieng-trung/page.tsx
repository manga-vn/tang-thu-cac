import { Metadata } from 'next'
import PublicApp from '@/components/hoctientrung/PublicApp'

export const metadata: Metadata = {
  title: 'Học Tiếng Trung – Gác Truyện',
  description: 'Ôn từ vựng tiếng Trung bằng flashcard. Lưu từ mới ngay khi đọc truyện.',
}

export default function HocTiengTrungPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <PublicApp />
    </div>
  )
}
