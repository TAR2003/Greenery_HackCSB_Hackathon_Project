//THIS WILL FETCH THE HARVEST POSTS THAT A USER HAS POSTED
import { getPool } from "./db";
import { NextResponse } from "next/server";

const pool = getPool();

export async function getUserAnswers(userId) {
  try {

    // Use parameterized query to prevent SQL injection
    const result = await pool.query(
      `SELECT * FROM Forumanswer WHERE user_id = $1`,
      [userId]
    );

    const harvests = result.rows;
    console.log(harvests);
    return NextResponse.json(harvests);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
