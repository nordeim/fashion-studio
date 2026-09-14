import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    // Runtime DATABASE_URL wins (see .env); fallback keeps zero-config local dev working.
    url: process.env.DATABASE_URL ?? "file:./db/app.db",
  },
  strict: true,
  verbose: true,
} satisfies Config;
