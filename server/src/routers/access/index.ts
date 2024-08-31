import { Router, Request, Response } from "express";
import UserController from "../../controllers/user.controller";
import { userRouter } from "../user";

const router: Router = Router()

router.use("/v1/user", userRouter);

  export default router