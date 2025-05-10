import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

// Required to use WebSockets with Neon
neonConfig.webSocketConstructor = ws;

// TEMP: Hardcode your full Neon DB URL directly here
const connectionString = "postgresql://neondb_owner:npg_JvEXFpV4MU7zep@ep-odd-hat-a4uq3xwv--pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

export const pool = new Pool({ connectionString });
export const db = drizzle({ client: pool, schema });
