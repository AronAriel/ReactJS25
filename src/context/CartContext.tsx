import React, { createContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  [key: string]: any; 
};


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem, quantity: number) => void;
  getCartCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem, quantity: number): void => {
    const newItems: CartItem[] = Array.from({ length: quantity }, () => item);
    console.log("Добавлено в корзину:", newItems);

    setCartItems((prevItems) => {
      const updated = [...prevItems, ...newItems];
      console.log("Текущее состояние корзины:", updated);
      return updated;
    });
  };

  const getCartCount = (): number => {
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
