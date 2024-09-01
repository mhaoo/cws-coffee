import { generateKeyPairSync, randomBytes } from "crypto";
import { KeyToken } from "../db/models/keytoken.model";
import { User } from "../db/models/user.model";
import * as jwt from "jsonwebtoken";
import config from "../configs";
import { v4 as uuidv4 } from "uuid";
import ms from "ms";
import * as bcrypt from "bcrypt";
import { BadRequestError, ConflictError, NotFoundError } from "../core";
import { getObjectFields } from "../utils";

const {
  refreshTokenSecret,
  accessTokenSecret,
  refreshTokenExpiry,
  accessTokenExpiry,
} = config.security;

const { saltRounds } = config.security;

export default class AuthService {
  static registerWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      if (!name || !email || !password) {
        throw new ConflictError("All fields are required");
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      } as User);

      if (!newUser) {
        throw new BadRequestError("Failed to create user");
      }

      const refreshToken = await AuthService.generateRefreshToken({
        id: newUser.id,
        email: newUser.email,
      });
      const accessToken = await AuthService.generateAccessToken({
        id: newUser.id,
        email: newUser.email,
      });

      return {
        user: getObjectFields(["id", "name", "email", "phone"], newUser),
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error: any) {
      console.error(error);
      throw new BadRequestError(error.message);
    }
  };

  static login = async (email: string, password: string) => {};

  static generateAccessToken = async (payload: any) => {
    return jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenExpiry,
    });
  };

  static generateRefreshToken = async (payload: any) => {
    const token = jwt.sign(payload, refreshTokenSecret);
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() + ms(refreshTokenExpiry) / (1000 * 60 * 60 * 24) // Convert milliseconds to days
    );

    await KeyToken.create({
      token,
      expiresAt,
      userId: payload.id,
    } as KeyToken);

    return token;
  };

  static refreshAccessToken = async (refreshToken: string) => {
    const storedToken = await KeyToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!storedToken) {
      throw new NotFoundError("Invalid refresh token");
    }

    const user = await User.findByPk(storedToken.userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const accessToken = await AuthService.generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return accessToken;
  };
}
