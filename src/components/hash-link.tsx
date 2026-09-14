"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

/**
 * Hash-aware navigation link.
 *
 * Next.js App Router <Link> handling of same-page hash targets is
 * unreliable (the router's scroll-to-hash effect can compute a stale
 * target or skip scrolling entirely). For hrefs like "/#essentials"
 * while already on that page, we intercept the click and perform a
 * native smooth scrollIntoView — which also honors the html element's
 * scroll-padding-top, keeping section headings clear of the fixed nav.
 * Cross-page hrefs (e.g. "/#about" from /DesignSystem) fall through to
 * normal Next.js client-side routing, where the hash is handled after
 * navigation.
 */
export function HashLink({
  href,
  children,
  className,
  onClick,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.();

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const targetPath = href.slice(0, hashIndex) || pathname;
    if (targetPath !== pathname) return; // cross-page: let Next.js route it

    const hash = href.slice(hashIndex);
    const target = hash.length > 1 ? document.querySelector(hash) : null;
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", hash);
  }

  return (
    <Link href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
