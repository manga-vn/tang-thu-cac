import { notFound } from "next/navigation";
import { getStoryBySlug, getChapterBySlug, getPreviousChapter, getNextChapter, getAllStories } from "@/lib/stories";
import ReadingLayout from "@/components/ReadingLayout";

interface PageProps {
  params: Promise<{ storySlug: string; chapterSlug: string }>;
}

export async function generateStaticParams() {
  const stories = await getAllStories();
  const params: Array<{ storySlug: string; chapterSlug: string }> = [];

  stories.forEach((story) => {
    story.chapters.forEach((chapter) => {
      params.push({
        storySlug: story.slug,
        chapterSlug: chapter.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { storySlug, chapterSlug } = await params;
  const story = await getStoryBySlug(storySlug);
  const chapter = await getChapterBySlug(storySlug, chapterSlug);

  if (!story || !chapter) {
    return {};
  }

  return {
    title: `${chapter.title} - ${story.title} - Tàng Thư Các`,
    description: `Đọc ${chapter.title} của truyện ${story.title} trên Tàng Thư Các.`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { storySlug, chapterSlug } = await params;
  const story = await getStoryBySlug(storySlug);
  const chapter = await getChapterBySlug(storySlug, chapterSlug);
  const prevChapter = await getPreviousChapter(storySlug, chapterSlug);
  const nextChapter = await getNextChapter(storySlug, chapterSlug);

  if (!story || !chapter) {
    notFound();
  }

  // Convert content (with newlines) to paragraphs
  const paragraphs = chapter.content.split('\n\n').filter(p => p.trim());

  return (
    <ReadingLayout
      story={story}
      chapter={chapter}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-6 text-amber-950">
          {paragraph}
        </p>
      ))}
    </ReadingLayout>
  );
}
