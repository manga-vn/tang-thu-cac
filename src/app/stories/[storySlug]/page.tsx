import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CoverPlaceholder from '@/components/CoverPlaceholder';
import { getStoryBySlug, getAllStories } from "@/lib/stories";
import ChapterList from "@/components/ChapterList";

interface PageProps {
  params: Promise<{ storySlug: string }>;
}

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((story) => ({
    storySlug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { storySlug } = await params;
  const story = await getStoryBySlug(storySlug);

  if (!story) {
    return {};
  }

  return {
    title: `${story.title} - Tàng Thư Các`,
    description: story.description,
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { storySlug } = await params;
  const story = await getStoryBySlug(storySlug);

  if (!story) {
    notFound();
  }

  const latestChapter = story.chapters[story.chapters.length - 1];
  const firstChapter = story.chapters[0];
  const genreText = story.genre.slice(0, 2).join(' · ');

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Story Header */}
      <div className="bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/stories"
            className="text-amber-800/60 hover:text-amber-900 text-sm mb-4 inline-block"
          >
            ← Quay lại danh sách
          </Link>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover Image */}
            <div className="w-48 h-64 bg-amber-50 rounded-lg flex-shrink-0 relative mx-auto md:mx-0">
              {story.coverImage ? (
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 192px, 192px"
                  unoptimized
                />
              ) : (
                <CoverPlaceholder title={story.title} genre={genreText} />
              )}
            </div>

            {/* Story Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-amber-950 mb-2">
                {story.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {story.genre.map((g) => (
                  <span
                    key={g}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    story.status === "Đang viết"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {story.status}
                </span>
              </div>

              <p className="text-amber-900/80 leading-relaxed mb-6">
                {story.description}
              </p>

              {story.summary && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-amber-950 mb-2">
                    Tóm tắt truyện
                  </h3>
                  <div className="text-amber-900/80 leading-relaxed">
                    {story.summary.split('\n\n').map((paragraph, i) => (
                      <p key={i} className={i > 0 ? "mt-4" : ""}>
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {firstChapter && (
                  <Link
                    href={`/stories/${story.slug}/${firstChapter.slug}`}
                    className="bg-[#8B5E34] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#6F4726] transition-colors"
                  >
                    Đọc từ đầu
                  </Link>
                )}
                {latestChapter && (
                  <Link
                    href={`/stories/${story.slug}/${latestChapter.slug}`}
                    className="bg-transparent border border-[#8B5E34] text-[#8B5E34] px-6 py-2.5 rounded-lg font-medium hover:bg-[#8B5E34]/10 transition-colors"
                  >
                    Chương mới nhất
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 bg-[#F8F5EF]">
        <h2 className="text-2xl font-bold text-amber-950 mb-6">
          Danh sách chương ({story.chapters.length} chương)
        </h2>
        <ChapterList chapters={story.chapters} storySlug={story.slug} />
      </div>
    </div>
  );
}
