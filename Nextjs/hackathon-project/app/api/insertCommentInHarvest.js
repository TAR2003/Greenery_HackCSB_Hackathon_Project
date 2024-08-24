import { getPool } from './db'; // Import the singleton pool

export async function insertCommentInHarvest(harvest_id, user_id, text, image) {
  const pool = getPool(); // Get the singleton instance of the pool

  try {
    // Use parameterized query to prevent SQL injection
    const queryText = `
      INSERT INTO CommentXHarvest (harvest_id, user_id, text, image)
      VALUES ($1, $2, $3, $4)
    `;
    
     await pool.query(queryText, [harvest_id, user_id, text, image]);

    // Return the inserted row or any relevant information if needed
    return result.rows[0]; // This returns the inserted row if RETURNING * was used

  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Internal Server Error'); // Throw an error to be caught by the API route
  }
}
