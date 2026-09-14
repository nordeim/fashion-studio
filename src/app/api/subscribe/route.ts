import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { parseEmail } from "@/lib/subscribe";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  if (!rateLimit(`subscribe:${clientKey(request)}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return Response.json(
      { ok: false, message: "Too many attempts. Please try again in a minute." },
      { status: 429 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return Response.json({ ok: false, message: "Expected a JSON request." }, { status: 415 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return Response.json({ ok: false, message: "Request body is too large." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return Response.json({ ok: false, message: "Could not read the request." }, { status: 400 });
  }

  const payload = (body ?? {}) as { email?: unknown };
  const parsed = parseEmail(payload.email);
  if (!parsed.ok) {
    return Response.json({ ok: false, message: parsed.error }, { status: 400 });
  }

  try {
    await db.insert(subscribers).values({ email: parsed.email }).onConflictDoNothing();
    return Response.json({
      ok: true,
      message: "You're on the list. Watch your inbox for early collection access.",
    });
  } catch (error) {
    // Structured context for operators; never echo raw driver errors to clients.
    console.error("[subscribe] insert failed", {
      emailLength: parsed.email.length,
      error: error instanceof Error ? error.message : String(error),
    });
    return Response.json(
      { ok: false, message: "Something went wrong on our side. Please try again." },
      { status: 500 },
    );
  }
}
