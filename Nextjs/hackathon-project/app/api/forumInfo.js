import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getForumInfo(searchedText) {
  try {

    const modifiedText = '%' + searchedText + '%';

    const ques = await pool.query(
        `SELECT ForumQuestion.id AS qid, user_id, time, name, ForumQuestion.text AS text, image  
        FROM ForumQuestion JOIN UserInfo
        ON UserInfo.id = user_id
        WHERE ForumQuestion.text LIKE $1`,[modifiedText]
    );

    const ans = await pool.query(
        `SELECT ForumAnswer.id AS aid, user_id, time, name, ForumAnswer.text AS text, image, question_id
        FROM ForumAnswer JOIN UserInfo
        ON UserInfo.id = user_id`
    );

    const questions = ques.rows;
    const answers = ans.rows;

    return NextResponse.json({
        questions: questions,
        answers: answers
    });
        
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
