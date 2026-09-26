import { FOCUS_AREAS, MISSION, HEAD, PROFILE, DUTIES, VISION } from "@/constants/tentang";
import { SITE } from "@/constants/site";
import { ExternalLink } from "@/components/external-link";
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

          <div id="visi-misi" className="self-start bg-mist p-6 sm:p-8 scroll-mt-20">
            <h3 className="font-display text-step-2 font-bold text-navy-deep">Visi</h3>
            <p className="mt-3 font-display text-step-1">
              <Placeholder>{VISION}</Placeholder>
            </p>
            <h3 className="mt-8 font-display text-step-2 font-bold text-navy-deep">Misi</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-brand">
              {MISSION.map((m) => (
                <li key={m}>
                  <Placeholder>{m}</Placeholder>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_1.4fr]">
          <div id="tugas-fungsi" className="scroll-mt-20">
            <h3 className="font-display text-step-2 font-bold text-navy-deep">
              Tugas dan fungsi
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-brand">
              {DUTIES.map((d) => (
                <li key={d}>
                  <Placeholder>{d}</Placeholder>
                </li>
              ))}
            </ul>
          </div>

          <div id="fokus-kerja" className="scroll-mt-20">
            <h3 className="font-display text-step-2 font-bold text-navy-deep">
              Empat fokus kerja
            </h3>
            <dl className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {FOCUS_AREAS.map((f) => (
                <div key={f.name} className="border-t-2 border-brand pt-3">
                  <dt className="font-display text-step-1 font-bold">
                    <ExternalLink
                      href={f.url}
                      className="inline-flex min-h-11 items-center text-navy-deep underline-offset-4 hover:underline"
                    >
                      {f.name}
                    </ExternalLink>
                  </dt>
                  <dd className="text-ink-soft">{f.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
