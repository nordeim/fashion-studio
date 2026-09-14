import { SITE } from "@/lib/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center md:px-12">
      <div className="mx-auto w-full max-w-screen-xl">
        <p className="mb-4 text-sm uppercase tracking-wider text-subtle">404</p>
        <h1 className="mb-6 font-display text-4xl text-foreground md:text-6xl">
          This piece isn&apos;t in the collection.
        </h1>
        <p className="mx-auto mb-10 max-w-md font-light text-lg leading-relaxed text-muted">
          The page you&apos;re looking for could not be found. It may have been moved, or the link
          may be outdated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-4 rounded-full border border-black px-8 py-5 text-sm uppercase tracking-wider text-foreground transition-all duration-300 hover:bg-black hover:text-white"
        >
          Return to the studio
        </Link>
        <p className="mt-8 text-sm font-light text-subtle">{SITE.wordmark}</p>
      </div>
    </section>
  );
}
