import Link from 'next/link';
import { Chapter, Story } from '@/data/stories';

interface ReadingLayoutProps {
  story: Story;
  chapter: Chapter;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
  children: React.ReactNode;
}

export default function ReadingLayout({
  story,
  chapter,
  prevChapter,
  nextChapter,
  children
}: ReadingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Navigation Bar */}
      <div className="sticky top-0 bg-[#FFFDF8] border-b border-[#E5E0D8] z-40">
        <div className="max-w-2xl md:max-w-prose mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/stories/${story.slug}`}
            className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium flex items-center gap-1"
          >
            ← Quay lại
          </Link>
          <Link
            href="/stories"
            className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium"
          >
            Danh sách truyện
          </Link>
        </div>
      </div>

      {/* Chapter Header */}
      <div className="bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="max-w-2xl md:max-w-prose mx-auto px-4 py-6">
          <Link
            href={`/stories/${story.slug}`}
            className="text-amber-800/60 hover:text-amber-950 text-sm mb-2 inline-block"
          >
            {story.title}
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-amber-950">
            {chapter.title}
          </h1>
        </div>
      </div>

      {/* Chapter Content */}
      <article className="max-w-2xl md:max-w-prose mx-auto px-4 py-8">
        <div className="prose prose-gray max-w-none">
          {children}
        </div>
      </article>

      {/* Chapter Navigation */}
      <div className="border-t border-[#E5E0D8] bg-[#FFFDF8]">
        <div className="max-w-2xl md:max-w-prose mx-auto px-4 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            {prevChapter ? (
              <Link
                href={`/stories/${story.slug}/${prevChapter.slug}`}
                className="w-full sm:w-auto px-4 py-3 bg-[#FFFDF8] border border-[#E5E0D8] rounded-lg hover:bg-[#FFF5EB] transition-colors"
              >
                <span className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="text-amber-800/60 text-xs">Chương trước</span>
                  <span className="text-amber-950 font-medium text-sm truncate max-w-[120px]">
                    {prevChapter.title}
                  </span>
                </span>
              </Link>
            ) : (
              <div className="w-full sm:w-auto invisible" aria-hidden="true">
                <div className="px-4 py-3" />
              </div>
            )}

            <Link
              href={`/stories/${story.slug}`}
              className="w-full sm:w-auto px-4 py-3 bg-[#8B5E34] text-white rounded-lg text-sm font-medium hover:bg-[#6F4726] transition-colors text-center"
            >
              Danh sách chương
            </Link>

            {nextChapter ? (
              <Link
                href={`/stories/${story.slug}/${nextChapter.slug}`}
                className="w-full sm:w-auto px-4 py-3 bg-[#FFFDF8] border border-[#E5E0D8] rounded-lg hover:bg-[#FFF5EB] transition-colors"
              >
                <span className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-2">
                  <span className="text-amber-800/60 text-xs">Chương sau</span>
                  <span className="text-amber-950 font-medium text-sm truncate max-w-[120px] text-right">
                    {nextChapter.title}
                  </span>
                </span>
              </Link>
            ) : (
              <div className="w-full sm:w-auto invisible" aria-hidden="true">
                <div className="px-4 py-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
