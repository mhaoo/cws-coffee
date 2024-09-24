import { Router } from "express";
import orderController from "../controllers/order.controller";
import { AuthMiddleWare } from "@/middlewares";
import { handleAsync } from "@/utils";

const router: Router = Router();

router.get("/:id", handleAsync(orderController.getOrderById));
router.use(AuthMiddleWare.checkAuth);

router.post("/", handleAsync(orderController.placeOrder));

export { router as ordersRouter };
