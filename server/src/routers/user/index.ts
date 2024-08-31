import { Router, Request, Response } from "express";
import UserController from "../../controllers/user.controller";

const router: Router = Router()

router.post("/", UserController.register);

  export {router as userRouter}