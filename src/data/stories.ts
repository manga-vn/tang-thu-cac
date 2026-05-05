export interface Chapter {
  id: string;
  title: string;
  slug: string;
  chapterNumber: number;
  content: string;
  publishedAt: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  genre: string[];
  status: 'Đang viết' | 'Hoàn thành';
  description: string;
  summary?: string;
  chapters: Chapter[];
}
