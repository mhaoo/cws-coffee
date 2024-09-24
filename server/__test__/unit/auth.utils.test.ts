import AuthUtils from "@/utils/auth.utils";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("AuthUtils", () => {
  const payload = { id: 1, name: "Test User" };
  const token = "testToken";
  const password = "testPassword";
  const hash = "testHash";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("compare", () => {
    it("should return true if passwords match", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await AuthUtils.compare(password, hash);
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });

    it("should return false if passwords do not match", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result = await AuthUtils.compare(password, hash);
      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
  });

  describe("generateAccessToken", () => {
    it("should generate an access token", async () => {
      (jwt.sign as jest.Mock).mockReturnValue(token);
      const result = await AuthUtils.generateAccessToken(payload);
      expect(result).toBe(token);
      expect(jwt.sign).toHaveBeenCalledWith(payload, expect.any(String), {
        expiresIn: expect.any(String),
      });
    });
  });

  describe("generateRefreshToken", () => {
    it("should generate a refresh token", async () => {
      (jwt.sign as jest.Mock).mockReturnValue(token);
      const result = await AuthUtils.generateRefreshToken(payload);
      expect(result).toBe(token);
      expect(jwt.sign).toHaveBeenCalledWith(payload, expect.any(String), {
        expiresIn: expect.any(String),
      });
    });
  });

  describe("verifyAccessToken", () => {
    it("should verify an access token", async () => {
      (jwt.verify as jest.Mock).mockReturnValue(payload);
      const result = await AuthUtils.verifyAccessToken(token);
      expect(result).toBe(payload);
      expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
    });
  });

  describe("verifyRefreshToken", () => {
    it("should verify a refresh token", async () => {
      (jwt.verify as jest.Mock).mockReturnValue(payload);
      const result = await AuthUtils.verifyRefreshToken(token);
      expect(result).toBe(payload);
      expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
    });
  });

  describe("hash", () => {
    it("should hash a password", async () => {
      (bcrypt.genSalt as jest.Mock).mockResolvedValue("salt");
      (bcrypt.hash as jest.Mock).mockResolvedValue(hash);
      const result = await AuthUtils.hash(password);
      expect(result).toBe(hash);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(expect.any(Number));
      expect(bcrypt.hash).toHaveBeenCalledWith(password, "salt");
    });
  });
});
