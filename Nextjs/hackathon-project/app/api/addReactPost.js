//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function addReactPost(userId, postId, react, kindof) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    if (kindof === "community") {
      const result = await pool.query(
        `insert into reactxpost (post_id, user_id, react) values ($1,$2, $3)
    `,
        [postId, userId, react]
      );

      return NextResponse.json(result.rows);
    } else if (kindof === "harvest") {
      const result = await pool.query(
        `insert into reactxharvest (harvest_id, user_id, react) values ($1,$2, $3)
    `,
        [postId, userId, react]
      );

      return NextResponse.json(result.rows);
    } else if (kindof === "answer") {
      const result = await pool.query(
        `insert into reactxanswer (answer_id, user_id, react) values ($1,$2, $3)
    `,
        [postId, userId, react]
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
