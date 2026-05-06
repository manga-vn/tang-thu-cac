import { Story, Chapter } from '@/data/stories';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

interface GrayMatterResult {
  context: Record<string, unknown>;
  content: string;
  original: string;
}

const contentRoot = path.join(process.cwd(), 'content');
const CHAPTER_FILE_PATTERN = /^chuong-\d+\.md$/;

function isValidSlug(slug: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(slug);
}

async function getChapterPath(storySlug: string, chapterSlug: string): Promise<string> {
  return path.join(contentRoot, storySlug, 'chapters', `${chapterSlug}.md`);
}

async function parseChapterFile(filePath: string): Promise<Chapter> {
  try {
    let fileContent = await fs.readFile(filePath, 'utf-8');
    fileContent = fileContent.replace(/\r\n/g, '\n');
    const result = grayMatter(fileContent) as unknown as GrayMatterResult;
    const { context, content } = result;
    if (!context || typeof context !== 'object') {
      const preview = fileContent.substring(0, 200).replace(/\n/g, '\\n');
      throw new Error(`Chapter file "${filePath}" has invalid frontmatter. Preview: ${preview}`);
    }
    const required = ['slug', 'title', 'chapterNumber', 'publishedAt'];
    const missing = required.filter(field => !(field in context));
    if (missing.length > 0) {
      throw new Error(`Chapter file "${filePath}" missing required fields: ${missing.join(', ')}`);
    }
    const chapterData = context as Record<string, unknown>;
    return {
      id: String(chapterData.slug),
      title: String(chapterData.title),
      slug: String(chapterData.slug),
      chapterNumber: Number(chapterData.chapterNumber),
      content: String(content).trim(),
      publishedAt: String(chapterData.publishedAt),
      isVip: Boolean(chapterData.isVip ?? false),
      audioUrl: chapterData.audioUrl ? String(chapterData.audioUrl) : undefined,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Failed to parse chapter file "${filePath}": ${errorMessage}`);
    throw error;
  }
}

async function loadStoryFromFS(storySlug: string): Promise<Story | null> {
  if (!isValidSlug(storySlug)) {
    console.error(`[loadStory] Invalid story slug: "${storySlug}"`);
    return null;
  }
  const storyPath = path.join(contentRoot, storySlug, 'story.json');
  try {
    const storyContent = await fs.readFile(storyPath, 'utf-8');
    const storyData = JSON.parse(storyContent) as Omit<Story, 'chapters'>;
    const chaptersDir = path.join(contentRoot, storySlug, 'chapters');
    let chapterFiles: string[] = [];
    try {
      const files = await fs.readdir(chaptersDir);
      chapterFiles = files.filter(f => CHAPTER_FILE_PATTERN.test(f));
    } catch (err) {
      const error = err as Error;
      console.error(`[loadStory] Chapters directory error for "${storySlug}": ${error.message}`);
      chapterFiles = [];
    }
    const chapterPromises: Promise<Chapter | null>[] = chapterFiles.map(async (file): Promise<Chapter | null> => {
      const chapterSlug = file.replace(/\.md$/, '');
      try {
        return await parseChapterFile(await getChapterPath(storySlug, chapterSlug));
      } catch {
        return null;
      }
    });
    const chapterResults = await Promise.allSettled(chapterPromises);
    const chapters: Chapter[] = [];
    const errors: string[] = [];
    chapterResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value !== null) {
        chapters.push(result.value);
      } else if (result.status === 'rejected') {
        const file = chapterFiles[index];
        errors.push(`"${file}": ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`);
      }
    });
    if (errors.length > 0) {
      console.error(`[loadStory] Chapter errors for "${storyData.title}":`, errors);
    }
    chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
    return { ...storyData, chapters };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[loadStory] Failed to load story "${storySlug}": ${errorMessage}`);
    throw error;
  }
}

async function getAllStoriesFromFS(): Promise<Story[]> {
  try {
    if (!fsSync.existsSync(contentRoot)) {
      throw new Error(`Content directory not found at: ${contentRoot}`);
    }
    const dirents = await fs.readdir(contentRoot, { withFileTypes: true });
    const storyFolders = dirents
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => isValidSlug(name));
    if (storyFolders.length === 0) {
      throw new Error(`No valid story folders found in: ${contentRoot}`);
    }
    const loadedStories = await Promise.all(storyFolders.map(dir => loadStoryFromFS(dir)));
    const filtered = loadedStories.filter((story): story is Story => story !== null);
    if (process.env.NODE_ENV !== 'production') {
      filtered.forEach(story => {
        console.log(`[content] ${story.slug}: ${story.chapters.length} chapters`);
      });
    }
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('[stories] Error loading stories:', error instanceof Error ? error.message : error);
    throw error;
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

export async function getLatestChapters(limit = 5): Promise<{ story: Story; chapter: Chapter }[]> {
  const allChapters: { story: Story; chapter: Chapter }[] = [];
  const stories = await getAllStories();
  stories.forEach(story => {
    story.chapters.forEach(chapter => allChapters.push({ story, chapter }));
  });
  return allChapters
    .sort((a, b) => {
      const dateDiff = new Date(b.chapter.publishedAt).getTime() - new Date(a.chapter.publishedAt).getTime();
      if (dateDiff !== 0) return dateDiff;
      return b.chapter.chapterNumber - a.chapter.chapterNumber;
    })
    .slice(0, limit);
}

export async function getFeaturedStories(limit = 6): Promise<Story[]> {
  const stories = await getAllStories();
  return stories
    .filter(story => story.featured === true)
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, limit);
}

export async function getTopStories(limit = 10): Promise<Story[]> {
  const stories = await getAllStories();
  return stories
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, limit);
}

export async function getAudioStories(): Promise<Story[]> {
  const stories = await getAllStories();
  return stories.filter(story => story.hasAudio === true);
}

export async function getRecentlyUpdatedStories(limit = 8): Promise<Story[]> {
  const stories = await getAllStories();
  return stories
    .filter(story => story.updatedAt)
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt ?? '').getTime();
      const dateB = new Date(b.updatedAt ?? '').getTime();
      return dateB - dateA;
    })
    .slice(0, limit);
}
