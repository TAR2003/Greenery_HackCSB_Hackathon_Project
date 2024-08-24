import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function submitQuestion(userid, question) {
  try {

    await pool.query(
        `INSERT into ForumQuestion(text, user_id)
        values($1, $2)`
        ,[question, userid]
    );

    return NextResponse.json({ success: true });
        
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
