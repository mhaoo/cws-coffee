import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "@/features/products/models";

@Table({
  tableName: "order_items",
  timestamps: true,
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

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  options!: Array<{
    optionName: string;
    valueName: string;
    priceModifier: number;
  }>;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalPrice!: number; // (basePrice + modifierTotal) * quantity
}
