import type { Article, Employee, GalleryItem, HomeStat } from "@/types";
import type { Kabupaten } from "@/components/wilayah-kerja/types";
import { isArticle, isEmployee, isGalleryItem, isHomeStat, isWilayahKerja } from "@/utils/type-guards";
import { apiUrl } from "@/utils/env";

const API_URL = apiUrl;

export type ApiHealth = {
  status: string;
  database: string;
};

export async function getHealth(): Promise<ApiHealth> {
  const res = await fetch(`${API_URL}/api/v1/health/`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Health check gagal: ${res.status}`);
  return (await res.json()) as ApiHealth;
}

export async function getBerita(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/api/v1/berita/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Daftar berita gagal: ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.filter(isArticle) : [];
}

/** Null = berita tidak ada (404); throw = API bermasalah. */
export async function getBeritaItem(id: string): Promise<Article | null> {
  const res = await fetch(`${API_URL}/api/v1/berita/${encodeURIComponent(id)}/`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Berita ${id} gagal: ${res.status}`);
  const data: unknown = await res.json();
  if (!isArticle(data)) throw new Error(`Berita ${id} tidak sesuai kontrak`);
  return data;
}

export async function getPengumuman(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/api/v1/pengumuman/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Daftar pengumuman gagal: ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.filter(isArticle) : [];
}

export async function getLaporanKinerja(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/api/v1/laporan-kinerja/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Daftar laporan kinerja gagal: ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.filter(isArticle) : [];
}

export async function getPegawai(): Promise<Employee[]> {
  const res = await fetch(`${API_URL}/api/v1/pegawai/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Daftar pegawai gagal: ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.filter(isEmployee) : [];
}

export async function getStatistik(): Promise<HomeStat[]> {
  const res = await fetch(`${API_URL}/api/v1/statistik/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Daftar statistik gagal: ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.filter(isHomeStat) : [];
}

export async function getGaleri(): Promise<GalleryItem[]> {
  const res = await fetch(`${API_URL}/api/v1/galeri/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Daftar galeri gagal: ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.filter(isGalleryItem) : [];
}

export async function getWilayahKerja(): Promise<Kabupaten[]> {
  const res = await fetch(`${API_URL}/api/v1/wilayah-kerja/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Daftar wilayah kerja gagal: ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.filter(isWilayahKerja) : [];
}
