import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Halaman tidak ditemukan</h1>
        <p className="mt-4 max-w-reading text-step-1 text-ink-soft">
          Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="mt-8">
          <Link href="/" className="btn bg-brand text-white hover:bg-navy-deep">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
