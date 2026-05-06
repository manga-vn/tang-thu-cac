import { Story, Chapter } from '@/data/stories';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

// Read content from process.cwd() as required
const contentRoot = path.join(process.cwd(), 'content');

async function getChapterPath(storySlug: string, chapterSlug: string): Promise<string> {
  return path.join(contentRoot, storySlug, 'chapters', `${chapterSlug}.md`);
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
  const storyPath = path.join(contentRoot, storySlug, 'story.json');
  console.log(`[loadStory] Path: ${storyPath}, exists: ${fsSync.existsSync(storyPath)}`);

  try {
    const storyContent = await fs.readFile(storyPath, 'utf-8');
    const storyData = JSON.parse(storyContent) as Omit<Story, 'chapters'>;
    console.log(`[loadStory] Parsed story: ${storyData.title}`);

    // Load chapters
    const chaptersDir = path.join(contentRoot, storySlug, 'chapters');
    console.log("[chapters] folder:", chaptersDir);

    let chapterFiles: string[] = [];

    try {
      const files = await fs.readdir(chaptersDir);
      chapterFiles = files.filter(f => f.endsWith('.md'));
      console.log("[chapters] files:", chapterFiles);
    } catch (err) {
      const error = err as Error;
      console.error(`[loadStory] Chapters dir error:`, error.message);
      chapterFiles = [];
    }

    const chapterPromises = chapterFiles.map(async (file) => {
      const chapterSlug = file.replace(/\.md$/, '');
      return await parseChapterFile(await getChapterPath(storySlug, chapterSlug));
    });

    const chapters = await Promise.all(chapterPromises);
    console.log("[chapters] loaded for", storyData.slug, chapters.length);

    // Sort by chapterNumber
    chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

    return {
      ...storyData,
      chapters: chapters,
    };
  } catch (error) {
    console.error(`[loadStory] Error loading ${storySlug}:`, error);
    throw error;
  }
}

// Load all stories from content folder
async function getAllStoriesFromFS(): Promise<Story[]> {
  try {
    // Debug logs as required
    console.log("[content] cwd:", process.cwd());
    console.log("[content] root:", contentRoot);
    console.log("[content] root exists:", fsSync.existsSync(contentRoot));

    if (!fsSync.existsSync(contentRoot)) {
      const dirListing = fsSync.readdirSync(process.cwd(), { withFileTypes: true });
      const items = dirListing.map(d => d.name);
      throw new Error(`Content directory not found!\n` +
        `  process.cwd(): ${process.cwd()}\n` +
        `  contentRoot: ${contentRoot}\n` +
        `  Directory listing of cwd: ${JSON.stringify(items)}`);
    }

    const dirents = await fs.readdir(contentRoot, { withFileTypes: true });
    const storyFolders = dirents
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log("[content] story folders:", storyFolders);

    if (storyFolders.length === 0) {
      const dirListing = fsSync.readdirSync(contentRoot, { withFileTypes: true });
      const items = dirListing.map(d => d.name);
      throw new Error(`No story folders found in content directory!\n` +
        `  contentRoot: ${contentRoot}\n` +
        `  Contents: ${JSON.stringify(items)}`);
    }

    const loadedStories = await Promise.all(
      storyFolders.map(async (dir) => {
        console.log(`[stories] Loading story: ${dir}`);
        const story = await loadStoryFromFS(dir);
        return story;
      })
    );

    const filtered = loadedStories
      .filter((story): story is Story => story !== null);

    console.log("[content] stories loaded:", filtered.length);

    // Log chapters for each story
    filtered.forEach(story => {
      console.log(`[content] chapters loaded for ${story.slug}: ${story.chapters.length}`);
    });

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('[stories] Error loading stories:', error);
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
