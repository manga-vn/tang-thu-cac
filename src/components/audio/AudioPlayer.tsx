import type { AudioChapterItem } from '@/data/audio';

interface AudioPlayerProps {
  audio?: AudioChapterItem;
}

export default function AudioPlayer({ audio }: AudioPlayerProps) {
  if (!audio?.audioUrl) {
    return (
      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/70 px-4 py-3 text-sm text-amber-800/75">
        Audio đang được chuẩn bị. Khi có bản nghe chính thức, player sẽ hiển thị tại đây.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-800/60">
        {audio.episodeTitle ?? audio.chapterTitle}
      </p>
      <audio controls preload="none" className="w-full">
        <source src={audio.audioUrl} />
        Trình duyệt của bạn chưa hỗ trợ phát audio trực tiếp.
      </audio>
    </div>
  );
}
