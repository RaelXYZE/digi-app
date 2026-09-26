import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import Layanan from "@/components/Layanan";

export const metadata: Metadata = {
  title: `Layanan | ${SITE.shortName}`,
  description:
    "Daftar layanan publik Komdigi: perizinan, pengaduan konten dan nomor, serta informasi publik.",
  alternates: { canonical: "/layanan" },
};

export default function LayananPage() {
  return <Layanan />;
}