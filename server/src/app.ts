import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { GlobalErrorHandler } from "./core";
import { initSequelize } from "./init/init.postgres";
import { appRouter } from "./init/router.init";

const app: Express = express();

initSequelize();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(appRouter);
app.use(GlobalErrorHandler.handleError);

export default app;
