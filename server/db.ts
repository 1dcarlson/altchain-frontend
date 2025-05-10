import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

// Required to use WebSockets with Neon
neonConfig.webSocketConstructor = ws;
// Skipping DATABASE_URL env check — using hardcoded value below
export const pool = new Pool({ connectionString });
export const db = drizzle({ client: pool, schema });
