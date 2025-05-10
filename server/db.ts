import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

// Required to use WebSockets with Neon
neonConfig.webSocketConstructor = ws;

// ✅ Hardcoded full Neon connection string
const connectionString = "postgresql://neondb_owner:npg_..."; // your full URL here

// ❌ REMOVE this block if it still exists:
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
// }

export const pool = new Pool({ connectionString });
export const db = drizzle({ client: pool, schema });
