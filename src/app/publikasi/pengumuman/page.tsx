import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import pengumumanData from "@/data/pengumuman.json";
import { PublicationCard } from "@/components/PublicationCard";
import { Pagination } from "@/components/Pagination";
import { isArticle } from "@/utils/type-guards";
import { paginate } from "@/utils/paginate";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: `Pengumuman | ${SITE.shortName}`,
  description:
    "Pengumuman resmi dari Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/publikasi/pengumuman" },
  robots: { index: false, follow: true },
};

const announcements = (pengumumanData as unknown[])
  .filter(isArticle)
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export default async function PengumumanPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const { items, safePage, totalPages } = paginate(
    announcements,
    pageParam,
    PAGE_SIZE,
  );

  return (
    <section className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Pengumuman</h1>
        {announcements.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            Tidak ada pengumuman yang ditampilkan saat ini.
          </p>
        ) : (
          <>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <PublicationCard
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  category={item.category}
                  summary={item.summary}
                />
              ))}
            </ul>
            <Pagination
              basePath="/publikasi/pengumuman"
              safePage={safePage}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </section>
  );
}