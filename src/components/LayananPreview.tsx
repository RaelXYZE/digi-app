"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICE_GROUPS, LAYANAN } from "@/constants/layanan";
import { PERIZINAN_ONLINE } from "@/constants/perizinan-online";
import type { Service, ServiceGroup } from "@/types";
import { ExternalLink } from "@/components/external-link";

type PerizinanOnlineItem = typeof PERIZINAN_ONLINE[number];

type PreviewTab =
  | { id: ServiceGroup; label: string; kind: "service"; items: Service[]; viewAllHref: string }
  | { id: "perizinan-online"; label: string; kind: "external"; items: PerizinanOnlineItem[]; viewAllHref: string };

const TABS: PreviewTab[] = [
  ...SERVICE_GROUPS.map((g) => ({
    id: g.id,
    label: g.title,
    kind: "service" as const,
    items: LAYANAN.filter((s) => s.group === g.id).slice(0, 4),
    viewAllHref: "/layanan",
  })),
  {
    id: "perizinan-online",
    label: "Perizinan Online",
    kind: "external",
    items: PERIZINAN_ONLINE.slice(0, 4),
    viewAllHref: "/layanan/perizinan-online",
  },
];

export default function LayananPreview() {
  const [activeTabId, setActiveTabId] = useState<PreviewTab["id"]>(TABS[0].id);
  const activeTab = TABS.find((t) => t.id === activeTabId) ?? TABS[0];

  return (
    <section id="layanan" aria-labelledby="services-heading" className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <h2 id="services-heading" className="text-step-3 font-bold text-navy-deep">
          Layanan untuk masyarakat
        </h2>
        <p className="mt-3 max-w-reading text-step-1 text-ink-soft">
          Pilih layanan yang Anda butuhkan. Setiap tautan membuka situs layanan resmi.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={
                  isActive
                    ? "rounded-full bg-brand px-4 py-2 font-semibold text-white"
                    : "rounded-full border border-line px-4 py-2 font-semibold text-ink-soft hover:border-brand hover:text-brand"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activeTab.kind === "service"
            ? activeTab.items.map((s) => (
                <li key={s.id} className="flex flex-col border border-line bg-white p-5">
                  <h3 className="font-display text-step-1 font-bold text-navy-deep">
                    <Link
                      href={`/layanan/${s.id}`}
                      className="text-navy-deep no-underline hover:text-brand"
                    >
                      {s.name}
                    </Link>
                  </h3>
                  <p className="mt-1 flex-1 text-ink-soft">{s.description}</p>
                  <ExternalLink
                    href={s.url}
                    className="mt-3 inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4 hover:text-navy-deep"
                  >
                    {s.action}
                  </ExternalLink>
                </li>
              ))
            : activeTab.items.map((item) => (
                <li key={item.id}>
                  <ExternalLink
                    href={item.url}
                    className="flex h-full min-h-11 items-center border border-line bg-white p-5 text-navy-deep no-underline transition-colors hover:border-brand hover:bg-mist"
                  >
                    <span className="font-display text-step-1 font-bold">{item.name}</span>
                  </ExternalLink>
                </li>
              ))}
        </ul>

        <div className="mt-10">
          <Link
            href={activeTab.viewAllHref}
            className="btn border border-brand bg-white text-brand hover:bg-brand hover:text-white"
          >
            Lihat semua layanan
          </Link>
        </div>
      </div>
    </section>
  );
}