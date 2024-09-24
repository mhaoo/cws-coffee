import { Router } from "express";
import authController from "../controllers/auth.controller";
import { AuthMiddleWare } from "@/middlewares";
import { handleAsync } from "@/utils";

const router: Router = Router();

router.post("/register/email", handleAsync(authController.registerWithEmail));
router.post("/login/email", handleAsync(authController.loginWithEmail));
router.post("/logout", handleAsync(authController.logout));

router.use(AuthMiddleWare.checkAuth);
router.post("/refresh-token", handleAsync(authController.refreshToken));

export { router as authRouter };
