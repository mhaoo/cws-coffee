import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({
  tableName: "options",
  timestamps: true,
})
export class Option extends Model<Option> {
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
  type!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;
}
