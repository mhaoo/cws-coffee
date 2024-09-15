import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Order } from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: true, // Adds createdAt and updatedAt
})
export class OrderItem extends Model<OrderItem> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  productName!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  unitPrice!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  // Optional JSONB fields for product options
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  options!: Array<{
    optionName: string;
    valueName: string;
    priceModifier: number;
  }>;

  // Optional JSONB fields for product variants
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  variants!: Array<{
    variantName: string;
    valueName: string;
    priceModifier: number;
  }>;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalPrice!: number; // Total price for this item (quantity * (unitPrice + modifiers))
}
