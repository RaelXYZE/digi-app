import statsData from "@/data/home-stats.json";
import { isHomeStat } from "@/utils/type-guards";
import ParticleBackground from "@/components/tsParticles";
import { StatCard } from "@/components/StatCard";

const stats = (statsData as unknown[]).filter(isHomeStat);

function StatIcon({ id }: { id: string }) {
  switch (id) {
    case "wilayah-kerja":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "frekuensi-termonitor":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12h3l3-9 4 18 3-9h3" />
          <path d="M20 12h2" />
        </svg>
      );
    case "broadcast-diukur":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20v-8" />
          <circle cx="12" cy="8" r="2" />
          <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
          <path d="M7.76 16.24a6 6 0 0 1 0-8.48" />
          <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      );
    case "peserta-unar":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <circle cx="12" cy="14" r="3" />
        </svg>
      );
  }
}

const LOGOS = [
  { src: "/LogoKomdigi.png", alt: "Kementerian Komunikasi dan Digital", width: 113, height: 36 },
  { src: "/LogoDJID.png", alt: "Direktorat Jenderal Infrastruktur Digital", width: 116, height: 36 },
  { src: "/LogoBerahklak.png", alt: "BerAKHLAK", width: 94, height: 36 },
  { src: "/LogoBangsa.png", alt: "Bangga Melayani Bangsa", width: 82, height: 36 },
  { src: "/logoSGratifikasi.png", alt: "Stop Gratifikasi", width: 60, height: 36 },
] as const;

export default function Hero() {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="section hero-screen on-dark relative overflow-hidden bg-navy-deep text-white bleed bleed-navy-deep"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- hero background image, no optimization needed */}
      <img
        src="/bg1.png"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy-deep/90 via-navy-deep/70 to-navy-deep/40" />

      {/* Signal arcs: decorative, no informational content */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -bottom-40 -right-40 h-[38rem] w-[38rem] text-signal opacity-25"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="600" cy="600" r="120" />
          <circle cx="600" cy="600" r="220" />
          <circle cx="600" cy="600" r="320" />
          <circle cx="600" cy="600" r="420" />
          <circle cx="600" cy="600" r="520" />
        </g>
      </svg>

      <ParticleBackground id="tsparticles-hero" />

      <div className="wrap relative grid items-end gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div className="fade-in">
          <h1
            id="hero-heading"
            className="max-w-[24ch] sm:max-w-[22ch] text-step-2 sm:text-step-3 font-bold leading-[1.15] [text-shadow:0_2px_12px_rgba(2,30,78,0.6)]"
          >
            Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital{" "}
            <span className="text-white">Kelas II Jayapura</span>
          </h1>
          <p className="mt-6 max-w-reading text-step-1 text-white [text-shadow:0_2px_12px_rgba(2,30,78,0.6)]">
            Ajukan izin, laporkan konten atau nomor bermasalah, dan ikuti kabar terbaru dari
            Balmon Jayapura.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#layanan"
              className="btn bg-signal text-navy-deep hover:bg-white"
            >
              Lihat layanan
            </a>
            <a
              href="#berita"
              className="btn border border-white/70 text-white hover:bg-white hover:text-navy-deep"
            >
              Baca berita terbaru
            </a>
          </div>
        </div>

        {stats.length > 0 && (
          <div className="fade-in fade-in-delayed grid grid-cols-2 gap-4">
            {stats.map((item, i) => (
              <StatCard
                key={item.id}
                stat={item}
                icon={<StatIcon id={item.id} />}
                featured={i === 0}
              />
            ))}
          </div>
        )}
      </div>

      <div className="wrap relative mt-10">
        <div
          aria-label="Logo instansi dan program terkait"
          className="flex flex-wrap content-center items-center justify-center gap-4 sm:gap-5"
        >
          {LOGOS.map((logo) => (
            <span key={logo.src} className="flex items-center justify-center rounded-lg bg-white/90 px-3 py-2 backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element -- institutional logo, no optimization needed */}
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
                className="h-9 w-auto object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
