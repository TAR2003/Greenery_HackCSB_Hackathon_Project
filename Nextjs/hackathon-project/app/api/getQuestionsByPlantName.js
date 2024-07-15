// This file contains the function to get all questions related to a plant name
import { NextResponse } from 'next/server';
import { getPool } from './db'; // Adjust the path as necessary

export async function getQuestionsByPlantName(plantName) {
  const pool = getPool();

  try {
    // Query to get the plant ID based on the plant name
    const plantResult = await pool.query(
      'SELECT id FROM PlantInfo WHERE name ILIKE $1',
      [plantName]
    );

    if (plantResult.rows.length === 0) {
      return NextResponse.json({ message: 'Plant not found' }, { status: 404 });
    }

    const plantId = plantResult.rows[0].id;

    // Query to get all questions related to the plant
    const questionsResult = await pool.query(
      'SELECT * FROM ForumQuestion WHERE plant_id = $1 ORDER BY time DESC',
      [plantId]
    );

    const questions = questionsResult.rows; // Get the rows from the result

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
