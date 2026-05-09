import { useMemo, useState } from 'react'
import { speakChinese } from '../utils/speechPractice'
import { findChineseSuggestions } from '../utils/wordSuggestions'

const COMMON_TAGS = ['giao tiếp', 'gia đình', 'nghe-noi', 'buổi sáng', 'buổi trưa', 'buổi chiều', 'buổi tối', 'ra ngoài', 'thức ăn', 'khác']

export default function WordForm({ onAdd, existingTags = [], vocabulary = [] }) {
  const [form, setForm] = useState({ chinese: '', pinyin: '', meaning: '', example: '', tags: ['nghe-noi'] })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [selectedSuggestionId, setSelectedSuggestionId] = useState('')

  const allTags = [...new Set([...COMMON_TAGS, ...existingTags])].filter(Boolean)
  const suggestions = useMemo(
    () => findChineseSuggestions(form.meaning, vocabulary, 6),
    [form.meaning, vocabulary],
  )

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setSelectedSuggestionId('')
    setError('')
  }

  function toggleTag(tag) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }))
  }

  function applySuggestion(suggestion) {
    setForm(f => ({
      ...f,
      chinese: suggestion.chinese,
      pinyin: suggestion.pinyin,
      meaning: f.meaning.trim() || suggestion.meaning,
      example: suggestion.example,
      tags: [...new Set([...(f.tags || []), ...(suggestion.tags || []), 'nghe-noi'])],
    }))
    setSelectedSuggestionId(suggestion.id)
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.meaning.trim()) return setError('Vui lòng nhập tiếng Việt trước.')
    if (!form.chinese.trim() || !form.pinyin.trim()) {
      return setError('Hãy chọn một gợi ý hoặc điền chữ Trung và pinyin trước khi lưu.')
    }

    onAdd(form)
    setForm({ chinese: '', pinyin: '', meaning: '', example: '', tags: ['nghe-noi'] })
    setSelectedSuggestionId('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="p-4 pb-28">
      <h2 className="text-lg font-bold text-gray-800 mb-4 pt-2">+ Thêm từ mới</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          label="Nhập tiếng Việt trước *"
          name="meaning"
          value={form.meaning}
          onChange={handleChange}
          placeholder="Ví dụ: đi học, con muốn nước, ngủ ngon..."
        />

        {form.meaning.trim().length >= 2 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-2">
              <label className="text-sm font-bold text-gray-700">Gợi ý tiếng Trung</label>
              <span className="text-xs text-gray-400">bấm để tự điền</span>
            </div>
            {suggestions.length > 0 ? (
              <div className="grid gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={`${suggestion.id}-${suggestion.chinese}`}
                    type="button"
                    onClick={() => applySuggestion(suggestion)}
                    className={`text-left rounded-xl border p-3 transition-colors ${
                      selectedSuggestionId === suggestion.id
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-100 bg-gray-50 hover:border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-xl font-black text-gray-900">{suggestion.chinese}</span>
                          <span className="text-sm font-semibold text-gray-500">{suggestion.pinyin}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{suggestion.meaning}</p>
                        {suggestion.example && (
                          <p className="text-xs text-gray-400 mt-1">{suggestion.example} · {suggestion.examplePinyin}</p>
                        )}
                      </div>
                      <span className="text-xs font-bold text-red-600 bg-white rounded-full px-2 py-1">Chọn</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-xl p-3">
                Chưa có gợi ý offline cho cụm này. Anh có thể thử cụm ngắn hơn hoặc tự điền chữ Trung/pinyin bên dưới.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <Field
            label="Chữ Trung"
            name="chinese"
            value={form.chinese}
            onChange={handleChange}
            placeholder="Tự điền sau khi chọn gợi ý"
            large
          />

          <Field
            label="Phiên âm (Pinyin)"
            name="pinyin"
            value={form.pinyin}
            onChange={handleChange}
            placeholder="Ví dụ: qù xué xiào"
          />

          <Field
            label="Câu mẫu (tùy chọn)"
            name="example"
            value={form.example}
            onChange={handleChange}
            placeholder="Ví dụ: 我去学校。"
          />
        </div>

        {(form.chinese || form.example) && (
          <button
            type="button"
            onClick={() => speakChinese(form.example || form.chinese)}
            className="w-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold rounded-xl py-3 active:scale-95"
          >
            🔊 Nghe thử phát âm
          </button>
        )}

        <div>
          <label className="text-sm font-medium text-gray-600 block mb-2">Nhãn</label>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors
                  ${form.tags.includes(tag)
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm text-center">
            Đã thêm từ thành công!
          </div>
        )}

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-4 text-base transition-colors shadow active:scale-95"
        >
          Lưu từ mới
        </button>
      </form>
    </div>
  )
}

function Field({ label, name, value, onChange, placeholder, large }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 block mb-1.5">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-200 rounded-xl px-4 bg-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all ${large ? 'py-4 text-3xl text-center font-bold text-gray-800' : 'py-3 text-base text-gray-700'}`}
      />
    </div>
  )
}
