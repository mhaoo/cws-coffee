import { Router } from "express";
import { authRouter } from "../auth";
import { healthRouter } from "../health";
import { usersRouter } from "../users";
import { productsRouter } from "../product";

const router: Router = Router();

router.use("/v1/auth", authRouter);
router.use("/v1/health", healthRouter);
router.use("/v1/users", usersRouter);
router.use("/v1/products", productsRouter);

export default router;
