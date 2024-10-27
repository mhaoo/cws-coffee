import express, { Express } from "express";
import "module-alias/register";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import initSentry from "./init/sentry.init";
import { GlobalErrorHandler } from "./core";
import { initSequelize } from "./init/postgres.init";
import { appRouter } from "./init/router.init";
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
