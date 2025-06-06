// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
};

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

interface AddToCartPayload {
  item: CartItem;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { item, quantity } = action.payload;
      const itemsToAdd: CartItem[] = Array.from({ length: quantity }, () => item);
      state.cartItems.push(...itemsToAdd);
      console.log("Добавлено в корзину:", itemsToAdd);
      console.log("Текущее состояние корзины:", state.cartItems);
    },
    clearCart(state) {
      state.cartItems = [];
    }
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
