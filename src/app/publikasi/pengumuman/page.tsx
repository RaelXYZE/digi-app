import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import data from "@/data/pengumuman.json";
import type { Article } from "@/types";
import { PublicationCard } from "@/components/PublicationCard";

export const metadata: Metadata = {
  title: `Pengumuman | ${SITE.shortName}`,
  description:
    "Pengumuman resmi dari Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/publikasi/pengumuman" },
  robots: { index: false, follow: true },
};

const announcements = (data as Article[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export default function PengumumanPage() {
  return (
    <section className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Pengumuman</h1>
        {announcements.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            Tidak ada pengumuman yang ditampilkan saat ini.
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {announcements.map((item) => (
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