import fs from 'fs';
import path from 'path';

const chaptersDir = path.join(process.cwd(), 'content', 'vong-xuyen-diep', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

// Ngày hôm nay làm publishedAt cho tất cả
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

files.forEach(file => {
  const filePath = path.join(chaptersDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Extract chapter number từ filename
  const chapterNumber = parseInt(file.replace('chuong-', '').replace('.md', ''));

  // Tìm dòng title bắt đầu với "## **Chương X: ..."
  let title = '';
  for (const line of lines) {
    if (line.startsWith('## **Chương')) {
      // Extract title: "## **Chương 1: Tiêu đề**" -> "Chương 1: Tiêu đề"
      title = line.replace(/^## \*\*/, '').replace(/\*\*$/, '').trim();
      break;
    }
  }

  if (!title) {
    console.error(`Không tìm thấy title trong ${file}`);
    return;
  }

  // Tìm vị trí bắt đầu nội dung (sau heading "## ...")
  let contentStart = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## **Chương')) {
      contentStart = i + 1;
      break;
    }
  }

  // Tìm phần ghi chú cuối (dòng "---" riêng biệt)
  let contentEnd = lines.length;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '---') {
      contentEnd = i;
      break;
    }
  }

  // Extract nội dung chính (bỏ qua dòng # VONG XUYÊN ĐIỆP nếu có)
  const contentLines = [];
  for (let i = contentStart; i < contentEnd; i++) {
    const line = lines[i];
    // Bỏ dòng heading cấp 1 "# VONG XUYÊN ĐIỆP"
    if (line.startsWith('# ')) continue;
    contentLines.push(line);
  }

  const cleanContent = contentLines.join('\n').trim();

  // Tạo nội dung mới với frontmatter
  const newContent = `---
title: "${title}"
slug: "chuong-${chapterNumber}"
chapterNumber: ${chapterNumber}
publishedAt: "${today}"
---

${cleanContent}
`;

  // Ghi đè file
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✓ Updated ${file}: ${title}`);
});

console.log('\n✅ All chapter files updated!');
