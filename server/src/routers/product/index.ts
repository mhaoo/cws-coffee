import { Router } from "express";
import productController from "../../controllers/product.controller";
import { handleAsync } from "../../utils";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Product API is working");
});
router.post("/", handleAsync(productController.createProduct));

export { router as productsRouter };
