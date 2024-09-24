import * as bcrypt from "bcrypt";
import ms from "ms";
import config from "@/configs";
import redisConnection from "@/init/redis.init";
import { User } from "@/features/users/models";
import { AuthUtils, getObjectFields } from "@/utils";
import { RoleType } from "@/features/users/dto";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  SecurityBreachError,
  UnauthorizedError,
} from "@/core";

const { refreshTokenExpiry } = config.security;

export default class AuthService {
  static registerWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    const transaction = await User.sequelize?.transaction();
    try {
      if (!name || !email || !password) {
        throw new ConflictError("All fields are required");
      }

      const existingUser = await User.findOne({
        where: { email },
        transaction,
      });

      if (existingUser) {
        throw new ConflictError("User already exists");
      }

      const hashedPassword = await AuthUtils.hash(password);

      const newUser = await User.create(
        {
          name,
          email,
          roleId: RoleType.USER,
          password: hashedPassword,
        } as User,
        {
          transaction,
        }
      );

      if (!newUser) {
        throw new BadRequestError("Failed to create user");
      }

      const refreshToken = await AuthUtils.generateRefreshToken({
        id: newUser.id,
      });
      const accessToken = await AuthUtils.generateAccessToken({
        id: newUser.id,
      });

      const hashedToken = await AuthUtils.hash(refreshToken);

      await redisConnection.set(
        `refreshToken:${newUser.id}`,
        hashedToken,
        "EX",
        ms(refreshTokenExpiry) / 1000
      );

      await transaction?.commit();

      return {
        user: getObjectFields(["id", "name", "email"], newUser),
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error: any) {
      await transaction?.rollback();
      throw error;
    }
  };

  static loginWithEmail = async (email: string, password: string) => {
    const transaction = await User.sequelize?.transaction();
    try {
      const user = await User.findOne({
        where: {
          email,
        },
        transaction,
      });

      if (!user) {
        throw new NotFoundError("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestError("Invalid credentials");
      }

      const refreshToken = await AuthUtils.generateRefreshToken({
        id: user.id,
      });

      const accessToken = await AuthUtils.generateAccessToken({
        id: user.id,
      });

      await redisConnection.set(
        `refreshToken:${user.id}`,
        refreshToken,
        "EX",
        ms(refreshTokenExpiry) / 1000
      );

      await transaction?.commit();

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      await transaction?.rollback();
      throw error;
    }
  };

  static logout = async (userId: number) => {
    await redisConnection.del(`refreshToken:${userId}`);
  };

  static refreshAccessToken = async (userId: number, refreshToken: string) => {
    const storedToken = await redisConnection.get(`refreshToken:${userId}`);

    if (!storedToken) {
      throw new UnauthorizedError("No valid session found");
    }

    const isTokenValid = await AuthUtils.compare(refreshToken, storedToken);

    if (!isTokenValid) {
      await redisConnection.del(`refreshToken:${userId}`);
      throw new SecurityBreachError(
        "Refresh token reuse detected. Your session has been revoked."
      );
    }

    const decoded = await AuthUtils.verifyRefreshToken(refreshToken);

    if (!decoded) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const accessToken = await AuthUtils.generateAccessToken({
      id: userId,
    });

    return {
      accessToken,
    };
  };
}
