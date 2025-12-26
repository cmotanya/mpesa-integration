import { CartItem } from "../types";
import { subTotal } from "./subTotal";

export const total = (cartItems: CartItem[], deliveryFee: number): number => {
  const amount = subTotal(cartItems) + deliveryFee;

  return Math.round(amount * 100) / 100;
};
