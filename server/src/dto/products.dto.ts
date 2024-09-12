export interface CreateProductDTO {
  name: string;
  description?: string;
  isAvailable?: boolean;
  variants: {
    sku: string;
    size?: string;
    price: number;
    isAvailable?: boolean;
  }[];
}
