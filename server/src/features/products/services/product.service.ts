import { Op } from "sequelize";
import { appConnection, BadRequestError, NotFoundError } from "@/core";
import {
  CreateProductDTO,
  partialProductSchema,
  PatchProductDTO,
  ProductQueryParams,
  productSchema,
} from "../dto/products.dto";
import { Category, Option, OptionValue, Product } from "../models";

export default class ProductService {
  static createProducts = async (products: CreateProductDTO[]) => {
    const transaction = await appConnection.transaction();
    try {
      const createdProducts = await Promise.all(
        products.map((product) => ProductService.createProduct(product))
      );

      await transaction.commit();

      return createdProducts;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static createProduct = async (productDTO: CreateProductDTO) => {
    const {
      name,
      description,
      categoryId,
      price,
      isCustomizable,
      isActive,
      options,
    } = productDTO;
    const transaction = await appConnection.transaction();
    try {
      const product = await Product.create(
        {
          name,
          description,
          price,
          categoryId,
          isCustomizable,
          isActive,
        } as Product,
        { transaction }
      );

      if (options && options.length !== 0) {
        for (const option of options) {
          const productOption = await Option.create(
            {
              productId: product.id,
              name: option.name,
              isRequired: option.isRequired,
            } as Option,
            { transaction }
          );

          if (option.values && option.values.length !== 0) {
            const optionValues = option.values.map((value) => ({
              optionId: productOption.id,
              value: value.value,
              priceAdjustment: value.priceAdjustment,
            }));

            await OptionValue.bulkCreate(optionValues as OptionValue[], {
              transaction,
            });
          }
        }
      }

      await transaction.commit();

      return product;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static getAllProducts = async (query: ProductQueryParams) => {
    const {
      search,
      categoryId,
      isCustomizable,
      isActive,
      priceMin,
      priceMax,
      limit = 10,
      offset = 0,
      sortBy = "name",
      sortDirection = "ASC",
    } = query;

    const whereClause: any = {};

    if (search) {
      // return ProductService.searchProducts(search);
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (isCustomizable !== undefined) {
      whereClause.isCustomizable = isCustomizable;
    }

    if (isActive !== undefined) {
      whereClause.isActive = isActive;
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      whereClause.price = {};
      if (priceMin !== undefined) {
        whereClause.price[Op.gte] = priceMin;
      }
      if (priceMax !== undefined) {
        whereClause.price[Op.lte] = priceMax;
      }
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [[sortBy, sortDirection]],
      include: [
        {
          model: Option,
          include: [OptionValue],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    return products;
  };

  static getProductById = async (productId: number) => {
    return Product.findByPk(productId, {
      include: [
        {
          model: Option,
          as: "options",
          include: [
            {
              model: OptionValue,
              as: "values",
            },
          ],
        },
        {
          model: Category,
          as: "category",
        },
      ],
    });
  };

  static searchProducts = async (keyword: string) => {
    return Product.findAll({
      include: [
        {
          model: Option,
          as: "options",
          include: [
            {
              model: OptionValue,
              as: "values",
              attributes: ["value"],
              required: false,
            },
          ],
          required: false,
        },
      ],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
          {
            "$options.values.value$": {
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      },
      group: ["Product.id", "options.id", "options.values.id"],
    });
  };

  static deleteProduct = async (productId: number) => {
    const transaction = await appConnection.transaction();
    try {
      const product = await ProductService.getProductById(productId);

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      for (const option of product.options) {
        await OptionValue.destroy({
          where: {
            optionId: option.id,
          },
          transaction,
        });

        await option.destroy({ transaction });
      }

      await product.destroy({ transaction });

      await transaction.commit();

      return product.id;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static updateProduct = async (productId: number, product: any) => {
    const validation = productSchema.safeParse(product);

    if (!validation.success) {
      const validationErrors = product.error.errors[0].message;
      throw new BadRequestError(validationErrors);
    }

    const validatedData = validation.data;

    const transaction = await appConnection.transaction();
    try {
      await ProductService.deleteProduct(productId);

      const updatedProduct = await ProductService.createProduct(validatedData);

      await transaction.commit();

      return updatedProduct;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}
