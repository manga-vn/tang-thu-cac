import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import GenreBadge from "@/components/GenreBadge";
import AudioBadge from "@/components/AudioBadge";
import ChapterList from "@/components/ChapterList";
import { getStoryBySlug, getAllStories } from "@/lib/stories";

interface PageProps {
  params: Promise<{ storySlug: string }>;
}

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((story) => ({ storySlug: story.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { storySlug } = await params;
  const story = await getStoryBySlug(storySlug);
  if (!story) return {};
  return {
    title: `${story.title} – Gác Truyện`,
    description: story.description,
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { storySlug } = await params;
  const story = await getStoryBySlug(storySlug);
  if (!story) notFound();

  const latestChapter = story.chapters[story.chapters.length - 1];
  const firstChapter = story.chapters[0];

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Hero / Info */}
      <div className="bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link href="/stories" className="inline-flex items-center gap-1 text-amber-700/60 hover:text-amber-900 text-sm mb-5 transition-colors">
            ← Danh sách truyện
          </Link>

          <div className="flex flex-col md:flex-row gap-7">
            {/* Cover */}
            <div className="w-44 md:w-52 shrink-0 mx-auto md:mx-0">
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg">
                {story.coverImage ? (
                  <Image src={story.coverImage} alt={story.title} fill className="object-cover"
                    sizes="(max-width:768px) 176px, 208px" unoptimized />
                ) : (
                  <CoverPlaceholder title={story.title} genre={story.genre[0]} />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-amber-950 leading-snug mb-1">{story.title}</h1>
              <p className="text-amber-700/70 text-sm mb-4">
                Tác giả: <span className="font-semibold text-amber-800">{story.author ?? 'Trung Vũ'}</span>
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {story.genre.map(g => <GenreBadge key={g} genre={g} />)}
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  story.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>{story.status}</span>
                {story.hasAudio && <AudioBadge small />}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-5 text-sm mb-5">
                <div className="text-center">
                  <p className="font-bold text-amber-950 text-lg">{story.chapters.length}</p>
                  <p className="text-amber-700/60 text-xs">Chương</p>
                </div>
                {story.views && (
                  <div className="text-center">
                    <p className="font-bold text-amber-950 text-lg">{story.views.toLocaleString('vi-VN')}</p>
                    <p className="text-amber-700/60 text-xs">Lượt đọc</p>
                  </div>
                )}
                {story.rating && (
                  <div className="text-center">
                    <p className="font-bold text-amber-950 text-lg">★ {story.rating}</p>
                    <p className="text-amber-700/60 text-xs">Đánh giá</p>
                  </div>
                )}
                {story.updatedAt && (
                  <div className="text-center">
                    <p className="font-bold text-amber-950 text-lg">
                      {new Date(story.updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                    </p>
                    <p className="text-amber-700/60 text-xs">Cập nhật</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-amber-900/80 leading-relaxed text-sm mb-6">{story.description}</p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {firstChapter && (
                  <Link href={`/stories/${story.slug}/${firstChapter.slug}`}
                    className="bg-[#8B5E34] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#6F4726] transition-colors text-sm">
                    📖 Đọc từ đầu
                  </Link>
                )}
                {latestChapter && (
                  <Link href={`/stories/${story.slug}/${latestChapter.slug}`}
                    className="border border-[#8B5E34] text-[#8B5E34] px-6 py-2.5 rounded-xl font-medium hover:bg-amber-50 transition-colors text-sm">
                    ⏩ Chương mới nhất
                  </Link>
                )}
                <button className="border border-amber-300 text-amber-700 px-5 py-2.5 rounded-xl font-medium hover:bg-amber-50 transition-colors text-sm cursor-not-allowed opacity-70" title="Sắp ra mắt">
                  🔔 Theo dõi
                </button>
                <button className="border border-amber-300 text-amber-700 px-5 py-2.5 rounded-xl font-medium hover:bg-amber-50 transition-colors text-sm cursor-not-allowed opacity-70" title="Sắp ra mắt">
                  ⭐ Đề cử
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs content */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Summary */}
        {story.summary && (
          <div className="bg-[#FFFDF8] border border-[#E5E0D8] rounded-2xl p-5">
            <h2 className="text-lg font-bold text-amber-950 mb-3">📝 Tóm tắt truyện</h2>
            <div className="text-amber-900/80 leading-relaxed text-sm space-y-3">
              {story.summary.split('\n\n').map((p, i) => <p key={i}>{p.trim()}</p>)}
            </div>
          </div>
        )}

        {/* Chapter list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-950">📋 Danh sách chương ({story.chapters.length})</h2>
          </div>
          <ChapterList chapters={story.chapters} storySlug={story.slug} />
        </div>

        {/* Audio section */}
        {story.hasAudio ? (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-purple-900 mb-2">🎧 Truyện audio</h2>
            <p className="text-purple-700/70 text-sm">Danh sách audio sẽ hiển thị tại đây.</p>
          </div>
        ) : null}

        {/* Comments placeholder */}
        <div className="bg-[#FFFDF8] border border-[#E5E0D8] rounded-2xl p-6 text-center">
          <span className="text-4xl block mb-3">💬</span>
          <h3 className="font-bold text-amber-950 mb-1">Bình luận</h3>
          <p className="text-amber-700/60 text-sm">Tính năng bình luận đang được phát triển. Sắp ra mắt!</p>
        </div>
      </div>
    </div>
  );
}
