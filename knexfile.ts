import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();

const config: Knex.Config = {
  client: "pg",
  connection:
    "postgresql://postgres.butcagyhctuhddxzrgqy:@FeedQUEM2023@aws-0-sa-east-1.pooler.supabase.com:6543/postgres",
  migrations: {
    directory: "src/api/database",
  },
  useNullAsDefault: true,
};

export default config;
