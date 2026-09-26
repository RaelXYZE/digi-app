import { LAYANAN, QUICK_LINK_IDS } from "@/constants/layanan";
import { ExternalLink } from "@/components/external-link";
import { ParticlesRoot } from "@/components/tsParticles";
import ParticleBackground from "@/components/tsParticles";

const quickLinks = QUICK_LINK_IDS.map((id) => LAYANAN.find((l) => l.id === id)).filter(
  (l): l is NonNullable<typeof l> => Boolean(l),
);

export default function Hero() {
  return (
    <ParticlesRoot>
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="section hero-screen on-dark relative overflow-hidden bg-navy-deep text-white bleed bleed-navy-deep"
    >
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
            className="max-w-[24ch] sm:max-w-[22ch] text-step-2 sm:text-step-3 font-bold leading-[1.15]"
          >
            Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital{" "}
            <span className="text-white/75">Kelas II Jayapura</span>
          </h1>
          <p className="mt-6 max-w-reading text-step-1 text-white/90">
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

        <div className="fade-in fade-in-delayed bg-white/[0.07] p-6 backdrop-blur-sm">
          <h2 className="font-display text-step-1 font-bold">Paling sering dicari</h2>
          <ul className="mt-2 divide-y divide-white/20">
            {quickLinks.map((l) => (
              <li key={l.id}>
                <ExternalLink
                  href={l.url}
                  className="group flex min-h-11 flex-col justify-center py-3 no-underline"
                >
                  <span className="font-semibold text-white group-hover:underline">
                    {l.action}
                  </span>
                  <span className="text-step--1 text-white/80">{l.name}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </ParticlesRoot>
  );
}
