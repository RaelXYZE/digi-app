import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Meta } from "@/components/meta";
import { SITE } from "@/constants/site";
import { getBerita, getHealth } from "@/utils/api";

export const metadata: Metadata = {
  title: `Status API | ${SITE.shortName}`,
  description: "Halaman uji koneksi digi-app ke digi-api.",
  robots: { index: false, follow: false },
};

export default async function StatusApiPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const health = await getHealth().catch(() => null);
  const berita = await getBerita().catch(() => null);

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Status API</h1>
        <p className="mt-2 text-ink-soft">
          Halaman uji internal — data dibaca langsung dari digi-api setiap
          request.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-line bg-paper p-5">
            <h2 className="text-step-0 font-bold text-navy-deep">
              Health check
            </h2>
            {health ? (
              <p className="mt-2 text-ink">
                Layanan:{" "}
                <strong className="font-semibold">{health.status}</strong> ·
                Database:{" "}
                <strong className="font-semibold">{health.database}</strong>
              </p>
            ) : (
              <p className="mt-2 text-ink">
                Gagal menghubungi API. Pastikan digi-api berjalan di port 8000.
              </p>
            )}
          </div>
          <div className="border border-line bg-paper p-5">
            <h2 className="text-step-0 font-bold text-navy-deep">
              Berita dari API
            </h2>
            <p className="mt-2 text-ink">
              {berita
                ? `${berita.length} item diterima.`
                : "Gagal memuat daftar berita dari API."}
            </p>
          </div>
        </div>

        {berita && berita.length > 0 && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {berita.map((article) => (
              <li
                key={article.id}
                className="border border-line bg-white p-5"
              >
                <Meta date={article.date} category={article.category} />
                <h3 className="mt-2 line-clamp-2 font-display text-step-0 font-bold text-navy-deep">
                  {article.title}
                </h3>
                <p className="mt-1 text-step--1 text-ink-soft">
                  {article.summary}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
