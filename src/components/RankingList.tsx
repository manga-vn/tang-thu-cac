import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/data/stories';
import CoverPlaceholder from './CoverPlaceholder';

interface RankingListProps {
  stories: Story[];
}

export default function RankingList({ stories }: RankingListProps) {
  const rankColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

  return (
    <div className="space-y-3">
      {stories.map((story, index) => (
        <Link
          key={story.id}
          href={`/stories/${story.slug}`}
          className="flex items-center gap-3 bg-[#FFFDF8] border border-[#E5E0D8] rounded-lg p-3 hover:shadow-sm hover:border-amber-300 transition-all group"
        >
          <span className={`text-2xl font-bold w-8 text-center shrink-0 ${rankColors[index] ?? 'text-amber-900/40'}`}>
            {index + 1}
          </span>
          <div className="w-10 h-14 bg-amber-50 rounded shrink-0 relative overflow-hidden">
            {story.coverImage ? (
              <Image src={story.coverImage} alt={story.title} fill className="object-cover" sizes="40px" unoptimized />
            ) : (
              <CoverPlaceholder title={story.title} className="text-[8px]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-amber-950 text-sm line-clamp-1 group-hover:text-amber-700 transition-colors">
              {story.title}
            </p>
            <p className="text-amber-800/60 text-xs mt-0.5">{story.author ?? 'Tác giả'}</p>
            <p className="text-amber-700/60 text-xs mt-1">
              {(story.views ?? 0).toLocaleString('vi-VN')} lượt đọc
            </p>
          </div>
          {story.rating && (
            <span className="text-xs text-amber-600 font-semibold shrink-0">★ {story.rating}</span>
          )}
        </Link>
      ))}
    </div>
  );
}
