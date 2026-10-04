export type Article = {
  id: string;
  title: string;
  /** ISO format: YYYY-MM-DD */
  date: string;
  category: string;
  summary: string;
  url?: string;
  /** Full article body. Placeholder until the backend is connected. */
  content?: string;
  /** Path under /public, e.g. "/Berita/artikel-1.jpg". */
  image?: string;
  /** Name of the writer/editor who uploaded the article. */
  author?: string;
};

export type ServiceGroup = "utama" | "pengaduan" | "informasi";

export type Service = {
  id: string;
  name: string;
  description: string;
  action: string;
  url: string;
  group: ServiceGroup;
  longDescription?: string;
  requirements?: string[];
  steps?: string[];
};

export type SocialPlatform = "instagram" | "tiktok" | "whatsapp";

export type GalleryItem = {
  id: string;
  /** ISO format: YYYY-MM-DD */
  date: string;
  title: string;
  /** Path under /public, e.g. "/Galeri/Sample1.Jpeg" */
  image?: string;
};

export type Employee = {
  id: string;
  name: string;
  position: string;
};

export type HomeStat = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  unit?: string;
};
