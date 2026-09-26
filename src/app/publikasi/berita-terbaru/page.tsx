import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import data from "@/data/berita.json";
import type { Article } from "@/types";
import { PublicationCard } from "@/components/PublicationCard";

export const metadata: Metadata = {
  title: `Berita Terbaru | ${SITE.shortName}`,
  description:
    "Berita dan siaran pers terbaru dari Kementerian Komunikasi dan Digital.",
  alternates: { canonical: "/publikasi/berita-terbaru" },
  robots: { index: false, follow: true },
};

const articles = (data as Article[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export default function BeritaTerbaruPage() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Berita Terbaru</h1>
        {articles.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            Tidak ada berita yang ditampilkan saat ini.
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <PublicationCard
                key={article.id}
                title={article.title}
                date={article.date}
                category={article.category}
                summary={article.summary}
                url={article.url}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}