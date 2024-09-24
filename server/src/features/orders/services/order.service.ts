import { appConnection, BadRequestError, NotFoundError } from "@/core";
import { Option, OptionValue, Product } from "@/features/products/models";
import { User } from "@/features/users/models";
import { CreateOrderDTO, OrderStatusEnum } from "../dto/order.dto";
import { Order, OrderItem } from "../models";
import { OrderStatus } from "../models";

export default class OrderService {
  static async placeOrder(creatOrderDTO: CreateOrderDTO, userId: number) {
    const transaction = await appConnection.transaction();

    try {
      const { items, discount = 0, tax = 0, shippingFee = 0 } = creatOrderDTO;

      let totalOrderPrice = 0;
      const orderItemsData = [];

      const user = await User.findByPk(userId);

      if (!user) {
        throw new NotFoundError(`User with ID ${userId} not found`);
      }

      for (const item of items) {
        const product = await Product.findByPk(item.productId);

        if (!product) {
          throw new NotFoundError(
            `Product with ID ${item.productId} not found`
          );
        }

        // Ensure product price is a number
        let productPrice = parseFloat(product.price.toString());

        let modifierTotal = 0;

        let flattenedOptions = [];

        if (item.options && item.options.length > 0) {
          for (const option of item.options) {
            const curOption = await Option.findOne({
              where: {
                productId: product.id,
                name: option.optionName,
              },
              include: {
                model: OptionValue,
                where: { value: option.valueName },
              },
            });

            if (!curOption) {
              throw new BadRequestError(
                `Option with name ${option.optionName} not found`
              );
            }

            // Safely access priceAdjustment and ensure it's a number
            const priceAdjustment = curOption.values[0]?.priceAdjustment || 0;

            modifierTotal += priceAdjustment;

            flattenedOptions.push({
              optionName: option.optionName,
              valueName: option.valueName,
              priceModifier: priceAdjustment,
            });
          }
        }

        // Ensure all variables are numbers before calculation
        const totalItemPrice = (productPrice + modifierTotal) * item.quantity;
        totalOrderPrice += totalItemPrice;

        // Prepare the order item data
        orderItemsData.push({
          productId: product.id,
          productName: product.name,
          basePrice: product.price,
          modifierTotal,
          quantity: item.quantity,
          options: flattenedOptions || [],
          totalPrice: totalItemPrice,
        });
      }

      // Step 2: Calculate final total (including discount, tax, shipping)
      const finalTotalPrice = totalOrderPrice + tax - discount + shippingFee;

      // Step 3: Create the order
      const pendingStatus = await OrderStatus.findOne({
        where: { id: OrderStatusEnum.PENDING },
      });

      const order = await Order.create(
        {
          customerId: user.id,
          statusId: pendingStatus?.id || OrderStatusEnum.PENDING,
          total: finalTotalPrice,
          tax,
          discount,
          shippingFee,
        } as Order,
        { transaction }
      );

      // Step 4: Create the order items
      for (const orderItemData of orderItemsData) {
        await OrderItem.create(
          {
            orderId: order.id,
            productId: orderItemData.productId,
            quantity: orderItemData.quantity,
            totalPrice: orderItemData.totalPrice,
            options: orderItemData.options,
          } as OrderItem,
          { transaction }
        );
      }

      // Commit the transaction
      await transaction.commit();

      const orderDetails = await OrderService.getOrderById(order.id);

      return orderDetails;
    } catch (error) {
      // Rollback the transaction if any error occurs
      await transaction.rollback();
      throw error;
    }
  }

  static async getOrderById(orderId: number) {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderStatus,
        },
      ],
    });

    const orderDetails = await OrderItem.findAll({
      where: { orderId },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!order) {
      throw new NotFoundError(`Order with ID ${orderId} not found`);
    }

    const orderFormat = {
      id: order.id,
      statusId: order.status.id,
      statusName: order.status.name,
      total: order.total,
      tax: order.tax,
      discount: order.discount,
      shippingFee: order.shippingFee,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    const orderItems = orderDetails.map((item) => {
      return {
        productId: item.productId,
        productName: item.product.name,
        basePrice: item.product.price,
        totalPrice: item.totalPrice,
        quantity: item.quantity,
        options: item.options,
      };
    });

    return {
      order: orderFormat,
      orderItems,
    };
  }
}
