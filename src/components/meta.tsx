import { formatDate } from "@/utils/format-date";
import { formatRelativeDate } from "@/utils/relative-time";

export function Meta({
  date,
  category,
  className = "",
  children,
  relative = false,
}: {
  date?: string;
  category?: string;
  className?: string;
  children?: React.ReactNode;
  relative?: boolean;
}) {
  if (!date && !category) return null;
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1 ${className}`}>
      {category && (
        <span className="bg-mist px-2 py-0.5 font-semibold text-navy-deep">{category}</span>
      )}
      {date && (
        <time
          dateTime={date}
          className="text-ink-soft"
          title={relative ? formatDate(date) : undefined}
        >
          {relative ? formatRelativeDate(date) : formatDate(date)}
        </time>
      )}
      {children}
    </div>
  );
}
