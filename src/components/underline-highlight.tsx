"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Animated underline highlight (source parity): a beige band grows behind
 * the wrapped word (e.g. "2025") once it enters the viewport — width 0 →
 * 100%, 800ms, 400ms delay. Reduced-motion users see it fully drawn
 * (globals.css forces width: 100%).
 */
export function UnderlineHighlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -100px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} data-highlight="" data-visible={visible ? "true" : undefined} className="relative block">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="highlight-underline absolute -bottom-2 left-0 z-0 h-4 w-full bg-accent/30"
      />
    </span>
  );
}
