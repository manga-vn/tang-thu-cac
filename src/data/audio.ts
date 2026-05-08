import type { Story } from '@/data/stories';

export type AudioStatus = 'available' | 'producing' | 'planned';

export interface AudioChapterItem {
  id: string;
  storySlug: string;
  chapterSlug: string;
  chapterTitle: string;
  episodeTitle?: string;
  status: AudioStatus;
  audioUrl?: string;
  durationText?: string;
  narrator?: string;
  updatedAt?: string;
  publishedAt?: string;
  description?: string;
}

export interface AudioStorySummary {
  story: Story;
  audioChapters: AudioChapterItem[];
  audioStatus: AudioStatus;
  availableCount: number;
  producingCount: number;
  plannedCount: number;
  latestAudio?: AudioChapterItem;
  latestUpdatedAt?: string;
}

export const AUDIO_CHAPTERS: AudioChapterItem[] = [
  {
    id: 'ngay-em-di-chuong-1-audio',
    storySlug: 'ngay-em-di',
    chapterSlug: 'chuong-1',
    chapterTitle: 'Chương 1',
    episodeTitle: 'Ngày em đi - Chương 1',
    status: 'producing',
    narrator: 'Gác Truyện',
    updatedAt: '2026-05-08',
    description: 'Đang dựng bản nghe thử cho nhịp truyện tình cảm trưởng thành.',
  },
  {
    id: 'bi-mat-khu-pho-cu-chuong-1-audio',
    storySlug: 'bi-mat-khu-pho-cu',
    chapterSlug: 'chuong-1',
    chapterTitle: 'Chương 1: Nhà Số 17',
    episodeTitle: 'Nhà Số 17',
    status: 'producing',
    narrator: 'Gác Truyện',
    updatedAt: '2026-05-08',
    description: 'Đang thử giọng đọc chậm, lạnh, hợp không khí khu phố cũ.',
  },
  {
    id: 'tho-san-gia-tri-chuong-1-audio',
    storySlug: 'tho-san-gia-tri',
    chapterSlug: 'chuong-1',
    chapterTitle: 'Chương 1: Món Quà Và Lời Nguyền',
    status: 'planned',
    updatedAt: '2026-05-08',
    description: 'Sẽ ưu tiên bản đọc rõ nhịp tính toán, săn món hời và cảm giác rủi ro.',
  },
  {
    id: 'vong-xuyen-diep-chuong-1-audio',
    storySlug: 'vong-xuyen-diep',
    chapterSlug: 'chuong-1',
    chapterTitle: 'Chương 1',
    status: 'planned',
    updatedAt: '2026-05-06',
    description: 'Dự kiến xử lý theo hướng trầm, chậm, nhiều khoảng lặng.',
  },
];

const STATUS_PRIORITY: Record<AudioStatus, number> = {
  available: 3,
  producing: 2,
  planned: 1,
};

export function getAudioStatusLabel(status: AudioStatus) {
  switch (status) {
    case 'available':
      return 'Có audio';
    case 'producing':
      return 'Đang sản xuất';
    case 'planned':
      return 'Sắp có';
  }
}

export function getAudioByStory(storySlug: string) {
  return AUDIO_CHAPTERS.filter((item) => item.storySlug === storySlug);
}

export function getAudioByChapter(storySlug: string, chapterSlug: string) {
  return AUDIO_CHAPTERS.find((item) => item.storySlug === storySlug && item.chapterSlug === chapterSlug);
}

export function getAudioStorySummaries(stories: Story[]): AudioStorySummary[] {
  return stories.reduce<AudioStorySummary[]>((summaries, story) => {
      const audioChapters = getAudioByStory(story.slug);
      if (audioChapters.length === 0 && !story.hasAudio) return summaries;

      const availableCount = audioChapters.filter((item) => item.status === 'available').length;
      const producingCount = audioChapters.filter((item) => item.status === 'producing').length;
      const plannedCount = audioChapters.filter((item) => item.status === 'planned').length;
      const audioStatus = audioChapters.reduce<AudioStatus>((current, item) => (
        STATUS_PRIORITY[item.status] > STATUS_PRIORITY[current] ? item.status : current
      ), story.hasAudio ? 'available' : 'planned');
      const latestAudio = [...audioChapters].sort((a, b) => getAudioTime(b) - getAudioTime(a))[0];
      const latestUpdatedAt = latestAudio?.updatedAt ?? latestAudio?.publishedAt;

      summaries.push({
        story,
        audioChapters,
        audioStatus,
        availableCount,
        producingCount,
        plannedCount,
        latestAudio,
        latestUpdatedAt,
      });

      return summaries;
    }, []);
}

export function getFeaturedAudio(summaries: AudioStorySummary[], limit = 4) {
  return [...summaries]
    .sort((a, b) => getSummaryTime(b) - getSummaryTime(a))
    .slice(0, limit);
}

function getAudioTime(item: AudioChapterItem) {
  return new Date(item.updatedAt ?? item.publishedAt ?? '1970-01-01').getTime();
}

function getSummaryTime(summary: AudioStorySummary) {
  return new Date(summary.latestUpdatedAt ?? summary.story.updatedAt ?? '1970-01-01').getTime();
}
