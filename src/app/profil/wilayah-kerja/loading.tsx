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
        <div aria-hidden="true" className="mt-8 grid gap-8 lg:grid-cols-[5fr_6fr] lg:gap-12">
          <div className="lg:col-start-1 lg:row-start-1">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="mt-2 h-4 w-5/6" />
            <div className="mt-5 border-y border-line py-4">
              <SkeletonBlock className="h-8 w-48" />
            </div>
          </div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <SkeletonBlock className="aspect-[4/3] w-full border border-line" />
          </div>
          <div className="lg:col-start-1 lg:row-start-2">
            <SkeletonBlock className="h-44 w-full border border-line" />
            <SkeletonBlock className="mt-5 h-16 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
