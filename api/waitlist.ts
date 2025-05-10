import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    console.log('❌ Request method received:', req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, name, language } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required and must be a string' });
  }

  try {
    const result = await sql`
      INSERT INTO waitlist (email, name, language)
      VALUES (${email}, ${name || null}, ${language || null})
      RETURNING id, created_at;
    `;
    return res.status(200).json({ success: true, entry: result[0] });
  } catch (error) {
    console.error('Waitlist insert error:', error);
    return res.status(500).json({ error: 'Failed to join waitlist' });
  }
}
