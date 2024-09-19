import { Model, Column, DataType, Table } from "sequelize-typescript";
import { defaultOrderStatuses } from "../../../constants/initData";
import { logger } from "../../../utils";

@Table({
  tableName: "order_statuses",
  timestamps: true,
})
export class OrderStatus extends Model<OrderStatus> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  static async insertDefaultOrderStatuses() {
    const orderStatuses = await OrderStatus.findAll();

    if (orderStatuses.length === 0) {
      await OrderStatus.bulkCreate(defaultOrderStatuses as OrderStatus[]);
      logger.info("Default order statuses inserted.");
    }
  }
}
