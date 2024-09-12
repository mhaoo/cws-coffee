import { Request, Response } from "express";
import UserService from "../services/user.service";
import { OkSuccess } from "../core";

class UserController {
  getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserService.getUser(id);

    new OkSuccess({
      data: user,
    }).send(res);
  };
}

export default new UserController();
