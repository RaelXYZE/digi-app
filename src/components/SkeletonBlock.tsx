type SkeletonBlockProps = {
  className?: string;
};

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />;
}
