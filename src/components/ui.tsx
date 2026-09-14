import type { ReactNode } from "react";

/** Join truthy class names — the only class utility this codebase needs. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Page container — mirrors the source site's `max-w-screen-xl mx-auto`
 * content measure (1280px) used by every section.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative z-10 mx-auto w-full max-w-screen-xl", className)}>{children}</div>;
}
