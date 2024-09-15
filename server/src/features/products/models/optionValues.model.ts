import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Option } from "./option.model";

@Table({
  tableName: "option_values",
  timestamps: true,
})
export class OptionValue extends Model<OptionValue> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Option)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  optionId!: number;

  @BelongsTo(() => Option)
  option!: Option;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0.0,
  })
  priceAdjustment!: number;
}
