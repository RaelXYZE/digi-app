"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section closest to the top of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const update = () => {
      const threshold = window.innerHeight * 0.3;
      let selected = elements[0]!.id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= threshold) selected = el.id;
      }
      // At the bottom of the page, the last section is considered active.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        selected = elements[elements.length - 1]!.id;
      }
      setActive(selected);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return active;
}
