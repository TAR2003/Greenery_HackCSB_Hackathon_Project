import { getPool } from './db'; // Import the singleton pool

export async function insertCommentInPost(user_id, post_id, text, image) {
  const pool = getPool(); // Get the singleton instance of the pool

  try {

    // Use parameterized query to prevent SQL injection
    const queryText = `
      INSERT INTO CommentXPost (user_id, post_id, text, image)
      VALUES ($1, $2, $3, $4)
    `;
    
    await pool.query(queryText, [user_id, post_id, text, image]);

  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Internal Server Error'); // Throw an error to be caught by the API route
  }
}
