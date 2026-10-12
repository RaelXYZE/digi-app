import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import { getGaleri } from "@/utils/api";
import { PublicationCard } from "@/components/PublicationCard";
import { Pagination } from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: `Galeri | ${SITE.shortName}`,
  description:
    "Dokumentasi kegiatan Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/publikasi/galeri" },
  robots: { index: false, follow: true },
};

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const data = await getGaleri().catch(() => null);

  if (data === null) {
    return (
      <section className="section bg-white bleed bleed-white">
        <div className="wrap">
          <h1 className="text-step-3 font-bold text-navy-deep">Galeri</h1>
          <EmptyState
            variant="error"
            message="Galeri sedang tidak dapat dimuat dari server. Silakan coba lagi sebentar."
            actionHref="/publikasi/galeri"
            actionLabel="Coba muat ulang"
          />
        </div>
      </section>
    );
  }

  const items = data
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const { items: pageItems, safePage, totalPages } = paginate(
    items,
    pageParam,
    PAGE_SIZE,
  );

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Galeri</h1>
        {items.length === 0 ? (
          <EmptyState
            variant="empty"
            message="Tidak ada dokumentasi kegiatan yang ditampilkan saat ini."
          />
        ) : (
          <>
            <Reveal stagger>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((item) => (
                <PublicationCard
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  image={item.image}
                  showImagePlaceholder
                />
              ))}
            </ul>
            </Reveal>
            <Pagination
              basePath="/publikasi/galeri"
              safePage={safePage}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </section>
  );
}