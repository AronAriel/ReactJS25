import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    const newItems = Array.from({ length: quantity }, () => item);
    console.log("Добавлено в корзину:", newItems);

    setCartItems((prevItems) => {
      const updated = [...prevItems, ...newItems];
      console.log("Текущее состояние корзины:", updated);
      return updated;
    });
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
