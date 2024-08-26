import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getForumInfo(userid, searchedText, order, ownPostsOnly) {
  try {

    const modifiedText = '%' + searchedText + '%';
    const ord = (order === 'oldest') ? 'ASC' : 'DESC' ;

    
    
      const ques = await pool.query(
          `SELECT ForumQuestion.id AS qid, user_id, time, name, ForumQuestion.text AS text, image  
          FROM ForumQuestion JOIN UserInfo
          ON UserInfo.id = user_id
          WHERE ForumQuestion.text LIKE $1
          AND user_id = $2
          ORDER BY time ${ord} `,[modifiedText, userid]
      );
    
      const ques2 = await pool.query(
          `SELECT ForumQuestion.id AS qid, user_id, time, name, ForumQuestion.text AS text, image  
          FROM ForumQuestion JOIN UserInfo
          ON UserInfo.id = user_id
          WHERE ForumQuestion.text LIKE $1
          ORDER BY time ${ord}`,[modifiedText]
      );
    

    const questions = ownPostsOnly ? ques.rows : ques2.rows;

    return NextResponse.json({
        questions: questions
    });
        
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
