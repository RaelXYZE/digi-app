import beritaData from "@/data/berita.json";
import Link from "next/link";
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
              Anda tetap bisa membaca seluruh berita di halaman Berita Terbaru.
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
              {featured.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- article thumbnail, no optimization needed
                <img src={featured.image} alt={featured.title} loading="lazy" className="mb-4 aspect-video w-full border border-line bg-mist object-cover" />
              ) : (
                <div className="mb-4 flex aspect-video items-center justify-center border border-line bg-mist">
                  <Placeholder>{"[ISI: Foto berita]"}</Placeholder>
                </div>
              )}
              <Meta date={featured.date} category={featured.category} />
              {featured.author && (
                <p className="mt-1 text-step--1 text-ink-soft">
                  <Placeholder>{featured.author}</Placeholder>
                </p>
              )}
              <h3 className="mt-4 font-display text-step-3 font-bold leading-tight">
                <Link
                  href={`/publikasi/berita-terbaru/${featured.id}`}
                  className="text-navy-deep underline-offset-4 hover:underline"
                >
                  {featured.title}
                </Link>
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
                      <Link
                        href={`/publikasi/berita-terbaru/${article.id}`}
                        className="text-navy-deep underline-offset-4 hover:underline"
                      >
                        {article.title}
                      </Link>
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
