import type { MetadataRoute } from "next";
import { LAYANAN } from "@/constants/layanan";
import { NOINDEX_ROUTES } from "@/constants/site";
import { isPlaceholderService } from "@/utils/placeholder";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/layanan",
    "/layanan/perizinan-online",
    "/profil",
    "/profil/daftar-pegawai",
    "/publikasi/berita-terbaru",
    "/publikasi/pengumuman",
    "/publikasi/galeri",
    "/publikasi/laporan-kinerja",
  ].filter((path) => !NOINDEX_ROUTES.includes(path));

  const lastModified = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
    })),
    ...LAYANAN.filter((s) => !isPlaceholderService(s)).map((s) => ({
      url: `${siteUrl}/layanan/${s.id}`,
      lastModified,
    })),
  ];
}