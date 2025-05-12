import express from "express";
import { z } from "zod";
import { db } from "./db";
import { waitlist } from "@shared/schema"; // Assumes you have a waitlist table in schema
import { eq } from "drizzle-orm";
import { sendWaitlistConfirmation, sendEmail } from "./email";

const router = express.Router();

// Waitlist schema validation
const insertWaitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  language: z.string().optional(),
});

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

// === POST /api/waitlist ===
router.post("/api/waitlist", async (req, res) => {
  try {
    const validated = insertWaitlistSchema.parse(req.body);
    const { email, name, language = "en" } = validated;

    // Check if already exists
    const existing = await db.select().from(waitlist).where(eq(waitlist.email, email));
    if (existing.length > 0) {
      return res.status(409).json({ message: "Already on the waitlist." });
    }

    // Insert into database
    await db.insert(waitlist).values({ email, name, language });

    // Send confirmation email
    await sendWaitlistConfirmation(email, language);

    res.status(200).json({ message: "Joined waitlist successfully." });
  } catch (err: any) {
    console.error("❌ Error in /api/waitlist:", err.message || err);
    res.status(500).json({ message: "Something went wrong joining the waitlist." });
  }
});

// === POST /api/contact ===
router.post("/api/contact", async (req, res) => {
  try {
    const validated = contactSchema.parse(req.body);
    const { name, email, message } = validated;

    await sendEmail({
      to: "daniel@altchain.app",
      subject: `New Contact Message from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.status(200).json({ message: "Message sent successfully." });
  } catch (err: any) {
    console.error("❌ Error in /api/contact:", err.message || err);
    res.status(500).json({ message: "Something went wrong sending the message." });
  }
});

export function registerRoutes(app: express.Express) {
  app.use(express.json());
  app.use(router);
  return app;
}
