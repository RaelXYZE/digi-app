import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import PerizinanOnline from "@/components/PerizinanOnline";

export const metadata: Metadata = {
  title: `Perizinan Online | ${SITE.shortName}`,
  description:
    "Aplikasi Perizinan Online Ditjen Infrastruktur Digital: izin stasiun radio, sertifikasi alat, dan pengujian perangkat telekomunikasi.",
  alternates: { canonical: "/layanan/perizinan-online" },
};

export default function PerizinanOnlinePage() {
  return (
    <>
      <h1 className="sr-only">Perizinan Online</h1>
      <PerizinanOnline />
    </>
  );
}