"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  stagger?: boolean;
  className?: string;
};

export function Reveal({ children, stagger = false, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"init" | "hidden" | "revealed">("init");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target && el.contains(target)) return;
    }

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPhase("revealed");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  const phaseClass =
    phase === "hidden" ? "reveal-init" : phase === "revealed" ? "reveal-in" : "";

  return (
    <div
      ref={ref}
      className={`${phaseClass}${className ? ` ${className}` : ""}`}
      data-stagger={stagger ? "" : undefined}
    >
      {children}
    </div>
  );
}
