'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AudioStoryCard from '@/components/audio/AudioStoryCard';
import { AudioStatus, AudioStorySummary, getAudioStatusLabel } from '@/data/audio';

interface AudioHubClientProps {
  summaries: AudioStorySummary[];
}

type FilterKey = 'all' | AudioStatus;
type SortKey = 'updated' | 'title' | 'audioCount';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'available', label: 'Có audio' },
  { key: 'producing', label: 'Đang sản xuất' },
  { key: 'planned', label: 'Sắp có' },
];

export default function AudioHubClient({ summaries }: AudioHubClientProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sort, setSort] = useState<SortKey>('updated');

  const filtered = useMemo(() => {
    const items = summaries.filter((summary) => filter === 'all' || summary.audioStatus === filter);
    return [...items].sort((a, b) => {
      if (sort === 'title') return a.story.title.localeCompare(b.story.title, 'vi');
      if (sort === 'audioCount') {
        const aCount = a.availableCount + a.producingCount + a.plannedCount;
        const bCount = b.availableCount + b.producingCount + b.plannedCount;
        return bCount - aCount;
      }
      return getTime(b.latestUpdatedAt ?? b.story.updatedAt) - getTime(a.latestUpdatedAt ?? a.story.updatedAt);
    });
  }, [filter, sort, summaries]);

  const producing = summaries.filter((summary) => summary.audioStatus === 'producing');
  const planned = summaries.filter((summary) => summary.audioStatus === 'planned');

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-8 rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-950">{summaries.length} truyện trong kế hoạch audio</p>
            <p className="mt-1 text-xs text-amber-800/60">Lọc theo trạng thái sản xuất và sắp xếp danh sách audio.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    filter === item.key ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 outline-none focus:border-amber-400"
            >
              <option value="updated">Mới cập nhật</option>
              <option value="title">Tên truyện</option>
              <option value="audioCount">Số chương audio</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-amber-950">Danh sách truyện audio</h2>
            <p className="mt-1 text-sm text-amber-800/60">Mỗi card đại diện cho một truyện và tiến độ audio của truyện đó.</p>
          </div>
          <span className="text-xs font-medium text-amber-700/60">{filtered.length} kết quả</span>
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((summary) => <AudioStoryCard key={summary.story.slug} summary={summary} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-8 text-center">
            <p className="font-semibold text-amber-950">Chưa có truyện ở trạng thái này.</p>
            <p className="mt-1 text-sm text-amber-800/60">Bạn có thể đổi bộ lọc hoặc quay lại danh sách truyện chữ.</p>
          </div>
        )}
      </section>

      <section className="mb-12 grid gap-4 lg:grid-cols-2">
        <StatusPanel title="Đang sản xuất" items={producing} empty="Chưa có chương nào đang sản xuất." />
        <StatusPanel title="Sắp có audio" items={planned} empty="Chưa có chương nào trong kế hoạch." />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-5">
          <h2 className="text-xl font-bold text-amber-950">Vì sao có Audio?</h2>
          <p className="mt-3 text-sm leading-7 text-amber-900/70">
            Audio giúp người đọc theo dõi truyện trong những lúc không tiện nhìn màn hình: nghỉ ngơi, di chuyển, làm việc nhẹ hoặc muốn nghe lại một chương có không khí riêng.
          </p>
        </div>
        <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-5">
          <h2 className="text-xl font-bold text-amber-950">Trạng thái phát triển</h2>
          <p className="mt-3 text-sm leading-7 text-amber-900/70">
            Audio Hub V1 mới là khu điều phối. Không phải toàn bộ truyện đều có audio chính thức; các bản nghe sẽ được cập nhật dần theo chương khi nội dung và giọng đọc đủ ổn.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatusPanel({ title, items, empty }: { title: string; items: AudioStorySummary[]; empty: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-5">
      <h2 className="text-xl font-bold text-amber-950">{title}</h2>
      {items.length > 0 ? (
        <div className="mt-4 space-y-3">
          {items.map((summary) => (
            <Link
              key={summary.story.slug}
              href={`/stories/${summary.story.slug}`}
              className="block rounded-xl bg-amber-50 px-4 py-3 hover:bg-amber-100"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-amber-950">{summary.story.title}</p>
                <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-amber-700">
                  {getAudioStatusLabel(summary.audioStatus)}
                </span>
              </div>
              {summary.latestAudio && (
                <p className="mt-1 text-sm text-amber-800/65">{summary.latestAudio.episodeTitle ?? summary.latestAudio.chapterTitle}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-amber-800/60">{empty}</p>
      )}
    </div>
  );
}

function getTime(value?: string) {
  return new Date(value ?? '1970-01-01').getTime();
}
