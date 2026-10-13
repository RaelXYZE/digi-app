import Link from "next/link";
import { NAV } from "@/constants/site";

const SECTION_LINKS = NAV.flatMap((item) =>
  item.id === "beranda"
    ? []
    : [{
        label: item.label,
        href: item.href ?? item.children?.[0]?.href ?? "/",
      }],
);

export default function NotFound() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Halaman tidak ditemukan</h1>
        <p className="mt-4 max-w-reading text-step-1 text-ink-soft">
          Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="btn bg-brand text-white hover:bg-navy-deep">
            Kembali ke beranda
          </Link>
          {SECTION_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
