'use client'

import { useState } from 'react'

const COMMON_TAGS = ['giao tiếp', 'phim', 'gia đình', 'tiên hiệp', 'thức ăn', 'màu sắc', 'khác']

interface Props {
  onAdd: (word: { chinese: string; pinyin: string; meaning: string; example: string; tags: string[] }) => void
  existingTags?: string[]
  prefillChinese?: string
}

export default function WordForm({ onAdd, existingTags = [], prefillChinese = '' }: Props) {
  const [form, setForm]     = useState({ chinese: prefillChinese, pinyin: '', meaning: '', example: '', tags: [] as string[] })
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState(false)

  const allTags = [...new Set([...COMMON_TAGS, ...existingTags])]

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  function toggleTag(tag: string) {
    setForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.chinese.trim()) return setError('Vui lòng nhập chữ Trung.')
    if (!form.meaning.trim()) return setError('Vui lòng nhập nghĩa tiếng Việt.')
    onAdd(form)
    setForm({ chinese: '', pinyin: '', meaning: '', example: '', tags: [] })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="p-4 pb-28">
      <h2 className="text-lg font-bold text-amber-950 mb-4 pt-2">➕ Thêm từ mới</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <Field label="Chữ Trung *" name="chinese" value={form.chinese} onChange={handleChange} placeholder="例：你好" large />
        <Field label="Phiên âm (Pinyin)" name="pinyin" value={form.pinyin} onChange={handleChange} placeholder="nǐ hǎo" />
        <Field label="Nghĩa tiếng Việt *" name="meaning" value={form.meaning} onChange={handleChange} placeholder="Xin chào" />
        <Field label="Ví dụ (tùy chọn)" name="example" value={form.example} onChange={handleChange} placeholder="你好，我是越南人。" />

        <div>
          <label className="text-sm font-medium text-amber-900/70 block mb-2">Nhãn</label>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button key={tag} type="button" onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${form.tags.includes(tag) ? 'bg-amber-700 text-white border-amber-700' : 'bg-[#FFFDF8] text-amber-800/70 border-[#E5E0D8] hover:border-amber-400'}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm text-center">
            ✓ Đã thêm từ thành công!
          </div>
        )}

        <button type="submit"
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl py-4 text-base transition-colors shadow active:scale-95">
          Lưu từ mới
        </button>
      </form>
    </div>
  )
}

function Field({ label, name, value, onChange, placeholder, large }: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string; large?: boolean
}) {
  return (
    <div>
      <label className="text-sm font-medium text-amber-900/70 block mb-1.5">{label}</label>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full border border-[#E5E0D8] rounded-xl px-4 bg-[#FFFDF8] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-amber-950 ${large ? 'py-4 text-3xl text-center font-bold' : 'py-3 text-base'}`} />
    </div>
  )
}
