export const defaultRoles = [
  { id: 111, name: "user" },
  { id: 222, name: "admin" },
  { id: 333, name: "manager" },
];

export const defaultCategories = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Tea" },
  { id: 3, name: "Juice" },
  { id: 4, name: "Cake" },
];

export const defaultOrderStatuses = [
  { id: 1, name: "Pending" },
  { id: 2, name: "Confirmed" },
  { id: 3, name: "Delivered" },
  { id: 4, name: "Cancelled" },
];

export const defaultProducts = [
  {
    name: "Pumpkin Spice Latte",
    description:
      "A seasonal favorite with pumpkin, cinnamon, and nutmeg flavors",
    categoryId: 1,
    price: 5.0,
    isCustomizable: true,
    isActive: true,
    options: [
      {
        name: "Size",
        isRequired: true,
        values: [
          { value: "Small", priceAdjustment: 0.0 },
          { value: "Medium", priceAdjustment: 0.5 },
          { value: "Large", priceAdjustment: 1.0 },
        ],
      },
      {
        name: "Milk Type",
        isRequired: false,
        values: [
          { value: "Whole Milk", priceAdjustment: 0.0 },
          { value: "Oat Milk", priceAdjustment: 0.5 },
          { value: "Almond Milk", priceAdjustment: 0.5 },
        ],
      },
    ],
  },
  {
    name: "Matcha Green Tea",
    description:
      "A smooth and earthy blend of matcha green tea and steamed milk",
    categoryId: 2,
    price: 4.5,
    isCustomizable: true,
    isActive: true,
    options: [
      {
        name: "Size",
        isRequired: true,
        values: [
          { value: "Small", priceAdjustment: 0.0 },
          { value: "Medium", priceAdjustment: 0.5 },
          { value: "Large", priceAdjustment: 1.0 },
        ],
      },
      {
        name: "Sweetness Level",
        isRequired: false,
        values: [
          { value: "Unsweetened", priceAdjustment: 0.0 },
          { value: "Less Sweet", priceAdjustment: 0.0 },
          { value: "Regular Sweet", priceAdjustment: 0.0 },
        ],
      },
    ],
  },
  {
    name: "Fresh Orange Juice",
    description:
      "Freshly squeezed orange juice, perfect for a refreshing start to your day",
    categoryId: 3,
    price: 3.5,
    isCustomizable: false,
    isActive: true,
    options: [],
  },
  {
    name: "Chocolate Cake",
    description:
      "A rich and moist chocolate cake topped with a smooth chocolate ganache",
    categoryId: 4,
    price: 4.0,
    isCustomizable: true,
    isActive: true,
    options: [
      {
        name: "Slice Size",
        isRequired: true,
        values: [
          { value: "Regular", priceAdjustment: 0.0 },
          { value: "Large", priceAdjustment: 1.5 },
        ],
      },
      {
        name: "Toppings",
        isRequired: false,
        values: [
          { value: "Whipped Cream", priceAdjustment: 0.5 },
          { value: "Extra Chocolate Drizzle", priceAdjustment: 0.5 },
        ],
      },
    ],
  },
  {
    name: "Iced Caramel Latte",
    description:
      "A chilled blend of espresso, caramel syrup, and milk served over ice",
    categoryId: 1,
    price: 5.5,
    isCustomizable: true,
    isActive: true,
    options: [
      {
        name: "Size",
        isRequired: true,
        values: [
          { value: "Small", priceAdjustment: 0.0 },
          { value: "Medium", priceAdjustment: 0.5 },
          { value: "Large", priceAdjustment: 1.0 },
        ],
      },
      {
        name: "Milk Type",
        isRequired: false,
        values: [
          { value: "Whole Milk", priceAdjustment: 0.0 },
          { value: "Oat Milk", priceAdjustment: 0.5 },
          { value: "Almond Milk", priceAdjustment: 0.5 },
        ],
      },
    ],
  },
];
