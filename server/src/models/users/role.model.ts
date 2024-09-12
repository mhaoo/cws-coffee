import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: "roles",
  timestamps: false,
})
export class Role extends Model<Role> {
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
}
