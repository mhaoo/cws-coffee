import { appConnection } from "../../../core";
import { ProductDTO } from "../dto/products.dto";
import { Option, OptionValue, Product, Variant } from "../models";

export default class ProductService {
  static createProduct = async (productDTO: ProductDTO) => {
    const {
      name,
      description,
      categoryId,
      isCustomizable,
      isActive,
      variants,
      options,
    } = productDTO;
    const transaction = await appConnection.transaction();
    try {
      const product = await Product.create(
        {
          name,
          description,
          categoryId,
          isCustomizable,
          isActive,
        } as Product,
        { transaction }
      );

      if (variants && variants.length !== 0) {
        const productVariants = variants.map((variant) => ({
          productId: product.id,
          size: variant.size,
          price: variant.price,
          isAvailable: variant.isAvailable,
        }));

        await Variant.bulkCreate(productVariants as Variant[], { transaction });
      }

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
}
