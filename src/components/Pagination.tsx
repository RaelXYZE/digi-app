import Link from "next/link";

export function Pagination({
  basePath,
  safePage,
  totalPages,
}: {
  basePath: string;
  safePage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Navigasi halaman" className="mt-10 flex items-center justify-center gap-4">
      {safePage > 1 && (
        <Link
          href={`${basePath}?page=${safePage - 1}`}
          className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
        >
          Sebelumnya
        </Link>
      )}
      <span className="text-ink-soft">
        Halaman {safePage} dari {totalPages}
      </span>
      {safePage < totalPages && (
        <Link
          href={`${basePath}?page=${safePage + 1}`}
          className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
        >
          Berikutnya
        </Link>
      )}
    </nav>
  );
}
