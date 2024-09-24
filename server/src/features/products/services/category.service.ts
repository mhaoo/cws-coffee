import { BadRequestError } from "@/core";
import { CategoryDTO } from "../dto/products.dto";
import { Category } from "../models";

export default class CategoryService {
  static createCategory = async (categoryDTO: CategoryDTO) => {
    try {
      if (!categoryDTO.name) {
        throw new BadRequestError("Category name is required");
      }

      // Create category in database
      const newCategory = await Category.create(categoryDTO as Category);

      return newCategory;
    } catch (error) {
      throw error;
    }
  };

  static getCategoryById = async (categoryId: number) => {
    try {
      const category = await Category.findByPk(categoryId);

      return category;
    } catch (error) {
      throw error;
    }
  };

  static getAllCategories = async () => {
    try {
      const categories = await Category.findAll();

      return categories;
    } catch (error) {
      throw error;
    }
  };
}
