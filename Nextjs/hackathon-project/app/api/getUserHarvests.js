//THIS WILL FETCH THE HARVEST POSTS THAT A USER HAS POSTED
import { getPool } from "./db";
import { NextResponse } from "next/server";

const pool = getPool();

export async function getHarvestByUser(userId) {
  try {
    // Use parameterized query to prevent SQL injection
    const result = await pool.query(
      `SELECT * FROM Harvest WHERE user_id = $1 ORDER BY TIME DESC`,
      [userId]
    );

    const harvests = result.rows;
    return NextResponse.json(harvests);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
