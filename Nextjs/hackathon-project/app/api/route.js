// export async function POST(request) {
//     const info = await request.json();
//     console.log(info.type);

// export async function POST(request) {
//     const info = await request.json();
//     console.log(info.type);

//     return new Response(JSON.stringify(info));
// }

// Import necessary Next.js functions
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure your DATABASE_URL is set in .env.local
});

// Define the GET function
export async function GET(req) {
  try {
    // Fetch user data from the UserInfo table
    const result = await pool.query('SELECT * FROM UserInfo');
    const users = result.rows; // Get the rows from the result

    return NextResponse.json(users);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



  
//     return new Response(JSON.stringify(info));
// }
// import { stringify } from "postcss";
// import { f } from "./login";
// export async function GET() {
//   return new Response("Hello weold" + (await f()));
// }

// export async function POST(request) {
//   const info = await request.json();
//   const type = info.type;
//   console.log(type);
//   return new Response(JSON.stringify("hhh"));
// }
