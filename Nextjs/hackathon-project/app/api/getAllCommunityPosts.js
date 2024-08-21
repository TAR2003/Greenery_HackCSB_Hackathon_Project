//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function getAllCommunityPosts() {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    const result = await pool.query("SELECT * FROM Post ORDER BY time DESC");
    const posts = result.rows; // Get the rows from the result

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
