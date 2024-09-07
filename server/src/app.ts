import express, { Express } from "express";
import router from "./routers";
import Postgres from "./db/init.postgres";
import helmet from "helmet";
import { GlobalErrorHandler } from "./core";

Postgres.getInstance();

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(router);
app.use(GlobalErrorHandler.handleError);

export default app;
