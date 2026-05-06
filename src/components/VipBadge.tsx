export default function VipBadge({ small = false }: { small?: boolean }) {
  if (small) {
    return (
      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium border border-yellow-200">
        👑 VIP
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
      👑 VIP
    </span>
  );
}
