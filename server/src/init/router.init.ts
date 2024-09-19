import { Router } from "express";
import { authRouter } from "../features/users/routers/auth.router";
import { usersRouter } from "../features/users/routers/user.router";
import { productsRouter } from "../features/products/routers/product.router";
import { ordersRouter } from "../features/orders/routers/order.router";
import * as swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../configs";

const router: Router = Router();

router.use("/v1/auth", authRouter);
router.use("/v1/users", usersRouter);
router.use("/v1/products", productsRouter);
router.use("/v1/orders", ordersRouter);
router.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { router as appRouter };
