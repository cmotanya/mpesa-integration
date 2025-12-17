import { CartItem } from "../utils/types";

export type CartActions =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: string; change: number } }
  | { type: "REMOVE_ITEM"; payload: { itemId: string } }
  | { type: "CLEAR_CART" };

export type CartState = {
  cart: CartItem[];
};
