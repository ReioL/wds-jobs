import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";

console.log("###db", process.env.DATABASE_URL);
export const db = drizzle(process.env.DB_URL!, { schema });
