import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

function resolveDatabaseFile(): string {
  const url = process.env.DATABASE_URL ?? "file:./db/app.db";
  const file = url.startsWith("file:") ? url.slice("file:".length) : url;
  return path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
}

const databaseFile = resolveDatabaseFile();
mkdirSync(path.dirname(databaseFile), { recursive: true });

const connection = new Database(databaseFile);
connection.pragma("journal_mode = WAL");
connection.pragma("foreign_keys = ON");

const migrationsFolder = path.resolve(process.cwd(), "drizzle");
if (!existsSync(path.join(migrationsFolder, "meta"))) {
  console.error(`No migrations found in ${migrationsFolder}. Run "npm run db:generate" first.`);
  process.exit(1);
}

migrate(drizzle(connection), { migrationsFolder });

const tables = connection
  .prepare("select name from sqlite_master where type = 'table' and name not like 'sqlite_%' order by name")
  .all() as Array<{ name: string }>;

console.log(`Migrations applied. Tables: ${tables.map((t) => t.name).join(", ") || "(none)"}`);
connection.close();
