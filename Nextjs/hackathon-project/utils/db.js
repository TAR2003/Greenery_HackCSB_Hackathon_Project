import { Pool } from 'pg';

export const pool = new Pool({
    user    : process.env.DB_USER,
    host    : process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port    : process.env.DB_PORT,
});

export default async function dbConnect()
{
    await pool.connect((err, client, release) => {
        if(err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query('SELECT NOW()', (err, result) => {
            release()
            if(err) {
                return console.error('Error executing query', err.stack)
            }
            console.log('Database connection successful:', result.rows)
        })
})
}
