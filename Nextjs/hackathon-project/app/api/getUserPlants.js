// getUserPlants.js
import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getUserPlants(userId) {
  try {
    // Validate userId to ensure it's a number (optional but recommended)
    if (typeof userId !== 'number' || userId <= 0) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Use parameterized query to prevent SQL injection
    //this will show the information of the plants that the user has
    const result = await pool.query(
      `SELECT p.id, p.name, p.image, p.description, up.no_of_plants
       FROM UserXPlant up
       JOIN PlantInfo p ON up.plant_id = p.id
       WHERE up.user_id = $1`,
      [userId]
    );

    const plants = result.rows; // Get the rows from the result
    return NextResponse.json(plants);
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
