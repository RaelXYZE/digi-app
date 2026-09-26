import beritaData from "@/data/berita.json";
import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
import { Meta } from "@/components/meta";
import { Placeholder } from "@/components/Placeholder";
import { isArticle } from "@/utils/type-guards";

const articles = (beritaData as unknown[])
  .filter(isArticle)
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 6);

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
              <Meta date={featured.date} category={featured.category} />
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
                    <Meta date={article.date} category={article.category} />
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
