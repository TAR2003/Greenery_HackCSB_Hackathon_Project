import { Pool } from "pg";

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL, // Ensure your DATABASE_URL is set in .env.local
    });
  }
  return pool;
}

