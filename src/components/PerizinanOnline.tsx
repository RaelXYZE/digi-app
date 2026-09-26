import { PERIZINAN_ONLINE } from "@/constants/perizinan-online";
import { ExternalLink } from "@/components/external-link";

export default function PerizinanOnline() {
  return (
    <section
      aria-labelledby="perizinan-online-heading"
      className="section bg-mist bleed bleed-mist"
    >
      <div className="wrap">
        <h2 id="perizinan-online-heading" className="text-step-3 font-bold text-navy-deep">
          Aplikasi Perizinan Online Ditjen Infrastruktur Digital
        </h2>
        <p className="mt-3 max-w-reading text-step-1 text-ink-soft">
          Anda dapat mengajukan secara mandiri
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERIZINAN_ONLINE.map((item) => (
            <li key={item.id}>
              <ExternalLink
                href={item.url}
                className="flex h-full min-h-11 items-center border border-line bg-white p-5 text-navy-deep no-underline transition-colors hover:border-brand hover:bg-mist"
              >
                <span className="font-display text-step-1 font-bold">{item.name}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}