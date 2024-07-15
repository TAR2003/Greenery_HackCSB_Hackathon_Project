//THIS WILL FETCH THE HARVEST POSTS THAT A USER HAS POSTED
import { getPool } from "./db";
import { NextResponse } from "next/server";

const pool = getPool();

export async function getHarvestByUser(userId) {
  try {
    // Validate userId to ensure it's a number (optional but recommended)
    if (typeof userId !== 'number' || userId <= 0) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    // Use parameterized query to prevent SQL injection
    const result = await pool.query(
      `SELECT * FROM Harvest WHERE user_id = $1`,
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
