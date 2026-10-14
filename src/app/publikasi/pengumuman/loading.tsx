import { SkeletonBlock } from "@/components/SkeletonBlock";

export default function Loading() {
  return (
    <section className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <div role="status">
          <span className="sr-only">Memuat&hellip;</span>
        </div>
        <div aria-hidden="true" className="text-step-3 w-64">
          <SkeletonBlock className="w-full">&nbsp;</SkeletonBlock>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="flex h-full min-h-11 flex-col border border-line bg-white p-5">
              <SkeletonBlock className="h-6 w-3/4" />
              <div className="mt-2">
                <SkeletonBlock className="h-4 w-24" />
              </div>
              <div className="mt-2 flex-1">
                <SkeletonBlock className="h-4 w-full" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
