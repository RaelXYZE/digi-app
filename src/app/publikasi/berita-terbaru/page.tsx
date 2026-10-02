import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/constants/site";
import beritaData from "@/data/berita.json";
import { Placeholder } from "@/components/Placeholder";
import { isArticle } from "@/utils/type-guards";
import type { Article } from "@/types";

const PAGE_SIZE = 6;

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
    <li className="border border-line bg-white transition-colors hover:border-brand hover:bg-mist">
      <Link
        href={`/publikasi/berita-terbaru/${article.id}`}
        className="block no-underline"
      >
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- article thumbnail, no optimization needed
          <img src={article.image} alt={article.title} loading="lazy" className="aspect-video w-full border-b border-line bg-mist object-cover" />
        ) : (
          <div className="flex aspect-video items-center justify-center border-b border-line bg-mist">
            <Placeholder>{"[ISI: Foto berita]"}</Placeholder>
          </div>
        )}
        <h2 className="p-5 font-display text-step-1 font-bold text-navy-deep">
          {article.title}
        </h2>
      </Link>
    </li>
  );
}

export default async function BeritaTerbaruPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedArticles = articles.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Berita Terbaru</h1>
        {articles.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            Tidak ada berita yang ditampilkan saat ini.
          </p>
        ) : (
          <>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </ul>
            {totalPages > 1 && (
              <nav aria-label="Navigasi halaman" className="mt-10 flex items-center justify-center gap-4">
                {safePage > 1 && (
                  <Link
                    href={`/publikasi/berita-terbaru?page=${safePage - 1}`}
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
                    href={`/publikasi/berita-terbaru?page=${safePage + 1}`}
                    className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
                  >
                    Berikutnya
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
