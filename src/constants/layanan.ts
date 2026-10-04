import type { ServiceGroup, Service } from "@/types";

const L = "https://www.komdigi.go.id/layanan";

export const SERVICE_GROUPS: {
  id: ServiceGroup;
  title: string;
  intro: string;
}[] = [
  {
    id: "utama",
    title: "Layanan utama",
    intro: "Urus sertifikat, izin, dan program pengembangan kemampuan digital.",
  },
  {
    id: "pengaduan",
    title: "Pengaduan dan pengecekan",
    intro: "Laporkan konten atau nomor bermasalah, dan periksa informasi sebelum Anda percaya.",
  },
  {
    id: "informasi",
    title: "Informasi publik",
    intro: "Ajukan permintaan informasi resmi dari kementerian.",
  },
];

export const LAYANAN: Service[] = [
  {
    id: "sertifikasi",
    name: "Sertifikasi",
    description: "Pembuatan sertifikat menjadi lebih mudah dengan digital.",
    action: "Lihat layanan sertifikasi",
    url: `${L}#sertifikasi`,
    group: "utama",
    longDescription: "[ISI: penjelasan lengkap layanan Sertifikasi]",
    requirements: ["[ISI: syarat layanan Sertifikasi]"],
    steps: ["[ISI: langkah layanan Sertifikasi]"],
  },
  {
    id: "perizinan",
    name: "Perizinan",
    description: "Perizinan menjadi lebih mudah dengan digital.",
    action: "Ajukan izin",
    url: `${L}#perizinan`,
    group: "utama",
    longDescription: "[ISI: penjelasan lengkap layanan Perizinan]",
    requirements: ["[ISI: syarat layanan Perizinan]"],
    steps: ["[ISI: langkah layanan Perizinan]"],
  },
  {
    id: "pengembangan-sdm",
    name: "Pengembangan SDM",
    description: "Layanan beasiswa dan pelatihan digital.",
    action: "Cari beasiswa dan pelatihan",
    url: `${L}#pengembangan-sdm`,
    group: "utama",
    longDescription: "[ISI: penjelasan lengkap layanan Pengembangan SDM]",
    requirements: ["[ISI: syarat layanan Pengembangan SDM]"],
    steps: ["[ISI: langkah layanan Pengembangan SDM]"],
  },
  {
    id: "pemerintahan",
    name: "Layanan untuk instansi pemerintah",
    description: "Layanan untuk instansi pemerintah.",
    action: "Lihat layanan instansi",
    url: `${L}#pemerintahan`,
    group: "utama",
    longDescription: "[ISI: penjelasan lengkap layanan instansi pemerintah]",
    requirements: ["[ISI: syarat layanan instansi pemerintah]"],
    steps: ["[ISI: langkah layanan instansi pemerintah]"],
  },
  {
    id: "umum",
    name: "Layanan untuk masyarakat umum",
    description: "Layanan untuk seluruh kalangan masyarakat.",
    action: "Lihat layanan umum",
    url: `${L}#umum`,
    group: "utama",
    longDescription: "[ISI: penjelasan lengkap layanan masyarakat umum]",
    requirements: ["[ISI: syarat layanan masyarakat umum]"],
    steps: ["[ISI: langkah layanan masyarakat umum]"],
  },
  {
    id: "aduan-konten",
    name: "Aduan Konten",
    description:
      "Laporkan situs, akun media sosial, atau aplikasi yang memuat konten negatif.",
    action: "Laporkan konten",
    url: "https://aduankonten.id",
    group: "pengaduan",
    longDescription: "[ISI: penjelasan lengkap layanan Aduan Konten]",
    requirements: ["[ISI: syarat layanan Aduan Konten]"],
    steps: ["[ISI: langkah layanan Aduan Konten]"],
  },
  {
    id: "aduan-nomor",
    name: "Aduan Nomor",
    description: "Laporkan nomor telepon yang mengganggu atau terindikasi penipuan.",
    action: "Laporkan nomor",
    url: "https://aduannomor.id",
    group: "pengaduan",
    longDescription: "[ISI: penjelasan lengkap layanan Aduan Nomor]",
    requirements: ["[ISI: syarat layanan Aduan Nomor]"],
    steps: ["[ISI: langkah layanan Aduan Nomor]"],
  },
  {
    id: "cek-rekening",
    name: "Cek Rekening",
    description: "Periksa rekening yang diduga terkait penipuan sebelum Anda bertransaksi.",
    action: "Cek rekening",
    url: "https://cekrekening.id/home#kanal",
    group: "pengaduan",
    longDescription: "[ISI: penjelasan lengkap layanan Cek Rekening]",
    requirements: ["[ISI: syarat layanan Cek Rekening]"],
    steps: ["[ISI: langkah layanan Cek Rekening]"],
  },
  {
    id: "cek-hoaks",
    name: "Cek Hoaks",
    description: "Periksa kebenaran kabar yang beredar di internet.",
    action: "Cek kabar",
    url: "https://cekhoaks.aduankonten.id",
    group: "pengaduan",
    longDescription: "[ISI: penjelasan lengkap layanan Cek Hoaks]",
    requirements: ["[ISI: syarat layanan Cek Hoaks]"],
    steps: ["[ISI: langkah layanan Cek Hoaks]"],
  },
  {
    id: "lapor",
    name: "LAPOR!",
    description: "Sampaikan aspirasi dan pengaduan layanan publik kepada pemerintah.",
    action: "Sampaikan laporan",
    url: "https://www.lapor.go.id/",
    group: "pengaduan",
    longDescription: "[ISI: penjelasan lengkap layanan LAPOR!]",
    requirements: ["[ISI: syarat layanan LAPOR!]"],
    steps: ["[ISI: langkah layanan LAPOR!]"],
  },
  {
    id: "ppid",
    name: "PPID",
    description: "Pejabat Pengelola Informasi dan Dokumentasi: pusat permintaan informasi publik.",
    action: "Minta informasi publik",
    url: "https://eppid.komdigi.go.id/",
    group: "informasi",
    longDescription: "[ISI: penjelasan lengkap layanan PPID]",
    requirements: ["[ISI: syarat layanan PPID]"],
    steps: ["[ISI: langkah layanan PPID]"],
  },
];

// Featured services on the home page preview (3-4 most relevant).
export const FEATURED_SERVICE_IDS = ["perizinan", "aduan-konten", "cek-rekening", "ppid"] as const;
