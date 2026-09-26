"use client";

import { useRef } from "react";
import Link from "next/link";
import type { NavItem, NavChild } from "@/constants/site";

function childHref(child: NavChild, pathname: string): string {
  const base = child.basePath ?? "/";
  if (base === pathname) return `#${child.id}`;
  if (base === "/") return `/#${child.id}`;
  return `${base}#${child.id}`;
}

type Props = {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  isCurrentSection: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function NavDropdown({ item, pathname, isOpen, isCurrentSection, onToggle, onClose }: Props) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    }
  };

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      triggerRef.current?.focus();
    }
  };

  return (
    <li className="relative">
      <button
        ref={triggerRef}
        type="button"
        data-dropdown-trigger={item.id}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={onTriggerKeyDown}
        className={`flex min-h-11 items-center px-3 font-semibold transition-colors hover:text-brand active:text-brand ${
          (isOpen || isCurrentSection) ? "text-brand" : "text-ink"
        }`}
      >
        {item.label}
        <svg
          viewBox="0 0 24 24"
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
          focusable="false"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={panelRef}
          data-dropdown-panel={item.id}
          role="menu"
          onKeyDown={onPanelKeyDown}
          className="nav-dropdown absolute left-0 top-full min-w-[12rem] border border-line bg-white"
        >
          {item.children?.map((child) => (
            <Link
              key={child.id}
              href={child.href ?? childHref(child, pathname)}
              role="menuitem"
              aria-current={
                child.href && pathname === child.href ? "page" : undefined
              }
              onClick={onClose}
              className={`nav-dropdown-item flex min-h-11 items-center px-3 text-navy-deep no-underline hover:bg-mist hover:text-brand ${
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
}
