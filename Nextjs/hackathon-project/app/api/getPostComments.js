//THIS FILE IS FOR GETTING ALL COMMENTS FOR A POST
import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getPostComments(postId) {
  try {

    // First, get all plants the user has
    const commentResult = await pool.query(
      `SELECT * FROM commentxpost WHERE post_id = $1 order by time desc`,
      [postId]
    );
    const comments = commentResult.rows;

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
