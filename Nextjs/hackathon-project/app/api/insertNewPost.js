import { getPool } from './db'; // Import the singleton pool

export async function insertNewPost(user_id, plant_id, text, image, advice_or_plantation) {
  const pool = getPool(); // Get the singleton instance of the pool
  try {

     // Validate userId to ensure it's a number (optional but recommended)
     if (typeof user_id !== "number" || user_id <= 0 || typeof plant_id !== "number" || plant_id <= 0) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const queryText = `
      INSERT INTO Post (user_id, plant_id, text, image, advice_or_plantation)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(queryText, [user_id, plant_id, text, image, advice_or_plantation]);
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Internal Server Error'); // Throw an error to be caught by the API route
  }
}
