'use client';

import Image from 'next/image';
import Link from 'next/link';
import CoverPlaceholder from '@/components/CoverPlaceholder';
import GenreBadge from '@/components/GenreBadge';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { AudioStorySummary, getAudioStatusLabel } from '@/data/audio';

interface AudioStoryCardProps {
  summary: AudioStorySummary;
}

const STATUS_STYLES = {
  available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  producing: 'bg-blue-100 text-blue-700 border-blue-200',
  planned: 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function AudioStoryCard({ summary }: AudioStoryCardProps) {
  const { story, latestAudio } = summary;
  const primaryAction = summary.audioStatus === 'available' ? 'Nghe audio' : summary.audioStatus === 'producing' ? 'Xem truyện' : 'Audio sắp có';
  const primaryHref = summary.audioStatus === 'available' && latestAudio
    ? `/stories/${story.slug}/${latestAudio.chapterSlug}`
    : `/stories/${story.slug}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] shadow-sm transition-all hover:border-amber-300 hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        <Link href={`/stories/${story.slug}`} className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl bg-amber-50 sm:w-28">
          {story.coverImage ? (
            <Image src={story.coverImage} alt={story.title} fill className="object-cover" sizes="112px" unoptimized />
          ) : (
            <CoverPlaceholder title={story.title} genre={story.genre[0]} className="text-[9px]" />
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div>
              <Link href={`/stories/${story.slug}`} className="text-lg font-bold leading-snug text-amber-950 hover:text-amber-700">
                {story.title}
              </Link>
              <p className="mt-1 text-xs text-amber-700/65">{story.author}</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[summary.audioStatus]}`}>
              {getAudioStatusLabel(summary.audioStatus)}
            </span>
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {story.genre.slice(0, 3).map((genre) => <GenreBadge key={genre} genre={genre} />)}
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">{story.status}</span>
          </div>

          <p className="mb-3 line-clamp-2 text-sm leading-6 text-amber-900/70">{story.description}</p>

          <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-amber-800/65 sm:grid-cols-4">
            <span>{story.chapters.length} chương truyện</span>
            <span>{summary.availableCount} chương có audio</span>
            <span>{summary.producingCount} đang sản xuất</span>
            <span>{summary.plannedCount} sắp có</span>
          </div>

          {latestAudio && (
            <div className="mb-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900/75">
              <span className="font-semibold">Audio mới nhất:</span> {latestAudio.episodeTitle ?? latestAudio.chapterTitle}
              {summary.latestUpdatedAt && (
                <span className="ml-2 text-xs text-amber-700/50">
                  {new Date(summary.latestUpdatedAt).toLocaleDateString('vi-VN')}
                </span>
              )}
            </div>
          )}

          <div className="mb-4">
            <AudioPlayer audio={latestAudio} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={primaryHref}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                summary.audioStatus === 'planned'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-amber-700 text-white hover:bg-amber-800'
              }`}
            >
              {primaryAction}
            </Link>
            <Link href={`/stories/${story.slug}`} className="rounded-full border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50">
              Trang truyện
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
