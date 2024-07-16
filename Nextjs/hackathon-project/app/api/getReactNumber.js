//this file gives the no of likes and dislikes for a particular answer
import { getPool } from './db'; // Adjust the path as necessary

export async function getReactionNumber(answerId) {
  const pool = getPool();

  try {
    const result = await pool.query(`
      SELECT
        SUM(CASE WHEN react = 'like' THEN 1 ELSE 0 END) AS likes,
        SUM(CASE WHEN react = 'dislike' THEN 1 ELSE 0 END) AS dislikes
      FROM ReactXAnswer
      WHERE answer_id = $1
    `, [answerId]);

    return result.rows[0]; // Return the counts
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Internal Server Error'); // Handle error appropriately
  }
}
