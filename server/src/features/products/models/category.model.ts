import { Model, Column, Table, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./product.model";
import { defaultCategories } from "../../../constants/initData";
import { logger } from "../../../utils";

@Table({
  tableName: "categories",
  timestamps: true,
})
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @HasMany(() => Product)
  products!: Product[];

  static async insertDefaultCategories() {
    const categories = await Category.findAll();

    if (categories.length === 0) {
      await Category.bulkCreate(defaultCategories as Category[]);
      logger.info("Default categories inserted.");
    }
  }
}
