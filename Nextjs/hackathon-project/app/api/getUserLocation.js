import { NextResponse } from "next/server";
import { getPool } from "./db";

export async function getUserLocation(userId) {
  const pool = getPool();
  try {

    // Use parameterized query to fetch user location from the UserInfo table
    const result = await pool.query("SELECT location FROM UserInfo WHERE id = $1", [
      userId,
    ]);

    // Check if the user was found
    if (result.rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { location } = result.rows[0]; // Get the location from the result

    return NextResponse.json({ location });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
