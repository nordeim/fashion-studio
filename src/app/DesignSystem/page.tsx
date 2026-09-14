import { DesignSystem } from "@/components/design-system";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "A comprehensive guide to the brand identity, UI components, and design principles of the Moda.Studio website.",
};

export default function DesignSystemPage() {
  return (
    <section className="min-h-screen bg-background p-6 pt-32 md:p-12 md:pt-40">
      <div className="mx-auto w-full max-w-screen-xl">
        <h1 className="font-display text-4xl mb-4 text-foreground md:text-6xl">
          Moda.Studio Design System
        </h1>
        <p className="text-muted text-lg max-w-2xl md:text-xl">
          A comprehensive guide to the brand identity, UI components, and design principles of the
          Moda.Studio website.
        </p>
        <DesignSystem />
      </div>
    </section>
  );
}
