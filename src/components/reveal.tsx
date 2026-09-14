"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper (source: fadeIn / staggerContainer). Elements start
 * hidden (opacity 0 + translateY; cards also scale 0.95) and animate in over
 * 600ms once they intersect the viewport. Staggering is expressed through
 * the `delay` prop (the caller multiplies the child index by 120ms).
 *
 * prefers-reduced-motion is handled in globals.css ([data-reveal] is forced
 * visible there), so no state is set synchronously in the effect body.
 */
export function Reveal({
  children,
  variant = "text",
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  variant?: "text" | "card";
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
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
      // Source probes the viewport with a -100px bottom margin before revealing.
      { rootMargin: "0px 0px -100px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      data-reveal=""
      data-variant={variant}
      data-visible={visible ? "true" : undefined}
      className={className}
      style={delay > 0 ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
