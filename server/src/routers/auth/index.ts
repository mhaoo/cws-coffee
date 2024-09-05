import { Router } from "express";
import { handleAsync } from "../../utils";
import authController from "../../controllers/auth.controller";

const router: Router = Router();

router.post("/register/email", handleAsync(authController.registerWithEmail));
router.post("/refresh-token", handleAsync(authController.refreshToken));

export { router as authRouter };
