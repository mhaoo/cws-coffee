// database.ts
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import config from '../configs';

const { database, dialect, username, password, host, port } = config.db;

console.log(database, dialect, username, password, host, port)

const connection = new Sequelize({
  database,
  dialect,
  username,
  password,
  host,
  port,
  models: [User], // Add your models here
  logging: false, // Disable SQL logging, optional
});

class Database {
  private static instance: Database;

  private constructor() {
    this.connect();
  }

  private async connect() {
    try {
      await connection.authenticate();
      console.log('Connection has been established successfully.');

      // Sync models with the database
      await connection.sync({ 
        alter: true,
        force: false
       }); // `force: true` drops and recreates tables
      console.log('Models synchronized with the database.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export default Database;
