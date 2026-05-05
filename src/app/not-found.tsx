import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F5EF] px-4">
      <h1 className="text-6xl font-bold text-amber-950 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-amber-900 mb-4">
        Không tìm thấy trang
      </h2>
      <p className="text-amber-800/70 mb-8 text-center max-w-md">
        Truyện hoặc chương bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        href="/stories"
        className="bg-[#8B5E34] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6F4726] transition-colors"
      >
        Quay lại danh sách truyện
      </Link>
    </div>
  );
}
