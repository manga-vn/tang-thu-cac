import Link from "next/link";
import Image from "next/image";
import { getLatestChapters, getAllStories } from "@/lib/stories";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import StoryCard from "@/components/StoryCard";

export default async function HomePage() {
  const [latestChapters, allStories] = await Promise.all([
    getLatestChapters(2),
    getAllStories(),
  ]);

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Hero Section */}
      <section className="bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            Tàng Thư Các
          </h1>
          <p className="text-xl text-amber-800/70 max-w-2xl mx-auto mb-8">
            Nơi lưu trữ các bộ truyện do tác giả tự sáng tác.
          </p>
          <Link
            href="/stories"
            className="inline-block bg-[#8B5E34] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#6F4726] transition-colors"
          >
            Danh sách truyện
          </Link>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-[#F8F5EF]">
        <h2 className="text-2xl font-bold text-amber-950 mb-6">
          Chương mới cập nhật
        </h2>
        {latestChapters.length > 0 ? (
          <div className="space-y-4">
            {latestChapters.map(({ story, chapter }) => (
              <Link
                key={`${story.id}-${chapter.id}`}
                href={`/stories/${story.slug}/${chapter.slug}`}
                className="block bg-[#FFFDF8] rounded-lg border border-[#E5E0D8] p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-amber-50 rounded flex-shrink-0 relative overflow-hidden">
                    {story.coverImage ? (
                      <Image
                        src={story.coverImage}
                        alt={story.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized
                      />
                    ) : (
                      <CoverPlaceholder title={story.title} className="text-xs" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-amber-950 truncate">
                      {story.title}
                    </h3>
                    <p className="text-amber-800/70 text-sm mb-2">
                      {chapter.title}
                    </p>
                    <span className="text-xs text-amber-800/50">
                      {new Date(chapter.publishedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-amber-800/60 text-center py-8">Chưa có chương nào</p>
        )}
      </section>

      {/* All Stories Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-amber-950">
            Tất cả truyện
          </h2>
          <Link
            href="/stories"
            className="text-amber-800 hover:text-amber-950 font-medium text-sm"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allStories.slice(0, 4).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </div>
  );
}
