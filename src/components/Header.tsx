'use client';

import Link from 'next/link';
import { useState } from 'react';

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
          <Link href="/audio" className="text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium">
            🎧 Audio
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
          <Link href="/audio" className="block text-amber-800 hover:text-amber-950 text-sm font-medium py-1" onClick={() => setMenuOpen(false)}>
            🎧 Audio
          </Link>
          <Link href="/membership" className="block text-amber-800 hover:text-amber-950 text-sm font-medium py-1" onClick={() => setMenuOpen(false)}>
            👑 Hội viên
          </Link>
        </div>
      )}
    </header>
  );
}
