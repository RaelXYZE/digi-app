import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import { WilayahKerja } from "@/components/wilayah-kerja";
import { EmptyState } from "@/components/EmptyState";
import { getWilayahKerja } from "@/utils/api";

export const metadata: Metadata = {
  title: `Wilayah Kerja | ${SITE.shortName}`,
  description: "Peta interaktif wilayah kerja Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/profil/wilayah-kerja" },
  robots: { index: false, follow: true },
};

export default async function WilayahKerjaPage() {
  const data = await getWilayahKerja().catch(() => null);

  if (data === null) {
    return (
      <section className="section bg-white bleed bleed-white">
        <div className="wrap">
          <h1 className="text-step-3 font-bold text-navy-deep">Wilayah Kerja</h1>
          <EmptyState
            variant="error"
            message="Data wilayah kerja sedang tidak dapat dimuat dari server. Silakan coba lagi sebentar."
            actionHref="/profil/wilayah-kerja"
            actionLabel="Coba muat ulang"
          />
        </div>
      </section>
    );
  }

  return <WilayahKerja data={data} />;
}
