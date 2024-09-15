// models/user.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { Employee } from "./employee.model";

@Table({
  tableName: "roles",
  timestamps: true,
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @HasMany(() => Employee)
  employees!: Employee[];
}
