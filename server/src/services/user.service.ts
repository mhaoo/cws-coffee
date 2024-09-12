import { User } from "../models/users/user.model";
import { BadRequestError } from "../core";

export default class UserService {
  static getUser = async (id: string) => {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return user;
  };
}
