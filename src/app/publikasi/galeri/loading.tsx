import { SkeletonBlock } from "@/components/SkeletonBlock";

export default function Loading() {
  return (
    <section className="section bg-white bleed bleed-white">
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
              <SkeletonBlock className="mb-4 aspect-video w-full border border-line" />
              <SkeletonBlock className="h-6 w-3/4" />
              <div className="mt-2">
                <SkeletonBlock className="h-4 w-24" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
