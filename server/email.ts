import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn('⚠️ SENDGRID_API_KEY is missing from environment variables.');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid initialized');
}

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailParams): Promise<void> {
  const msg = {
    to,
    from: 'daniel@altchain.app', // ✅ Must match your verified sender in SendGrid
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
  } catch (error: any) {
    console.error('❌ SendGrid email failed:', error.response?.body || error.message);
    throw new Error('SendGrid failed to send email');
  }
}
export async function sendWaitlistConfirmation(email: string, language = 'en') {
  const subject = "Welcome to AltChain Waitlist";
  const text = `Thank you for joining the AltChain waitlist!\n\nWe're excited to have you on board.`;
  const html = `<h1>AltChain</h1><p>Thank you for joining the waitlist!</p>`;

  return sendEmail({
    to: email,
    subject,
    text,
    html,
  });
}