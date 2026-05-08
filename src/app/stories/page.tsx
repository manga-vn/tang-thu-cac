import { getAllStories } from "@/lib/stories";
import StoriesClient from "./StoriesClient";

interface PageProps {
  searchParams?: Promise<{ genre?: string }>;
}

export const metadata = {
  title: "Danh sách truyện – Gác Truyện",
  description: "Khám phá tất cả các bộ truyện trên Gác Truyện – tiên hiệp, đô thị, ngôn tình và nhiều thể loại khác.",
};

export default async function StoriesPage({ searchParams }: PageProps) {
  const stories = await getAllStories();
  const query = await searchParams;
  return <StoriesClient stories={stories} initialGenre={query?.genre ?? ''} />;
}
