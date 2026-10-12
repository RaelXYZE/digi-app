import Link from "next/link";

type EmptyStateProps = {
  variant: "empty" | "error";
  message: string;
  actionHref?: string;
  actionLabel?: string;
};

function Icon({ variant }: { variant: "empty" | "error" }) {
  if (variant === "error") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3L22 20H2L12 3Z" />
        <path d="M12 10v4" />
        <path d="M12 17.5v.5" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

export function EmptyState({ variant, message, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="mt-8 flex items-start gap-4 border border-line bg-white p-6">
      <span className={variant === "error" ? "shrink-0 text-brand" : "shrink-0 text-ink-soft"}>
        <Icon variant={variant} />
      </span>
      <div>
        <p className="font-semibold text-navy-deep">{message}</p>
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="btn mt-4 border border-brand bg-white text-brand hover:bg-brand hover:text-white"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
