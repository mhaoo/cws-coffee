import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { CreatedSuccess, OkSuccess } from "../core";

class AuthController {
  registerWithEmail = async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body;

    const user = await AuthService.registerWithEmail(email, password, name);

    new CreatedSuccess({
      message: "User registered successfully",
      data: user,
    }).send(res);
  };

  refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const tokens = await AuthService.refreshAccessToken(refreshToken);

    new OkSuccess({
      message: "Token refreshed successfully",
      data: tokens,
    }).send(res);
  };
}

export default new AuthController();
