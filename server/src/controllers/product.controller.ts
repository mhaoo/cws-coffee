import { Request, Response } from "express";
import { CreateProductDTO } from "../dto";
import { BadRequestError, CreatedSuccess } from "../core";
import ProductService from "../services/product.service";

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const createProductDTO: CreateProductDTO = req.body;

    if (
      !createProductDTO.name ||
      !createProductDTO.variants ||
      createProductDTO.variants.length === 0
    ) {
      throw new BadRequestError(
        "Product name and at least one variant are required"
      );
    }

    const newProduct = await ProductService.createProduct(createProductDTO);

    new CreatedSuccess({
      message: "Product created successfully",
      data: newProduct,
    }).send(res);
  };
}

export default new ProductController();
