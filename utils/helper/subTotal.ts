import { CartItem } from "../types";

export const subTotal = (cart: CartItem[]): number => {
  const amount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return Math.round(amount * 100) / 100;
};
