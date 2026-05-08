import Link from "next/link";

export const metadata = {
  title: "Về Gác Truyện - Gác Truyện",
  description: "Gác Truyện là không gian đọc truyện trực tuyến cho các câu chuyện dài hơi, dễ theo dõi và được chăm chút theo từng chương.",
};

const buildingItems = [
  "Một thư viện truyện gọn, dễ đọc, dễ theo dõi.",
  "Trang chi tiết truyện có tóm tắt, danh sách chương và trạng thái cập nhật rõ ràng.",
  "Trải nghiệm đọc chương sạch, ít phân tâm.",
  "Hệ thống phân loại thể loại và tag để người đọc tìm truyện dễ hơn.",
  "Một góc học ngoại ngữ qua hội thoại đời sống, đặt trong tinh thần học qua ngữ cảnh như đang đọc một câu chuyện nhỏ.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <section className="border-b border-[#E5E0D8] bg-[#FFFDF8]">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <Link href="/" className="text-sm font-medium text-amber-700 hover:text-amber-900">
            ← Về trang chủ
          </Link>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-amber-950 sm:text-4xl">
            Về Gác Truyện
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-amber-900/70 sm:text-base">
            Gác Truyện là một không gian đọc truyện trực tuyến được xây dựng cho những câu chuyện dài hơi, có không khí riêng và được chăm chút theo từng chương.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <div className="space-y-8 rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-5 shadow-sm sm:p-8">
          <section className="space-y-4 text-sm leading-7 text-amber-900/75 sm:text-base">
            <p>
              Ở đây, chúng tôi tập trung vào các truyện tự sáng tác thuộc nhiều màu sắc khác nhau: tiên hiệp, huyền huyễn, đô thị, tình cảm, sảng văn và những câu chuyện mang yếu tố bí ẩn đời sống. Mục tiêu không chỉ là đăng truyện thật nhanh, mà là tạo một nơi đọc ổn định, dễ theo dõi, dễ lưu lại mạch truyện và phù hợp với người đọc trên cả máy tính lẫn điện thoại.
            </p>
            <p>
              Gác Truyện hiện vẫn đang trong giai đoạn phát triển. Một số tính năng như audio truyện, hội viên, đề cử, theo dõi truyện và trải nghiệm đọc nâng cao có thể được thử nghiệm dần theo thời gian.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-950">Chúng tôi đang xây gì?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
              {buildingItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">Về nội dung</h2>
            <p>
              Các truyện trên Gác Truyện được xây dựng theo hướng dài hạn. Một số truyện có thể được viết, chỉnh sửa, biên tập và cập nhật dần theo từng giai đoạn. Vì vậy, tên chương, mô tả, thể loại hoặc trạng thái truyện có thể được điều chỉnh để đồng bộ hơn với bản chính thức.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">Về việc sử dụng AI</h2>
            <p>
              Một số khâu trong quá trình xây dựng nội dung và website có thể có sự hỗ trợ của công cụ AI, ví dụ như ghi chú ý tưởng, dựng dàn ý, kiểm tra continuity, hỗ trợ biên tập, tạo bản nháp giao diện hoặc tối ưu trải nghiệm đọc.
            </p>
            <p>
              Tuy nhiên, định hướng nội dung, lựa chọn cuối cùng, biên tập và kiểm soát chất lượng vẫn do người vận hành site quyết định.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-7 text-amber-900/75 sm:text-base">
            <h2 className="text-xl font-bold text-amber-950">Gác Truyện dành cho ai?</h2>
            <p>
              Gác Truyện dành cho người thích đọc truyện theo chương, thích theo dõi mạch truyện dài hơi, thích không khí riêng của từng bộ truyện và muốn có một nơi đọc đơn giản, không quá ồn ào.
            </p>
            <p>
              Ngoài truyện, Gác Truyện cũng dành cho người muốn học ngoại ngữ qua ngữ cảnh đời sống. Trước mắt có thể bắt đầu với tiếng Trung, sau đó mở rộng sang tiếng Anh, tiếng Hàn, tiếng Đài hoặc các ngôn ngữ khác. Cách học ưu tiên là học qua hội thoại, tình huống gia đình, sinh hoạt hằng ngày và các cảnh đời sống như một câu chuyện ngắn, để người học có thể dùng được trong giao tiếp thật.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
