# Balmon SFRID Kelas II Jayapura (digi-app)

Situs publik multi-halaman (Next.js App Router) untuk Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura. Sebagian besar halaman mengambil data dari backend **digi-api** (Django/DRF); sebagian konten (layanan, profil, identitas) masih konstanta di repo.

> Dokumentasi detail — sumber kebenaran — ada di [`docs/`](./docs/README.md). Panduan agent: [`AGENTS.md`](./AGENTS.md).

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000  (backend digi-api harus jalan di :8000 untuk halaman ber-data)
npm run build && npm start
```

Konfigurasi `.env`: lihat `.env.example`. `NEXT_PUBLIC_API_URL` = base URL digi-api (default `http://localhost:8000`); `NEXT_PUBLIC_SITE_URL` untuk metadata/OG/sitemap.

## Stack

Next.js 16 (App Router, `src/`), React 19, TypeScript (strict), Tailwind CSS 4. Dependensi UI ekstra: `@tsparticles/react` + `@tsparticles/slim` (latar partikel). Tanpa font unduhan, tanpa skrip pihak ketiga.

## Data & integrasi

Satu klien fetch terpusat: `src/utils/api.ts` (`getBerita`, `getBeritaItem`, `getPengumuman`, `getLaporanKinerja`, `getPegawai`, `getStatistik`, `getGaleri`, `getHealth`). Dipanggil dari server component (`revalidate: 60`); hasil disaring guard runtime `src/utils/type-guards.ts`. Peta lengkap & status per entity: [`docs/BACKEND_INTEGRATION.md`](./docs/BACKEND_INTEGRATION.md). Halaman uji koneksi: `/status-api`.

## Masih statis (bukan API)

- Identitas, menu, sosial: `src/constants/site.ts`
- Layanan & tautan: `src/constants/layanan.ts`, `src/constants/perizinan-online.ts`
- Konten profil (visi/misi/dll): `src/constants/tentang.ts`
- Wilayah kerja (peta): `src/components/wilayah-kerja/data.ts` (DEMO)

## Token desain

Ada di `src/app/globals.css` sebagai custom properties (dipetakan ke Tailwind 4 via `@theme inline`): `--color-navy-deep`, `--color-navy`, `--color-brand`, `--color-signal`, `--color-mist`/`--color-paper`, `--color-ink`. Judul = serif sistem, isi = sans sistem; skala fluid `--step-*`.

## Placeholder yang harus diisi

String berawalan `[ISI: ...]` dirender kuning lewat komponen `Placeholder`. Cari: `grep -rn "\[ISI" src`. Contoh: paragraf profil (`constants/tentang.ts`), konten berita (`content` dari API masih `[ISI: ...]`).

## Verifikasi

`npx tsc --noEmit` + `npm run lint` (tidak ada test runner). Setelah perubahan struktur besar: `/graphify --update`.

