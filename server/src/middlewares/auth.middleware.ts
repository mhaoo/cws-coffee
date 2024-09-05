import { NextFunction, Request, Response } from "express";
import { AuthUtils } from "../utils";
import { UnauthorizedError } from "../core";

class AuthMiddleWare {
  static checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Unauthorized");
      }

      const decoded = await AuthUtils.verifyAccessToken(token);

      if (!decoded) {
        throw new UnauthorizedError("Invalid or expired token");
      }

      req.body.user = decoded;

      next();
    } catch (error: any) {}
  };
}

export default AuthMiddleWare;
