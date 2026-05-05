# Tàng Thư Các

Ứng dụng đọc truyện được xây dựng với Next.js 16.

## Content Management (MVP V1.5)

Stories and chapters are stored as files in the `content/` folder:

```
content/
  vong-xuyen-diep/
    story.json        # Story metadata
    chapters/
      chuong-1.md     # Chapter content with frontmatter
      chuong-2.md
```

### Adding a New Chapter

1. Create a new file: `content/vong-xuyen-diep/chapters/chuong-3.md`

2. Add frontmatter:
```markdown
---
title: "Chương 3: Tiêu đề chương"
slug: "chuong-3"
chapterNumber: 3
publishedAt: "2024-01-29"
---
```

3. Write chapter content below the frontmatter as plain text or Markdown.

4. Run `npm run build` to rebuild the site.

### Story Metadata

Edit `content/vong-xuyen-diep/story.json` to update story information:

- `title`, `slug`, `coverImage`, `genre`, `status`
- `description` - short intro shown on cards
- `summary` - full story synopsis displayed on story detail page

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Build

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 16.2.4 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
