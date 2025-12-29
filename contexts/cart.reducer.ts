import { CartActions, CartState } from "./cart.types";

export const cartReducer = (
  state: CartState,
  action: CartActions,
): CartState => {
  switch (action.type) {
    case "SET_DELIVERY_AREA": {
      return {
        ...state,
        area: action.payload.area,
        fee: action.payload.fee,
      };
    }

    case "ADD_ITEM": {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...item }] };
    }

    case "UPDATE_QUANTITY": {
      const { itemId, change } = action.payload;

      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(0, item.quantity + change) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case "REMOVE_ITEM": {
      const { itemId } = action.payload;

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== itemId),
      };
    }

    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};
