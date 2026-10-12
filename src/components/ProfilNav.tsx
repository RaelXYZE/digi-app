"use client";

import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = [
  { id: "visi-misi", label: "Visi dan Misi" },
  { id: "tugas-fungsi", label: "Tugas dan fungsi" },
  { id: "fokus-kerja", label: "Empat fokus kerja" },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function ProfilNav() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Navigasi bagian profil"
      className="sticky top-16 z-30 w-full border-b border-line bg-white shadow-sm"
    >
      <div className="wrap">
        <ul className="flex gap-2 overflow-x-auto py-2">
          {SECTIONS.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 py-2 text-step--1 font-semibold transition-colors ${
                  active === s.id
                    ? "bg-brand text-white"
                    : "border border-line text-ink-soft hover:border-brand hover:text-brand"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
