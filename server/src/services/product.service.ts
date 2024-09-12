import { appConnection } from "../core";
import sequelize from "../core/init.postgres";
import { CreateProductDTO } from "../dto";
import { Product, Sku } from "../models";

export default class ProductService {
  static createProduct = async (createProductDTO: CreateProductDTO) => {
    const { name, description, isAvailable, variants } = createProductDTO;
    const transaction = await appConnection.transaction();
    try {
      const product = await Product.create(
        {
          name,
          description,
          isAvailable: isAvailable || true,
        } as Product,
        { transaction }
      );

      const skus = variants.map((variant) => ({
        sku: variant.sku,
        size: variant.size,
        price: variant.price,
        isAvailable: variant.isAvailable ?? true,
        productId: product.id,
      }));

      await Sku.bulkCreate(skus as Sku[], { transaction });

      await transaction.commit();

      return product;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}
