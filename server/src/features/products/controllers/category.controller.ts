import { Request, Response } from "express";
import { CategoryDTO } from "../dto/products.dto";
import CategoryService from "../services/category.service";
import { CreatedSuccess } from "../../../core";

class CategoryController {
  createCategory = async (req: Request, res: Response) => {
    const category: CategoryDTO = req.body;

    const newCategory = await CategoryService.createCategory(category);

    new CreatedSuccess({
      data: newCategory,
    }).send(res);
  };
}

export default new CategoryController();
