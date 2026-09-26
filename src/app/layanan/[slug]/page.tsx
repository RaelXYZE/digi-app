import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LAYANAN } from "@/constants/layanan";
import { SITE } from "@/constants/site";
import { ExternalLink } from "@/components/external-link";
import { Placeholder } from "@/components/Placeholder";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return LAYANAN.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = LAYANAN.find((s) => s.id === slug);
  if (!service) return { title: "Layanan tidak ditemukan" };
  const hasPlaceholder =
    service.longDescription?.startsWith("[ISI") ||
    service.requirements?.some((r) => r.startsWith("[ISI")) ||
    service.steps?.some((s) => s.startsWith("[ISI"));
  return {
    title: `${service.name} | ${SITE.shortName}`,
    description: service.description,
    alternates: { canonical: `/layanan/${slug}` },
    robots: hasPlaceholder ? { index: false, follow: true } : undefined,
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = LAYANAN.find((s) => s.id === slug);
  if (!service) notFound();

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="text-step--1 text-ink-soft">
          <Link href="/layanan" className="text-ink-soft underline-offset-4 hover:underline">
            Layanan
          </Link>
          {" / "}
          <span className="text-navy-deep">{service.name}</span>
        </nav>

        <h1 className="mt-6 max-w-reading text-step-3 font-bold text-navy-deep">
          {service.name}
        </h1>

        <p className="mt-4 max-w-reading text-step-1 text-ink-soft">
          <Placeholder>{service.description}</Placeholder>
        </p>

        {service.longDescription && (
          <p className="mt-4 max-w-reading text-step-1 leading-[1.7] text-ink">
            <Placeholder>{service.longDescription}</Placeholder>
          </p>
        )}

        {service.requirements && service.requirements.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-step-2 font-bold text-navy-deep">
              Persyaratan
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-brand">
              {service.requirements.map((r, i) => (
                <li key={i}>
                  <Placeholder>{r}</Placeholder>
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.steps && service.steps.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-step-2 font-bold text-navy-deep">
              Langkah-langkah
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 marker:text-brand">
              {service.steps.map((s, i) => (
                <li key={i}>
                  <Placeholder>{s}</Placeholder>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10">
          <ExternalLink
            href={service.url}
            className="btn bg-signal text-navy-deep hover:bg-white"
          >
            {service.action}
          </ExternalLink>
        </div>

        <div className="mt-10">
          <Link
            href="/layanan"
            className="inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4 hover:text-navy-deep"
          >
            Kembali ke daftar layanan
          </Link>
        </div>
      </div>
    </section>
  );
}