export interface Chapter {
  id: string;
  title: string;
  slug: string;
  chapterNumber: number;
  content: string;
  publishedAt: string;
  isVip?: boolean;
  audioUrl?: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  author: string;
  coverImage: string;
  genre: string[];
  status: string;
  description: string;
  summary?: string;
  featured?: boolean;
  hasAudio?: boolean;
  readCount?: number;
  views?: number;
  rating?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  chapters: Chapter[];
}
