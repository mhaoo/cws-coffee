import { Sequelize } from "sequelize-typescript";
import config from "../configs";
import { initProductModels, productModels, userModels } from "../models"; // Import the models

const { database, dialect, username, password, host, port } = config.postgres;

const appConnection = new Sequelize({
  database,
  dialect,
  username,
  password,
  host,
  port,
  models: [], // Models will be added dynamically
  logging: false, // Disable SQL logging, optional
});

export async function initSequelize() {
  try {
    await appConnection.authenticate();
    console.log("Connection established successfully.");

    appConnection.addModels(Object.values(productModels));
    appConnection.addModels(Object.values(userModels));

    initProductModels();

    await appConnection.sync({ alter: true, force: false });
  } catch (error) {
    throw error;
  }

  return appConnection;
}

// Export the Sequelize instance and the initializer function
export default appConnection;
