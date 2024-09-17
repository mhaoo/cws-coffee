import { Op } from "sequelize";
import { appConnection } from "../../../core";
import { ProductDTO, ProductQueryParams } from "../dto/products.dto";
import { Category, Option, OptionValue, Product } from "../models";

export default class ProductService {
  static createProducts = async (products: ProductDTO[]) => {
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
  static createProduct = async (productDTO: ProductDTO) => {
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

    // Search products by name or description
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } }, // case-insensitive search
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Filter by categoryId
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    // Filter by isCustomizable
    if (isCustomizable !== undefined) {
      whereClause.isCustomizable = isCustomizable;
    }

    // Filter by isActive
    if (isActive !== undefined) {
      whereClause.isActive = isActive;
    }

    // Filter by price range
    if (priceMin !== undefined || priceMax !== undefined) {
      whereClause.price = {};
      if (priceMin !== undefined) {
        whereClause.price[Op.gte] = priceMin;
      }
      if (priceMax !== undefined) {
        whereClause.price[Op.lte] = priceMax;
      }
    }

    // Retrieve products with filters, pagination, and sorting
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
}
