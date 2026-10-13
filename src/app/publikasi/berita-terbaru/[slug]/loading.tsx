import { SkeletonBlock } from "@/components/SkeletonBlock";

export default function Loading() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <div role="status">
          <span className="sr-only">Memuat&hellip;</span>
        </div>
        <div aria-hidden="true" className="text-step--1 text-ink-soft">
          <SkeletonBlock className="h-4 w-48" />
        </div>
        <div aria-hidden="true" className="mt-6 max-w-reading">
          <SkeletonBlock className="h-8 w-full" />
        </div>
        <div aria-hidden="true" className="mt-4">
          <SkeletonBlock className="h-4 w-32" />
        </div>
        <div aria-hidden="true" className="mt-6 mb-6 aspect-video w-full border border-line">
          <SkeletonBlock className="h-full w-full" />
        </div>
        <div aria-hidden="true" className="mt-6 max-w-reading space-y-3">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
        </div>
      </div>
    </section>
  );
}
