import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import { getPengumuman } from "@/utils/api";
import { PublicationCard } from "@/components/PublicationCard";
import { Pagination } from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: `Pengumuman | ${SITE.shortName}`,
  description:
    "Pengumuman resmi dari Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/publikasi/pengumuman" },
  robots: { index: false, follow: true },
};

export default async function PengumumanPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const data = await getPengumuman().catch(() => null);

  if (data === null) {
    return (
      <section className="section bg-paper bleed bleed-paper">
        <div className="wrap">
          <h1 className="text-step-3 font-bold text-navy-deep">Pengumuman</h1>
          <EmptyState
            variant="error"
            message="Pengumuman sedang tidak dapat dimuat dari server. Silakan coba lagi sebentar."
            actionHref="/publikasi/pengumuman"
            actionLabel="Coba muat ulang"
          />
        </div>
      </section>
    );
  }

  const announcements = data
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
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
          <EmptyState
            variant="empty"
            message="Tidak ada pengumuman yang ditampilkan saat ini."
          />
        ) : (
          <>
            <Reveal stagger>
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
            </Reveal>
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