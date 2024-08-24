import { Pool } from 'pg';

// Initialize a variable to hold the singleton instance
let pool;

export function getPool() {
  // If no instance exists, create a new one
  if (!pool) {
    pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
      ssl: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });
  }
  return pool;
}
