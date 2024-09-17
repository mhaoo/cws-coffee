import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Variant } from "./variant.model";
import { Category } from "./category.model";
import { Option } from "./option.model";

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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  categoryId?: number;

  @BelongsTo(() => Category)
  category!: Category;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  })
  price!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isCustomizable!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @HasMany(() => Option)
  options!: Option[];

  // @HasMany(() => Variant)
  // variants!: Variant[];
}
