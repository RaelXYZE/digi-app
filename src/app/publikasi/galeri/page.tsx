import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import data from "@/data/galeri.json";
import type { GalleryItem } from "@/types";
import { PublicationCard } from "@/components/PublicationCard";

export const metadata: Metadata = {
  title: `Galeri | ${SITE.shortName}`,
  description:
    "Dokumentasi kegiatan Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/publikasi/galeri" },
  robots: { index: false, follow: true },
};

const items = (data as GalleryItem[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export default function GaleriPage() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Galeri</h1>
        {items.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            Tidak ada dokumentasi kegiatan yang ditampilkan saat ini.
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <PublicationCard
                key={item.id}
                title={item.title}
                date={item.date}
                showImagePlaceholder
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}