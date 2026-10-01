import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/constants/site";
import beritaData from "@/data/berita.json";
import { Meta } from "@/components/meta";
import { isArticle } from "@/utils/type-guards";
import type { Article } from "@/types";

export const metadata: Metadata = {
  title: `Berita Terbaru | ${SITE.shortName}`,
  description:
    "Berita dan siaran pers terbaru dari Kementerian Komunikasi dan Digital.",
  alternates: { canonical: "/publikasi/berita-terbaru" },
  robots: { index: false, follow: true },
};

const articles = (beritaData as unknown[])
  .filter(isArticle)
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="flex flex-col border border-line bg-white p-5 transition-colors hover:border-brand hover:bg-mist">
      <h2 className="font-display text-step-1 font-bold text-navy-deep">
        <Link href={`/publikasi/berita-terbaru/${article.id}`} className="text-navy-deep no-underline hover:text-brand">
          {article.title}
        </Link>
      </h2>
      <Meta date={article.date} category={article.category} className="mt-2" />
      <p className="mt-2 flex-1 text-ink-soft">{article.summary}</p>
      <Link
        href={`/publikasi/berita-terbaru/${article.id}`}
        className="mt-3 inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4 hover:text-navy-deep"
      >
        Baca selengkapnya
      </Link>
    </li>
  );
}

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
              <ArticleCard key={article.id} article={article} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}