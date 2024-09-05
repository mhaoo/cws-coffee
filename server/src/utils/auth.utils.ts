import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "../configs";

const {
  refreshTokenSecret,
  accessTokenSecret,
  refreshTokenExpiry,
  accessTokenExpiry,
} = config.security;

const { saltRounds } = config.security;

class AuthUtils {
  static generateAccessToken = async (payload: any) => {
    return jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenExpiry,
    });
  };

  static generateRefreshToken = async (payload: any) => {
    return jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenExpiry,
    });
  };

  static verifyAccessToken = async (token: string) => {
    return jwt.verify(token, accessTokenSecret);
  };

  static verifyRefreshToken = async (token: string) => {
    return jwt.verify(token, refreshTokenSecret);
  };

  static hashPassword = async (password: string) => {
    return bcrypt.hash(password, saltRounds);
  };
}

export default AuthUtils;
