"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/constants/site";
import { BrandLockup } from "@/components/brand-lockup";
import { useActiveSection } from "@/hooks/use-active-section";
import type { NavItem, NavChild } from "@/constants/site";

const SECTION_IDS = NAV.flatMap((n) =>
  n.href
    ? []
    : [n.id, ...(n.children?.filter((c) => !c.basePath && !c.href).map((c) => c.id) ?? [])],
);

function childHref(child: NavChild, pathname: string): string {
  const base = child.basePath ?? "/";
  if (base === pathname) return `#${child.id}`;
  if (base === "/") return `/#${child.id}`;
  return `${base}#${child.id}`;
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? SECTION_IDS : []);
  const [open, setOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  // When the mobile sidebar opens: move focus into it and trap Tab.
  // When it closes: return focus to the hamburger. Skip initial mount.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!open) {
      buttonRef.current?.focus();
      return;
    }
    const first = sidebarRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    (first ?? sidebarRef.current)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;
      const elFirst = focusable[0];
      const elLast = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === elFirst) {
        e.preventDefault();
        elLast.focus();
      } else if (!e.shiftKey && document.activeElement === elLast) {
        e.preventDefault();
        elFirst.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // #4 Body scroll-lock while sidebar open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // #6 Close mobile sidebar when crossing the md breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) {
        setOpen(false);
        setExpanded(null);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape closes whatever is open
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenDesktop(null);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Outside-click closes desktop dropdown
  useEffect(() => {
    if (!openDesktop) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      const trigger = document.querySelector(
        `[data-dropdown-trigger="${openDesktop}"]`,
      );
      const panel = document.querySelector(
        `[data-dropdown-panel="${openDesktop}"]`,
      );
      if (
        trigger &&
        !trigger.contains(e.target) &&
        panel &&
        !panel.contains(e.target)
      ) {
        setOpenDesktop(null);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [openDesktop]);

  const isParentActive = (item: NavItem) =>
    item.children?.some(
      (c) =>
        (c.basePath && pathname.startsWith(c.basePath)) ||
        (c.href && pathname.startsWith(c.href)),
    ) ?? false;

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 shadow-sm shadow-navy-deep/5 backdrop-blur-md backdrop-saturate-150">
      <nav
        aria-label="Navigasi utama"
        className="wrap wrap-nav relative flex min-h-16 items-center justify-between"
      >
        <Link
          href="/"
          className="-ml-1 flex min-h-11 items-center gap-3 px-1 text-navy-deep no-underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo, no optimization needed */}
          <img
            src="/LogoBalmon.svg"
            alt="Logo Balmon Jayapura"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <BrandLockup variant="header" theme="light" />
        </Link>

        {/* Hamburger */}
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line text-navy-deep transition-colors hover:bg-mist md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex md:flex-row">
          {NAV.map((item) => {
            const isCurrentSection = isParentActive(item);
            if (!item.children) {
              if (item.href) {
                const isRouteActive = pathname.startsWith(item.href);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={isRouteActive ? "page" : undefined}
                      className="flex min-h-11 items-center px-3 font-semibold text-ink no-underline transition-colors hover:text-brand active:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const href = isHome ? `#${item.id}` : `/#${item.id}`;
              return (
                <li key={item.id}>
                  <Link
                    href={href}
                    aria-current={isCurrentSection ? "location" : undefined}
                    className="flex min-h-11 items-center px-3 font-semibold text-ink no-underline transition-colors hover:text-brand active:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = openDesktop === item.id;
            return (
              <li
                key={item.id}
                className="relative"
              >
                <button
                  type="button"
                  data-dropdown-trigger={item.id}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => setOpenDesktop(isOpen ? null : item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenDesktop(null);
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const panel = document.querySelector<HTMLElement>(
                        `[data-dropdown-panel="${item.id}"]`,
                      );
                      const first = panel?.querySelector<HTMLElement>(
                        'a[href], button:not([disabled])',
                      );
                      first?.focus();
                    }
                  }}
                  className={`flex min-h-11 items-center px-3 font-semibold transition-colors hover:text-brand active:text-brand ${
                    (isOpen || isCurrentSection) ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.label}
                  <svg viewBox="0 0 24 24" className="ml-1 h-4 w-4" aria-hidden="true" focusable="false">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    data-dropdown-panel={item.id}
                    role="menu"
                    className="absolute left-0 top-full min-w-[12rem] border border-line bg-white shadow-sm"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href ?? childHref(child, pathname)}
                        role="menuitem"
                        aria-current={
                          child.href && pathname === child.href ? "page" : undefined
                        }
                        onClick={() => setOpenDesktop(null)}
                        className={`flex min-h-11 items-center px-4 text-navy-deep no-underline hover:bg-mist hover:text-brand ${
                          child.href && pathname === child.href ? "text-brand" : ""
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>

    {/* Mobile full-screen menu — outside header to escape backdrop-filter containing block */}
      {open && (
          <aside
            ref={sidebarRef}
            tabIndex={-1}
            id="main-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            className="menu-overlay md:hidden fixed inset-0 z-[60] flex h-dvh flex-col overflow-y-auto bg-white"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <Link href="/" onClick={() => setOpen(false)} className="-ml-1 flex min-h-11 items-center gap-2 px-1 text-navy-deep no-underline">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo, no optimization needed */}
                <img src="/LogoBalmon.svg" alt="Logo Balmon Jayapura" width={32} height={32} className="h-8 w-8 object-contain" />
                <BrandLockup variant="header" theme="light" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-navy-deep hover:bg-mist"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col">
              {NAV.map((item) => {
                const isActive = isParentActive(item);
                if (!item.children) {
                  if (item.href) {
                    const isRouteActive = pathname.startsWith(item.href);
                    return (
                      <li key={item.id} className="border-b border-line">
                        <Link
                          href={item.href}
                          aria-current={isRouteActive ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center px-4 py-5 text-step-2 font-semibold text-navy-deep no-underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const href = item.id === "beranda" ? "/" : isHome ? `#${item.id}` : `/#${item.id}`;
                  return (
                    <li key={item.id} className="border-b border-line">
                      <Link
                        href={href}
                        aria-current={isActive ? "location" : undefined}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center px-4 py-5 text-step-2 font-semibold text-navy-deep no-underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = expanded === item.id;
                return (
                  <li key={item.id} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className="flex min-h-11 w-full items-center justify-between px-4 py-5 text-step-2 font-semibold text-navy-deep"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </button>
                    {isOpen && (
                      <ul className="ml-4 border-l-2 border-line">
                        {item.children.map((child) => {
                          const childActive = child.href
                            ? pathname === child.href
                            : isHome && active === child.id;
                          return (
                            <li key={child.id}>
                              <Link
                                href={child.href ?? childHref(child, pathname)}
                                aria-current={
                                  childActive
                                    ? child.href
                                      ? "page"
                                      : "location"
                                    : undefined
                                }
                                onClick={() => setOpen(false)}
                                className={`flex min-h-11 items-center px-4 text-step--1 text-navy-deep no-underline ${
                                  childActive ? "text-brand" : ""
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
      )}
    </>
  );
}
