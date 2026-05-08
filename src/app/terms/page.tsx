import Link from "next/link";

export const metadata = {
  title: "Điều khoản sử dụng - Gác Truyện",
  description: "Điều khoản sử dụng cơ bản khi truy cập và đọc nội dung trên Gác Truyện.",
};

const userContentRules = [
  "xúc phạm, đe dọa, quấy rối người khác",
  "vi phạm pháp luật",
  "spam hoặc quảng cáo không liên quan",
  "chứa mã độc hoặc hành vi gây hại cho website",
  "vi phạm bản quyền của bên thứ ba",
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <section className="border-b border-[#E5E0D8] bg-[#FFFDF8]">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <Link href="/" className="text-sm font-medium text-amber-700 hover:text-amber-900">
            ← Về trang chủ
          </Link>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-amber-950 sm:text-4xl">
            Điều khoản sử dụng
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-amber-900/70 sm:text-base">
            Khi truy cập và sử dụng Gác Truyện, bạn đồng ý với các điều khoản cơ bản dưới đây. Nếu không đồng ý, bạn có thể ngừng sử dụng website.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <div className="space-y-8 rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-5 shadow-sm sm:p-8">
          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">1. Mục đích sử dụng</h2>
            <p>
              Gác Truyện cung cấp nội dung đọc truyện, thông tin giới thiệu truyện, danh sách chương, một số nội dung học ngôn ngữ và các tính năng liên quan đến trải nghiệm đọc.
            </p>
            <p>Website có thể thay đổi, thêm hoặc gỡ nội dung/tính năng trong quá trình phát triển.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">2. Quyền sở hữu nội dung</h2>
            <p>
              Trừ khi có ghi chú khác, nội dung truyện, mô tả, cấu trúc bài học, thiết kế nội dung và các tài liệu hiển thị trên Gác Truyện thuộc quyền quản lý của website.
            </p>
            <p>
              Bạn không được sao chép, đăng lại, phân phối, bán lại hoặc sử dụng nội dung trên Gác Truyện cho mục đích thương mại nếu chưa có sự cho phép.
            </p>
            <p>Bạn có thể chia sẻ đường link đến trang truyện hoặc chương truyện, miễn là không sao chép lại toàn bộ nội dung.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">3. Nội dung do người dùng tương tác</h2>
            <p>
              Trong tương lai, nếu website có các tính năng như bình luận, theo dõi, đề cử, đánh giá hoặc tài khoản người dùng, bạn chịu trách nhiệm với nội dung mình gửi lên.
            </p>
            <p>Không được đăng nội dung:</p>
            <ul className="space-y-2">
              {userContentRules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <p>Gác Truyện có quyền ẩn, chỉnh hoặc xóa nội dung vi phạm nếu cần.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">4. Tính chính xác của thông tin</h2>
            <p>
              Gác Truyện cố gắng giữ thông tin truyện, chương, trạng thái cập nhật và thể loại ở mức chính xác. Tuy nhiên, vì website đang phát triển, có thể có sai sót, thay đổi hoặc nội dung chưa hoàn thiện.
            </p>
            <p>
              Chúng tôi có thể chỉnh sửa tên chương, mô tả, trạng thái truyện, thể loại hoặc nội dung liên quan để đồng bộ với bản chính thức hơn.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">5. Tính năng đang phát triển</h2>
            <p>
              Một số tính năng như audio truyện, hội viên, thanh toán, tài khoản, theo dõi truyện hoặc đề cử có thể đang trong giai đoạn thử nghiệm.
            </p>
            <p>
              Nếu một tính năng được ghi là “đang phát triển”, thông tin hiển thị chỉ mang tính định hướng và chưa tạo ra cam kết cung cấp dịch vụ đầy đủ.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">6. Liên kết bên ngoài</h2>
            <p>
              Website có thể chứa liên kết đến nền tảng hoặc dịch vụ bên ngoài. Gác Truyện không chịu trách nhiệm về nội dung, chính sách hoặc hoạt động của các website bên thứ ba đó.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">7. Thay đổi điều khoản</h2>
            <p>Các điều khoản này có thể được cập nhật khi website phát triển. Phiên bản mới sẽ có hiệu lực khi được đăng trên trang này.</p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">8. Liên hệ</h2>
            <p>
              Nếu bạn có câu hỏi về điều khoản sử dụng hoặc muốn phản hồi về nội dung trên website, vui lòng liên hệ qua kênh liên hệ được công bố trên Gác Truyện.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
