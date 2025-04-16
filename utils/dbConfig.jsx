import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://finan-smart_owner:npg_w2vjnDJP4VeE@ep-polished-resonance-a11qxelg-pooler.ap-southeast-1.aws.neon.tech/finan-smart?sslmode=require"
);
export const db = drizzle(sql, { schema });