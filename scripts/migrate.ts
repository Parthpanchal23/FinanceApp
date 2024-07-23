import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
config({ path: ".env" });
const sql = neon(process.env.DATABSE_URL!);
const db = drizzle(sql);
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
  } catch (error) {
    console.error("eeeeee", error);
    process.exit();
  }
};

main();