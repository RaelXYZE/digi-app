"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/constants/site";
import { BrandLockup } from "@/components/brand-lockup";
import { NavDropdown } from "@/components/NavDropdown";
import { NavIcon } from "@/components/NavIcons";
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
              const href = item.id === "beranda" ? "/" : isHome ? `#${item.id}` : `/#${item.id}`;
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
            return (
              <NavDropdown
                key={item.id}
                item={item}
                pathname={pathname}
                isOpen={openDesktop === item.id}
                isCurrentSection={isCurrentSection}
                onToggle={() => setOpenDesktop(openDesktop === item.id ? null : item.id)}
                onClose={() => setOpenDesktop(null)}
              />
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
            <ul className="flex flex-col gap-1 px-3 py-3">
              {NAV.map((item) => {
                const isActive = isParentActive(item);
                if (!item.children) {
                  const isRouteActive = item.href
                    ? pathname.startsWith(item.href)
                    : isActive;
                  const href = item.href ?? (item.id === "beranda" ? "/" : isHome ? `#${item.id}` : `/#${item.id}`);
                  return (
                    <li key={item.id}>
                      <Link
                        href={href}
                        aria-current={isRouteActive ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-11 items-center gap-3 rounded-2xl p-3 no-underline motion-safe:transition-colors ${
                          isRouteActive
                            ? "bg-mist font-semibold text-brand"
                            : "font-semibold text-navy-deep hover:bg-paper"
                        }`}
                      >
                        {item.icon && (
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              isRouteActive ? "bg-brand text-white" : "bg-mist text-ink-soft"
                            }`}
                          >
                            <NavIcon name={item.icon} className="h-5 w-5" />
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block text-step-0 font-semibold">{item.label}</span>
                          {item.description && (
                            <span className="block text-step--2 font-normal text-ink-soft">
                              {item.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                }
                const isOpen = expanded === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={item.id}
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className={`flex min-h-11 w-full items-center gap-3 rounded-2xl p-3 text-left motion-safe:transition-colors ${
                        isActive
                          ? "bg-mist font-semibold text-brand"
                          : "font-semibold text-navy-deep hover:bg-paper"
                      }`}
                    >
                      {item.icon && (
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            isActive ? "bg-brand text-white" : "bg-mist text-ink-soft"
                          }`}
                        >
                          <NavIcon name={item.icon} className="h-5 w-5" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block text-step-0 font-semibold">{item.label}</span>
                        {item.description && (
                          <span className="block text-step--2 font-normal text-ink-soft">
                            {item.description}
                          </span>
                        )}
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </button>
                    {isOpen && (
                      <ul id={item.id} className="mt-1 ml-3 flex flex-col gap-1 border-l border-line pl-3">
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
                                className={`flex min-h-11 items-center rounded-lg px-3 text-step--1 no-underline motion-safe:transition-colors ${
                                  childActive
                                    ? "bg-mist font-semibold text-brand"
                                    : "text-navy-deep hover:bg-paper"
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
