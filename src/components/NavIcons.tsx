import type { NavIconName } from "@/constants/site";

const PATHS: Record<NavIconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  profile: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M16 9h2a2 2 0 0 1 2 2v10" />
      <path d="M8 7h4M8 11h4M8 15h4" />
    </>
  ),
  services: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  publication: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v14a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M17 8h2a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2" />
      <path d="M8 7h5M8 11h5M8 15h3" />
    </>
  ),
};

/** Inline nav icon. Renders nothing when `name` is unknown/undefined. */
export function NavIcon({
  name,
  className,
}: {
  name?: NavIconName;
  className?: string;
}) {
  if (!name || !(name in PATHS)) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
