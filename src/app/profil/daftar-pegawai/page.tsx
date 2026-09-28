import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import DaftarPegawai from "@/components/DaftarPegawai";

export const metadata: Metadata = {
  title: `Daftar Pegawai | ${SITE.shortName}`,
  description: "Daftar pegawai Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura.",
  alternates: { canonical: "/profil/daftar-pegawai" },
  robots: { index: false, follow: true },
};

export default function DaftarPegawaiPage() {
  return <DaftarPegawai />;
}