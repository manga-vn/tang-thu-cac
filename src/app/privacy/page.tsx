import Link from "next/link";

export const metadata = {
  title: "Chính sách quyền riêng tư - Gác Truyện",
  description: "Chính sách quyền riêng tư của Gác Truyện, bao gồm dữ liệu truy cập, cookie, dịch vụ bên thứ ba và tính năng đang phát triển.",
};

const collectedInfo = [
  "dữ liệu truy cập website",
  "trang đã xem",
  "thiết bị, trình duyệt, hệ điều hành",
  "thời gian truy cập",
  "thao tác với tính năng đọc truyện, đề cử, theo dõi hoặc học ngoại ngữ nếu có",
  "thông tin bạn chủ động gửi qua biểu mẫu, bình luận hoặc tài khoản nếu các tính năng này được mở trong tương lai",
];

const useCases = [
  "duy trì hoạt động website",
  "cải thiện trải nghiệm đọc",
  "hiểu nội dung nào được quan tâm",
  "phát hiện lỗi kỹ thuật",
  "chống spam hoặc hành vi gây hại",
  "phát triển các tính năng như theo dõi truyện, đề cử, hội viên, audio hoặc học ngoại ngữ nếu được triển khai",
];

const thirdPartyServices = [
  "nền tảng hosting/deploy",
  "công cụ phân tích truy cập",
  "dịch vụ phát audio",
  "công cụ thanh toán nếu tính năng hội viên được mở",
  "dịch vụ đăng nhập nếu có tài khoản người dùng trong tương lai",
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <section className="border-b border-[#E5E0D8] bg-[#FFFDF8]">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <Link href="/" className="text-sm font-medium text-amber-700 hover:text-amber-900">
            ← Về trang chủ
          </Link>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-amber-950 sm:text-4xl">
            Chính sách quyền riêng tư
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-amber-900/70 sm:text-base">
            Gác Truyện tôn trọng quyền riêng tư của người dùng. Chính sách này giải thích ngắn gọn những loại thông tin có thể được thu thập, cách sử dụng và các giới hạn liên quan.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <div className="space-y-8 rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-5 shadow-sm sm:p-8">
          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">1. Thông tin chúng tôi có thể thu thập</h2>
            <p>
              Hiện tại, Gác Truyện chủ yếu là website đọc nội dung. Tùy theo tính năng được bật, website có thể thu thập hoặc xử lý một số thông tin cơ bản như:
            </p>
            <ul className="space-y-2">
              {collectedInfo.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Nếu website chưa có đăng nhập hoặc biểu mẫu, chúng tôi không chủ động yêu cầu thông tin cá nhân nhạy cảm.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">2. Mục đích sử dụng thông tin</h2>
            <p>Thông tin được sử dụng để:</p>
            <ul className="space-y-2">
              {useCases.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">3. Cookie và công cụ phân tích</h2>
            <p>Website có thể sử dụng cookie hoặc công cụ phân tích lưu lượng truy cập để hiểu cách người dùng sử dụng trang.</p>
            <p>
              Các công cụ này có thể ghi nhận dữ liệu kỹ thuật như trình duyệt, thiết bị, thời gian truy cập và trang đã xem. Dữ liệu này thường được dùng ở dạng tổng hợp để cải thiện website.
            </p>
            <p>Nếu không muốn dùng cookie, bạn có thể điều chỉnh cài đặt trong trình duyệt.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">4. Dịch vụ bên thứ ba</h2>
            <p>Gác Truyện có thể sử dụng các dịch vụ bên thứ ba để vận hành website, ví dụ:</p>
            <ul className="space-y-2">
              {thirdPartyServices.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Các bên thứ ba này có thể xử lý dữ liệu theo chính sách riêng của họ.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">5. Thanh toán và hội viên</h2>
            <p>
              Nếu tính năng hội viên hoặc thanh toán được triển khai, thông tin thanh toán sẽ được xử lý thông qua đơn vị cung cấp dịch vụ thanh toán. Gác Truyện không nên lưu trực tiếp thông tin nhạy cảm như số thẻ ngân hàng đầy đủ.
            </p>
            <p>Nếu hiện tại tính năng thanh toán chưa được tích hợp, mọi thông tin về hội viên chỉ mang tính giới thiệu hoặc thử nghiệm.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">6. Bảo mật</h2>
            <p>
              Chúng tôi cố gắng áp dụng các biện pháp hợp lý để bảo vệ website và dữ liệu liên quan. Tuy nhiên, không có hệ thống nào an toàn tuyệt đối. Người dùng nên tránh gửi thông tin nhạy cảm nếu website chưa có tính năng bảo mật/tài khoản rõ ràng.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">7. Quyền của người dùng</h2>
            <p>
              Nếu website có tài khoản, biểu mẫu hoặc lưu thông tin cá nhân trong tương lai, bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bằng cách liên hệ với chúng tôi qua kênh liên hệ được công bố.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">8. Nội dung dành cho trẻ em</h2>
            <p>
              Gác Truyện không chủ đích thu thập thông tin cá nhân của trẻ em. Nếu phát hiện dữ liệu cá nhân của trẻ em được gửi lên website không phù hợp, chúng tôi sẽ cố gắng xóa hoặc xử lý khi nhận được yêu cầu hợp lệ.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">9. Thay đổi chính sách</h2>
            <p>Chính sách quyền riêng tư có thể được cập nhật khi website thay đổi tính năng. Phiên bản mới sẽ có hiệu lực khi được đăng trên trang này.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">10. Liên hệ</h2>
            <p>
              Nếu bạn có câu hỏi về quyền riêng tư hoặc dữ liệu cá nhân, vui lòng liên hệ qua kênh liên hệ được công bố trên Gác Truyện.
            </p>
          </section>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-900/75">
            Phần Điều khoản sử dụng và Chính sách quyền riêng tư này là nội dung nền tảng cho website cá nhân/MVP, không phải tư vấn pháp lý chuyên nghiệp. Khi site có thanh toán thật, tài khoản người dùng thật hoặc thu thập dữ liệu nhiều hơn, cần cập nhật lại cho sát thực tế.
          </div>
        </div>
      </article>
    </div>
  );
}
