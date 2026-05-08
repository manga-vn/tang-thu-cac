import Link from "next/link";
import { getAudioStories } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";
import AudioBadge from "@/components/AudioBadge";

export const metadata = {
  title: "Truyện Audio – Gác Truyện",
  description: "Vừa đọc vừa nghe – Truyện audio trên Gác Truyện.",
};

export default async function AudioPage() {
  const audioStories = await getAudioStories();

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <span className="text-5xl block mb-4">🎧</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Truyện Audio</h1>
          <p className="text-purple-200/80 max-w-xl mx-auto text-sm leading-relaxed">
            Vừa đọc vừa nghe – trải nghiệm truyện theo cách hoàn toàn mới. Lý tưởng khi di chuyển hoặc muốn thư giãn.
            Hiện website chưa có audio chính thức; khu này đang được phát triển.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {audioStories.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <AudioBadge />
              <span className="text-amber-800/60 text-sm">{audioStories.length} truyện có audio</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {audioStories.map(story => <StoryCard key={story.id} story={story} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            {/* Coming soon */}
            <div className="bg-white border border-purple-200 rounded-3xl p-12 max-w-2xl mx-auto shadow-sm">
              <span className="text-6xl block mb-5">🎙️</span>
              <h2 className="text-2xl font-bold text-purple-900 mb-3">Audio đang được phát triển</h2>
              <p className="text-purple-700/70 leading-relaxed mb-6">
                Sắp tới bạn có thể vừa đọc vừa nghe các bộ truyện yêu thích trên Gác Truyện. 
                Chúng tôi đang thu âm và sản xuất nội dung chất lượng cao — hãy đón chờ nhé!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
                {[
                  { icon: '🎭', title: 'Lồng tiếng', desc: 'Giọng đọc chuyên nghiệp, cảm xúc' },
                  { icon: '🎵', title: 'Nhạc nền', desc: 'Âm nhạc phù hợp với từng thể loại' },
                  { icon: '📱', title: 'Mobile-first', desc: 'Nghe mọi lúc, mọi nơi' },
                ].map(item => (
                  <div key={item.title} className="bg-purple-50 rounded-xl p-4">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <p className="font-semibold text-purple-900 text-sm mb-1">{item.title}</p>
                    <p className="text-purple-700/60 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/stories"
                className="inline-block bg-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-800 transition-colors">
                Đọc truyện trong lúc chờ đợi
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
