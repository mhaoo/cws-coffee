import express, { Express, Request, Response } from "express";
import router from "./routers";
import { Sequelize } from "sequelize";
import Database from "./db/init.postgres";
import helmet from "helmet";
import { GlobalErrorHandler } from "./core";

Database.getInstance();

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(router);
app.use(GlobalErrorHandler.handleError);

export default app;
