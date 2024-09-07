// database.ts
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user.model";
import config from "../configs";
import { KeyToken } from "./models/keytoken.model";

const { database, dialect, username, password, host, port } = config.postgres;

const connection = new Sequelize({
  database,
  dialect,
  username,
  password,
  host,
  port,
  models: [User, KeyToken],
  logging: false, // Disable SQL logging, optional
});

class Postgres {
  private static instance: Postgres;

  private constructor() {
    this.connect();
  }

  private async connect() {
    try {
      await connection.authenticate();
      console.log("Connection has been established successfully.");

      // Sync models with the database
      await connection.sync({
        alter: true,
        force: false,
      }); // `force: true` drops and recreates tables
      console.log("Models synchronized with the database.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public static getInstance(): Postgres {
    if (!Postgres.instance) {
      Postgres.instance = new Postgres();
    }

    return Postgres.instance;
  }
}

export default Postgres;
