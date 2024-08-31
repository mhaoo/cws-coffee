import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User } from "../db/models/user.model";

export default class UserService {
  static register = async (email: string, password: string, name: string) => {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    } as User); // Type assertion to ensure it matches the model

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  };
}
