import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import Hero from "@/components/Hero";
import TentangKami from "@/components/TentangKami";
import LayananPreview from "@/components/LayananPreview";
import Berita from "@/components/Berita";

export const metadata: Metadata = {
  title: `Beranda | ${SITE.shortName}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Hero />
      <TentangKami />
      <LayananPreview />
      <Berita />
    </>
  );
}