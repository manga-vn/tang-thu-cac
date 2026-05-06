import Link from 'next/link';
import { Chapter } from '@/data/stories';
import VipBadge from './VipBadge';

interface ChapterListProps {
  chapters: Chapter[];
  storySlug: string;
  showNumbers?: boolean;
}

export default function ChapterList({ chapters, storySlug, showNumbers = true }: ChapterListProps) {
  return (
    <div className="space-y-1.5">
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={chapter.isVip ? '#' : `/stories/${storySlug}/${chapter.slug}`}
          className={`flex items-center justify-between bg-[#FFFDF8] hover:bg-amber-50 border border-[#E5E0D8] rounded-lg px-4 py-3 transition-colors group ${chapter.isVip ? 'opacity-80 cursor-default' : ''}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {showNumbers && (
              <span className="text-amber-800/40 text-xs font-mono w-6 shrink-0">{chapter.chapterNumber}</span>
            )}
            <span className="text-amber-950 text-sm font-medium group-hover:text-amber-700 transition-colors line-clamp-1">
              {chapter.title}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            {chapter.isVip && <VipBadge small />}
            <span className="text-amber-800/40 text-xs">
              {new Date(chapter.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
            </span>
            {!chapter.isVip && <span className="text-amber-600/50 text-sm group-hover:text-amber-600 transition-colors">→</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
