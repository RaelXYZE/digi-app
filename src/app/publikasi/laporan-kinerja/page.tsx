import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import laporanKinerjaData from "@/data/laporan-kinerja.json";
import { PublicationCard } from "@/components/PublicationCard";
import { isArticle } from "@/utils/type-guards";

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

export default function LaporanKinerjaPage() {
  return (
    <section className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Laporan Kinerja</h1>
        {reports.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            Tidak ada laporan kinerja yang ditampilkan saat ini.
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((item) => (
              <PublicationCard
                key={item.id}
                title={item.title}
                date={item.date}
                category={item.category}
                summary={item.summary}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}