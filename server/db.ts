import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

// Required to use WebSockets with Neon
neonConfig.webSocketConstructor = ws;

// TEMP: Hardcode your full Neon DB URL directly here
const connectionString = "postgresql://your_full_neon_database_url_here";

export const pool = new Pool({ connectionString });
export const db = drizzle({ client: pool, schema });
