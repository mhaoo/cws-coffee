import { Request, Response } from "express";
import { OkSuccess } from "../core";

class HealthController {
  async checkHealth(req: Request, res: Response) {
    new OkSuccess({
      message: "Server is up and running",
    }).send(res);
  }
}

export default new HealthController();
