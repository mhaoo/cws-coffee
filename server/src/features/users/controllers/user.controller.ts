import { Request, Response } from "express";
import UserService from "../services/user.service";
import { OkSuccess } from "../../../core";

class UserController {
  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserService.getUserById(id);

    new OkSuccess({
      data: user,
    }).send(res);
  };
}

export default new UserController();
