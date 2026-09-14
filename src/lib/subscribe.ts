/**
 * Newsletter email validation — pure and unit-tested. Pragmatic RFC-lite:
 * one @, a dot in the domain, no whitespace, bounded length. Deliberately
 * permissive towards exotic-but-legal local parts; the API is the only
 * writer so we optimise for catching typos, not for lexing RFC 5322.
 */

export const EMAIL_MAX_LENGTH = 254;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailParseResult =
  | { ok: true; email: string }
  | { ok: false; error: string };

export function parseEmail(raw: unknown): EmailParseResult {
  if (typeof raw !== "string") {
    return { ok: false, error: "Please enter your email address." };
  }

  const email = raw.trim().toLowerCase();

  if (email.length === 0) {
    return { ok: false, error: "Please enter your email address." };
  }
  if (email.length > EMAIL_MAX_LENGTH) {
    return { ok: false, error: `Email must be at most ${EMAIL_MAX_LENGTH} characters.` };
  }
  if (/\s/.test(email)) {
    return { ok: false, error: "Email cannot contain spaces." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return { ok: true, email };
}
