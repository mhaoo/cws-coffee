import { Router, Request, Response } from "express";
import UserController from "../../controllers/user.controller";
import { authRouter } from "../auth";
import { healthRouter } from "../health";

const router: Router = Router();

router.use("/v1/auth", authRouter);
router.use("/v1/health", healthRouter);

export default router;
