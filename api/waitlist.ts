export const config = {
  runtime: 'nodejs'
};

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, language } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required and must be a string' });
  }

  try {
    console.log('📨 Saving waitlist entry:', { email, name, language });

    await pool.query(
      'INSERT INTO waitlist (email, name, language) VALUES ($1, $2, $3)',
      [email, name || null, language || null]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ DB Error:', error);
    return res.status(500).json({ error: 'Database insert failed' });
  }
}
