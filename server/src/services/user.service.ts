import { User } from "../db/models/user.model";
import { BadRequestError } from "../core";

export default class UserService {
  static getUserInformation = async (id: string) => {
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
