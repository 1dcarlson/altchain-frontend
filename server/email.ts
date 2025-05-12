import sgMail from "@sendgrid/mail";

sgMail.setApiKey("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");
console.log("✅ SendGrid key loaded");

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const msg = {
    to,
    from: "daniel@altchain.app", // must match your verified sender in SendGrid
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent successfully");
  } catch (error: any) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);
    throw new Error("Email failed to send");
  }
}

export async function sendWaitlistConfirmation(email: string, language: string = 'en') {
  const templates: Record<string, { subject: string; text: string; html: string }> = {
    en: {
      subject: 'Welcome to AltChain Waitlist',
      text: `Thank you for joining the AltChain waitlist!\n\nWe're excited to have you on board as we prepare to launch our AI-powered global sourcing platform. You'll be among the first to know when we launch.\n\nThe AltChain Team`,
      html: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #4c86f9;">Thank you for joining AltChain's waitlist!</h2>
        <p>We're excited to have you on board. You'll be among the first to know when we're ready to launch our AI-powered global sourcing platform.</p>
        <p>In the meantime, if you have any questions, feel free to reply to this email.</p>
        <p><strong>The AltChain Team</strong></p>
      </div>`,
    },
    // ... other languages unchanged
  };

  const template = templates[language] || templates.en;

  return sendEmail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });
}