//this will give the info of the user of a particular id
import { NextResponse } from "next/server";
import { getPool } from "./db";

export async function getUserInfo(userId) {
  const pool = getPool();
  console.log(userId + " -- " + typeof userId);
  try {
    // Use parameterized query to fetch user data from the UserInfo table

    const result = await pool.query("SELECT * FROM UserInfo WHERE id = $1", [
      userId,
    ]);
    const users = result.rows; // Get the rows from the result

    return NextResponse.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function getUserInfoByName(userName) {
  const pool = getPool();
  try {
    // Use parameterized query to fetch user data from the UserInfo table based on the name
    const result = await pool.query("SELECT * FROM UserInfo WHERE name = $1", [
      userName,
    ]);
    const users = result.rows; // Get the rows from the result

    return NextResponse.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
