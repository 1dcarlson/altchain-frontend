import type { VercelRequest, VercelResponse } from '@vercel/node';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  const msg = {
    to: 'daniel@altchain.tech',
    from: 'waitlist@altchain.tech',
    subject: 'New Waitlist Signup',
    html: `<p><strong>Name:</strong> ${name || 'N/A'}</p><p><strong>Email:</strong> ${email}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Success' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
