import { Request, Response } from "express";
import { CategoryDTO } from "../dto/products.dto";
import CategoryService from "../services/category.service";
import { CreatedSuccess, OkSuccess } from "../../../core";

class CategoryController {
  createCategory = async (req: Request, res: Response) => {
    const category: CategoryDTO = req.body;

    const newCategory = await CategoryService.createCategory(category);

    new CreatedSuccess({
      data: newCategory,
    }).send(res);
  };

  getAllCategories = async (req: Request, res: Response) => {
    const categories = await CategoryService.getAllCategories();

    new OkSuccess({
      data: categories,
    }).send(res);
  };

  getCategoryById = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);

    const category = await CategoryService.getCategoryById(categoryId);

    new OkSuccess({
      data: category,
    }).send(res);
  };
}

export default new CategoryController();
