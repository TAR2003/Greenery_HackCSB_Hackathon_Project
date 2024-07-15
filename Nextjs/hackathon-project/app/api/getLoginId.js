// getPlantPosts.js
import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getId(email, password) {
  try {
        
    // Use parameterized query to prevent SQL injection
    const result = await pool.query("SELECT id FROM UserInfo WHERE email = $1 AND password = $2",[email, password]);

    
    if(result.rowCount === 1) {
        const id = result.rows[0].id; // Get the rows from the result
        return NextResponse.json({success: true, userid: id});
    }
    else {
        return NextResponse.json({ success: false });
    }
    
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
