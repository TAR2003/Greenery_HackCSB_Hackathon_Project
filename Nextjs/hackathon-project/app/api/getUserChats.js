import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function getUserChats(userId, otherUserId) {
  try {

    // Validate userId and otherUserId to ensure they are numbers (optional but recommended)
    if (typeof userId !== "number" || userId <= 0 || typeof otherUserId !== "number" || otherUserId <= 0) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Query to retrieve all chat messages between two users, sorted by time
    const result = await pool.query(
      `SELECT c.id, c.sender, c.receiver, c.text, c.time
       FROM Chat c
       WHERE (c.sender = $1 AND c.receiver = $2)
          OR (c.sender = $2 AND c.receiver = $1)
       ORDER BY c.time ASC`,
      [userId, otherUserId]
    );

    // Get the rows from the result
    const chats = result.rows;

    // Return the chat messages between the users
    return NextResponse.json(chats);

  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
