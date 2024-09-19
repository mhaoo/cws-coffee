export interface CreateOrderItemDTO {
  productId: number;
  orderId: number;
  quantity: number;
  options?: Array<{
    optionName: string;
    valueName: string;
    priceModifier: number;
  }>;
}

export interface CreateOrderDTO {
  items: CreateOrderItemDTO[];
  discount?: number;
  tax?: number;
  shippingFee?: number;
}

export interface UpdateOrderDTO {
  statusId?: number;
  discount?: number;
  tax?: number;
  shippingFee?: number;
}

export interface OrderItemDTO {
  id: number;
  productId: number;
  productName: string;
  basePrice: number;
  modifierTotal: number;
  quantity: number;
  options: Array<{
    optionName: string;
    valueName: string;
    priceModifier: number;
  }>;
  totalPrice: number;
}

export interface OrderDTO {
  id: number;
  customerId: number;
  totalPrice: number;
  discount: number;
  tax: number;
  shippingFee: number;
  statusId: number;
  status: {
    id: number;
    name: string;
  };
  orderItems: OrderItemDTO[];
}

export interface DeleteOrderDTO {
  orderId: number;
}

export enum OrderStatusEnum {
  PENDING = 1,
  CONFIRMED = 2,
  DELIVERED = 3,
  CANCELLED = 4,
}
