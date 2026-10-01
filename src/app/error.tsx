"use client";

import Link from "next/link";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Terjadi kesalahan</h1>
        <p className="mt-4 max-w-reading text-step-1 text-ink-soft">
          Maaf, terjadi kesalahan saat memuat halaman ini. Coba lagi atau kembali ke beranda.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => retry()}
            className="btn bg-brand text-white hover:bg-navy-deep"
          >
            Coba lagi
          </button>
          <Link
            href="/"
            className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
