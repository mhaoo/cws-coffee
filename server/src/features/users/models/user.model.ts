// models/user.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { Customer } from "./customer.model";
import { Employee } from "./employee.model";
import { KeyToken } from "../../auth/models/keytoken.model";

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasOne(() => Customer)
  customer!: Customer;

  @HasOne(() => Employee)
  employee!: Employee;

  @HasMany(() => KeyToken)
  keytokens!: KeyToken[];
}
