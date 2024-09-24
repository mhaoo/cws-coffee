import { Request, Response } from "express";
import {
  BadRequestError,
  CreatedSuccess,
  ForbiddenError,
  OkSuccess,
} from "@/core";
import OrderService from "../services/order.service";

class OrderController {
  getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Order ID is required");
    }

    const order = await OrderService.getOrderById(Number(id));

    new OkSuccess({
      message: "Order details",
      data: order,
    }).send(res);
  };

  placeOrder = async (req: Request, res: Response) => {
    const orderDTO = req.body;

    const userId = req.userId;

    if (!userId) {
      throw new ForbiddenError("Authentication Error");
    }

    if (!orderDTO) {
      throw new BadRequestError("Order data is required");
    }

    const order = await OrderService.placeOrder(orderDTO, userId);

    new CreatedSuccess({
      message: "Order placed successfully",
      data: order,
    }).send(res);
  };
}

export default new OrderController();
