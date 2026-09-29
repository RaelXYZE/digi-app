import { SITE, SERVICE_HOURS } from "@/constants/site";
import { BrandLockup } from "@/components/brand-lockup";
import { SocialIcon } from "@/components/social-icon";
import ParticleBackground from "@/components/tsParticles";

const linkClass =
  "inline-flex min-h-11 items-center text-white underline-offset-4 hover:underline";

const socialIconClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full text-white/90 transition-colors hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-white bleed bleed-navy">
      <ParticleBackground id="tsparticles-footer" />
      <div className="wrap relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLockup variant="footer" theme="dark" />
          <address className="mt-4 max-w-reading not-italic text-white/90">
            <p>
              <span className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative footer icon */}
                <img src="/pin-location-icon.svg" alt="" aria-hidden="true" loading="lazy" className="h-4 w-4 shrink-0" />
                {SITE.address}
              </span>
            </p>
            <p>
              <a href={SITE.phoneHref} className={`${linkClass} gap-2`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative footer icon */}
                <img src="/phone-line-icon.svg" alt="" aria-hidden="true" loading="lazy" className="h-4 w-4 shrink-0" />
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className={`${linkClass} gap-2`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative footer icon */}
                <img src="/envelope-line-icon.svg" alt="" aria-hidden="true" loading="lazy" className="h-4 w-4 shrink-0" />
                {SITE.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-display text-step-1 font-bold">Jam Pelayanan</h2>
          <dl className="mt-3 space-y-3">
            {SERVICE_HOURS.map((h) => (
              <div key={h.day}>
                <dt className="font-semibold text-white">{h.day}</dt>
                <dd className="text-white/85">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Media sosial resmi">
          <h2 className="font-display text-step-1 font-bold">Media sosial resmi</h2>
          <ul className="mt-3">
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
                  <span className="font-semibold">{s.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative border-t border-white/20">
        <p className="wrap relative py-5 text-step--1 text-white/85">
          © {year} {SITE.officialName}. Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </footer>
  );
}
