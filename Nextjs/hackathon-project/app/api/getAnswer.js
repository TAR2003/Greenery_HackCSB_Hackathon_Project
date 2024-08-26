import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getAnswers(qid) {
  try {

    const ans = await pool.query(
        `SELECT ForumAnswer.id AS aid, user_id, time, name, ForumAnswer.text AS text, image
        FROM ForumAnswer JOIN UserInfo
        ON UserInfo.id = user_id
        WHERE question_id = $1`,[qid]
    );

    const answers = ans.rows;

    return NextResponse.json({
        answers: answers,
    });
        
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
