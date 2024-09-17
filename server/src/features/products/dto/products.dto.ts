export interface ProductDTO {
  // Common fields
  id?: number; // Optional for Create, required for Read/Update/Delete
  name?: string; // Required for Create/Update, optional for Read
  description?: string; // Optional for Create/Update/Read
  categoryId?: number; // Required for Create/Update, optional for Read
  price?: number; // Required for Create/Update, included in Read
  categoryName?: string; // Only for Read operation
  isCustomizable?: boolean; // Required for Create/Update, optional for Read
  isActive?: boolean; // Required for Create/Update, optional for Read
  createdAt?: Date; // Only for Read operation
  updatedAt?: Date; // Only for Read operation

  // Variants
  // variants?: Array<VariantDTO>; // Optional, used for Create/Update/Read

  // Customizations
  options?: Array<OptionDTO>; // Optional, used for Create/Update/Read
}

export interface VariantDTO {
  id?: number; // Optional for Create, required for Update/Delete, included in Read
  size?: string; // Required for Create/Update, included in Read
  price?: number; // Required for Create/Update, included in Read
  isAvailable?: boolean; // Required for Create/Update, included in Read
  createdAt?: Date; // Only for Read operation
  updatedAt?: Date; // Only for Read operation
}

export interface OptionDTO {
  id?: number; // Optional for Create, required for Update/Delete, included in Read
  name?: string; // Required for Create/Update, included in Read
  productId?: number; // Required for Create/Update, included in Read
  isRequired?: boolean; // Required for Create/Update, included
  values?: Array<OptionValueDTO>; // Required for Create/Update, included in Read
  createdAt?: Date; // Only for Read operation
  updatedAt?: Date; // Only for Read operation
}

export interface OptionValueDTO {
  id?: number; // Optional for Create, required for Update/Delete, included in Read
  optionId?: number; // Required for Create/Update, included
  value?: string; // Required for Create/Update, included in Read
  priceAdjustment?: number; // Required for Create/Update, included in Read
  createdAt?: Date; // Only for Read operation
  updatedAt?: Date; // Only for Read operation
}

export interface CategoryDTO {
  id?: number; // Optional for Create, required for Read/Update/Delete
  name?: string; // Required for Create/Update, optional for Read
  description?: string; // Optional for Create/Update/Read
  createdAt?: Date; // Only for Read operation
  updatedAt?: Date; // Only for Read operation
}
