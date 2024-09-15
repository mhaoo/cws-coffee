import { Router } from "express";
import { authRouter } from "../features/users/routers/auth.router";
import { usersRouter } from "../features/users/routers/user.router";
import { productsRouter } from "../features/products/routers/product.router";

const router: Router = Router();

router.use("/v1/auth", authRouter);
router.use("/v1/users", usersRouter);
router.use("/v1/products", productsRouter);

export { router as appRouter };
