import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { GlobalErrorHandler } from "./core";
import { initSequelize } from "./init/postgres.init";
import { appRouter } from "./init/router.init";
import morgan from "morgan";
import { logger } from "./utils";

const app: Express = express();

initSequelize();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  })
);
app.use(appRouter);
app.use(GlobalErrorHandler.handleError);

export default app;
