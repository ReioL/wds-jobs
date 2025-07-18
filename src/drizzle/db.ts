import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";

export const db = drizzle(process.env.DB_URL!, { schema });
