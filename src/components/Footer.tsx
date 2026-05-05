import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FFFDF8] border-t border-[#E5E0D8] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-amber-800/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Tàng Thư Các. Nơi lưu trữ các bộ truyện do tác giả tự sáng tác.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">
              Trang chủ
            </Link>
            <Link href="/stories" className="text-amber-800/60 hover:text-amber-900 text-sm transition-colors">
              Danh sách truyện
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
