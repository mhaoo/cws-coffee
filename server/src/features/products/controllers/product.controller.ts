import { partialProductSchema, productSchema } from "../dto/products.dto";
import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { productListSchema } from "../dto/products.dto";
import { BadRequestError, CreatedSuccess, OkSuccess } from "@/core";

class ProductController {
  createProducts = async (req: Request, res: Response) => {
    const products = productListSchema.safeParse(req.body);

    if (!products.success) {
      const validationErrors = products.error.errors[0].message;
      throw new BadRequestError(validationErrors);
    }

    const createdProducts = await ProductService.createProducts(products.data);

    new CreatedSuccess({
      message: "Products created successfully",
      data: createdProducts,
    }).send(res);
  };

  createProduct = async (req: Request, res: Response) => {
    const product = productSchema.safeParse(req.body);

    if (!product.success) {
      const validationErrors = product.error.errors[0].message;
      throw new BadRequestError(validationErrors);
    }

    const newProduct = await ProductService.createProduct(product.data);

    new CreatedSuccess({
      message: "Product created successfully",
      data: newProduct,
    }).send(res);
  };

  getProductById = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);

    if (!productId) {
      throw new BadRequestError("Product ID is not valid");
    }

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

  updateProduct = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const product = req.body;

    const updatedProduct = await ProductService.updateProduct(
      productId,
      product
    );

    new OkSuccess({
      message: "Product updated successfully",
      data: updatedProduct,
    }).send(res);
  };

  deleteProduct = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);

    const result = await ProductService.deleteProduct(productId);

    new OkSuccess({
      message: "Product deleted successfully",
      data: result,
    }).send(res);
  };
}

export default new ProductController();
