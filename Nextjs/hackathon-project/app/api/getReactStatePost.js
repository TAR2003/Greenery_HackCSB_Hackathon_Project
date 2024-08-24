//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function getReactStatePost(userId, postId) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    const result = await pool.query(
      `
      SELECT REACT FROM REACTXPOST WHERE POST_ID = $1 and USER_ID = $2
    `,
      [postId, userId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
