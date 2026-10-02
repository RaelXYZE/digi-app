import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import beritaData from "@/data/berita.json";
import { SITE } from "@/constants/site";
import { Meta } from "@/components/meta";
import { Placeholder } from "@/components/Placeholder";
import { isArticle } from "@/utils/type-guards";

type Params = Promise<{ slug: string }>;

const articles = (beritaData as unknown[]).filter(isArticle);

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) return { title: "Berita tidak ditemukan" };
  return {
    title: `${article.title} | ${SITE.shortName}`,
    description: article.summary,
    alternates: { canonical: `/publikasi/berita-terbaru/${slug}` },
    robots: article.content?.startsWith("[ISI") ? { index: false, follow: true } : undefined,
  };
}

export default async function ArticleDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) notFound();

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="text-step--1 text-ink-soft">
          <Link href="/publikasi/berita-terbaru" className="text-ink-soft underline-offset-4 hover:underline">
            Berita Terbaru
          </Link>
          {" / "}
          <span className="text-navy-deep">{article.title}</span>
        </nav>

        <h1 className="mt-6 max-w-reading text-step-3 font-bold text-navy-deep">
          {article.title}
        </h1>

        <Meta date={article.date} category={article.category} className="mt-4" />
        {article.author && (
          <p className="mt-1 text-step--1 text-ink-soft">
            <Placeholder>{article.author}</Placeholder>
          </p>
        )}

        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- article hero image, no optimization needed
          <img src={article.image} alt={article.title} loading="lazy" className="mt-6 mb-6 aspect-video w-full border border-line bg-mist object-cover" />
        ) : (
          <div className="mt-6 mb-6 flex aspect-video items-center justify-center border border-line bg-mist">
            <Placeholder>{"[ISI: Foto berita]"}</Placeholder>
          </div>
        )}

        <p className="mt-6 max-w-reading text-step-1 leading-[1.7] text-ink">
          {article.content ? (
            <Placeholder>{article.content}</Placeholder>
          ) : (
            article.summary
          )}
        </p>

        <div className="mt-10">
          <Link
            href="/publikasi/berita-terbaru"
            className="inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4 hover:text-navy-deep"
          >
            Kembali ke berita terbaru
          </Link>
        </div>
      </div>
    </section>
  );
}
