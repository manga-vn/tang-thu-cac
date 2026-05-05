import { getAllStories } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";

export const metadata = {
  title: "Danh sách truyện - Tàng Thư Các",
  description: "Danh sách tất cả các bộ truyện có trên Tàng Thư Các",
};

export default async function StoriesPage() {
  const stories = await getAllStories();

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <div className="bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-amber-950">Danh sách truyện</h1>
          <p className="text-amber-800/70 mt-2">
            Khám phá các bộ truyện được cập nhật thường xuyên
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {stories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-amber-800/60 text-lg">Chưa có truyện nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
