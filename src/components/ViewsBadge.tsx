function formatViews(views: number): string {
  return new Intl.NumberFormat("id-ID", { notation: "compact" }).format(views);
}

export function ViewsBadge({
  views,
  className = "",
}: {
  views: number | undefined;
  className?: string;
}) {
  if (views === undefined) return null;
  return (
    <span className={`flex items-center gap-1 text-step--1 text-ink-soft ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span aria-label={`${views} kali dilihat`}>{formatViews(views)}</span>
    </span>
  );
}
