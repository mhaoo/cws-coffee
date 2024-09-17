export interface OrderDTO {
  id?: number;
  status?: OrderStatus;
  totalPrice?: number;
  customerId?: number;
  orders: OrderItemDTO[];
}
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "completed",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface OrderItemDTO {
  id?: number;
  orderId?: number;
  quantity?: number;
  productId?: number;
  productName?: string;
  unitPrice?: number;
  options?: Array<{
    optionName: string;
    valueName: string;
    priceModifier: number;
  }>;
  totalPrice?: number;
}
