import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { ProductDTO } from "../dto/products.dto";
import { CreatedSuccess, OkSuccess } from "../../../core";

class ProductController {
  createProducts = async (req: Request, res: Response) => {
    const products: ProductDTO[] = req.body;

    const createdProducts = await ProductService.createProducts(products);

    new CreatedSuccess({
      message: "Products created successfully",
      data: createdProducts,
    }).send(res);
  };

  createProduct = async (req: Request, res: Response) => {
    const productDTO: ProductDTO = req.body;

    const newProduct = await ProductService.createProduct(productDTO);

    new CreatedSuccess({
      message: "Product created successfully",
      data: newProduct,
    }).send(res);
  };

  getProductById = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);

    const product = await ProductService.getProductById(productId);

    new OkSuccess({
      data: product,
    }).send(res);
  };

  getAllProducts = async (req: Request, res: Response) => {
    const {
      search,
      categoryId,
      isCustomizable,
      isActive,
      priceMin,
      priceMax,
      limit,
      offset,
      sortBy,
      sortDirection,
    } = req.query;

    const products = await ProductService.getAllProducts({
      search: search ? (search as string) : undefined,
      categoryId: categoryId ? parseInt(categoryId as string) : undefined,
      isCustomizable: isCustomizable ? isCustomizable === "true" : undefined,
      isActive: isActive ? isActive === "true" : undefined,
      priceMin: priceMin ? parseFloat(priceMin as string) : undefined,
      priceMax: priceMax ? parseFloat(priceMax as string) : undefined,
      limit: limit ? parseInt(limit as string) : 10,
      offset: offset ? parseInt(offset as string) : 0,
      sortBy: (sortBy as string) || "name",
      sortDirection: (sortDirection as "ASC" | "DESC") || "ASC",
    });

    new OkSuccess({
      data: products,
    }).send(res);
  };
}

export default new ProductController();
