'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Chapter, Story } from '@/data/stories';

interface ReadingLayoutProps {
  story: Story;
  chapter: Chapter;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
  children: React.ReactNode;
}

const FONT_SIZES = [
  { label: 'Nhỏ', value: 'text-base', lineHeight: 'leading-relaxed' },
  { label: 'Vừa', value: 'text-lg', lineHeight: 'leading-loose' },
  { label: 'Lớn', value: 'text-xl', lineHeight: 'leading-loose' },
];

export default function ReadingLayout({ story, chapter, prevChapter, nextChapter, children }: ReadingLayoutProps) {
  const [fontIndex, setFontIndex] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const current = FONT_SIZES[fontIndex];

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-[#FFFDF8] border-b border-[#E5E0D8] z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <Link href={`/stories/${story.slug}`}
            className="text-amber-800 hover:text-amber-950 text-sm font-medium flex items-center gap-1.5 shrink-0">
            ← Danh sách chương
          </Link>
          <p className="text-amber-900/60 text-xs text-center truncate hidden sm:block">{story.title}</p>
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-amber-800 hover:text-amber-950 text-sm px-2 py-1 rounded hover:bg-amber-100 transition-colors"
              aria-label="Cỡ chữ"
            >
              Aa
            </button>
            {showSettings && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E5E0D8] rounded-xl shadow-lg p-3 z-50 w-44">
                <p className="text-xs text-amber-800/60 mb-2 font-medium">Cỡ chữ</p>
                <div className="flex gap-2">
                  {FONT_SIZES.map((fs, i) => (
                    <button key={fs.label} onClick={() => { setFontIndex(i); setShowSettings(false); }}
                      className={`flex-1 py-1 rounded-lg text-sm font-medium transition-colors ${
                        fontIndex === i ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}>
                      {fs.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chapter Header */}
      <div className="bg-[#FFFDF8] border-b border-[#E5E0D8]">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <Link href={`/stories/${story.slug}`} className="text-amber-700/70 hover:text-amber-900 text-sm mb-1 inline-block transition-colors">
            {story.title}
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-amber-950 mt-1">{chapter.title}</h1>
          <p className="text-xs text-amber-800/40 mt-2">
            {new Date(chapter.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-5 md:px-8 py-10">
        <div className={`${current.value} ${current.lineHeight} text-amber-950/90 font-sans`}>
          {children}
        </div>
      </article>

      {/* Chapter Navigation */}
      <div className="border-t border-[#E5E0D8] bg-[#FFFDF8]">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-3">
            {prevChapter ? (
              <Link href={`/stories/${story.slug}/${prevChapter.slug}`}
                className="flex flex-col bg-[#F8F5EF] border border-[#E5E0D8] rounded-xl px-4 py-3 hover:bg-amber-50 hover:border-amber-300 transition-all group">
                <span className="text-xs text-amber-800/50 mb-1">← Chương trước</span>
                <span className="text-amber-950 font-medium text-sm line-clamp-2 group-hover:text-amber-700 transition-colors">{prevChapter.title}</span>
              </Link>
            ) : <div />}

            <Link href={`/stories/${story.slug}`}
              className="flex items-center justify-center bg-[#8B5E34] text-white rounded-xl text-sm font-medium hover:bg-[#6F4726] transition-colors text-center px-3 py-3">
              📋 Mục lục
            </Link>

            {nextChapter ? (
              <Link href={`/stories/${story.slug}/${nextChapter.slug}`}
                className="flex flex-col bg-[#F8F5EF] border border-[#E5E0D8] rounded-xl px-4 py-3 hover:bg-amber-50 hover:border-amber-300 transition-all group text-right">
                <span className="text-xs text-amber-800/50 mb-1">Chương sau →</span>
                <span className="text-amber-950 font-medium text-sm line-clamp-2 group-hover:text-amber-700 transition-colors">{nextChapter.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
