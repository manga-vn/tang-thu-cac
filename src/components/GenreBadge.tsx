interface GenreBadgeProps {
  genre: string;
  variant?: 'default' | 'outline' | 'solid';
  href?: string;
}

export default function GenreBadge({ genre, variant = 'default', href }: GenreBadgeProps) {
  const base = 'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors';
  const variants = {
    default: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    outline: 'border border-amber-300 text-amber-700 hover:bg-amber-50',
    solid: 'bg-amber-700 text-white hover:bg-amber-800',
  };
  const cls = `${base} ${variants[variant]}`;

  if (href) return <a href={href} className={cls}>{genre}</a>;
  return <span className={cls}>{genre}</span>;
}
