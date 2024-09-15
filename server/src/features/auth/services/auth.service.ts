import config from "../../../configs";
import ms from "ms";
import * as bcrypt from "bcrypt";
import { KeyToken } from "../models";
import { User } from "../../users/models";
import { AuthUtils, getObjectFields } from "../../../utils";
import { BadRequestError, ConflictError, NotFoundError } from "../../../core";

const { saltRounds } = config.security;

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

      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create(
        {
          name,
          email,
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
        email: newUser.email,
      });
      const accessToken = await AuthUtils.generateAccessToken({
        id: newUser.id,
        email: newUser.email,
      });

      await KeyToken.create(
        {
          userId: newUser.id,
          refreshToken,
          expiresAt: new Date(
            Date.now() + ms(config.security.refreshTokenExpiry)
          ),
        } as KeyToken,
        { transaction }
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
        email: user.email,
      });

      const accessToken = await AuthUtils.generateAccessToken({
        id: user.id,
        email: user.email,
      });

      await KeyToken.upsert(
        {
          userId: user.id,
          refreshToken,
          expiresAt: new Date(
            Date.now() + ms(config.security.refreshTokenExpiry)
          ),
        } as KeyToken,
        { transaction }
      );

      await transaction?.commit();

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw error;
    }
  };

  static logout = async (refreshToken: string) => {
    const storedToken = await KeyToken.findOne({
      where: {
        refreshToken,
      },
    });

    if (!storedToken) {
      throw new BadRequestError("Invalid refresh token");
    }

    await storedToken.destroy();
  };

  static refreshAccessToken = async (refreshToken: string) => {
    const storedToken = await KeyToken.findOne({
      where: {
        refreshToken,
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
