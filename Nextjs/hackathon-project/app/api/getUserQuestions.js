//this file is used to get all the questions asked by a user
import { NextResponse } from 'next/server';
import { getPool } from './db'; // Adjust the path as necessary

export async function getUserQuestions(userId) {
  const pool = getPool();

  try {
    // Validate userId to ensure it's a number (optional but recommended)
    if (typeof userId !== 'number' || userId <= 0) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    // Query to get all questions asked by the user
    const result = await pool.query(
      'SELECT * FROM ForumQuestion WHERE user_id = $1 ORDER BY time DESC',
      [userId]
    );

    const questions = result.rows; // Get the rows from the result

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
