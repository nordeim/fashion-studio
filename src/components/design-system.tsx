"use client";

import {
  ANIMATIONS,
  BODY_COPY_EXAMPLES,
  BRAND_ESSENCE,
  BRAND_VALUES,
  COLOR_PALETTE,
  FONT_CARDS,
  GUIDELINE_DONT,
  GUIDELINE_DO,
  HEADLINE_EXAMPLES,
  LAYOUT_RULES,
  TYPE_SCALE,
  VISUAL_LANGUAGE,
} from "@/lib/design-system";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ── Copy-to-clipboard button ─────────────────────────────────────── */

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (permissions / non-secure context) — no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label}: ${value}`}
      className="text-subtle transition-colors hover:text-black"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

/* ── Replayable demo box ──────────────────────────────────────────── */

function DemoBox({ title, description, snippet, children }: {
  title: string;
  description: string;
  snippet: string;
  children: (replayKey: number) => ReactNode;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const [played, setPlayed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPlayed(true);
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
    <div className="bg-white p-6 rounded-lg" ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{title}</span>
        <CopyButton value={snippet} label={`Copy ${title} code`} />
      </div>
      <p className="text-subtle mb-4 leading-relaxed">{description}</p>
      <div className="mt-4 border border-border rounded-lg bg-background p-6">
        {played ? children(replayKey) : null}
      </div>
      <button
        type="button"
        onClick={() => setReplayKey((key) => key + 1)}
        className="mt-4 text-sm uppercase tracking-wider border-b border-black pb-1 hover:opacity-70 transition-opacity"
      >
        Replay
      </button>
    </div>
  );
}

/* ── Tabs ─────────────────────────────────────────────────────────── */

const TAB_TRIGGER_CLASS =
  "data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:rounded-none px-0 py-2 border-b-2 border-transparent whitespace-nowrap text-foreground";

export function DesignSystem() {
  return (
    <Tabs.Root defaultValue="brand" className="mb-16 w-full">
      <Tabs.List
        aria-label="Design system sections"
        className="mb-8 flex w-full gap-8 overflow-x-auto border-b border-border bg-transparent pb-2"
      >
        <Tabs.Trigger value="brand" className={TAB_TRIGGER_CLASS}>Brand Identity</Tabs.Trigger>
        <Tabs.Trigger value="typography" className={TAB_TRIGGER_CLASS}>Typography</Tabs.Trigger>
        <Tabs.Trigger value="colors" className={TAB_TRIGGER_CLASS}>Color Palette</Tabs.Trigger>
        <Tabs.Trigger value="components" className={TAB_TRIGGER_CLASS}>Components</Tabs.Trigger>
        <Tabs.Trigger value="animations" className={TAB_TRIGGER_CLASS}>Animations</Tabs.Trigger>
        <Tabs.Trigger value="guidelines" className={TAB_TRIGGER_CLASS}>Guidelines</Tabs.Trigger>
      </Tabs.List>

      {/* Brand Identity */}
      <Tabs.Content value="brand" className="mt-0">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl mb-6">Brand Essence</h2>
            <p className="text-muted mb-8 leading-relaxed">{BRAND_ESSENCE}</p>
            <h3 className="font-medium text-xl mb-3">Brand Values</h3>
            <ul className="space-y-4 mb-8">
              {BRAND_VALUES.map((value) => (
                <li key={value.title} className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black">
                    <span className="h-2 w-2 rounded-full bg-black" />
                  </span>
                  <div>
                    <span className="font-medium block">{value.title}</span>
                    <p className="text-muted">{value.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl mb-6">Brand Voice</h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg">
                <h3 className="font-medium text-xl mb-3">Headline Examples</h3>
                <ul className="space-y-4">
                  {HEADLINE_EXAMPLES.map((headline) => (
                    <li key={headline} className="font-display text-2xl">{headline}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white rounded-lg">
                <h3 className="font-medium text-xl mb-3">Body Copy Examples</h3>
                <ul className="space-y-4">
                  {BODY_COPY_EXAMPLES.map((copy) => (
                    <li key={copy.slice(0, 24)} className="font-light text-foreground">{copy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Tabs.Content>

      {/* Typography */}
      <Tabs.Content value="typography" className="mt-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl mb-6">Typography System</h2>
            <div className="space-y-12">
              {TYPE_SCALE.map((item) => (
                <div key={item.label}>
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-sm text-subtle">{item.label}</span>
                    <CopyButton value={item.className} label={`Copy ${item.label} classes`} />
                  </div>
                  <p className={item.className}>{item.sample}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl mb-6">Font Families</h2>
            <div className="space-y-6">
              {FONT_CARDS.map((font) => (
                <div key={font.name} className="bg-white p-6 rounded-lg">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-xl">{font.name}</h3>
                      <p className="text-sm text-subtle">{font.role}</p>
                    </div>
                    <CopyButton value={font.cssStack} label={`Copy ${font.name} stack`} />
                  </div>
                  <p className={`${font.name === "Space Grotesk" ? "font-display" : ""} text-6xl mb-4`}>
                    Aa Bb Cc
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {font.weights.map((weight, index) => (
                      <p
                        key={weight}
                        className={`${font.name === "Space Grotesk" ? "font-display" : ""} ${
                          ["font-light", "font-normal", "font-medium", "font-semibold"][index] ?? "font-normal"
                        } text-5xl`}
                      >
                        {weight}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tabs.Content>

      {/* Color Palette */}
      <Tabs.Content value="colors" className="mt-0">
        <h2 className="font-display text-3xl mb-6">Color Palette</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {COLOR_PALETTE.map((color) => (
            <div key={color.hex} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-32 w-full" style={{ backgroundColor: color.hex }} />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{color.name}</span>
                  <CopyButton value={color.hex} label={`Copy ${color.name} hex`} />
                </div>
                <p className="text-sm text-subtle mb-2">{color.usage}</p>
                <p className="font-mono text-sm">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Tabs.Content>

      {/* Components */}
      <Tabs.Content value="components" className="mt-0">
        <div className="space-y-12">
          <div>
            <h2 className="font-display text-4xl mb-6 leading-tight">Components</h2>
            <p className="text-muted mb-8 leading-relaxed max-w-2xl">
              Interactive elements follow a restrained, tactile language: pill-shaped calls to
              action, underlined text links, and image-led cards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg mb-8">
            <div className="flex items-end justify-between mb-4">
              <span className="font-medium">Primary CTA &amp; Text Link</span>
              <CopyButton
                value="rounded-full border border-black py-5 px-8 flex items-center gap-4 hover:bg-black hover:text-white transition-all duration-300"
                label="Copy CTA classes"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-8">
              <span className="group flex cursor-pointer items-center gap-4 rounded-full border border-black px-8 py-5 transition-all duration-300 hover:bg-black hover:text-white">
                <span className="text-sm uppercase tracking-wider">Explore the collection</span>
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </span>
              <span className="inline-flex items-center gap-2 border-b border-black pb-1 text-sm uppercase tracking-wider transition-opacity hover:opacity-70">
                View Full Collection
                <ArrowRight size={16} />
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-end justify-between mb-4">
              <span className="font-medium">Product Card</span>
              <CopyButton
                value="group relative overflow-hidden; aspect-[5/6]; img group-hover:scale-105 duration-700"
                label="Copy product card pattern"
              />
            </div>
            <div className="max-w-xs mx-auto py-4">
              <div className="group relative">
                <div className="aspect-[5/6] bg-accent-light overflow-hidden">
                  <div className="h-full w-full bg-accent transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="pt-4">
                  <h3 className="font-medium text-lg">Oversized Wool Coat</h3>
                  <p className="text-muted font-light">Tailored silhouette in heavyweight merino wool</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tabs.Content>

      {/* Animations */}
      <Tabs.Content value="animations" className="mt-0">
        <h2 className="font-display text-3xl mb-6">Motion Design</h2>
        <p className="text-muted mb-8 max-w-2xl leading-relaxed">
          Motion is restrained and physical: content rises into place with a custom easing curve,
          and interactive elements respond with subtle scale. All animations respect
          prefers-reduced-motion.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <DemoBox
            title={ANIMATIONS[0].name}
            description={ANIMATIONS[0].description}
            snippet={ANIMATIONS[0].snippet}
          >
            {(key) => (
              <div key={key} className="flex h-32 items-center justify-center overflow-hidden">
                <span className="font-display text-5xl" aria-label="Moda">
                  {"MODA".split("").map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      aria-hidden
                      className="hero-letter"
                      style={{ "--i": index } as React.CSSProperties}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </DemoBox>

          <DemoBox
            title={ANIMATIONS[1].name}
            description={ANIMATIONS[1].description}
            snippet={ANIMATIONS[1].snippet}
          >
            {(key) => (
              <div key={key} className="relative flex h-16 items-center overflow-hidden">
                <p className="animate-fade-up font-light text-lg">Cornerstone pieces that transcend seasons</p>
              </div>
            )}
          </DemoBox>

          <DemoBox
            title={ANIMATIONS[2].name}
            description={ANIMATIONS[2].description}
            snippet={ANIMATIONS[2].snippet}
          >
            {(key) => (
              <div key={key} className="flex h-16 items-center gap-4">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="animate-fade-up h-3 w-24 bg-accent"
                    style={{ "--fade-delay": `${index * 0.12}s` } as React.CSSProperties}
                  />
                ))}
              </div>
            )}
          </DemoBox>

          <DemoBox
            title={ANIMATIONS[3].name}
            description={ANIMATIONS[3].description}
            snippet={ANIMATIONS[3].snippet}
          >
            {() => (
              <div className="flex h-16 items-center justify-center">
                <span className="flex cursor-pointer items-center gap-4 rounded-full border border-black px-8 py-4 transition-transform duration-300 hover:scale-105 active:scale-[0.98]">
                  <span className="text-sm uppercase tracking-wider">Explore the collection</span>
                  <ArrowRight size={20} />
                </span>
              </div>
            )}
          </DemoBox>
        </div>
      </Tabs.Content>

      {/* Guidelines */}
      <Tabs.Content value="guidelines" className="mt-0">
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="font-display text-3xl mb-6">Layout</h2>
            <p className="text-muted mb-4 leading-relaxed">
              Full-width sections with centered content and consistent padding:
            </p>
            <ul className="space-y-2 list-disc pl-5 text-foreground">
              {LAYOUT_RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h2 className="font-display text-3xl mb-6">Imagery</h2>
            <p className="text-muted mb-4 leading-relaxed">The visual language relies on:</p>
            <ul className="space-y-2 list-disc pl-5 text-foreground">
              {VISUAL_LANGUAGE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-4">Do</h3>
              <ul className="space-y-3">
                {GUIDELINE_DO.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black">
                      <span className="h-2 w-2 rounded-full bg-black" />
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-4">Don&apos;t</h3>
              <ul className="space-y-3">
                {GUIDELINE_DONT.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black">
                      <span className="h-2 w-2 rounded-full bg-black" />
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
