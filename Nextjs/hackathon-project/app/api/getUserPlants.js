// this will show the information of the plants that the user has and also it will give the total number of plants for an user
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


export async function getTotalNoOfPlants(userId)
{
  try {
    // Validate userId to ensure it's a number (optional but recommended)
    if (typeof userId !== 'number' || userId <= 0) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Use parameterized query to prevent SQL injection
    const result = await pool.query(
      `SELECT SUM(no_of_plants) as total_no_of_plants
       FROM UserXPlant
       WHERE user_id = $1`,
      [userId]
    );

    const totalNoOfPlants = result.rows[0].total_no_of_plants; // Get the rows from the result
    return NextResponse.json(totalNoOfPlants);
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}