import Link from "next/link";
import Image from "next/image";
import {
  getLatestChapters,
  getFeaturedStories,
  getTopStories,
  getAudioStories,
  getRecentlyUpdatedStories,
} from "@/lib/stories";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import StoryCard from "@/components/StoryCard";
import SectionHeader from "@/components/SectionHeader";
import GenreBadge from "@/components/GenreBadge";
import RankingList from "@/components/RankingList";
import AudioBadge from "@/components/AudioBadge";

export const metadata = {
  title: "Gác Truyện – Đọc một chương, ở lại một đời.",
  description: "Website đọc truyện chữ – tiên hiệp, huyền huyễn, đô thị, ngôn tình. Gác Truyện là nơi lưu giữ những câu chuyện đáng đọc.",
};

const FEATURED_GENRES = [
  { name: "Tiên hiệp", emoji: "⚔️", desc: "Tu tiên, kiếm hiệp, huyền ảo" },
  { name: "Huyền huyễn", emoji: "🌌", desc: "Phép thuật, thế giới kỳ ảo" },
  { name: "Đô thị", emoji: "🏙️", desc: "Cuộc sống hiện đại, bí ẩn" },
  { name: "Ngôn tình", emoji: "💕", desc: "Tình yêu ngọt ngào, lãng mạn" },
  { name: "Sảng văn", emoji: "😄", desc: "Nhẹ nhàng, vui vẻ, giải trí" },
  { name: "Hài hước", emoji: "🎭", desc: "Hài hước, dí dỏm, thư giãn" },
];

const HOMEPAGE_EXCLUDED_STORY_SLUGS = new Set(["tho-san-gia-tri"]);

function shouldShowOnHomepage(story: { slug: string }) {
  return !HOMEPAGE_EXCLUDED_STORY_SLUGS.has(story.slug);
}

