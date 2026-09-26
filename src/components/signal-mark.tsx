/** Simple brand mark: a dot and signal arcs. Decorative. */
export function SignalMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <circle cx="18" cy="46" r="5" fill="currentColor" />
      <path
        d="M18 30a16 16 0 0 1 16 16M18 16a30 30 0 0 1 30 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
