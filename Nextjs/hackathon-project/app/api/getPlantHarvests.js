//THIS FILE IS FOR FETCHING ALL THE EXISTING HARVEST INFORMATION/POST OF THE PLANTS THAT A USER HAS

import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getPlantHarvests(userId) {
  try {
    // Validate userId to ensure it's a number (optional but recommended)
    if (typeof userId !== "number" || userId <= 0) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // First, get all plants the user has
    const plantResult = await pool.query(
      `SELECT plant_id FROM UserXPlant WHERE user_id = $1`,
      [userId]
    );
    const plantIds = plantResult.rows.map((row) => row.plant_id);

    if (plantIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Then, get all posts related to these plants
    const result = await pool.query(
      `SELECT * FROM harvest WHERE plant_id = ANY($1) ORDER BY time DESC`,
      [plantIds]
    );
    const posts = result.rows;

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
