import { getAllStories } from "@/lib/stories";
import StoriesClient from "./StoriesClient";

export const metadata = {
  title: "Danh sách truyện – Gác Truyện",
  description: "Khám phá tất cả các bộ truyện trên Gác Truyện – tiên hiệp, đô thị, ngôn tình và nhiều thể loại khác.",
};

export default async function StoriesPage() {
  const stories = await getAllStories();
  return <StoriesClient stories={stories} />;
}
