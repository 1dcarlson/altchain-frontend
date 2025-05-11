import type { Express } from "express";
import { createServer, type Server } from "http";
import storage from "./storage";
import { sendEmail, sendWaitlistConfirmation, type SupportedLanguage } from "./email";
import { z } from "zod";
import { insertWaitlistSchema } from "@shared/schema";
import path from "path";
import fs from "fs";

// ✅ Missing imports for your routes:
import waitlistRoutes from "./routes/waitlist";
import contactRoutes from "./routes/contact";

export async function registerRoutes(app: Express): Promise<Server> {
  // ✅ Register API routes for waitlist and contact
  app.use("/api/waitlist", waitlistRoutes);
  app.use("/api/contact", contactRoutes);

  // Favicon for Safari
  app.get("/favicon.ico", (req, res) => {
    res.set("Content-Type", "image/x-icon");
    res.sendFile(path.resolve("./public/favicon.ico"));
  });

  // Apple touch icon variations
  const appleTouchIconVariations = [
    "/apple-touch-icon.png",
    "/apple-touch-icon-120x120.png",
    "/apple-touch-icon-152x152.png",
    "/apple-touch-icon-180x180.png",
  ];

  for (const variation of appleTouchIconVariations) {
    app.get(variation, (req, res) => {
      res.sendFile(path.resolve(`./public${variation}`));
    });
  }

  // Serve robots.txt
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow:");
  });

  // Serve sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    res.sendFile(path.resolve("./public/sitemap.xml"));
  });

  // Static file fallback
  app.use((req, res) => {
    res.status(404).send("Not found");
  });

  // Return server instance
  const server = createServer(app);
  return server;
}