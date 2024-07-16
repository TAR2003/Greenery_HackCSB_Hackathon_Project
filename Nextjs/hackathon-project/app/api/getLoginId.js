
import { NextResponse } from "next/server";
import { getPool } from "./db";
import bcrypt from 'bcryptjs';

const pool = getPool();

export async function getId(email, password) {
  try {
        
    // Use parameterized query to prevent SQL injection
    const result = await pool.query("SELECT id, password FROM UserInfo WHERE email = $1", [email]);

    
    if(result.rowCount === 1) {
        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch) {
          const id = user.id; 
          return NextResponse.json({success: true, userid: id});
        }
        else {
          return NextResponse.json({ success: false });
        }
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
