import { PROFILE, HEAD } from "@/constants/tentang";
import { SITE } from "@/constants/site";
import { Placeholder } from "@/components/Placeholder";

export default function TentangKami() {
  return (
    <section id="tentang-kami" aria-labelledby="about-heading" className="section bg-white bleed bleed-white">
      <div className="wrap">
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
