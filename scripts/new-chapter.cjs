#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get story slug from command line argument or use default
const storySlug = process.argv[2] || 'vong-xuyen-diep';

// Content root
const contentRoot = path.join(process.cwd(), 'content');
const chaptersDir = path.join(contentRoot, storySlug, 'chapters');

// Chapter file pattern
const CHAPTER_PATTERN = /^chuong-(\d+)\.md$/;

// Get next chapter number
function getNextChapterNumber() {
  if (!fs.existsSync(chaptersDir)) {
    return 1;
  }

  const files = fs.readdirSync(chaptersDir);
  let maxNum = 0;

  for (const file of files) {
    const match = file.match(CHAPTER_PATTERN);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) {
        maxNum = num;
      }
    }
  }

  return maxNum + 1;
}

// Generate chapter content template
function generateChapterTemplate(chapterNumber, storyTitle) {
  const today = new Date().toISOString().split('T')[0];
  const title = `Chương ${chapterNumber}: [Tiêu đề chương]`;

  return `---
title: "${title}"
slug: "chuong-${chapterNumber}"
chapterNumber: ${chapterNumber}
publishedAt: "${today}"
---

[Viết nội dung chương ở đây...]

`;
}

// Main
function main() {
  console.log(`📖 Creating new chapter for story: ${storySlug}`);

  // Check if story exists
  const storyPath = path.join(contentRoot, storySlug, 'story.json');
  if (!fs.existsSync(storyPath)) {
    console.error(`❌ Story not found: ${storyPath}`);
    console.error(`   Make sure the story folder exists with a story.json file.`);
    process.exit(1);
  }

  // Read story title for reference
  const storyData = JSON.parse(fs.readFileSync(storyPath, 'utf-8'));
  console.log(`   Story title: ${storyData.title}`);

  // Ensure chapters directory exists
  if (!fs.existsSync(chaptersDir)) {
    fs.mkdirSync(chaptersDir, { recursive: true });
    console.log(`   Created chapters directory: ${chaptersDir}`);
  }

  // Get next chapter number
  const nextNum = getNextChapterNumber();
  const fileName = `chuong-${nextNum}.md`;
  const filePath = path.join(chaptersDir, fileName);

  // Check if file already exists (shouldn't happen)
  if (fs.existsSync(filePath)) {
    console.error(`❌ File already exists: ${filePath}`);
    process.exit(1);
  }

  // Generate template
  const template = generateChapterTemplate(nextNum, storyData.title);
  fs.writeFileSync(filePath, template, 'utf-8');
  console.log(`✅ Created: ${fileName}`);
  console.log(`   Location: ${filePath}`);
  console.log('');
  console.log('📝 Next steps:');
  console.log(`   1. Edit the file and fill in the chapter content`);
  console.log(`   2. Update the "title" field in the frontmatter`);
  console.log(`   3. Commit and push: git add . && git commit -m "feat: add chapter ${nextNum}"`);
  console.log('');
  console.log('💡 Tip: You can also open the file directly:');
  console.log(`   ${filePath}`);
}

main();
