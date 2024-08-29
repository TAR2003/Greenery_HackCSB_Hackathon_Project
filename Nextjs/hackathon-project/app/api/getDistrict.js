import { NextResponse } from "next/server";
import { getPool } from "./db";
import message from "../(after-sign-in)/message/page";

const pool = getPool();

export async function getDistrict(userid) {
    try {
        const result = await pool.query(
            `SELECT location FROM UserInfo
            WHERE id = $1`, [userid]
        );

        return NextResponse.json(result.rows);

    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json(
            {message: "Internal Server Error" },
            {status: 500}
        );
    }
}