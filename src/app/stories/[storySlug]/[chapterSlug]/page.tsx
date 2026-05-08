import { notFound } from "next/navigation";
import {
  getStoryBySlug,
  getChapterBySlug,
  getPreviousChapter,
  getNextChapter,
  getAllStories,
} from "@/lib/stories";
import ReadingLayout from "@/components/ReadingLayout";

interface PageProps {
  params: Promise<{ storySlug: string; chapterSlug: string }>;
}

export async function generateStaticParams() {
  const stories = await getAllStories();
  const params: Array<{ storySlug: string; chapterSlug: string }> = [];
  stories.forEach((story) => {
    story.chapters.forEach((chapter) => {
      params.push({ storySlug: story.slug, chapterSlug: chapter.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { storySlug, chapterSlug } = await params;
  const story = await getStoryBySlug(storySlug);
  const chapter = await getChapterBySlug(storySlug, chapterSlug);
  if (!story || !chapter) return {};
  return {
    title: `${chapter.title} – ${story.title} – Gác Truyện`,
    description: `Đọc ${chapter.title} của truyện ${story.title} tại Gác Truyện.`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { storySlug, chapterSlug } = await params;

  const [story, chapter, prevChapter, nextChapter] = await Promise.all([
    getStoryBySlug(storySlug),
    getChapterBySlug(storySlug, chapterSlug),
    getPreviousChapter(storySlug, chapterSlug),
    getNextChapter(storySlug, chapterSlug),
  ]);

  if (!story || !chapter) notFound();

  // Render markdown content: split on double newlines into paragraphs
  const paragraphs = chapter.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <ReadingLayout
      story={story}
      chapter={chapter}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
    >
      {paragraphs.map((paragraph, index) => (
        paragraph.startsWith('```') && paragraph.endsWith('```') ? (
          <pre key={index} className="mb-6 overflow-x-auto rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm leading-relaxed text-amber-950/80">
            <code>{paragraph.replace(/^```\w*\n?/, '').replace(/```$/, '').trim()}</code>
          </pre>
        ) : (
          <p key={index} className="mb-6">
            {renderInlineCode(paragraph)}
          </p>
        )
      ))}
    </ReadingLayout>
  );
}

function renderInlineCode(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded-md bg-amber-100/80 px-1.5 py-0.5 text-[0.9em] font-medium text-amber-900">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
