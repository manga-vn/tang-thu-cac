'use client';

import { useState, useMemo } from 'react';
import { Story } from '@/data/stories';
import StoryCard from '@/components/StoryCard';
import { MAIN_GENRES } from '@/data/genres';

interface Props {
  stories: Story[];
  initialGenre?: string;
}

export default function StoriesClient({ stories, initialGenre = '' }: Props) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    stories.forEach(s => s.genre.forEach(g => genres.add(g)));
    return MAIN_GENRES.filter(g => genres.has(g));
  }, [stories]);

  const filtered = useMemo(() => {
    return stories.filter(story => {
      const matchSearch = !search || story.title.toLowerCase().includes(search.toLowerCase()) ||
        (story.author ?? '').toLowerCase().includes(search.toLowerCase());
      const matchGenre = !selectedGenre || story.genre.includes(selectedGenre);
      return matchSearch && matchGenre;
    });
  }, [stories, search, selectedGenre]);

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Header */}
      <div className="bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-amber-950">Danh sách truyện</h1>
          <p className="text-amber-800/60 mt-1 text-sm">
            {stories.length} bộ truyện đang có · Tìm kiếm và lọc theo thể loại
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search + Filter bar */}
        <div className="bg-[#FFFDF8] border border-[#E5E0D8] rounded-2xl p-4 mb-6 space-y-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">🔍</span>
            <input
              type="text"
              placeholder="Tìm theo tên truyện hoặc tác giả…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-amber-50 border border-[#E5E0D8] rounded-xl text-amber-950 text-sm placeholder-amber-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-700">✕</button>
            )}
          </div>

          {/* Genres + Layout toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setSelectedGenre('')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!selectedGenre ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}>
              Tất cả
            </button>
            {allGenres.map(g => (
              <button key={g} onClick={() => setSelectedGenre(g === selectedGenre ? '' : g)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedGenre === g ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}>
                {g}
              </button>
            ))}
            <div className="ml-auto flex gap-1">
              <button onClick={() => setLayout('grid')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${layout === 'grid' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-700'}`}>
                ⊞
              </button>
              <button onClick={() => setLayout('list')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${layout === 'list' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-700'}`}>
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <>
            <p className="text-amber-800/50 text-xs mb-4">Hiển thị {filtered.length} / {stories.length} truyện</p>
            {layout === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {filtered.map(story => <StoryCard key={story.id} story={story} layout="grid" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(story => <StoryCard key={story.id} story={story} layout="list" />)}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">📭</span>
            <p className="text-amber-800/60 text-lg font-medium">Không tìm thấy truyện nào</p>
            <p className="text-amber-700/40 text-sm mt-1">Thử thay đổi từ khóa hoặc chọn thể loại khác</p>
            <button onClick={() => { setSearch(''); setSelectedGenre(''); }}
              className="mt-5 bg-amber-700 text-white px-5 py-2 rounded-full text-sm hover:bg-amber-800 transition-colors">
              Xem tất cả truyện
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
