//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function addReactPost(userId, postId, react) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    const result = await pool.query(
      `insert into reactxpost (post_id, user_id, react) values ($1,$2, $3)
    `,
      [postId, userId, react]
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
