//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function insertPlant(name) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    // Use a parameterized query to fetch posts for the specified user ID

    const result = await pool.query(
      `
  WITH existing AS (
    SELECT id
    FROM plantinfo
    WHERE LOWER(name) = LOWER($1)
  )
  INSERT INTO plantinfo (name)
  SELECT LOWER($1)
  WHERE NOT EXISTS (SELECT 1 FROM existing)
  RETURNING id;
  `,
      [name]
    );

    // If the insert didn't happen because the plant already exists, fetch the existing ID
    let plantId;
    if (result.rows.length > 0) {
      plantId = result.rows[0].id;
    } else {
      const existingResult = await pool.query(
        `SELECT id FROM plantinfo WHERE LOWER(name) = LOWER($1);`,
        [name]
      );
      plantId = existingResult.rows[0].id;
    }

    return NextResponse.json({ plantId });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
