import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * SQLite connection (better-sqlite3, WAL mode).
 *
 * DATABASE_URL uses the `file:` URL scheme (e.g. `file:./db/app.db`);
 * relative paths resolve from the process working directory, which is the
 * repo root for every npm script. The dev fallback keeps zero-config local
 * development working; production should always set DATABASE_URL
 * explicitly (see .env.example).
 */
function resolveDatabaseFile(): string {
  const url = process.env.DATABASE_URL ?? "file:./db/app.db";
  const file = url.startsWith("file:") ? url.slice("file:".length) : url;
  // Runtime-resolved path (env-driven) — excluded from static module tracing.
  const resolved = path.isAbsolute(file)
    ? file
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), file);
  mkdirSync(path.dirname(resolved), { recursive: true });
  return resolved;
}

const globalForDb = globalThis as typeof globalThis & {
  __fashionStudioSqlite?: Database.Database;
};

export const sqlite =
  globalForDb.__fashionStudioSqlite ??
  (() => {
    const connection = new Database(resolveDatabaseFile());
    connection.pragma("journal_mode = WAL");
    connection.pragma("foreign_keys = ON");
    return connection;
  })();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__fashionStudioSqlite = sqlite;
}

export const db = drizzle(sqlite);
