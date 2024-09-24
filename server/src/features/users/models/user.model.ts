// models/user.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { KeyToken } from "@/features/auth/models/keytoken.model";
import { Role } from "./role.model";
import { Order } from "@/features/orders/models";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => KeyToken)
  keytokens!: KeyToken[];

  @HasMany(() => Order)
  orders!: Order[];
}
