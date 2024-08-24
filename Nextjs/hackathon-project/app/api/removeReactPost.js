//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function removeReactPost(userId, postId) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    const result = await pool.query(
      `delete from reactxpost where post_id = $1 and user_id = $2
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
