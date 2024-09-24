// Mock dotenv.config to avoid reloading .env file
jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

describe("config.ts", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("default configuration", () => {
    it("should return default values when no environment variables are set", () => {
      delete process.env.DEV_PORT;
      delete process.env.NODE_ENV;
      delete process.env.LOG_LEVEL;
      delete process.env.DEV_POSTGRES_DATABASE;
      delete process.env.SALT_ROUNDS;
      delete process.env.ACCESS_TOKEN_EXPIRY;
      delete process.env.REFRESH_TOKEN_EXPIRY;

      // Re-require config to apply environment changes
      const config = require("@/configs").default;

      expect(config.app.port).toBe("3000");
      expect(config.app.env).toBe("development");
      expect(config.logger.level).toBe("info");
      expect(config.postgres.database).toBe("");
      expect(config.postgres.host).toBe("localhost");
      expect(config.postgres.port).toBe(5432);
      expect(config.security.saltRounds).toBe(10);
      expect(config.security.accessTokenExpiry).toBe("15m");
      expect(config.security.refreshTokenExpiry).toBe("30d");
    });
  });

  describe("custom environment variables", () => {
    it("should return values from environment variables", () => {
      process.env.DEV_PORT = "4000";
      process.env.NODE_ENV = "production";
      process.env.LOG_LEVEL = "debug";
      process.env.DEV_POSTGRES_DATABASE = "custom_db";
      process.env.DEV_POSTGRES_HOST = "db_host";
      process.env.DEV_POSTGRES_PORT = "6543";
      process.env.ACCESS_TOKEN_EXPIRY = "30m";
      process.env.REFRESH_TOKEN_EXPIRY = "60d";
      process.env.SALT_ROUNDS = "12";

      // Re-require config to apply environment changes
      const config = require("@/configs").default;

      expect(config.app.port).toBe("4000");
      expect(config.app.env).toBe("production");
      expect(config.logger.level).toBe("debug");
      expect(config.postgres.database).toBe("custom_db");
      expect(config.postgres.host).toBe("db_host");
      expect(config.postgres.port).toBe(6543);
      expect(config.security.saltRounds).toBe(12);
      expect(config.security.accessTokenExpiry).toBe("30m");
      expect(config.security.refreshTokenExpiry).toBe("60d");
    });
  });

  describe("malformed environment variables", () => {
    it("should handle non-numeric POSTGRES_PORT gracefully", () => {
      process.env.DEV_POSTGRES_PORT = "invalid-number";

      // Re-require config to apply environment changes
      const config = require("@/configs").default;

      // Since the port is malformed, it should fallback to the default (5432)
      expect(config.postgres.port).toBe(5432);
    });

    it("should handle malformed SALT_ROUNDS gracefully", () => {
      process.env.SALT_ROUNDS = "not-a-number";

      // Re-require config to apply environment changes
      const config = require("@/configs").default;

      // Since saltRounds is malformed, it should fallback to the default (10)
      expect(config.security.saltRounds).toBe(10);
    });
  });

  describe("empty or invalid environment variables", () => {
    it("should handle empty strings gracefully", () => {
      process.env.DEV_POSTGRES_DATABASE = "";

      // Re-require config to apply environment changes
      const config = require("@/configs").default;

      expect(config.postgres.database).toBe("");
    });

    it("should handle empty tokens gracefully", () => {
      process.env.ACCESS_TOKEN_SECRET = "";
      process.env.REFRESH_TOKEN_SECRET = "";

      // Re-require config to apply environment changes
      const config = require("@/configs").default;

      expect(config.security.accessTokenSecret).toBe("");
      expect(config.security.refreshTokenSecret).toBe("");
    });
  });

  describe("unset environment variables", () => {
    it("should fallback to defaults when variables are unset", () => {
      delete process.env.DEV_PORT;
      delete process.env.ACCESS_TOKEN_EXPIRY;

      // Re-require config to apply environment changes
      const config = require("@/configs").default;

      // Check defaults
      expect(config.app.port).toBe("3000");
      expect(config.security.accessTokenExpiry).toBe("15m");
    });
  });
});
