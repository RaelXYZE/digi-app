import { SkeletonBlock } from "@/components/SkeletonBlock";

export default function Loading() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <div role="status">
          <span className="sr-only">Memuat&hellip;</span>
        </div>
        <div aria-hidden="true" className="h-8 w-64" style={{ fontSize: "var(--step-3)", lineHeight: "var(--step-3--line-height)" }}>
          <SkeletonBlock className="h-full w-full" />
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="border border-line bg-white">
              <SkeletonBlock className="aspect-video w-full border-b border-line" />
              <div className="p-5">
                <SkeletonBlock className="h-5 w-full" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
