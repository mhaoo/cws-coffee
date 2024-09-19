import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/models";
import { OrderItem } from "./orderItem.model";
import { OrderStatus } from "./orderStatus.model";

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId!: number;

  @BelongsTo(() => User)
  customer!: User;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total!: number; // Total price of the order

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  tax!: number; // Tax amount

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  discount!: number; // Discount amount, if any

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  shippingFee!: number; // Shipping fee, if any

  @ForeignKey(() => OrderStatus) // Optional: If moving status to its own table
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId!: number;

  @BelongsTo(() => OrderStatus)
  status!: OrderStatus;

  @HasMany(() => OrderItem)
  orderItems!: OrderItem[];
}
