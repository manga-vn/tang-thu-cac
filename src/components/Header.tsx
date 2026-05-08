'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FEATURED_GENRES } from '@/data/genres';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#FFFDF8] border-b border-[#E5E0D8] sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📚</span>
          <span className="text-xl font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
            Gác Truyện
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium">
            Trang chủ
          </Link>
          <Link href="/stories" className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium">
            Danh sách truyện
          </Link>
          <div className="group relative">
            <button className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium py-2">
              Thể loại
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#E5E0D8] bg-[#FFFDF8] p-3 shadow-xl">
                {FEATURED_GENRES.map(genre => (
                  <Link
                    key={genre.name}
                    href={`/stories?category=${genre.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  >
                    <span className="text-xl">{genre.emoji}</span>
                    <span>
                      <span className="block text-sm font-semibold text-amber-950">{genre.name}</span>
                      <span className="block text-xs text-amber-800/55">{genre.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/audio" className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium">
            🎧 Audio
          </Link>
          <Link href="/hoc-tieng-trung" className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium">
            🀄 Học Tiếng Trung
          </Link>
          <Link
            href="/membership"
            className="bg-amber-700 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-amber-800 transition-colors"
          >
            👑 Hội viên
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-amber-900 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Mở menu"
        >
          <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-t border-[#E5E0D8] px-4 py-3 space-y-3">
          <Link href="/" className="block text-amber-800 hover:text-amber-950 text-sm font-medium py-1" onClick={() => setMenuOpen(false)}>
            Trang chủ
          </Link>
          <Link href="/stories" className="block text-amber-800 hover:text-amber-950 text-sm font-medium py-1" onClick={() => setMenuOpen(false)}>
            Danh sách truyện
          </Link>
          <div className="rounded-xl bg-amber-50/70 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-800/60">Thể loại</p>
            <div className="grid grid-cols-2 gap-2">
              {FEATURED_GENRES.map(genre => (
                <Link
                  key={genre.name}
                  href={`/stories?category=${genre.slug}`}
                  className="rounded-lg bg-white px-2.5 py-2 text-sm font-medium text-amber-800 hover:text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mr-1">{genre.emoji}</span>{genre.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/audio" className="block text-amber-800 hover:text-amber-950 text-sm font-medium py-1" onClick={() => setMenuOpen(false)}>
            🎧 Audio
          </Link>
          <Link href="/hoc-tieng-trung" className="block text-amber-800 hover:text-amber-950 text-sm font-medium py-1" onClick={() => setMenuOpen(false)}>
            🀄 Học Tiếng Trung
          </Link>
          <Link href="/membership" className="block text-amber-800 hover:text-amber-950 text-sm font-medium py-1" onClick={() => setMenuOpen(false)}>
            👑 Hội viên
          </Link>
        </div>
      )}
    </header>
  );
}
