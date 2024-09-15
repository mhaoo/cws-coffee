// models/user.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Role } from "./role.model";

@Table({
  tableName: "employees",
  timestamps: true,
})
export class Employee extends Model<Employee> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: string;

  @BelongsTo(() => Role)
  role!: Role;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  salary!: number;
}
