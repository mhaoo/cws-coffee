import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import {
  ConflictError,
  CreatedSuccess,
  OkSuccess,
  UnauthorizedError,
} from "../../../core";

class AuthController {
  registerWithEmail = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ConflictError("All fields are required");
    }

    const user = await AuthService.registerWithEmail(email, password, name);

    new CreatedSuccess({
      message: "User registered successfully",
      data: user,
    }).send(res);
  };

  loginWithEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
      throw new ConflictError("All fields are required");
    }

    const tokens = await AuthService.loginWithEmail(email, password);

    new OkSuccess({
      message: "User logged in successfully",
      data: tokens,
    }).send(res);
  };

  logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token is required");
    }

    await AuthService.logout(refreshToken);

    new OkSuccess({
      message: "User logged out successfully",
    }).send(res);
  };

  refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token is required");
    }

    const tokens = await AuthService.refreshAccessToken(refreshToken);

    new OkSuccess({
      message: "Token refreshed successfully",
      data: tokens,
    }).send(res);
  };
}

export default new AuthController();
