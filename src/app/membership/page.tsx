import Link from "next/link";

export const metadata = {
  title: "Hội viên – Gác Truyện",
  description: "Các gói hội viên Gác Truyện – hỗ trợ tác giả và nhận quyền lợi đặc biệt.",
};

const PLANS = [
  {
    id: "free",
    name: "Miễn phí",
    price: "0đ",
    period: "",
    icon: "📖",
    color: "border-[#E5E0D8] bg-[#FFFDF8]",
    badge: "",
    features: [
      "Đọc toàn bộ chương free",
      "Cập nhật truyện mới",
      "Không cần tạo tài khoản",
    ],
    cta: "Đang dùng",
    ctaHref: "/stories",
    ctaStyle: "bg-amber-100 text-amber-700 cursor-default",
    disabled: true,
  },
  {
    id: "supporter",
    name: "Ủng hộ",
    price: "29.000đ",
    period: "/ tháng",
    icon: "⭐",
    color: "border-amber-400 bg-amber-50",
    badge: "Phổ biến",
    features: [
      "Tất cả quyền lợi Free",
      "Huy hiệu độc giả ủng hộ",
      "Đọc sớm một số chương mới",
      "Hỗ trợ trực tiếp tác giả",
      "Cảm ơn tên trong truyện",
    ],
    cta: "Sắp ra mắt",
    ctaHref: "#",
    ctaStyle: "bg-amber-200 text-amber-700 cursor-not-allowed opacity-70",
    disabled: true,
  },
  {
    id: "vip",
    name: "VIP 👑",
    price: "?",
    period: "",
    icon: "👑",
    color: "border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50",
    badge: "Sắp ra mắt",
    features: [
      "Tất cả quyền lợi Ủng hộ",
      "Đọc toàn bộ chương VIP",
      "Truy cập audio độc quyền",
      "Đọc trước tối thiểu 5 chương",
      "Tham gia nhóm Discord riêng",
      "Ảnh hưởng đến nội dung truyện",
    ],
    cta: "Đang phát triển",
    ctaHref: "#",
    ctaStyle: "bg-yellow-200 text-yellow-800 cursor-not-allowed opacity-70",
    disabled: true,
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-900 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <span className="text-5xl block mb-4">👑</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Hội viên Gác Truyện</h1>
          <p className="text-amber-200/80 max-w-xl mx-auto text-sm leading-relaxed">
            Ủng hộ tác giả để các bộ truyện được tiếp tục. Hội viên sẽ nhận quyền lợi đặc biệt và đọc nội dung độc quyền.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.id}
              className={`relative border-2 rounded-2xl p-6 flex flex-col ${plan.color} transition-shadow hover:shadow-lg`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-5">
                <span className="text-4xl block mb-2">{plan.icon}</span>
                <h2 className="text-xl font-bold text-amber-950">{plan.name}</h2>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold text-amber-900">{plan.price}</span>
                  {plan.period && <span className="text-amber-700/60 text-sm ml-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-amber-900/80">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.ctaHref}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${plan.ctaStyle}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-14 bg-[#FFFDF8] border border-[#E5E0D8] rounded-2xl p-7">
          <h2 className="text-xl font-bold text-amber-950 mb-5">Câu hỏi thường gặp</h2>
          <div className="space-y-4 text-sm">
            {[
              { q: 'Khi nào tính năng hội viên ra mắt?', a: 'Tính năng đang được phát triển. Hãy theo dõi trang để cập nhật sớm nhất.' },
              { q: 'Tại sao cần ủng hộ?', a: 'Việc viết truyện đòi hỏi nhiều thời gian. Sự ủng hộ của bạn giúp tác giả duy trì lịch cập nhật đều đặn.' },
              { q: 'Tôi có thể hủy bất cứ lúc nào không?', a: 'Có. Hội viên tháng có thể hủy bất kỳ lúc nào, không mất phí phạt.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-[#E5E0D8] pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-amber-950 mb-1">{q}</p>
                <p className="text-amber-800/70 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-amber-700/40 text-xs mt-8">
          Thanh toán chưa được tích hợp. Đây là trang giới thiệu sản phẩm.
        </p>
      </div>
    </div>
  );
}
