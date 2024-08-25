import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function submitAnswer(userid, answer, qid) {
  try {

    await pool.query(
        `INSERT into ForumAnswer(question_id, text, user_id)
        values($1, $2, $3)`
        ,[qid, answer, userid]
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