export default async function HomePage() {
  const [latestChapters, featured, topStories, audioStories, recentStories] = await Promise.all([
    getLatestChapters(6),
    getFeaturedStories(4),
    getTopStories(8),
    getAudioStories(),
    getRecentlyUpdatedStories(8),
  ]);
  const homepageLatestChapters = latestChapters.filter(({ story }) => shouldShowOnHomepage(story));
  const homepageFeatured = featured.filter(shouldShowOnHomepage);
  const homepageTopStories = topStories.filter(shouldShowOnHomepage);
  const homepageAudioStories = audioStories.filter(shouldShowOnHomepage);
  const homepageRecentStories = recentStories.filter(shouldShowOnHomepage);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat" />
        <div className="relative max-w-6xl mx-auto px-4 py-9 sm:py-16 md:py-28 text-center">
          <span className="inline-block text-4xl md:text-5xl mb-3 md:mb-4">📚</span>
          <h1 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4 tracking-tight">Gác Truyện</h1>
          <p className="text-lg md:text-2xl text-amber-200/90 font-light italic mb-4 md:mb-8">
            "Đọc một chương, ở lại một đời."
          </p>
          <p className="hidden sm:block text-amber-300/70 max-w-xl mx-auto mb-8 md:mb-10 text-sm leading-relaxed">
            Nơi những câu chuyện tiên hiệp, đô thị, ngôn tình được viết ra từ trái tim — dành cho bạn đọc đam mê truyện chữ.
          </p>
          <div className="mx-auto flex w-full max-w-md items-center justify-center gap-2 sm:max-w-none sm:gap-3">
            <Link href="/stories"
              className="flex-[1.15] sm:flex-none bg-white text-amber-900 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-amber-50 transition-colors shadow-lg text-center whitespace-nowrap">
              Đọc truyện ngay
            </Link>
            <Link href="/hoc-tieng-trung"
              className="flex-1 sm:flex-none bg-amber-200/95 text-amber-950 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-sm font-semibold shadow-sm ring-1 ring-white/25 hover:bg-amber-100 active:scale-[0.98] transition-all text-center whitespace-nowrap">
              <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5">
                <span aria-hidden="true">🇨🇳</span>
                <span>Học tiếng Trung</span>
                <span className="rounded-full bg-amber-950/10 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase text-amber-950/75">
                  Mới
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mới cập nhật ── */}
      <section id="latest" className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeader title="📖 Mới cập nhật" subtitle="Những chương vừa được đăng" href="/stories" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {homepageLatestChapters.map(({ story, chapter }) => (
            <Link key={`${story.id}-${chapter.id}`}
              href={`/stories/${story.slug}/${chapter.slug}`}
              className="flex gap-3 bg-[#FFFDF8] rounded-xl border border-[#E5E0D8] p-3 hover:shadow-md hover:border-amber-300 transition-all group">
              <div className="w-14 h-20 bg-amber-50 rounded-lg shrink-0 relative overflow-hidden">
                {story.coverImage ? (
                  <Image src={story.coverImage} alt={story.title} fill className="object-cover" sizes="56px" unoptimized />
                ) : (
                  <CoverPlaceholder title={story.title} className="text-[8px]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-amber-950 text-sm line-clamp-1 group-hover:text-amber-700 transition-colors">{story.title}</p>
                <p className="text-amber-700/60 text-xs mb-1">{story.author ?? ''}</p>
                <p className="text-amber-800/70 text-xs line-clamp-2">{chapter.title}</p>
                <p className="text-xs text-amber-700/40 mt-1.5">
                  {new Date(chapter.publishedAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Đề cử ── */}
      {homepageFeatured.length > 0 && (
        <section className="bg-amber-50/60 border-y border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto px-4 py-14">
            <SectionHeader title="⭐ Truyện đề cử" subtitle="Được tác giả chọn lọc và giới thiệu" href="/stories" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {homepageFeatured.map(story => <StoryCard key={story.id} story={story} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Top truyện + Thể loại (2 cột) ── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Top truyện */}
          <div className="lg:col-span-2">
            <SectionHeader title="🏆 Top truyện" subtitle="Xếp hạng theo lượt đọc" />
            {/* Tab giả lập */}
            <div className="flex gap-1 mb-5 bg-amber-100 p-1 rounded-xl w-fit">
              {['Top ngày', 'Top tuần', 'Top tháng'].map((tab, i) => (
                <span key={tab} className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-default ${i === 0 ? 'bg-white text-amber-900 shadow-sm' : 'text-amber-700'}`}>
                  {tab}
                </span>
              ))}
            </div>
            <RankingList stories={homepageTopStories.slice(0, 6)} />
          </div>

          {/* Thể loại nổi bật */}
          <div>
            <SectionHeader title="📚 Thể loại" />
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {FEATURED_GENRES.map(genre => (
                <Link key={genre.name} href={`/stories?genre=${encodeURIComponent(genre.name)}`}
                  className="flex items-center gap-3 bg-[#FFFDF8] border border-[#E5E0D8] rounded-xl p-3 hover:shadow-sm hover:border-amber-300 transition-all group">
                  <span className="text-2xl shrink-0">{genre.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-amber-950 text-sm group-hover:text-amber-700 transition-colors">{genre.name}</p>
                    <p className="text-amber-800/50 text-xs truncate">{genre.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Truyện mới ra ── */}
      {homepageRecentStories.length > 0 && (
        <section className="bg-amber-50/60 border-y border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto px-4 py-14">
            <SectionHeader title="🆕 Truyện mới ra" href="/stories" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {homepageRecentStories.slice(0, 4).map(story => <StoryCard key={story.id} story={story} layout="list" />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Audio ── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeader title="🎧 Truyện audio" subtitle="Vừa đọc vừa nghe" href="/audio" />
        {homepageAudioStories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {homepageAudioStories.map(story => (
              <div key={story.id} className="relative">
                <StoryCard story={story} />
                <div className="absolute top-2 left-2"><AudioBadge small /></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-10 text-center">
            <span className="text-5xl mb-4 block">🎧</span>
            <h3 className="text-lg font-bold text-purple-900 mb-2">Audio đang được phát triển</h3>
            <p className="text-purple-700/70 text-sm max-w-md mx-auto">
              Sắp tới bạn có thể vừa đọc vừa nghe các bộ truyện yêu thích. Hãy đón chờ nhé!
            </p>
            <Link href="/audio" className="inline-block mt-5 bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition-colors">
              Tìm hiểu thêm
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
