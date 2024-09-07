import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    port: process.env.DEV_PORT || "3000",
  },
  postgres: {
    database: process.env.DEV_POSTGRES_DATABASE || "",
    dialect: (process.env.DEV_POSTGRES_DIALECT as any) || "postgres", // Specify the dialect type
    username: process.env.DEV_POSTGRES_USERNAME || "",
    password: process.env.DEV_POSTGRES_PASSWORD || "",
    host: process.env.DEV_POSTGRES_HOST || "localhost",
    port: parseInt(process.env.DEV_POSTGRES_DB_PORT || "5432", 10), // Ensure port is a number
  },
  redis: {
    host: process.env.DEV_REDIS_HOST || "localhost",
    port: parseInt(process.env.DEV_REDIS_PORT || "6379", 10),
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
