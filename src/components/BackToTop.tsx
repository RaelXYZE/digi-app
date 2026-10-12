"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-brand text-white shadow-md transition-colors hover:bg-navy-deep"
      style={{
        marginBottom: "env(safe-area-inset-bottom)",
        marginRight: "env(safe-area-inset-right)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
