import { Sequelize } from "sequelize-typescript";
import config from "@/configs";
import { productModels } from "@/features/products/models/index";
import { userModels } from "@/features/users/models";
import { authModels } from "@/features/auth/models";
import { orderModels } from "@/features/orders/models";
import { logger } from "@/utils";
import { InternalServerError } from "@/core";

const { database, dialect, username, password, host, port } = config.postgres;

const appConnection = new Sequelize({
  database,
  dialect,
  username,
  password,
  host,
  port,
  models: [],
  logging: false, // Disable SQL logging, optional
});

export async function initSequelize() {
  try {
    await appConnection.authenticate();
    logger.info("Connection established successfully.");

    appConnection.addModels([
      ...Object.values(userModels),
      ...Object.values(authModels),
      ...Object.values(productModels),
      ...Object.values(orderModels),
    ]);

    await appConnection.sync({ alter: true, force: false });

    await userModels.Role.insertDefaultRoles();
    await productModels.Category.insertDefaultCategories();
    await productModels.Product.insertDefaultProducts();
    await orderModels.OrderStatus.insertDefaultOrderStatuses();
  } catch (error) {
    throw new InternalServerError("Failed to connect to database");
  }

  return appConnection;
}

// Export the Sequelize instance and the initializer function
export default appConnection;
