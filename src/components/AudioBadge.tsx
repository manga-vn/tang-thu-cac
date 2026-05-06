export default function AudioBadge({ small = false }: { small?: boolean }) {
  if (small) {
    return (
      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
        🎧 Audio
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
      🎧 Có Audio
    </span>
  );
}
