"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeStat } from "@/types";

export function StatCard({
  stat,
  icon,
  featured = false,
}: {
  stat: HomeStat;
  icon: React.ReactNode;
  featured?: boolean;
}) {
  const [display, setDisplay] = useState(stat.value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (!("IntersectionObserver" in window)) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    setDisplay(0);

    let frame: number;
    const duration = 1000;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(progress * stat.value));
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stat.value]);

  return (
    <div
      ref={ref}
      className={`rounded-lg p-4 ${
        featured ? "border border-signal bg-white/10" : "bg-white/5"
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-signal">
        {icon}
      </span>
      <p className="mt-3 text-step--1 text-white/80">{stat.label}</p>
      <p className="font-display text-step-2 font-bold text-white">
        {new Intl.NumberFormat("id-ID").format(display)}
        {stat.suffix ?? ""}
      </p>
      {stat.unit && <p className="text-step--2 text-white/60">{stat.unit}</p>}
    </div>
  );
}
