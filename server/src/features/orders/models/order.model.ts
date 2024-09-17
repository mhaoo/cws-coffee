import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "../../products/models/product.model";
import { Customer } from "../../users/models";
import { OrderItem } from "./orderItem.model";

@Table({
  tableName: "orders",
  timestamps: true,
})
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.ENUM("pending", "completed", "delivered", "cancelled"),
    defaultValue: "pending",
  })
  status!: "pending" | "completed" | "delivered" | "cancelled";

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalPrice!: number;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId!: number;

  @BelongsTo(() => Customer)
  customer!: Customer;

  @HasMany(() => OrderItem)
  orderItems!: OrderItem[];
}
