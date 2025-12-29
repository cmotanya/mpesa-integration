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

interface CartContextType extends CartState {
  addToCartItem: (item: CartItem) => void;
  updateQuantityToCart: (itemId: string, change: number) => void;
  removeFromCartItem: (itemId: string) => void;
  clearCart: () => void;
  cart: CartItem[];
  setDeliveryArea: (area: string, fee: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCartState = (): CartState => ({
  cart: [],
  area: "",
  fee: 0,
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    initialCartState,
  );

  useEffect(() => {
    const loadData = () => {
      const savedCart = getCartFromStorage();
      const savedArea = localStorage.getItem("deliveryArea") || "";
      const savedFee = Number(localStorage.getItem("deliveryFee") || 0);

      dispatch({
        type: "SET_CART",
        payload: { cart: savedCart, area: savedArea, fee: savedFee },
      });
    };

    loadData();
  }, []);

  useEffect(() => {
    saveCartToStorage(state.cart);
  }, [state.cart]);

  const setDeliveryArea = (area: string, fee: number) => {
    localStorage.setItem("deliveryArea", area);
    localStorage.setItem("deliveryFee", fee.toString());
    dispatch({ type: "SET_DELIVERY_AREA", payload: { area, fee } });
  };

  const addToCartItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const updateQuantityToCart = (itemId: string, change: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, change } });
  };

  const removeFromCartItem = (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        area: state.area,
        fee: state.fee,
        addToCartItem,
        updateQuantityToCart,
        removeFromCartItem,
        clearCart,
        setDeliveryArea,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
