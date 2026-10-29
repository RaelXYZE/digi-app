import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE } from "@/constants/site";
import { getBeritaItem } from "@/utils/api";
import { Meta } from "@/components/meta";
import { Placeholder } from "@/components/Placeholder";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmptyState } from "@/components/EmptyState";
import { ViewsBadge } from "@/components/ViewsBadge";
import { ViewTracker } from "@/components/ViewTracker";
import type { Article } from "@/types";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBeritaItem(slug).catch(() => null);
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
  let article: Article | null = null;
  let failed = false;
  try {
    article = await getBeritaItem(slug);
  } catch {
    failed = true;
  }
  if (failed) {
    return (
      <section className="section bg-white bleed bleed-white">
        <div className="wrap">
          <h1 className="text-step-3 font-bold text-navy-deep">Berita</h1>
          <EmptyState
            variant="error"
            message="Berita sedang tidak dapat dimuat dari server. Silakan coba lagi sebentar."
            actionHref="/publikasi/berita-terbaru"
            actionLabel="Kembali ke berita terbaru"
          />
        </div>
      </section>
    );
  }
  if (!article) notFound();

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <Breadcrumb
          items={[
            { label: "Berita Terbaru", href: "/publikasi/berita-terbaru" },
            { label: article.title },
          ]}
        />

        <h1 className="mt-6 max-w-reading text-step-3 font-bold text-navy-deep">
          {article.title}
        </h1>

        <Meta date={article.date} category={article.category} className="mt-4" />
        <ViewsBadge views={article.views} className="mt-2" />
        <ViewTracker id={slug} />
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
