import { PROFILE, HEAD } from "@/constants/tentang";
import { SITE } from "@/constants/site";
import { Placeholder } from "@/components/Placeholder";

export default function TentangKami() {
  return (
    <section id="tentang-kami" aria-labelledby="about-heading" className="section relative overflow-hidden bg-white bleed bleed-white">
      {/* eslint-disable-next-line @next/next/no-img-element -- section background image, no optimization needed */}
      <img
        src="/bg2.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-left"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/60 sm:bg-white/85" />
      <div className="wrap relative">
        <h2 id="about-heading" className="max-w-[35ch] text-step-3 font-bold text-navy-deep">
          Tentang {SITE.name}
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div id="profil" className="max-w-reading space-y-5 font-display text-step-1 leading-[1.7] scroll-mt-20">
            {PROFILE.map((p) => (
              <p key={p}>
                <Placeholder>{p}</Placeholder>
              </p>
            ))}
            <p className="font-sans text-step-0 text-ink-soft">
              Kepala Balai: <Placeholder>{HEAD}</Placeholder>
            </p>
          </div>

          <div className="flex aspect-video items-center justify-center self-start border border-line bg-mist">
            <Placeholder>{"Coming Soon"}</Placeholder>
          </div>
        </div>
      </div>
    </section>
  );
}
