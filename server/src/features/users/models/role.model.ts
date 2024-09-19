// models/user.model.ts
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { defaultRoles } from "../../../constants/initData";
import { logger } from "../../../utils";

@Table({
  tableName: "roles",
  timestamps: true,
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @HasMany(() => User)
  users!: User[];

  static async insertDefaultRoles() {
    const roles = await Role.findAll();

    if (roles.length === 0) {
      await Role.bulkCreate(defaultRoles as Role[]);
      logger.info("Default roles inserted.");
    }
  }
}
