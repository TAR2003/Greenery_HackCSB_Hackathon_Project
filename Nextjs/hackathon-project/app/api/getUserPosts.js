//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function getUserPosts(userId) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
     // Validate userId to ensure it's a number (optional but recommended)
     if (typeof userId !== 'number' || userId <= 0) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }
    // Use a parameterized query to fetch posts for the specified user ID
    
    const result = await pool.query(
      "SELECT * FROM Post WHERE user_id = $1 ORDER BY time DESC",
      [userId]
    );
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
