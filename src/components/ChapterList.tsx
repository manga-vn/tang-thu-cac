import Link from 'next/link';
import { Chapter } from '@/data/stories';

interface ChapterListProps {
  chapters: Chapter[];
  storySlug: string;
  showNumbers?: boolean;
}

export default function ChapterList({ chapters, storySlug, showNumbers = true }: ChapterListProps) {
  return (
    <div className="space-y-2">
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={`/stories/${storySlug}/${chapter.slug}`}
          className="block bg-[#FFFDF8] hover:bg-[#FFF5EB] border border-[#E5E0D8] rounded-lg px-4 py-3 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-amber-950 font-medium">
              {showNumbers && `${chapter.chapterNumber}. `}
              {chapter.title}
            </span>
            <span className="text-amber-700/50 text-sm">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
