import { Story, Chapter } from '@/data/stories';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

// Read content from process.cwd() as required
const contentRoot = path.join(process.cwd(), 'content');

// Pattern to match valid chapter filenames: chuong-<number>.md
const CHAPTER_FILE_PATTERN = /^chuong-\d+\.md$/;

// Validate that a story slug is safe for filesystem operations
function isValidSlug(slug: string): boolean {
  // Allow alphanumeric, dash, underscore only (safe for paths)
  // This prevents path traversal and ensures consistent slug format
  return /^[a-zA-Z0-9_-]+$/.test(slug);
}

async function getChapterPath(storySlug: string, chapterSlug: string): Promise<string> {
  // No sanitization needed - chapterSlug comes from trusted filename pattern
  return path.join(contentRoot, storySlug, 'chapters', `${chapterSlug}.md`);
}

async function parseChapterFile(filePath: string): Promise<Chapter> {
  try {
    let fileContent = await fs.readFile(filePath, 'utf-8');

    // Normalize line endings (CRLF/LF) - important for gray-matter parsing
    fileContent = fileContent.replace(/\r\n/g, '\n');

    const { data, content } = grayMatter(fileContent);

    // Debug: log the first few lines of the file if data is invalid
    if (!data || typeof data !== 'object') {
      const preview = fileContent.substring(0, 200).replace(/\n/g, '\\n');
      throw new Error(`Chapter file "${filePath}" has invalid frontmatter: data type is ${typeof data}. File preview: ${preview}`);
    }

    const required = ['slug', 'title', 'chapterNumber', 'publishedAt'];
    const missing = required.filter(field => !(field in data));
    if (missing.length > 0) {
      throw new Error(`Chapter file "${filePath}" missing required fields: ${missing.join(', ')}`);
    }

    // Type-safe extraction with fallbacks
    const chapterData = data as Record<string, unknown>;

    return {
      id: String(chapterData.slug),
      title: String(chapterData.title),
      slug: String(chapterData.slug),
      chapterNumber: Number(chapterData.chapterNumber),
      content: String(content).trim(),
      publishedAt: String(chapterData.publishedAt),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Failed to parse chapter file "${filePath}": ${errorMessage}`);
    throw error;
  }
}

async function loadStoryFromFS(storySlug: string): Promise<Story | null> {
  // Validate storySlug for security
  if (!isValidSlug(storySlug)) {
    console.error(`[loadStory] Invalid story slug: "${storySlug}" - contains unsafe characters`);
    return null;
  }

  const storyPath = path.join(contentRoot, storySlug, 'story.json');

  try {
    const storyContent = await fs.readFile(storyPath, 'utf-8');
    const storyData = JSON.parse(storyContent) as Omit<Story, 'chapters'>;

    // Load chapters
    const chaptersDir = path.join(contentRoot, storySlug, 'chapters');

    let chapterFiles: string[] = [];

    try {
      const files = await fs.readdir(chaptersDir);
      console.log(`[loadStory] Raw files in chapters dir for "${storySlug}":`, files);

      // Only include files that match the expected pattern: chuong-<number>.md
      chapterFiles = files.filter(f => CHAPTER_FILE_PATTERN.test(f));
      console.log(`[loadStory] Filtered chapter files for "${storySlug}":`, chapterFiles);
    } catch (err) {
      const error = err as Error;
      console.error(`[loadStory] Chapters directory error for "${storySlug}": ${error.message}`);
      chapterFiles = [];
    }

    // Load chapters with allSettled to not fail entire story on one bad chapter
    const chapterPromises: Promise<Chapter | null>[] = chapterFiles.map(async (file): Promise<Chapter | null> => {
      // Extract slug from filename (remove .md extension)
      // File is already validated by CHAPTER_FILE_PATTERN, so slug is safe
      const chapterSlug = file.replace(/\.md$/, '');

      try {
        return await parseChapterFile(await getChapterPath(storySlug, chapterSlug));
      } catch (error) {
        // Individual chapter failure - return null to be filtered out
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

    // Log any chapter parsing errors
    if (errors.length > 0) {
      console.error(`[loadStory] Chapter errors for "${storyData.title}":`, errors);
    }

    // Sort by chapterNumber
    chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

    return {
      ...storyData,
      chapters: chapters,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[loadStory] Failed to load story "${storySlug}": ${errorMessage}`);
    throw error;
  }
}

// Load all stories from content folder
async function getAllStoriesFromFS(): Promise<Story[]> {
  try {
    console.log('[getAllStoriesFromFS] START - Building stories list');
    console.log('[getAllStoriesFromFS] contentRoot:', contentRoot);
    console.log('[getAllStoriesFromFS] contentRoot exists:', fsSync.existsSync(contentRoot));

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
      .map(dirent => dirent.name)
      // Validate folder names are safe slugs
      .filter(name => isValidSlug(name));

    if (storyFolders.length === 0) {
      const dirListing = fsSync.readdirSync(contentRoot, { withFileTypes: true });
      const items = dirListing.map(d => d.name);
      throw new Error(`No valid story folders found in content directory!\n` +
        `  contentRoot: ${contentRoot}\n` +
        `  Contents: ${JSON.stringify(items)}\n` +
        `  Note: Story folder names must match pattern: ^[a-zA-Z0-9_-]+$`);
    }

    const loadedStories = await Promise.all(
      storyFolders.map(async (dir) => {
        const story = await loadStoryFromFS(dir);
        return story;
      })
    );

    const filtered = loadedStories
      .filter((story): story is Story => story !== null);

    // Log chapters for each story (only in dev/build time, not production)
    if (process.env.NODE_ENV !== 'production') {
      filtered.forEach(story => {
        console.log(`[content] chapters loaded for ${story.slug}: ${story.chapters.length}`);
      });
    }

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('[stories] Error loading stories:', error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function getAllStories(): Promise<Story[]> {
  // This function is called at build time to generate all story pages
  return getAllStoriesFromFS();
}

// Export a build-time constant to force cache invalidation when logic changes
export const BUILD_TIMESTAMP = new Date().toISOString();

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
