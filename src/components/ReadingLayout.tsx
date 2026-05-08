'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Chapter, Story } from '@/data/stories';
import SaveWordModal from '@/components/hoctientrung/SaveWordModal';

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

  // --- Lưu từ feature ---
  const [saveWord, setSaveWord] = useState<{ text: string; x: number; y: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const text = sel.toString().trim();
    // Only trigger for plausible Chinese text (1–8 chars, contains CJK)
    if (!text || text.length > 8 || !/[一-鿿]/.test(text)) {
      setSaveWord(null);
      return;
    }
    const range = sel.getRangeAt(0);
    const rect  = range.getBoundingClientRect();
    setSaveWord({ text, x: rect.left + rect.width / 2, y: rect.top + window.scrollY - 12 });
  }, []);

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    el.addEventListener('mouseup', handleMouseUp);
    // Also support touch
    el.addEventListener('touchend', handleMouseUp);
    return () => { el.removeEventListener('mouseup', handleMouseUp); el.removeEventListener('touchend', handleMouseUp); };
  }, [handleMouseUp]);

  const sourceLabel = `${story.title} – ${chapter.title}`;

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
              className="text-amber-800 hover:text-amber-950 text-sm px-2.5 py-1 rounded-lg hover:bg-amber-100 transition-colors"
              aria-label="Cỡ chữ"
            >
              Aa Cỡ chữ
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
      <article ref={articleRef} className="max-w-3xl mx-auto px-5 md:px-8 py-10 relative">
        <div className={`${current.value} ${current.lineHeight} text-amber-950/90 font-sans`}>
          {children}
        </div>
      </article>

      {/* Floating "Lưu từ" bubble on text selection */}
      {saveWord && !showModal && (
        <button
          onClick={() => { setShowModal(true); setSaveWord(null); }}
          style={{ position: 'absolute', top: saveWord.y, left: saveWord.x, transform: 'translate(-50%, -100%)' }}
          className="z-50 bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-amber-800 active:scale-95 transition-all whitespace-nowrap"
        >
          📚 Lưu từ
        </button>
      )}

      {/* Save word modal */}
      {showModal && (
        <SaveWordModal
          selectedText={saveWord?.text ?? window.getSelection()?.toString().trim() ?? ''}
          source={sourceLabel}
          onClose={() => setShowModal(false)}
        />
      )}

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
            ) : (
              <div className="flex flex-col bg-[#F8F5EF] border border-[#E5E0D8] rounded-xl px-4 py-3 opacity-60">
                <span className="text-xs text-amber-800/50 mb-1">← Chương trước</span>
                <span className="text-amber-900/60 font-medium text-sm">Đây là chương đầu</span>
              </div>
            )}

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
            ) : (
              <div className="flex flex-col bg-[#F8F5EF] border border-[#E5E0D8] rounded-xl px-4 py-3 text-right opacity-80">
                <span className="text-xs text-amber-800/50 mb-1">Chương sau →</span>
                <span className="text-amber-900/70 font-medium text-sm">Chưa có chương sau</span>
                <span className="text-xs text-amber-700/50 mt-1">Theo dõi để nhận chương mới</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
