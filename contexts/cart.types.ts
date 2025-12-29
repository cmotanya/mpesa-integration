import { CartItem } from "../utils/types";

export type CartActions =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: string; change: number } }
  | { type: "REMOVE_ITEM"; payload: { itemId: string } }
  | { type: "CLEAR_CART" }
  | {
      type: "SET_CART";
      payload: { cart: CartItem[]; area: string; fee: number };
    }
  | {
      type: "SET_DELIVERY_AREA";
      payload: { area: string; fee: number };
    };

export type CartState = {
  cart: CartItem[];
  fee: number;
  area: string;
};
