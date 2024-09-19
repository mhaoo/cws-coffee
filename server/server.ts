import app from "./src/app";
import { logger } from "./src/utils";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}!`);
});
