import { appConnection } from "../../../core";
import { ProductDTO } from "../dto/products.dto";
import { Category, Option, OptionValue, Product } from "../models";

export default class ProductService {
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

  static getAllProducts = async () => {
    return Product.findAll({
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
