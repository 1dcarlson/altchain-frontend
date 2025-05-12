import express from 'express';
import { z } from 'zod';
import { db } from './db';
import { waitlist, contact } from '@shared/schema';
import { sendWaitlistConfirmation, sendEmail } from './email';

const router = express.Router();

const insertWaitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100).optional(),
  language: z.string().min(2).max(5).optional()
});

const insertContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(5).max(1000)
});

router.post('/api/waitlist', async (req, res) => {
  try {
    const validated = insertWaitlistSchema.parse(req.body);
    const inserted = await db.insert(waitlist).values({
      email: validated.email,
      name: validated.name,
      language: validated.language
    });
    await sendWaitlistConfirmation(validated.email, validated.language);
    res.status(200).json({ success: true, entry: inserted });
  } catch (error: any) {
    console.error('❌ /api/waitlist error:', error);
    res.status(500).json({ error: error.message || 'Failed to join waitlist' });
  }
});

router.post('/api/contact', async (req, res) => {
  try {
    const validated = insertContactSchema.parse(req.body);
    const inserted = await db.insert(contact).values({
      name: validated.name,
      email: validated.email,
      message: validated.message
    });
    await sendEmail({
      to: 'daniel@altchain.app',
      subject: `New Contact Form Message from ${validated.name}`,
      text: validated.message,
      html: `<p><strong>${validated.name}</strong> (${validated.email}) wrote:</p><p>${validated.message}</p>`
    });
    res.status(200).json({ success: true, entry: inserted });
  } catch (error: any) {
    console.error('❌ /api/contact error:', error);
    res.status(500).json({ error: error.message || 'Failed to send message' });
  }
});

export function registerRoutes(app: express.Express) {
  app.use(router);
  return app.listen;
}
