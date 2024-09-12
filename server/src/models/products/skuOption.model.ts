import {
  Model,
  Column,
  Table,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import { Option } from "./option.model";
import { Sku } from "./sku.model";

@Table({
  tableName: "skus_options",
  timestamps: false,
})
export class SkuOption extends Model<SkuOption> {
  @ForeignKey(() => Sku)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  skuId!: number;

  @ForeignKey(() => Option)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  optionId!: number;
}
