export type Provinsi = "Papua" | "Papua Tengah" | "Papua Pegunungan";

export interface Kabupaten {
  /** Must match a key in REGION_PATHS (map-paths.ts). */
  id: string;
  name: string;
  province: Provinsi;
  capital: string;
  kecamatan: number;
  desa: number;
  stasiun: number;
}

// Full class strings so Tailwind can detect them.
export const PROVINSI: { nama: Provinsi; fill: string; dot: string }[] = [
  { nama: "Papua", fill: "fill-[#1C8FE3]", dot: "bg-[#1C8FE3]" },
  { nama: "Papua Tengah", fill: "fill-[#F5A912]", dot: "bg-[#F5A912]" },
  { nama: "Papua Pegunungan", fill: "fill-[#D9232F]", dot: "bg-[#D9232F]" },
];
