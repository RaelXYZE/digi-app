"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { SERVICE_GROUPS, LAYANAN } from "@/constants/layanan";
import type { Service as ServiceType } from "@/types";
import { ExternalLink } from "@/components/external-link";

function ServiceCard({ s }: { s: ServiceType }) {
  return (
    <li className="flex flex-col border border-line bg-white p-5 transition-colors hover:border-brand hover:bg-mist">
      <h3 className="font-display text-step-1 font-bold text-navy-deep">
        <Link href={`/layanan/${s.id}`} className="text-navy-deep no-underline hover:text-brand">
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
  );
}

export default function Layanan() {
  const [query, setQuery] = useState("");
  const searchId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LAYANAN;
    return LAYANAN.filter((s) => `${s.name} ${s.description}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <section aria-labelledby="services-heading" className="section bg-paper bleed bleed-paper">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 id="services-heading" className="text-step-3 font-bold text-navy-deep">
              Layanan untuk masyarakat
            </h1>
            <p className="mt-3 max-w-reading text-step-1 text-ink-soft">
              Pilih layanan yang Anda butuhkan. Setiap tautan membuka situs layanan resmi.
            </p>
          </div>

          <div className="md:w-80">
            <label htmlFor={searchId} className="block font-semibold text-navy-deep">
              Cari layanan
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: izin, rekening"
              autoComplete="off"
              className="mt-1 min-h-11 w-full rounded-md border border-ink-soft bg-white px-3 text-ink placeholder:text-ink-soft"
            />
          </div>
        </div>

        <p role="status" aria-live="polite" className="mt-4 text-step--1 text-ink-soft">
          {query.trim()
            ? results.length > 0
              ? `${results.length} layanan ditemukan.`
              : `Tidak ada layanan yang cocok dengan "${query.trim()}".`
            : `${LAYANAN.length} layanan tersedia.`}
        </p>

        {results.length === 0 ? (
          <div className="mt-6 border border-line bg-white p-6">
            <p className="font-semibold text-navy-deep">
              Tidak ada layanan yang cocok dengan &ldquo;{query.trim()}&rdquo;.
            </p>
            <p className="mt-1 text-ink-soft">
              Coba kata yang lebih umum, misalnya &ldquo;izin&rdquo; atau &ldquo;laporan&rdquo;, atau hapus kata pencarian
              untuk melihat semua layanan.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="btn mt-4 border border-brand bg-white text-brand hover:bg-brand hover:text-white"
            >
              Tampilkan semua layanan
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-14">
            {SERVICE_GROUPS.map((g) => {
              const items = results.filter((s) => s.group === g.id);
              if (items.length === 0) return null;
              const headingId = `group-${g.id}`;
              return (
                <section key={g.id} aria-labelledby={headingId}>
                  <h2 id={headingId} className="font-display text-step-2 font-bold text-navy-deep">
                    {g.title}
                  </h2>
                  <p className="mt-1 max-w-reading text-ink-soft">{g.intro}</p>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((s) => (
                      <ServiceCard key={s.id} s={s} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
