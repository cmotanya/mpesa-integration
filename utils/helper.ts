import { CartItem } from "./types";

export const subTotal = (cart: CartItem[]): number => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const total = (cartItems: CartItem[], deliveryFee: number): number => {
  return subTotal(cartItems) + deliveryFee;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};
