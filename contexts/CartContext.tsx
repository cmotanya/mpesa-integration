"use client";

import { CartItem } from "@/utils/types";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";

import { cartReducer } from "./cart.reducer";
import { CartState } from "./cart.types";
import { getCartFromStorage, saveCartToStorage } from "./cart.storage";

type CartContextType = {
  cart: CartItem[];
  addToCartItem: (item: CartItem) => void;
  updateQuantityToCart: (
    itemId: string,
    quantity: number,
    change: number,
  ) => void;
  removeFromCartItem: (itemId: string) => void;
  clearFromCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCartState = (): CartState => ({
  cart: getCartFromStorage() || [],
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    initialCartState,
  );

  useEffect(() => {
    saveCartToStorage(state.cart);
  }, [state.cart]);

  const addToCartItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const updateQuantityToCart = (itemId: string, change: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, change } });
  };

  const removeFromCartItem = (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  };

  const clearFromCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCartItem,
        updateQuantityToCart,
        removeFromCartItem,
        clearFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
