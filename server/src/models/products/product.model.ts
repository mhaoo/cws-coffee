import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true,
})
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isAvailable!: boolean;
}
