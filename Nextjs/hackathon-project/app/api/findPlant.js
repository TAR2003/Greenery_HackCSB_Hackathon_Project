//THIS FILE IS FOR GETTING ALL POSTS RELATED TO A USER'S PLANTS NOT NECESSARILY THAT THE USER HAS POSTED THEM
import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function findPlant(plantname) {
  try {
    const result = await pool.query(`SELECT * FROM plantinfo where name = $1`, [
      plantname,
    ]);
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
