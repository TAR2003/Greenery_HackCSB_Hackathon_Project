//this will get the reaction of the user to the answer
import { NextResponse } from "next/server";
import { getPool } from "./db"; // Adjust the path as necessary

export async function getUserjournals(userId) {
  const pool = getPool();

  try {
    const result = await pool.query(
      `select * from plantjournals where user_id = $1 order by time desc`,
      [userId]
    );

    // Return the reaction if found, otherwise null
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Internal Server Error"); // Handle error appropriately
  }
}

export async function getJournalMessages(journalId) {
  const pool = getPool();

  try {
    const result = await pool.query(
      `select * from journalmessages where journal_id = $1 order by time desc`,
      [journalId]
    );

    // Return the reaction if found, otherwise null
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Internal Server Error"); // Handle error appropriately
  }
}

export async function addUserJournal(userId, journalname) {
  const pool = getPool();

  try {
    const result = await pool.query(
      `insert into plantjournals (user_id, journalname) values
	( $1 , $2 )`,
      [userId, journalname]
    );

    // Return the reaction if found, otherwise null
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Internal Server Error"); // Handle error appropriately
  }
}

export async function addJournalMessage(journalId, msg) {
  const pool = getPool();

  try {
    const result = await pool.query(
      `insert into journalmessages (journal_id, message)
values ( $1 , $2 )`,
      [journalId, msg]
    );

    const result2 = await pool.query(
      `update plantjournals set time = current_timestamp where id = $1`,
      [journalId]
    );

    // Return the reaction if found, otherwise null
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Internal Server Error"); // Handle error appropriately
  }
}

export async function addReminder(journalId, msg, time) {
  const pool = getPool();

  try {
    const result = await pool.query(
      `insert into reminders (message, journal_id, time) values
( $1 , $2 ,  to_timestamp($3, 'YYYY-MM-DD') )`,
      [msg, journalId, time]
    );
    //console.log(" the time wr ifndd is " + time);
    await pool.query(
      `insert into journalmessages (journal_id, message, time) 
        values ( $1, $2, to_timestamp($3, 'YYYY-MM-DD') )`,
      [journalId, `Reminder:- ${msg}`, time]
    );

    // Return the reaction if found, otherwise null
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Internal Server Error"); // Handle error appropriately
  }
}

export async function getReminders(userId) {
  const pool = getPool();

  try {
    await pool.query(
      `delete from reminders where time::date  < current_timestamp::date`
    );

    const result = await pool.query(
      `select * from reminders where time::date = current_timestamp::date and
journal_id = any(select id from plantjournals where user_id = $1)


`,
      [userId]
    );

    // Return the reaction if found, otherwise null
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Internal Server Error"); // Handle error appropriately
  }
}
