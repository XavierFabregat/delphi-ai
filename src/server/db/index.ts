import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

let conn: postgres.Sql;

try {
  conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
  if (env.NODE_ENV !== "production") globalForDb.conn = conn;
} catch (error) {
  console.error("Failed to connect to database:", error);
  // Provide a more specific error message based on the error type
  if (error instanceof Error) {
    if (error.message.includes("authentication")) {
      console.error("Database authentication failed. Check your credentials.");
    } else if (error.message.includes("timeout")) {
      console.error("Database connection timed out. Check network connectivity.");
    } else if (error.message.includes("database") && error.message.includes("exist")) {
      console.error("Database does not exist. Check your DATABASE_URL.");
    }
  }
  // Provide a fallback connection or rethrow to prevent silent failures
  throw new Error("Critical database connection failure. Application cannot start.");
}

export const db = drizzle(conn, { schema });
