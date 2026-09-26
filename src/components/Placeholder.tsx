type Props = {
  children: string;
};

/** Wraps [ISI: ...] placeholder strings in a visually-flagged span. */
export function Placeholder({ children }: Props) {
  const isPlaceholder = children.startsWith("[ISI");
  return isPlaceholder ? <span className="placeholder">{children}</span> : <>{children}</>;
}