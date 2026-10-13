import { SkeletonBlock } from "@/components/SkeletonBlock";

export default function Loading() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <div role="status">
          <span className="sr-only">Memuat&hellip;</span>
        </div>
        <div aria-hidden="true" className="h-8 w-64">
          <SkeletonBlock className="h-full w-full" />
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="flex gap-4 border border-line bg-white p-5">
              <SkeletonBlock className="h-14 w-14 shrink-0 rounded-full" />
              <div className="flex flex-col gap-2">
                <SkeletonBlock className="h-5 w-32" />
                <SkeletonBlock className="h-4 w-24" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
