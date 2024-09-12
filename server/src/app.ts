import express, { Express } from "express";
import router from "./routers";
import helmet from "helmet";
import cors from "cors";
import { GlobalErrorHandler } from "./core";
import { initSequelize } from "./core/init.postgres";

const app: Express = express();

initSequelize()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);
app.use(GlobalErrorHandler.handleError);

export default app;
