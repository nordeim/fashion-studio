"use client";

import { HERO } from "@/lib/site";
import { useEffect, useState } from "react";

/**
 * Full-viewport hero (source parity): background photograph at 110% size
 * with a warm blur overlay, a frosted glass content card, and the signature
 * letter-by-letter heading reveal. The scroll cue fades out across the
 * first 20% of page scroll, exactly like the source's scrollYProgress map.
 */
export function Hero() {
  const [cueOpacity, setCueOpacity] = useState(1);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setCueOpacity(Math.max(0, 1 - progress / 0.2));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const letters = HERO.heading.split("");

  return (
    <section
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center px-6 text-center"
      style={{
        backgroundImage: `url(${HERO.backgroundImage})`,
        backgroundSize: "110%",
        backgroundPosition: "center 40%",
      }}
    >
      <div className="absolute inset-0 bg-[#c4b3a3]/20 backdrop-blur-[2px]" aria-hidden />

      <div className="relative z-10 max-w-4xl rounded-lg bg-[rgba(255,255,255,0.1)] px-8 py-10 backdrop-blur-[4px]">
        <div className="mb-4 overflow-hidden">
          <p
            className="animate-fade-up text-sm font-light uppercase tracking-[0.25em] text-foreground"
            style={{ "--fade-delay": "0.2s" } as React.CSSProperties}
          >
            {HERO.eyebrow}
          </p>
        </div>

        <h1
          aria-label={HERO.heading}
          className="mx-8 mb-6 max-w-3xl px-12 font-display text-5xl leading-snug text-foreground md:text-8xl"
        >
          <span aria-hidden="true" className="block overflow-hidden">
            <span className="animate-hero-rise block">
              {letters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="hero-letter"
                  style={
                    {
                      "--i": index,
                      width: letter === " " ? "0.25em" : "auto",
                    } as React.CSSProperties
                  }
                >
                  {letter}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="animate-grow-x my-6 h-px w-full bg-foreground/40" aria-hidden />

        <p
          className="animate-fade-up mx-auto max-w-2xl font-light text-lg leading-relaxed text-foreground/80 md:text-xl"
          style={
            { "--fade-duration": "0.8s", "--fade-delay": "1s" } as React.CSSProperties
          }
        >
          {HERO.subtitle}
        </p>
      </div>

      <div
        className="animate-fade-up absolute bottom-0 left-0 right-0 z-10 mb-12 flex justify-center"
        style={
          { "--fade-duration": "0.8s", "--fade-delay": "1.4s" } as React.CSSProperties
        }
      >
        <a
          href="#collections"
          aria-label="Scroll to collections"
          className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-foreground text-foreground transition-colors hover:bg-foreground/10"
          style={{ opacity: cueOpacity }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
