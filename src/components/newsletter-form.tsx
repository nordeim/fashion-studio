"use client";

import { NEWSLETTER } from "@/lib/site";
import { useState, type FormEvent } from "react";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

/**
 * Newsletter signup — the site's only interactive form. Client-side it
 * performs the same validation as the API for instant feedback; the API
 * remains the source of truth. Status changes are announced via
 * aria-live; the submit button is disabled while in flight.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;

    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

      if (response.ok && data?.ok) {
        setStatus({ state: "success", message: data.message ?? "You're on the list." });
        setEmail("");
      } else {
        setStatus({ state: "error", message: data?.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "error", message: "Network error — please check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div className="mt-6 w-full max-w-md" role="status">
        <p className="border border-foreground bg-white px-6 py-4 font-light text-foreground" aria-live="polite">
          {status.message}
        </p>
      </div>
    );
  }

  const describedBy = status.state === "error" ? "newsletter-error" : undefined;

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="mt-6 flex w-full" noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={NEWSLETTER.placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={status.state === "error"}
          aria-describedby={describedBy}
          disabled={status.state === "submitting"}
          className="flex-1 border-t border-l border-b border-black bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-subtle focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className="bg-black px-6 py-3 text-sm uppercase tracking-wider text-white transition-colors hover:bg-black/90 disabled:opacity-50"
        >
          {status.state === "submitting" ? "Subscribing…" : NEWSLETTER.cta}
        </button>
      </form>
      {status.state === "error" ? (
        <p id="newsletter-error" role="alert" className="mt-3 text-left text-sm text-foreground">
          {status.message}
        </p>
      ) : null}
    </div>
  );
}
