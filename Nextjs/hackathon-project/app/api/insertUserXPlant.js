//this will show the posts of a particular user in descending order of time
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Import the singleton pool

export async function insertUserXPlant(userId, plantId) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    // Use a parameterized query to fetch posts for the specified user ID
    console.log("in the userxplant " + plantId + " " + userId);
    const result = await pool.query(
      `
    INSERT INTO userxplant (user_id, plant_id, no_of_plants)
    VALUES ($1, $2, 1)
    ON CONFLICT (user_id, plant_id) 
    DO UPDATE SET no_of_plants = userxplant.no_of_plants + 1
    RETURNING *;
  `,
      [userId, plantId]
    );

    const ans = result.rows;
    //console.log(JSON.stringify(ans));

    return NextResponse.json(ans);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function insertUserXPlant2(userId, plantId) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {
    // Use a parameterized query to fetch posts for the specified user ID
    console.log("in the userxplant " + plantId + " " + userId);
    const result = await pool.query(
      `
    INSERT INTO userxplant (user_id, plant_id, no_of_plants)
    VALUES ($1, $2, 1)
    ON CONFLICT (user_id, plant_id) 
    DO UPDATE SET no_of_plants = userxplant.no_of_plants
    RETURNING *;
  `,
      [userId, plantId]
    );

    const ans = result.rows;
    //console.log(JSON.stringify(ans));

    return NextResponse.json(ans);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
