import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { BadRequestError, InternalServerError } from "@/core";
import config from "@/configs";
import { logger } from "@/utils";

const { dsn } = config.sentry;

async function initSentry() {
  try {
    Sentry.init({
      dsn,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      maxBreadcrumbs: 50,
      debug: true,
      profilesSampleRate: 1.0,
    });

    logger.info("Sentry initialized successfully");
  } catch (error) {
    throw new InternalServerError("Failed to initialize Sentry");
  }
}

export default initSentry;
