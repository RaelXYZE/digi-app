# Homepage Balmon SFRID kelas 2 Jayapura (Next.js)

Halaman tunggal dengan empat bagian: Beranda, Tentang Kami, Layanan, Berita.
Dibuat mengikuti `AGENTS.md`, dengan isi yang diambil dari hasil scraping beranda komdigi.go.id.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Opsional: buat `.env.local` berisi `NEXT_PUBLIC_SITE_URL=https://domain-anda` agar metadata Open Graph memakai domain yang benar.

## Stack

Next.js 16 (App Router, folder `src/`), React 19, TypeScript, Tailwind CSS 4.
Tanpa dependensi tambahan, tanpa font unduhan, tanpa skrip pihak ketiga.
`AGENTS.md` menyarankan folder `pages/`; proyek ini memakai `src/app/` (App Router) karena itu default Next.js saat ini. Folder lain (`components`, `layouts`, `constants`, `hooks`, `utils`, `types`, `data`) mengikuti saran tersebut.

## Token desain

Semua ada di `src/app/globals.css` sebagai custom properties, dipetakan ke Tailwind 4 via `@theme inline`.

| Token | Nilai | Fungsi |
|---|---|---|
| `--color-navy-deep` | `#021e4e` | Hero |
| `--color-navy` | `#00336c` | Footer (sama dengan footer situs sumber) |
| `--color-brand` | `#00458e` | Tautan dan tombol di latar terang |
| `--color-signal` | `#21ccf1` | Aksi utama di latar gelap (isian saja, bukan teks) |
| `--color-mist` / `--color-paper` | `#e6effa` / `#f4f7fb` | Latar lembut |
| `--color-ink` / `--color-ink-soft` | `#0e1b2c` / `#445269` | Teks |

Warna diturunkan dari situs sumber. Kontras semua pasangan teks/latar sudah dihitung (terendah 6,8:1).
Tipografi: judul memakai serif sistem (Iowan Old Style / Palatino / Georgia), isi memakai sans sistem. Skala `--step--1` sampai `--step-4` bersifat fluid.

## Mengganti data

- Data instansi, menu, dan media sosial: `src/constants/site.ts`
- Daftar layanan dan tautan cepat Beranda: `src/constants/layanan.ts`
- Konten Tentang Kami: `src/constants/tentang.ts`
- Berita: `src/data/berita.json` (terpisah dari markup, siap diganti API). Komponen mengurutkan dari terbaru dan menampilkan maksimal 6.

## Placeholder yang harus diisi

Semua placeholder tampil dengan latar kuning dan berawalan `[ISI: ...]`. Cari dengan `grep -rn "\[ISI" src`.

- `src/constants/tentang.ts`: 3 paragraf profil, visi, 3 misi, 4 butir tugas dan fungsi, nama pimpinan
- `src/data/berita.json`: `ringkasan` untuk enam berita (situs sumber tidak menyertakan ringkasan di beranda)

## Hal yang perlu Anda periksa

- **Tanggal berita** diambil dari tanggal unggah gambar pada URL sumber (mis. `uploads/2026/9/17/`), bukan dari tanggal terbit resmi. Cocokkan dengan halaman beritanya.
- **Deskripsi layanan** untuk Sertifikasi, Perizinan, Pengembangan SDM, Instansi pemerintah, Umum, dan Aduan Konten berasal dari situs sumber (diringkas). Deskripsi Aduan Nomor, Cek Rekening, Cek Hoaks, LAPOR!, dan PPID ditulis ulang dari nama layanannya; pastikan sesuai.
- **Teks "Program kerja 2019–2024"** di situs sumber tidak dipakai karena sudah usang. Empat fokus kerja dipertahankan.
- **Nama instansi** memakai "Komdigi" (Kementerian Komunikasi dan Digital), sesuai situs sumber.
- **Logo resmi** belum dipakai karena butuh izin/aset resmi. Header memakai tanda sinyal sederhana. Letakkan logo di `public/` dan ganti `TandaSinyal` di `src/layouts/Header.tsx` bila sudah ada.
- **Gambar** tidak dipakai sama sekali (hero, berita). Halaman tetap ringan; tambahkan bila sudah ada aset berizin.
- **OG image** belum ada; Open Graph memakai kartu `summary` tanpa gambar.
- Lighthouse belum dijalankan dan tampilan belum dicek di peramban pada 360/768/1280 px. Lakukan sebelum rilis.

## Yang sengaja tidak dibawa dari situs sumber

Widget aksesibilitas pihak ketiga, TTS/penerjemah, Google Analytics, banner cookie, carousel otomatis, "Topik Pilihanku", statistik konten negatif, dan galeri tautan. Semuanya di luar ruang lingkup environment.
