import Link from 'next/link';
import Image from 'next/image';
import CoverPlaceholder from '@/components/CoverPlaceholder';
import { Story } from '@/data/stories';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const genreText = story.genre.slice(0, 2).join(' · ');

  return (
    <div className="bg-[#FFFDF8] rounded-lg shadow-sm border border-[#E5E0D8] overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[3/4] bg-amber-50 relative">
        {story.coverImage ? (
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <CoverPlaceholder title={story.title} genre={genreText} />
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-[#FFFDF8]/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-amber-900">
            {story.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-amber-950 line-clamp-1 mb-2">
          {story.title}
        </h3>
        <div className="flex flex-wrap gap-1 mb-2">
          {story.genre.map((g) => (
            <span
              key={g}
              className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs"
            >
              {g}
            </span>
          ))}
        </div>
        <p className="text-amber-900/70 text-sm line-clamp-2 mb-3">
          {story.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-amber-800/60">
            {story.chapters.length} chương
          </span>
          <Link
            href={`/stories/${story.slug}`}
            className="bg-[#8B5E34] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#6F4726] transition-colors"
          >
            Đọc truyện
          </Link>
        </div>
      </div>
    </div>
  );
}
