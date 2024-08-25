//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function getLikeNumberPost(postId, kindof) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    if (kindof === "community") {
      const result = await pool.query(
        `
      select count(*) from reactxpost where react = 'like' and post_id = $1
    `,
        [postId]
      );

      return NextResponse.json(result.rows);
    } else if (kindof === "harvest") {
      const result = await pool.query(
        `
      select count(*) from reactxharvest where react = 'like' and harvest_id = $1
    `,
        [postId]
      );

      return NextResponse.json(result.rows);
    } else if (kindof === "answer") {
      const result = await pool.query(
        `
      select count(*) AS count from reactxanswer where react = 'like' and answer_id = $1
    `,
        [postId]
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
