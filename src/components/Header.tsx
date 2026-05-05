import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#FFFDF8] border-b border-[#E5E0D8] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-amber-950 hover:text-amber-900 transition-colors">
          Tàng Thư Các
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium"
          >
            Trang chủ
          </Link>
          <Link
            href="/stories"
            className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium"
          >
            Danh sách truyện
          </Link>
        </nav>
      </div>
    </header>
  );
}
