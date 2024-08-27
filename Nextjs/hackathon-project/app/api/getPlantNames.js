//THIS FILE IS FOR GETTING ALL POSTS RELATED TO A USER'S PLANTS NOT NECESSARILY THAT THE USER HAS POSTED THEM
import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getAllPlantNames() {
  try {
    const result = await pool.query(`SELECT * FROM plantinfo`);
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

export async function getPlantNamesStartingWith(name) {
  try {
    const result = await pool.query(
      `
  SELECT id, name, 1 AS sort_order
  FROM plantinfo
  WHERE name ILIKE $1
  UNION 
  SELECT id, name, 2 AS sort_order
  FROM plantinfo
  WHERE name ILIKE $2 AND name NOT ILIKE $1
  ORDER BY sort_order, name;
  `,
      [`${name}%`, `%${name}%`] // These are the parameters passed to the placeholders
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

export async function getPlantName(name) {
  try {
    const result = await pool.query(
      `
  SELECT name from plantinfo where id = $1
  `,
      [`${name}`] // These are the parameters passed to the placeholders
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
