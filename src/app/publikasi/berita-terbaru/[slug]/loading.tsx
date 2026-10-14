import { SkeletonBlock } from "@/components/SkeletonBlock";

export default function Loading() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <div role="status">
          <span className="sr-only">Memuat&hellip;</span>
        </div>
        <div aria-hidden="true" className="text-step--1 text-ink-soft w-48">
          <SkeletonBlock className="w-full">&nbsp;</SkeletonBlock>
        </div>
        <div aria-hidden="true" className="mt-6 max-w-reading text-step-3">
          <SkeletonBlock className="w-full">&nbsp;</SkeletonBlock>
          <SkeletonBlock className="w-3/4">&nbsp;</SkeletonBlock>
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
