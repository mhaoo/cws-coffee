import express, { Express, Request, Response } from "express";
import router from "./routers";
import { Sequelize } from "sequelize";
import connection from "./db/init.postgres";
import Database from "./db/init.postgres";
import helmet from "helmet";

Database.getInstance()

const app: Express = express();

app.use(helmet());
app.use(express.json())
app.use(router)

export default app