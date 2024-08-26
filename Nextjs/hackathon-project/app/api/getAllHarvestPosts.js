//THIS WILL FETCH THE HARVEST POSTS THAT A USER HAS POSTED
import { getPool } from "./db";
import { NextResponse } from "next/server";

const pool = getPool();

export async function getAllHarvestPosts() {
  try {
    // Use parameterized query to prevent SQL injection
    const result = await pool.query(`SELECT * FROM Harvest ORDER BY TIME DESC`);

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
