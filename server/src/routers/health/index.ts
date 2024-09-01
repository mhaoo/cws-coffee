import { Router } from "express";
import healthController from "../../controllers/health.controller";
import { handleAsync } from "../../utils";

const router: Router = Router();

router.get("/", handleAsync(healthController.checkHealth));

export { router as healthRouter };
