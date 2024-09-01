import { Router, Request, Response } from "express";
import userController from "../../controllers/user.controller";
import { handleAsync } from "../../utils";
import authController from "../../controllers/auth.controller";

const router: Router = Router();

router.post("/register/email", handleAsync(authController.registerWithEmail));
router.post("/refresh-token", handleAsync(authController.refreshToken));

export { router as authRouter };
