import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    port: process.env.DEV_PORT || "3000",
    env: process.env.NODE_ENV || "development",
  },
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
  postgres: {
    database: process.env.DEV_POSTGRES_DATABASE || "",
    dialect: (process.env.DEV_POSTGRES_DIALECT as any) || "postgres",
    username: process.env.DEV_POSTGRES_USERNAME || "",
    password: process.env.DEV_POSTGRES_PASSWORD || "",
    host: process.env.DEV_POSTGRES_HOST || "localhost",
    port: Number.isNaN(parseInt(process.env.DEV_POSTGRES_PORT || "5432", 10))
      ? 5432
      : parseInt(process.env.DEV_POSTGRES_PORT || "5432", 10),
  },
  redis: {
    host: process.env.DEV_REDIS_HOST || "localhost",
    port: parseInt(process.env.DEV_REDIS_PORT || "6379", 10),
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || "",
  },
  security: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "30d",
    saltRounds: Number.isNaN(parseInt(process.env.SALT_ROUNDS || "10", 10))
      ? 10
      : parseInt(process.env.SALT_ROUNDS || "10", 10),
  },
};

export default config;
