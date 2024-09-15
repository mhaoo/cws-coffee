import { Router } from "express";
import { handleAsync } from "../../../utils";
import userController from "../controllers/user.controller";
import AuthMiddleWare from "../../../middlewares/auth.middleware";

const router: Router = Router();

router.use(AuthMiddleWare.checkAuth);

router.get("/:id", handleAsync(userController.getUserById));

export { router as usersRouter };
