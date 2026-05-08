export const MAIN_GENRES = [
  'Tiên hiệp',
  'Huyền huyễn',
  'Đô thị',
  'Tình cảm',
  'Sảng văn',
  'Ngôn tình',
  'Hài hước',
];

export const FEATURED_GENRES = [
  { name: 'Tiên hiệp', slug: 'tien-hiep', emoji: '⚔️', desc: 'Tu tiên, kiếm hiệp, huyền ảo' },
  { name: 'Huyền huyễn', slug: 'huyen-huyen', emoji: '🌌', desc: 'Phép thuật, bí ẩn, thế giới kỳ ảo' },
  { name: 'Đô thị', slug: 'do-thi', emoji: '🏙️', desc: 'Đời sống hiện đại, thành phố' },
  { name: 'Tình cảm', slug: 'tinh-cam', emoji: '💌', desc: 'Cảm xúc, gia đình, quan hệ trưởng thành' },
  { name: 'Sảng văn', slug: 'sang-van', emoji: '⚡', desc: 'Nhịp nhanh, đã, giải trí' },
  { name: 'Ngôn tình', slug: 'ngon-tinh', emoji: '💕', desc: 'Tình yêu, lãng mạn, chữa lành' },
  { name: 'Hài hước', slug: 'hai-huoc', emoji: '🎭', desc: 'Dí dỏm, nhẹ nhõm, thư giãn' },
];

export function getGenreBySlug(slug: string) {
  return FEATURED_GENRES.find((genre) => genre.slug === slug);
}

export function getGenreSlug(name: string) {
  return FEATURED_GENRES.find((genre) => genre.name === name)?.slug ?? '';
}
