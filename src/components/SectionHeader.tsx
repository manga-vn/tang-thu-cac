interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeader({ title, subtitle, href, linkText = 'Xem tất cả →' }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-950">{title}</h2>
        {subtitle && <p className="text-amber-800/60 text-sm mt-1">{subtitle}</p>}
      </div>
      {href && (
        <a href={href} className="text-amber-700 hover:text-amber-950 text-sm font-medium transition-colors shrink-0 ml-4">
          {linkText}
        </a>
      )}
    </div>
  );
}
