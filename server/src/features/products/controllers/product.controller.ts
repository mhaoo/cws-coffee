import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { ProductDTO } from "../dto/products.dto";
import { CreatedSuccess } from "../../../core";

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const productDTO: ProductDTO = req.body;

    const newProduct = await ProductService.createProduct(productDTO);

    new CreatedSuccess({
      message: "Product created successfully",
      data: newProduct,
    }).send(res);
  };

  getAllProducts = async (req: Request, res: Response) => {
    const products = await ProductService.getAllProducts();

    new CreatedSuccess({
      data: products,
    }).send(res);
  };
}

export default new ProductController();
