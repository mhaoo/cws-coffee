// models/user.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "key_tokens",
  timestamps: true,
})
export class KeyToken extends Model<KeyToken> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refreshToken!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  used!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  revoked!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  })
  userId!: number;
}
