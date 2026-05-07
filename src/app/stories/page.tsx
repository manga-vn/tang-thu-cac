import { getAllStories } from "@/lib/stories";
import StoriesClient from "./StoriesClient";

const STORIES_LIST_EXCLUDED_SLUGS = new Set(["tho-san-gia-tri"]);

export const metadata = {
  title: "Danh sách truyện – Gác Truyện",
  description: "Khám phá tất cả các bộ truyện trên Gác Truyện – tiên hiệp, đô thị, ngôn tình và nhiều thể loại khác.",
};

export default async function StoriesPage() {
  const stories = await getAllStories();
  const visibleStories = stories.filter(story => !STORIES_LIST_EXCLUDED_SLUGS.has(story.slug));
  return <StoriesClient stories={visibleStories} />;
}
