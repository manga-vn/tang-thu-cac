'use client'

import { useState } from 'react'
import { addWordToScope, getActiveScope } from './storage'

interface Props {
  selectedText: string
  source?: string
  onClose: () => void
  onSaved?: () => void
}

export default function SaveWordModal({ selectedText, source, onClose, onSaved }: Props) {
  const [form, setForm] = useState({ chinese: selectedText, pinyin: '', meaning: '' })
  const [saved, setSaved] = useState(false)
  const [noScope, setNoScope] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSave() {
    if (!form.meaning.trim()) return
    const active = getActiveScope()
    if (!active) { setNoScope(true); return }

    addWordToScope(active.scope, {
      chinese: form.chinese.trim(),
      pinyin:  form.pinyin.trim(),
      meaning: form.meaning.trim(),
      tags:    ['tiên hiệp'],
      addedBy: active.userId,
      source,
    })
    setSaved(true)
    onSaved?.()
    setTimeout(onClose, 1200)
  }

  if (saved) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center p-4" onClick={onClose}>
        <div className="bg-[#FFFDF8] rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
          <div className="text-4xl mb-2">✓</div>
          <p className="text-amber-900 font-semibold">Đã lưu vào từ điển!</p>
        </div>
      </div>
    )
  }

  if (noScope) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center p-4" onClick={onClose}>
        <div className="bg-[#FFFDF8] rounded-2xl p-6 w-full max-w-sm shadow-xl">
          <p className="text-amber-900 font-semibold mb-3">Bạn chưa có tài khoản học từ vựng.</p>
          <a href="/hoc-tieng-trung" className="block text-center bg-amber-700 text-white rounded-xl py-3 font-semibold">
            Vào trang Học Tiếng Trung →
          </a>
          <button onClick={onClose} className="w-full mt-2 text-amber-800/50 py-2 text-sm">Đóng</button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center p-4" onClick={onClose}>
      <div className="bg-[#FFFDF8] rounded-2xl p-5 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-amber-950">📚 Lưu từ vào từ điển</h3>
          <button onClick={onClose} className="text-amber-800/40 hover:text-amber-800 text-xl">✕</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-amber-800/60 block mb-1">Chữ Trung</label>
            <input name="chinese" value={form.chinese} onChange={handleChange}
              className="w-full border border-[#E5E0D8] rounded-xl px-3 py-3 text-2xl font-bold text-center text-amber-950 bg-amber-50 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="text-xs text-amber-800/60 block mb-1">Phiên âm (Pinyin)</label>
            <input name="pinyin" value={form.pinyin} onChange={handleChange} placeholder="nǐ hǎo"
              className="w-full border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-sm text-amber-950 bg-[#FFFDF8] focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="text-xs text-amber-800/60 block mb-1">Nghĩa *</label>
            <input name="meaning" value={form.meaning} onChange={handleChange} placeholder="Nhập nghĩa tiếng Việt..."
              autoFocus
              className="w-full border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-sm text-amber-950 bg-[#FFFDF8] focus:outline-none focus:border-amber-500" />
          </div>
          {source && <p className="text-xs text-amber-800/40">📖 {source}</p>}
        </div>

        <button onClick={handleSave} disabled={!form.meaning.trim()}
          className="mt-4 w-full bg-amber-700 text-white font-semibold rounded-xl py-3 hover:bg-amber-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Lưu từ này
        </button>
      </div>
    </div>
  )
}
