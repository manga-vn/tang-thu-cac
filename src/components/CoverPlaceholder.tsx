interface CoverPlaceholderProps {
  title: string;
  genre?: string;
  className?: string;
}

export default function CoverPlaceholder({ title, genre, className = '' }: CoverPlaceholderProps) {
  const genreText = genre || '';

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 ${className}`}>
      <div className="text-center p-4">
        <span className="text-4xl md:text-5xl mb-3 block">📖</span>
        <h3 className="font-bold text-amber-900 text-sm md:text-base text-center leading-tight mb-1">
          {title}
        </h3>
        {genreText && (
          <p className="text-xs text-amber-700 text-center">
            {genreText}
          </p>
        )}
      </div>
    </div>
  );
}
