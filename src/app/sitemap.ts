import type { MetadataRoute } from "next";
import { LAYANAN } from "@/constants/layanan";
import { NOINDEX_ROUTES } from "@/constants/site";
import { isPlaceholderService } from "@/utils/placeholder";
import { getBerita } from "@/utils/api";

import { siteUrl } from "@/utils/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    ...(
      (await getBerita().catch(() => null)) ?? []
    )
      .filter((a) => !a.content?.startsWith("[ISI"))
      .map((a) => ({
        url: `${siteUrl}/publikasi/berita-terbaru/${a.id}`,
        lastModified,
      })),
  ];
}