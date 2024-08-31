// controllers/user.controller.ts
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
// import { CreateUserDto } from '../types';
import { User } from "../db/models/user.model";
import UserService from "../services/user.service";

export default class UserController {
  static register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
      const user = await UserService.register(email, password, name);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
