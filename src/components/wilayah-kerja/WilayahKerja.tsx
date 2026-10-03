"use client";

import { useRef, useState } from "react";
import { KABUPATEN } from "./data";
import { CONTEXT_PATHS, MAP_VIEWBOX, REGION_PATHS } from "./map-paths";
import { PROVINSI, type Kabupaten, type Provinsi } from "./types";

const fmt = (n: number) => n.toLocaleString("id-ID");
const provinsiOf = (p: Provinsi) => PROVINSI.find((x) => x.nama === p)!;

export function WilayahKerja({ data = KABUPATEN }: { data?: Kabupaten[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [tip, setTip] = useState<{ name: string; x: number; y: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const selected = data.find((d) => d.id === selectedId) ?? null;
  const toggle = (id: string) => setSelectedId((cur) => (cur === id ? null : id));
  const total = (k: "kecamatan" | "desa") => data.reduce((a, d) => a + d[k], 0);
  const countIn = (p: Provinsi) => data.filter((d) => d.province === p).length;

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Wilayah Kerja</h1>
        <div
          className="mt-8 grid gap-8 lg:grid-cols-[5fr_6fr] lg:gap-12"
          onKeyDown={(e) => e.key === "Escape" && setSelectedId(null)}
        >
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="max-w-xl text-ink-soft">
              Balai Monitor SFR &amp; Infrastruktur Digital Kelas II Jayapura mencakup {data.length}{" "}
              kabupaten/kota di Provinsi Papua, Papua Tengah, dan Papua Pegunungan. Pilih satu wilayah di
              peta atau daftar untuk melihat ringkasannya.
            </p>
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4">
              {[
                [data.length, "Kabupaten/Kota"],
                [total("kecamatan"), "Kecamatan"],
                [total("desa"), "Desa/Kelurahan"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dd className="font-display text-step-2 font-bold leading-none text-navy-deep">{fmt(Number(n))}</dd>
                  <dt className="mt-1 text-step--1 text-ink-soft">{label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-step--2 text-ink-soft">Angka kecamatan, desa/kelurahan, dan stasiun radio adalah data demo.</p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div ref={boxRef} className="relative rounded-lg border border-line bg-white p-3">
              <svg
                viewBox={MAP_VIEWBOX}
                className="block h-auto w-full"
                role="group"
                aria-label={`Peta ${data.length} kabupaten/kota wilayah kerja`}
                onClick={() => setSelectedId(null)}
              >
                <g aria-hidden="true" className="fill-line stroke-white">
                  {CONTEXT_PATHS.map((d, i) => (
                    <path key={i} d={d} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                  ))}
                </g>
                <g>
                  {data.map((d) => {
                    const path = REGION_PATHS[d.id];
                    if (!path) return null;
                    return (
                      <path
                        key={d.id}
                        d={path}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selectedId === d.id}
                        aria-label={`${d.name}, ${d.province}`}
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                        className={`${provinsiOf(d.province).fill} cursor-pointer stroke-white outline-none transition-[filter] hover:brightness-110 focus-visible:[stroke-width:3px] focus-visible:stroke-navy-deep motion-reduce:transition-none ${hoverId === d.id ? "brightness-110" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(d.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggle(d.id);
                          }
                        }}
                        onPointerMove={(e) => {
                          if (e.pointerType === "touch") return;
                          const r = boxRef.current?.getBoundingClientRect();
                          if (r) setTip({ name: d.name, x: e.clientX - r.left, y: e.clientY - r.top });
                        }}
                        onPointerLeave={() => setTip(null)}
                      />
                    );
                  })}
                </g>
                {selected && REGION_PATHS[selected.id] && (
                  <path
                    d={REGION_PATHS[selected.id]}
                    fill="none"
                    className="stroke-navy-deep"
                    strokeWidth={3}
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                )}
              </svg>
              {tip && (
                <div
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded bg-navy-deep px-2 py-1 text-step--2 text-white"
                  style={{ left: tip.x, top: tip.y }}
                >
                  {tip.name}
                </div>
              )}
              <ul className="mx-1 mt-3 flex flex-wrap gap-x-5 gap-y-1 text-step--2 text-ink-soft">
                {PROVINSI.map((p) => (
                  <li key={p.nama} className="flex items-center gap-1.5">
                    <span className={`inline-block size-2.5 rounded-full ${p.dot}`} />
                    {p.nama} ({countIn(p.nama)})
                  </li>
                ))}
                <li className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 rounded-full bg-line" />
                  Di luar wilayah kerja
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <div className="min-h-[11.5rem] rounded-lg border border-line bg-white p-5" aria-live="polite">
              {selected ? (
                <>
                  <h3 className="font-display text-step-1 font-bold text-navy-deep">
                    {selected.name}
                    <span className="ml-2 rounded-full border border-line px-2 py-0.5 align-middle font-sans text-step--2 font-normal text-ink-soft">
                      Data demo
                    </span>
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-step--1 text-ink-soft">
                    <span className={`inline-block size-2.5 rounded-full ${provinsiOf(selected.province).dot}`} />
                    {selected.province} &middot; Ibukota {selected.capital}
                  </p>
                  <dl className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      [selected.kecamatan, "Kecamatan"],
                      [selected.desa, "Desa/Kelurahan"],
                      [selected.stasiun, "Stasiun radio berizin"],
                    ].map(([n, label]) => (
                      <div key={label}>
                        <dd className="font-display text-step-2 font-bold leading-tight text-navy-deep">{fmt(Number(n))}</dd>
                        <dt className="text-step--2 text-ink-soft">{label}</dt>
                      </div>
                    ))}
                  </dl>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="mt-4 rounded border border-brand px-3 py-1.5 text-step--1 text-brand hover:bg-brand hover:text-white"
                  >
                    Tampilkan ringkasan
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-display text-step-1 font-bold text-navy-deep">Mencakup {data.length} Kabupaten/Kota</h3>
                  <p className="mt-1 text-step--1 text-ink-soft">
                    Belum ada wilayah dipilih. Arahkan kursor atau ketuk wilayah pada peta.
                  </p>
                  <dl className="mt-4 grid grid-cols-3 gap-3">
                    {PROVINSI.map((p) => (
                      <div key={p.nama}>
                        <dd className="font-display text-step-2 font-bold leading-tight text-navy-deep">{countIn(p.nama)}</dd>
                        <dt className="text-step--2 text-ink-soft">di {p.nama}</dt>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>

            <div className="mt-5 grid gap-4">
              {PROVINSI.map((p) => (
                <div key={p.nama}>
                  <h3 className="mb-2 font-display text-step--1 font-bold text-navy-deep">{p.nama}</h3>
                  <div className="flex flex-wrap gap-2">
                    {data
                      .filter((d) => d.province === p.nama)
                      .map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          aria-pressed={selectedId === d.id}
                          onClick={() => toggle(d.id)}
                          onMouseEnter={() => setHoverId(d.id)}
                          onMouseLeave={() => setHoverId(null)}
                          className="rounded-full border border-line bg-white px-3 py-1 text-step--1 hover:border-brand aria-pressed:border-navy-deep aria-pressed:bg-navy-deep aria-pressed:text-white"
                        >
                          {d.name.replace(/^Kab\. /, "")}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
