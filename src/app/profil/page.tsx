import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import { VISION, MISSION } from "@/constants/tentang";
import ProfilKantor from "@/components/ProfilKantor";

const hasPlaceholder =
  VISION.startsWith("[ISI") ||
  MISSION.some((m) => m.startsWith("[ISI"));

export const metadata: Metadata = {
  title: `Profil | ${SITE.shortName}`,
  description:
    "Visi, misi, tugas dan fungsi, serta fokus kerja Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/profil" },
  robots: hasPlaceholder ? { index: false, follow: true } : undefined,
};

export default function ProfilPage() {
  return <ProfilKantor />;
}
