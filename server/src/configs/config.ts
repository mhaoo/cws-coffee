import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    port: process.env.DEV_PORT || "3000",
  },
  db: {
    database: process.env.DEV_DATABASE || "",
    dialect: (process.env.DEV_DIALECT as any) || "postgres", // Specify the dialect type
    username: process.env.DEV_USERNAME || "",
    password: process.env.DEV_PASSWORD || "",
    host: process.env.DEV_HOST || "localhost",
    port: parseInt(process.env.DEV_DB_PORT || "5432", 10), // Ensure port is a number
  },
  security: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "30d",
    saltRounds: parseInt(process.env.SALT_ROUNDS || "10", 10),
  },
};

export default config;
