// Import necessary Next.js functions
import { NextResponse } from "next/server";
import { Pool } from "pg";

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure your DATABASE_URL is set in .env.local
});

// Define the GET function
export async function GET(req) {
  try {
    // Fetch user data from the UserInfo table
    const result = await pool.query("SELECT * FROM UserInfo");
    const users = result.rows; // Get the rows from the result

    return NextResponse.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if(true) {
      console.log('we are in backend');
      const email = body.email;
      console.log(email);
      // const result = await pool.query("SELECT * FROM UserInfo");
      // const users = result.rows; // Get the rows from the result

      return NextResponse.json({success: true});
    } else {
      // Fetch user data from the UserInfo table
      const result = await pool.query("SELECT * FROM UserInfo");
      const users = result.rows; // Get the rows from the result

      return NextResponse.json(users);
    }
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
  //   const type = await request.json();

  //   console.log("we are in backend " + type.type);
  //   const r = {
  //     k: "io",
  //     l: "op",
  //   };
  //   //const result = await pool.query("SELECT * FROM UserInfo");
  //   // const users = result.rows; // Get the rows from the result
  //   return new Response(JSON.stringify(r));
}
