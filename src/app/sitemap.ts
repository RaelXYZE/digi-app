import type { MetadataRoute } from "next";
import { LAYANAN } from "@/constants/layanan";
import { NOINDEX_ROUTES } from "@/constants/site";
import { isPlaceholderService } from "@/utils/placeholder";
import beritaData from "@/data/berita.json";
import { isArticle } from "@/utils/type-guards";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/layanan",
    "/layanan/perizinan-online",
    "/profil",
    "/profil/daftar-pegawai",
    "/profil/wilayah-kerja",
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
    ...beritaData
      .filter(isArticle)
      .filter((a) => !a.content?.startsWith("[ISI"))
      .map((a) => ({
        url: `${siteUrl}/publikasi/berita-terbaru/${a.id}`,
        lastModified,
      })),
  ];
}