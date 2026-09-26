import { formatDate } from "@/utils/format-date";

export function Meta({
  date,
  category,
  className = "",
}: {
  date?: string;
  category?: string;
  className?: string;
}) {
  if (!date && !category) return null;
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1 ${className}`}>
      {category && (
        <span className="bg-mist px-2 py-0.5 font-semibold text-navy-deep">{category}</span>
      )}
      {date && (
        <time dateTime={date} className="text-ink-soft">
          {formatDate(date)}
        </time>
      )}
    </div>
  );
}
