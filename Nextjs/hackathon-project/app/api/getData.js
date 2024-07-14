

import dbConnect from '@/utils/db';
import pool from '@/utils/db';

export default async function handler(req, res) {
    dbConnect();
    console.log('API Route Hit');
    try {
        const result = await pool.query('SELECT * FROM UserInfo');
        console.log('Query Result:', result);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
