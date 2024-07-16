//this will get the reaction of the user to the answer
import { getPool } from './db'; // Adjust the path as necessary

export async function getUserReaction(answerId, userId) {
  const pool = getPool();

  try {
    const result = await pool.query(
      'SELECT react FROM ReactXAnswer WHERE answer_id = $1 AND user_id = $2',
      [answerId, userId]
    );

    // Return the reaction if found, otherwise null
    return result.rows.length > 0 ? result.rows[0].react : null;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Internal Server Error'); // Handle error appropriately
  }
}
