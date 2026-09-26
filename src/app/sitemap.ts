import type { MetadataRoute } from "next";
import { LAYANAN } from "@/constants/layanan";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/layanan",
    "/layanan/perizinan-online",
    "/publikasi/berita-terbaru",
    "/publikasi/pengumuman",
    "/publikasi/galeri",
  ];

  const lastModified = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
    })),
    ...LAYANAN.map((s) => ({
      url: `${siteUrl}/layanan/${s.id}`,
      lastModified,
    })),
  ];
}