import Link from 'next/link';
import Image from 'next/image';
import CoverPlaceholder from '@/components/CoverPlaceholder';
import GenreBadge from '@/components/GenreBadge';
import AudioBadge from '@/components/AudioBadge';
import { Story } from '@/data/stories';

interface StoryCardProps {
  story: Story;
  layout?: 'grid' | 'list';
}

export default function StoryCard({ story, layout = 'grid' }: StoryCardProps) {
  if (layout === 'list') {
    return (
      <div className="bg-[#FFFDF8] rounded-xl border border-[#E5E0D8] hover:shadow-md hover:border-amber-300 transition-all overflow-hidden">
        <div className="flex gap-4 p-4">
          <div className="w-20 h-28 bg-amber-50 rounded-lg shrink-0 relative overflow-hidden">
            {story.coverImage ? (
              <Image src={story.coverImage} alt={story.title} fill className="object-cover" sizes="80px" unoptimized />
            ) : (
              <CoverPlaceholder title={story.title} className="text-[9px]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-amber-950 line-clamp-2 leading-snug">{story.title}</h3>
              {story.hasAudio && <AudioBadge small />}
            </div>
            <p className="text-amber-700/70 text-xs mb-2">{story.author ?? 'Tác giả'}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {story.genre.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                story.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>{story.status}</span>
            </div>
            <p className="text-amber-900/70 text-sm line-clamp-2 mb-3">{story.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-amber-700/60">
                <span>📖 {story.chapters.length} chương</span>
                {story.views && <span>👁 {story.views.toLocaleString('vi-VN')}</span>}
                {/* {story.rating && <span>★ {story.rating}</span>} */}
              </div>
              <Link href={`/stories/${story.slug}`}
                className="bg-[#8B5E34] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#6F4726] transition-colors shrink-0">
                Đọc truyện
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className="bg-[#FFFDF8] rounded-xl shadow-sm border border-[#E5E0D8] overflow-hidden hover:shadow-md hover:border-amber-300 transition-all group">
      <div className="aspect-[3/4] bg-amber-50 relative">
        {story.coverImage ? (
          <Image src={story.coverImage} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" unoptimized />
        ) : (
          <CoverPlaceholder title={story.title} genre={story.genre[0]} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          <span className={`px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm ${
            story.status === 'Hoàn thành'
              ? 'bg-green-100/90 text-green-700'
              : 'bg-blue-100/90 text-blue-700'
          }`}>{story.status}</span>
          {story.hasAudio && <AudioBadge small />}
        </div>
        {story.rating && (
          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-yellow-300 text-xs px-2 py-0.5 rounded font-medium hidden">
            ★ {story.rating}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-amber-950 line-clamp-2 text-sm leading-snug mb-1">{story.title}</h3>
        <p className="text-amber-700/60 text-xs mb-2">{story.author ?? 'Tác giả'}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {story.genre.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-amber-800/50">{story.chapters.length} chương</span>
          <Link href={`/stories/${story.slug}`}
            className="bg-[#8B5E34] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[#6F4726] transition-colors">
            Đọc
          </Link>
        </div>
      </div>
    </div>
  );
}
