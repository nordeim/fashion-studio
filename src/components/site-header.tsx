"use client";

import { HashLink } from "@/components/hash-link";
import { NAV_LINKS, SITE } from "@/lib/site";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

/**
 * Fixed top navigation (source parity): transparent + soft blur over the
 * hero, frosted `bg-background/90 + shadow-sm` once scrolled past 50px.
 * The source site ships a non-functional hamburger; this implementation
 * gives mobile users a real disclosure menu (ARIA-wired, closes on
 * navigation).
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className={`flex w-full items-center justify-between px-6 py-6 transition-all duration-300 md:px-12 ${
          solid
            ? "bg-[rgba(248,247,244,0.9)] shadow-xs backdrop-blur-md"
            : "bg-transparent backdrop-blur-[4px]"
        }`}
      >
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {SITE.wordmark}
        </Link>

        <div className="hidden gap-8 font-light text-sm uppercase tracking-wider md:flex">
          {NAV_LINKS.map((item) => (
            <HashLink
              key={item.href}
              href={item.href}
              className="text-foreground transition-opacity hover:opacity-70"
            >
              {item.label}
            </HashLink>
          ))}
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M6 6L18 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 12H21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 6H21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 18H21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {open ? (
        <div id={menuId} className="animate-menu-down border-b border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {NAV_LINKS.map((item) => (
              <HashLink
                key={item.href}
                href={item.href}
                className="py-3 font-light text-sm uppercase tracking-wider text-foreground transition-opacity hover:opacity-70"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </HashLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
