// Agency data sourced from komdigi.go.id.
// Change values here, not in components.
import type { SocialPlatform } from "@/types";

export const SITE = {
  name: "Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas II Jayapura",
  shortName: "Balai Monitor SFR&ID Kelas II Jayapura",
  fullName: "Kementerian Komunikasi dan Digital",
  officialName: "Balai Monitoring Spektrum Frekuensi Radio Dan Infrastruktur Digital Kelas II Jayapura",
  description:
    "Situs Kementerian Komunikasi dan Digital: temukan layanan perizinan, pengaduan, informasi publik, dan berita terbaru.",
  officialSite: "https://www.komdigi.go.id",
  address: " Jl. Raya Sentani No. 21, Kel. Hedam, Kec. Heram, Kota Jayapura, Papua 99351",
  phone: "(0967)571945",
  phoneHref: "tel:+62967571945",
  email: "upt_jayapura@postel.go.id",
  social: [
    { id: "instagram", name: "Instagram", url: "https://www.instagram.com/balmon_jayapura/" },
    { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@balmonjayapura?_r=1&_t=ZS-99zaMlNeKjE" },
    { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/628114801191" },
  ] satisfies { id: SocialPlatform; name: string; url: string }[],
} as const;

export type NavChild = { id: string; label: string; basePath?: string; href?: string };
export type NavIconName = "home" | "profile" | "services" | "publication";
export type NavItem = {
  id: string;
  label: string;
  href?: string;
  /** Mobile menu only; desktop navbar ignores both fields. */
  description?: string;
  icon?: NavIconName;
  children?: readonly NavChild[];
};

export const NAV: readonly NavItem[] = [
  {
    id: "beranda",
    label: "Beranda",
    description: "Halaman utama",
    icon: "home",
  },
  {
    id: "tentang-kami",
    label: "Profil",
    description: "Profil, pegawai, wilayah kerja",
    icon: "profile",
    children: [
      { id: "profil-balmon", label: "Profil Balmon Jayapura", href: "/profil" },
      { id: "daftar-pegawai", label: "Daftar Pegawai", href: "/profil/daftar-pegawai" },
      { id: "wilayah-kerja", label: "Wilayah Kerja", href: "/profil/wilayah-kerja" },
    ],
  },
  {
    id: "layanan",
    label: "Layanan",
    description: "Layanan publik dan perizinan",
    icon: "services",
    children: [
      { id: "layanan-publik", label: "Layanan Publik", href: "/layanan" },
      { id: "perizinan-online", label: "Perizinan Online", href: "/layanan/perizinan-online" },
    ],
  },
  {
    id: "berita",
    label: "Publikasi",
    description: "Berita, galeri, laporan kinerja",
    icon: "publication",
    children: [
      { id: "berita-terbaru", label: "Berita Terbaru", href: "/publikasi/berita-terbaru" },
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
  "/publikasi/galeri",
  "/publikasi/laporan-kinerja",
];

export type SectionId = "beranda" | "tentang-kami" | "layanan" | "berita";
