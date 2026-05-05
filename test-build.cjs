const path = require('path');
const fs = require('fs');

// Simulate the contentDir calculation from stories.ts
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, '..', '..', 'content');

console.log('__dirname:', __dirname);
console.log('contentDir:', contentDir);
console.log('contentDir exists:', fs.existsSync(contentDir));

if (fs.existsSync(contentDir)) {
  const storyDir = path.join(contentDir, 'vong-xuyen-diep');
  console.log('storyDir exists:', fs.existsSync(storyDir));
  if (fs.existsSync(storyDir)) {
    const storyJson = path.join(storyDir, 'story.json');
    console.log('story.json exists:', fs.existsSync(storyJson));
    if (fs.existsSync(storyJson)) {
      const story = JSON.parse(fs.readFileSync(storyJson, 'utf-8'));
      console.log('Story title:', story.title);
      console.log('Chapters count:', story.chapters ? story.chapters.length : 'N/A (chapters loaded dynamically)');
    }
  }
}
