import { NextResponse } from "next/server";
import { Pool } from "pg";

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure your DATABASE_URL is set in .env.local
});

export async function getUserInfo(userid) {
  try {
    // Fetch user data from the UserInfo table
    const result = await pool.query("SELECT * FROM UserInfo");
    const users = result.rows; // Get the rows from the result

    return NextResponse.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
