import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getChatParticipants(userId) {
  try {
   
    // Query to retrieve distinct chat participants with the user, sorted by most recent chat time
    const result = await pool.query(
      `SELECT DISTINCT ON (other_user.id) other_user.id, other_user.name, other_user.email, other_user.image, c.time
       FROM Chat c
       JOIN UserInfo other_user
       ON other_user.id = CASE
         WHEN c.sender = $1 THEN c.receiver
         WHEN c.receiver = $1 THEN c.sender
       END
       WHERE c.sender = $1 OR c.receiver = $1
       ORDER BY other_user.id, c.time DESC`,
      [userId]
    );

    // Get the rows from the result
    const chatParticipants = result.rows;

    // Return the list of users with whom the user has had a chat
    return NextResponse.json(chatParticipants);

  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
