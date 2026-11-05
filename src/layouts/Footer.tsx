import Link from "next/link";
import { NAV, SERVICE_HOURS, SITE } from "@/constants/site";
import { BrandLockup } from "@/components/brand-lockup";
import { SocialIcon } from "@/components/social-icon";
import ParticleBackground from "@/components/tsParticles";

const QUICK_LINKS = NAV.map((item) => ({
  label: item.label,
  href: item.href ?? (item.id === "beranda" ? "/" : (item.children?.[0]?.href ?? "/")),
}));

const quickLinkClass =
  "inline-flex min-h-9 items-center text-step--1 text-white underline-offset-4 hover:underline md:min-h-0 md:py-1";

const contactLinkClass =
  "inline-flex min-h-9 items-center text-step--1 text-white underline-offset-4 hover:underline md:min-h-0 md:py-1";

const socialIconClass =
  "inline-flex min-h-11 items-center text-white/90 transition-colors hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-white bleed bleed-navy">
      <ParticleBackground id="tsparticles-footer" />
      <div className="wrap wrap-footer relative grid gap-8 py-10 md:grid-cols-[1fr_1fr_1.6fr] md:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.6fr]">
        <div>
          <BrandLockup variant="footer" theme="dark" />
          <ul className="mt-3 flex gap-4">
            {SITE.social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={socialIconClass}
                >
                  <SocialIcon platform={s.id} className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Tautan cepat">
          <h2 className="font-display text-step-0 font-bold">Tautan cepat</h2>
          <ul className="mt-3 space-y-0.5 md:space-y-1">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={quickLinkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-step-0 font-bold">Jam Pelayanan</h2>
          <dl className="mt-3 space-y-2">
            {SERVICE_HOURS.map((h) => (
              <div key={h.day}>
                <dt className="text-step--1 font-semibold text-white">{h.day}</dt>
                <dd className="text-step--1 text-white/85">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Kontak">
          <h2 className="font-display text-step-0 font-bold">Kontak</h2>
          <address className="mt-3 max-w-reading space-y-1 text-step--1 not-italic text-white/90 md:space-y-0.5">
            <p>
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative footer icon */}
                  <img src="/pin-location-icon.svg" alt="" aria-hidden="true" loading="lazy" width={16} height={16} className="h-full w-full object-contain" />
                </span>
                {SITE.address}
              </span>
            </p>
            <p>
              <a href={SITE.phoneHref} className={`${contactLinkClass} gap-2`}>
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative footer icon */}
                  <img src="/phone-line-icon.svg" alt="" aria-hidden="true" loading="lazy" width={16} height={16} className="h-full w-full object-contain" />
                </span>
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className={`${contactLinkClass} gap-2`}>
                <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative footer icon */}
                  <img src="/envelope-line-icon.svg" alt="" aria-hidden="true" loading="lazy" width={16} height={16} className="h-full w-full object-contain" />
                </span>
                {SITE.email}
              </a>
            </p>
          </address>
        </nav>
      </div>

      <div className="relative border-t border-white/20">
        <p className="wrap wrap-footer relative text-step--2 pt-4 pb-16 text-white/85">
          © {year} {SITE.officialName}. Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </footer>
  );
}
