import { VISION, MISSION, DUTIES, FOCUS_AREAS } from "@/constants/tentang";
import { ExternalLink } from "@/components/external-link";
import { Placeholder } from "@/components/Placeholder";

export default function ProfilKantor() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">BALMON SFRID KELAS II JAYAPURA</h1>

        <div id="visi-misi" className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] scroll-mt-20">
          <div>
            <h2 className="font-display text-step-2 font-bold text-navy-deep">Visi</h2>
            <p className="mt-3 font-display text-step-1 leading-[1.7]">
              <Placeholder>{VISION}</Placeholder>
            </p>
          </div>
          <div className="self-start bg-mist p-6 sm:p-8">
            <h2 className="font-display text-step-2 font-bold text-navy-deep">Misi</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-brand">
              {MISSION.map((m) => (
                <li key={m}>
                  <Placeholder>{m}</Placeholder>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div id="tugas-fungsi" className="mt-16 border-t border-line pt-12 scroll-mt-20">
          <h2 className="font-display text-step-2 font-bold text-navy-deep">
            Tugas dan fungsi
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 marker:text-brand">
            {DUTIES.map((d) => (
              <li key={d}>
                <Placeholder>{d}</Placeholder>
              </li>
            ))}
          </ol>
        </div>

        <div id="fokus-kerja" className="mt-16 border-t border-line pt-12 scroll-mt-20">
          <h2 className="font-display text-step-2 font-bold text-navy-deep">
            Empat fokus kerja
          </h2>
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
    </section>
  );
}
