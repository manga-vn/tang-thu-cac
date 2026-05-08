import Link from 'next/link';
import { MAIN_GENRES } from '@/data/genres';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#FFFDF8] border-t border-[#E5E0D8] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📚</span>
              <span className="text-lg font-bold text-amber-950">Gác Truyện</span>
            </div>
            <p className="text-amber-800/60 text-sm leading-relaxed">
              Nơi những câu chuyện được kể, được lưu giữ và được đọc mãi mãi.
            </p>
          </div>

          {/* Khám phá */}
          <div>
            <h4 className="font-semibold text-amber-950 mb-3 text-sm uppercase tracking-wide">Khám phá</h4>
            <ul className="space-y-2">
              <li><Link href="/stories" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">Danh sách truyện</Link></li>
              <li><Link href="/audio" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">Truyện audio</Link></li>
              <li><Link href="/membership" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">Hội viên VIP</Link></li>
            </ul>
          </div>

          {/* Thể loại */}
          <div>
            <h4 className="font-semibold text-amber-950 mb-3 text-sm uppercase tracking-wide">Thể loại</h4>
            <ul className="space-y-2">
              {MAIN_GENRES.slice(0, 5).map(g => (
                <li key={g}>
                  <Link href={`/stories?genre=${encodeURIComponent(g)}`} className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">{g}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin */}
          <div>
            <h4 className="font-semibold text-amber-950 mb-3 text-sm uppercase tracking-wide">Thông tin</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">Giới thiệu</Link></li>
              <li><Link href="/terms" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link href="/privacy" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/contact" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E5E0D8] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-amber-800/40 text-xs text-center">
            © {year} Gác Truyện. Tất cả nội dung thuộc quyền sở hữu của tác giả.
          </p>
          <p className="text-amber-800/40 text-xs italic">&ldquo;Đọc một chương, ở lại một đời.&rdquo;</p>
        </div>
      </div>
    </footer>
  );
}
