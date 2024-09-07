import { Router, Request, Response } from "express";
import { authRouter } from "../auth";
import { healthRouter } from "../health";
import { usersRouter } from "../users";

const router: Router = Router();

router.use("/v1/auth", authRouter);
router.use("/v1/health", healthRouter);
router.use("/v1/users", usersRouter);

export default router;
