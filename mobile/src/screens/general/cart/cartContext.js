import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity:
            updatedCart[existingProductIndex].quantity +
            (product.quantity || 1),
          totalPrice:
            updatedCart[existingProductIndex].totalPrice +
            product.price * (product.quantity || 1),
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity: product.quantity || 1,
            totalPrice: product.price,
          },
        ];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
