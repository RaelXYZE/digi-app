import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import beritaData from "@/data/berita.json";
import { SITE } from "@/constants/site";
import { ExternalLink } from "@/components/external-link";
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

        <p className="mt-6 max-w-reading text-step-1 leading-[1.7] text-ink">
          {article.content ? (
            <Placeholder>{article.content}</Placeholder>
          ) : (
            article.summary
          )}
        </p>

        {article.url && (
          <div className="mt-10">
            <ExternalLink
              href={article.url}
              className="btn bg-signal text-navy-deep hover:bg-white"
            >
              Baca di situs resmi
            </ExternalLink>
          </div>
        )}

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
