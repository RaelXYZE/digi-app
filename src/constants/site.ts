// Agency data sourced from komdigi.go.id.
// Change values here, not in components.
import type { SocialPlatform } from "@/types";

export const SITE = {
  name: "Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura",
  shortName: "Balai Monitor SFR & Infrastruktur Digital Kelas II Jayapura",
  fullName: "Kementerian Komunikasi dan Digital",
  officialName: "Balai Monitoring Spektrum Frekuensi Radio Dan Infrastruktur Digital Kelas II Jayapura",
  description:
    "Situs Kementerian Komunikasi dan Digital: temukan layanan perizinan, pengaduan, informasi publik, dan berita terbaru.",
  officialSite: "https://www.komdigi.go.id",
  address: " Jl. Raya Sentani No. 21, Kel. Hedam, Kec. Heram, Kota Jayapura, Papua 99351",
  phone: "(0967)571945",
  phoneHref: "tel:+62213504024",
  email: "upt_jayapura@postel.go.id",
  social: [
    { id: "instagram", name: "Instagram", url: "https://www.instagram.com/balmon_jayapura/" },
    { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@balmonjayapura?_r=1&_t=ZS-99zaMlNeKjE" },
    { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/628114801191" },
  ] satisfies { id: SocialPlatform; name: string; url: string }[],
} as const;

export type NavChild = { id: string; label: string; basePath?: string; href?: string };
export type NavItem = { id: string; label: string; href?: string; children?: readonly NavChild[] };

export const NAV: readonly NavItem[] = [
  { id: "beranda", label: "Beranda" },
  {
    id: "tentang-kami",
    label: "Profil",
    children: [
      { id: "profil-balmon", label: "Profil Balmon Jayapura", href: "/profil" },
      { id: "daftar-pegawai", label: "Daftar Pegawai", href: "/profil/daftar-pegawai" },
      { id: "wilayah-kerja", label: "Wilayah Kerja", href: "/profil/wilayah-kerja" },
    ],
  },
  {
    id: "layanan",
    label: "Layanan",
    children: [
      { id: "layanan-publik", label: "Layanan Publik", href: "/layanan" },
      { id: "perizinan-online", label: "Perizinan Online", href: "/layanan/perizinan-online" },
    ],
  },
  {
    id: "berita",
    label: "Publikasi",
    children: [
      { id: "berita-terbaru", label: "Berita Terbaru", href: "/publikasi/berita-terbaru" },
      { id: "pengumuman", label: "Pengumuman", href: "/publikasi/pengumuman" },
      { id: "galeri", label: "Galeri", href: "/publikasi/galeri" },
      { id: "laporan-kinerja", label: "Laporan Kinerja", href: "/publikasi/laporan-kinerja" },
    ],
  },
];

export const SERVICE_HOURS: { day: string; time: string }[] = [
  { day: "Senin - Kamis", time: "08.00 - 16.00 WIB" },
  { day: "Jum'at", time: "08.00 - 16.00 WIB" },
];

// Routes whose pages export robots: { index: false, follow: true }.
// Kept out of the sitemap so crawlers don't get mixed signals.
// Update together with the pages' robots flags.
export const NOINDEX_ROUTES: readonly string[] = [
  "/profil/daftar-pegawai",
  "/profil/wilayah-kerja",
  "/publikasi/berita-terbaru",
  "/publikasi/pengumuman",
  "/publikasi/galeri",
  "/publikasi/laporan-kinerja",
];

export type SectionId = "beranda" | "tentang-kami" | "layanan" | "berita";
