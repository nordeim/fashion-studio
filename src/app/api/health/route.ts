import { sql } from "drizzle-orm";
import { db } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    db.run(sql`select 1`);
    return Response.json({ ok: true, status: "ok", db: true });
  } catch {
    return Response.json({ ok: false, status: "error", db: false }, { status: 500 });
  }
}
