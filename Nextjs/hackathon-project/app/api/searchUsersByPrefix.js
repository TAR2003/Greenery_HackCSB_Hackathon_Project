// utils/searchUsers.js
import { NextResponse } from 'next/server';
import { getPool } from './db'; // Adjust the path as necessary

export async function searchUsersByPrefix(prefix) {
  const pool = getPool();

  try {
    const result = await pool.query(
      'SELECT * FROM UserInfo WHERE name ILIKE $1',
      [`${prefix}%`] // Use ILIKE for case-insensitive search
    );
    const users = result.rows; // Get the rows from the result

    return NextResponse.json(users);
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Internal Server Error'); // Handle error appropriately
  }
}
