import grayMatter from 'gray-matter';
import { readFile } from 'fs/promises';

const content = await readFile('content/vong-xuyen-diep/chapters/chuong-1.md', 'utf-8');
const { data, content: body } = grayMatter(content);

console.log('Data:', data);
console.log('Data type:', typeof data);
console.log('Keys:', data ? Object.keys(data) : 'none');
console.log('Body length:', body.length);
