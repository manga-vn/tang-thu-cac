# Scripts

Các script tiện ích để quản lý nội dung truyện.

## `new-chapter`

Tạo file chapter mới với số thứ tự tự động.

### Cách dùng

```bash
# Tạo chapter cho story mặc định (vong-xuyen-diep)
npm run new-chapter

# Tạo chapter cho story cụ thể
npm run new-chapter -- <story-slug>
```

### Ví dụ

```bash
# Tạo Chương 14 cho Vong Xuyên Điệp
npm run new-chapter

# Tạo Chương 1 cho một truyện mới
npm run new-chapter -- my-new-story
```

### Output

Script sẽ tạo file `chuong-<next-number>.md` trong thư mục:
```
content/<story-slug>/chapters/chuong-<next-number>.md
```

Với nội dung mẫu:

```yaml
---
title: "Chương 14: [Tiêu đề chương]"
slug: "chuong-14"
chapterNumber: 14
publishedAt: "2026-05-06"
---

[Viết nội dung chương ở đây...]
```

### Các bước sau khi tạo

1. Mở file vừa tạo
2. Thay `[Tiêu đề chương]` bằng tiêu đề thực tế
3. Viết nội dung chương
4. Commit và push:
   ```bash
   git add content/<story-slug>/chapters/chuong-<n>.md
   git commit -m "feat: add chapter <n>"
   git push origin main
   ```
5. Vercel sẽ tự động deploy

### Yêu cầu

- Story phải tồn tại trong `content/<story-slug>/story.json`
- Chương sẽ được đánh số tự động dựa trên file có số lớn nhất hiện có
- File name format: `chuong-<number>.md` (ví dụ: `chuong-1.md`, `chuong-10.md`)

### Lỗi thường gặp

**"Story not found"**: 
- Kiểm tra story folder có `story.json` không
- Kiểm tra đúng story slug

**File already exists**:
- File đã tồn tại, chọn số khác hoặc xóa file cũ

## `fix-chapters`

(Deprecated) Script cũ để fix format chapters. Không còn cần thiết sau khi đã update gray-matter.
