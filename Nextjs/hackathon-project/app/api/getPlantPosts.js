// getPlantPosts.js
import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getPlantPosts(plantId) {
  try {
    // Validate plantId to ensure it's a number (optional but recommended)
    if (typeof plantId !== 'number' || plantId <= 0) {
      return NextResponse.json({ message: "Invalid plant ID" }, { status: 400 });
    }

    // Use parameterized query to prevent SQL injection
    const result = await pool.query(
      `SELECT *
       FROM Post
       WHERE plant_id = $1
       ORDER BY time DESC`,
      [plantId]
    );

    const posts = result.rows; // Get the rows from the result
    return NextResponse.json(posts);
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
