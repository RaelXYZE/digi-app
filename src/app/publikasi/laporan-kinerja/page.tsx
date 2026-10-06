import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import laporanKinerjaData from "@/data/laporan-kinerja.json";
import { ExternalLink } from "@/components/external-link";
import { Pagination } from "@/components/Pagination";
import { formatDate } from "@/utils/format-date";
import { isArticle } from "@/utils/type-guards";
import { paginate } from "@/utils/paginate";
import type { Article } from "@/types";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: `Laporan Kinerja | ${SITE.shortName}`,
  description:
    "Laporan kinerja Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/publikasi/laporan-kinerja" },
  robots: { index: false, follow: true },
};

const reports = (laporanKinerjaData as unknown[])
  .filter(isArticle)
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

function CoverFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[3/4] w-24 shrink-0 flex-col items-center justify-center gap-1 border-r border-line bg-mist text-ink-soft"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
      <span className="text-step--2 font-semibold">LAKIN</span>
    </div>
  );
}

function ReportCard({ report }: { report: Article }) {
  return (
    <li className="relative flex min-h-11 border border-line bg-white transition-colors hover:border-brand hover:bg-mist">
      {report.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- report cover thumbnail, no optimization needed
        <img
          src={report.image}
          alt={`Sampul ${report.title}`}
          loading="lazy"
          className="aspect-[3/4] w-24 shrink-0 border-r border-line bg-mist object-cover"
        />
      ) : (
        <CoverFallback />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-step-1 font-bold text-navy-deep">
          {report.fileUrl ? (
            <ExternalLink
              href={report.fileUrl}
              className="text-navy-deep after:absolute after:inset-0 after:content-['']"
            >
              {report.title}
            </ExternalLink>
          ) : (
            report.title
          )}
        </h2>
        <p className="mt-2 text-step--1 text-ink-soft">
          PDF • {formatDate(report.date)}
        </p>
      </div>
    </li>
  );
}

export default async function LaporanKinerjaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const { items: pageItems, safePage, totalPages } = paginate(
    reports,
    pageParam,
    PAGE_SIZE,
  );

  return (
    <section className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Laporan Kinerja</h1>
        {reports.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            Tidak ada laporan kinerja yang ditampilkan saat ini.
          </p>
        ) : (
          <>
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((item) => (
                <ReportCard key={item.id} report={item} />
              ))}
            </ul>
            <Pagination
              basePath="/publikasi/laporan-kinerja"
              safePage={safePage}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </section>
  );
}
