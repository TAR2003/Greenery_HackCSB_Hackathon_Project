import { NextResponse } from "next/server";
import { getPool } from "./db";

const pool = getPool();

export async function insertInfo(email, password, name, location) {
  try {
        
    if(email === '' || name === '' || password === '' || location === '')
      return NextResponse.json({ success: false });
    
    const emailCheck = await pool.query("SELECT * FROM UserInfo WHERE email = $1", [email]);

    if(emailCheck.rowCount === 0) {
        const image = '/user/masnoon.png';
        await pool.query(
            `INSERT into UserInfo(email, password, name, location, image)
            values($1, $2, $3, $4, $5)`
            ,[email, password, name, location, image]
        );

        return NextResponse.json({ success: true });
    }
    else {
        return NextResponse.json({ success: false });
    }        
    
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
