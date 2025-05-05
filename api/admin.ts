import { NextApiRequest, NextApiResponse } from 'next';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rows = await sql`
      SELECT id, email, name, language, created_at
      FROM waitlist
      ORDER BY created_at DESC
      LIMIT 100;
    `;
    res.status(200).json({ entries: rows });
  } catch (error) {
    console.error('🔥 Admin View Error:', error);
    res.status(500).json({ error: 'Failed to load waitlist data' });
  }
}
