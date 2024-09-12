// models/user.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

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
}
