import { Sequelize } from "sequelize-typescript";
import config from "../configs";
import { productModels } from "./../features/products/models/index";
import { userModels } from "../features/users/models";
import { authModels } from "../features/auth/models";
import { orderModels } from "../features/orders/models";

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

    appConnection.addModels([
      ...Object.values(userModels),
      ...Object.values(authModels),
      ...Object.values(productModels),
      ...Object.values(orderModels),
    ]);

    await appConnection.sync({ alter: true, force: false });
  } catch (error) {
    throw error;
  }

  return appConnection;
}

// Export the Sequelize instance and the initializer function
export default appConnection;
