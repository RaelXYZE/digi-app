import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import { WilayahKerja } from "@/components/wilayah-kerja";

export const metadata: Metadata = {
  title: `Wilayah Kerja | ${SITE.shortName}`,
  description: "Peta interaktif wilayah kerja Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/profil/wilayah-kerja" },
  robots: { index: false, follow: true },
};

export default function WilayahKerjaPage() {
  return <WilayahKerja />;
}
