"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center md:px-12">
      <div className="mx-auto w-full max-w-screen-xl">
        <p className="mb-4 text-sm uppercase tracking-wider text-subtle">Something went wrong</p>
        <h1 className="mb-6 font-display text-4xl text-foreground md:text-6xl">
          We hit a snag loading this page.
        </h1>
        <p className="mx-auto mb-10 max-w-md font-light text-lg leading-relaxed text-muted">
          This is usually transient. Try again — if the problem persists, please check back shortly.
        </p>
        {error.digest ? (
          <p className="mb-6 font-mono text-xs text-subtle">Ref: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-4 rounded-full border border-black px-8 py-5 text-sm uppercase tracking-wider text-foreground transition-all duration-300 hover:bg-black hover:text-white"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
