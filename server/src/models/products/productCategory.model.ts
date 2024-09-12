import {
  Model,
  Column,
  Table,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import { Product } from "./product.model";
import { Category } from "./category.model";

@Table({
  tableName: "products_categories",
  timestamps: false,
})
export class ProductCategory extends Model<ProductCategory> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  productId!: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  categoryId!: number;
}
