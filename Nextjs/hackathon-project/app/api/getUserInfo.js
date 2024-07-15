import { NextResponse } from "next/server";
import { getPool } from "./db";


export async function getUserInfo(userid) {
  const pool = getPool();
  try {
    // Use parameterized query to fetch user data from the UserInfo table
    //this will give the info of the user of a particular id
    const result = await pool.query("SELECT * FROM UserInfo WHERE id = $1", [userid]);
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




