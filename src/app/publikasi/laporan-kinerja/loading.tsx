import { SkeletonBlock } from "@/components/SkeletonBlock";

export default function Loading() {
  return (
    <section className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <div role="status">
          <span className="sr-only">Memuat&hellip;</span>
        </div>
        <div aria-hidden="true" className="h-8 w-64">
          <SkeletonBlock className="h-full w-full" />
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="relative flex min-h-11 border border-line bg-white">
              <SkeletonBlock className="aspect-[3/4] w-24 shrink-0 border-r border-line" />
              <div className="flex flex-1 flex-col p-5">
                <SkeletonBlock className="h-6 w-3/4" />
                <div className="mt-2">
                  <SkeletonBlock className="h-4 w-32" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
