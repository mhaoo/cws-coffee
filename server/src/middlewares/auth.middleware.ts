import { NextFunction, Request, Response } from "express";
import { AuthUtils } from "../utils";
import { UnauthorizedError } from "../core";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

class AuthMiddleWare {
  static checkAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new UnauthorizedError("Unauthorized");
      }

      const decoded: any = await AuthUtils.verifyAccessToken(token);

      if (!decoded) {
        throw new UnauthorizedError("Invalid or expired token");
      }

      req.userId = decoded.id;

      next();
    } catch (error: any) {
      next(new UnauthorizedError(error.message));
    }
  };
}

export default AuthMiddleWare;
