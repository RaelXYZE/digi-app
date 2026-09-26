import data from "@/data/berita.json";
import type { Article as NewsType } from "@/types";
import Link from "next/link";
import { formatDate } from "@/utils/format-date";
import { ExternalLink } from "@/components/external-link";
import { Placeholder } from "@/components/Placeholder";

const articles = (data as NewsType[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 6);

function Meta({ article }: { article: NewsType }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1">
      <span className="bg-mist px-2 py-0.5 font-semibold text-navy-deep">{article.category}</span>
      <time dateTime={article.date} className="text-ink-soft">
        {formatDate(article.date)}
      </time>
    </div>
  );
}

export default function Berita() {
  const [featured, ...rest] = articles;

  return (
    <section id="berita" aria-labelledby="news-heading" className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h2 id="news-heading" className="text-step-3 font-bold text-navy-deep">
          Berita terbaru
        </h2>

        {!featured ? (
          <div className="mt-8 border border-line bg-mist p-6">
            <p className="font-semibold text-navy-deep">Belum ada berita yang ditampilkan.</p>
            <p className="mt-1 text-ink-soft">
              Daftar berita sedang dimuat ulang. Anda tetap bisa membaca seluruh berita di situs
              resmi.
            </p>
            <Link
              href="/publikasi/berita-terbaru"
              className="btn mt-4 bg-brand text-white hover:bg-navy-deep"
            >
              Buka semua berita
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <article className="border-t-4 border-brand pt-5">
              <Meta article={featured} />
              <h3 className="mt-4 font-display text-step-3 font-bold leading-tight">
                <ExternalLink
                  href={featured.url}
                  className="text-navy-deep underline-offset-4 hover:underline"
                >
                  {featured.title}
                </ExternalLink>
              </h3>
              <p className="mt-4 max-w-reading text-step-1 text-ink-soft">
                <Placeholder>{featured.summary}</Placeholder>
              </p>
            </article>

            <ul className="border-t border-line">
              {rest.map((article) => (
                <li key={article.id}>
                  <article className="border-b border-line py-5">
                    <Meta article={article} />
                    <h3 className="mt-2 font-display text-step-1 font-bold leading-snug">
                      <ExternalLink
                        href={article.url}
                        className="text-navy-deep underline-offset-4 hover:underline"
                      >
                        {article.title}
                      </ExternalLink>
                    </h3>
                    <p className="mt-2 text-ink-soft">
                      <Placeholder>{article.summary}</Placeholder>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10">
<Link
          href="/publikasi/berita-terbaru"
          className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
        >
          Semua berita
        </Link>
        </div>
      </div>
    </section>
  );
}
