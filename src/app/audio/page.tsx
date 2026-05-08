import Link from "next/link";
import AudioHubClient from "@/components/audio/AudioHubClient";
import { getAllStories } from "@/lib/stories";
import { getAudioStorySummaries } from "@/data/audio";

export const metadata = {
  title: "Audio Truyện - Gác Truyện",
  description: "Audio Hub của Gác Truyện: theo dõi các truyện có audio, đang sản xuất hoặc sắp có bản nghe theo chương.",
};

export default async function AudioPage() {
  const stories = await getAllStories();
  const audioSummaries = getAudioStorySummaries(stories);
  const availableCount = audioSummaries.reduce((total, item) => total + item.availableCount, 0);
  const producingCount = audioSummaries.reduce((total, item) => total + item.producingCount, 0);
  const plannedCount = audioSummaries.reduce((total, item) => total + item.plannedCount, 0);

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <section className="border-b border-[#E5E0D8] bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <Link href="/" className="text-sm font-medium text-amber-200 hover:text-white">
            ← Về trang chủ
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="mb-4 block text-5xl">🎧</span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Audio Truyện</h1>
            <p className="mt-4 text-base leading-8 text-amber-100/85 sm:text-lg">
              Nghe truyện theo chương, dành cho lúc nghỉ ngơi, di chuyển, làm việc nhẹ hoặc muốn theo dõi câu chuyện bằng âm thanh.
            </p>
            <p className="mt-4 max-w-2xl rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm leading-7 text-amber-50/80">
              Tính năng audio đang được phát triển. Một số truyện/chương có thể ở trạng thái sắp có hoặc đang sản xuất; chưa phải toàn bộ đều có bản nghe chính thức.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label="Chương có audio" value={availableCount} />
            <StatCard label="Đang sản xuất" value={producingCount} />
            <StatCard label="Sắp có" value={plannedCount} />
          </div>
        </div>
      </section>

      <AudioHubClient summaries={audioSummaries} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-amber-100/75">{label}</p>
    </div>
  );
}
