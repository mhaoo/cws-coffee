import { Model, Column, Table, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./product.model";

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
}
