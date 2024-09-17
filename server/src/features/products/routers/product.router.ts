import { Router } from "express";
import { categoryController, productController } from "../controllers";
import { handleAsync } from "../../../utils";

const router: Router = Router();

router.get("/", handleAsync(productController.getAllProducts));
router.get("/category", handleAsync(categoryController.getAllCategories));
router.get("/category/:id", handleAsync(categoryController.getCategoryById));
router.post("/bulk", handleAsync(productController.createProducts));
router.post("/", handleAsync(productController.createProduct));
router.post("/category", handleAsync(categoryController.createCategory));

export { router as productsRouter };
