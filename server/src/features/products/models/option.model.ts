import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { OptionValue } from "./optionValues.model";
import { Product } from "./product.model";

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

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRequired!: boolean;

  @HasMany(() => OptionValue)
  values!: OptionValue[];
}
