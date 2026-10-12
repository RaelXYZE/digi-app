import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/constants/site";
import { getBerita } from "@/utils/api";
import { Placeholder } from "@/components/Placeholder";
import { Pagination } from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import type { Article } from "@/types";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: `Berita Terbaru | ${SITE.shortName}`,
  description:
    "Berita dan siaran pers terbaru dari Kementerian Komunikasi dan Digital.",
  alternates: { canonical: "/publikasi/berita-terbaru" },
  robots: { index: false, follow: true },
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="border border-line bg-white transition-colors hover:border-brand hover:bg-mist card-hover">
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
        <div className="p-5">
          <h2 className="line-clamp-2 font-display text-step-0 font-bold text-navy-deep">
            {article.title}
          </h2>
        </div>
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
  const berita = await getBerita().catch(() => null);

  if (berita === null) {
    return (
      <section className="section bg-white bleed bleed-white">
        <div className="wrap">
          <h1 className="text-step-3 font-bold text-navy-deep">Berita Terbaru</h1>
          <EmptyState
            variant="error"
            message="Berita sedang tidak dapat dimuat dari server. Silakan coba lagi sebentar."
            actionHref="/publikasi/berita-terbaru"
            actionLabel="Coba muat ulang"
          />
        </div>
      </section>
    );
  }

  const articles = berita
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const { items: paginatedArticles, safePage, totalPages } = paginate(
    articles,
    pageParam,
    PAGE_SIZE,
  );

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Berita Terbaru</h1>
        {articles.length === 0 ? (
          <EmptyState
            variant="empty"
            message="Tidak ada berita yang ditampilkan saat ini."
          />
        ) : (
          <>
            <Reveal stagger>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </ul>
            </Reveal>
            <Pagination
              basePath="/publikasi/berita-terbaru"
              safePage={safePage}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </section>
  );
}
