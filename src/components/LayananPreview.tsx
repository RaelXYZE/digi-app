import Link from "next/link";
import { LAYANAN, FEATURED_SERVICE_IDS } from "@/constants/layanan";
import { ExternalLink } from "@/components/external-link";

const featured = FEATURED_SERVICE_IDS.map((id) => LAYANAN.find((l) => l.id === id)).filter(
  (l): l is NonNullable<typeof l> => Boolean(l),
);

export default function LayananPreview() {
  return (
    <section id="layanan" aria-labelledby="services-heading" className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <h2 id="services-heading" className="text-step-3 font-bold text-navy-deep">
          Layanan untuk masyarakat
        </h2>
        <p className="mt-3 max-w-reading text-step-1 text-ink-soft">
          Pilih layanan yang Anda butuhkan. Setiap tautan membuka situs layanan resmi.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <li key={s.id} className="flex flex-col border border-line bg-white p-5">
              <h3 className="font-display text-step-1 font-bold text-navy-deep">
                <Link
                  href={`/layanan/${s.id}`}
                  className="text-navy-deep no-underline hover:text-brand"
                >
                  {s.name}
                </Link>
              </h3>
              <p className="mt-1 flex-1 text-ink-soft">{s.description}</p>
              <ExternalLink
                href={s.url}
                className="mt-3 inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4 hover:text-navy-deep"
              >
                {s.action}
              </ExternalLink>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/layanan"
            className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
          >
            Lihat semua layanan
          </Link>
        </div>
      </div>
    </section>
  );
}