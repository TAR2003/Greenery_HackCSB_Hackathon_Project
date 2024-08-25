//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function removeReactPost(userId, postId, kindof) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    if (kindof === "community") {
      const result = await pool.query(
        `delete from reactxpost where post_id = $1 and user_id = $2
    `,
        [postId, userId]
      );

      return NextResponse.json(result.rows);
    } else if (kindof === "harvest") {
      const result = await pool.query(
        `delete from reactxharvest where harvest_id = $1 and user_id = $2
    `,
        [postId, userId]
      );

      return NextResponse.json(result.rows);
    } else if (kindof === "answer") {
      const result = await pool.query(
        `delete from reactxanswer where answer_id = $1 and user_id = $2
    `,
        [postId, userId]
      );

      return NextResponse.json(result.rows);
    }
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
