import { Hero } from "@/components/hero";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/reveal";
import { UnderlineHighlight } from "@/components/underline-highlight";
import { WaveMarquee } from "@/components/wave-marquee";
import { ABOUT, COLLECTIONS, ESSENTIALS, NEWSLETTER, SITE, SUSTAINABILITY } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  slogan: SITE.tagline,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <Hero />

      {/* ── Collections ─────────────────────────────────────────── */}
      <section id="collections" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
        <WaveMarquee />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl">
          <div className="relative mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <p className="mb-4 text-sm uppercase tracking-wider text-subtle">{COLLECTIONS.label}</p>
              <h2 className="mb-6 font-display text-4xl leading-tight text-foreground md:text-6xl">
                <span className="block">{COLLECTIONS.heading}</span>
                <UnderlineHighlight>{COLLECTIONS.highlightedYear}</UnderlineHighlight>
              </h2>
            </Reveal>

            <div className="flex flex-col items-center justify-center gap-8 md:items-end md:justify-end">
              <Reveal delay={120}>
                <p className="max-w-md font-light text-lg leading-relaxed text-foreground">
                  {COLLECTIONS.description}
                </p>
                <div className="mt-8 flex items-center justify-center md:justify-end">
                  <a
                    href="#collection-pieces"
                    className="group flex cursor-pointer items-center gap-4 rounded-full border border-black px-8 py-5 transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    <span className="text-sm uppercase tracking-wider">{COLLECTIONS.cta}</span>
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                    />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div id="collection-pieces" className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.products.map((product, index) => (
              <Reveal key={product.title} variant="card" delay={index * 120}>
                <article className="group relative overflow-hidden">
                  <div className="aspect-[5/6] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      width={944}
                      height={1133}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-medium text-lg text-foreground">{product.title}</h3>
                    <p className="font-light text-muted">{product.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="flex justify-center">
            <a
              href="#collections"
              className="inline-flex items-center gap-2 border-b border-black pb-1 text-sm uppercase tracking-wider text-foreground transition-opacity hover:opacity-70"
            >
              {COLLECTIONS.viewAll}
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Sustainability ──────────────────────────────────────── */}
      <section id="sustainability" className="relative bg-accent-light px-6 py-24 md:px-12 md:py-32">
        <div className="relative z-10 mx-auto w-full max-w-screen-xl">
          <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
            <Reveal className="md:w-1/2">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={SUSTAINABILITY.image}
                  alt={SUSTAINABILITY.alt}
                  width={944}
                  height={1180}
                  className="h-full w-full rounded-lg object-cover shadow-lg"
                />
              </div>
            </Reveal>

            <div className="md:w-1/2">
              <Reveal>
                <p className="mb-4 text-sm uppercase tracking-wider text-subtle">{SUSTAINABILITY.label}</p>
                <h2 className="mb-6 font-display text-3xl text-foreground md:text-5xl">
                  {SUSTAINABILITY.heading}
                </h2>
                <p className="mb-6 font-light text-lg leading-relaxed text-foreground">
                  {SUSTAINABILITY.description}
                </p>
                <ul className="space-y-4 font-light text-foreground">
                  {SUSTAINABILITY.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black">
                        <span className="h-2 w-2 rounded-full bg-black" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Essentials ──────────────────────────────────────────── */}
      <section id="essentials" className="relative px-6 py-24 md:px-12 md:py-32">
        <div className="relative z-10 mx-auto w-full max-w-screen-xl">
          <Reveal className="mb-16">
            <p className="mb-4 text-sm uppercase tracking-wider text-subtle">{ESSENTIALS.label}</p>
            <h2 className="mb-6 font-display text-3xl text-foreground md:text-5xl">{ESSENTIALS.heading}</h2>
            <p className="max-w-xl font-light text-lg leading-relaxed text-foreground">
              {ESSENTIALS.description}
            </p>
          </Reveal>

          <div className="mb-12 grid grid-cols-1 gap-1 md:grid-cols-3">
            {ESSENTIALS.items.map((item, index) => (
              <Reveal key={item.title} variant="card" delay={index * 120}>
                <article className="group relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={944}
                      height={944}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 text-white">
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="font-light opacity-90">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────── */}
      <section id="about" className="bg-foreground px-6 py-24 text-white md:px-12 md:py-32">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="flex flex-col gap-12 md:flex-row">
            <Reveal className="md:w-2/5">
              <p className="mb-4 text-sm uppercase tracking-wider text-faint">{ABOUT.label}</p>
              <h2 className="mb-6 font-display text-3xl md:text-5xl">{ABOUT.heading}</h2>
            </Reveal>

            <Reveal className="md:w-3/5" delay={120}>
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mb-8 font-light text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <a
                href="#about"
                className="inline-flex items-center gap-2 border-b border-white pb-1 text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
              >
                {ABOUT.cta}
                <ArrowRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────── */}
      <section id="newsletter" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto w-full max-w-screen-xl">
          <Reveal className="flex flex-col items-center text-center">
            <p className="mb-4 text-sm uppercase tracking-wider text-subtle">{NEWSLETTER.label}</p>
            <h2 className="mb-6 max-w-2xl font-display text-3xl text-foreground md:text-5xl">
              {NEWSLETTER.heading}
            </h2>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
