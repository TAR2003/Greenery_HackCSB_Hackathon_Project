// Import necessary Next.js functions
import { NextResponse } from "next/server";
import { Pool } from "pg";
import { getUserInfo } from "./getUserInfo";

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
  const info = await request.json();
  // info will held all the body of request
  const type = info.type;
  // type will show what type of query we want to do, every post request body will have a type element
  //Now we will use conitionals
  if (type == "getuserinfo") {
    // if type matches this it will call the getUserInfo function from that js file and return await it
    // wait before return
    return await getUserInfo(info.userid);
  } else {
    // this will continue
  }
}
