import express from "express";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post("/api/waitlist", async (req, res) => {
  const { name, email, language } = req.body;

  if (!email || !language) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const message = {
    to: email,
    from: "daniel@altchain.app",
    subject: "Welcome to AltChain!",
    html: `<h1>Welcome to AltChain</h1><p>Thank you for joining the waitlist, ${name || "friend"}!</p>`,
  };

  try {
    await sgMail.send(message);
    console.log("✅ Waitlist confirmation sent");
    return res.status(200).json({ message: "Waitlist confirmation sent." });
  } catch (error) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);
    return res.status(500).json({ error: "Failed to send confirmation email." });
  }
});

router.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const contactMessage = {
    to: "daniel@altchain.app",
    from: "daniel@altchain.app",
    subject: "New Contact Form Submission",
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`,
  };

  try {
    await sgMail.send(contactMessage);
    console.log("✅ Contact form message sent");
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);
    return res.status(500).json({ error: "Failed to send message." });
  }
});

export default router;