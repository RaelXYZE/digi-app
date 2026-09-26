import type { ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** External link: opens in a new tab and announces it to screen readers. */
export function ExternalLink({ href, className, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (buka di tab baru)</span>
    </a>
  );
}
