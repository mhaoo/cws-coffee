import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "./product.model";

@Table({
  tableName: "skus",
  timestamps: true, // Automatically manage createdAt and updatedAt
})
export class Sku extends Model<Sku> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  sku!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  size?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isAvailable!: boolean;
}
