import { Story, Chapter } from '@/data/stories';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

// Use __dirname to reliably locate content directory regardless of cwd
const contentDir = path.join(__dirname, '..', '..', 'content');

async function getChapterPath(storySlug: string, chapterSlug: string): Promise<string> {
  return path.join(contentDir, storySlug, 'chapters', `${chapterSlug}.md`);
}

async function parseChapterFile(filePath: string): Promise<Chapter> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = grayMatter(fileContent);

    // Debug: log what gray-matter returned
    console.log(`[parse] ${filePath.split('/').pop()}: data =`, data, 'content length:', content.length);

    // Validate required fields
    if (!data || typeof data !== 'object') {
      throw new Error(`Chapter file ${filePath} has invalid or missing frontmatter. Data: ${JSON.stringify(data)}`);
    }

    const required = ['slug', 'title', 'chapterNumber', 'publishedAt'];
    const missing = required.filter(field => !data[field]);
    if (missing.length > 0) {
      throw new Error(`Chapter file ${filePath} missing required fields: ${missing.join(', ')}. Data: ${JSON.stringify(data)}`);
    }

    return {
      id: data.slug,
      title: data.title,
      slug: data.slug,
      chapterNumber: data.chapterNumber,
      content: content.trim(),
      publishedAt: data.publishedAt,
    };
  } catch (error) {
    console.error(`Error parsing chapter file ${filePath}:`, error);
    throw error;
  }
}

async function loadStoryFromFS(storySlug: string): Promise<Story | null> {
  const storyPath = path.join(contentDir, storySlug, 'story.json');
  console.log(`[loadStory] Path: ${storyPath}, exists: ${fsSync.existsSync(storyPath)}`);

  try {
    const storyContent = await fs.readFile(storyPath, 'utf-8');
    const storyData = JSON.parse(storyContent) as Omit<Story, 'chapters'>;
    console.log(`[loadStory] Parsed story: ${storyData.title}`);

    // Load chapters
    const chaptersDir = path.join(contentDir, storySlug, 'chapters');
    let chapterFiles: string[] = [];

    try {
      const files = await fs.readdir(chaptersDir);
      chapterFiles = files.filter(f => f.endsWith('.md'));
      console.log(`[loadStory] Found ${chapterFiles.length} chapter files`);
    } catch (err) {
      const error = err as Error;
      console.log(`[loadStory] Chapters dir error:`, error.message);
      chapterFiles = [];
    }

    const chapterPromises = chapterFiles.map(async (file) => {
      try {
        const chapterSlug = file.replace(/\.md$/, '');
        return await parseChapterFile(await getChapterPath(storySlug, chapterSlug));
      } catch (error) {
        console.error(`Failed to parse chapter ${file}:`, error);
        return null;
      }
    });

    const chapters = await Promise.all(chapterPromises);

    // Filter out failed chapters
    const validChapters = chapters.filter((c): c is Chapter => c !== null);

    console.log(`[loadStory] Parsed ${validChapters.length} valid chapters out of ${chapterFiles.length}`);

    // Sort by chapterNumber
    validChapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

    return {
      ...storyData,
      chapters: validChapters,
    };
  } catch (error) {
    console.error(`[loadStory] Error loading ${storySlug}:`, error);
    return null;
  }
}

// Load all stories from content folder
async function getAllStoriesFromFS(): Promise<Story[]> {
  try {
    console.log('[stories] Loading from content dir:', contentDir);

    if (!fsSync.existsSync(contentDir)) {
      console.log('[stories] contentDir does not exist, returning empty');
      return [];
    }

    const dirents = await fs.readdir(contentDir, { withFileTypes: true });
    const storyDirs = dirents
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log('[stories] Found story directories:', storyDirs);

    const loadedStories = await Promise.all(
      storyDirs.map(async (dir) => {
        console.log(`[stories] Loading story: ${dir}`);
        const story = await loadStoryFromFS(dir);
        return story;
      })
    );

    const filtered = loadedStories
      .filter((story): story is Story => story !== null);

    console.log('[stories] Loaded stories count:', filtered.length);

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('[stories] Error loading stories:', error);
    return [];
  }
}

export async function getAllStories(): Promise<Story[]> {
  return getAllStoriesFromFS();
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const stories = await getAllStories();
  return stories.find(story => story.slug === slug);
}

export async function getChapterBySlug(storySlug: string, chapterSlug: string): Promise<Chapter | undefined> {
  const story = await getStoryBySlug(storySlug);
  if (!story) return undefined;
  return story.chapters.find(chapter => chapter.slug === chapterSlug);
}

export async function getPreviousChapter(storySlug: string, chapterSlug: string): Promise<Chapter | null> {
  const story = await getStoryBySlug(storySlug);
  if (!story) return null;

  const currentIndex = story.chapters.findIndex(chapter => chapter.slug === chapterSlug);
  if (currentIndex <= 0) return null;

  return story.chapters[currentIndex - 1];
}

export async function getNextChapter(storySlug: string, chapterSlug: string): Promise<Chapter | null> {
  const story = await getStoryBySlug(storySlug);
  if (!story) return null;

  const currentIndex = story.chapters.findIndex(chapter => chapter.slug === chapterSlug);
  if (currentIndex === -1 || currentIndex >= story.chapters.length - 1) return null;

  return story.chapters[currentIndex + 1];
}

export async function getLatestChapters(limit: number = 5): Promise<{ story: Story; chapter: Chapter }[]> {
  const allChapters: { story: Story; chapter: Chapter }[] = [];

  const stories = await getAllStories();
  stories.forEach(story => {
    story.chapters.forEach(chapter => {
      allChapters.push({ story, chapter });
    });
  });

  return allChapters
    .sort((a, b) => new Date(b.chapter.publishedAt).getTime() - new Date(a.chapter.publishedAt).getTime())
    .slice(0, limit);
}
