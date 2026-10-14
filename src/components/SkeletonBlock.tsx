type SkeletonBlockProps = {
  className?: string;
  children?: React.ReactNode;
};

export function SkeletonBlock({ className = "", children }: SkeletonBlockProps) {
  return <div aria-hidden="true" className={`skeleton ${className}`}>{children}</div>;
}
