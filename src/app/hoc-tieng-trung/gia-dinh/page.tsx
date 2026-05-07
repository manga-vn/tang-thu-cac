import { Metadata } from 'next'
import FamilyApp from '@/components/hoctientrung/FamilyApp'

export const metadata: Metadata = {
  title: 'Gia Đình Học Tiếng Trung – Gác Truyện',
  description: 'Trang học tiếng Trung riêng cho ba cha con.',
}

export default function GiaDinhPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <FamilyApp />
    </div>
  )
}
