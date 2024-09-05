import { KeyToken } from "../db/models/keytoken.model";
import { User } from "../db/models/user.model";
import config from "../configs";
import ms from "ms";
import * as bcrypt from "bcrypt";
import { BadRequestError, ConflictError, NotFoundError } from "../core";
import { AuthUtils, getObjectFields } from "../utils";

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

      const refreshToken = await AuthUtils.generateRefreshToken({
        id: newUser.id,
        email: newUser.email,
      });
      const accessToken = await AuthUtils.generateAccessToken({
        id: newUser.id,
        email: newUser.email,
      });

      await KeyToken.create({
        userId: newUser.id,
        token: refreshToken,
        expiresAt: new Date(
          Date.now() + ms(config.security.refreshTokenExpiry)
        ),
      } as KeyToken);

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

    const accessToken = await AuthUtils.generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return accessToken;
  };
}
