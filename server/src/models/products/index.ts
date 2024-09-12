import { Category } from "./category.model";
import { Option } from "./option.model";
import { Product } from "./product.model";
import { ProductCategory } from "./productCategory.model";
import { Sku } from "./sku.model";
import { SkuOption } from "./skuOption.model";

export const initProductModels = () => {
  Product.hasMany(Sku, { foreignKey: "productId" });
  Sku.belongsTo(Product, { foreignKey: "productId" });

  // Products and Categories (Many-to-Many)
  Product.belongsToMany(Category, {
    through: ProductCategory,
    foreignKey: "productId",
  });
  Category.belongsToMany(Product, {
    through: ProductCategory,
    foreignKey: "categoryId",
  });

  // Variants (Sku) and Customizations (Many-to-Many)
  Sku.belongsToMany(Option, {
    through: SkuOption,
    foreignKey: "skuId",
  });
  Option.belongsToMany(Sku, {
    through: SkuOption,
    foreignKey: "optionId",
  });

  console.log("Product models initialized successfully.");
};

export { Category, Option, Product, ProductCategory, Sku, SkuOption };

export const productModels = {
  Category,
  Option,
  Product,
  ProductCategory,
  Sku,
  SkuOption,
};
