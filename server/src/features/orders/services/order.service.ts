import { appConnection, BadRequestError } from "../../../core";
import { OrderDTO } from "../dto/order.dto";
import { Order } from "../models";

export default class OrderService {
  static placeOrder = async (orderDTO: OrderDTO, userId: number) => {
    const transaction = await appConnection.transaction();
    try {
      const { id, status, totalPrice, customerId } = orderDTO;
      // Create order in database
      const newOrder = await Order.create(
        {
          status,
          totalPrice,
          customerId: userId,
        } as Order,
        {
          transaction,
        }
      );

      // const orderItems;
      // // Create order items in database
      // await OrderItem.bulkCreate(
      //   orderDTO.items.map((item) => ({
      //     ...item,
      //     orderId: newOrder.id,
      //   })),
      //   {
      //     transaction,
      //   }
      // );

      await transaction.commit();

      return newOrder;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}
