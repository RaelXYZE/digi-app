"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { StatCard } from "@/components/StatCard";
import type { HomeStat } from "@/types";

const HIGHLIGHT_INTERVAL = 3500;

const subscribeReducedMotion = (callback: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServer = () => false;

const subscribeVisibility = (callback: () => void) => {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
};
const getTabHidden = () => document.visibilityState === "hidden";
const getTabHiddenServer = () => false;

export function StatGrid({ stats, icons }: { stats: HomeStat[]; icons: React.ReactNode[] }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [pointerHovering, setPointerHovering] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
  const tabHidden = useSyncExternalStore(subscribeVisibility, getTabHidden, getTabHiddenServer);

  const paused = pointerHovering || tabHidden;
  const effectiveIndex = reducedMotion ? 0 : featuredIndex;

  useEffect(() => {
    if (reducedMotion || paused || stats.length <= 1) return;

    const timeout = setTimeout(() => {
      let next: number;
      do {
        next = Math.floor(Math.random() * stats.length);
      } while (next === featuredIndex);
      setFeaturedIndex(next);
    }, HIGHLIGHT_INTERVAL);

    return () => clearTimeout(timeout);
  }, [reducedMotion, paused, featuredIndex, stats.length]);

  return (
    <div
      className="fade-in fade-in-delayed grid grid-cols-2 gap-4"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPointerHovering(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setPointerHovering(false);
      }}
      onPointerCancel={(e) => {
        if (e.pointerType === "mouse") setPointerHovering(false);
      }}
    >
      {stats.map((item, i) => (
        <StatCard
          key={item.id}
          stat={item}
          icon={icons[i]}
          featured={effectiveIndex === i}
        />
      ))}
    </div>
  );
}
